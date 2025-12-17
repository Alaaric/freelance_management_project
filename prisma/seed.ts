import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const freelancesData = [
  {
    nom: 'Alice Martin',
    email: 'alice.martin@example.com',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    tjm: 450
  },
  {
    nom: 'Bob Dupont',
    email: 'bob.dupont@example.com',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    tjm: 500
  },
  {
    nom: 'Charlie Bernard',
    email: 'charlie.bernard@example.com',
    skills: ['Python', 'Django', 'React', 'AWS'],
    tjm: 600
  },
  {
    nom: 'Diana Lopez',
    email: 'diana.lopez@example.com',
    skills: ['Vue.js', 'Node.js', 'GraphQL'],
    tjm: 480
  },
  {
    nom: 'Ethan Smith',
    email: 'ethan.smith@example.com',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    tjm: 520
  }
];

const entreprisesData = [
  { nom: 'TechCorp', secteur: 'Technologie' },
  { nom: 'DataLab', secteur: 'Data Science' },
  { nom: 'WebFactory', secteur: 'Web Development' }
];

const projetsData = [
  {
    titre: 'API Backend Python',
    description: 'Développement d\'une API REST avec FastAPI pour gérer les utilisateurs',
    skillsRequis: ['Python', 'FastAPI', 'PostgreSQL'],
    budgetMaxTjm: 500,
    entrepriseIndex: 0
  },
  {
    titre: 'Application Frontend React',
    description: 'Création d\'une interface moderne avec React et TypeScript',
    skillsRequis: ['React', 'TypeScript', 'CSS'],
    budgetMaxTjm: 550,
    entrepriseIndex: 0
  },
  {
    titre: 'Pipeline de données Python',
    description: 'Mise en place d\'un pipeline ETL avec Python et AWS',
    skillsRequis: ['Python', 'AWS', 'Docker'],
    budgetMaxTjm: 650,
    entrepriseIndex: 1
  },
  {
    titre: 'Site vitrine WordPress',
    description: 'Développement d\'un site vitrine simple',
    skillsRequis: ['WordPress', 'PHP'],
    budgetMaxTjm: 300,
    entrepriseIndex: 2
  },
  {
    titre: 'Migration cloud AWS',
    description: 'Migration d\'infrastructure vers AWS avec Terraform',
    skillsRequis: ['AWS', 'Terraform', 'Kubernetes', 'Python'],
    budgetMaxTjm: 700,
    entrepriseIndex: 2
  }
];

async function main() {
  console.log('🌱 Starting database seeding...');

  await prisma.projet.deleteMany();
  await prisma.freelance.deleteMany();
  await prisma.entreprise.deleteMany();

  const freelances = await Promise.all(
    freelancesData.map(data => prisma.freelance.create({ data }))
  );
  console.log(`✅ Created ${freelances.length} freelances`);

  const entreprises = await Promise.all(
    entreprisesData.map(data => prisma.entreprise.create({ data }))
  );
  console.log(`✅ Created ${entreprises.length} entreprises`);

  const projets = await Promise.all(
    projetsData.map(({ entrepriseIndex, ...data }) =>
      prisma.projet.create({
        data: {
          ...data,
          entrepriseId: entreprises[entrepriseIndex].id
        }
      })
    )
  );
  console.log(`✅ Created ${projets.length} projets`);

  console.log('🎉 Database seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`   - ${freelances.length} freelances`);
  console.log(`   - ${entreprises.length} entreprises`);
  console.log(`   - ${projets.length} projets`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

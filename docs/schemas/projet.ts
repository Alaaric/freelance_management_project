/**
 * @swagger
 * components:
 *   schemas:
 *     Projet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Project ID
 *           example: 1
 *         titre:
 *           type: string
 *           description: Project title
 *           example: API Backend Python
 *         description:
 *           type: string
 *           description: Project description
 *           example: Développement d'une API REST avec FastAPI
 *         skillsRequis:
 *           type: array
 *           items:
 *             type: string
 *           description: Required skills
 *           example: ["Python", "FastAPI", "PostgreSQL"]
 *         budgetMaxTjm:
 *           type: integer
 *           description: Maximum daily rate budget
 *           example: 500
 *         entrepriseId:
 *           type: integer
 *           description: Company ID
 *           example: 1
 *         freelanceId:
 *           type: integer
 *           nullable: true
 *           description: Assigned freelance ID
 *           example: null
 *     
 *     ProjetWithScore:
 *       allOf:
 *         - $ref: '#/components/schemas/Projet'
 *         - type: object
 *           properties:
 *             compatibilityScore:
 *               type: integer
 *               description: Compatibility percentage (0-100)
 *               example: 66
 *     
 *     CreateProjet:
 *       type: object
 *       required:
 *         - titre
 *         - description
 *         - skillsRequis
 *         - budgetMaxTjm
 *       properties:
 *         titre:
 *           type: string
 *           description: Project title
 *           example: API Backend Python
 *         description:
 *           type: string
 *           description: Project description
 *           example: Développement d'une API REST avec FastAPI
 *         skillsRequis:
 *           type: array
 *           items:
 *             type: string
 *           description: Required skills
 *           example: ["Python", "FastAPI", "PostgreSQL"]
 *         budgetMaxTjm:
 *           type: integer
 *           description: Maximum daily rate budget
 *           example: 500
 */

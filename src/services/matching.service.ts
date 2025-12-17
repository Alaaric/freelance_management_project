import { Projet, Freelance } from '../types';

class MatchingService {

  private normalizeSkill(skill: string): string {
    return skill.toLowerCase().trim();
  }

  private hasAllRequiredSkills(
    freelanceSkills: string[],
    requiredSkills: string[]
  ): boolean {
    const normalizedFreelanceSkills = freelanceSkills.map(s => this.normalizeSkill(s));
    const normalizedRequiredSkills = requiredSkills.map(s => this.normalizeSkill(s));

    return normalizedRequiredSkills.every(required =>
      normalizedFreelanceSkills.includes(required)
    );
  }

  private isWithinBudget(freelanceTjm: number, budgetMaxTjm: number): boolean {
    return freelanceTjm <= budgetMaxTjm;
  }

  private isProjectAvailable(projet: Projet): boolean {
    return projet.freelanceId === null;
  }


  public checkCompatibility(
    freelance: Freelance,
    projet: Projet
  ): { compatible: boolean; reasons: string[] } {
    const reasons: string[] = [];

    if (!this.hasAllRequiredSkills(freelance.skills, projet.skillsRequis)) {
      const missingSkills = projet.skillsRequis.filter(required =>
        !freelance.skills.map(s => this.normalizeSkill(s))
          .includes(this.normalizeSkill(required))
      );
      reasons.push(`Missing skills: ${missingSkills.join(', ')}`);
    }

    if (!this.isWithinBudget(freelance.tjm, projet.budgetMaxTjm)) {
      reasons.push(
        `Daily rate too high: ${freelance.tjm}€ > ${projet.budgetMaxTjm}€ (maximum budget)`
      );
    }

    if (!this.isProjectAvailable(projet)) {
      reasons.push('Project already assigned');
    }

    return {
      compatible: reasons.length === 0,
      reasons
    };
  }


  public calculateCompatibilityScore(
    freelanceSkills: string[],
    requiredSkills: string[]
  ): number {
    if (requiredSkills.length === 0) return 100;

    const normalizedFreelanceSkills = freelanceSkills.map(s => this.normalizeSkill(s));
    const normalizedRequiredSkills = requiredSkills.map(s => this.normalizeSkill(s));

    const matchingSkills = normalizedRequiredSkills.filter(required =>
      normalizedFreelanceSkills.includes(required)
    );

    return Math.round((matchingSkills.length / normalizedRequiredSkills.length) * 100);
  }
}

export default new MatchingService();

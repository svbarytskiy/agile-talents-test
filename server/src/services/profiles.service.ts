import { Profile } from '@/types/profile';
import profilesData from '../../data/profiles.json';

const profiles: Profile[] = profilesData;

export class ProfilesService {
  getAll(): Profile[] {
    return profiles;
  }

  searchBySkills(skills: string[]): Profile[] {
    if (!skills?.length) return [];

    return profiles
      .map((p) => {
        const matches = p.skills.filter((skill) => skills.includes(skill));
        const score = Math.min(matches.length, 5);
        return { ...p, score };
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score || b.rating - a.rating);
  }
}

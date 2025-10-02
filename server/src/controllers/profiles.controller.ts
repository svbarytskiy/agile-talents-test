import { Request, Response } from 'express';
import { ProfilesService } from '@/services/profiles.service';
import { SearchRequest } from '@/types/profile';

export class ProfilesController {
  private service: ProfilesService;

  constructor(service: ProfilesService) {
    this.service = service;
  }

  getAllProfiles = (req: Request, res: Response) => {
    try {
      const profiles = this.service.getAll();
      res.json(profiles);
    } catch (error) {
      console.error('[ProfilesController] Error in getAllProfiles', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  searchProfiles = (req: Request<never, never, SearchRequest>, res: Response) => {
    try {
      const skills: string[] = req.body.skills;
      const results = this.service.searchBySkills(skills);
      res.json(results);
    } catch (error) {
      console.error('[ProfilesController] Error in searchProfiles', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}

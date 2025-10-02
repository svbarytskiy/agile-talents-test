export interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  skills: string[];
  about: string;
  rating: number;
  image: string;
  score?: number;
}

export interface SearchRequest {
  skills: string[];
}

export type SearchResponse = Profile[];
export type ProfilesResponse = Profile[];

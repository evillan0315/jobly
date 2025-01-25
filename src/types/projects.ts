// types/projects.ts
export interface TechnologySet {
  id: number; // Adding an id for each technology set
  technologies: string[];
  features: string[];
}

export default interface Project {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  url: string;
  repo?: string;
  frontend?: TechnologySet;
  backend?: TechnologySet;
  database?: TechnologySet;
  api?: TechnologySet;
  deployment?: TechnologySet;
  frontendId?: number; // Optional field for technology ID
  backendId?: number; // Optional field for technology ID
  databaseId?: number; // Optional field for technology ID
  apiId?: number; // Optional field for technology ID
  deploymentId?: number; // Optional field for technology ID
}

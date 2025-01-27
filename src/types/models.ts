export type User = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  password?: string | null;
  emailVerified?: Date | null;
  account_creation_date: Date;
  country_of_residence?: string | null;
  phone_number?: string | null;
  address?: string | null;
  gender?: string | null;
};

export type Account = {
  id: number;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
export type Post = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: string | null;
};

export interface Projects {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  url: string;
  frontend: {
    technologies: string[];
    features: string[];
  };
  backend: {
    technologies: string[];
    features: string[];
  };
  database: {
    technologies: string[];
    features: string[];
  };
  api: {
    technologies: string[];
    features: string[];
  };
  deployment: {
    technologies: string[];
    features: string[];
  };
}

export interface Basics {
  name: string;
  firstname: string;
  middle: string;
  lastname: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  locations: {
    city: string;
    countryCode: string;
    region: string;
  }[];
  profiles: {
    network: string;
    username: string;
    url: string;
  }[];
  subheading: string;
  quotes: string[];
}

export type Contact = {
  name: string | null;
  email: string | null;
  message: string | null;
};
export interface Work {
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Skills {
  name: string;
  level: string;
  keywords: string[];
  icon: string;
}
export interface SkillGroup {
  component: string;
  props: {
    title: string;
    items: {
      name: string;
      icon: string;
    }[];
  }[];
}
export interface Data {
  basics: Basics;
  work: Work[];
  skills: Skills[];
  projects: Projects[];
}

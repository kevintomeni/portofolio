export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  category: string;
  link?: string;
  github?: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface Stack {
  name: string;
  level: number;
  icon: string;
}

export interface StackCategory {
  title: string;
  icon: string;
  skills: Stack[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  presentation: string;
  avatarUrl: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  location: string;
  stacks: StackCategory[];
}

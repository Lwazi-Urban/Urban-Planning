
export interface ZoningControl {
  code: string;
  name: string;
  minErfSize: string;
  maxDensity?: string;
  far: string;
  coverage: string;
  height: string;
  intent: string;
  permittedUses: string[];
  consentUses: string[];
}

export interface ConsultationRequest {
  id: string;
  propertyAddress: string;
  zoningCode: string;
  proposedChange: 'Relaxation' | 'Special Consent' | 'Rezoning' | 'Information';
  status: 'Pending' | 'Reviewing' | 'Completed';
  date: string;
}

export enum AppSection {
  HOME = 'home',
  SEARCH = 'search',
  CONSULT = 'consult',
  GUIDE = 'guide',
  KNOWLEDGE = 'knowledge'
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string; // HTML string
  heroImage?: string;
}

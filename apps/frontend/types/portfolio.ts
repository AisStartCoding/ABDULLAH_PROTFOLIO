export type SiteSettings = {
  name: string;
  role: string;
  email: string;
  location: string;
  open_status: string;
  seo_title: string;
  seo_description: string;
};

export type HeroContent = {
  headline: string;
  subtext: string;
  primary_button: string;
  secondary_button: string;
  architecture_button: string;
  contact_button: string;
  terminal_title: string;
  terminal_lines: string[];
};

export type Metric = {
  id: number;
  value: string;
  label: string;
  description: string;
  order: number;
};

export type Skill = {
  id: number;
  name: string;
  order: number;
};

export type SkillCategory = {
  id: number;
  title: string;
  order: number;
  skills: Skill[];
};

export type Experience = {
  id: number;
  title: string;
  company: string;
  date: string;
  location: string;
  bullets: { id: number; text: string; order: number }[];
};

export type ProjectCaseStudyStage = {
  id: number;
  stage: "problem" | "architecture" | "design" | "technology" | "result";
  title: string;
  body: string;
};

export type Project = {
  id: number;
  title: string;
  status: string;
  description: string;
  architecture_notes?: string;
  detail_url?: string;
  tags: { id: number; name: string; order: number }[];
  case_study?: ProjectCaseStudyStage[];
};

export type PipelineStep = {
  id: number;
  title: string;
  description: string;
  command: string;
  order: number;
};

export type ArchitectureBlueprint = {
  id: number;
  title: string;
  description: string;
  accent: string;
  modules: { id: number; name: string; order: number }[];
  api_groups: { id: number; path: string; order: number }[];
  relationships: { id: number; source: string; target: string; label: string; order: number }[];
};

export type TechStackItem = {
  id: number;
  name: string;
  category: string;
  icon: string;
};

export type ThemeSettings = {
  primary: string;
  secondary: string;
  violet: string;
  background: string;
};

export type AnimationSettings = {
  intensity: number;
  speed: number;
  enable_3d: boolean;
  enable_particles: boolean;
};

export type SocialLink = {
  id: number;
  label: string;
  url: string;
};

export type PortfolioHome = {
  settings: SiteSettings;
  hero: HeroContent;
  metrics: Metric[];
  skill_categories: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  pipeline_steps: PipelineStep[];
  architecture_blueprints: ArchitectureBlueprint[];
  tech_stack: TechStackItem[];
  theme: ThemeSettings;
  animation: AnimationSettings;
  social_links: SocialLink[];
};

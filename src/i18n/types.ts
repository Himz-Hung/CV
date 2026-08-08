// Shared shape for every language file. Both vi.ts and en.ts must implement
// this exactly, so adding/renaming a string in one language forces the other
// to stay in sync (TypeScript will complain otherwise).

export type Lang = 'vi' | 'en'

export type Profile = {
  name: string
  nameEn: string
  title: string
  tagline: string
  email: string
  phone: string
  github: string
  location: string
  birth: string
  summary: string
}

export type Stat = { value: string; label: string }

export type SkillGroup = { group: string; items: string[] }

export type Experience = {
  period: string
  role: string
  company: string
  points: string[]
}

export type Project = {
  name: string
  period: string
  role: string
  accent: string
  description: string
  responsibilities: string[]
  tech: string[]
}

export type Education = {
  school: string
  degree: string
  period: string
  gpa: string
}

export type Translation = {
  // UI strings, grouped by the component that uses them
  nav: {
    about: string
    skills: string
    experience: string
    projects: string
    contact: string
    connect: string
  }
  hero: {
    scrollCue: string
  }
  about: {
    eyebrow: string
  }
  skills: {
    eyebrow: string
    headingLines: string[]
  }
  experience: {
    eyebrow: string
    heading: string
    gpaLabel: string
  }
  projects: {
    eyebrow: string
    headingLines: string[]
  }
  contact: {
    eyebrow: string
    headingLine1: string
    headingLine2: string
    cta: string
    downloadCv: string
    emailLabel: string
    phoneLabel: string
    githubLabel: string
  }
  preloader: {
    role: string
    loading: string
  }
  welcome: {
    greeting: string
    subtitle: string
    chooseLanguage: string
    vietnamese: string
    english: string
    enter: string
  }
  footer: string

  // Content
  profile: Profile
  stats: Stat[]
  skills_data: SkillGroup[]
  experience_data: Experience[]
  projects_data: Project[]
  education: Education
}

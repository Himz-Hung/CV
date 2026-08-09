import type { Translation } from './types'

// English — full site content & messages in English.
export const en: Translation = {
  nav: {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    connect: 'Connect',
  },
  hero: {
    scrollCue: 'Scroll down',
  },
  story: {
    chapters: [
      {
        eyebrow: 'Front-end Developer',
        title: 'Dang Ngoc Hung',
        body: 'I craft fast, elegant web interfaces with React & TypeScript. Scroll to follow the story — from the first line of code to the products I ship.',
      },
      {
        eyebrow: 'About me',
        title: 'Turning ideas into interfaces',
        body: 'Around 3 years building enterprise and client-facing web apps — reusable component systems, clean state management, and interfaces that feel effortless.',
      },
      {
        eyebrow: 'Toolkit',
        title: 'React · TypeScript · UI Engineering',
        body: 'ReactJS, TypeScript, Redux Toolkit & React Query, Tailwind and MUI — plus the architecture habits that keep products fast as they grow.',
      },
      {
        eyebrow: 'The journey',
        title: 'From FPT Software to freelance',
        body: 'Shipped enterprise features for overseas clients at FPT Software, then went freelance — delivering event platforms, management systems, and more end to end.',
      },
      {
        eyebrow: 'Selected work',
        title: 'Products I have shipped',
        body: 'Freelance projects delivered end to end: a Lucky Wheel event platform, an Excel processing system, and a document management system — from UI to API integration.',
      },
      {
        eyebrow: "Let's work together",
        title: "Let's build something great.",
        body: 'Have an idea, a project, or just want to say hello? Let’s talk.',
      },
    ],
  },
  about: {
    eyebrow: 'About me',
  },
  skills: {
    eyebrow: 'Skill set',
    headingLines: ['The technologies I use', 'to build products.'],
  },
  experience: {
    eyebrow: 'Journey',
    heading: 'Work experience',
    gpaLabel: 'GPA',
  },
  projects: {
    eyebrow: 'Selected work',
    headingLines: ['The products', "I've built."],
  },
  contact: {
    eyebrow: "Let's work together",
    headingLine1: 'Great products start',
    headingLine2: 'with a conversation.',
    cta: 'Send me an email →',
    downloadCv: 'Download CV (PDF)',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    githubLabel: 'GitHub',
  },
  preloader: {
    role: 'Front-end Developer',
    loading: 'Loading the experience…',
  },
  welcome: {
    greeting: 'Hello 👋',
    subtitle: 'Welcome to my CV. Which language would you like to view it in?',
    chooseLanguage: 'Choose a language',
    vietnamese: 'Vietnamese',
    english: 'English',
    enter: 'Enter the CV →',
  },
  footer: '© 2026 {name} · Front-end Developer · Designed & built with React',

  profile: {
    name: 'Dang Ngoc Hung',
    nameEn: 'Dang Ngoc Hung',
    title: 'Front-end Developer',
    tagline: 'ReactJS · TypeScript · UI Engineering',
    email: 'hungitforwork@gmail.com',
    phone: '0859550557',
    github: 'https://github.com/Himz-Hung',
    location: 'District 7, Ho Chi Minh City',
    birth: '14/11/2003',
    summary:
      'Front-end Developer specialized in ReactJS and TypeScript, with solid experience building enterprise and client-facing web applications. Skilled at building reusable component systems, integrating RESTful APIs, managing complex state, and optimizing performance for scalable products.',
  },

  stats: [
    { value: '~3', label: 'Years of experience' },
    { value: '30+', label: 'Reusable React components' },
    { value: '20+', label: 'REST API endpoints integrated' },
    { value: '8.09', label: 'GPA / 10 (FPT University)' },
  ],

  skills_data: [
    {
      group: 'Languages',
      items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SCSS'],
    },
    {
      group: 'Frameworks & UI',
      items: ['ReactJS', 'Angular', 'MUI', 'Ant Design', 'TailwindCSS'],
    },
    {
      group: 'State Management',
      items: ['Redux Toolkit', 'Redux Thunk', 'React Query (TanStack)'],
    },
    {
      group: 'Tools',
      items: ['Git', 'Vite'],
    },
    {
      group: 'Auth & Security',
      items: ['JWT Authentication', 'Role-Based Access Control (RBAC)'],
    },
    {
      group: 'Architecture & Optimization',
      items: ['Custom Hooks', 'Code Splitting', 'Lazy Loading', 'Performance Optimization'],
    },
    {
      group: 'Others',
      items: ['RESTful APIs', 'Responsive Design', 'Agile / Scrum'],
    },
    {
      group: 'Basic Knowledge',
      items: ['NodeJS', 'MongoDB', 'Firebase'],
    },
  ],

  experience_data: [
    {
      period: '2024 – Present',
      role: 'Freelance Front-end Developer',
      company: 'Freelance',
      points: [
        'Developed and delivered several web apps: a Lucky Wheel event platform, an Excel processing system, and a document management system.',
        'Built responsive interfaces with ReactJS, TypeScript, and modern UI libraries.',
        'Designed reusable components and optimized the front-end architecture for maintainability.',
        'Integrated RESTful APIs, handled data flows, and managed state with Redux.',
        'Implemented file upload/download, data processing, form handling, and interactive UI experiences.',
      ],
    },
    {
      period: '2023 – 2024',
      role: 'Front-end Developer',
      company: 'FPT Software Quy Nhon',
      points: [
        'Developed and maintained enterprise web applications with ReactJS + TypeScript for overseas clients.',
        'Built reusable UI components, reducing duplicated code and improving development speed.',
        'Integrated REST APIs and optimized data handling to improve application performance.',
        'Collaborated with backend developers and took part in the Agile/Scrum development cycle.',
        'Delivered production features through code review and teamwork.',
      ],
    },
  ],

  projects_data: [
    {
      name: 'Booking Platform',
      period: 'Aug 2025 – Jan 2026',
      role: 'Developer',
      accent: 'from-indigo-500 to-blue-600',
      description:
        'A web service booking platform for overseas clients. It lets users search, book, and manage services with subscription plans and payment integration. Focused on data security, performance optimization, responsiveness, and a scalable front-end architecture.',
      responsibilities: [
        'Built a responsive UI with ReactJS, Vite, TypeScript, and Tailwind',
        'Designed a reusable, scalable component architecture',
        'Managed state with Redux Thunk',
        'Implemented authentication & role-based access control',
        'Optimized performance and improved cross-device UX',
      ],
      tech: ['ReactJS', 'TypeScript', 'Redux', 'Axios', 'TailwindCSS', 'Vite'],
    },
    {
      name: 'Web Management System',
      period: 'Japanese Travel Agency',
      role: 'Developer',
      accent: 'from-rose-500 to-orange-500',
      description:
        'A web management system for a Japanese travel agency: managing tours, customers, and bookings. Part of a real-world enterprise project for an overseas client.',
      responsibilities: [
        'Developed 30+ reusable React components with TypeScript & SCSS',
        'Integrated 20+ REST API endpoints for customers, bookings, and tours',
        'Collaborated with the backend team (.NET Core, SQL Server)',
        'Took part in Agile (Scrum), daily stand-ups, and code reviews',
        'Fixed critical UI bugs and optimized render performance',
      ],
      tech: ['ReactJS', 'TypeScript', 'SCSS', '.NET Core', 'SQL Server', 'AWS'],
    },
    {
      name: 'FAMS — Face Attendance Management',
      period: 'Mar 2025 – May 2025',
      role: 'Front-End Developer / Full-stack Contributor',
      accent: 'from-emerald-500 to-teal-600',
      description:
        'An automatic attendance system using face recognition on the Jetson Orin platform, integrated with a web app (mobile-responsive) to manage school attendance efficiently.',
      responsibilities: [
        'Developed the web UI with ReactJS + TypeScript',
        'Integrated the attendance API and real-time data updates',
        'Worked with the backend (NodeJS, Python, MongoDB)',
        'Designed the system structure & took part in requirements analysis',
      ],
      tech: ['ReactJS', 'NodeJS', 'Python', 'MongoDB', 'PostgreSQL'],
    },
    {
      name: 'Student Management System',
      period: 'Jan 2023 – Feb 2023',
      role: 'Developer',
      accent: 'from-fuchsia-500 to-purple-600',
      description:
        'A student management app built with ReactJS during my second university year. Focused on managing student data and providing an intuitive UI for CRUD operations.',
      responsibilities: [
        'Developed reusable React components and managed state',
        'Integrated RESTful APIs to fetch and update student data',
        'Implemented form validation and error handling',
        'Improved UI/UX for smooth interactions',
      ],
      tech: ['ReactJS', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Git', 'GitHub'],
    },
  ],

  education: {
    school: 'FPT University',
    degree: 'Bachelor of Information Technology',
    period: '2021 – 2025',
    gpa: '8.09 / 10 (3.3 / 4)',
  },
}

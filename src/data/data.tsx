import {
  AcademicCapIcon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
import heroImage from '../images/header-background.webp';
import profilepic from '../images/shivang-opentowork.png';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  CurrentStatus,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';


/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Shivang Sinha | AI Automation & Full-Stack Engineer',
  description: "Portfolio of Shivang Sinha — AI Automation & Full-Stack Engineer specializing in LLM applications, RAG pipelines, agentic workflows, and scalable cloud systems.",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  CurrentStatus: 'current-status',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Shivang Sinha`,
  description: (
    <>
      <p className="text-base text-text-secondary sm:text-lg lg:text-xl font-body max-w-2xl">
        AI Full Stack Engineer with <strong className="text-text-primary">5+ years</strong> delivering production-grade{' '}
        <strong className="text-text-primary">LLM- and RAG-powered systems</strong> at Carl Zeiss, Barclays, and Hexagon.{' '}
        M.Sc. in <strong className="text-text-primary">Natural Language Processing</strong> — University of Trier.
      </p>
      <p className="text-sm text-text-muted sm:text-base font-body mt-2 flex items-center gap-x-2 flex-wrap">
        <strong className="text-accent">Currently available</strong> for full-time roles · Germany 🇩🇪
      </p>
    </>
  ),
  actions: [
    {
      href: 'https://www.linkedin.com/in/shivang-sinha-92755012b/',
      text: 'Connect on LinkedIn',
      primary: true,
      Icon: LinkedInIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `AI Full Stack Engineer with 5+ years delivering production-grade applications end-to-end — Python/FastAPI backends, React/TypeScript frontends, and REST API architectures in enterprise-regulated environments. Built an LLM-powered Microscopy Copilot at Carl Zeiss on Azure; previously shipped high-reliability transactional systems at Barclays (99.9% uptime) and industrial platforms at Hexagon (500+ users). Combines deep AI/ML expertise (RAG, multi-agent systems, LLM orchestration) with strong DevSecOps practices across Docker, CI/CD, and Azure. Proven track record leading code reviews, collaborating with vendor teams, and driving AI-assisted development adoption. M.Sc. in NLP (University of Trier, thesis completed).`,
  aboutItems: [
    {label: 'Location / Residence', text: 'Germany 🇩🇪', Icon: MapIcon},
    {label: 'Nationality', text: 'Indian 🇮🇳', Icon: FlagIcon},
    {label: 'Age', text: '28', Icon: CalendarIcon},
    {label: 'Interests', text: 'AI, Badminton & Cricket', Icon: SparklesIcon},
    {label: 'Study', text: 'M.Sc. NLP – University of Trier', Icon: AcademicCapIcon},
    {label: 'Availability', text: 'Currently available for full-time roles', Icon: BriefcaseIcon},
  ],
};

/**
 * Current Status section
 */
export const currentStatus: CurrentStatus = {
  statusText: 'Open to new opportunities in AI/ML & Full-Stack Engineering',
  statusEmoji: '🟢',
  stats: [
    {label: 'Years Experience', value: '5+'},
    {label: 'Companies', value: '3'},
    {label: 'Projects Shipped', value: '9+'},
    {label: 'Degree', value: 'M.Sc. NLP'},
  ],
  availabilityText: 'Currently available for full-time roles · Germany',
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Backend Development',
    skills: [
      {name: 'Python / FastAPI', level: 10},
      {name: 'REST API Design', level: 9},
      {name: 'Async Processing', level: 8},
      {name: 'C# / .NET', level: 7},
      {name: 'Data Modelling', level: 8},
    ],
  },
  {
    name: 'Frontend Development',
    skills: [
      {name: 'React', level: 9},
      {name: 'TypeScript', level: 8},
      {name: 'JavaScript', level: 9},
      {name: 'API Integration', level: 9},
    ],
  },
  {
    name: 'AI / Machine Learning',
    skills: [
      {name: 'LLMs & RAG', level: 9},
      {name: 'Agentic Workflows', level: 9},
      {name: 'Prompt Engineering', level: 9},
      {name: 'NLP', level: 9},
      {name: 'Structured Outputs & Tool Use', level: 9},
      {name: 'Fine-tuning', level: 8},
    ],
  },
  {
    name: 'Frameworks & Tools',
    skills: [
      {name: 'LangChain & LangGraph', level: 9},
      {name: 'HuggingFace', level: 8},
      {name: 'PyTorch', level: 7},
      {name: 'Vector Embeddings', level: 8},
    ],
  },
  {
    name: 'Cloud & DevSecOps',
    skills: [
      {name: 'Azure & Azure OpenAI', level: 9},
      {name: 'Docker & CI/CD', level: 8},
      {name: 'AWS', level: 8},
      {name: 'Kubernetes', level: 7},
    ],
  },
  {
    name: 'Databases',
    skills: [
      {name: 'SQL (PostgreSQL)', level: 8},
      {name: 'Vector DBs (FAISS, Chroma)', level: 8},
      {name: 'NoSQL (MongoDB)', level: 7},
    ],
  },
  {
    name: 'Spoken Languages',
    skills: [
      {name: 'English (C1 – Fluent)', level: 10},
      {name: 'German (B1 – Intermediate)', level: 5},
    ],
  },
];

import projectsData from './projects.json';

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = projectsData as PortfolioItem[];

/**
 * Resume section
 */
export const education: TimelineItem[] = [
  {
    date: 'April 2024 – March 2026',
    location: 'Trier, Germany',
    title: 'M.Sc. Natural Language Processing – University of Trier',
    content: (
      <ul className="list-disc pl-4 space-y-1 text-text-secondary text-sm">
        <li><strong className="text-text-primary">Thesis:</strong> Comparative Study of NLP Models for Analysis of AI/ML Skill Demand in the German Job Market</li>
        <li>Collected and annotated 1,000+ German job postings; benchmarked BERT-based, rule-based and LLM-based skill extraction models using Precision, Recall and F1-score for longitudinal trend analysis.</li>
        <li>Hands-on experience with Python, TensorFlow, PyTorch, HuggingFace, and deep learning frameworks for text classification, sentiment analysis, and conversational AI.</li>
      </ul>
    ),
  },
  {
    date: '2016 – 2020',
    location: 'Chandigarh, India',
    title: 'B.E. Computer Science – Chandigarh University',
    content: (
      <ul className="list-disc pl-4 space-y-1 text-text-secondary text-sm">
        <li>Built strong foundations in algorithms, data structures, databases, and software engineering using Java, C++, and Python.</li>
        <li>Gained practical experience with AWS and cloud automation tools for deploying and managing scalable applications.</li>
      </ul>
    ),
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'November 2024 – April 2026',
    location: 'Germany',
    title: 'Carl Zeiss Microscopy – Generative AI Engineer (Werkstudent)',
    content: (
      <ul className="list-disc pl-4 space-y-3 text-text-secondary text-sm">
        <li>Took an LLM-driven Microscopy Copilot from prototype to production using <strong className="text-text-primary">Azure OpenAI</strong> and <strong className="text-text-primary">LangGraph</strong>, including evaluation frameworks, deployment pipelines, and reliability monitoring—reduced manual effort by 25–35%.</li>
        <li className="mt-3 mb-3">
          <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20 uppercase tracking-wide mr-2 shadow-glow-sm">
            ⭐ Named Inventor
          </span>
          <strong className="text-text-primary">Zeiss AI Invention Disclosure (2025)</strong> for an agentic copilot system with human-review escalation points.
        </li>
        <li>Designed <strong className="text-text-primary">RAG pipelines</strong> with structured outputs and quality evaluation, integrating enterprise documentation and code repositories; improved retrieval accuracy by 40%.</li>
        <li>Built <strong className="text-text-primary">multi-step agentic workflows</strong> with tool-calling via MCP-based interoperability, connecting AI services to internal APIs, data sources, and operational processes across departments.</li>
      </ul>
    ),
  },
  {
    date: 'March 2022 – March 2024',
    location: 'Pune, India',
    title: 'Barclays – Senior Software Developer',
    content: (
      <ul className="list-disc pl-4 space-y-3 text-text-secondary text-sm">
        <li>Led system design of enterprise web applications for investment banking, building <strong className="text-text-primary">scalable RESTful APIs</strong> with async processing, automated testing, and delivery pipelines—achieving <strong className="text-accent font-bold">99.9% uptime</strong>.</li>
        <li>Developed an internal <strong className="text-text-primary">AI-enabled workflow assistant</strong> automating employee support; defined escalation logic for policy dependent decisions, reducing routine tickets by 30%.</li>
      </ul>
    ),
  },
  {
    date: 'September 2020 – March 2022',
    location: 'Hyderabad, India',
    title: 'Hexagon CCI – Software Developer',
    content: (
      <ul className="list-disc pl-4 space-y-3 text-text-secondary text-sm">
        <li>Delivered production industrial applications serving <strong className="text-accent font-bold">5,000+ enterprise users</strong>; owned API design, data modelling, observability, and performance optimization (20% latency reduction).</li>
      </ul>
    ),
  },
];

/**
 * Certifications
 */
export const certifications = [
  'LangChain Academy – Agentic AI (2026)',
  'HuggingFace AI Agents Course (2026)',
  'Microsoft AI Tour – GenAI & Azure (2025)',
];

/**
 * AI-Assisted Dev Tools
 */
export const devTools = ['GitHub Copilot', 'Cursor', 'Claude Code'];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Abhishek Diwan',
      text: `Working with Shivang has been an incredible experience. His expertise in NLP and full-stack development was evident in our projects at Barclays, where he significantly improved the accuracy and efficiency of our NLP models. Shivang's proactive approach and strong collaboration skills made him an invaluable team member, consistently delivering high-quality work.`,
      image: 'https://ui-avatars.com/api/?name=Abhishek+Diwan&size=100&background=E67E22&color=fff&rounded=true',
    },
    {
      name: 'Durga Prasad Palle',
      text: `Shivang's contribution to the Hexagon OnCall Dispatch project was outstanding. His ability to architect and manage responsive web applications, coupled with his skill in optimizing performance, greatly enhanced our product. His dedication to understanding client needs and translating them into effective solutions was impressive, showcasing his strong technical and problem-solving skills.`,
      image: 'https://ui-avatars.com/api/?name=Durga+Prasad&size=100&background=1A1A1A&color=fff&rounded=true',
    },
    {
      name: 'Pooja Parakh',
      text: `Shivang is a highly skilled and dedicated IT professional. His work on deploying NLP models into production at Barclays demonstrated his deep technical knowledge and practical experience. Shivang's strong work ethic, attention to detail, and ability to work efficiently in a team make him a remarkable asset in any project or organization`,
      image: 'https://ui-avatars.com/api/?name=Pooja+Parakh&size=100&background=6B6B6B&color=fff&rounded=true',
    },
    {
      name: 'Prarthana Mukherjee',
      text: `Working with Shivang at Barclays was a great experience. His expertise in deploying NLP models into production was instrumental in improving our system's performance. Shivang's ability to handle complex technical challenges and deliver high-quality solutions under tight deadlines was impressive. His collaborative spirit and proactive approach to problem-solving made him an invaluable team member.`,
      image: 'https://ui-avatars.com/api/?name=Prarthana+Mukherjee&size=100&background=D35400&color=fff&rounded=true',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: "Let's connect! I'm always open to discussing new opportunities, AI projects, or collaboration ideas.",
  items: [
    {
      type: ContactType.Email,
      text: 'shivangsinha2@gmail.com',
      href: 'mailto:shivangsinha2@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Germany',
      href: 'https://maps.app.goo.gl/WSg46QLjcow4yzuY7',
    },
    {
      type: ContactType.LinkedIn,
      text: 'linkedin.com/in/shivang-sinha',
      href: 'https://www.linkedin.com/in/shivang-sinha-92755012b/',
    },
    {
      type: ContactType.Github,
      text: 'github.com/shivang-7135',
      href: 'https://github.com/shivang-7135',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/shivang-7135'},
  {label: 'Stack Overflow', Icon: StackOverflowIcon, href: 'https://stackoverflow.com/'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/shivang-sinha-92755012b/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/shivang.sinha'},
];

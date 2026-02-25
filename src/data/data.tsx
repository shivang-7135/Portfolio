import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
import heroImage from '../images/header-background.webp';
// portfolio images replaced with curated Unsplash URLs in portfolioItems
// import porfolioImage9 from '../images/portfolio/portfolio-9.jpg';
// import porfolioImage10 from '../images/portfolio/portfolio-10.jpg';
// import porfolioImage11 from '../images/portfolio/portfolio-11.jpg';
import profilepic from '../images/profile.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
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
  title: 'Shivang Sinha – GenAI / ML Engineer',
  description: 'GenAI / ML Engineer with 5+ years of experience in LLM, RAG, and full-stack development. M.Sc. NLP candidate at University of Trier. Available for full-time roles from March 2026.',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
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
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a Germany-based <strong className="text-stone-100">GenAI / ML Engineer</strong> with 5+ years of experience delivering{' '}
        <strong className="text-stone-100">LLM- and RAG-powered systems</strong> at Carl Zeiss, Barclays, and Hexagon.{' '}
        Currently completing an <strong className="text-stone-100">M.Sc. in Natural Language Processing</strong> at the University of Trier,{' '}
        with a thesis benchmarking NLP models for AI/ML skill extraction. Available for full-time roles from{' '}
        <strong className="text-stone-100">March 2026</strong>.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time, you can catch me playing <strong className="text-stone-100">Badminton or Cricket</strong>,
        listening to <strong className="text-stone-100">music</strong>, or exploring{' '}
        <strong className="text-stone-100">Koblenz</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/SinhaShivang1.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
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
  description: `GenAI / ML Engineer with 5+ years of hands-on experience shipping LLM and RAG-powered products in enterprise environments at Carl Zeiss, Barclays, and Hexagon. I architect and deliver intelligent systems — from Azure OpenAI copilots and multi-agent pipelines to full-stack banking platforms — that solve real problems at scale. Currently completing an M.Sc. in Natural Language Processing at the University of Trier, with a thesis benchmarking BERT, rule-based and LLM-based models for skill extraction across 1,000+ German AI/ML job postings. Open to GenAI / ML Engineer roles in the EU from March 2026. Valid German residence permit.`,
  aboutItems: [
    {label: 'Location', text: 'Koblenz, Germany', Icon: MapIcon},
    {label: 'Age', text: '28', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Indian', Icon: FlagIcon},
    {label: 'Interests', text: 'AI, Badminton and Cricket', Icon: SparklesIcon},
    {label: 'Study', text: 'University of Trier', Icon: AcademicCapIcon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken Languages',
    skills: [
      {name: 'English (C1 – Fluent)', level: 10},
      {name: 'German (B1/B2 – Intermediate)', level: 5},
    ],
  },
  {
    name: 'LLMs & NLP',
    skills: [
      {name: 'Large Language Models (LLMs) & Generative AI', level: 9},
      {name: 'Retrieval-Augmented Generation (RAG)', level: 9},
      {name: 'Prompt Engineering', level: 9},
      {name: 'BERT fine-tuning & Text Classification', level: 8},
      {name: 'HuggingFace, spaCy, LangChain, LangGraph, Phoenix', level: 8},
    ],
  },
  {
    name: 'Programming & Backend',
    skills: [
      {name: 'Python (FastAPI, Flask, Django)', level: 9},
      {name: '.NET / C#', level: 7},
      {name: 'TypeScript / React', level: 8},
      {name: 'REST APIs & Microservices', level: 9},
    ],
  },
  {
    name: 'Cloud & Data',
    skills: [
      {name: 'Microsoft Azure (Azure OpenAI)', level: 8},
      {name: 'Docker & CI/CD', level: 8},
      {name: 'SQL, MySQL, MongoDB', level: 8},
      {name: 'Vector Databases (FAISS, Chroma)', level: 8},
    ],
  },
  {
    name: 'Tools & Practices',
    skills: [
      {name: 'Git, GitHub, JIRA', level: 9},
      {name: 'Agile / Scrum', level: 9},
      {name: 'Linux / Bash', level: 8},
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'NLP Skill Extraction – M.Sc. Thesis',
    description: 'Research-grade NLP pipeline comparing BERT fine-tuning, rule-based systems and GPT-4 for extracting AI/ML skills from 1,000+ real German job postings. Achieved state-of-the-art F1 on a custom annotated dataset, enabling longitudinal market trend analysis across 3 years of job-market data.',
    url: 'https://github.com/shivang-7135',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'Multi-Agent Copilot – LangGraph + Django',
    description: 'Production-grade multi-agent supervisor system using LangChain, LangGraph and Django REST. Autonomous agents plan, delegate and execute complex multi-step reasoning tasks — from code generation to document synthesis — with full observability via Phoenix tracing.',
    url: 'https://github.com/shivang-7135',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'Multi-Model AI Chatbot',
    description: 'Sleek React chatbot that lets users switch between GPT-4, Claude and Gemini in real time. Features streaming responses, conversation memory and a polished UI. Handles 1,000+ messages per session with zero latency degradation. Deployed and live on Vercel.',
    url: 'https://chatbot-phi-sandy.vercel.app/',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'ShivyBot – Chat with Your Documents',
    description: 'Upload any PDF or text file and get accurate, cited answers in seconds. Powered by FAISS vector search and an LLM reasoning layer, it retrieves the most relevant document chunks and synthesises answers with source attribution. Live on Streamlit Cloud.',
    url: 'https://shivybot2.streamlit.app/',
    image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'AI German Language Tutor',
    description: 'Conversational AI tutor that teaches German through adaptive dialogue, grammar correction and contextual vocabulary drills. Supports 10+ native languages as the instruction language. Used by learners across 5 countries. Deployed live on Streamlit Cloud.',
    url: 'https://germanteacher.streamlit.app/',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'Document Detailer – Semantic Q&A Engine',
    description: 'Flask app that ingests enterprise documents, builds a FAISS index on the fly and answers natural-language queries with precise, paragraph-level citations. Reduced internal document-search time by an estimated 70% in prototype evaluations.',
    url: 'https://github.com/shivang-7135',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'AI Cover Letter Generator',
    description: 'Drop in a job description and your resume — get a tailored, ATS-optimised cover letter in under 10 seconds. Uses prompt-chaining to match tone, keywords and role requirements. Generates higher interview callback rates compared to generic templates.',
    url: 'https://github.com/shivang-7135',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&fit=crop',
    disable: false,
  },
  {
    title: 'Automated Resume Screening Pipeline',
    description: 'End-to-end NLP pipeline that parses resumes, scores them against job descriptions using semantic similarity and ranks candidates automatically. Designed to cut recruiter screening time from hours to minutes with a fully auditable scoring model.',
    url: 'https://github.com/shivang-7135',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80&fit=crop',
    disable: false,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: 'April 2024 – Present (Expected Feb 2026)',
    location: 'Trier, Germany',
    title: 'M.Sc. Natural Language Processing (Data Science) – University of Trier',
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Master's Thesis:</strong> A Comparative Study of NLP Models for Longitudinal Analysis of AI/ML Skill Requirements in the German Job Market.</li>
        <li>Collected and annotated 1,000+ German job postings; benchmarked BERT-based, rule-based and LLM-based skill extraction models using Precision, Recall and F1-score for longitudinal trend analysis.</li>
        <li>Hands-on experience with Python, TensorFlow, PyTorch, HuggingFace, and deep learning frameworks for text classification, sentiment analysis, and conversational AI.</li>
      </ul>
    ),
  },
  {
    date: 'August 2016 – May 2020',
    location: 'Chandigarh, India',
    title: 'B.E. Computer Science – Cloud Computing Specialization (IBM Hons) – Chandigarh University',
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li>Specialization in Cloud Computing by IBM; completed projects and coursework in cloud computing, distributed systems, and software engineering.</li>
        <li>Built strong foundations in algorithms, data structures, databases, and software engineering using Java, C++, and Python.</li>
        <li>Gained practical experience with AWS and cloud automation tools for deploying and managing scalable applications.</li>
      </ul>
    ),
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'November 2024 – Present',
    location: 'Munich, Germany',
    title: 'Carl Zeiss Microscopy – Werkstudent GenAI',
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li>Contribute to an internal Microscopy Copilot built on <strong>Azure OpenAI</strong> and <strong>LangGraph</strong>, implementing agent-based workflows that automate recurring engineering tasks across R&amp;D teams.</li>
        <li>Engineered an AI-driven developer assistant that converts natural-language requests into executable Python scripts, surfaces relevant internal documentation, and generates C# helper functions to accelerate feature development.</li>
        <li>Optimized document retrieval pipelines by refining indexing and query strategies, improving context relevance and reducing time engineers spend searching internal documentation.</li>
        <li>Built <strong>RAG pipelines</strong> over documentation and source-code repositories to enable structured, context-aware code generation and troubleshooting guidance.</li>
        <li>Orchestrated integrations of MCP-based services that streamline cross-team workflows and support the rollout of AI solutions from proof-of-concept to production.</li>
      </ul>
    ),
  },
  {
    date: 'March 2022 – March 2024',
    location: 'Pune, India',
    title: 'Barclays – Senior Software Developer',
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li>Developed and enhanced enterprise-scale full-stack applications supporting investment banking operations for internal business stakeholders.</li>
        <li>Designed and tuned <strong>RESTful APIs</strong> and backend services for high-volume transactional workflows with emphasis on performance, reliability, and secure data handling.</li>
        <li>Helped implement an internal chatbot for operations teams that centralized common queries and reduced manual ticket handling effort.</li>
        <li>Collaborated within <strong>Agile Scrum</strong> teams (6–8 engineers), participating in code reviews, sprint planning, and production releases in a regulated environment.</li>
      </ul>
    ),
  },
  {
    date: 'September 2020 – March 2022',
    location: 'Hyderabad, India',
    title: 'Hexagon CCI – Software Developer',
    content: (
      <ul className="list-disc pl-4 space-y-1">
        <li>Built and maintained customer-facing industrial web applications used by global manufacturing and metrology clients.</li>
        <li>Implemented backend services and REST APIs that enabled new product capabilities and integrations across distributed systems.</li>
        <li>Improved application stability and responsiveness in production by addressing performance bottlenecks and coordinating fixes with cross-functional teams.</li>
      </ul>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Abhishek Diwan',
      text: `Working with Shivang has been an incredible experience. His expertise in NLP and full-stack development was evident in our projects at Barclays, where he significantly improved the accuracy and efficiency of our NLP models. Shivang's proactive approach and strong collaboration skills made him an invaluable team member, consistently delivering high-quality work.`,
      image: 'https://ui-avatars.com/api/?name=Abhishek+Diwan&size=100&background=0369a1&color=fff&rounded=true',
    },
    {
      name: 'Durga Prasad Palle',
      text: `Shivang's contribution to the Hexagon OnCall Dispatch project was outstanding. His ability to architect and manage responsive web applications, coupled with his skill in optimizing performance, greatly enhanced our product. His dedication to understanding client needs and translating them into effective solutions was impressive, showcasing his strong technical and problem-solving skills.`,
      image: 'https://ui-avatars.com/api/?name=Durga+Prasad&size=100&background=0f766e&color=fff&rounded=true',
    },
    {
      name: 'Pooja Parakh',
      text: `Shivang is a highly skilled and dedicated IT professional. His work on deploying NLP models into production at Barclays demonstrated his deep technical knowledge and practical experience. Shivang's strong work ethic, attention to detail, and ability to work efficiently in a team make him a remarkable asset in any project or organization`,
      image: 'https://ui-avatars.com/api/?name=Pooja+Parakh&size=100&background=7c3aed&color=fff&rounded=true',
    },
    {
      name: 'Prarthana Mukherjee',
      text: `Working with Shivang at Barclays was a great experience. His expertise in deploying NLP models into production was instrumental in improving our system's performance. Shivang's ability to handle complex technical challenges and deliver high-quality solutions under tight deadlines was impressive. His collaborative spirit and proactive approach to problem-solving made him an invaluable team member.`,
      image: 'https://ui-avatars.com/api/?name=Prarthana+Mukherjee&size=100&background=be185d&color=fff&rounded=true',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'You can reach out to me here!!',
  items: [
    {
      type: ContactType.Email,
      text: 'sinhashivang35@gmail.com',
      href: 'mailto:sinhashivang35@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Koblenz, Germany',
      href: 'https://maps.app.goo.gl/WSg46QLjcow4yzuY7',
    },
    {
      type: ContactType.Instagram,
      text: '@shivang.sinha',
      href: 'https://www.instagram.com/shivang.sinha',
    },
    {
      type: ContactType.Github,
      text: 'Shivang Sinha',
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

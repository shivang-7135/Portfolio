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
import porfolioImage1 from '../images/portfolio/portfolio-1.jpg';
import porfolioImage2 from '../images/portfolio/portfolio-2.jpg';
import porfolioImage3 from '../images/portfolio/portfolio-3.jpg';
import porfolioImage4 from '../images/portfolio/portfolio-4.jpg';
import porfolioImage5 from '../images/portfolio/portfolio-5.jpg';
import porfolioImage6 from '../images/portfolio/portfolio-6.jpg';
import porfolioImage7 from '../images/portfolio/portfolio-7.jpg';
import porfolioImage8 from '../images/portfolio/portfolio-8.jpg';
import porfolioImage9 from '../images/portfolio/portfolio-9.jpg';
import porfolioImage10 from '../images/portfolio/portfolio-10.jpg';
import porfolioImage11 from '../images/portfolio/portfolio-11.jpg';
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
  title: 'Shivang sinha',
  description: "This is about me.",
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
        I'm a Germany based <strong className="text-stone-100">Data Scientist / Full Stack Software Engineer</strong>, currently Pursuing Masters in Natural Language Processing
        at <strong className="text-stone-100">Trier University.</strong> 
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time time, you can catch me playing <strong className="text-stone-100">Badminton or Cricket</strong>,
        listening to <strong className="text-stone-100">music</strong>, or exploring this beautiful city{' '}
        <strong className="text-stone-100">Koblenz</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/asset/resume.pdf',
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
  description: `A passionate and detail-oriented IT professional with 4 years of expertise in Natural Language Processing (NLP)
and full-stack development. Currently deepening my knowledge with a Master's in NLP, I am enthusiastic about
securing working opportunity to apply my technical skills in Data Science and Artificial Intelligence within a
dynamic and forward-thinking environment.`,
  aboutItems: [
    {label: 'Location', text: 'Koblenz, Germany', Icon: MapIcon},
    {label: 'Age', text: '26', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Indian', Icon: FlagIcon},
    {label: 'Interests', text: 'AI, Badminton and Cricket', Icon: SparklesIcon},
    {label: 'Study', text: 'University of Trier', Icon: AcademicCapIcon},
    // {label: 'Employment', text: 'Instant Domains, inc.', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'German',
        level: 2,
      }
    ],
  },
  {
    name: 'Programming Languages',
    skills: [
      {
        name: 'C++, Java, Python',
        level: 8,
      },
     
    ],
  },
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'React, Angular , Typescript',
        level: 9,
      },
      {
        name: 'HTML 5, CSS',
        level: 8,
      }
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Javascript- Node.js',
        level: 9,
      },
      {
        name: 'Python- Django',
        level: 8,
      },
      {
        name: 'C#',
        level: 6,
      },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      {
        name: `TensorFlow,
Keras, PyTorch, Express, LangChain, Llama-Index`,
        level: 7,
      },
    ],
  },
  {
    name: 'Data Science & Machine Learning',
    skills: [
      {
        name: `NLP, Deep Learning, Data Visualization`,
        level: 7,
      },
    ],
  },
  {
    name: 'Tools & Technologies',
    skills: [
      {
        name: `GitHub, IDEs, Docker, Kubernetes, Git, JIRA, AWS, RESTful APIs, Linux bash`,
        level: 9,
      },
    ],
  },
  {
    name: 'Agile Working Models:',
    skills: [
      {
        name: `Scrum, Kanban`,
        level: 9,
      },
    ],
  },
  {
    name: 'Databases',
    skills: [
      {
        name: `MySQL, MongoDB, PostgreSQL`,
        level: 9,
      },
    ],
  }
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Coming soon',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage1,
  },
  {
    title: 'Project title 2',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage2,
  },
  {
    title: 'Project title 3',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage3,
  },
  {
    title: 'Project title 4',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage4,
  },
  {
    title: 'Project title 5',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage5,
  },
  {
    title: 'Project title 6',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage6,
  },
  {
    title: 'Project title 7',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage7,
  },
  {
    title: 'Project title 8',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage8,
  },
  {
    title: 'Project title 9',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage9,
  },
  {
    title: 'Project title 10',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage10,
  },
  {
    title: 'Project title 11',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage11,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: 'April 2024 - Present',
    location: 'Trier, Germany',
    title: 'Masters in Natural Language Processing',
    content: <p>I am gaining a solid foundation in NLP concepts and advanced machine learning techniques. I am acquiring hands-on experience with Python and deep learning frameworks like TensorFlow and PyTorch, working on projects in text classification, sentiment analysis, and conversational AI. My studies are enhancing my research skills and my ability to critically analyze and implement state-of-the-art NLP models, preparing me to tackle complex language processing challenges in real-world applications.





    </p>,
  },
  {
    date: 'August 2016 - May 2020',
    location: 'Chandigarh, India',
    title: 'Bachelors of Engineering- Computer Science and Engineering',
    content: <p>I built a strong foundation in computer science, focusing on algorithms, data structures, databases, and software engineering. I mastered programming languages such as Java, C++, and Python, and gained experience in software development through hands-on projects. I also learned about operating systems, computer networks, and web development. This program enhanced my problem-solving skills, ability to design efficient algorithms, and competence in developing robust software solutions, preparing me for advanced studies and professional challenges in the tech industry.</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'March 2022- March 2024',
    location: 'Pune, India',
    title: 'Barclays - Senior Software Developer',
    content: (
      <p>
       
      </p>
    ),
  },
  {
    date: 'Sept 2020 - March 2022',
    location: 'Hyderabad, India',
    title: 'Hexagon CCI - Software Developer',
    content: (
      <p>
        
      </p>
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
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Durga Prasad Palle',
      text: `Shivang's contribution to the Hexagon OnCall Dispatch project was outstanding. His ability to architect and manage responsive web applications, coupled with his skill in optimizing performance, greatly enhanced our product. His dedication to understanding client needs and translating them into effective solutions was impressive, showcasing his strong technical and problem-solving skills.`,
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Pooja Parakh',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
    {
      name: 'Prarthana Mukherjee',
      text: `Working with Shivang at Barclays was a great experience. His expertise in deploying NLP models into production was instrumental in improving our system's performance. Shivang's ability to handle complex technical challenges and deliver high-quality solutions under tight deadlines was impressive. His collaborative spirit and proactive approach to problem-solving made him an invaluable team member.`,
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
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
      text: 'shivangsinha2@gmail.com',
      href: 'mailto:shivangsinha2@gmail.com',
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

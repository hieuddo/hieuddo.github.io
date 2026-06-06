import { Icons } from '@/components/icons';
import { HomeIcon, NotebookIcon } from 'lucide-react';

export const DATA = {
  name: 'Jaime Hieu Do',
  initials: 'JHD',
  url: 'https://hieuddo.github.io',
  location: 'Singapore',
  locationLink: 'https://maps.app.goo.gl/j4vQ1ED92G9Fohu6A',
  description: 'Research Scientist',
  affiliation: 'Preferred.AI, SMU',
  summary:
    'Xin chào (Hello)! I am currently a Research Scientist at Singapore Management University ([Preferred.AI](https://preferred.ai/)) where I work on behavioral understanding for portfolio management. I completed my Ph.D. at SMU School of Computing and Information Systems, where I was advised by [Prof. Hady W. Lauw](https://www.hadylauw.com/). Prior to that, I obtained my B.Sc. in Computer Science from Vietnam National University, Hanoi, under the supervision of Dr. Mai-Vu Tran and [Dr. Duc-Trong Le](https://sites.google.com/view/trongld). My research primarily revolves around the formulation and solution of dynamic real-world problems.',
  avatarUrl: '/me.webp',
  skills: [
    'Recommendation Systems',
    'Cross-Domain Recommendations',
    'Multi-Task Learning',
    'Continual Learning',
    'Mixture of Experts',
    'User Behavior Understanding',
    'Behavioral Analysis for Portfolio Management',
  ],

  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/publication', icon: NotebookIcon, label: 'Publication' },
  ],

  contact: {
    email: 'dinhhieudo@smu.edu.sg',
    social: {
      'Google Scholar': {
        name: 'Google Scholar',
        url: 'https://scholar.google.com/citations?user=IIHEqm0AAAAJ',
        icon: Icons.ggscholar,
        navbar: true,
      },
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/hieuddo',
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hieuddo/',
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: 'Send Email',
        url: 'mailto:dinhhieudo@smu.edu.sg',
        icon: Icons.email,
        navbar: true,
      },
      Resume: {
        name: 'Resume',
        url: '/Resume.pdf',
        icon: Icons.resume,
        navbar: true,
      },
    },
  },

  news: [
    {
      title:
        '"Compositions of Variant Experts for Integrating Short-Term and Long-Term Preferences" accepted at TORS!',
      href: 'https://dl.acm.org/doi/pdf/10.1145/3795520',
      subtitle: 'Read camera-ready version here!',
      date: '1 Jan 2026',
      type: 'publication',
    },
    {
      title:
        'I started my postdoctoral research at Preferred.AI as a Research Scientist!',
      href: '',
      subtitle: '',
      date: 'Nov 2025',
      type: 'career',
    },
    {
      title:
        'I successfully defended my PhD dissertation, titled "Modeling Multiple Tasks in Recommendation Systems". Read here!',
      href: '/dissertation.pdf',
      subtitle: '',
      date: 'Jul 2025',
      type: 'milestone',
    },
    {
      title:
        'Paper\'s out, titled "Compositions of Variant Experts for Integrating Short-Term and Long-Term Preferences". Read here!',
      href: 'https://arxiv.org/pdf/2506.23170',
      subtitle: '',
      date: 'Jun 2025',
      type: 'publication',
    },
    {
      title: 'Paper accepted at SIGKDD Explorations. Read here!',
      href: 'https://kdd.org/exploration_files/p52-CDR.pdf',
      subtitle:
        'Dual-Target Disjointed Cross-Domain Recommendation Mediated via Latent User Preferences',
      date: 'May 2025',
      type: 'publication',
    },
    {
      title: "Volunteered at The Web Conference 2024 (WWW'24). Read blog post!",
      href: 'https://preferred.ai/blog/the-web-conference-2024-in-singapore',
      subtitle: '',
      date: 'May 2024',
      type: 'event',
    },
    {
      title: "Attended and presented poster at RecSys'2023. Blog post here!",
      href: 'https://preferred.ai/blog/recsys-2023-in-singapore',
      subtitle: '',
      date: 'Sep 2023',
      type: 'event',
    },
    {
      title:
        'Paper accepted at RecSys-23, Late-Breaking Results (LBR) track. Read here!',
      href: '/papers/recsys23lbr.pdf',
      subtitle: 'Continual Collaborative Filtering Through Gradient Alignment',
      date: 'Jul 2023',
      type: 'publication',
    },
    {
      title: 'Passed Qualifying Exam',
      href: '',
      subtitle: '',
      date: 'Nov 2021',
      type: 'milestone',
    },
    {
      title: 'Started my Ph.D. journey',
      href: '',
      subtitle: 'SMU School of Computing and Information Systems',
      date: 'Aug 2020',
      type: 'milestone',
    },
    {
      title: 'Graduated from VNU-UET',
      href: '',
      subtitle: 'Summa Cum Laude, Excellent Thesis Award',
      date: 'Jul 2020',
      type: 'milestone',
    },
  ],

  work: [
    {
      company: 'Singapore Management University - Preferred.AI',
      href: 'https://preferred.ai/',
      badges: [],
      location: 'Singapore',
      title: 'Research Scientist',
      logoUrl: '/work/smu.svg',
      start: 'Nov 2025',
      end: 'Present',
      description: [
        'Designing systems and solutions for user understanding and personalization in financial services.',
        'Building agentic AI solutions with dozens of primitive tools for investor profiling using LangGraph and Ollama.',
        'Developing RAG pipelines for correctness-first data retrieval with LangChain and LCEL.',
      ],
    },
    {
      company: 'OSP JSC',
      href: '',
      badges: [],
      location: 'Hanoi, Vietnam',
      title: 'AI Engineer Intern',
      logoUrl: '',
      start: 'May 2019',
      end: 'Apr 2020',
      description: [
        'Engineered predictive pipelines (linear regression, ARIMA, XGBoost) for customer lifetime value.',
        'Built a real-time face recognition system with InsightFace embeddings and a cosine k-NN classifier.',
        'Built a Vietnamese news recommender system powered by a language model trained from scratch.',
      ],
    },
  ],

  education: [
    {
      school: 'SMU School of Computing and Information Systems',
      href: 'https://computing.smu.edu.sg/',
      degree: 'PhD in Computer Science',
      logoUrl: '/work/smu.svg',
      start: '2020',
      end: '2025',
    },
    {
      school: 'VNU University of Engineering and Technology',
      href: 'https://uet.vnu.edu.vn/',
      degree: 'BSc in Computer Science',
      logoUrl: '/work/uet.webp',
      start: '2016',
      end: '2020',
    },
  ],

  teaching: [
    {
      title: 'Machine Learning - CS712',
      dates: 'AY2024/2025, AY2022/2023',
      role: 'Teaching Assistant',
      description:
        'Designed a group project (image sequencing - returning the order of given sets of images), crawled data, and implemented a baseline. Answered student questions and consulted on project implementation.',
      image: '',
      links: [],
    },
    {
      title: 'Recommender Systems - CS608',
      dates: 'AY2024/2025, AY2023/2024, AY2022/2023',
      role: 'Teaching Assistant',
      description:
        'Consulted on all aspects of hands-on experiments, project implementation, and the final project.',
      image: '',
      links: [],
    },
  ],

  service: [
    { type: 'Journal Reviewer', venues: 'TORS 2024' },
    { type: 'Conference Reviewer', venues: 'KDD 2026' },
  ],
} as const;

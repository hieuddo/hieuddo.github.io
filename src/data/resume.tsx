import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Jaime Hieu Do",
  initials: "JHD",
  url: "https://hieuddo.github.io",
  location: "Singapore",
  locationLink: "https://maps.app.goo.gl/j4vQ1ED92G9Fohu6A",
  description: "PhD Candidate in Computer Science",
  summary:
    "Xin chào (Hello)! I am currently a PhD candidate at [Preferred.AI](https://preferred.ai/) and SMU School of Computing and Information Systems, advised by [Prof. Hady W. Lauw](https://www.hadylauw.com/). Previously, I obtained my B.Sc. degree in Computer Science at University of Engineering and Technology, Vietnam National University, Hanoi, under the supervision of Dr. Mai-Vu Tran and [Dr. Duc-Trong Le](https://sites.google.com/view/trongld). My primary area of research revolves around the formulation and solution of dynamic real-world recommender systems.",
  avatarUrl: "/me.jpg",
  skills: [
    "Recommendation Systems",
    "Cross-Domain Recommendations",
    "Sequential Recommendations",
    "Session-Based",
    "Session-Aware",
    "Next-Item",
    "Next-Basket",
    "Multi-Task",
    "Continual Learning",
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/publication", icon: NotebookIcon, label: "Publication" },
  ],

  contact: {
    email: "dinhhieu.do.2020@smu.edu.sg",
    // tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/hieuddo",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/hieuddo/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:dinhhieu.do.2020@smu.edu.sg",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  news: [
    {
      company: "Volunteered at The Web Conference 2024 (WWW'24)",
      href: "",
      badges: [],
      location: "",
      title: "",
      logoUrl: "",
      start: "May 2024",
      end: "",
      description: "Singapore",
    },
    {
      company: "Attended and presented poster at RecSys'2023. Blog post here!",
      href: "https://preferred.ai/recsys-2023-in-singapore/",
      badges: [],
      location: "",
      title: "Singapore",
      logoUrl: "",
      start: "Sep 2023",
      end: "",
      description: "",
    },
    {
      company:
        "Paper accepted at RecSys-23, Late-Breaking Results (LBR) track. Read here!",
      href: "/papers/recsys23lbr.pdf",
      badges: [],
      location: "",
      title: "Continual Collaborative Filtering Through Gradient Alignment",
      logoUrl: "",
      start: "Jul 2023",
      end: "",
      description: "",
    },
    {
      company: "Passed Qualifying Exam",
      href: "",
      badges: [],
      location: "",
      title: "",
      logoUrl: "",
      start: "Nov 2021",
      end: "",
      description: " ",
    },
    {
      company: "Started Ph.D. journey",
      href: "",
      badges: [],
      location: "",
      title: "",
      logoUrl: "",
      start: "Aug 2020",
      end: "",
      description: "SMU School of Computing and Information Systems",
    },
    {
      company: "Graduated from VNU-UET",
      href: "",
      badges: [],
      location: "",
      title: "",
      logoUrl: "",
      start: "Jul 2020",
      end: "",
      description: "Summa Cum Laude, Excellent Thesis Award",
    },
  ],

  education: [
    {
      school: "SMU School of Computing and Information Systems",
      href: "https://computing.smu.edu.sg/",
      degree: "PhD in Computer Science",
      logoUrl: "/work/smu.svg",
      start: "2020",
      end: "",
    },
    {
      school: "VNU University of Engineering and Technology",
      href: "https://uet.vnu.edu.vn/",
      degree: "BSc in Computer Science",
      logoUrl: "/work/uet.png",
      start: "2016",
      end: "2020",
    },
  ],

  teaching: [
    {
      title: "Machine Learning - IS712",
      dates: "AY2024/2025, AY2022/2023",
      role: "Teaching Assistant",
      description:
        "Designed a group project (image sequencing - returning the order of given sets of images), crawled data, and implemented a baseline. Answered student questions and consulted on project implementation.",
      image: "",
      links: [],
    },
    {
      title: "Recommender Systems - CS608",
      dates: "AY2023/2024, AY2022/2023",
      role: "Teaching Assistant",
      description:
        "Consulted on all aspects of hands-on experiments, project implementation, and the final project.",
      image: "",
      links: [],
    },
  ],

  service: [{ type: "Journal Reviewer", venues: "TORS 2024" }],
} as const;

export const profile = {
  name: "Sanskar Pandey",
  firstName: "Sanskar",
  role: "App & Software Developer",
  email: "pyc0453@gmail.com",
  phone: "+91 82991 32255",
  phoneHref: "tel:+918299132255",
  whatsapp: "https://wa.me/918299132255",
  github: "https://github.com/SanskarDeveloper",
  linkedin: "https://www.linkedin.com/in/sanskar-pandey-ba9359360/",
  availability: "Available for freelance & collaborations",
  location: "Remote · Worldwide",
  monogram: "SP",
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: 3, suffix: "", label: "Apps on Google Play" },
  { value: 6, suffix: "", label: "Core services" },
  { value: 100, suffix: "%", label: "End-to-end ownership" },
];

export const roles = [
  "Android Developer",
  "Flutter Developer",
  "Web Developer",
  "Problem Solver",
];

export const services = [
  {
    id: "android",
    icon: "smartphone",
    title: "Android App Development",
    description:
      "Native Android apps built with Kotlin and Jetpack Compose - fast, accessible and Play Store ready.",
  },
  {
    id: "ios",
    icon: "apple",
    title: "iOS App Development",
    description:
      "Cross-platform iOS applications with native-quality interfaces, smooth navigation and reliable performance.",
  },
  {
    id: "flutter",
    icon: "layers",
    title: "Flutter App Development",
    description:
      "One codebase, two platforms. Flutter apps with pixel-accurate UI and consistent behaviour on Android and iOS.",
  },
  {
    id: "web",
    icon: "globe",
    title: "Website Development",
    description:
      "Modern, responsive websites and landing pages - clean design, quick load times and mobile-first layouts.",
  },
  {
    id: "backend",
    icon: "code",
    title: "Backend & API Integration",
    description:
      "Connecting your app to real data - REST APIs, authentication, databases and third-party services done right.",
  },
  {
    id: "firebase",
    icon: "flame",
    title: "Firebase Integration",
    description:
      "Firebase Authentication, Firestore, Cloud Functions and push notifications set up for scale and reliability.",
  },
];

export const projects = [
  {
    id: "nmj",
    name: "NMJ",
    subtitle: "Donation App",
    type: "Android App",
    status: "Live",
    variant: "nmj",
    accent: "255, 107, 138",
    accentSolid: "#ff6b8a",
    accent2: "#ff9a62",
    rotation: "-3deg",
    description:
      "A dedicated donation platform that makes giving simple, accessible and available from anywhere.",
    problem:
      "The donation process was hard to access through a digital platform, which limited reach and convenience for potential donors.",
    solution:
      "A focused mobile app that gives users direct access to donation-related services with a clean, welcoming flow.",
    highlights: [
      "Simple donation flow designed for first-time users",
      "Firebase-backed data and content delivery",
      "Published and maintained on the Google Play Store",
    ],
    tags: ["Android", "Firebase"],
    link: "https://play.google.com/store/apps/details?id=com.ronak.nmj",
  },
  {
    id: "apnafood",
    name: "ApnaFood",
    subtitle: "Food Delivery App",
    type: "Android App",
    status: "Live",
    variant: "food",
    accent: "255, 176, 32",
    accentSolid: "#ffb020",
    accent2: "#ff7a00",
    rotation: "2.5deg",
    description:
      "A food delivery app that connects customers with home-cooked meals from local kitchens.",
    problem:
      "Homemade food was difficult to discover and order online, leaving small home kitchens without a digital storefront.",
    solution:
      "A platform where customers can explore homemade food, browse options and place orders with ease.",
    highlights: [
      "Home-kitchen discovery and ordering experience",
      "Firebase integration for live app data",
      "Live on Google Play with real customers",
    ],
    tags: ["Android", "Firebase"],
    link: "https://play.google.com/store/apps/details?id=com.pradiip.apnafood",
  },
  {
    id: "applyz",
    name: "ApplyZ",
    subtitle: "Jobs & Exams",
    type: "Android App",
    status: "Live",
    variant: "applyz",
    accent: "124, 139, 255",
    accentSolid: "#7c8bff",
    accent2: "#38d6f5",
    rotation: "-2deg",
    description:
      "A government jobs and competitive exams app with personalised alerts, so students never miss an opportunity.",
    problem:
      "Students struggle to keep track of government job notifications, exam updates and application deadlines across scattered sources.",
    solution:
      "A centralised app with organised listings and personalised push notifications that keep users informed at the right time.",
    highlights: [
      "Kotlin + Jetpack Compose, modern Android stack",
      "Firestore data with Cloud Functions automation",
      "Personalised notifications via Firebase Cloud Messaging",
    ],
    tags: [
      "Kotlin",
      "Jetpack Compose",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
      "FCM",
    ],
    link: "https://play.google.com/store/apps/details?id=com.manish.applyZ",
  },
];

export const skillGroups = [
  {
    id: "mobile",
    label: "Mobile",
    icon: "smartphone",
    blurb: "Native and cross-platform apps, taken from idea to store release.",
    items: [
      "Android",
      "Kotlin",
      "Jetpack Compose",
      "Flutter",
      "Dart",
      "iOS",
      "Play Store",
      "Material Design",
    ],
  },
  {
    id: "web",
    label: "Web",
    icon: "globe",
    blurb: "Responsive, fast interfaces that work beautifully on every screen.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive UI",
      "Landing Pages",
      "Web Performance",
      "Accessibility",
    ],
  },
  {
    id: "backend",
    label: "Backend & Cloud",
    icon: "server",
    blurb: "Connecting products to real data, auth and notifications.",
    items: [
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
      "FCM",
      "REST APIs",
      "API Integration",
      "Node.js",
      "Express",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    blurb: "The day-to-day toolkit behind consistent, shippable work.",
    items: [
      "Git",
      "GitHub",
      "Android Studio",
      "VS Code",
      "Play Console",
      "Postman",
      "Figma",
    ],
  },
];

export const experience = [
  {
    period: "Present",
    title: "Independent App Developer",
    place: "Freelance & personal projects",
    description:
      "Building and publishing Android, Flutter and web applications end to end - from UI implementation and backend integration to Play Store releases.",
  },
  {
    period: "Present",
    title: "Development Team Collaborator",
    place: "Collaborative projects",
    description:
      "Working alongside a development team on shared products - contributing to features, integrations and delivery while keeping the codebase consistent.",
  },
  {
    period: "Ongoing",
    title: "Published App Developer",
    place: "Google Play Store",
    description:
      "Three applications live on the Play Store across donation, food delivery and government jobs - each solving a specific, real-world problem.",
  },
];

export const projectTypes = [
  "Android app",
  "iOS app",
  "Flutter app",
  "Website",
  "Backend / API integration",
  "Firebase integration",
  "Something else",
];

export const facts = [
  { label: "Focus", value: "Mobile & web products" },
  { label: "Core stack", value: "Kotlin · Flutter · Firebase" },
  { label: "Backend", value: "REST APIs & cloud services" },
  { label: "Work style", value: "Remote & collaborative" },
];

export const codeFiles = [
  {
    id: "profile",
    label: "profile.ts",
    copyText:
      'const sanskar = {\n  role: "App & Software Developer",\n  focus: ["Android", "Flutter", "Web"],\n  available: true\n};',
  },
  {
    id: "stack",
    label: "stack.json",
    copyText:
      '{\n  "mobile": ["Kotlin", "Jetpack Compose", "Flutter", "Dart"],\n  "cloud": ["Firebase", "Firestore", "Cloud Functions"],\n  "web": ["HTML", "CSS", "JavaScript"]\n}',
  },
  {
    id: "status",
    label: "status.txt",
    copyText:
      "> building   ApplyZ - jobs & exam alerts\n> exploring  AI-powered mobile features\n> open for   freelance & collaborations\n> contact    pyc0453@gmail.com",
  },
];

export const marqueeItems = [
  "Android",
  "Kotlin",
  "Jetpack Compose",
  "Flutter",
  "Dart",
  "Firebase",
  "Firestore",
  "Cloud Functions",
  "FCM",
  "REST APIs",
  "Web Development",
  "Play Console",
  "Node.js",
  "Express",
];


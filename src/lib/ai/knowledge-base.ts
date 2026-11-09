/** 
 * Knowledge base for Sanskar Pandey's portfolio AI assistant.
 * Contains structured information about the developer, services, projects, and contact details.
 * Used by the LangChain assistant to provide accurate, factual responses.
 */

/**
 * Document structure for knowledge base entries
 */
export interface KnowledgeDocument {
  id: string;
  category: string;
  title: string;
  content: string;
  metadata?: Record<string, string>;
}

/**
 * Categorized knowledge base for Sanskar Pandey's portfolio
 * All information is verified and sourced from the portfolio itself.
 */
export const knowledgeBase: KnowledgeDocument[] = [
  {
    id: "personal-intro",
    category: "personal",
    title: "Personal Introduction",
    content:
      "Sanskar Pandey is an App Developer and Software Developer working on building practical digital solutions for businesses and individuals.",
    metadata: { role: "App Developer & Software Developer" },
  },
  {
    id: "services",
    category: "services",
    title: "Services",
    content:
      "Sanskar's services include: Android App Development, iOS App Development, Flutter App Development, Website Development, Backend Integration and API Integration, and Firebase Integration.",
    metadata: { role: "App Developer & Software Developer" },
  },
  {
    id: "projects-nmj",
    category: "projects",
    title: "Project 1: NMJ – Donation App",
    content:
      "A donation application designed to make the donation process easier and more accessible. Available on Google Play: https://play.google.com/store/apps/details?id=com.ronak.nmj. Tech Stack: Android Development, Firebase.",
    metadata: { platform: "Android", backend: "Firebase", playStore: "https://play.google.com/store/apps/details?id=com.ronak.nmj" },
  },
  {
    id: "projects-apnafood",
    category: "projects",
    title: "Project 2: ApnaFood – Food Delivery App",
    content:
      "A food delivery application focused on connecting customers with home-cooked food. Available on Google Play: https://play.google.com/store/apps/details?id=com.pradiip.apnafood. Tech Stack: Android Development, Firebase.",
    metadata: { platform: "Android", backend: "Firebase", playStore: "https://play.google.com/store/apps/details?id=com.pradiip.apnafood" },
  },
  {
    id: "projects-applyz",
    category: "projects",
    title: "Project 3: ApplyZ – Government Jobs & Exams",
    content:
      "An application that provides information about government jobs, competitive exams, and personalized notifications. Built with Kotlin, Jetpack Compose, Firebase Authentication, Firestore, Cloud Functions, and Firebase Cloud Messaging. Available on Google Play: https://play.google.com/store/apps/details?id=com.manish.applyZ.",
    metadata: { platform: "Android", language: "Kotlin", ui: "Jetpack Compose", backend: "Firebase Authentication, Firestore, Cloud Functions, FCM", playStore: "https://play.google.com/store/apps/details?id=com.manish.applyZ" },
  },
  {
    id: "technical-skills",
    category: "skills",
    title: "Technical Skills",
    content:
      "Sanskar works with Android, Flutter, Web Development, and cross-platform application development. He focuses on creating user-friendly, scalable, and reliable applications that solve real-world problems. His services include Android App Development, iOS App Development, Flutter App Development, Website Development, Backend Integration and API Integration, and Firebase Integration.",
    metadata: { role: "App Developer & Software Developer" },
  },
  {
    id: "contact-info",
    category: "contact",
    title: "Contact Information",
    content:
      "Email: pyc0453@gmail.com. WhatsApp: +91 82991 32255. WhatsApp URL: https://wa.me/918299132255. GitHub: https://github.com/SanskarDeveloper. LinkedIn: https://www.linkedin.com/in/sanskar-pandey-ba9359360/.",
    metadata: { role: "App Developer & Software Developer" },
  },
  {
    id: "experience",
    category: "experience",
    title: "Experience",
    content:
      "Sankar has practical experience in developing and publishing applications on the Google Play Store, working on real-world projects, integrating backend services, and building applications for different use cases. He also collaborates with a development team on various projects.",
    metadata: { role: "App Developer & Software Developer" },
  },
  {
    id: "faq",
    category: "faq",
    title: "Frequently Asked Questions",
    content:
      "Q: What does Sanskar do? A: Sanskar is an app and software developer working on building practical digital solutions for businesses and individuals. He works with Android, Flutter, Web Development, and cross-platform application development.\n\nQ: Can Sanskar develop an iOS app? A: Yes, iOS App Development is one of Sanskar's services.\n\nQ: How can I contact Sanskar? A: You can reach Sanskar via email at pyc0453@gmail.com or WhatsApp at +91 82991 32255.\n\nQ: Does Sanskar have experience with Firebase? A: Yes, Firebase appears in his project experience, including ApplyZ which uses Firebase Authentication, Firestore, Cloud Functions, and Firebase Cloud Messaging.\n\nQ: Can I hire Sanskar? A: Absolutely. You can discuss your project directly with Sanskar through WhatsApp or email.",
    metadata: { role: "App Developer & Software Developer" },
  },
];
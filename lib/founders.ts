/** Professional profiles based on founder-confirmed background and relevant public projects. Publication authorized October 3, 2026. */
export const FOUNDERS = [
  {
    id: 'walter', name: 'Walter McCain III', firstName: 'Walter',
    linkedin: 'https://www.linkedin.com/in/waltermccainiii',
    image: '/images/founders/walter-mccain.webp', imageWidth: 960, imageHeight: 640, imagePosition: 'center center',
    bio: 'Walter McCain III is a co-founder of Signal Harbor, combining expertise in applied AI and data science with experience building custom software and automation solutions.',
    sections: [
      {
        title: 'Applied AI and data science',
        text: 'He holds a Bachelor of Science in Bioinformatics and a Master of Science in Data Science. His work spans machine learning, model evaluation, and reproducible data workflows. Before Signal Harbor, he founded a company developing AI automation and custom software solutions.',
      },
      {
        title: 'At Signal Harbor',
        text: 'At Signal Harbor, his focus is the technical foundation behind AI visibility: reliable research, connected data, and measurement that helps marketing teams evaluate progress and make informed decisions.',
      },
    ],
  },
  {
    id: 'sebastian', name: 'Sebastian Miller', firstName: 'Sebastian',
    linkedin: 'https://www.linkedin.com/in/sebastian-miller-b39017268',
    image: '/images/founders/sebastian-miller.webp', imageWidth: 960, imageHeight: 960, imagePosition: 'center top',
    bio: 'Sebastian Miller brings experience in marketing operations, sales, and client delivery to his work as co-founder of Signal Harbor.',
    sections: [
      {
        title: 'Marketing and client delivery',
        text: 'He holds a degree in Philosophy and Marketing with a focus on Entrepreneurship. He founded a coaching business and worked in marketing for an international AI and blockchain organization, producing copy, planning sprints, and managing teams. His experience in roofing sales and painting project management strengthened his approach to customer relationships, project coordination, and delivering against agreed expectations.',
      },
      {
        title: 'At Signal Harbor',
        text: "At Signal Harbor, he brings this experience to campaign planning, clear messaging, and coordinated execution, keeping the work focused on buyer needs and the client's business priorities.",
      },
    ],
  },
] as const;

export const myProjects = [
  {
    id: 'banrakshak',
    title: 'BanRakshak',
    category: 'AI / Audio ML',
    description:
      'AI-powered system that analyzes forest audio to detect and classify threats like chainsaws and gunshots in real-time.',
    image: '/assets/projects/accesories.png',
    githubUrl: 'https://github.com/nishanshrestha04/BanRakshak',
    liveUrl: 'https://nishanshrestha04.com.np',
    overview:
      'BanRakshak is an intelligent acoustic surveillance system designed to protect forests. By analyzing continuous audio streams, it can detect and classify specific sounds indicative of illegal logging or poaching, such as chainsaws and gunshots.',
    problem:
      'Deforestation and illegal logging often occur in remote areas where visual surveillance is impractical or too expensive. Traditional monitoring relies on physical patrols, which are inefficient and slow to respond.',
    approach:
      'I developed an acoustic monitoring pipeline that converts audio signals into spectrograms, allowing us to treat audio classification as an image classification problem using deep learning.',
    architecture: [
      'Audio Stream Capture',
      'Preprocessing & Noise Reduction',
      'Spectrogram Conversion',
      'CNN Classification Model',
      'Alert Generation API',
      'React Frontend Dashboard',
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Tailwind CSS'],
    tags: [
      { name: 'React' },
      { name: 'Python' },
      { name: 'TensorFlow' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    id: 'stroke-prediction',
    title: 'Stroke Prediction System',
    category: 'MLOps / Data',
    description:
      'An end-to-end MLOps pipeline predicting stroke risk, featuring experiment tracking, data engineering, and automated deployment.',
    image: '/assets/projects/stroke.png',
    githubUrl: 'https://github.com/nishanshrestha04/MLOps_Project',
    liveUrl: null,
    overview:
      'This project implements a complete Machine Learning Operations (MLOps) lifecycle for a stroke risk prediction model. It focuses on the engineering infrastructure required to reliably train, track, and serve an ML model in production.',
    problem:
      'Building a machine learning model is only a fraction of the work. Ensuring the model can be reliably reproduced, tracked, and served via an API is a major engineering challenge.',
    approach:
      'I utilized MLflow for experiment tracking and model registry, built a scalable API using FastAPI, and containerized the entire system with Docker for reproducible deployments.',
    architecture: [
      'Patient Data Ingestion',
      'Data Cleaning & Feature Engineering',
      'Model Training (Logistic Regression)',
      'MLflow Experiment Tracking',
      'Model Registry',
      'FastAPI Inference Endpoint',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'MLflow',
      'Airflow',
      'Docker',
      'Scikit-learn',
    ],
    tags: [
      { name: 'Airflow' },
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Scikit-learn' },
    ],
  },
  {
    id: 'pdf-chatbot',
    title: 'PDF Reading Chatbot',
    category: 'GenAI / RAG',
    description:
      'An intelligent chatbot built with LangChain that reads and understands PDF documents using RAG architectures.',
    image: '/assets/projects/chat.png',
    githubUrl: 'https://github.com/nishanshrestha04/pdf_reading_chatbot',
    liveUrl: null,
    overview:
      "A Retrieval-Augmented Generation (RAG) system that allows users to 'chat' with their PDF documents. The system extracts text, generates vector embeddings, and uses an LLM to answer questions strictly based on the document's context.",
    problem:
      'Extracting specific information from dense, multi-page PDF documents is time-consuming and inefficient using standard keyword search.',
    approach:
      "I implemented a RAG pipeline using LangChain. The document is chunked, embedded into a vector database, and relevant chunks are retrieved via semantic search to augment the LLM's prompt.",
    architecture: [
      'PDF Upload & Parsing',
      'Text Chunking',
      'Vector Embeddings Generation',
      'Semantic Vector Search',
      'Context-Augmented Prompting',
      'LLM Inference',
    ],
    technologies: ['Python', 'LangChain', 'FastAPI', 'React', 'Vector DB'],
    tags: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'React' },
      { name: 'LangChain' },
    ],
  },
  {
    id: 'trinova',
    title: 'Trinova (YogAI)',
    category: 'AI / Vision',
    description:
      'Real-time yoga pose detection app providing instant feedback and hands-free gesture control using MediaPipe.',
    image: '/assets/projects/code-placeholder.svg',
    githubUrl: 'https://github.com/nishanshrestha04/trinova',
    liveUrl: null,
    overview:
      'YogAI is a computer vision application that tracks human body landmarks in real-time to analyze yoga poses and provide corrective feedback to the user.',
    problem:
      'Practicing yoga at home without an instructor can lead to incorrect posture and potential injuries.',
    approach:
      "I integrated Google's MediaPipe Pose infrastructure to extract skeletal landmarks from the webcam feed, then calculated joint angles to determine pose accuracy.",
    architecture: [
      'Webcam Feed Integration',
      'MediaPipe Landmark Extraction',
      'Joint Angle Calculation',
      'Pose Classification',
      'Real-time UI Feedback Loop',
    ],
    technologies: ['Python', 'MediaPipe', 'React', 'Django'],
    tags: [{ name: 'Python' }, { name: 'React' }],
  },
  {
    id: 'streamify',
    title: 'Streamify',
    category: 'Full Stack',
    description:
      'A modern full-stack video streaming platform featuring uploads, playback, and interactive social features.',
    image: '/assets/projects/code-placeholder.svg',
    githubUrl: 'https://github.com/nishanshrestha04/streamify',
    liveUrl: null,
    overview:
      'Streamify is a comprehensive video sharing application mimicking core features of major streaming platforms. It handles secure user authentication, large file uploads, and relational data management for comments and likes.',
    problem:
      'Handling large media files and ensuring smooth video playback while maintaining a responsive, interactive user interface is technically demanding.',
    approach:
      'Built a robust backend to handle chunked video uploads and streaming, coupled with a highly responsive React frontend utilizing modern state management.',
    architecture: [
      'React Frontend Interface',
      'User Authentication Flow',
      'Video Upload & Processing API',
      'Media Storage System',
      'Relational Database (Users, Likes, Comments)',
    ],
    technologies: ['React', 'Python', 'Tailwind CSS', 'PostgreSQL'],
    tags: [{ name: 'React' }, { name: 'Python' }, { name: 'Tailwind CSS' }],
  },
  {
    id: 'socialsphere',
    title: 'SocialSphere',
    category: 'Backend',
    description:
      'A PHP-based social networking platform designed for community building, featuring robust relational data architecture.',
    image: '/assets/projects/code-placeholder.svg',
    githubUrl: 'https://github.com/nishanshrestha04/socialsphere',
    liveUrl: 'https://nishanshrestha04.com.np',
    overview:
      'SocialSphere is a traditional server-rendered social network. It focuses heavily on backend database design, handling complex relationships like friends, posts, and nested comments.',
    problem:
      'Managing complex many-to-many relationships in a relational database while ensuring fast query performance.',
    approach:
      'Designed a normalized MariaDB schema and implemented secure, session-based authentication using raw PHP.',
    architecture: [
      'PHP Server Logic',
      'MariaDB Relational Schema',
      'Session Management',
      'Admin Dashboard Access Control',
    ],
    technologies: ['PHP', 'MariaDB', 'JavaScript', 'Bootstrap'],
    tags: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'MariaDB' }],
  },
];

export const mySocials = [
  {
    name: 'Devfolio',
    href: 'https://devfolio.co/@nishanshrestha',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nishanshrestha04/',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/nishanshrestha04',
  },
];

export const experiences = [
  {
    title: 'Front-end Intern',
    job: 'Ninja Infosys',
    date: 'Aug 2025 - Jan 2026',
    contents: [
      'Worked on a production-grade government ICMS platform, contributing to both admin dashboards and public-facing applications.',
      'Built and maintained UI components using Next.js and the IBM Carbon Design System.',
      'Implemented state management with Zustand and handled server-side data using React Query.',
      'Integrated REST APIs and contributed to the GraphQL schema for specific modules.',
    ],
  },
  {
    title: 'Event Executive',
    job: 'Sunway Student Representative Council',
    date: 'May 2024 - Jan 2025',
    contents: [
      'Planned and executed diverse student club events, managing logistics and vendor negotiations.',
      "Collaborated with cross-functional student teams to align event execution with the organization's goals.",
      'Handled multiple events simultaneously, improving crisis management and operational efficiency.',
    ],
  },
];

export const myToolkit = [
  {
    title: 'AI / ML',
    icon: 'Binary',
    items: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost'],
  },
  {
    title: 'Generative AI',
    icon: 'Sparkles',
    items: [
      'LLMs',
      'RAG Architectures',
      'LangChain',
      'Agentic Systems',
      'Vector DBs (Chroma/FAISS)',
    ],
  },
  {
    title: 'Frontend',
    icon: 'Layout',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    items: ['FastAPI', 'Django', 'Node.js', 'Express', 'REST / GraphQL'],
  },
  {
    title: 'Data / DBs',
    icon: 'Database',
    items: ['PostgreSQL', 'MariaDB / MySQL', 'MongoDB', 'Redis', 'Pandas'],
  },
  {
    title: 'Infrastructure',
    icon: 'Terminal',
    items: [
      'Docker',
      'Git & GitHub Actions',
      'Linux / Nginx',
      'MLflow',
      'Apache Airflow',
    ],
  },
];

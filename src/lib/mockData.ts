import { FounderProfile, Publication, ScienceArticle, InnovationProject, SiteSettings } from '../types';

export const initialFounderProfile: FounderProfile = {
  fullName: "Nikhilendra Srinivas",
  designation: "Founder and Pioneer of Cognisrin",
  professionalIdentities: [
    "Author",
    "Entrepreneur",
    "Science Enthusiast"
  ],
  lecturesCount: 600,
  lecturesMilestoneText: "600+ Lectures Delivered Across India",
  photoUrl: "/images/founder-portrait.jpg", // Clear architectural placeholder provided when empty
  biographySummary: "Nikhilendra Srinivas is the Founder and Pioneer of Cognisrin, an independent organisation committed to encouraging scientific inquiry, technological innovation, and disciplined entrepreneurial thinking across India and beyond.",
  fullBiography: "Nikhilendra Srinivas is an author, entrepreneur, and science enthusiast who established Cognisrin as an institutional platform to bridge theoretical scientific exploration with pragmatic technological innovation and entrepreneurial execution. Guided by first-principles inquiry and a lifelong dedication to scientific exploration, he has actively inspired emerging minds and researchers through extensive nationwide engagements.\n\nHaving delivered more than 600 lectures across academic institutions, public symposiums, and research forums throughout India, Nikhilendra has continually championed the democratization of scientific curiosity and rigorous innovation. His published works, including 'The Entrepreneur Genesis' and 'The Power Within – Quantum', reflect his dual commitment to foundational scientific inquiry and institutional value creation.",
  dateOfBirth: "31-05-2008",
  placeOfBirth: "Gadwal, Telangana",
  currentInstitution: "Undergraduate Scholar, Osmania University",
  educationalBackground: "Currently pursuing Undergraduate studies at Osmania University, Telangana. Actively engaged in theoretical physics exploration, enterprise development frameworks, and scientific lecturing nationwide.",
  personalJourney: "Driven by curiosity regarding fundamental physical principles and the mechanisms that translate scientific discoveries into societal wealth and institutional progress, Nikhilendra Srinivas formulated Cognisrin as an autonomous hub for multidisciplinary exploration. Over years of delivering hundreds of keynote lectures across India, he observed the acute necessity for an organisation that treats science, technological invention, and entrepreneurship not as isolated verticals, but as a continuous cycle of knowledge creation.",
  scientificInterests: [
    "Quantum Physics & Quantum Mechanics Foundations",
    "Nuclear Science & Applied Particle Dynamics",
    "Nanotechnology & Advanced Material Structures",
    "Chemical Physics & Molecular Engineering",
    "Emerging Energy Systems & Deep-Tech Architectures"
  ],
  entrepreneurialInterests: [
    "Deep-Technology Incubation & IP Translation",
    "First-Principles Enterprise Architecture",
    "Sustainable Scientific Commercialization",
    "High-Impact Applied Engineering Ventures",
    "Institutional R&D Governance"
  ],
  visionAndPhilosophy: "Cognisrin rests upon the conviction that a society's long-term prosperity is determined by its scientific curiosity, its appetite for engineering innovation, and its capacity to build resilient entrepreneurial institutions. By anchoring intellectual exploration in empirical truth, we seek to inspire generations of thinkers and builders.",
  achievements: [
    "600+ Lectures Delivered Across India on Science, Technology, and Entrepreneurship",
    "Author of 'The Entrepreneur Genesis' exploring foundational venture creation",
    "Author of 'The Power Within – Quantum' examining physical principles and mindset",
    "Founder and Pioneer of Cognisrin: establishing an independent scientific and innovation ecosystem"
  ],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/nikhilendra-srinivas-b7a61528a",
    amazon: "https://www.amazon.com/author/nikhilendrasrinivas",
    twitter: "https://x.com",
    email: "nikhilendrasrinivas5@gmail.com",
    website: "https://cognisrin.in"
  },
  updatedAt: "2026-11-08"
};

export const initialPublications: Publication[] = [
  {
    id: "pub-1",
    title: "The Entrepreneur Genesis",
    subtitle: "Principles of Resilient Venture Creation & Strategic Innovation",
    author: "Nikhilendra Srinivas",
    description: "A foundational work examining the architecture of visionary enterprises. 'The Entrepreneur Genesis' articulates a systematic framework for transitioning bold concepts into enduring institutions through first-principles discipline, rigorous execution, and value creation.",
    coverImageUrl: "/images/covers/the-entrepreneur-genesis.jpg",
    amazonPurchaseUrl: "https://www.amazon.in/Entrepreneur-Genesis-Nikhilendra-srinivas-ebook/dp/B0DV8X9X23/ref=sr_1_2?crid=2YBKIXZFEKYBQ&dib=eyJ2IjoiMSJ9.QUCP4AsY-08SNTk6gQQjZMTyN5dkUxdQklmxoNAVUrc.cM18YsBsji1Di8mlz-7rFAZlChg2dBsAToIselcBHX4&dib_tag=se&keywords=Nikhilendra+srinivas&qid=1794121248&sprefix=nikhilendra+sriniva%2Caps%2C272&sr=8-2",
    publicationDate: "2024",
    category: "Entrepreneurship & Innovation",
    isbn: "Available via official publisher channels",
    featured: true,
    notes: "Official work authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin."
  },
  {
    id: "pub-2",
    title: "The Power Within – Quantum",
    subtitle: "Exploring Fundamental Realities, Energy Dynamics, and Modern Physics",
    author: "Nikhilendra Srinivas",
    description: "An intellectual exploration delving into quantum principles, physical dynamics, and the conceptual models governing micro-scale reality. Written for thinkers seeking to understand how fundamental physics reshapes modern technological and cognitive paradigms.",
    coverImageUrl: "/images/covers/the-power-within-quantum.jpg",
    amazonPurchaseUrl: "https://www.amazon.com/gp/product/B0HP658MVL/ref=ox_sc_act_title_1?smid=A1Y53T3O3Q25L8&th=1",
    publicationDate: "2024",
    category: "Science & Physics",
    isbn: "Available via official publisher channels",
    featured: true,
    notes: "Official work authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin."
  }
];

export const initialArticles: ScienceArticle[] = [
  {
    id: "art-1",
    title: "Decoherence and State Evolution in Macroscopic Quantum Systems",
    slug: "quantum-decoherence-macroscopic-systems",
    category: "Quantum Physics",
    abstract: "An analysis of environmental decoherence mechanisms and mathematical formulations of state boundary transitions from quantum superposition to classical reality.",
    content: "Quantum decoherence represents one of the most intellectually compelling frontiers in modern theoretical physics. While the Schrödinger equation dictates unitary, reversible time evolution for isolated quantum wavefunctions, physical interaction with surrounding thermodynamic environments induces phase dispersion.\n\nThis foundational article examines the Hamiltonian operator models governing particle-environment entanglements, highlighting how quantum phase information dissipates into inaccessible degrees of freedom. As Cognisrin continues its investigation into quantum physical architectures, understanding decoherence remains critical for both quantum computational fidelity and fundamental interpretations of quantum mechanics.",
    author: "Nikhilendra Srinivas / Cognisrin Scientific Directorate",
    readTimeMinutes: 7,
    tags: ["Quantum Mechanics", "Decoherence", "Wavefunction", "Theoretical Physics"],
    publishedAt: "2026-10-15",
    featured: true
  },
  {
    id: "art-2",
    title: "Small Modular Fission and Next-Generation Nuclear Power Dynamics",
    slug: "small-modular-fission-dynamics",
    category: "Nuclear Science",
    abstract: "Assessing passive cooling safety systems, neutron moderation efficiencies, and fuel cycle sustainability in advanced high-temperature pebble-bed reactors.",
    content: "The modern imperative for high-density, carbon-neutral baseload power has revitalized global nuclear research. Small Modular Reactors (SMRs) present a departure from legacy multi-gigawatt facilities through standard factory modularity, passive convective cooling mechanisms, and novel isotopic fuel configurations.\n\nBy utilizing TRISO (tristructural-isotropic) fuel kernels resistant to thermal degradation beyond 1,600°C, modern nuclear designs virtually eliminate core-melt vulnerability under loss-of-coolant anomalies. Cognisrin's exploration into nuclear science focuses on empirical analysis of modular containment, thorium-uranium fuel cycles, and closed proliferation-resistant reactors.",
    author: "Cognisrin Nuclear & Energy Research Initiative",
    readTimeMinutes: 9,
    tags: ["Nuclear Science", "SMR", "Clean Energy", "Neutron Physics"],
    publishedAt: "2026-10-22",
    featured: true
  },
  {
    id: "art-3",
    title: "Carbon Nanotube Synthesis and Ballistic Electron Transport in 2D Lattices",
    slug: "nanotechnology-ballistic-electron-transport",
    category: "Nanotechnology",
    abstract: "Investigating chirality control in chemical vapor deposition synthesis of single-walled carbon nanotubes and their quantum conductance limits.",
    content: "At dimensions below 10 nanometers, classical Ohm's law collapses into Landauer-Büttiker ballistic transport regimens. Single-walled carbon nanotubes (SWCNTs), defined by their chiral vector indices (n,m), exhibit either metallic or semiconducting band structures dictated purely by cylindrical wrapping geometry.\n\nCognisrin's nanotechnology research track examines scalable chemical vapor deposition catalysis, interfacial thermal boundary resistance in nanocomposites, and structural applications of high-aspect-ratio atomic lattices.",
    author: "Cognisrin Nanomaterials Division",
    readTimeMinutes: 6,
    tags: ["Nanotechnology", "Graphene", "Quantum Conductance", "Materials Science"],
    publishedAt: "2026-11-01",
    featured: false
  },
  {
    id: "art-4",
    title: "Molecular Catalysis in High-Efficiency Electrolytic Hydrogen Evolution",
    slug: "molecular-catalysis-hydrogen-evolution",
    category: "Chemistry",
    abstract: "Evaluating earth-abundant transition metal phosphide and selenide catalysts to reduce overpotential in alkaline and proton-exchange membrane electrolysis.",
    content: "Transitioning global energy grids requires ultra-efficient molecular pathways for hydrogen generation. Traditional noble metal electrocatalysts such as platinum and iridium oxide suffer from cost and scarcity constraints.\n\nThis inquiry analyzes molecular orbital interactions and d-band center engineering in non-precious nickel-iron phosphide catalysts, mapping free energy pathways for H* intermediate adsorption at electrode-electrolyte interfaces.",
    author: "Cognisrin Chemistry & Molecular Systems",
    readTimeMinutes: 8,
    tags: ["Chemistry", "Catalysis", "Electrolysis", "Molecular Dynamics"],
    publishedAt: "2026-11-04",
    featured: false
  },
  {
    id: "art-5",
    title: "Principles of Nonlinear Dynamics and High-Energy Particle Trajectories",
    slug: "nonlinear-dynamics-particle-trajectories",
    category: "Physics",
    abstract: "Mathematical foundations of chaotic attractors and phase-space topology in relativistic charged particle confinement systems.",
    content: "Nonlinear physical phenomena govern systems from astrophysical plasma confinement to synchrotron storage rings. In this foundational paper, we examine Lyapunov exponents, Hamiltonian chaos, and symplectic integration methods used to maintain beam coherence across billions of magnetic orbital revolutions.",
    author: "Cognisrin Physics Directorate",
    readTimeMinutes: 7,
    tags: ["Physics", "Nonlinear Systems", "Chaos Theory", "Symplectic Dynamics"],
    publishedAt: "2026-10-18",
    featured: false
  },
  {
    id: "art-6",
    title: "Institutional Research Methodology: From First Principles to Empirical Validation",
    slug: "institutional-research-methodology-first-principles",
    category: "Scientific Research",
    abstract: "A framework for independent scientific inquiry, peer reproducibility, statistical hypothesis testing, and open collaborative dissemination.",
    content: "The integrity of scientific progress rests upon unyielding adherence to empirical validation, falsifiability, and transparency. At Cognisrin, our scientific methodology enforces explicit formulation of prior assumptions, rigorous uncertainty quantification, and open documentation.",
    author: "Nikhilendra Srinivas",
    readTimeMinutes: 5,
    tags: ["Scientific Research", "Methodology", "Empiricism", "First Principles"],
    publishedAt: "2026-09-30",
    featured: true
  },
  {
    id: "art-7",
    title: "Neuromorphic Computing and Memristive Crossbar Architectures",
    slug: "neuromorphic-computing-memristive-architectures",
    category: "Emerging Technologies",
    abstract: "Exploring brain-inspired non-von Neumann computing systems utilizing analog resistive memory arrays to achieve orders-of-magnitude energy efficiency improvements.",
    content: "As Moore's Law confronts thermal and quantum tunneling limits in sub-2nm silicon lithography, neuromorphic architectures emerge as an essential paradigm shift. By collocating computation and memory within analog memristive crossbar nodes, synaptic weight modifications occur directly via physical conductance states.",
    author: "Cognisrin Technology Research Group",
    readTimeMinutes: 8,
    tags: ["Emerging Tech", "Neuromorphic", "Memristors", "Next-Gen Computing"],
    publishedAt: "2026-11-06",
    featured: false
  }
];

export const initialInnovationProjects: InnovationProject[] = [
  {
    id: "proj-1",
    title: "Project Aether: Low-Temperature Quantum State Sensor Architecture",
    slug: "project-aether-quantum-sensor",
    category: "Quantum Technologies",
    description: "An experimental sensor concept designed to measure ultra-weak electromagnetic fields and magnetic anomalies using NV-center diamond lattice spectroscopy.",
    technicalDetails: "Nitrogen-Vacancy (NV) center diamond arrays optically pumped via 532nm laser excitation; microwave resonance frequency monitoring via optically detected magnetic resonance (ODMR) protocols.",
    status: "Research",
    founderAttribution: "Conceived & Guided by Nikhilendra Srinivas",
    imageUrl: "",
    publishedAt: "2026-10-12",
    tags: ["Quantum Sensing", "NV Centers", "Diamond Photonics", "Metrology"],
    featured: true
  },
  {
    id: "proj-2",
    title: "Helios-Core: High-Efficiency Modular Thermoelectric Harvester",
    slug: "helios-core-thermoelectric-harvester",
    category: "Clean Energy & Materials",
    description: "A prototype engineering initiative aimed at scavenging low-grade industrial waste heat (80°C - 250°C) through bismuth telluride nanostructured alloys.",
    technicalDetails: "Figure of merit (ZT > 1.8) achieved via superlattice phonon scattering interfaces; custom buck-boost power conditioning delivering stable 5V DC output from 15mV thermal differentials.",
    status: "Prototype",
    founderAttribution: "Pioneered by Nikhilendra Srinivas & Cognisrin Engineering Group",
    imageUrl: "",
    publishedAt: "2026-09-18",
    tags: ["Thermoelectric", "Waste Heat", "Energy Harvesting", "Nanomaterials"],
    featured: true
  },
  {
    id: "proj-3",
    title: "Cognis-Venture: Deep-Tech Incubation & IP Translation Blueprint",
    slug: "cognis-venture-deep-tech-blueprint",
    category: "Entrepreneurship & Innovation",
    description: "An institutional blueprint and validation framework designed to accelerate the commercialization of laboratory-proven physical and chemical engineering discoveries.",
    technicalDetails: "Multi-stage de-risking methodology covering Technology Readiness Level (TRL) 3 through 7; intellectual property defensive structuring; capital allocation modeling for capital-intensive hardware ventures.",
    status: "Active",
    founderAttribution: "Authored by Nikhilendra Srinivas (Author of 'The Entrepreneur Genesis')",
    imageUrl: "",
    publishedAt: "2026-08-25",
    tags: ["Deep Tech", "Venture Blueprint", "Commercialization", "Intellectual Property"],
    featured: true
  },
  {
    id: "proj-4",
    title: "Bio-Nano Catalyst for Ambient Water Remediation",
    slug: "bio-nano-catalyst-water-remediation",
    category: "Nanotechnology & Environment",
    description: "An experimental synthesis of titanium dioxide doped with bio-derived graphene scaffolds for rapid photocatalytic breakdown of pharmaceutical micro-pollutants under solar illumination.",
    technicalDetails: "Bandgap narrowed to 2.4eV enabling solar visible-spectrum absorption; continuous-flow helical photoreactor design with 94.8% degradation efficiency across standard organic dyes and antibiotic compounds.",
    status: "Concept",
    founderAttribution: "Initiated under Cognisrin Environmental Science Initiative",
    imageUrl: "",
    publishedAt: "2026-11-02",
    tags: ["Photocatalysis", "Water Treatment", "Nanotechnology", "Solar Energy"],
    featured: false
  }
];

export const initialSiteSettings: SiteSettings = {
  organisationName: "COGNISRIN",
  tagline: "Advancing Science. Inspiring Innovation. Empowering Entrepreneurship.",
  supportingDescription: "An independent organisation dedicated to encouraging scientific exploration, technological innovation and entrepreneurial thinking.",
  officialDomain: "https://cognisrin.in",
  officialEmail: "nikhilendrasrinivas5@gmail.com",
  missionStatement: "To ignite rigorous scientific curiosity, cultivate pioneering engineering innovation, and empower entrepreneurial initiatives that solve foundational challenges and build long-term societal value.",
  visionStatement: "To establish an enduring global institution recognized for elevating scientific inquiry, nurturing visionary inventors, and translating discovery into technological and economic progress.",
  foundingPhilosophy: "Anchored in first-principles thinking and championed by Founder and Pioneer Nikhilendra Srinivas, Cognisrin operates on the principle that sustainable civilizational advancement requires an unbroken continuum between theoretical science, applied technology, and principled enterprise.",
  threePillars: {
    science: "Encouraging empirical inquiry, foundational research in physics, chemistry, nanotechnology, and quantum systems to expand the boundaries of human knowledge.",
    innovation: "Developing experimental prototypes, engineering novel technology concepts, and fostering an environment where bold ideas transform into tangible technological advancements.",
    entrepreneurship: "Empowering visionary builders with resilient venture frameworks, deep-tech incubation paradigms, and practical execution methodologies to create lasting institutional value."
  },
  announcementBanner: {
    enabled: true,
    text: "Pioneering the Future of Science & Enterprise: Explore our comprehensive knowledge repository and nationwide lecture insights.",
    linkUrl: "/about"
  }
};

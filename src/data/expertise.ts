// Content for the /expertise/[slug] landing pages.
// Each domain gets one entry in EXPERTISE_PAGES; the page template renders whatever is here.
// Optional fields are skipped when empty, so a page can go live before every placeholder is filled.

// Icons are referenced by name so this file stays plain data; components/expertise/icons.tsx maps them to lucide icons.
export type ExpertiseIcon =
    | "brain" | "blocks" | "smartphone" | "cloud" | "layers" | "clapperboard" | "shield"
    | "users" | "messages" | "mic" | "scan" | "dna" | "heart-handshake"
    | "search" | "code" | "handshake" | "trending-up"
    | "palette" | "pointer" | "pen" | "eye" | "zap" | "map"
    | "film" | "video" | "megaphone" | "languages" | "sparkles" | "scissors"
    | "chart" | "credit-card" | "layout" | "database" | "rocket" | "wallet"
    | "link" | "lock" | "coins" | "image" | "activity" | "gift" | "bell"
    | "bug" | "gauge" | "list-checks" | "file-search";

// Shapes the hero ASCII particle field can morph into (components/expertise/ascii-morph.tsx)
export type AsciiShape =
    // AI & ML
    | "brain" | "neural_net" | "embeddings" | "loss_surface" | "tensor"
    // Product design
    | "cursor" | "pen_tool" | "layers" | "wireframe"
    // Generative AI film
    | "clapperboard" | "film_reel" | "movie_camera" | "play_button"
    // SaaS
    | "cloud" | "server_rack" | "bar_chart" | "globe"
    // Blockchain & Web3
    | "blockchain" | "coin" | "chain_links" | "p2p_network"
    // Mobile
    | "phone" | "app_grid" | "bell" | "signal"
    // QA & consulting
    | "shield" | "magnifier" | "bug" | "checklist";

// A heading rendered like the home page's "Featured <muted>Works</muted>": a bright lead and a dimmer tail.
export interface Headline {
    lead: string;
    muted?: string;
}

export interface ExpertiseService {
    slug: string;
    name: string;
    category: string;
    // One line for the navbar's services menu
    short: string;
    blurb: string;
    icon: ExpertiseIcon;
    // Dot-matrix hover colours, matching the service's card in the home page "Our Expertise In" grid
    colors: number[][];
    image?: string;
}

const THIINGS = (id: string) =>
    `https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-${id}.png&w=1000&q=75`;

// Every service Spotmies sells. Drives the "Other services" cards on each landing page.
// A service links to its landing page once it has an entry in EXPERTISE_PAGES, otherwise to the home page services section.
export const EXPERTISE_SERVICES: ExpertiseService[] = [
    {
        slug: "ai-machine-learning",
        name: "AI & ML Development",
        category: "AI",
        short: "Production AI, from prototype to launch",
        blurb: "Production-ready AI from a team that runs its own. From first prototype to a live product, we build the AI, the product around it and the launch.",
        icon: "brain",
        colors: [[0, 255, 255], [0, 200, 255]],
        image: THIINGS("LfpfRdF2BugZEEpTgPQNhXOgbpJBMo"),
    },
    {
        slug: "product-design",
        name: "Product Design",
        category: "Design",
        short: "Research, UX and interface design",
        blurb: "Design leadership for products that people adopt and keep using. User research, UX and interface design, built together with the engineers who ship it.",
        icon: "layers",
        colors: [[249, 115, 22], [251, 146, 60]],
        image: THIINGS("zKoxdD3l5QDuQDFQGP45fqO0EuaKqP"),
    },
    {
        slug: "generative-ai-filmmaking",
        name: "Generative AI Filming",
        category: "Film and video",
        short: "Films, ads and product videos made with AI",
        blurb: "Films, ads and product videos made with generative AI. From script to final cut, creatively directed by people and produced with AI.",
        icon: "clapperboard",
        colors: [[236, 72, 153], [244, 114, 182]],
        image: THIINGS("hgXPkqpADbHGd6tJ9kh973tSeJqD2m"),
    },
    {
        slug: "saas-platforms",
        name: "SaaS Development",
        category: "Platforms",
        short: "From MVP to paying customers",
        blurb: "SaaS products built for growth, backed by our own platforms in operation. Architecture, billing, onboarding and analytics, from MVP to paying customers.",
        icon: "cloud",
        colors: [[59, 130, 246], [96, 165, 250]],
        image: THIINGS("b4opFtjTkc0AjPR6H9fuB42Qm0lnE4"),
    },
    {
        slug: "blockchain-web3",
        name: "Blockchain & Web3",
        category: "Web3",
        short: "From smart contracts to a live product",
        blurb: "Blockchain and Web3 products built with security at every step. From architecture and smart contracts to a live product, with security at every step.",
        icon: "blocks",
        colors: [[168, 85, 247], [192, 132, 252]],
        image: THIINGS("2ojjAp7s2KeO3J9shvCPNH9nuhz3zi"),
    },
    {
        slug: "android-ios-apps",
        name: "Android & iOS",
        category: "Mobile",
        short: "Apps people open every day",
        blurb: "Mobile applications designed to be opened every day. One product team for design, development, store launch and ongoing updates.",
        icon: "smartphone",
        colors: [[52, 211, 153], [110, 231, 183]],
        image: THIINGS("AEQHfiKbM10ybAm0ZP6jzvu5hNwzEB"),
    },
    {
        slug: "qa-consulting",
        name: "QA & Consulting",
        category: "Quality",
        short: "Know what to fix first",
        blurb: "Testing and technical advice for products you already run, so you know what to fix first.",
        icon: "shield",
        colors: [[250, 204, 21], [253, 224, 71]],
        image: THIINGS("NPWlghgOkWsgF4xolYbb4TzXYD4tRh"),
    },
];

export interface ExpertisePage {
    slug: string;
    seo: { title: string; description: string };
    // Label used on every "start" button on the page
    ctaLabel: string;
    hero: {
        eyebrow: string;
        title: Headline;
        subtitle: string;
        tagline: string;
        // Label of the second hero button, which jumps to the work on show (e.g. "Explore our AI work").
        // Pages with no work to show yet use "See how we work" instead.
        exploreLabel?: string;
        // Shapes the ASCII particle field cycles through, in order
        ascii: AsciiShape[];
    };
    outcomes: {
        title: Headline;
        intro: string;
        items: {
            text: string;
            icon: ExpertiseIcon;
            // Label on the card naming the work that backs it up; leave out together with `project` when there is none yet
            proof?: string;
            // Title in PROJECT_DATA; its screenshot appears on hover and its case study opens on click
            project?: string;
            // Where the card goes when the proof is not one project: a page ("/work") or a section ("#faq", "/#brand")
            href?: string;
        }[];
    };
    process: {
        title: Headline;
        intro: string;
        // kicker: short caption above the title ("Understand the problem"); without one the card reads "STEP 01"
        steps: { title: string; body: string; icon: ExpertiseIcon; kicker?: string }[];
    };
    ownProducts: {
        title: Headline;
        intro: string;
        items: {
            // Title of a project in PROJECT_DATA (screenshot and link come from there)
            project: string;
            sector: string;
            problem: string;
            lesson?: string;
        }[];
    };
    clientWork: {
        title: Headline;
        intro: string;
        items: {
            name: string;
            tag: string;
            body: string;
            // Titles in PROJECT_DATA; the first one supplies the screenshot and opens on click
            projects: string[];
        }[];
    };
    why: {
        title: Headline;
        points: { title: string; body: string }[];
    };
    voices: {
        title: string;
        // Names in TESTIMONIALS (data/testimonials.ts), in display order
        names: string[];
    };
    team: {
        title: Headline;
        intro: string;
    };
    faq: {
        title: Headline;
        intro: string;
        items: { question: string; answer: string }[];
    };
    start: {
        eyebrow: string;
        title: Headline;
        body: string;
        // What the visitor gets from the first conversation
        promises: string[];
    };
}

// Copy shared by the service pages
const OUTCOMES_INTRO = "Each one is backed by work you can check on spotmies.com, and the proof sits next to it.";
const WHY_TITLE: Headline = { lead: "A product partner,", muted: "not just a service provider" };
const WHY_ONE_TEAM = {
    title: "One team, from idea to execution",
    body: "From the first conversation to the final product, we work alongside you to build, launch, and improve with confidence.",
};
const VOICES_TITLE = "What founders say about Spotmies";

const aiMachineLearning: ExpertisePage = {
    slug: "ai-machine-learning",
    seo: {
        title: "AI & ML Development | Spotmies",
        description: "Production-ready AI, from a team that runs its own. From first prototype to a live product, Spotmies builds the AI, the product around it and the launch.",
    },
    ctaLabel: "Build with us",
    hero: {
        eyebrow: "AI & ML Development",
        title: { lead: "Production-ready AI products,", muted: "from a team that runs its own." },
        subtitle: "From first prototype to a live product, we build the AI, the product around it and the launch.",
        tagline: "We build products. Ours and yours.",
        exploreLabel: "Explore our AI work",
        ascii: ["brain", "neural_net", "embeddings", "loss_surface", "tensor"],
    },
    outcomes: {
        title: { lead: "What AI can do", muted: "for your business" },
        intro: OUTCOMES_INTRO,
        items: [
            { text: "Automate interviews and screening, so hiring teams decide faster with less bias", proof: "Reaidy.io", icon: "users", project: "Reaidy.io" },
            { text: "Turn your own website content into a support agent that answers accurately", proof: "Workewhere · RAG", icon: "messages", project: "Workewhere" },
            { text: "Reach users in their own language with Gen-AI voice agents", proof: "Farm Vaidya", icon: "mic", project: "Farm Vaidya" },
            { text: "Spot problems early from images and sensor data", proof: "OROLEXA · SafeGuard Air", icon: "scan", project: "SafeGuard Air" },
            { text: "Personalise advice down to the individual, even their DNA profile", proof: "MyBodyQode", icon: "dna", project: "MyBodyQode" },
            { text: "Scale a service with AI while keeping the human touch", proof: "Decentrialz · WingDent", icon: "heart-handshake", project: "Decentrialz" },
        ],
    },
    process: {
        title: { lead: "Four steps from idea", muted: "to intelligent solutions" },
        intro: "Every AI engagement starts the same way: proving the idea works on your data before you spend on the build.",
        steps: [
            { kicker: "Understand the problem", title: "Validate", body: "We identify the right AI opportunity, assess your data, and validate the idea before development.", icon: "search" },
            { kicker: "Turn ideas into AI", title: "Build", body: "We develop data pipelines, train or integrate models, and build solutions tailored to your business needs.", icon: "code" },
            { kicker: "Make AI work for you", title: "Optimize", body: "We evaluate model performance, improve accuracy, and balance quality, speed, and cost.", icon: "gauge" },
            { kicker: "Keep getting smarter", title: "Grow", body: "We monitor real-world performance, refine models, and continuously improve your AI solution as your business grows.", icon: "trending-up" },
        ],
    },
    ownProducts: {
        title: { lead: "We run AI products", muted: "of our own" },
        intro: "Each one gives us something we apply to yours.",
        items: [
            {
                project: "Reaidy.io",
                sector: "AI · HRTech",
                problem: "Hiring teams spend too long on interviews, assessments and candidate matching. Reaidy.io automates all three.",
            },
            {
                project: "OpenPlan AI",
                sector: "AI · Hardware",
                problem: "Hardware teams plan across spreadsheets, Jira and email, so requirements, BOMs and change approvals drift apart. OpenPlan's AI Architect turns a product spec into a traceable project plan.",
                lesson: "AI output earns trust when people can check it. OpenPlan's AI asks clarifying questions before it plans, and every plan it generates stays editable.",
            },
        ],
    },
    clientWork: {
        title: { lead: "Our AI work", muted: "for founders and global businesses" },
        intro: "The same team, the same process, applied to different problems.",
        items: [
            { name: "Workewhere", tag: "RAG · Support agent", body: "Your own website content turned into a support agent that answers accurately.", projects: ["Workewhere"] },
            { name: "Farm Vaidya", tag: "Gen-AI voice agents", body: "Voice agents that reach users in their own language.", projects: ["Farm Vaidya"] },
            { name: "OROLEXA · SafeGuard Air", tag: "Images and sensor data", body: "Problems spotted early from images and sensor data.", projects: ["SafeGuard Air", "OROLEXA"] },
            { name: "MyBodyQode", tag: "Personalised advice", body: "Advice personalised down to the individual, including their DNA profile.", projects: ["MyBodyQode"] },
            { name: "Decentrialz · WingDent", tag: "AI with a human touch", body: "A service scaled with AI while keeping the human touch.", projects: ["Decentrialz", "WingDent"] },
        ],
    },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "We run our own AI products", body: "So we plan for the cost and upkeep of running AI, not just building it." },
            { title: "We tell you when you do not need AI", body: "A simpler approach often wins, and we say so before you spend." },
            WHY_ONE_TEAM,
        ],
    },
    voices: {
        title: VOICES_TITLE,
        names: ["Marco Turk", "Swaroop"],
    },
    team: {
        title: { lead: "Built by a team that", muted: "runs its own AI tools" },
        intro: "We don't only build for clients. We run our own products, so we know what it takes to keep one alive after launch.",
    },
    faq: {
        title: { lead: "Questions founders", muted: "ask first." },
        intro: "The things we get asked before every AI project. Anything else, ask us during the sprint.",
        items: [
            {
                question: "Do we need a custom model?",
                answer: "Often not. Many products start with existing models and add custom training only when it improves results. We tell you which case yours is during the sprint.",
            },
            {
                question: "What do we get from the validation sprint?",
                answer: "A clear answer on whether AI is the right tool for your idea, the idea tested on your real data, and a plan for what to build first.",
            },
            {
                question: "What if AI isn't the right fit?",
                answer: "We tell you before you spend on the build. A simpler approach often wins, and we would rather say so than build something you do not need.",
            },
            {
                question: "How soon can we see something working?",
                answer: "Usually in about a week. You get a fully working prototype on your own data before the full build starts.",
            },
            {
                question: "Can you add AI to a product we already have?",
                answer: "Yes. We start with a short review of your product and data, then build the AI into what you already run instead of starting over.",
            },
            {
                question: "Can you work with our existing team?",
                answer: "Yes. We often work as an extension of an in-house team, whether you need specialist AI skills or extra hands on the build.",
            },
            {
                question: "Will you sign an NDA?",
                answer: "Yes. We sign an NDA before you share anything sensitive about your product or your data.",
            },
            {
                question: "What happens after launch?",
                answer: "We keep monitoring, evaluating and improving the AI after it goes live, so answer quality and running costs stay where they should be.",
            },
            {
                question: "Who owns the code and models?",
                answer: "Ownership is agreed in the contract for each project, so you know from the start what you will own when the work is done.",
            },
        ],
    },
    start: {
        eyebrow: "Validation sprint",
        title: { lead: "Have an AI product", muted: "in mind?" },
        body: "Every AI build starts with a validation sprint. Tell us your idea, your stage and your timeline, and we will come back with a plan.",
        promises: [
            "Whether AI is the right tool for your idea",
            "The idea tested on your real data",
            "A plan for what to build first",
        ],
    },
};

// Shared FAQ answers, worded the same on every page
const FAQ_EXISTING_TEAM = {
    question: "Can you work with our existing team?",
    answer: "Yes. We often work as an extension of an in-house team, whether you need specialist skills or extra hands on the build.",
};
const FAQ_NDA = {
    question: "Will you sign an NDA?",
    answer: "Yes. We sign an NDA before you share anything sensitive about your product or your data.",
};

const productDesign: ExpertisePage = {
    slug: "product-design",
    seo: {
        title: "Product Design | Spotmies",
        description: "Design leadership for products that people adopt and keep using. User research, UX and interface design, built together with the engineers who ship it.",
    },
    ctaLabel: "Start a product",
    hero: {
        eyebrow: "Product Design",
        title: { lead: "Design leadership for products", muted: "that people adopt and keep using." },
        subtitle: "User research, UX and interface design, built together with the engineers who ship it.",
        tagline: "We build products. Ours and yours.",
        exploreLabel: "Explore our designs",
        ascii: ["cursor", "wireframe", "pen_tool", "layers"],
    },
    outcomes: {
        title: { lead: "What we help", muted: "you do" },
        intro: OUTCOMES_INTRO,
        items: [
            { text: "Design and build under one roof, with no hand-off gap between designers and developers", proof: "All case studies", icon: "layers", href: "/work" },
            { text: "Design around how your users actually behave", proof: "Boom Boom Talk", icon: "users", project: "Boom Boom Talk" },
            { text: "Make complex journeys feel simple and fluid", proof: "Vihaan Electrix", icon: "zap", project: "Vihaan Electrix" },
            { text: "Give your product a look nobody else has", proof: "Mad Angles", icon: "palette", project: "Mad Angles" },
            { text: "Win attention in a crowded market with product design", proof: "Mr Bikes", icon: "pointer", project: "Mr Bikes" },
            { text: "Keep one consistent experience across every touchpoint", proof: "Brand ↔ Product", icon: "link", href: "/#brand" },
        ],
    },
    process: {
        title: { lead: "From user needs", muted: "to meaningful product experiences" },
        intro: "We turn ideas into intuitive, functional, and visually refined digital products through thoughtful research, strategic design, and continuous refinement.",
        steps: [
            { title: "Discover", body: "We understand your users, business goals, and challenges to identify the right problems to solve.", icon: "search" },
            { title: "Define", body: "We map user journeys, structure information, and shape clear product requirements into a focused design direction.", icon: "map" },
            { title: "Design", body: "We create intuitive interfaces, interactive prototypes, and consistent design systems that balance usability with visual appeal.", icon: "pen" },
            { title: "Refine", body: "We test designs with real user needs in mind, gather feedback, and fine-tune every detail for a seamless product experience.", icon: "eye" },
        ],
    },
    ownProducts: {
        title: { lead: "We design products", muted: "we run ourselves" },
        intro: "Each one teaches us something we bring to yours.",
        items: [
            {
                project: "OpenPlan AI",
                sector: "AI · Hardware",
                problem: "Hardware teams plan across spreadsheets, Jira and email, so requirements, BOMs and change approvals drift apart. OpenPlan brings them into one workspace.",
                lesson: "Complex tools earn trust when people can check and edit everything the system suggests, so every plan OpenPlan generates stays editable.",
            },
            {
                project: "Chalo Ride",
                sector: "Travel · Mobility",
                problem: "Renting a bike often means unclear prices and slow paperwork. Chalo Ride shows the whole fleet with clear prices and no hidden charges.",
                lesson: "Showing the full price up front builds trust, and booking gets faster when nothing is hidden.",
            },
        ],
    },
    clientWork: {
        title: { lead: "Products we have designed", muted: "for founders and businesses" },
        intro: "Research, UX and interface design, built by the same team.",
        items: [
            { name: "Mr Bikes", tag: "Booking · Rentals", body: "Flexible hourly and daily bookings, with the whole fleet easy to browse.", projects: ["Mr Bikes"] },
            { name: "Vihaan Electrix", tag: "Mobile · EV", body: "EV rides, chargers and service stations on a live map, with fluid animations throughout.", projects: ["Vihaan Electrix"] },
            { name: "Nandikrushi", tag: "Multi-app · AgriTech", body: "Separate apps for consumers, farmers and stores, with farm-to-table tracking.", projects: ["Nandikrushi"] },
            { name: "Boom Boom Talk", tag: "Social · Web3", body: "Profiles revealed through challenges, built around conversation rather than swipes.", projects: ["Boom Boom Talk"] },
            { name: "Mad Angles", tag: "NFT · Web UI", body: "A geometric art style and the interface collectors mint through.", projects: ["Mad Angles"] },
        ],
    },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "Designers and engineers on one team", body: "The people who build your product sat in on its design, so nothing gets lost in hand-off." },
            { title: "Ideas that grow your business", body: "We suggest what will win attention for your business, not only what looks good." },
            WHY_ONE_TEAM,
        ],
    },
    voices: {
        title: VOICES_TITLE,
        names: ["Venkat", "Ravi Unukuru", "Anand Boddeti"],
    },
    team: {
        title: { lead: "Designed by a team that", muted: "builds what it designs" },
        intro: "Our designers work next to our engineers, on client products and on our own.",
    },
    faq: {
        title: { lead: "Questions founders", muted: "ask first." },
        intro: "The things we get asked before a design project. Anything else, just ask.",
        items: [
            {
                question: "Do you only design, or build it too?",
                answer: "Both. Our designers work with the engineers who ship it, so the product that launches matches the design.",
            },
            {
                question: "Can you redesign a product we already have?",
                answer: "Yes. We start with how people use it today, then fix the parts that lose them first.",
            },
            {
                question: "Do you do user research?",
                answer: "Yes. User research sits alongside UX and interface design in everything we design.",
            },
            {
                question: "How long does a design project take?",
                answer: "Usually about a week, depending on your requirements and the scope we agree in the contract.",
            },
            {
                question: "What do we get at the end?",
                answer: "Full design files for every screen, a clickable prototype to test before the build, and a design system of reusable components, colors and type styles.",
            },
            FAQ_EXISTING_TEAM,
            FAQ_NDA,
        ],
    },
    start: {
        eyebrow: "Product design",
        title: { lead: "Have a product", muted: "that needs design?" },
        body: "Tell us about your product, your users and your timeline, and we will come back with a plan.",
        promises: ["Where your product loses people today", "What to design first", "How design and build fit your timeline"],
    },
};

const generativeAiFilm: ExpertisePage = {
    slug: "generative-ai-filmmaking",
    seo: {
        title: "Generative AI Filming | Spotmies",
        description: "Films, ads and product videos made with generative AI, by a team that builds AI products. From script to final cut, creatively directed by people.",
    },
    ctaLabel: "Create with us",
    hero: {
        eyebrow: "Generative AI Filming",
        title: { lead: "Films, ads and product videos,", muted: "made with generative AI." },
        subtitle: "From script to final cut, creatively directed by people and produced with AI.",
        tagline: "We build products. Ours and yours.",
        // "Watch our work" once there are reels to show; until then the button reads "See how we work"
        exploreLabel: "Watch our work",
        ascii: ["clapperboard", "movie_camera", "film_reel", "play_button"],
    },
    outcomes: {
        title: { lead: "What AI filmmaking", muted: "gives you" },
        intro: "What our generative AI video service is built to deliver.",
        // TODO(content): link each card to a film once there is portfolio work to show (proof + project)
        items: [
            { text: "Turn a creative vision into finished video", icon: "video" },
            { text: "Combine machine learning with cinematic storytelling", icon: "sparkles" },
            { text: "Produce high-fidelity visual narratives", icon: "film" },
            { text: "Scale your production capacity without scaling the crew", icon: "trending-up" },
        ],
    },
    process: {
        title: { lead: "Four steps from your idea", muted: "to a visual experience" },
        intro: "Every film starts with a story, and people direct it from start to finish.",
        steps: [
            { kicker: "Where the idea begins", title: "Imagine", body: "Define your concept, explore the visual style, and establish a clear creative direction.", icon: "eye" },
            { title: "Generate", body: "Bring scripts, characters, scenes, and storyboards to life using generative AI tools.", icon: "sparkles" },
            { title: "Refine", body: "Fine-tune visuals, motion, sound, and storytelling to create a consistent, engaging experience.", icon: "scissors" },
            { title: "Deliver", body: "Polish the final output, optimize it for your target platforms, and prepare it for launch.", icon: "rocket" },
        ],
    },
    // TODO(content): films to feature. The section stays hidden until there is at least one.
    ownProducts: { title: { lead: "Films we have made", muted: "for ourselves" }, intro: "", items: [] },
    // TODO(content): client films to feature. Each needs an entry in PROJECT_DATA; the section stays hidden until then.
    clientWork: {
        title: { lead: "Generative AI creations", muted: "we've brought to life" },
        intro: "Explore the AI-powered visual experiences we've already developed and brought into production.",
        items: [],
    },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "People make the creative calls", body: "Story, look and tone are decided by people. AI produces what they direct." },
            { title: "A team that builds AI", body: "We build and run AI products, so we know what generative AI does well and where it needs a human hand." },
            WHY_ONE_TEAM,
        ],
    },
    // TODO(content): quotes from film clients. The section stays hidden until there is at least one.
    voices: { title: VOICES_TITLE, names: [] },
    team: {
        title: { lead: "Made by a team that", muted: "builds with AI every day" },
        intro: "We build and run AI products of our own, and bring that experience to every film.",
    },
    faq: {
        title: { lead: "Questions brands", muted: "ask first." },
        intro: "The things we get asked before a film project. Anything else, just ask.",
        items: [
            {
                question: "Is the whole film made by AI?",
                answer: "It is produced with generative AI and creatively directed by people, from script to final cut.",
            },
            {
                question: "What kinds of videos do you make?",
                answer: "Films, ads and product videos.",
            },
            {
                question: "Do you write the script?",
                answer: "Yes. We work from script to final cut, so the script is part of the job.",
            },
            {
                question: "How long does a film take?",
                answer: "It depends on your requirements and the brief we agree in the contract. You get a clear timeline from script to final cut before production starts.",
            },
            {
                question: "Who owns the finished film?",
                answer: "Ownership and usage rights are agreed in the contract for each project, before production starts.",
            },
            FAQ_NDA,
        ],
    },
    start: {
        eyebrow: "Generative AI film",
        title: { lead: "Have a film", muted: "in mind?" },
        body: "Tell us what you want to make, who it is for and when you need it, and we will come back with a plan.",
        promises: ["A first take on the story", "How the film will look and feel", "A plan from script to final cut"],
    },
};

const saasPlatforms: ExpertisePage = {
    slug: "saas-platforms",
    seo: {
        title: "SaaS Development | Spotmies",
        description: "SaaS products built for growth, backed by our own platforms in operation. Architecture, billing, onboarding and analytics, from MVP to paying customers.",
    },
    ctaLabel: "Build your SaaS",
    hero: {
        eyebrow: "SaaS Development",
        title: { lead: "SaaS products built for growth,", muted: "by a team that runs its own." },
        subtitle: "Architecture, billing, onboarding and analytics, from MVP to paying customers.",
        tagline: "We build products. Ours and yours.",
        exploreLabel: "Explore our products",
        ascii: ["cloud", "bar_chart", "server_rack", "globe"],
    },
    outcomes: {
        title: { lead: "What we help", muted: "you do" },
        intro: OUTCOMES_INTRO,
        items: [
            { text: "Launch a custom web app or MVP in 8 to 12 weeks, in agile sprints", proof: "Our FAQ", icon: "rocket", href: "#faq" },
            { text: "Replace slow internal tools with an admin panel built for your team", proof: "Mobile Masala", icon: "layout", project: "Mobile Masala" },
            { text: "Put bookings and rentals online with transparent pricing", proof: "Chalo Ride · Mr Bikes", icon: "credit-card", project: "Chalo Ride" },
            { text: "Turn complex financial data into dashboards people understand", proof: "Credit Report · Awaken", icon: "chart", project: "Credit Report" },
            { text: "Add AI to your platform: interviews, chatbots and recommendations", proof: "Reaidy.io · Workewhere", icon: "brain", project: "Reaidy.io" },
        ],
    },
    process: {
        title: { lead: "Our approach", muted: "to SaaS development" },
        intro: "We turn complex business needs into reliable, scalable SaaS products designed to solve real problems and support long-term growth.",
        steps: [
            { title: "Discover", body: "We understand your business model, target users, and core challenges to define the right product direction.", icon: "search" },
            { title: "Design", body: "We create intuitive user experiences and scalable product architectures built around your customers' needs.", icon: "pen" },
            { title: "Develop", body: "We build secure, reliable SaaS applications with the features, integrations, and infrastructure your product needs.", icon: "code" },
            { title: "Launch & Scale", body: "We test, deploy, and continuously improve your product to deliver a smooth launch and support future growth.", icon: "rocket" },
        ],
    },
    ownProducts: {
        title: { lead: "We run SaaS products", muted: "of our own" },
        intro: "Each one gives us something we apply to yours.",
        items: [
            {
                project: "OpenPlan AI",
                sector: "SaaS · Hardware",
                problem: "Hardware teams plan across spreadsheets, Jira and email, so requirements, BOMs and change approvals drift apart. OpenPlan brings them into one workspace that sits alongside the tools they already use.",
                lesson: "A new tool gets adopted faster when it works alongside what a team already uses instead of replacing it.",
            },
            {
                project: "Reaidy.io",
                sector: "SaaS · HRTech",
                problem: "Hiring teams spend too long on interviews, assessments and candidate matching. Reaidy.io automates all three.",
            },
        ],
    },
    clientWork: {
        title: { lead: "SaaS products built", muted: "for modern businesses" },
        intro: "The same team, the same process, creating scalable solutions for different business needs.",
        items: [
            { name: "Workewhere", tag: "AI chatbots · B2B", body: "Businesses deploy chatbots trained on their own website data.", projects: ["Workewhere"] },
            { name: "EduMoon", tag: "Learning platform", body: "Courses, internships and clubs for over 15,000 engineering students, run from one admin panel.", projects: ["EduMoon"] },
            { name: "Mobile Masala", tag: "Publishing · Analytics", body: "A custom admin panel for fast publishing, with engagement analytics built in.", projects: ["Mobile Masala"] },
            { name: "Referral Bazaar", tag: "Payments · Retail", body: "Referral commissions and wallet balances settled automatically.", projects: ["Referral Bazaar"] },
            { name: "Zit", tag: "HR · Hybrid work", body: "Hybrid work tracking that helps employers with tax benefits and helps staff avoid burnout.", projects: ["Zit (Zin in Thuiswerken)"] },
        ],
    },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "We run SaaS products of our own", body: "So we plan for hosting, upkeep and support, not just the launch." },
            { title: "Built for paying customers", body: "Billing, onboarding and analytics are part of the build, not an afterthought." },
            WHY_ONE_TEAM,
        ],
    },
    voices: {
        title: VOICES_TITLE,
        names: ["Mahidhar", "Marco Turk", "Vamsi Gummadi"],
    },
    team: {
        title: { lead: "Built by a team that", muted: "runs its own platforms" },
        intro: "We don't only build for clients. We run our own products, so we know what it takes to keep a platform running after launch.",
    },
    faq: {
        title: { lead: "Questions founders", muted: "ask first." },
        intro: "The things we get asked before a SaaS build. Anything else, just ask.",
        items: [
            {
                question: "Can you start from an MVP?",
                answer: "Yes. We build from MVP to paying customers, starting with what your first users need.",
            },
            {
                question: "Do you handle billing and onboarding?",
                answer: "Yes. Architecture, billing, onboarding and analytics are all part of a SaaS build.",
            },
            {
                question: "Can you take over a product we already run?",
                answer: "Yes. We start with a review of the product and its code, then plan what to improve first.",
            },
            {
                question: "How soon can we launch an MVP?",
                answer: "A custom web app or MVP typically takes 8 to 12 weeks, built in agile sprints so you see progress throughout.",
            },
            {
                question: "Who owns the code?",
                answer: "Ownership is agreed in the contract for each project, so you know from the start what you will own when the work is done.",
            },
            FAQ_EXISTING_TEAM,
            FAQ_NDA,
        ],
    },
    start: {
        eyebrow: "SaaS",
        title: { lead: "Have a SaaS product", muted: "in mind?" },
        body: "Tell us your idea, your stage and your timeline, and we will come back with a plan.",
        promises: ["What your MVP needs, and what can wait", "An architecture that can grow with you", "A plan from MVP to paying customers"],
    },
};

const blockchainWeb3: ExpertisePage = {
    slug: "blockchain-web3",
    seo: {
        title: "Blockchain & Web3 Development | Spotmies",
        description: "Blockchain and Web3 products built with security at every step. From architecture and smart contracts to a live product, with security at every step.",
    },
    ctaLabel: "Discuss your project",
    hero: {
        eyebrow: "Blockchain & Web3",
        title: { lead: "Blockchain & Web3 products,", muted: "built with security at every step." },
        subtitle: "From architecture and smart contracts to a live product, including a full trading platform we built for a client.",
        tagline: "We build products. Ours and yours.",
        exploreLabel: "Explore our solutions",
        ascii: ["blockchain", "coin", "chain_links", "p2p_network"],
    },
    outcomes: {
        title: { lead: "What we help", muted: "you do" },
        intro: OUTCOMES_INTRO,
        items: [
            { text: "Launch a non-custodial exchange with swaps, futures, copy trading and P2P escrow", proof: "Amero X", icon: "wallet", project: "Amero X" },
            { text: "Remove gas fees so non-crypto users can join without friction", proof: "Cypher-B · Gasless", icon: "zap", project: "Cypher-B" },
            { text: "Make records tamper-proof with on-chain verification", proof: "Cypher-B", icon: "lock", project: "Cypher-B" },
            { text: "Design, mint and launch an NFT collection on Ethereum", proof: "Indie Skull Syndicate · Mad Angles", icon: "image", project: "Indie Skull Syndicate" },
            { text: "Build a Web3 community around real interaction", proof: "Boom Boom Talk", icon: "messages", project: "Boom Boom Talk" },
        ],
    },
    process: {
        title: { lead: "From blockchain concepts", muted: "to real-world solutions" },
        intro: "We build secure, scalable blockchain and Web3 solutions that bring transparency, trust, and practical value to digital experiences.",
        steps: [
            { title: "Analyze", body: "We understand your goals, identify the right blockchain use cases, and define a practical approach to your project.", icon: "search" },
            { title: "Architect", body: "We design the system architecture, smart contract structure, and user experience around your requirements.", icon: "layers" },
            { title: "Develop", body: "We build decentralized applications, smart contracts, and Web3 integrations with a focus on security and reliability.", icon: "code" },
            { title: "Deploy", body: "We test, verify, and deploy your solution to ensure it operates securely and reliably in a live environment.", icon: "rocket" },
        ],
    },
    // Spotmies does not run a Web3 product of its own (Amero X was built for a client), so this section stays hidden
    ownProducts: { title: { lead: "Web3 products", muted: "of our own" }, intro: "", items: [] },
    clientWork: {
        title: { lead: "Blockchain and Web3", muted: "powering business innovation" },
        intro: "The same team, the same process, creating decentralized solutions for different goals.",
        items: [
            { name: "Amero X", tag: "DEX · Trading", body: "A non-custodial exchange with swaps, spot and futures trading, copy trading and peer-to-peer trades.", projects: ["Amero X"] },
            { name: "Cypher-B", tag: "Verification · Gasless", body: "Academic records verified on-chain, with gasless transactions for non-crypto users.", projects: ["Cypher-B"] },
            { name: "Indie Skull Syndicate", tag: "NFT · Ethereum", body: "2,500 generative NFTs, minted on Ethereum through MetaMask.", projects: ["Indie Skull Syndicate"] },
            { name: "Mad Angles", tag: "NFT · Ethereum", body: "A geometric NFT collection with its own smart contracts and minting site.", projects: ["Mad Angles"] },
            { name: "Boom Boom Talk", tag: "Social · Web3", body: "A Web3 dating app built around conversation, not swipes.", projects: ["Boom Boom Talk"] },
        ],
    },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "Real products, not demos", body: "We have shipped a full non-custodial exchange for a client, so we build for real users and real funds." },
            { title: "Security at every step", body: "Contracts, wallets and the product around them are built with security in mind from the start." },
            WHY_ONE_TEAM,
        ],
    },
    voices: {
        title: VOICES_TITLE,
        names: ["Ravi Unukuru", "Vamsi Gummadi"],
    },
    team: {
        title: { lead: "Built by a team that", muted: "ships Web3 to production" },
        intro: "We have taken Web3 products from first contract to live users, including a full trading platform for a client, so we know what it takes to keep one secure and live.",
    },
    faq: {
        title: { lead: "Questions founders", muted: "ask first." },
        intro: "The things we get asked before a Web3 build. Anything else, just ask.",
        items: [
            {
                question: "Do we need a blockchain?",
                answer: "Not always. We check whether a blockchain is the right tool for your idea before you spend on the build.",
            },
            {
                question: "Which wallets do you support?",
                answer: "Products we have built work with major wallets such as MetaMask, Phantom and WalletConnect.",
            },
            {
                question: "Can people use it without crypto experience?",
                answer: "Yes. We have built gasless flows, so users can get started without paying fees or understanding gas.",
            },
            {
                question: "How do you check smart contracts before launch?",
                answer: "Every contract is reviewed and tested by our team before it goes live.",
            },
            FAQ_EXISTING_TEAM,
            FAQ_NDA,
        ],
    },
    start: {
        eyebrow: "Web3",
        title: { lead: "Have a Web3 product", muted: "in mind?" },
        body: "Tell us your idea, your stage and your timeline, and we will come back with a plan.",
        promises: ["Whether blockchain is the right tool for your idea", "Which chain and wallets fit your users", "A plan for what to build first"],
    },
};

const androidIosApps: ExpertisePage = {
    slug: "android-ios-apps",
    seo: {
        title: "Android & iOS App Development | Spotmies",
        description: "Mobile applications designed to be opened every day. One product team for design, development, store launch and ongoing updates.",
    },
    ctaLabel: "Build your app",
    hero: {
        eyebrow: "Android & iOS",
        title: { lead: "Mobile applications", muted: "designed to be opened every day." },
        subtitle: "One product team for design, development, store launch and ongoing updates.",
        tagline: "We build products. Ours and yours.",
        exploreLabel: "Explore our apps",
        ascii: ["phone", "app_grid", "bell", "signal"],
    },
    outcomes: {
        title: { lead: "What we help", muted: "you do" },
        intro: OUTCOMES_INTRO,
        items: [
            { text: "Pair hardware with a companion app: wearables, sensors and smart devices", proof: "Vitals Care Pro · OROLEXA", icon: "activity", project: "Vitals Care Pro" },
            { text: "Run bookings and safety briefings for a physical venue", proof: "A Square Go Karting", icon: "shield", project: "A Square Go Karting" },
            { text: "Deliver learning to thousands of students in one app", proof: "EduMoon", icon: "users", project: "EduMoon" },
            { text: "Bring every user role, from farmer to store to customer, into one system", proof: "Nandikrushi", icon: "layout", project: "Nandikrushi" },
            { text: "Handle sudden traffic spikes without slowing down", proof: "CGRUM", icon: "gauge", project: "CGRUM" },
        ],
    },
    process: {
        title: { lead: "From app idea", muted: "to launch-ready experience" },
        intro: "We build high-performance Android and iOS applications that combine intuitive design, reliable engineering, and seamless user experiences.",
        steps: [
            { title: "Analyze", body: "We understand your goals, target audience, and core requirements to define the right mobile app strategy.", icon: "search" },
            { title: "Design", body: "We create intuitive interfaces and user journeys tailored to Android and iOS platforms.", icon: "pen" },
            { title: "Develop", body: "We build responsive, secure, and scalable mobile applications optimized for performance across devices.", icon: "code" },
            { title: "Deliver", body: "We test across devices, resolve issues, and prepare your application for a smooth launch on Google Play and the Apple App Store.", icon: "rocket" },
        ],
    },
    ownProducts: { title: { lead: "We run apps", muted: "of our own" }, intro: "", items: [] },
    clientWork: {
        title: { lead: "Apps we have shipped", muted: "for founders and businesses" },
        intro: "The same team, the same process, applied to different products.",
        items: [
            { name: "Vitals Care Pro", tag: "IoT · Healthcare", body: "A wearable that streams vitals to an app and alerts doctors and caregivers.", projects: ["Vitals Care Pro"] },
            { name: "Commuter", tag: "Carpooling · Travel", body: "Route matching, live ride tracking and SOS alerts for daily commuters.", projects: ["Commuter"] },
            { name: "CGRUM", tag: "Rewards · Media", body: "QR rewards that turn TV and cinema ads into instant cashback.", projects: ["CGRUM"] },
            { name: "Nandikrushi", tag: "Multi-app · AgriTech", body: "Apps for consumers, farmers and stores, with farm-to-table tracking.", projects: ["Nandikrushi"] },
            { name: "A Square Go Karting", tag: "Bookings · Entertainment", body: "Track bookings and digital safety briefings for India's longest go-kart track.", projects: ["A Square Go Karting"] },
        ],
    },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "Apps that work with real devices", body: "Wearables, smart toothbrushes and air sensors: we connect apps to the hardware they rely on." },
            { title: "We run products of our own", body: "So we plan for life after launch, not just release day." },
            WHY_ONE_TEAM,
        ],
    },
    voices: {
        title: VOICES_TITLE,
        names: ["Anand Boddeti", "Mahidhar", "Dileep"],
    },
    team: {
        title: { lead: "Built by a team that", muted: "ships and maintains apps" },
        intro: "We design, build, launch and keep updating apps, with one team from start to finish.",
    },
    faq: {
        title: { lead: "Questions founders", muted: "ask first." },
        intro: "The things we get asked before an app project. Anything else, just ask.",
        items: [
            {
                question: "Do you build for both Android and iOS?",
                answer: "Yes. We build for both, and launch on Google Play and the App Store.",
            },
            {
                question: "Do you handle the store launch?",
                answer: "Yes. Store launch is part of the job, along with ongoing updates afterwards.",
            },
            {
                question: "Can the app work with our hardware?",
                answer: "Yes. We have connected apps to wearables, smart toothbrushes and air quality sensors.",
            },
            {
                question: "Native or cross-platform?",
                answer: "Both. We build with Flutter, React Native or fully native code, and choose with you based on what your app needs.",
            },
            {
                question: "How soon can our app be in the store?",
                answer: "A first release can be ready in about 8 weeks, depending on your requirements and the scope we agree in the contract.",
            },
            FAQ_EXISTING_TEAM,
            FAQ_NDA,
        ],
    },
    start: {
        eyebrow: "Mobile app",
        title: { lead: "Have an app", muted: "in mind?" },
        body: "Tell us your idea, your stage and your timeline, and we will come back with a plan.",
        promises: ["Which features your first release needs", "How the app fits into your users' day", "A plan from first design to store launch"],
    },
};

const qaConsulting: ExpertisePage = {
    slug: "qa-consulting",
    seo: {
        title: "QA & Technical Consulting | Spotmies",
        description: "Testing and technical advice for products you already run, so you know what to fix first.",
    },
    ctaLabel: "Request a review",
    hero: {
        eyebrow: "QA & Consulting",
        title: { lead: "Testing and technical advice", muted: "for products you already run." },
        subtitle: "Know what to fix first, from a team that builds and runs products of its own.",
        tagline: "We build products. Ours and yours.",
        exploreLabel: "Explore our products",
        ascii: ["shield", "magnifier", "bug", "checklist"],
    },
    outcomes: {
        title: { lead: "What we help", muted: "you do" },
        intro: "What our testing and technical advice is built to deliver.",
        // TODO(content): link cards to a client review once there is one to show (proof + project)
        items: [
            { text: "Find the problems your users keep running into", icon: "bug" },
            { text: "Know which problems to fix first, and why", icon: "list-checks" },
            { text: "Get a second opinion on your architecture and running costs", icon: "file-search" },
            { text: "Leave with a clear plan your own team can act on", icon: "map" },
        ],
    },
    process: {
        title: { lead: "From review", muted: "to a clear plan" },
        intro: "We help you understand how your product performs today and what to improve first, with practical advice backed by testing.",
        steps: [
            { title: "Review", body: "We walk through your product, its code, and how it runs today to understand where it stands.", icon: "file-search" },
            { title: "Test", body: "We test the journeys your users rely on most and log every issue we find.", icon: "bug" },
            { title: "Prioritize", body: "We rank what we find by impact, so you know exactly what to fix first and why.", icon: "list-checks" },
            { title: "Fix", body: "We fix the issues with you, or hand a clear plan to your own team.", icon: "code" },
        ],
    },
    ownProducts: {
        title: { lead: "We run products", muted: "of our own" },
        intro: "Keeping them running is where our advice comes from.",
        items: [
            {
                project: "OpenPlan AI",
                sector: "AI · Hardware",
                problem: "Hardware teams plan across spreadsheets, Jira and email, so requirements, BOMs and change approvals drift apart. OpenPlan brings them into one workspace.",
            },
            {
                project: "Chalo Ride",
                sector: "Travel · Mobility",
                problem: "Renting a bike often means unclear prices and slow paperwork. Chalo Ride shows the whole fleet with clear prices and no hidden charges.",
            },
        ],
    },
    // TODO(content): client reviews to feature. Each needs an entry in PROJECT_DATA; the section stays hidden until then.
    clientWork: { title: { lead: "Products we have reviewed", muted: "for founders" }, intro: "", items: [] },
    why: {
        title: WHY_TITLE,
        points: [
            { title: "We run our own products", body: "We know what breaks after launch because we keep our own products running." },
            { title: "Fix first, not fix everything", body: "You get a clear order of what matters most, so effort goes where it counts." },
            WHY_ONE_TEAM,
        ],
    },
    voices: {
        title: VOICES_TITLE,
        names: ["Vamsi Gummadi", "Swaroop"],
    },
    team: {
        title: { lead: "Reviewed by a team that", muted: "builds and runs products" },
        intro: "We don't only review products. We build them and run our own, so our advice comes from practice.",
    },
    faq: {
        title: { lead: "Questions founders", muted: "ask first." },
        intro: "The things we get asked before a review. Anything else, just ask.",
        items: [
            {
                question: "Do you only test, or advise too?",
                answer: "Both. We test your product and give technical advice, so you know what to fix first.",
            },
            {
                question: "Can you fix what you find?",
                answer: "Yes. We can fix it with you, or hand a clear list to your own team.",
            },
            {
                question: "Does our product need to be live?",
                answer: "This service is for products you already run, so it works best once real people are using it.",
            },
            {
                question: "What kinds of testing do you do?",
                answer: "Manual, automated, performance and security testing, chosen to fit your product.",
            },
            {
                question: "How long does a review take?",
                answer: "Up to about two weeks.",
            },
            FAQ_NDA,
        ],
    },
    start: {
        eyebrow: "Product review",
        title: { lead: "Have a product", muted: "that needs a second look?" },
        body: "Tell us what you run, what worries you and when you need answers, and we will come back with a plan.",
        promises: ["Where your product is most at risk", "What to fix first, and why", "A plan to fix it, with us or your team"],
    },
};

export const EXPERTISE_PAGES: Record<string, ExpertisePage> = {
    [aiMachineLearning.slug]: aiMachineLearning,
    [productDesign.slug]: productDesign,
    [generativeAiFilm.slug]: generativeAiFilm,
    [saasPlatforms.slug]: saasPlatforms,
    [blockchainWeb3.slug]: blockchainWeb3,
    [androidIosApps.slug]: androidIosApps,
    [qaConsulting.slug]: qaConsulting,
};

export function getServiceHref(slug: string) {
    return EXPERTISE_PAGES[slug] ? `/expertise/${slug}` : "/#services";
}

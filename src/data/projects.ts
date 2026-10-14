import { Project } from "@/types/types";

export const PROJECT_DATA: Project[] = [
    {
        id: 28,
        title: "OpenPlan AI",
        category: "Web App, AI/Hardware",
        description: "The AI planning layer for hardware teams, working alongside the PLM they already use.",
        image: "/case-studies/openplan/openplan.webp",
        link: "https://openplanai.com/",
        client: "Spotmies",
        timeline: "Ongoing",
        role: "Built in-house",
        rating: 5,
        priority: true,
        introduction: "OpenPlan is our own AI product for teams that build physical products, from consumer electronics and IoT to robotics, drones, EV hardware and industrial equipment. It brings requirements, BOMs, engineering changes and milestone reviews into one workspace, with an AI Architect that turns a product spec into a full project plan.",
        challenge: "Hardware teams plan across disconnected tools: BOMs in Excel, timelines in Jira, sign-offs in email and Slack. Enterprise PLM is too heavy for fast-moving teams and lightweight task tools don't understand parts, revisions or gate reviews, so requirements get lost and changes slip through without a trail.",
        approach: "We designed and built OpenPlan as a planning layer that sits alongside existing CAD and PLM tools such as SolidWorks, Onshape, Teamcenter and Windchill rather than replacing them. The AI Architect reads a PRD, asks clarifying questions, then generates modules, milestones and timelines. Requirements break down in five tiers from stakeholder need to component and link to multi-level BOMs, while ECO approvals, deviation tracking and PDR/CDR/MRR gate reviews all run in the same workspace, summarised in one Command Center.",
        result: "Hardware teams go from a product spec to a structured, traceable plan in one place, with every requirement linked to a part and every change approved on record. OpenPlan is live with free, Pro and Enterprise plans.",
        testimonial: undefined,
        gallery: [
            "/case-studies/openplan/openplan.webp",
            "/case-studies/openplan/openplan1.webp",
            "/case-studies/openplan/openplan2.webp",
            "/case-studies/openplan/openplan3.webp",
            "/case-studies/openplan/openplan4.webp",
            "/case-studies/openplan/openplan5.webp",
            "/case-studies/openplan/openplan6.webp"
        ]
    },
    {
        id: 24,
        title: "Reaidy.io",
        category: "Web App, AI/Recruitment",
        description: "Revolutionizing recruitment with precise AI job interviews and smart assessments.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/reaidy.png",
        link: "https://reaidy.io/",
        client: "Reaidy.io",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "A next-generation AI recruitment platform designed to streamline the hiring process by automating interviews, assessments, and candidate matching.",
        challenge: "Recruiters spend too much time on manual screenings and repetitive interviews, often leading to bias, delays, and poor candidate experiences.",
        approach: "We implemented an advanced AI-driven interview system that automatically evaluates candidates' skills, communication, and cultural fit. The platform generates structured reports and actionable insights, empowering hiring teams to make faster, data-backed decisions while reducing manual workload.",
        result: "Companies achieve reduced time-to-hire, unbiased evaluations, and an improved candidate experience, enabling them to scale teams efficiently without compromising on quality.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/reaidy.png",
            "https://spotmiesstorage.blob.core.windows.net/media/reaidy1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/reaidy2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/reaidy3.png",
            "https://spotmiesstorage.blob.core.windows.net/media/reaidy4.png"
        ]
    },
    {
        id: 23,
        title: "Amero X",
        category: "Web App, DEX",
        description: "A premium hybrid DEX featuring non-custodial swaps, copy trading, and institutional-grade tools.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/amerox.png",
        link: "https://amerox.io/",
        client: "Amero X",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "The next-generation hybrid DEX and trading platform for the Web3 era, combining institutional-grade tools with the security of on-chain settlement.",
        challenge: "Traders needed a seamless way to swap, stake, and grow portfolios without invasive registration or KYC hurdles while maintaining full control of their assets.",
        approach: "We developed a non-custodial ecosystem that supports major wallets like MetaMask, Phantom, and WalletConnect. The platform integrates premium features such as AMM Swap, Spot Trading, and Futures with up to 5x leverage, along with Copy Trading. Additionally, a P2P trading engine was built with secure smart contract escrow protection to ensure safe transactions.",
        result: "Created a high-performance platform achieving 99.9% uptime and supporting over 50,000 total users with a trading volume of $12M.",
        testimonial: {
            text: "Experience the future of decentralized trading with gold-standard security and low slippage.",
            author: "Naveen Kumar",
            position: "Verified User"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/amerox.png",
            "https://spotmiesstorage.blob.core.windows.net/media/amerox1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/amerox2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/amerox3.png",
            "https://spotmiesstorage.blob.core.windows.net/media/amerox4.png",
            "https://spotmiesstorage.blob.core.windows.net/media/amerox5.png",
            "https://spotmiesstorage.blob.core.windows.net/media/amerox6.png"
        ]
    },
    {
        id: 20,
        title: "OROLEXA",
        category: "IoT/Mobile App, Healthcare",
        description: "Smart dental health tracking with AI-powered instant analysis.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/orelexa.png",
        link: "",
        client: "OROLEXA",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "A revolutionary smart toothbrush ecosystem featuring an integrated camera lens and a companion AI app that provides real-time oral health insights.",
        challenge: "Dental issues often go undetected until they become painful and expensive because patients lack the tools to monitor their oral health daily at home.",
        approach: "The team developed the digital interface for a lens-equipped toothbrush that captures high-resolution oral imagery. This hardware was paired with an AI-powered mobile app built to analyze images for early signs of cavities or gum disease, providing users with a personalized dashboard for tracking brushing habits and hygiene scores.",
        result: "Empowered users to take control of their dental hygiene with preventive care tools that identify issues long before they require major medical intervention.",
        testimonial: {
            text: "Spotmies absolutely nailed out product design... perfectly aligned with our user behavior.",
            author: "Dr. Prasanna",
            position: "Founder at OROLEXA"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/orelexa.png",
            "https://spotmiesstorage.blob.core.windows.net/media/orelexa1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/orelexa2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/orelexa3.png",
            "https://spotmiesstorage.blob.core.windows.net/media/orelexa4.png",
            "https://spotmiesstorage.blob.core.windows.net/media/orelexa5.png"
        ]
    },
    {
        id: 25,
        title: "Vitals Care Pro",
        category: "IoT/Mobile App, Healthcare",
        description: "Continuous remote health monitoring for chronic conditions and elderly care.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/vitals.png",
        link: "",
        client: "Vitals Care Pro",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "A connected healthcare ecosystem designed to bridge the gap between patients and caregivers through continuous, real-time monitoring of critical health parameters.",
        challenge: "Patients with chronic conditions and elderly individuals often struggle with timely health monitoring. Missing early signs of abnormal vitals can lead to delayed medical intervention and serious complications.",
        approach: "We engineered a seamless IoT ecosystem centering on a wearable device that continuously tracks key vitals such as ECG, heart rate, respiration, SpO2, and blood pressure. This data is synced in real-time to a intuitive mobile application, enabling doctors and caregivers to receive instant alerts and monitor patient health proactively.",
        result: "Improved patient safety through early detection, reduced hospitalizations, and provided peace of mind for both users and families by ensuring continuous, reliable, and connected healthcare monitoring.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/vitals.png",
            "https://spotmiesstorage.blob.core.windows.net/media/vitals1.png"
        ]
    },
    {
        id: 17,
        title: "EduMoon",
        category: "Mobile App, EdTech",
        description: "The largest engineering student community for learning, skill development, and growth.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/edumoon.png",
        link: "",
        client: "EduMoon",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "A massive, all-in-one ed-tech ecosystem serving over 15,000 engineering students with resources ranging from academic courses and internships to student clubs and certifications.",
        challenge: "Engineering students struggled with a fragmented education landscape, lacking a single unified platform that bridged the gap between academic curriculum and industry-ready skills.",
        approach: "We developed a centralized Learning Management System (LMS) capable of hosting vast libraries of video courses and materials. To boost engagement, the learning experience was gamified with student clubs and activity-based certifications, all managed through a robust admin panel designed to handle content delivery at scale.",
        result: "Successfully bridged the academia-industry gap, empowering thousands of students to upskill, network, and advance their careers through a single integrated platform.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/edumoon.png",
            "https://spotmiesstorage.blob.core.windows.net/media/edumoon1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/edumoon2.png"
        ]
    },
    {
        id: 15,
        title: "Awaken",
        category: "Web App, Fintech",
        description: "Smart goal-based financial planning with professional expert guidance.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/awaken.png",
        link: "https://awaken.mainstream.co.in/",
        client: "Awaken",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "A comprehensive financial wellness platform that bridges the gap between aspirations and reality by providing smart calculators, personalized roadmaps, and expert guidance for major life milestones.",
        challenge: "Many individuals struggle to translate major life goals—like buying a home or funding education—into actionable daily savings plans due to a lack of financial literacy and complex investment options.",
        approach: "We engineered smart financial calculators that reverse-engineer complex life goals into manageable monthly savings targets. By integrating a professional advisory portal, users can access real-time expert consultation, while a custom-designed visual timeline helps them track their progress against major life milestones.",
        result: "Empowered users with clarity and confidence, enabling them to transition from vague aspirations to concrete, data-backed financial roadmaps.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/awaken.png",
            "https://spotmiesstorage.blob.core.windows.net/media/awaken1.png"
        ]
    },
    {
        id: 13,
        title: "Chalo Ride",
        category: "Web App, ReactJS",
        description: "Visakhapatnam's most trusted and transparent two-wheeler rental service.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_102.png",
        link: "https://chaloride.com/bikes-for-rental-vizag",
        client: "Chalo Ride",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "Visakhapatnam's premier two-wheeler rental service, an initiative by Spotmies offering affordable and transparent bike rentals.",
        challenge: "Tourists and locals struggled to find affordable, reliable, and transparent two-wheeler rentals in Visakhapatnam.",
        approach: "We built a user-friendly and transparent booking website using ReactJS that displays all fleet options clearly. We established a policy of clear pricing with absolutely no hidden charges and streamlined the entire rental process to be quick and hassle-free.",
        result: "Provided cost-effective mobility to the city with a reliable service that users trust for their daily commute or travel needs.",
        testimonial: {
            text: "The platform makes renting bikes in Vizag incredibly easy. The transparent pricing and user-friendly interface are exactly what we needed.",
            author: "Spotmies Team",
            position: "Co-founders, Chalo Ride"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_102.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_7.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_6.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_8.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_9.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_5.png"
        ]
    },
    {
        id: 14,
        title: "Mr Bikes",
        category: "Web App, ReactJS",
        description: "Andhra Pradesh's top bike rental platform offering flexible rides with safety gear included.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_126.png",
        link: "https://www.mrbikes.in/bikes-for-rental-visakapatnam",
        client: "Mr Bikes",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true,
        introduction: "No. 1 bike rental service provider in Andhra Pradesh offering flexible hourly and daily rental options with safety gear included.",
        challenge: "Customers found it difficult to find flexible rental options and prioritized safety.",
        approach: "We implemented a flexible booking system that allows users to choose between hourly and daily rental plans. We also highlighted safety by ensuring gear is included with every rental and showcased the wide range of fleet options online for easy browsing.",
        result: "Became the hassle-free choice for the region, improving fleet utilization and customer safety.",
        testimonial: {
            text: "Our rental operations have become so much more efficient with this web app. Excellent support and design that our customers love.",
            author: "Rajesh V.",
            position: "Owner, Mr Bikes"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_126.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_4.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_3.png"
        ]
    },
    {
        id: 27,
        title: "SafeGuard Air",
        category: "IoT/Mobile App, Environment",
        description: "Smart IoT + AI platform for real-time air quality monitoring and safety alerts.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/safeguardair.png",
        link: "https://www.safeguardair.com/",
        client: "SafeGuard Air",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: true, // FEATURED
        introduction: "A smart IoT + AI-powered platform designed to continuously monitor air quality and provide actionable insights for healthier environments.",
        challenge: "Poor air quality often goes unnoticed until it causes health issues. Traditional monitoring systems are costly, limited in coverage, and fail to provide real-time alerts to individuals and organizations.",
        approach: "Spotmies developed SafeGuard Air, a smart IoT + AI-powered platform that continuously monitors air quality, detects pollutants, and provides instant alerts via mobile and web dashboards. The system is designed for both personal and enterprise use.",
        result: "SafeGuard Air delivers real-time awareness, enabling individuals and businesses to take preventive action, reduce exposure to harmful pollutants, and ensure healthier, safer environments.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/safeguardair.png",
            "https://spotmiesstorage.blob.core.windows.net/media/safeguardair1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/safeguardair2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/safeguardair3.png"
        ]
    },
    {
        id: 16,
        title: "Commuter",
        category: "Mobile App, Travel",
        description: "A carpooling platform connecting people to share rides safely and efficiently.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/commuter.png",
        link: "",
        client: "Commuter",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A sustainable transportation ecosystem connecting daily travelers for safe, efficient, and cost-effective carpooling, designed to reduce urban congestion and carbon footprints.",
        challenge: "Daily commuters faced rising travel costs, limited public transport options, and safety concerns when considering informal ride-sharing arrangements.",
        approach: "To solve this, we developed an intelligent route-matching algorithm that pairs riders with similar schedules and locations. The platform was fortified with advanced safety features, including real-time ride tracking and SOS alerts, and a community-rating system was introduced to ensure trust and accountability among users.",
        result: "Significantly reduced travel expenses and environmental impact for users while fostering a trusted community of reliable daily commuters.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/commuter.png",
            "https://spotmiesstorage.blob.core.windows.net/media/commuter1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/commuter2.png"
        ]
    },
    {
        id: 19,
        title: "Mobile Masala",
        category: "Web App, Entertainment",
        description: "A dedicated celebrity news portal with streamlined editorial workflows.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/mobilemasala.png",
        link: "https://www.mobilemasala.com/",
        client: "Mobile Masala",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A high-traffic digital news portal specializing in celebrity gossip and entertainment, optimized for rapid content publishing and high user engagement.",
        challenge: "The editorial team faced bottlenecks with outdated content management systems that slowed down the publishing of breaking news in a fast-paced industry.",
        approach: "We developed a custom, high-performance Admin Panel tailored specifically to the editorial team's needs. This system integrates real-time publishing tools and granular user analytics to track engagement, while the frontend was optimized to ensure rapid load times and maximize ad-revenue generation.",
        result: "Reduced editorial turnaround time by nearly 35%, allowing the team to break news faster and retain a larger, more engaged audience.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/mobilemasala.png",
            "https://spotmiesstorage.blob.core.windows.net/media/mobilemasala1.png"
        ]
    },
    {
        id: 10,
        title: "Vihaan Electrix",
        category: "Mobile App, AdobeXD",
        description: "A complete EV ecosystem for booking rides, finding chargers, and powering green travel.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_110.png",
        link: "https://www.vihaanelectrix.revoluce.in/",
        client: "Vihaan Electrix",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "An electric vehicle ecosystem platform for booking electric bikes, locating service stations, and finding charging points.",
        challenge: "Creating a scalable database to handle a growing user base while maintaining fluid animations and real-time map data.",
        approach: "We built a robust EV booking system integrated with real-time maps to help users easily locate service and charging stations. The app also features a test drive scheduling module and was built with a focus on fluid, responsive animations to enhance the user interface.",
        result: "A robust full-service EV ecosystem that simplifies ownership and rental for users, supporting the transition to green energy.",
        testimonial: {
            text: "The EV booking and station locator features are seamless. A top-tier user experience that makes riding electric convenient and fun.",
            author: "Kartik Reddy",
            position: "Operations Lead, Vihaan Electrix"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_110.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_36.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_37.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_38.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_35.png"
        ]
    },
    {
        id: 26,
        title: "MyBodyQode",
        category: "Web App, HealthTech",
        description: "Unlock your genetic potential with AI-powered preventive health insights tailored to your DNA.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/mybodyqode.png",
        link: "https://mybodyqode.vercel.app/",
        client: "MyBodyQode",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false, // FEATURED
        introduction: "A DNA + AI preventive health platform that unlocks genetic potential with AI-powered insights tailored to your unique DNA profile.",
        challenge: "Understanding personal health at a genetic level is complex. General health advice often fails because it doesn't account for an individual's unique DNA profile, leading to ineffective preventive care strategies.",
        approach: "We built an AI-driven platform that integrates DNA sequencing data with lifestyle markers. The system analyzes this complex dataset to generate hyper-personalized nutrition, fitness, and health recommendations tailored specifically to the user's genetic makeup.",
        result: "Empowered users with actionable, science-backed health insights, allowing them to make informed lifestyle choices that align perfectly with their genetic predisposition.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/mybodyqode.png",
            "https://spotmiesstorage.blob.core.windows.net/media/mybodyqode1.png"
        ]
    },
    {
        id: 18,
        title: "Farm Vaidya",
        category: "Web App, AgriTech",
        description: "Empowering agriculture with Gen AI-powered multilingual voice solutions.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/farmvidya.png",
        link: "https://www.farmvaidya.ai/",
        client: "Farm Vaidya",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A cutting-edge AgriTech platform leveraging Generative AI and voice technology to provide farmers with instant, expert agricultural advice in their native languages.",
        challenge: "Indian farmers often lack access to timely expert advice due to language barriers and the scarcity of agricultural extension officers in remote areas.",
        approach: "The solution involved implementing Gen AI voice agents capable of understanding and responding in multiple regional dialects. We also created 'AI Clones' of real-world agricultural experts to scale personalized advisory services, designing an intuitive, voice-first interface that ensures accessibility for users with varying levels of literacy.",
        result: "Democratized access to expert knowledge, enabling farmers to make data-driven decisions that improve crop yields and sustainability.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya.png",
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya3.png",
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya4.png",
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya5.png",
            "https://spotmiesstorage.blob.core.windows.net/media/farmvidya6.png"
        ]
    },
    {
        id: 22,
        title: "WingDent",
        category: "Web App, Healthcare",
        description: "Tele-dentistry platform providing professional dental care at your doorstep.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/wingdent.png",
        link: "https://wingdent.com/",
        client: "WingDent",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A comprehensive tele-dentistry platform redefining dental access by enabling users to book professional dental care and consultations directly to their doorstep.",
        challenge: "Traditional dental care is often inaccessible due to high costs, clinic wait times, and mobility issues for elderly or busy patients.",
        approach: "We built a seamless booking engine that allows patients to schedule home-visit appointments with ease. The platform also integrates video consultation features for remote diagnosis and utilizes AI-driven 'Smile Checks' to provide instant preliminary assessments, reducing the need for unnecessary physical visits.",
        result: "Made professional dental care significantly more affordable and accessible, bringing the clinic experience into the comfort of the patient's home.",
        testimonial: undefined,
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent3.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent4.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent5.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent6.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent7.png",
            "https://spotmiesstorage.blob.core.windows.net/media/wingdent8.png"
        ]
    },
    {
        id: 5,
        title: "A Square Go Karting",
        category: "Mobile App, Flutter",
        description: "The ultimate companion app for booking and safety at India's longest go-kart track.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_125.png",
        link: "https://app.asquaregokarting.com/",
        client: "A Square Go Karting",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A theme park application for India's longest go-kart track located in Visakhapatnam, covering bookings, safety info, and entertainment options.",
        challenge: "The park required a digital solution to manage bookings for a flexible track design and ensure safety compliance for night racing.",
        approach: "We designed a flexible track management system capable of handling dynamic booking slots. To enhance the user experience, we integrated night track visuals for premium race slots and implemented strict digital safety briefings that users must complete before racing.",
        result: "Streamlined booking operations and enhanced the visitor experience, creating a seamless connection between the app and the physical track.",
        testimonial: {
            text: "The team provided a responsive and trustworthy delivery. They truly understood our needs for a premium theme park experience.",
            author: "Anand Boddeti",
            position: "Client Representative"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_125.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_73.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_74.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_75.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_76.png"
        ]
    },
    {
        id: 7,
        title: "Cypher-B",
        category: "Web App, NextJS",
        description: "Securing academic verification on the blockchain with hassle-free, gasless transactions.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_115.png",
        link: "https://cypherb.spotmies.com/",
        client: "Cypher-B",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A blockchain-based recruitment and verification platform that authenticates candidate academic details and identities on-chain.",
        challenge: "Verifying academic credentials was prone to fraud and slow manual checks. Users were also hesitant to pay crypto gas fees.",
        approach: "We implemented a blockchain-based verification system that creates immutable records of academic achievements. To remove entry barriers for non-crypto users, we utilized Biconomy to enable gasless transactions, making the process seamless and free for the end-user.",
        result: "A secure, fraud-proof verification system that is accessible to non-crypto natives thanks to the gasless transaction feature.",
        testimonial: {
            text: "Gasless transactions and blockchain verification were implemented perfectly. A secure and innovative solution that solves a real industry problem.",
            author: "James Chen",
            position: "CTO, Cypher-B"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_115.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_62.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_63.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_64.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_65.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_66.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_67.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_68.png"
        ]
    },
    {
        id: 6,
        title: "Boom Boom Talk",
        category: "Mobile App, Figma",
        description: "A Web3 dating platform where genuine conversations matter more than superficial swipes.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_116.png",
        link: "",
        client: "Boom Boom Talk",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A pioneering Web3 dating platform built around genuine conversation-focused matching, moving beyond superficial swiping.",
        challenge: "Users were tired of superficial swiping; the challenge was to foster genuine connections through a digital interface.",
        approach: "We created interactive profiles that require users to complete multimedia challenges to reveal more about themselves. We also hosted virtual events to facilitate organic connections and prioritized chat-centric features over traditional image swiping mechanisms.",
        result: "Successfully created a community focused on meaningful interaction, resulting in higher user retention and deeper engagement metrics.",
        testimonial: {
            text: "The interactive profiles are a game-changer. Finally, a dating app that feels genuine and engaging. The Web3 integration is seamless.",
            author: "Elena Gomez",
            position: "Founder, Boom Boom Talk"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_116.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_72.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_69.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_70.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_71.png"
        ]
    },
    {
        id: 4,
        title: "Decentrialz",
        category: "Web App, ReactJS",
        description: "Accelerating clinical trial recruitment through smart automation and empathetic AI.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_120.png",
        link: "https://decentrialz.com/",
        client: "Decentrialz",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A platform revolutionizing clinical trial recruitment by locating and qualifying patients at scale using automation and AI.",
        challenge: "The clinical trial recruitment process was traditionally manual, slow, and inefficient at targeting the right patient demographics.",
        approach: "We automated the critical recruitment tasks to replace slow manual processes and utilized precise digital marketing targeting to reach suitable patients. To maintain a human connection, we integrated on-demand virtual nurses to guide patients through the qualification process.",
        result: "Maintains a human touch via empathetic virtual nurse interactions while drastically speeding up the recruitment and qualification timeline.",
        testimonial: {
            text: "Highly dedicated & efficient; commendable responsiveness. Looking forward to continue working with them.",
            author: "Swaroop",
            position: "Founder at Advait Labs & Decentrialz"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_120.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_87.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_88.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_89.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_90.png"
        ]
    },
    {
        id: 8,
        title: "Nandikrushi",
        category: "Mobile App, Figma",
        description: "Bridging the gap between farmers and families with 100% traceable organic food.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_113.png",
        link: "",
        client: "Nandikrushi",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "An organic food delivery platform bridging farmers and consumers in Vizag, ensuring traceability from farm to table.",
        challenge: "The project needed to unify multiple user roles (Farmer, Admin, User, Store) into one cohesive system while ensuring product transparency.",
        approach: "We built a multi-app ecosystem that seamlessly connects Consumers, Farmers, and Stores on a single backend. A key feature we developed is 'Track and Trace,' which allows customers to scan a product and see its exact journey from the farm to their table.",
        result: "Established a transparent supply chain that built consumer trust and simplified logistics for local farmers and stores.",
        testimonial: {
            text: "Connecting farmers directly to consumers has never been smoother. The Track and Trace feature gives our customers 100% confidence in our products.",
            author: "Ravi Kumar",
            position: "Director, Nandikrushi"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_113.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_54.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_55.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_56.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_57.png"
        ]
    },
    {
        id: 9,
        title: "CGRUM",
        category: "Mobile App, Figma",
        description: "Gamifying TV ads with instant QR rewards to turn viewers into engaged winners.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_117.png",
        link: "https://play.google.com/store/apps/details?id=com.bheemaraju.cgrum",
        client: "CGRUM",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A QR scanning application with a reward and cashback system designed to gamify traditional television and theater advertising engagement.",
        challenge: "Advertisers struggled with low engagement; the app needed to process high-volume QR scans instantly during short ad spots.",
        approach: "We engineered a rapid QR code generation and processing engine capable of handling high-traffic spikes during ad spots. This was paired with a real-time reward system that instantly distributes cashback and points to keep viewers engaged and coming back.",
        result: "increased ad engagement and viewer watch time significantly, providing advertisers with measurable interaction data.",
        testimonial: {
            text: "The QR system handled our high traffic volumes effortlessly. The gamification strategy has significantly boosted ad engagement.",
            author: "Priya Sharma",
            position: "Marketing Head, CGRUM"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_117.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_40.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_42.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_43.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_41.png"
        ]
    },
    {
        id: 1,
        title: "Workewhere",
        category: "Web App, ReactJS",
        description: "Empowering businesses with AI chatbots trained on their own website data.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_124.png",
        link: "",
        client: "Workewhere",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A platform enabling companies to deploy AI-driven chatbots to enhance customer engagement using their own website data.",
        challenge: "Companies needed a way to create interactive AI chatbots trained specifically on their own diverse website content without manual data entry.",
        approach: "We built a custom web scraping tool to automatically extract product details and FAQs from client websites. To make this data interactive, we implemented Retrieval-Augmented Generation (RAG), effectively combining precise database retrieval with generative AI to provide accurate, context-aware responses.",
        result: "Successfully automated customer support interactions, reducing response times and providing accurate, data-backed answers to user queries.",
        testimonial: {
            text: "The AI chatbot integration completely transformed our customer support. The RAG implementation is incredibly accurate. Highly recommended for their technical expertise.",
            author: "Sarah Jenkins",
            position: "CTO, Workewhere"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_124.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_127.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_128.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_129.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_130.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_131.png"
        ]
    },
    {
        id: 21,
        title: "Referral Bazaar",
        category: "Mobile App, Retail",
        description: "Automating local shop referrals, discounts, and wallet settlements.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/referalbazzar.png",
        link: "",
        client: "Referral Bazaar",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A hyper-local retail platform connecting shop owners, customers, and referral partners through an automated system of discounts and commission tracking.",
        challenge: "Local shop owners struggled to acquire new customers cost-effectively, while referral tracking was often manual, messy, and prone to disputes.",
        approach: "We built a unified platform that connects partners, merchants, and customers in a seamless ecosystem. The system automates the traditionally messy calculation and settlement of referral commissions and wallet balances, and implements a transparent QR-based redemption system to facilitate smooth in-store discounts.",
        result: "Created a transparent, trust-based local economy that boosted foot traffic for merchants and provided reliable passive income for referral partners.",
        testimonial: {
            text: "Spotmies doesn't just build digital products they build relationships, ideas, and trust.",
            author: "Santosh",
            position: "Founder at Referral Bazaar"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/referalbazzar.png",
            "https://spotmiesstorage.blob.core.windows.net/media/referalbazzar1.png"
        ]
    },
    {
        id: 2,
        title: "Credit Report",
        category: "Web App, ReactJS",
        description: "Your all-in-one financial dashboard for credit insights and seamless loan approvals.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_122.png",
        link: "https://saiteja-credit-report.onrender.com/",
        client: "Credit Report",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A financial insights platform offering detailed credit reports and streamlining loan applications for users seeking home, personal, or vehicle loans.",
        challenge: "Users struggled to access transparent, detailed financial information required for securing various types of loans in one place.",
        approach: "We developed comprehensive credit history summaries that cover accounts, payments, and inquiries in a single view. Additionally, we created specific analytical tools that highlight key areas where users can improve their credit scores to secure better loan terms.",
        result: "Empowered users with financial transparency, significantly simplifying the loan application process and improving approval odds.",
        testimonial: {
            text: "A transparent and easy-to-use platform that made understanding credit scores simple for our users. The UI is clean and the insights are invaluable.",
            author: "David Ross",
            position: "Product Manager, Credit Report"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_122.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_96.png"
        ]
    },
    {
        id: 3,
        title: "Zit (Zin in Thuiswerken)",
        category: "Web App, ReactJS",
        description: "Optimizing hybrid work to boost employee well-being and maximize employer benefits.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_121.png",
        link: "",
        client: "Zit (Zin in Thuiswerken)",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "A hybrid working solutions platform focused on employee well-being and trust, designed to reduce burnout and boost productivity.",
        challenge: "Employers needed a way to optimize tax benefits for hybrid work while ensuring employee well-being and preventing burnout.",
        approach: "We implemented a sophisticated hybrid work tracking system that monitors work locations to optimize tax-benefit calculations for employers. Simultaneously, we integrated burnout reduction tools that prompt employees to maintain a healthy work-life balance.",
        result: "Delivered a comprehensive solution that increased employee satisfaction and maximized fiscal benefits for participating companies.",
        testimonial: {
            text: "Impressed by expertise and adaptability; AI solution development went smoothly. Highly recommend for innovative solutions.",
            author: "Marco Turk",
            position: "Founder at Zin In Thuiswerken"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_121.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_91.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_92.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_93.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_94.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_95.png"
        ]
    },
    {
        id: 11,
        title: "Indie Skull Syndicate",
        category: "NFT Project, NextJS",
        description: "A viral collection of 2,500 generative NFTs blending phantom vibes with human aesthetics.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_108.png",
        link: "https://indieskullsyndicate.spotmies.com/",
        client: "Indie Skull Syndicate",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "An NFT collection of 2500 unique digital art pieces blending human and phantom aesthetics, featuring on OpenSea.",
        challenge: "Standing out in a crowded NFT market required a unique aesthetic and a highly performant generative art algorithm.",
        approach: "We employed advanced generative art techniques to algorithmically merge human and phantom design elements into unique characters. The project was launched with secure smart contracts deployed on Ethereum and seamless MetaMask integration for easy minting.",
        result: "Achieved viral success, ranking in the Top 3 on OpenSea in a single day and building a community of over 2500 members.",
        testimonial: {
            text: "The generative art quality is outstanding. Reaching Top 3 on OpenSea was a dream come true thanks to this team's design and dev skills.",
            author: "Alex Rivera",
            position: "Creator, Indie Skull Syndicate"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_108.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_28.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_29.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_30.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_27.png"
        ]
    },
    {
        id: 12,
        title: "Mad Angles",
        category: "NFT Project, NextJS",
        description: "Expressive geometric art meets blockchain technology in a unique, triangular NFT collection.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_107.png",
        link: "https://www.behance.net/gallery/166759955/Mad-angles-NFT-project-web-ui?tracking_source=search_projects|mad+angles+design&l=2",
        client: "Mad Angles",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        priority: false,
        introduction: "An NFT collection featuring triangular geometric art with expressive emotional facial features.",
        challenge: "The market lacked geometric character design; the challenge was to combine mathematical precision with emotional storytelling.",
        approach: "We developed a unique artistic style using triangular shapes as the foundational element for every character. This design was brought to life with a fully functional UI and a secure smart contract system on Ethereum, complete with MetaMask integration for collectors.",
        result: "A visually captivating and secure NFT experience that offers collectors a distinct and emotive art style.",
        testimonial: {
            text: "The geometric art concept was brought to life beautifully. The smart contract deployment was secure, efficient, and ready for launch.",
            author: "Jordan Lee",
            position: "Project Lead, Mad Angles"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_107.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_25.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_24.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_23.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_26.png"
        ]
    }
];
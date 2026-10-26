import { BlogPost } from "@/lib/blogApi";
import { cdn } from "@/lib/cdn";

export const STATIC_BLOG_DATA: BlogPost[] = [
    {
        _id: "how-to-build-and-launch-a-dapp-from-scratch",
        slug: "how-to-build-and-launch-a-dapp-from-scratch",
        title: "How to build & launch a DAPP from Scratch?",
        content: "<p>Ever wondered how cryptocurrency...</p>",
        featuredImage: cdn("old-data/spotmies_site_Latest_img1.webp"),
        category: "Blockchain",
        excerpt: "Ever wondered how cryptocurrency and its underlying blockchain technology work together seamlessly?",
        author: "Spotmies Team",
        updatedAt: "2023-04-16T00:00:00.000Z",
        createdAt: "2023-04-16T00:00:00.000Z",
        // Added Link
        externalLink: "https://www.linkedin.com/pulse/how-build-launch-dapp-from-scratch-spotmies/?trackingId=HTPLizTDSo%2BVzLDlUacobQ%3D%3D"
    },
    {
        _id: "implementation-of-cryptography-in-blockchain",
        slug: "implementation-of-cryptography-in-blockchain",
        title: "Implementation of cryptography in Blockchain",
        content: "<p>Imagine that data is like a puzzle...</p>",
        featuredImage: cdn("old-data/spotmies_site_Latest_img2.webp"),
        category: "Security",
        excerpt: "Imagine that data is like a puzzle. Each piece of data is like one small piece of the puzzle.",
        author: "Spotmies Team",
        updatedAt: "2023-01-13T00:00:00.000Z",
        createdAt: "2023-01-13T00:00:00.000Z",
        // Added Link
        externalLink: "https://www.linkedin.com/pulse/implementation-cryptography-blockchain-spotmies/?trackingId=9KOezgthoHknBzYblozLfQ%3D%3D"
    },
    {
        _id: "why-data-privacy-is-more-crucial-nowadays",
        slug: "why-data-privacy-is-more-crucial-nowadays",
        title: "Why data privacy 🔒 is more crucial now a day's.",
        content: "<p>It is important to protect your privacy...</p>",
        featuredImage: cdn("old-data/spotmies_site_Latest_img3.webp"),
        category: "Privacy",
        excerpt: "It is important to protect your privacy because it can help keep you safe from identity theft, fraud, and other crimes.",
        author: "Spotmies Team",
        updatedAt: "2023-02-15T00:00:00.000Z",
        createdAt: "2023-02-15T00:00:00.000Z",
        // Added Link
        externalLink: "https://www.linkedin.com/posts/spotmies_data-privacy-activity-7018892815887716353-HbTi?utm_source=share&utm_medium=member_desktop"
    }
];
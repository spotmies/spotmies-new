import { cdn } from "@/lib/cdn";

// How a logo is turned light-on-dark for the black logo walls:
// - mono (default): flattened to pure white. Clean for plain wordmarks, but fills in any emblem with detail inside it.
// - negative: greyscale and inverted, so dark ink turns light while the detail inside an emblem survives
//   (solid circles with a mark in them, coins, badges, illustrated marks).
// - light: already drawn light for dark backgrounds; only greyed, so inverting doesn't turn it dark.
export type LogoTone = "mono" | "negative" | "light";

export const LOGO_TONE_CLASS: Record<LogoTone, string> = {
    mono: "brightness-0 invert",
    // Written as one filter so the steps run in this order (Tailwind's own utilities apply contrast before invert)
    negative: "[filter:grayscale(1)_invert(1)_contrast(1.25)_brightness(1.1)]",
    light: "grayscale brightness-125",
};

export function logoToneClass(company: { tone?: LogoTone }) {
    return LOGO_TONE_CLASS[company.tone ?? "mono"];
}

// The same treatments as plain CSS filter values, for logos styled inline (the hero marquee)
export const LOGO_TONE_FILTER: Record<LogoTone, string> = {
    mono: "brightness(0) invert(1)",
    negative: "grayscale(1) invert(1) contrast(1.25) brightness(1.1)",
    light: "grayscale(1) brightness(1.25)",
};

// Client logos shown on the home page grid and the expertise landing pages.
// The first 15 fill the home grid on load (OpenPlan AI sits 8th, the centre cell); the rest rotate in.
export const ALL_COMPANIES: { name: string; desc: string; src: string; tone?: LogoTone }[] = [
    { name: "Zin in Thuiswerken", desc: "Professional Services", src: cdn("media/comp1.webp"), tone: "negative" },
    { name: "A Square GoKarting", desc: "Entertainment", src: cdn("media/comp2.webp"), tone: "negative" },
    { name: "SMARTFALCON", desc: "Blockchain", src: cdn("media/comp3.webp") },
    { name: "Credit Report", desc: "Fintech", src: cdn("media/comp4.webp"), tone: "negative" },
    { name: "Andhra University Incubation Center", desc: "Incubation Center", src: cdn("media/comp5.webp"), tone: "negative" },
    { name: "Schemax Tech", desc: "Software Development", src: cdn("media/comp6.webp") },
    { name: "Sweken IT Solutions", desc: "Software Development", src: cdn("media/comp7.webp") },
    { name: "OpenPlan AI", desc: "Hardware", src: "/logos/openplan-ai.svg" },
    { name: "Vihaan Electrix", desc: "Travel", src: cdn("media/comp8.webp"), tone: "negative" },
    { name: "DecenTrialz", desc: "Healthcare", src: cdn("media/comp9.webp") },
    { name: "ADVAIT LABS", desc: "Healthcare", src: cdn("media/comp10.webp") },
    { name: "Chalo Ride", desc: "Travel", src: cdn("media/comp11.webp") },
    { name: "Mr Bikes", desc: "Travel", src: cdn("media/comp12.webp"), tone: "negative" },
    { name: "IOX Academy", desc: "Edtech", src: cdn("media/comp13.webp") },
    { name: "ID No Drafts", desc: "Travel", src: cdn("media/comp14.webp") },
    { name: "CGRUM", desc: "Fintech", src: cdn("media/comp15.webp") },
    { name: "Nandikrushi", desc: "AgriTech", src: cdn("media/comp16.webp"), tone: "negative" },
    { name: "HRDInc", desc: "HRTech", src: cdn("media/comp17.webp"), tone: "negative" },
    { name: "ADVON", desc: "Fintech", src: cdn("media/comp18.webp"), tone: "negative" },
    { name: "INDIESKULL-SYNDICATE", desc: "NFTs", src: cdn("media/comp19.webp"), tone: "light" },
    { name: "My Body Qode", desc: "Healthcare", src: cdn("media/comp20.webp") },
    { name: "SafeGuard air", desc: "Healthcare", src: cdn("media/comp21.webp") },
    { name: "Orfus", desc: "HRTech", src: cdn("media/comp22.webp") },
    { name: "Vitals", desc: "Healthcare", src: cdn("media/comp23.webp"), tone: "negative" },
    { name: "VarunMotors", desc: "Travel", src: cdn("media/comp24.webp") },
    { name: "Reaidy", desc: "HRTech", src: "https://www.reaidy.io/assets/logo_dark-DMRlJ8_-.png" },
    { "name": "Awaken", "desc": "Fintech", "src": cdn("media/awaken0.webp"), "tone": "negative" },
    { "name": "Amero X", "desc": "Blockchain & Fintech", "src": cdn("media/amero0.webp"), "tone": "negative" },
    { "name": "BoomBoomTalk", "desc": "Social", "src": cdn("media/boomboomtalk0.webp"), "tone": "negative" },
    { "name": "Commuter", "desc": "Travel", "src": cdn("media/commuter0.webp") },
    { "name": "EduMoon", "desc": "EdTech", "src": cdn("media/edumoon0.webp"), "tone": "light" },
    { "name": "Farm Vaidya", "desc": "AgriTech", "src": cdn("media/farmvidya0.webp") },
    { "name": "Mobile Masala", "desc": "Entertainment", "src": cdn("media/mobile-masala0.webp") },
    { "name": "OROLEXA", "desc": "Healthcare", "src": cdn("media/orelexa0.webp"), "tone": "light" },
    { "name": "TheReachX", "desc": "Marketing", "src": cdn("media/reachx0.webp") },
    { "name": "Referral Bazaar", "desc": "Retail", "src": cdn("media/referalbazaar0.webp") },
    { "name": "Stoory", "desc": "Marketing", "src": cdn("media/stoory0.webp") },
    { "name": "Teckybot", "desc": "EdTech", "src": cdn("media/teckybot0.webp"), "tone": "light" },
    { "name": "WingDent", "desc": "Healthcare", "src": cdn("media/wingdent0.webp"), "tone": "negative" }
];

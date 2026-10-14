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
    { name: "Zin in Thuiswerken", desc: "Professional Services", src: "https://spotmiesstorage.blob.core.windows.net/media/comp1.png", tone: "negative" },
    { name: "A Square GoKarting", desc: "Entertainment", src: "https://spotmiesstorage.blob.core.windows.net/media/comp2.png", tone: "negative" },
    { name: "SMARTFALCON", desc: "Blockchain", src: "https://spotmiesstorage.blob.core.windows.net/media/comp3.png" },
    { name: "Credit Report", desc: "Fintech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp4.png", tone: "negative" },
    { name: "Andhra University Incubation Center", desc: "Incubation Center", src: "https://spotmiesstorage.blob.core.windows.net/media/comp5.png", tone: "negative" },
    { name: "Schemax Tech", desc: "Software Development", src: "https://spotmiesstorage.blob.core.windows.net/media/comp6.png" },
    { name: "Sweken IT Solutions", desc: "Software Development", src: "https://spotmiesstorage.blob.core.windows.net/media/comp7.png" },
    { name: "OpenPlan AI", desc: "Hardware", src: "/logos/openplan-ai.svg" },
    { name: "Vihaan Electrix", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp8.png", tone: "negative" },
    { name: "DecenTrialz", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp9.png" },
    { name: "ADVAIT LABS", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp10.png" },
    { name: "Chalo Ride", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp11.png" },
    { name: "Mr Bikes", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp12.png", tone: "negative" },
    { name: "IOX Academy", desc: "Edtech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp13.png" },
    { name: "ID No Drafts", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp14.png" },
    { name: "CGRUM", desc: "Fintech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp15.png" },
    { name: "Nandikrushi", desc: "AgriTech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp16.png", tone: "negative" },
    { name: "HRDInc", desc: "HRTech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp17.png", tone: "negative" },
    { name: "ADVON", desc: "Fintech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp18.png", tone: "negative" },
    { name: "INDIESKULL-SYNDICATE", desc: "NFTs", src: "https://spotmiesstorage.blob.core.windows.net/media/comp19.png", tone: "light" },
    { name: "My Body Qode", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp20.png" },
    { name: "SafeGuard air", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp21.png" },
    { name: "Orfus", desc: "HRTech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp22.png" },
    { name: "Vitals", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp23.png", tone: "negative" },
    { name: "VarunMotors", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp24.png" },
    { name: "Reaidy", desc: "HRTech", src: "https://www.reaidy.io/assets/logo_dark-DMRlJ8_-.png" },
    { "name": "Awaken", "desc": "Fintech", "src": "https://spotmiesstorage.blob.core.windows.net/media/awaken0.png", "tone": "negative" },
    { "name": "Amero X", "desc": "Blockchain & Fintech", "src": "https://spotmiesstorage.blob.core.windows.net/media/amero0.png", "tone": "negative" },
    { "name": "BoomBoomTalk", "desc": "Social", "src": "https://spotmiesstorage.blob.core.windows.net/media/boomboomtalk0.png", "tone": "negative" },
    { "name": "Commuter", "desc": "Travel", "src": "https://spotmiesstorage.blob.core.windows.net/media/commuter0.png" },
    { "name": "EduMoon", "desc": "EdTech", "src": "https://spotmiesstorage.blob.core.windows.net/media/edumoon0.png", "tone": "light" },
    { "name": "Farm Vaidya", "desc": "AgriTech", "src": "https://spotmiesstorage.blob.core.windows.net/media/farmvidya0.png" },
    { "name": "Mobile Masala", "desc": "Entertainment", "src": "https://spotmiesstorage.blob.core.windows.net/media/mobile-masala0.png" },
    { "name": "OROLEXA", "desc": "Healthcare", "src": "https://spotmiesstorage.blob.core.windows.net/media/orelexa0.png", "tone": "light" },
    { "name": "TheReachX", "desc": "Marketing", "src": "https://spotmiesstorage.blob.core.windows.net/media/reachx0.png" },
    { "name": "Referral Bazaar", "desc": "Retail", "src": "https://spotmiesstorage.blob.core.windows.net/media/referalbazaar0.png" },
    { "name": "Stoory", "desc": "Marketing", "src": "https://spotmiesstorage.blob.core.windows.net/media/stoory0.png" },
    { "name": "Teckybot", "desc": "EdTech", "src": "https://spotmiesstorage.blob.core.windows.net/media/teckybot0.png", "tone": "light" },
    { "name": "WingDent", "desc": "Healthcare", "src": "https://spotmiesstorage.blob.core.windows.net/media/wingdent0.png", "tone": "negative" }
];

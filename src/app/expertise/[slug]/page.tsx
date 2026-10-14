import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { FaqSection } from "@/components/landing/faq-section";
import { TestimonialsSplit } from "@/components/ui/split-testimonial";
import { TESTIMONIALS } from "@/data/testimonials";
import { GlowDivider } from "@/components/ui/glow-divider";
import { ExpertiseHero } from "@/components/expertise/hero";
import { StatsStrip } from "@/components/expertise/stats-strip";
import { OutcomesSection } from "@/components/expertise/outcomes";
import { ProcessSection } from "@/components/expertise/process";
import { OwnProductsSection } from "@/components/expertise/own-products";
import { ClientWorkSection } from "@/components/expertise/client-work";
import { LogoStrip } from "@/components/expertise/logo-strip";
import { OtherServicesSection } from "@/components/expertise/services";
import { WhySection } from "@/components/expertise/why";
import { TeamSection } from "@/components/expertise/team";
import { StartSection } from "@/components/expertise/start";
import { FloatingCta } from "@/components/expertise/floating-cta";
import { EXPERTISE_PAGES } from "@/data/expertise";

type Params = Promise<{ slug: string }>;

// Only slugs with content are built; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(EXPERTISE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const page = EXPERTISE_PAGES[slug];
    if (!page) return {};
    return {
        title: page.seo.title,
        description: page.seo.description,
        openGraph: { title: page.seo.title, description: page.seo.description },
    };
}

export default async function ExpertisePage({ params }: { params: Params }) {
    const { slug } = await params;
    const page = EXPERTISE_PAGES[slug];
    if (!page) notFound();

    const testimonials = page.voices.names.map((name) => {
        const t = TESTIMONIALS.find((item) => item.name === name);
        if (!t) throw new Error(`Expertise page "${slug}" references unknown testimonial "${name}"`);
        return t;
    });

    return (
        <main className="bg-[#050505] min-h-screen w-full text-white selection:bg-brand-cyan/30">
            <Navbar />
            <ExpertiseHero page={page} />
            <StatsStrip />
            <OutcomesSection page={page} />
            <ProcessSection page={page} />
            {/* Sections with nothing to show yet are left out rather than rendered empty */}
            {page.ownProducts.items.length > 0 && <OwnProductsSection page={page} />}
            {page.clientWork.items.length > 0 && <ClientWorkSection page={page} />}
            <LogoStrip />
            <WhySection page={page} />
            {testimonials.length > 0 && <TestimonialsSplit items={testimonials} title={page.voices.title} />}
            <TeamSection page={page} />
            <OtherServicesSection currentSlug={page.slug} />
            <FaqSection
                faqs={page.faq.items}
                eyebrow="FAQ"
                title={page.faq.title.lead}
                titleMuted={page.faq.title.muted}
                intro={page.faq.intro}
                ctaLabel={page.ctaLabel}
                ctaTarget="start"
            />
            <StartSection page={page} />
            <GlowDivider />
            <Footer />
            <FloatingCta label={page.ctaLabel} />
        </main>
    );
}

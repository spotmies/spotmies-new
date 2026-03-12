"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { blogApi, BlogPost } from "@/lib/blogApi";
import { sanitizeContent } from "@/lib/contentSanitizer";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { GlowDivider } from "@/components/ui/glow-divider";
import { useRouter } from "next/navigation";
import BackButton from "@/components/ui/back-button";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = React.use(params);
    const slug = resolvedParams.slug;
    const router = useRouter();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const data = await blogApi.getBlogBySlug(slug);
            setBlog(data);
            setLoading(false);
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <main className="bg-[#050505] min-h-screen">
                <Navbar />
                <div className="h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00eef9]"></div>
                </div>
            </main>
        );
    }

    if (!blog) {
        return (
            <main className="bg-[#050505] min-h-screen flex flex-col items-center justify-center text-center px-4">
                <Navbar />
                <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
                <Link href="/blog" className="text-[#00eef9] hover:underline">Return to Blogs</Link>
            </main>
        );
    }

    const getImageSrc = () => {
        if (blog.featuredImage && blog.featuredImage !== '/favicon.ico') return blog.featuredImage;
        if (blog.image && blog.image !== '/favicon.ico') return blog.image;
        return null;
    };

    return (
        <main className="bg-[#050505] min-h-screen w-full selection:bg-cyan-500/30">
            <Navbar />

            <article className="relative pt-32 pb-20">
                <AmbientBackground intensity="subtle" />

                {/* --- BACK BUTTON --- */}
                <div className="max-w-4xl mx-auto px-6 mb-8 relative z-10">
                    <BackButton label="Back to Articles" />
                </div>

                {/* --- HERO HEADER --- */}
                <div className="max-w-4xl mx-auto px-6 mb-12 relative z-10">
                    <div className="flex flex-wrap gap-4 items-center text-sm text-[#00eef9] font-medium mb-6">
                        <span className="bg-[#00eef9]/10 border border-[#00eef9]/20 px-3 py-1 rounded-full">
                            {typeof blog.category === 'string' ? blog.category : blog.category?.name || 'Insight'}
                        </span>
                        <span className="flex items-center gap-1 text-neutral-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.updatedAt).toLocaleDateString()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-4 py-6 border-y border-white/10">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden border border-white/10">
                            {blog.author_image ? (
                                <img src={blog.author_image} alt="Author" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-6 h-6 text-neutral-400" />
                            )}
                        </div>
                        <div>
                            <p className="text-white font-medium">
                                {typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Spotmies Team'}
                            </p>
                            <p className="text-sm text-neutral-500">Technical Writer</p>
                        </div>
                    </div>
                </div>

                {/* --- FEATURED IMAGE --- */}
                {getImageSrc() && (
                    <div className="max-w-6xl mx-auto px-6 mb-16 relative z-10">
                        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={getImageSrc()!}
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* --- CONTENT --- */}
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <div
                        className="prose prose-invert prose-lg max-w-none rich-text-content
                        prose-headings:text-white prose-headings:font-bold
                        prose-p:text-neutral-300 prose-p:leading-loose
                        prose-a:text-[#00eef9] prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white
                        prose-li:text-neutral-300
                        prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
                    >
                        {blog.content && blog.content.includes('<') ? (
                            <div dangerouslySetInnerHTML={{ __html: sanitizeContent(blog.content) }} />
                        ) : (
                            <div className="whitespace-pre-wrap leading-relaxed">
                                {blog.content || blog.excerpt || 'No content available'}
                            </div>
                        )}
                    </div>
                </div>
            </article>

            <div className="max-w-7xl mx-auto px-6"><GlowDivider /></div>
            <Footer />
        </main>
    );
}
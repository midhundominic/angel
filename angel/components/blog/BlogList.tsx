"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogPosts, formatPostDate } from "@/data/blog";

/**
 * Card grid with category filtering. The posts themselves are server-rendered
 * on the page around this — this component only re-orders what is already in
 * the bundle, so nothing here is hidden from a crawler.
 */
export function BlogList() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    [],
  );

  const visible =
    active === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === active);

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => {
          const isActive = category === active;
          const count =
            category === "All"
              ? blogPosts.length
              : blogPosts.filter((post) => post.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-2 ${
                isActive
                  ? "border-[#193f47] bg-[#193f47] text-white shadow-[0_10px_26px_rgba(25,63,71,0.18)]"
                  : "border-[#d9e3df] bg-white/70 text-[#4e6367] hover:border-[#cdbb98] hover:bg-white"
              }`}
            >
              {category}
              <span
                className={`text-[0.7rem] tabular-nums ${
                  isActive ? "text-[#dec38b]" : "text-[#9aa8a7]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post, index) => (
            <motion.article
              key={post.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.42,
                delay: reduceMotion ? 0 : (index % 3) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#dfe6e3] bg-white shadow-[0_14px_45px_rgba(23,58,66,0.045)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-[#cdbb98] hover:shadow-[0_24px_60px_rgba(23,58,66,0.1)]"
            >
              <Link href={`/blogs/${post.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e7edea]">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
                      post.cover.portrait ? "object-[center_55%]" : ""
                    }`}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#0f2b31]/80 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#e6d0a3] backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-[0.72rem] text-[#93a1a1]">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {post.readingMinutes} min read
                    </span>
                  </div>

                  <h2 className="display-font mt-4 text-[1.42rem] leading-[1.2] tracking-[-0.02em] text-[#19373e] transition-colors group-hover:text-[#8b6b3c]">
                    {post.title}
                  </h2>
                  <p className="mt-3.5 flex-1 text-[0.9rem] leading-7 text-[#69787a]">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6b3c]">
                    Read the article
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

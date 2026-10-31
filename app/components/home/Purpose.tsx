"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowDown,
  Check,
  Eye,
  HeartHandshake,
  HeartPulse,
  Rocket,
  Store,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Tone = "yellow" | "green";

type Item = {
  id: string;
  title: string;
  text: string;
  pillars: string[];
  src: string;
  alt: string;
  tone: Tone;
  chipText: string;
  icon: ReactNode;
  chipIcon: ReactNode;
};

const ITEMS: Item[] = [
  {
    id: "vision",
    title: "Our Vision",
    text: "To bring quality healthcare within reach of every family, at a price everyone can afford.",
    pillars: ["Quality healthcare", "Every family", "Fairly priced"],
    src: "/images/our_vision.jpg",
    alt: "Our Vision: quality healthcare within reach of every family",
    tone: "yellow",
    chipText: "Care for everyone",
    icon: <Eye aria-hidden="true" size={22} strokeWidth={2} />,
    chipIcon: <HeartPulse aria-hidden="true" className="text-brand-green" size={14} strokeWidth={2.5} />,
  },
  {
    id: "mission",
    title: "Our Mission",
    text: "Grow a family of 25,000+ QnQians who support one another, lead with purpose, and succeed together.",
    pillars: ["Support one another", "Lead with purpose", "Succeed together"],
    src: "/images/our_mission.jpg",
    alt: "Our Mission: a connected community of QnQians growing together",
    tone: "green",
    chipText: "A healthier future",
    icon: <Rocket aria-hidden="true" size={22} strokeWidth={2} />,
    chipIcon: <Rocket aria-hidden="true" className="text-brand-green" size={14} strokeWidth={2.5} />,
  },
];

const TONES: Record<Tone, { badge: string; plate: string; bar: string; chip: string }> = {
  yellow: {
    badge: "bg-[#ffd51d] text-brand-blue",
    plate: "bg-[#ffd51d]/60",
    bar: "bg-[#ffd51d]",
    chip: "border-[#ffd51d]",
  },
  green: {
    badge: "bg-brand-green text-white",
    plate: "bg-brand-green/25",
    bar: "bg-brand-green",
    chip: "border-brand-green",
  },
};

const STATS: { icon: LucideIcon; to: number; suffix: string; separator?: boolean; label: string }[] = [
  { icon: Store, to: 7000, suffix: "+", separator: true, label: "Stores by 2035" },
  { icon: HeartHandshake, to: 100, suffix: "M+", label: "Lives impacted" },
  { icon: Users, to: 25000, suffix: "+", separator: true, label: "QnQians in our growing family" },
];

const HEADING_WORDS = ["Vision", "&", "Mission"];

const itemV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Count-up                                                            */
/* ------------------------------------------------------------------ */

function CountUp({ to, suffix = "", separator = false }: { to: number; suffix?: string; separator?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion() ?? false;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {separator ? value.toLocaleString("en-US") : value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Vision / Mission card                                               */
/* ------------------------------------------------------------------ */

function PurposeCard({ item, index }: { item: Item; index: number }) {
  const reduce = useReducedMotion() ?? false;
  const tone = TONES[item.tone];

  const cardV: Variants = {
    hidden: { opacity: 0, x: 44 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: index * 0.15,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };
  const barV: Variants = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: 0.9, ease: EASE } },
  };
  const frameV: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0 round 16px)" },
    show: { clipPath: "inset(0 0% 0 0 round 16px)", transition: { duration: 1, ease: EASE } },
  };
  const photoV: Variants = {
    hidden: { scale: 1.25 },
    show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
  };
  const plateV: Variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    show: { opacity: 1, x: 7, y: 7, transition: { duration: 1, delay: 0.2, ease: EASE } },
  };
  const chipV: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 6 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: 0.5, ease: EASE } },
  };
  const pillV: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.article
      className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-[#efe8d2] bg-white p-4 shadow-[0_18px_50px_rgba(11,60,110,0.08)] transition-shadow duration-500 hover:shadow-[0_26px_60px_rgba(11,60,110,0.14)] sm:flex-row sm:items-center sm:gap-7 sm:p-5"
      initial={reduce ? "show" : "hidden"}
      variants={cardV}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={reduce ? undefined : { y: -4 }}
      whileInView="show"
    >
      {/* Accent edge */}
      <motion.span
        aria-hidden="true"
        className={`absolute bottom-6 left-0 top-6 w-1 origin-top rounded-r-full ${tone.bar}`}
        variants={barV}
      />

      {/* Image (compact) */}
      <div className="relative w-full shrink-0 pb-3 sm:w-[210px] lg:w-[220px]">
        <div className="relative aspect-[16/9] sm:aspect-[4/3]">
          <motion.span
            aria-hidden="true"
            className={`absolute inset-0 rounded-2xl ${tone.plate}`}
            variants={plateV}
          />
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-2xl border-[3px] border-white bg-white"
            variants={frameV}
          >
            <motion.div className="absolute inset-0 origin-top" variants={photoV}>
              <div className="absolute inset-0 origin-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]">
                <Image
                  alt={item.alt}
                  className="object-cover object-top"
                  fill
                  sizes="(max-width: 639px) 100vw, 220px"
                  src={item.src}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-0 left-1/2 z-10 -translate-x-1/2"
          variants={chipV}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 ${tone.chip} bg-white px-3 py-1 text-xs font-bold text-brand-blue shadow-[0_10px_22px_rgba(11,60,110,0.16)]`}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
          >
            {item.chipIcon}
            {item.chipText}
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 sm:pr-2">
        <motion.div className="flex items-center gap-3" variants={itemV}>
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.badge}`}>
            {item.icon}
          </span>
          <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-brand-blue sm:text-[1.7rem]">
            {item.title}
          </h3>
        </motion.div>

        <motion.p className="mt-3 text-base leading-7 text-brand-copy" variants={itemV}>
          {item.text}
        </motion.p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.pillars.map((pillar) => (
            <motion.li
              className="flex items-center gap-1.5 rounded-full bg-brand-green/10 px-3 py-1.5 text-[13px] font-semibold text-brand-green"
              key={pillar}
              variants={pillV}
            >
              <Check aria-hidden="true" size={12} strokeWidth={3} />
              {pillar}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Connector between the two cards                                     */
/* ------------------------------------------------------------------ */

function Connector() {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      aria-hidden="true"
      className="flex flex-col items-center py-1"
      initial={reduce ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } } }}
      viewport={{ once: true, amount: 0.8 }}
      whileInView="show"
    >
      <motion.span
        className="h-5 w-px origin-top bg-gradient-to-b from-[#ffd51d] to-brand-green"
        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, ease: EASE } } }}
      />
      <motion.span
        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#efe8d2] bg-white text-brand-green shadow-sm"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
        }}
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 2.5, 0] }}
          className="flex"
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} strokeWidth={2.5} />
        </motion.span>
      </motion.span>
      <motion.span
        className="h-5 w-px origin-top bg-gradient-to-b from-brand-green to-brand-green/0"
        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, ease: EASE } } }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Yellow stats card                                                   */
/* ------------------------------------------------------------------ */

function StatsCard() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className="relative mt-8 overflow-hidden rounded-3xl bg-[#ffd51d] p-6 text-brand-blue shadow-[0_24px_60px_rgba(245,189,0,0.35)] sm:p-8"
      initial={reduce ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 36, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.9, ease: EASE, delay: 0.3, staggerChildren: 0.12, delayChildren: 0.4 },
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="show"
    >
      {/* decorative rings */}
      <motion.span
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border-[30px] border-white/25"
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full border-[22px] border-brand-green/15"
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      {!reduce && (
        <motion.span
          animate={{ x: ["-130%", "420%"] }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
        />
      )}

      <ul className="relative divide-y divide-brand-blue/15">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <motion.li
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              key={s.label}
              variants={itemV}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-brand-blue">
                <Icon aria-hidden="true" size={22} strokeWidth={2} />
              </span>
              <div>
                <p className="text-3xl font-extrabold leading-none tracking-[-0.03em] sm:text-4xl">
                  <CountUp separator={s.separator} suffix={s.suffix} to={s.to} />
                </p>
                <p className="mt-1.5 text-base font-semibold text-brand-blue/75">{s.label}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Purpose() {
  const reduce = useReducedMotion() ?? false;

  const headerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const wordV: Variants = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 1, ease: EASE } },
  };
  const lineV: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.35 } },
  };

  return (
    <section
      aria-labelledby="purpose-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fff8df_0%,#fffdf3_50%,#fff0dc_100%)] py-16 sm:py-20 lg:py-24"
      id="purpose"
    >
      {/* Soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.span
          animate={reduce ? undefined : { y: [0, -22, 0], x: [0, 12, 0] }}
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#ffe78d]/45 blur-3xl"
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          animate={reduce ? undefined : { y: [0, 24, 0], x: [0, -14, 0] }}
          className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="purpose-container site-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ------------------------------ Left ------------------------------ */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? "show" : "hidden"}
              variants={headerV}
              viewport={{ once: true, amount: 0.5 }}
              whileInView="show"
            >
              <motion.p
                className="inline-flex items-center gap-2.5 rounded-full border border-brand-green/20 bg-white/70 px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.28em] text-brand-green backdrop-blur"
                variants={itemV}
              >
                <span className="relative flex h-2 w-2">
                  {!reduce && (
                    <motion.span
                      animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                      className="absolute inline-flex h-full w-full rounded-full bg-brand-green"
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
                </span>
                Our Purpose
              </motion.p>

              <h2
                className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-brand-blue sm:text-5xl"
                id="purpose-title"
              >
                {HEADING_WORDS.map((word, i) => (
                  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom" key={word}>
                    <motion.span
                      className={`inline-block ${i === 1 ? "mx-[0.18em] text-brand-green" : ""}`}
                      variants={wordV}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>

              <motion.span
                aria-hidden="true"
                className="mt-3 block h-1 w-24 origin-left rounded-full bg-gradient-to-r from-[#ffd51d] via-brand-green to-[#ffd51d]"
                variants={lineV}
              />

              <motion.p className="mt-4 max-w-sm text-[17px] leading-8 text-brand-copy" variants={itemV}>
                Where we are headed, and how we get there together.
              </motion.p>
            </motion.div>

            <StatsCard />
          </div>

          {/* ------------------------------ Right ------------------------------ */}
          <div className="flex flex-col lg:col-span-7">
            <PurposeCard index={0} item={ITEMS[0]} />
            <Connector />
            <PurposeCard index={1} item={ITEMS[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Droplet,
  Heart,
  HeartPulse,
  Network,
  Pill,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DURATION = 6; // seconds each value stays open

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Tone = "yellow" | "blue" | "green";

type Value = {
  title: string;
  text: string;
  tags: string[];
  icon: LucideIcon;
  tone: Tone;
};

const VALUES: Value[] = [
  {
    title: "Social Responsibility",
    text: "We give back to the communities we serve, making healthcare a shared promise.",
    tags: ["Community giving", "Shared promise"],
    icon: HeartPulse,
    tone: "yellow",
  },
  {
    title: "Life Touch Services",
    text: "Every interaction is personal, caring and built around the people we help.",
    tags: ["Personal care", "People first"],
    icon: Heart,
    tone: "blue",
  },
  {
    title: "Quality Assured Medicines",
    text: "Genuine, verified medicines sourced and stored to the highest standards.",
    tags: ["Genuine", "Verified", "Stored right"],
    icon: Pill,
    tone: "green",
  },
  {
    title: "Employee & Customer Centric",
    text: "Our teams and our customers grow together, and both come first.",
    tags: ["Teams grow", "Customers first"],
    icon: UsersRound,
    tone: "yellow",
  },
  {
    title: "Transparent Business",
    text: "Clear pricing and honest practices, with nothing hidden at any step.",
    tags: ["Clear pricing", "Honest practice"],
    icon: Droplet,
    tone: "blue",
  },
  {
    title: "Innovation & Technology",
    text: "Smart tools and fresh ideas that make quality care faster and simpler.",
    tags: ["Smart tools", "Faster care", "Simpler"],
    icon: Network,
    tone: "green",
  },
];

const TONES: Record<
  Tone,
  {
    bg: string;
    text: string;
    sub: string;
    tile: string;
    chip: string;
    track: string;
    fill: string;
    btn: string;
    ghost: string;
  }
> = {
  yellow: {
    bg: "bg-[#ffd51d]",
    text: "text-brand-blue",
    sub: "text-brand-blue/80",
    tile: "bg-white/70 text-brand-blue",
    chip: "bg-brand-blue/10 text-brand-blue",
    track: "bg-brand-blue/15",
    fill: "bg-brand-blue",
    btn: "border-brand-blue/30 text-brand-blue hover:bg-brand-blue hover:text-white",
    ghost: "text-brand-blue/[0.08]",
  },
  blue: {
    bg: "bg-brand-blue",
    text: "text-white",
    sub: "text-white/80",
    tile: "bg-white/15 text-[#ffd51d]",
    chip: "bg-white/15 text-white",
    track: "bg-white/20",
    fill: "bg-[#ffd51d]",
    btn: "border-white/30 text-white hover:bg-white hover:text-brand-blue",
    ghost: "text-white/[0.08]",
  },
  green: {
    bg: "bg-brand-green",
    text: "text-white",
    sub: "text-white/85",
    tile: "bg-white/20 text-white",
    chip: "bg-white/20 text-white",
    track: "bg-white/25",
    fill: "bg-[#ffd51d]",
    btn: "border-white/35 text-white hover:bg-white hover:text-brand-green",
    ghost: "text-white/[0.1]",
  },
};

const TONE_LIST: Tone[] = ["yellow", "blue", "green"];
const HEADING_WORDS = "Core Values that Define QnQ".split(" ");
const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

const fadeUpV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const headerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const wordV: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

const lineV: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.35 } },
};

const explorerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const trayV: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, when: "beforeChildren", staggerChildren: 0.07 },
  },
};

const tabV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

const stageV: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: EASE } },
};

// Content swapped inside the stage when the active value changes
const contentV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.09, delayChildren: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const riseV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const tileV: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 220, damping: 16 } },
};

const ghostV: Variants = {
  hidden: { opacity: 0, rotate: -18, scale: 0.85 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 1.2, ease: EASE } },
};

const chipsV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const chipV: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Dna() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = VALUES.length;
  const current = VALUES[active];
  const tone = TONES[current.tone];
  const Icon = current.icon;

  const inView = useInView(explorerRef, { amount: 0.4 });
  const playing = inView && !paused && !reduce;

  // Autoplay progress (pauses on hover / focus, only runs while on screen)
  const progress = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (!playing) return;
    const next = progress.get() + Math.min(delta, 100) / (DURATION * 1000);
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % total);
    } else {
      progress.set(next);
    }
  });
  useEffect(() => {
    progress.set(0);
  }, [active, progress]);

  // Keep the active tab visible when the list scrolls sideways (mobile)
  useEffect(() => {
    const list = listRef.current;
    const el = tabRefs.current[active];
    if (!list || !el || list.scrollWidth <= list.clientWidth + 1) return;
    list.scrollTo({
      left: el.offsetLeft - (list.clientWidth - el.clientWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  const go = (i: number, focus = false) => {
    const n = (i + total) % total;
    setActive(n);
    if (focus) tabRefs.current[n]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1, true);
    }
  };

  // Background glows drift gently with scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowA = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const glowB = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Content animation props (skipped for reduced motion)
  const contentProps = reduce
    ? {}
    : { initial: "hidden", animate: "show", exit: "exit", variants: contentV };
  const child = (v: Variants) => (reduce ? undefined : v);

  return (
    <section
      aria-labelledby="dna-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(to_right,rgba(255,201,57,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,201,57,0.12)_1px,transparent_1px),linear-gradient(115deg,#fff8df_0%,#fffdf7_50%,#fff0dc_100%)] bg-[size:60px_60px,60px_60px,auto] py-16 sm:py-20 lg:py-24"
      id="dna"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-[#ffd84d]/35 blur-3xl"
        style={reduce ? undefined : { y: glowA }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
        style={reduce ? undefined : { y: glowB }}
      />

      <div className="dna-container site-container">
        {/* ------------------------------ Header ------------------------------ */}
        <motion.header
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          initial={reduce ? "show" : "hidden"}
          variants={headerV}
          viewport={{ once: true, amount: 0.6 }}
          whileInView="show"
        >
          <motion.p
            className="inline-flex items-center gap-2.5 rounded-full border border-brand-green/20 bg-white/70 px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.28em] text-brand-green backdrop-blur"
            variants={fadeUpV}
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
            Our DNA
          </motion.p>

          <h2
            className="mt-5 flex flex-wrap justify-center gap-x-[0.28em] text-4xl font-extrabold tracking-[-0.045em] text-brand-blue sm:text-5xl"
            id="dna-title"
          >
            {HEADING_WORDS.map((word, i) => (
              <span className="inline-block overflow-hidden pb-[0.12em]" key={i}>
                <motion.span className="inline-block" variants={wordV}>
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.span
            aria-hidden="true"
            className="mt-4 block h-1 w-24 origin-center rounded-full bg-gradient-to-r from-[#ffd51d] via-brand-green to-[#ffd51d]"
            variants={lineV}
          />

          <motion.p className="mt-5 max-w-xl text-[17px] leading-8 text-brand-copy sm:text-lg" variants={fadeUpV}>
            Six principles that guide every store, every service and every decision.
          </motion.p>
        </motion.header>

        {/* ------------------------------ Explorer ------------------------------ */}
        <motion.div
          className="mt-12 grid min-w-0 grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6"
          initial={reduce ? "show" : "hidden"}
          onBlur={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          ref={explorerRef}
          variants={explorerV}
          viewport={{ once: true, amount: 0.25 }}
          whileInView="show"
        >
          {/* ---------- Value list (segmented control) ---------- */}
          <motion.div
            className="w-full min-w-0 rounded-[28px] border border-[#f1e2a6] bg-[#fff3bf]/60 p-2 backdrop-blur lg:h-[500px] lg:p-2.5"
            variants={trayV}
          >
            <div
              aria-orientation="vertical"
              className="relative flex w-full min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] lg:h-full lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden"
              onKeyDown={onKeyDown}
              ref={listRef}
              role="tablist"
            >
              {VALUES.map((value, i) => {
                const TabIcon = value.icon;
                const isActive = i === active;
                return (
                  <motion.button
                    aria-controls="dna-panel"
                    aria-selected={isActive}
                    className="relative flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-blue lg:flex-1"
                    id={`dna-tab-${i}`}
                    key={value.title}
                    onClick={() => go(i)}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                    variants={tabV}
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl bg-white shadow-[0_12px_30px_rgba(11,60,110,0.12)] ring-1 ring-[#ffd51d]"
                        layoutId="dna-pill"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive ? "bg-[#ffd51d] text-brand-blue" : "bg-white/70 text-brand-blue/60"
                      }`}
                    >
                      <TabIcon aria-hidden="true" size={22} strokeWidth={2} />
                    </span>
                    <span
                      className={`relative z-10 whitespace-nowrap text-[15px] font-bold transition-colors duration-300 sm:text-base lg:whitespace-normal ${
                        isActive ? "text-brand-blue" : "text-brand-blue/65"
                      }`}
                    >
                      {value.title}
                    </span>
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                      className="relative z-10 ml-auto hidden text-brand-green lg:block"
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronRight aria-hidden="true" size={20} strokeWidth={2.5} />
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ---------- Showcase panel ---------- */}
          <motion.div
            aria-labelledby={`dna-tab-${active}`}
            className="relative h-[430px] w-full min-w-0 overflow-hidden rounded-[32px] shadow-[0_30px_70px_rgba(11,60,110,0.2)] sm:h-[460px] lg:h-[500px]"
            id="dna-panel"
            role="tabpanel"
            variants={stageV}
          >
            {/* Colour layers crossfade between values */}
            {TONE_LIST.map((t) => (
              <motion.span
                animate={{ opacity: current.tone === t ? 1 : 0 }}
                aria-hidden="true"
                className={`absolute inset-0 ${TONES[t].bg}`}
                initial={false}
                key={t}
                transition={{ duration: reduce ? 0 : 0.8, ease: "easeInOut" }}
              />
            ))}

            {/* Texture + drifting light */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:22px_22px]"
            />
            <motion.span
              animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
              aria-hidden="true"
              className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl"
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              animate={reduce ? undefined : { x: [0, -26, 0], y: [0, 22, 0] }}
              aria-hidden="true"
              className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Swapped content */}
            <AnimatePresence initial={false}>
              <motion.div
                className="absolute inset-0 flex flex-col justify-between p-7 pb-24 sm:p-10 sm:pb-28 lg:p-12 lg:pb-28"
                key={active}
                {...contentProps}
              >
                <motion.span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-16 -right-12 ${tone.ghost}`}
                  variants={child(ghostV)}
                >
                  <Icon size={340} strokeWidth={1} />
                </motion.span>

                <motion.span
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem] ${tone.tile}`}
                  variants={child(tileV)}
                >
                  <Icon aria-hidden="true" size={32} strokeWidth={2} />
                </motion.span>

                <div className="relative">
                  <motion.h3
                    className={`text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl ${tone.text}`}
                    variants={child(riseV)}
                  >
                    {current.title}
                  </motion.h3>
                  <motion.p
                    className={`mt-4 max-w-[42ch] text-[17px] leading-8 sm:text-lg ${tone.sub}`}
                    variants={child(riseV)}
                  >
                    {current.text}
                  </motion.p>
                  <motion.ul className="mt-5 flex flex-wrap gap-2" variants={child(chipsV)}>
                    {current.tags.map((tag) => (
                      <motion.li
                        className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold ${tone.chip}`}
                        key={tag}
                        variants={child(chipV)}
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / next */}
            <div className="absolute right-5 top-5 z-10 flex gap-2 sm:right-8 sm:top-8 lg:right-10 lg:top-10">
              <button
                aria-label="Previous value"
                className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tone.btn}`}
                onClick={() => go(active - 1)}
                type="button"
              >
                <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.4} />
              </button>
              <button
                aria-label="Next value"
                className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tone.btn}`}
                onClick={() => go(active + 1)}
                type="button"
              >
                <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
              </button>
            </div>

            {/* Counter + autoplay progress */}
            <div
              className={`absolute inset-x-7 bottom-7 z-10 flex items-center gap-4 text-xs font-extrabold tabular-nums transition-colors duration-500 sm:inset-x-10 sm:bottom-9 lg:inset-x-12 ${tone.text}`}
            >
              <span>{pad(active + 1)}</span>
              <span
                aria-hidden="true"
                className={`relative h-[3px] flex-1 overflow-hidden rounded-full transition-colors duration-500 ${tone.track}`}
              >
                <motion.span
                  className={`absolute inset-0 origin-left rounded-full transition-colors duration-500 ${tone.fill}`}
                  style={{ scaleX: progress }}
                />
              </span>
              <span className="opacity-70">{pad(total)}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Building2,
  Compass,
  Handshake,
  HeartPulse,
  MapPinned,
  Sprout,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";

type Milestone = {
  year: string;
  tag: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const MILESTONES: Milestone[] = [
  {
    year: "2019",
    tag: "Where it began",
    title: "One Small Store, One Big Belief",
    description:
      "A 200 sq. ft. pharmacy in Villupuram, Tamil Nadu opened with a simple promise: quality medicines should never be a financial burden. The community's trust told us the idea was ready to grow.",
    icon: Sprout,
  },
  {
    year: "2020",
    tag: "Resilience",
    title: "Standing Firm in a Crisis",
    description:
      "While the pandemic stopped the world, we kept affordable medicines flowing and added clinic support, so patients could find a doctor and their medicines under one roof.",
    icon: HeartPulse,
  },
  {
    year: "2021",
    tag: "Foundation",
    title: "Listening Before Growing",
    description:
      "We spent the year in the field with pharmacists, doctors and families, refining our service model so that growth, when it came, would be the right kind.",
    icon: Users,
  },
  {
    year: "2022",
    tag: "Franchise model",
    title: "A Mission Worth Sharing",
    description:
      "Our sociopreneur franchise model (FICO, FOFO and FOCO) invited local entrepreneurs across Tamil Nadu to build purposeful healthcare businesses alongside us.",
    icon: Handshake,
  },
  {
    year: "2023",
    tag: "Expansion",
    title: "Closer to Every Community",
    description:
      "More than 25 new outlets opened in Tier-2 and Tier-3 cities, proving the model works where it matters most: close to the people who need it.",
    icon: TrendingUp,
  },
  {
    year: "2024",
    tag: "New headquarters",
    title: "A New Chapter in Chennai",
    description:
      "Chennai became our corporate headquarters as we entered metro markets and grew to five healthcare verticals: Medicines, Diagnostics, Wellness, Opticals and Audiology.",
    icon: Building2,
  },
  {
    year: "2025",
    tag: "New markets",
    title: "Across State Lines",
    description:
      "Our fastest year yet: 60+ new outlets and a bold entry into Bengaluru and Karnataka, carrying affordable, quality care to even more communities in South India.",
    icon: MapPinned,
  },
  {
    year: "2026",
    tag: "The road ahead",
    title: "Growing, Responsibly",
    description:
      "As we scale, our focus stays on people: customer-centric innovation, thoughtful expansion, and healthcare that remains within reach of every community we enter. The best is still ahead.",
    icon: Compass,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Animation variants ---------- */

const cardVariants = (fromLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: fromLeft ? -48 : 48, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASE,
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
});

const childVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

/* ---------- Timeline row ---------- */

function TimelineRow({
  milestone,
  index,
  reduce,
}: {
  milestone: Milestone;
  index: number;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // becomes true once the row passes the middle of the screen
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });

  const isLeft = index % 2 === 0;
  const isLast = index === MILESTONES.length - 1;
  const Icon = milestone.icon;

  const nodeBg = isLast ? "#16202e" : "#ffd52a";
  const nodeIcon = isLast ? "#ffd52a" : "#16202e";

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 md:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] md:gap-x-0"
    >
      {/* Node on the line */}
      <div className="relative col-start-1 row-start-1 flex justify-center self-start pt-6 md:col-start-2 md:self-center md:pt-0">
        {/* Connector between the node and its card (desktop) */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: reached || reduce ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className={`absolute top-1/2 hidden h-[2px] w-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ffd52a] to-[#ffd52a]/40 md:block ${
            isLeft ? "left-0 origin-left" : "right-0 origin-right"
          }`}
        />

        {/* One-time ripple when the node is reached */}
        {reached && !reduce && (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="absolute h-11 w-11 rounded-full bg-[#ffd52a] md:top-1/2 md:-translate-y-1/2"
          />
        )}

        <motion.span
          initial={false}
          animate={{
            scale: reached || reduce ? 1 : 0.8,
            backgroundColor: reached || reduce ? nodeBg : "#ffffff",
            color: reached || reduce ? nodeIcon : "#c99a00",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#fffaf0] shadow-[0_6px_18px_rgba(255,170,0,0.35)] ring-1 ring-[#ffd52a]/60"
        >
          <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
        </motion.span>
      </div>

      {/* Card */}
      <motion.div
        variants={cardVariants(isLeft)}
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className={`col-start-2 row-start-1 w-full max-w-[480px] ${
          isLeft
            ? "md:col-start-1 md:justify-self-end md:pr-8"
            : "md:col-start-3 md:justify-self-start md:pl-8"
        }`}
      >
        {/* Inner wrapper handles hover so it never fights the entrance transform */}
        <div
          className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 sm:p-7 ${
            isLast
              ? "border-white/10 bg-[#16202e] text-white shadow-[0_28px_60px_rgba(22,32,46,0.35)] hover:border-[#ffd52a]/60 hover:shadow-[0_32px_70px_rgba(22,32,46,0.45)]"
              : "border-[#ffe3a0] bg-white/95 shadow-[0_18px_44px_rgba(74,66,42,0.10)] hover:border-[#ffd52a] hover:shadow-[0_26px_56px_rgba(255,201,57,0.28)]"
          }`}
        >
          {/* Accent bar that grows on hover */}
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-0 top-5 w-1 origin-center scale-y-50 rounded-r bg-gradient-to-b from-[#ffd52a] to-brand-green opacity-70 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
          />
          {/* Soft glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffd52a]/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Oversized year watermark */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-4 right-3 select-none text-[88px] font-black leading-none tracking-tighter transition-transform duration-700 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 ${
              isLast ? "text-white/[0.05]" : "text-[#ffd52a]/[0.16]"
            }`}
          >
            {milestone.year}
          </span>

          <motion.div
            variants={childVariants}
            className="relative flex flex-wrap items-center gap-2"
          >
            <span className="rounded-md bg-[#ffd52a] px-2.5 py-1 text-xs font-extrabold leading-none tracking-wide text-[#16202e]">
              {milestone.year}
            </span>
            <span
              className={`text-xs font-semibold ${
                isLast ? "text-white/60" : "text-brand-blue/55"
              }`}
            >
              {milestone.tag}
            </span>
          </motion.div>

          <motion.h3
            variants={childVariants}
            className={`relative mt-4 text-xl font-bold leading-snug tracking-[-0.02em] sm:text-[22px] ${
              isLast ? "text-white" : "text-brand-blue"
            }`}
          >
            {milestone.title}
          </motion.h3>

          <motion.span
            aria-hidden="true"
            variants={lineVariants}
            className="relative mt-3 block h-[3px] w-12 origin-left rounded-full bg-gradient-to-r from-[#ffd52a] to-brand-green"
          />

          <motion.p
            variants={childVariants}
            className={`relative mt-3 text-base leading-[1.7] ${
              isLast ? "text-white/75" : "text-[#4a5568]"
            }`}
          >
            {milestone.description}
          </motion.p>
        </div>
      </motion.div>
    </li>
  );
}

/* ---------- Glowing orb riding the line ---------- */

function Rider({ progress }: { progress: MotionValue<number> }) {
  const top = useTransform(progress, (v: number) => `${v * 100}%`);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-0 z-[5] h-0 w-0"
      style={{ top }}
    >
      <span className="absolute -left-3 -top-3 h-6 w-6 animate-ping rounded-full bg-brand-green/40" />
      <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#ffe45c] to-brand-green shadow-[0_0_22px_rgba(34,160,80,0.65)]" />
      <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white" />
    </motion.div>
  );
}

/* ---------- Section ---------- */

export default function Journey() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Line fill follows the scroll through the timeline
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 55%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
    restDelta: 0.0005,
  });
  const progress = reduce ? scrollYProgress : smooth;

  // Background glows drift at a different speed than the page
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowA = useTransform(sectionProgress, [0, 1], [-70, 90]);
  const glowB = useTransform(sectionProgress, [0, 1], [80, -90]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-labelledby="journey-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(to_right,rgba(255,201,57,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,201,57,0.10)_1px,transparent_1px),linear-gradient(115deg,#fff8df_0%,#fffdf7_50%,#fff0e4_100%)] bg-[size:60px_60px,60px_60px,auto] py-20 sm:py-24 lg:py-28"
    >
      {!reduce && (
        <>
          <motion.span
            aria-hidden="true"
            style={{ y: glowA }}
            className="pointer-events-none absolute -left-28 top-[18%] -z-10 h-80 w-80 rounded-full bg-[#ffd52a]/25 blur-3xl"
          />
          <motion.span
            aria-hidden="true"
            style={{ y: glowB }}
            className="pointer-events-none absolute -right-28 top-[55%] -z-10 h-96 w-96 rounded-full bg-brand-green/12 blur-3xl"
          />
        </>
      )}

      <div className="site-container">
        {/* Header */}
        <header className="max-w-2xl">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-green"
          >
            <span>Our Journey</span>
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="block h-px w-14 origin-left bg-brand-green/60"
            />
            <span className="text-brand-blue/50">2019 – 2026</span>
          </motion.div>

          <h2
            id="journey-title"
            className="mt-5 font-semibold leading-[1.02] tracking-[-0.05em] text-brand-blue"
            style={{ fontSize: "clamp(2.25rem, 5.4vw, 4rem)" }}
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
                Every Year.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block text-[#e8b100]"
                initial={reduce ? false : { y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: 0.12 }}
              >
                A Larger Purpose.
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="mt-5 max-w-xl text-[17px] leading-8 text-brand-copy"
          >
            A year-by-year record of how QnQ has brought affordable, quality
            healthcare closer to communities across South India.
          </motion.p>
        </header>

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-14 lg:mt-20">
          {/* Center line: faint track, then the glowing fill drawn by scroll */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[22px] w-[3px] -translate-x-1/2 md:left-1/2"
          >
            <span className="absolute inset-0 rounded-full bg-[#ffe3a0]/70" />
            <motion.span
              style={{ scaleY: progress }}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#ffd52a] via-[#ffd52a] to-brand-green shadow-[0_0_18px_rgba(255,201,57,0.65)]"
            />
            <Rider progress={progress} />
          </div>

          <ol className="relative flex flex-col gap-10 md:gap-14">
            {MILESTONES.map((milestone, index) => (
              <TimelineRow
                key={milestone.year}
                milestone={milestone}
                index={index}
                reduce={reduce}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
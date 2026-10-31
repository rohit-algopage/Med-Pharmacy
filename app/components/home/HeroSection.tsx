"use client";

import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Pill } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Easy-to-edit settings                                               */
/* ------------------------------------------------------------------ */

const HERO_IMAGE = "/images/hero_img.jpg";
const HERO_IMAGE_ALT = "QnQ healthcare team";

// Big number shown in the clear band above the photo (counts up on load)
const WATERMARK_NUMBER = 80;
const WATERMARK_SUFFIX = "+";

const PRIMARY_CTA = { label: "Explore Our Story", href: "#about" };
const SECONDARY_CTA = { label: "Talk to Us", href: "#contact" };
const CARD_LINK = "#medicines";

// Heading lines that get typed out
const HEADING_LINES = ["Better Health.", "Closer to Home.", "For Every Family."];
const TYPING_SPEED = 22; // milliseconds per character (lower = faster)
const TYPING_START_DELAY = 350; // ms before typing begins
const PAUSE_BETWEEN_LINES = 90; // ms

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const column: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Typing (heading only)                                               */
/* ------------------------------------------------------------------ */

/**
 * Types the heading lines one after another.
 * Returns the text typed so far for each line and the index of the line
 * currently being typed (-1 once finished).
 */
function useHeadingTyping(reduce: boolean | null) {
  const [typed, setTyped] = useState<string[]>(() =>
    HEADING_LINES.map((line) => (reduce ? line : "")),
  );
  const [active, setActive] = useState(reduce ? -1 : 0);

  useEffect(() => {
    if (reduce) {
      setTyped([...HEADING_LINES]);
      setActive(-1);
      return undefined;
    }

    setTyped(HEADING_LINES.map(() => ""));
    setActive(0);

    let timer: ReturnType<typeof setTimeout>;
    let lineIndex = 0;
    let chars = 0;

    const tick = () => {
      const index = lineIndex;
      const line = HEADING_LINES[index];
      chars += 1;
      const count = chars;

      setTyped((prev) =>
        prev.map((value, i) => (i === index ? line.slice(0, count) : value)),
      );

      if (count < line.length) {
        timer = setTimeout(tick, TYPING_SPEED * (0.75 + Math.random() * 0.5));
      } else if (index < HEADING_LINES.length - 1) {
        lineIndex = index + 1;
        chars = 0;
        setActive(lineIndex);
        timer = setTimeout(tick, PAUSE_BETWEEN_LINES);
      } else {
        setActive(-1);
      }
    };

    timer = setTimeout(tick, TYPING_START_DELAY);
    return () => clearTimeout(timer);
  }, [reduce]);

  return { typed, active };
}

function Caret() {
  return (
    <motion.span
      aria-hidden="true"
      className="ml-[0.06em] inline-block h-[0.85em] w-[0.07em] min-w-[2px] translate-y-[0.08em] bg-current"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function WatermarkNumber({ reduce }: { reduce: boolean | null }) {
  const [value, setValue] = useState(reduce ? WATERMARK_NUMBER : 0);

  useEffect(() => {
    if (reduce) {
      setValue(WATERMARK_NUMBER);
      return undefined;
    }
    const controls = animate(0, WATERMARK_NUMBER, {
      duration: 2.4,
      delay: 0.9,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce]);

  return (
    <>
      <span className="tabular-nums">{value}</span>
      {WATERMARK_SUFFIX}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { typed, active } = useHeadingTyping(reduce);

  // Gentle depth: photo drifts down slightly as you scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      // Desktop: fills the viewport below the 78px navbar, never taller than 780px.
      className="relative flex flex-col overflow-hidden bg-white lg:h-[calc(100svh-78px)] lg:max-h-[780px] lg:min-h-[560px]"
    >
      {/* ---------------- Yellow diagonal panel (desktop) ---------------- */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { x: "-6%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[62%] lg:block"
      >
        <div className="absolute inset-0 bg-white/50 [clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(115deg,#ffd52a_0%,#ffcb2b_60%,#ffc21f_100%)] bg-[size:60px_60px,60px_60px,auto] [clip-path:polygon(0_0,96%_0,82%_100%,0_100%)]" />
      </motion.div>

      {/* ---------------- Copy ---------------- */}
      <div className="relative z-[3] bg-[linear-gradient(115deg,#ffd52a_0%,#ffcb2b_100%)] lg:flex lg:flex-1 lg:items-center lg:bg-none">
        <div className="hero-inner site-container py-10 md:py-14 lg:py-8">
          <motion.div
            variants={column}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="hero-copy flex max-w-[600px] flex-col"
          >
            {/* Eyebrow */}
            <motion.div
              variants={rise}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue/75 sm:text-[13px]"
            >
              <motion.span
                aria-hidden="true"
                variants={drawLine}
                className="block h-[2px] w-9 origin-left bg-brand-blue/60"
              />
              Affordable. Authentic. Trusted.
            </motion.div>

            {/* Heading: typed line by line (only the typed text is rendered,
                each line keeps a minimum height so nothing jumps) */}
            <h1
              id="hero-title"
              aria-label="Better Health. Closer to Home. For Every Family."
              className="mt-5 uppercase leading-[1.04] tracking-[-0.03em] text-brand-blue lg:whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 4.1vw, 3.75rem)" }}
            >
              <span
                aria-hidden="true"
                className="block min-h-[1.12em] font-extrabold"
              >
                {typed[0]}
                {active === 0 ? <Caret /> : null}
              </span>
              <span
                aria-hidden="true"
                className="block min-h-[1.12em] font-extrabold"
              >
                {typed[1]}
                {active === 1 ? <Caret /> : null}
              </span>
              <span
                aria-hidden="true"
                className="block min-h-[1.12em] font-light"
              >
                {typed[2]}
                {active === 2 ? <Caret /> : null}
              </span>
            </h1>

            <motion.p
              variants={rise}
              className="mt-5 max-w-[460px] text-[17px] leading-[1.65] text-brand-blue/80 md:text-lg"
            >
              QnQ brings genuine medicines and caring pharmacy services to your
              neighbourhood at fair prices, so quality healthcare is never out
              of reach.
            </motion.p>

            <motion.div
              variants={rise}
              className="hero-actions mt-7 flex flex-wrap items-center gap-3"
            >
              <Link
                href={PRIMARY_CTA.href}
                className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-brand-blue px-7 text-base font-bold text-white shadow-[0_10px_24px_rgba(11,95,196,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(11,95,196,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-brand-green transition-transform duration-500 ease-out group-hover:translate-x-0"
                />
                <span className="relative">{PRIMARY_CTA.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={2.4}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={SECONDARY_CTA.href}
                className="group relative inline-flex h-12 items-center overflow-hidden rounded-full border-2 border-brand-blue/70 px-7 text-base font-bold text-brand-blue transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-brand-blue transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <span className="relative">{SECONDARY_CTA.label}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---------------- Photo + number + floating card ---------------- */}
      <div className="hero-art relative isolate z-[1] mx-auto aspect-[4/3] w-full bg-white sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
        {/* Photo: starts below a clear band so the number never covers faces */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="absolute inset-x-0 bottom-0 top-[18%] z-0 overflow-hidden lg:top-[20%]"
        >
          <motion.div
            className="absolute inset-0"
            style={reduce ? undefined : { y: photoY, scale: 1.1 }}
          >
            <Image
              src={HERO_IMAGE}
              alt={HERO_IMAGE_ALT}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-[60%_12%]"
            />
          </motion.div>
        </motion.div>

        {/* Large number: sits in the clear band, fully inside the frame */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] top-[1%] z-[1] select-none"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.7 }}
            className="m-0 origin-top-right font-black leading-[0.9] tracking-[-0.05em] text-[#ffd52a]"
            style={{ fontSize: "clamp(4rem, 8vw, 8.5rem)" }}
          >
            <WatermarkNumber reduce={reduce} />
          </motion.p>
        </motion.div>

        {/* Floating info card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.35 }}
          className="absolute bottom-4 right-4 z-[2] sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-[6%]"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="group relative w-[190px] rounded-2xl bg-white p-4 shadow-[0_24px_60px_rgba(22,32,46,0.22)] transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(255,201,57,0.4)] sm:w-[210px] sm:p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd52a] text-brand-blue transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Pill aria-hidden="true" size={22} strokeWidth={2.2} />
              </span>

              <p className="mt-3 text-base font-extrabold leading-tight text-brand-blue">
                Genuine Medicines
                <br />
                Fair Prices
              </p>
              <p className="mt-1 pr-8 text-base leading-snug text-brand-blue/75">
                Care Close to Every Home
              </p>

              <Link
                href={CARD_LINK}
                aria-label="Explore medicines"
                className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffd52a] text-brand-blue transition-all duration-300 hover:bg-brand-blue hover:text-[#ffd52a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue group-hover:rotate-45"
              >
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
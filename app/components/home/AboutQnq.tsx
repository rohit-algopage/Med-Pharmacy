"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  HeartHandshake,
  Store,
  MapPin,
  Building2,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

// Parent that staggers its children as it scrolls into view
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Heading lines rise out of a mask with a slight tilt
const maskUp: Variants = {
  hidden: { y: "110%", rotate: 3 },
  visible: { y: 0, rotate: 0, transition: { duration: 1, ease: EASE } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    subtitle: "Medicines",
  },
  {
    icon: Users,
    title: "Affordable Healthcare",
    subtitle: "for All",
  },
  {
    icon: HeartHandshake,
    title: "Strong Community",
    subtitle: "Impact",
  },
];

const statistics = [
  { icon: Store, value: "50+", label: "Pharmacies", sub: "Across Regions" },
  { icon: Users, value: "8000+", label: "Customers", sub: "Served" },
  { icon: MapPin, value: "500+", label: "Communities", sub: "Reached" },
  { icon: Building2, value: "5+", label: "Years of", sub: "Experience" },
];

/* ------------------------------------------------------------------ */
/* Count-up number (starts when it scrolls into view)                  */
/* ------------------------------------------------------------------ */

function CountUp({ value, reduce }: { value: string; reduce: boolean | null }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [current, setCurrent] = useState(reduce ? target : 0);

  useEffect(() => {
    if (reduce) {
      setCurrent(target);
      return undefined;
    }
    if (!inView) return undefined;

    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function AboutUsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FFFDF7] text-[#171717]"
    >
      {/* TOP INTRO + VISUAL */}
      <div className="about-content-container about-intro-grid site-container grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] lg:gap-10 lg:py-20">
        <AboutIntro reduce={reduce} />
        <AboutVisual reduce={reduce} />
      </div>

      {/* BOTTOM IMPACT SECTION */}
      <div className="relative bg-[#F7C928]">
        <div className="about-content-container site-container grid gap-5 py-6 sm:py-8 lg:grid-cols-[minmax(0,22fr)_minmax(0,58fr)_minmax(0,20fr)]">
          {/* Family photograph: curtain reveal, then slow zoom-out */}
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative min-h-[140px] lg:min-h-[190px]"
          >
            <motion.div
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)" },
                visible: {
                  clipPath: "inset(0 0% 0 0)",
                  transition: { duration: 1.2, ease: EASE },
                },
              }}
              className="absolute inset-0 overflow-hidden"
            >
              <motion.div
                variants={{
                  hidden: { scale: 1.25 },
                  visible: {
                    scale: 1,
                    transition: { duration: 1.8, ease: EASE },
                  },
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/about/healthcare-family.png"
                  alt="Family enjoying a healthier future"
                  fill
                  sizes="(min-width: 1024px) 22vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>

          <AboutStats reduce={reduce} />
          <AboutCommitment reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* INTRO COMPONENT                                                     */
/* ------------------------------------------------------------------ */

function AboutIntro({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      variants={stagger}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="about-copy relative z-10 flex flex-col justify-center"
    >
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.4em]">
          About Us
        </span>
        <motion.span
          variants={drawLine}
          className="h-[2px] w-14 origin-left bg-[#F7C928]"
        />
      </motion.div>

      <h2 className="max-w-xl text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-5xl xl:text-[56px]">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={maskUp} className="block origin-bottom-left">
            Healthcare
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={maskUp} className="block origin-bottom-left">
            That Puts
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.1em]">
          <motion.span
            variants={maskUp}
            className="block origin-bottom-left text-[#F2B900]"
          >
            People First.
          </motion.span>
        </span>
      </h2>

      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-[530px] text-base leading-7 text-[#626262] sm:text-[17px] sm:leading-8"
      >
        At QnQ Healthcare, we believe quality healthcare should be
        accessible to everyone. Our commitment is built around
        providing quality-assured generic medicines at affordable
        prices, while continuously improving the healthcare
        experience for the communities we serve.
      </motion.p>

      {/* Values */}
      <div className="about-values mt-6 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3 sm:gap-3">
        {values.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex min-w-0 items-center gap-2 sm:items-start"
            >
              <motion.div
                variants={popIn}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFEBA3] transition-colors duration-300 group-hover:bg-[#F7C928] sm:h-10 sm:w-10"
              >
                <Icon size={18} strokeWidth={1.8} />
              </motion.div>

              <div className="min-w-0 pt-1 text-[13px] font-semibold leading-5 sm:text-[15px] sm:leading-6">
                {item.title}
                <br />
                <span className="font-normal text-gray-600">
                  {item.subtitle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.a
        href="#journey"
        variants={fadeUp}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className="group mt-7 flex w-fit items-center gap-5 rounded-full bg-[#F7C928] px-7 py-3.5 text-base font-bold transition-all duration-300 hover:bg-black hover:text-white hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
      >
        Discover Our Story

        <ArrowRight
          size={21}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />
      </motion.a>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* VISUAL COMPONENT                                                    */
/* ------------------------------------------------------------------ */

function AboutVisual({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);

  // Photo drifts slightly inside its frame as you scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div
      ref={ref}
      className="relative min-h-[370px] overflow-hidden sm:min-h-[420px] lg:min-h-[500px]"
    >
      {/* Yellow decorative circle: spins in, then drifts */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -120 }}
        whileInView={{ opacity: 0.9, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute left-[-5%] top-[5%]"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          className="h-52 w-52 rounded-full border-[28px] border-[#F7C928]"
        />
      </motion.div>

      {/* Main pharmacist photograph: reveals upward, with scroll parallax */}
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute inset-y-0 left-[6%] right-[8%]"
      >
      <motion.div
        variants={{
          hidden: { clipPath: "inset(100% 0 0 0)" },
          visible: {
            clipPath: "inset(0% 0 0 0)",
            transition: { duration: 1.3, ease: EASE },
          },
        }}
        className="absolute inset-0 overflow-hidden rounded-l-[120px] rounded-br-[56px]"
      >
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y: photoY, scale: 1.06 }}
        >
          <Image
            src="/images/about/pharmacist.png"
            alt="QnQ healthcare professional assisting a customer"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>
      </motion.div>

      {/* Pharmacy store image: glides in from the right */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        className="group absolute bottom-[5%] right-0 z-20 h-32 w-[36%] overflow-hidden rounded-l-[24px] border-4 border-white shadow-xl sm:h-44 sm:w-[40%] sm:border-[6px]"
      >
        <Image
          src="/images/about/pharmacy-store.png"
          alt="QnQ Healthcare pharmacy"
          fill
          sizes="(min-width: 1024px) 30vw, 60vw"
          quality={90}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </motion.div>

      {/* Community floating card: springs up, then floats */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 36, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        className="absolute bottom-[4%] left-[4%] z-20 sm:left-[10%]"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="flex max-w-[220px] items-center gap-3 rounded-2xl bg-white p-3 shadow-xl sm:max-w-[270px] sm:gap-4 sm:p-4"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#F7C928]/60 motion-safe:animate-ping"
            />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#F7C928]">
              <Users size={20} />
            </span>
          </div>

          <div>
            <p className="text-[13px] font-semibold leading-5 sm:text-[15px] sm:leading-6">
              A healthier tomorrow for every community.
            </p>
            <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-[13px]">
              People. Purpose. Progress.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* STATISTICS COMPONENT                                                */
/* ------------------------------------------------------------------ */

function AboutStats({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      variants={stagger}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="relative z-20 mx-0 flex items-center rounded-[24px] bg-[#171717] px-4 py-6 text-white shadow-xl lg:my-0 lg:px-5"
    >
      {/* One-time light sweep across the card */}
      {reduce ? null : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
        >
          <motion.span
            initial={{ x: "-120%" }}
            whileInView={{ x: "420%" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
            className="absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </span>
      )}

      <div className="relative grid w-full grid-cols-2 gap-y-6 sm:grid-cols-4">
        {statistics.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group flex flex-col items-start px-2 sm:px-4 ${
                index !== 0 ? "md:border-l md:border-white/20" : ""
              }`}
            >
              <motion.span variants={popIn} className="mb-2 block">
                <Icon
                  className="text-[#F7C928] transition-transform duration-300 group-hover:scale-110"
                  size={24}
                />
              </motion.span>

              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <CountUp value={item.value} reduce={reduce} />
              </h3>

              <p className="mt-2 text-base leading-6 text-white/90">
                {item.label}
                <br />
                {item.sub}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* COMMITMENT COMPONENT                                                */
/* ------------------------------------------------------------------ */

function AboutCommitment({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      variants={stagger}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="flex flex-col justify-center"
    >
      <motion.div variants={fadeUp} className="mb-3 flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.35em]">
          Our Commitment
        </span>
        <motion.span
          variants={drawLine}
          className="h-[2px] w-10 origin-left bg-black"
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="text-base font-medium leading-7 text-[#242424]"
      >
        To make quality healthcare more accessible and affordable
        for individuals and communities across the regions we serve.
      </motion.p>
    </motion.div>
  );
}
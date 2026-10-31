// "use client";

// import {
//   motion,
//   useAnimationFrame,
//   useMotionTemplate,
//   useMotionValue,
//   useReducedMotion,
//   useScroll,
//   useSpring,
//   useTransform,
//   useVelocity,
// } from "framer-motion";
// import type { PointerEvent } from "react";
// import { useId } from "react";

// const PHRASES = [
//   "Everybody deserves a healthy life",
//   "Genuine medicines, honest prices",
//   "Care that reaches every home",
//   "Quality care, lower costs",
// ];

// // Percent of the track (one full loop = 50%) travelled per second.
// // Lower number = slower ticker.
// const SPEED = 2.1;

// const EDGE_MASK = "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

// // Badge ring geometry (viewBox is 104 x 104, centre at 52,52)
// const CENTER = 52;
// const RING_RADIUS = 38;
// const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// /* ---------- Separators ---------- */

// function Star() {
//   return (
//     <motion.svg
//       animate={{ rotate: [0, 180, 360], scale: [1, 1.25, 1] }}
//       aria-hidden="true"
//       className="h-6 w-6 shrink-0 drop-shadow-[0_4px_8px_rgba(255,159,28,0.45)] md:h-8 md:w-8"
//       transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
//       viewBox="0 0 24 24"
//     >
//       <defs>
//         <linearGradient id="qnq-star-gradient" x1="0" x2="1" y1="0" y2="1">
//           <stop offset="0%" stopColor="#ffd84d" />
//           <stop offset="100%" stopColor="#ff9f1c" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
//         fill="url(#qnq-star-gradient)"
//       />
//     </motion.svg>
//   );
// }

// function Badge() {
//   const pathId = `qnq-ticker-${useId().replaceAll(":", "")}`;

//   return (
//     <div aria-hidden="true" className="relative h-[72px] w-[72px] shrink-0 md:h-[92px] md:w-[92px]">
//       <motion.span
//         animate={{ scale: [0.9, 1.45], opacity: [0.5, 0] }}
//         className="absolute inset-0 rounded-full bg-brand-green/30"
//         transition={{ duration: 2.8, ease: "easeOut", repeat: Infinity }}
//       />
//       <motion.span
//         animate={{ scale: [0.9, 1.45], opacity: [0.5, 0] }}
//         className="absolute inset-0 rounded-full bg-brand-green/20"
//         transition={{ duration: 2.8, ease: "easeOut", repeat: Infinity, delay: 1.4 }}
//       />
//       <svg
//         className="relative h-full w-full text-brand-green drop-shadow-[0_8px_16px_rgba(34,160,80,0.25)]"
//         fill="none"
//         viewBox="0 0 104 104"
//       >
//         <defs>
//           {/* Full circle, starting at 9 o'clock and running clockwise */}
//           <path
//             d={`M ${CENTER - RING_RADIUS},${CENTER} a ${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a ${RING_RADIUS},${RING_RADIUS} 0 1,1 ${-RING_RADIUS * 2},0`}
//             id={pathId}
//           />
//         </defs>
//         <circle cx={CENTER} cy={CENTER} r="49" fill="white" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />

//         {/* Rotating ring text.
//             The invisible circle gives the group a perfectly centred bounding box,
//             so it spins around the exact middle of the badge instead of wobbling. */}
//         <motion.g
//           animate={{ rotate: 360 }}
//           style={{ originX: 0.5, originY: 0.5 }}
//           transition={{ duration: 22, ease: "linear", repeat: Infinity }}
//         >
//           <circle cx={CENTER} cy={CENTER} r="49" fill="none" stroke="none" />
//           <text
//             fill="currentColor"
//             fontFamily="Arial, sans-serif"
//             fontSize="9"
//             fontWeight="700"
//             style={{ whiteSpace: "pre" }}
//             xmlSpace="preserve"
//           >
//             {/* The trailing space is deliberate: it makes the gap at the seam match every other gap. */}
//             <textPath
//               href={`#${pathId}`}
//               lengthAdjust="spacing"
//               textLength={RING_CIRCUMFERENCE}
//             >
//               {"QNQ • HEALTH FOR ALL • QNQ • HEALTH FOR ALL • "}
//             </textPath>
//           </text>
//         </motion.g>

//         {/* Centre cross: pulses around its own centre */}
//         <motion.g
//           animate={{ scale: [1, 1.12, 1] }}
//           style={{ originX: 0.5, originY: 0.5 }}
//           transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
//         >
//           <circle cx={CENTER} cy={CENTER} r="20" fill="currentColor" />
//           <path d="M52 41v22M41 52h22" stroke="white" strokeLinecap="round" strokeWidth="5" />
//         </motion.g>
//       </svg>
//     </div>
//   );
// }

// /* ---------- Text ---------- */

// function Group({ duplicate = false }: { duplicate?: boolean }) {
//   return (
//     <div
//       aria-hidden={duplicate ? true : undefined}
//       className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14"
//     >
//       {PHRASES.map((text, index) => {
//         const isBlue = index % 2 === 0;
//         return (
//           <div className="flex items-center gap-8 md:gap-14" key={text}>
//             <motion.span
//               animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
//               className={`whitespace-nowrap bg-gradient-to-r ${
//                 isBlue
//                   ? "from-[#1b9ad6] via-[#0b5fc4] to-[#1b9ad6]"
//                   : "from-[#12a150] via-[#00897b] to-[#12a150]"
//               } bg-[length:200%_100%] bg-clip-text text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.045em] text-transparent drop-shadow-[0_6px_14px_rgba(11,95,196,0.15)]`}
//               transition={{ duration: 6, ease: "linear", repeat: Infinity }}
//             >
//               {text}
//             </motion.span>
//             {index === PHRASES.length - 1 ? <Badge /> : <Star />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ---------- Section ---------- */

// export default function LifeTicker() {
//   const reduceMotion = useReducedMotion();

//   // Marquee position (in % of the track, wraps between 0 and -50)
//   const x = useMotionValue(0);
//   const xPercent = useTransform(x, (value: number) => `${value}%`);

//   // Hover: eases the ticker to a stop and back
//   const hoverSpeed = useSpring(reduceMotion ? 0 : 1, { stiffness: 70, damping: 18 });

//   // Scroll velocity: ticker speeds up and leans while the page scrolls
//   const { scrollY } = useScroll();
//   const scrollVelocity = useVelocity(scrollY);
//   const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
//   const boost = useTransform(smoothVelocity, (v: number) => Math.min(Math.abs(v) / 350, 4));
//   const skew = useTransform(smoothVelocity, [-2500, 0, 2500], [-7, 0, 7]);

//   useAnimationFrame((_: number, delta: number) => {
//     const factor = hoverSpeed.get() * (1 + (reduceMotion ? 0 : boost.get()));
//     const next = x.get() - factor * SPEED * (delta / 1000);
//     x.set(next <= -50 ? next + 50 : next);
//   });

//   // Cursor spotlight
//   const mouseX = useMotionValue(-600);
//   const mouseY = useMotionValue(-600);
//   const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.85), transparent 70%)`;

//   const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     mouseX.set(event.clientX - rect.left);
//     mouseY.set(event.clientY - rect.top);
//   };

//   return (
//     <motion.section
//       aria-label="Everybody deserves a healthy life"
//       className="home-life-ticker relative isolate overflow-hidden bg-[linear-gradient(105deg,#fffdf1_0%,#fff8d2_45%,#ffee8f_100%)] py-9 md:py-12"
//       initial={{ opacity: 0, y: 28 }}
//       onHoverEnd={() => {
//         hoverSpeed.set(reduceMotion ? 0 : 1);
//         mouseX.set(-600);
//         mouseY.set(-600);
//       }}
//       onHoverStart={() => hoverSpeed.set(0)}
//       onPointerMove={handlePointerMove}
//       transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//       viewport={{ once: true, amount: 0.3 }}
//       whileInView={{ opacity: 1, y: 0 }}
//     >
//       {/* Soft grid + dotted texture to match the page */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,201,57,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,201,57,0.14)_1px,transparent_1px)] bg-[size:60px_60px]"
//       />

//       {/* Drifting colour glows */}
//       <motion.div
//         animate={{ x: ["-25%", "25%", "-25%"], opacity: [0.7, 1, 0.7] }}
//         aria-hidden="true"
//         className="absolute left-1/2 top-1/2 -z-10 h-44 w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#26a9c5]/25 via-white/40 to-[#00c45a]/25 blur-3xl"
//         transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
//       />

//       {/* Light sweep that glides across every few seconds */}
//       <motion.div
//         animate={{ x: ["-150%", "450%"] }}
//         aria-hidden="true"
//         className="absolute inset-y-0 left-0 -z-10 w-1/4 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
//         transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.5 }}
//       />

//       {/* Cursor spotlight */}
//       <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />

//       {/* Animated gold borders (top and bottom) */}
//       {(["top-0", "bottom-0"] as const).map((position, i) => (
//         <div aria-hidden="true" className={`absolute inset-x-0 ${position} z-10 h-px overflow-hidden bg-gradient-to-r from-transparent via-[#f3dd86]/45 to-transparent`} key={position}>
//           <motion.span
//             animate={{ x: i === 0 ? ["-30%", "430%"] : ["430%", "-30%"] }}
//             className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[#ff9f1c]/60 to-transparent"
//             style={{ filter: "blur(1px)" }}
//             transition={{ duration: 6, ease: "linear", repeat: Infinity }}
//           />
//         </div>
//       ))}

//       {/* The single scrolling line */}
//       <div style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}>
//         <motion.div
//           className="flex w-max items-center will-change-transform"
//           style={{ x: xPercent, skewX: reduceMotion ? 0 : skew }}
//         >
//           <Group />
//           <Group duplicate />
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }
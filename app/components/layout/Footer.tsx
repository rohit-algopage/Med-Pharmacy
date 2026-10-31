"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Clock3, Mail, MapPin, Phone, Search, Send } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Mission & Vision", href: "#purpose" },
  { label: "Our DNA", href: "#dna" },
  { label: "Our Journey", href: "#journey" },
  { label: "Achievements", href: "#achievements" },
];

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      {children}
    </svg>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <SocialIcon>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </SocialIcon>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <SocialIcon>
        <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </SocialIcon>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <SocialIcon>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </SocialIcon>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <SocialIcon>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </SocialIcon>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <SocialIcon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect height="12" width="4" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </SocialIcon>
    ),
  },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="relative isolate overflow-hidden border-t-2 border-[#F2B900] bg-[#181818] text-white"
      data-testid="footer"
      id="contact"
    >
      {/* Background image (place footer-bg.jpg in /public) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[url('/footer-bg.jpg')] bg-cover bg-center bg-no-repeat"
      />
      {/* Gradient colour overlay on top of the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(24,24,24,0.95)_0%,rgba(24,24,24,0.88)_50%,rgba(16,45,77,0.85)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_100%_100%,rgba(242,185,0,0.18),transparent_70%)]"
      />
      <div className="footer-container site-container relative pb-8 pt-14 lg:pt-20">
      <div className="footer-columns grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_1fr_1.1fr] lg:gap-14">
          {/* Brand */}
          <div>
            <a
              aria-label="QnQ Healthcare home"
              className="inline-flex items-center gap-3"
              href="#home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2B900] text-[#181818]">
                <Search aria-hidden="true" size={22} strokeWidth={3} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight">
                  QnQ
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  Healthcare
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-base leading-7 text-white/65">
              A community-first healthcare company making trusted medicines and
              modern pharmacy services accessible to every neighbourhood.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#F2B900] hover:text-[#F2B900]"
                    href={social.href}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#F2B900]">
              Explore
            </h2>
            <ul className="mt-7 space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-base text-white/70 transition-colors hover:text-[#F2B900]"
                    data-testid={`footer-link-${link.href.slice(1)}`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#F2B900]">
              Contact
            </h2>
            <ul className="mt-7 space-y-4 text-base text-white/70">
              <li className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#F2B900]"
                  size={16}
                />
                <span>Head Office — Street Name, City, State 600 000</span>
              </li>
              <li>
                <a
                  className="flex items-center gap-3 transition-colors hover:text-[#F2B900]"
                  data-testid="footer-phone"
                  href="tel:+919597706555"
                >
                  <Phone
                    aria-hidden="true"
                    className="shrink-0 text-[#F2B900]"
                    size={16}
                  />
                  +91 95977 06555
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-3 transition-colors hover:text-[#F2B900]"
                  href="mailto:hello@qnqhealthcare.com"
                >
                  <Mail
                    aria-hidden="true"
                    className="shrink-0 text-[#F2B900]"
                    size={16}
                  />
                  hello@qnqhealthcare.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock3
                  aria-hidden="true"
                  className="shrink-0 text-[#F2B900]"
                  size={16}
                />
                Mon – Sat, 9:00 AM – 9:00 PM
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div id="newsletter">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#F2B900]">
              Newsletter
            </h2>
            <p className="mt-7 max-w-xs text-base leading-7 text-white/70">
              Health tips, store openings and community stories — once a month,
              no spam.
            </p>
            <form
              className="mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/[0.04] focus-within:border-[#F2B900]"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Your email address
              </label>
              <input
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-base text-white outline-none placeholder:text-white/45"
                id="footer-newsletter-email"
                placeholder="Your email address"
                required
                type="email"
              />
              <button
                aria-label="Subscribe"
                className="flex w-14 items-center justify-center bg-[#F2B900] text-[#181818] transition-colors hover:bg-[#ffd43b]"
                type="submit"
              >
                <Send aria-hidden="true" size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} QnQ Healthcare. All rights reserved.
          </p>
          <p>Care for every community.</p>
        </div>
      </div>
    </footer>
  );
}
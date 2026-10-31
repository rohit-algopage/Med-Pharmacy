"use client";

import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const navigationLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about", hasMenu: true },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Buy Medicines", href: "#medicines" },
  { label: "Franchise", href: "#franchise" },
  { label: "Contact Us", href: "#contact" },
  { label: "Career", href: "#career" },
  { label: "Newsletter", href: "#newsletter" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 1);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-shadow duration-300 lg:h-[78px]"
      style={{
        boxShadow: isScrolled ? "0 2px 12px rgb(0 0 0 / 8%)" : "0 1px 0 rgb(0 0 0 / 5%)",
      }}
    >
      <div className="navbar-inner site-container flex min-h-[76px] flex-wrap items-center justify-between gap-2.5 py-2.5 lg:grid lg:h-full lg:grid-cols-[100px_minmax(0,1fr)_178px] lg:gap-3 lg:py-0 xl:grid-cols-[202px_minmax(0,1fr)_173px] xl:gap-5">
         <Link
          aria-label="QnQ Pharmacy home"
          className="flex w-fit flex-row items-center justify-center"
          href="/"
        >
          <Image
            src="/images/logo.png"
            alt="QnQ Pharmacy Logo"
            width={200}
            height={120}
            className="h-[60px] w-[120px] object-contain"
            priority
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-1 flex h-[45px] w-full min-w-0 items-center justify-start gap-[3px] overflow-x-auto px-[11px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-none lg:h-[52px] lg:w-auto lg:justify-evenly lg:overflow-y-hidden xl:h-[46px] xl:w-full xl:max-w-[775px] xl:justify-self-start"
        >
          {navigationLinks.map(({ label, href, active, hasMenu }) => (
            <Link
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex min-h-full shrink-0 items-center justify-center gap-[5px] whitespace-nowrap px-[11px] text-sm font-semibold text-[#0753a8] transition-colors hover:text-brand-green lg:px-[6px] xl:px-[10px] ${
                active
                  ? "text-brand-green after:absolute after:inset-x-[2px] after:bottom-[3px] after:h-[3px] after:rounded-full after:bg-brand-green lg:after:bottom-[6px]"
                  : ""
              }`}
              href={href}
              key={label}
            >
              {label}
              {hasMenu ? <ChevronDown aria-hidden="true" size={15} /> : null}
            </Link>
          ))}
        </nav>

        <a
          className="inline-flex min-h-[38px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand-green px-3 text-[13px] font-bold text-white shadow-[0_6px_14px_rgb(52_143_53_/_19%)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#1d883d] lg:min-h-10 lg:px-3 lg:text-sm xl:min-h-10 xl:gap-[9px] xl:px-[17px] xl:text-sm"
          href="tel:+919597706555"
        >
          <Phone aria-hidden="true" className="h-[14px] w-[14px] xl:h-[17px] xl:w-[17px]" fill="currentColor" />
          <span>+91 95977 06555</span>
        </a>
      </div>
    </header>
  );
}
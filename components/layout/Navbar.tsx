"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Menu, X, Sun, Moon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/saved", label: "Saved" },
    { href: "/add-opportunity", label: "Add" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-bg/85 backdrop-blur-2xl border-b border-border/60 shadow-2xl"
          : "bg-bg/70 backdrop-blur-xl border-b border-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/*  LOGO  */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Go to homepage"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="KaarYab Afghanistan"
                fill
                sizes="(max-width: 768px) 96px, 112px"
                className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span
                className={cn(
                  "text-xl md:text-2xl font-extrabold tracking-tight transition-colors duration-300",
                  theme === "dark" ? "text-white" : "text-black"
                )}
              >
                KaarYab
              </span>
              <span
                className={cn(
                  "text-[10px] md:text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300",
                  theme === "dark" ? "text-white/70" : "text-black/70"
                )}
              >
                Afghanistan
              </span>
            </div>
          </Link>

          {/*  DESKTOP NAVIGATION  */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "px-5 xl:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                  isActive(href)
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-primary/8 hover:text-primary"
                )}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/*  RIGHT CONTROLS  */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* CV Builder */}
            <Link
              href="/cv-builder"
              title="CV Builder"
              aria-label="CV Builder"
              className={cn(
                "relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105",
                isActive("/cv-builder")
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-primary/5 hover:bg-primary/10 text-text-primary"
              )}
            >
              <FileText className="w-5 h-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              className="
    w-11 h-11
    flex items-center justify-center
    rounded-xl
    bg-primary/5
    hover:bg-primary/10
    transition-all
    duration-300
    hover:scale-105
  "
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={cn(
                    "absolute inset-0 w-5 h-5 transition-all duration-300",
                    theme === "dark"
                      ? "opacity-100 rotate-0"
                      : "opacity-0 rotate-90"
                  )}
                />
                <Moon
                  className={cn(
                    "absolute inset-0 w-5 h-5 transition-all duration-300",
                    theme === "light"
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-90"
                  )}
                />
              </div>

              <span className="sr-only">Toggle theme</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="
    lg:hidden
    w-11 h-11
    flex items-center justify-center
    rounded-xl
    hover:bg-surface-secondary
    transition-colors
  "
            >
              {isOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*  MOBILE NAVIGATION  */}
      <div
        id="mobile-navigation"
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-bg border-t border-border px-4 py-2 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "flex justify-center px-4 py-3 rounded-xl transition-all duration-200",
                isActive(href)
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
              )}
            >
              <span className="font-medium">{label}</span>
              {isActive(href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

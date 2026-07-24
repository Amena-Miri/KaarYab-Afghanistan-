import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container-custom py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ===== BRAND SECTION ===== */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
  <Image
    src="/logo.png"
    alt="KaarYab Afghanistan"
    fill
    sizes="(max-width: 768px) 96px, 112px"
    className="object-contain rounded-xl"
    priority
  />
</div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-text-primary">
                  KaarYab
                </span>

                <span className="text-[10px] md:text-xs font-semibold tracking-[0.18em] uppercase text-text-secondary">
                  Afghanistan
                </span>
              </div>
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Empowering Afghan youth through opportunities. Find jobs,
              internships, scholarships, and more.
            </p>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div>
            <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/opportunities"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/add-opportunity"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Add Opportunity
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Saved Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== CATEGORIES ===== */}
          <div>
            <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-6">
              Categories
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/opportunities?category=Job"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Internship"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Scholarship"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Remote Work"
                  className="text-text-secondary hover:text-primary transition-colors text-sm"
                >
                  Remote Work
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== CONTACT INFO ===== */}
          <div>
            <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  info@kaaryab.af
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  +93 700 123 456
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  Kabul, Afghanistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-14 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary text-center md:text-left">
              © {currentYear} KaarYab Afghanistan. Developed by{" "}
              <span className="text-primary font-semibold">Amena Miri</span>
            </p>
            <p className="text-sm text-text-secondary">
              <span className="text-primary font-semibold">Demo Data</span> —
              For educational purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

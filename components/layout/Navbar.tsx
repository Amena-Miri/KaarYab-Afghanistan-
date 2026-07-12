'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import {
  Menu,
  X,
  Sun,
  Moon,
  Briefcase,
  Home,
  Bookmark,
  PlusCircle,
  LayoutDashboard,
  Info,
  Mail,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
    { href: '/saved', label: 'Saved', icon: Bookmark },
    { href: '/add-opportunity', label: 'Add', icon: PlusCircle },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-black'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Kaar<span className="text-primary">Yab</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === 'dark' ? 'light' : 'dark'
              } mode`}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-4 py-2 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(href)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
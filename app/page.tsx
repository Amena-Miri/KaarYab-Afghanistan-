"use client";

import React from "react";
import Link from "next/link";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { OpportunityCard } from "@/components/opportunity/OpportunityCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  Briefcase,
  GraduationCap,
  Globe,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Star,
  Bell,
  Bookmark,
  Zap,
  Clock,
  Play,
  Rocket,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const HomePage: React.FC = () => {
  const { opportunities } = useOpportunityContext();

  const featured = opportunities.filter((o) => o.isFeatured).slice(0, 3);
  const recent = opportunities.slice(0, 4);

  // STATS DATA
  const stats = [
    {
      label: "Total Opportunities",
      value: opportunities.length,
      icon: Briefcase,
      color: "primary",
    },
    {
      label: "Jobs Available",
      value: opportunities.filter((o) => o.category === "Job").length,
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Scholarships",
      value: opportunities.filter((o) => o.category === "Scholarship").length,
      icon: Award,
      color: "purple",
    },
    {
      label: "Remote Work",
      value: opportunities.filter((o) => o.type === "Remote").length,
      icon: Globe,
      color: "green",
    },
  ];

  // CATEGORIES DATA
  const categories = [
  {
    name: "Jobs",
    value: "Job",
    icon: Briefcase,
    count: opportunities.filter((o) => o.category === "Job").length,
  },
  {
    name: "Internships",
    value: "Internship",
    icon: GraduationCap,
    count: opportunities.filter((o) => o.category === "Internship").length,
  },
  {
    name: "Scholarships",
    value: "Scholarship",
    icon: Award,
    count: opportunities.filter((o) => o.category === "Scholarship").length,
  },
  {
    name: "Remote Work",
    value: "Remote Work",
    icon: Globe,
    count: opportunities.filter((o) => o.category === "Remote Work").length,
  },
  {
    name: "Courses",
    value: "Online Course",
    icon: BookOpen,
    count: opportunities.filter((o) => o.category === "Online Course").length,
  },
  {
    name: "Volunteer",
    value: "Volunteer Work",
    icon: Users,
    count: opportunities.filter((o) => o.category === "Volunteer Work").length,
  },
];

  // FEATURES DATA
  const features = [
    {
      icon: Search,
      title: "Easy Discovery",
      desc: "Find opportunities that match your skills and interests with smart search.",
    },
    {
      icon: Bookmark,
      title: "Save & Track",
      desc: "Save favorites and track your application progress.",
    },
    {
      icon: Bell,
      title: "Get Notified",
      desc: "Receive alerts when new opportunities match your profile.",
    },
    {
      icon: Users,
      title: "Community Driven",
      desc: "Join a community of Afghan youth sharing opportunities.",
    },
  ];

  const heroButtonStyle =
    "bg-white text-primary hover:bg-white/90 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 transition-all duration-300 font-semibold px-5 py-2.5 text-sm sm:px-8 sm:py-3.5 sm:text-base rounded-full";
  // ANIMATIONS
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // SECTION HEADER
  const SectionHeader = ({ badge, icon: Icon, title, subtitle }: any) => (
    <div className="section-header">
      <div className="section-header-badge">
        <Icon className="w-4 h-4" />
        {badge}
      </div>
      <h2 className="section-header-title">{title}</h2>
      <div className="section-header-divider" />
      <p className="section-header-subtitle">{subtitle}</p>
    </div>
  );

  // VIEW ALL BUTTON
  const ViewAllButton = () => (
    <div className="text-center mt-12">
      <Link href="/opportunities">
        <Button
          variant="outline"
          size="lg"
          rightIcon={<ChevronRight className="w-5 h-5" />}
          className="h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 text-sm md:text-base font-semibold shadow-sm hover:shadow-lg transition-all duration-300"
        >
          View All Opportunities
        </Button>
      </Link>
    </div>
  );

  return (
    <main className="bg-bg">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-accent" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div className="absolute -top-32 left-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-lime-300/20 blur-3xl" />

        <div className="container-custom relative z-10 py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 sm:px-6 sm:py-3 text-white text-xs sm:text-sm"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Afghanistan's Largest Opportunity Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 sm:mt-8 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
            >
              Find Your
              <span className="block bg-gradient-to-r from-lime-200 via-white to-lime-300 bg-clip-text text-transparent">
                Dream Opportunity
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-green-50 max-w-3xl mx-auto leading-relaxed sm:leading-9 px-2 sm:px-0"
            >
              Discover jobs, scholarships, internships, remote work, fellowships
              and courses from trusted organizations around Afghanistan and the
              world.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mt-6 sm:mt-8">
              <Link href="/opportunities">
                <Button size="lg" className={heroButtonStyle}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Searching
                </Button>
              </Link>

              <Link href="/add-opportunity">
                <Button size="lg" className={heroButtonStyle}>
                  Share an Opportunity
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-2 sm:mt-6 md:mt-12 mb-2">
              {[
                ["5000+", "Users"],
                ["900+", "Jobs"],
                ["300+", "Scholarships"],
                ["120+", "Courses"],
              ].map(([n, t]) => (
                <div key={t} className="text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {n}
                  </h2>
                  <p className="text-green-100 mt-1 sm:mt-2 text-xs sm:text-sm">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 150"
          fill="none"
        >
          <path
            fill="var(--bg)"
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>
      </section>

      {/* STATS SECTION */}
      <section className="section-spacing border-y border-border bg-surface/30">
        <div className="container-custom">
          <SectionHeader
            badge="Platform Stats"
            icon={BarChart3}
            title="Our Impact in Numbers"
            subtitle="Connecting Afghan youth with opportunities"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group"
              >
                <Card className="p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border-border/50 hover:border-primary/30 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div
                    className={cn(
                      "w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10",
                      {
                        "bg-gradient-to-br from-primary/20 to-primary/5 text-primary":
                          stat.color === "primary",
                        "bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-500":
                          stat.color === "blue",
                        "bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-500":
                          stat.color === "purple",
                        "bg-gradient-to-br from-green-500/20 to-green-500/5 text-green-500":
                          stat.color === "green",
                      }
                    )}
                  >
                    <stat.icon className="w-9 h-9" />
                  </div>
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-primary font-semibold mt-2">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section-spacing">
        <div className="container-custom">
          <SectionHeader
            badge="Categories"
            icon={Sparkles}
            title="Explore by Category"
            subtitle="Find opportunities that match your interests and career goals"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                variants={itemVariants}
                className="group"
              >
                <Link
                  href={`/opportunities?category=${encodeURIComponent(cat.value)}`}
                >
                  <Card
                    hover
                    className="text-center p-6 h-full border-border/50 hover:border-primary/30 transition-all duration-400 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md relative z-10">
                      <cat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary text-base group-hover:text-primary transition-colors duration-300 relative z-10">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1.5 font-medium relative z-10">
                      {cat.count} opportunities
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                      Explore <ChevronRight className="w-3 h-3" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="section-spacing bg-surface/50">
        <div className="container-custom">
          <SectionHeader
            badge="Featured"
            icon={Star}
            title="Top Opportunities"
            subtitle="Handpicked opportunities just for you"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {featured.map((opp) => (
              <motion.div key={opp.id} variants={itemVariants}>
                <OpportunityCard opportunity={opp} featured />
              </motion.div>
            ))}
          </motion.div>

          <ViewAllButton />
        </div>
      </section>

      {/* RECENT SECTION */}
      <section className="section-spacing">
        <div className="container-custom">
          <SectionHeader
            badge="Latest"
            icon={Clock}
            title="Recently Added"
            subtitle="New opportunities posted by the community"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {recent.map((opp) => (
              <motion.div key={opp.id} variants={itemVariants}>
                <OpportunityCard opportunity={opp} />
              </motion.div>
            ))}
          </motion.div>

          <ViewAllButton />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-spacing bg-surface/50">
        <div className="container-custom">
          <SectionHeader
            badge="Why KaarYab"
            icon={Zap}
            title="Built for Afghan Youth"
            subtitle="Everything you need to find and share opportunities in one place"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="text-center p-8 h-full hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border-border/50 hover:border-primary/30 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md relative z-10">
                    <f.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary text-lg mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                    {f.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed relative z-10">
                    {f.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden section-spacing w-full flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-accent" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div className="absolute -top-32 left-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-lime-300/20 blur-3xl" />

        <svg
          className="absolute top-0 left-0 w-full rotate-180"
          viewBox="0 0 1440 150"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--bg)"
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>

        <div className="relative z-10 w-full flex justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 sm:px-6 sm:py-2.5 text-white text-xs sm:text-sm mb-6 sm:mb-8">
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
              Join Us Today
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4 sm:mb-6">
              Ready to Find Your Next
              <span className="block bg-gradient-to-r from-lime-200 via-white to-lime-300 bg-clip-text text-transparent">
                Opportunity?
              </span>
            </h2>

            <p className="max-w-xl text-base sm:text-lg text-white/90 mb-8 sm:mb-10 leading-relaxed">
              Join thousands of Afghan youth who are discovering new
              opportunities every day.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/opportunities">
                <Button size="lg" className={heroButtonStyle}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Searching
                </Button>
              </Link>

              <Link href="/add-opportunity">
                <Button size="lg" className={heroButtonStyle}>
                  Share an Opportunity
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 150"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--bg)"
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>
      </section>
    </main>
  );
};

export default HomePage;

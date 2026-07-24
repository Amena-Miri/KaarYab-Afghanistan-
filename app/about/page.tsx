"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Rocket,
  Users,
  Star,
  Briefcase,
  Plus,
  Play,
} from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Helping Afghan youth discover jobs, scholarships and career opportunities in one trusted platform.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description:
        "Building a modern opportunity platform that connects talented people with organizations worldwide.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Accessibility, transparency and equal opportunities for everyone.",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Trusted Opportunities",
      desc: "Carefully reviewed opportunities from trusted organizations.",
    },
    {
      icon: Rocket,
      title: "Fast Experience",
      desc: "Clean interface with quick search and filtering.",
    },
    {
      icon: Users,
      title: "Community Focused",
      desc: "Designed especially for Afghan students and professionals.",
    },
    {
      icon: Star,
      title: "Quality Platform",
      desc: "Simple, modern and continuously improving.",
    },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const heroButtonStyle =
    "rounded-2xl bg-white text-primary hover:bg-white/90 border-0 shadow-xl px-7";

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
      <div className="container-custom">
        {/* HEADER */}

        <Card className="mb-10 p-8 bg-surface border border-border rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  About KaarYab
                </h1>

                <p className="text-text-secondary text-lg">
                  Learn more about our mission and platform.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/opportunities">
                <Button
                  variant="outline"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Browse Opportunities
                </Button>
              </Link>

              <Link href="/add-opportunity">
                <Button leftIcon={<Plus className="w-4 h-4" />}>
                  Add Opportunity
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* OUR STORY */}

        <motion.div {...fadeUp}>
          <Card className="p-8 mb-8 bg-surface border border-border rounded-3xl">
            <Badge variant="primary" className="mb-4">
              About Us
            </Badge>

            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Empowering Afghan Youth
            </h2>

            <p className="text-lg text-text-secondary leading-8">
              KaarYab is a modern opportunity platform created to help students,
              graduates and professionals easily discover scholarships, jobs,
              internships, online courses and training programs from trusted
              organizations around the world.
            </p>
          </Card>
        </motion.div>

        {/* VALUES */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full p-6 bg-surface border border-border rounded-3xl hover:border-primary/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {value.title}
                </h3>

                <p className="text-text-secondary leading-7">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FEATURES */}

        <motion.div {...fadeUp}>
          <Card className="p-8 bg-surface border border-border rounded-3xl mb-8">
            <div className="mb-8">
              <Badge variant="primary" className="mb-3">
                Why Choose KaarYab
              </Badge>

              <h2 className="text-3xl font-bold text-text-primary mb-3">
                Built for Students & Professionals
              </h2>

              <p className="text-text-secondary">
                Everything you need to discover and manage opportunities in one
                place.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-text-secondary leading-6">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* CTA */}

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-accent" />

        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="absolute -top-32 left-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-lime-300/20 blur-3xl" />

        {/* Top Wave */}

        <svg
          className="absolute top-0 left-0 w-full rotate-180"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--bg)"
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>

        <div className="relative z-10 container-custom py-16">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-7 bg-white/10 text-white border border-white/20 backdrop-blur-md">
              <Rocket className="w-4 h-4 mr-2" />
              Join Us Today
            </Badge>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-6">
              Ready to Find Your Next
              <span className="block bg-gradient-to-r from-lime-200 via-white to-lime-300 bg-clip-text text-transparent">
                Opportunity?
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg text-white/90 leading-8 mb-10">
              Join thousands of Afghan students and professionals who are
              discovering scholarships, internships and career opportunities
              every day through KaarYab.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/opportunities">
                <Button size="lg" className={heroButtonStyle}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Searching
                </Button>
              </Link>

              <Link href="/add-opportunity">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary px-7"
                >
                  Share an Opportunity
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave */}

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 150"
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

export default AboutPage;
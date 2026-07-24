"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { FaGlobe, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@kaaryab.af",
      href: "mailto:info@kaaryab.af",
      color: "primary",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+93 700 123 456",
      href: "tel:+93700123456",
      color: "primary",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kabul, Afghanistan",
      href: "#",
      color: "primary",
    },
  ];

  const socialLinks = [
    {
      icon: FaTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-500",
    },
    {
      icon: FaLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "Youtube",
      color: "hover:text-red-500",
    },
    {
      icon: FaGlobe,
      href: "#",
      label: "Website",
      color: "hover:text-primary",
    },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
      <div className="container-custom">
        {/* HEADER */}

        <Card className="mb-10 p-8 bg-surface border border-border rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Mail className="w-7 h-7 text-primary" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Contact Us
                </h1>

                <p className="text-lg text-text-secondary">
                  We'd love to hear from you. Get in touch with the KaarYab
                  team.
                </p>
              </div>
            </div>

            {/* Right */}
            <Link href="/about">
              <Button
                variant="outline"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                About KaarYab
              </Button>
            </Link>
          </div>
        </Card>
        {/* CONTENT */}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* CONTACT INFO */}

          <motion.div {...fadeUp} className="lg:col-span-1">
            <Card className="rounded-3xl border border-border bg-surface p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    Contact Information
                  </h2>

                  <p className="text-sm text-text-secondary">
                    Reach us anytime.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary/30"
                  >
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl",
                        {
                          "bg-primary/10 text-primary":
                            info.color === "primary",
                        }
                      )}
                    >
                      <info.icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-text-secondary">
                        {info.label}
                      </p>

                      <p className="font-medium text-text-primary">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <h3 className="mb-4 font-semibold text-text-primary">
                  Follow Us
                </h3>

                <div className="flex gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl bg-background border border-border transition-all hover:border-primary/30",
                        item.color
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Usually replies within 24 hours
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* CONTACT FORM */}

          <motion.div {...fadeUp} className="lg:col-span-2">
            <Card className="rounded-3xl border border-border bg-surface p-7">
              <div className="mb-6">
                <Badge variant="primary" className="mb-3">
                  Send Message
                </Badge>

                <h2 className="text-2xl font-bold text-text-primary">
                  We'd Love to Hear From You
                </h2>

                <p className="mt-2 text-text-secondary">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    leftIcon={<User className="w-5 h-5" />}
                  />

                  <div>
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      leftIcon={<Mail className="w-5 h-5" />}
                    />
                  </div>
                </div>

                <div>
                  <Input
                    label="Subject"
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    leftIcon={<Building className="w-5 h-5" />}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-secondary">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full rounded-2xl border border-input-border bg-input-bg px-4 py-3 text-text-primary outline-none transition-all resize-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />

                      <p className="text-sm text-green-600 dark:text-green-400">
                        Thank you! Your message has been sent successfully.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4"
                    >
                      <AlertCircle className="h-5 w-5 text-red-500" />

                      <p className="text-sm text-red-600 dark:text-red-400">
                        Something went wrong. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="h-4 w-4" />}
                  className="w-full md:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
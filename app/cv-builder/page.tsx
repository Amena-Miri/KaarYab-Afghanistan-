"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCV } from "@/context/CVContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Eye,
  Save,
  Download,
  Plus,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CVData } from "@/types/cv";

// =========================
// TYPES
// =========================
type FormData = Omit<CVData, "template" | "createdAt" | "updatedAt">;

const defaultForm: FormData = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
};

// =========================
// COMPONENT
// =========================
const CVBuilderPage = () => {
  const { cvData, createCV, updateCV, downloadCV, isLoading } = useCV();

  const [tab, setTab] = useState<
    "personal" | "experience" | "education" | "skills" | "preview"
  >("personal");
  const [form, setForm] = useState<FormData>(defaultForm);
  const [newSkill, setNewSkill] = useState("");
  const [showExp, setShowExp] = useState(false);
  const [showEdu, setShowEdu] = useState(false);

  const [tempExp, setTempExp] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
  });
  const [tempEdu, setTempEdu] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
  });

  useEffect(() => {
    if (cvData) {
      setForm({
        personal: cvData.personal,
        experience: cvData.experience,
        education: cvData.education,
        skills: cvData.skills,
        languages: cvData.languages || [],
        certifications: cvData.certifications || [],
        projects: cvData.projects || [],
      });
    }
  }, [cvData]);

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "preview", label: "Preview", icon: Eye },
  ];

  const getCompletion = () => {
    let score = 0;
    const p = form.personal;
    if (p.firstName && p.lastName) score += 15;
    if (p.email) score += 10;
    if (p.title) score += 10;
    if (p.summary) score += 10;
    if (form.experience.length > 0) score += 20;
    if (form.education.length > 0) score += 15;
    if (form.skills.length > 0) score += 20;
    return Math.min(score, 100);
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !form.skills.includes(s)) {
      setForm({ ...form, skills: [...form.skills, s] });
      setNewSkill("");
    }
  };
  const removeSkill = (i: number) =>
    setForm({ ...form, skills: form.skills.filter((_, idx) => idx !== i) });

  const addExp = () => {
    if (tempExp.company && tempExp.position) {
      setForm({
        ...form,
        experience: [
          ...form.experience,
          { ...tempExp, id: crypto.randomUUID() },
        ],
      });
      setTempExp({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
      });
      setShowExp(false);
    }
  };
  const removeExp = (id: string) =>
    setForm({
      ...form,
      experience: form.experience.filter((e) => e.id !== id),
    });

  const addEdu = () => {
    if (tempEdu.institution && tempEdu.degree) {
      setForm({
        ...form,
        education: [...form.education, { ...tempEdu, id: crypto.randomUUID() }],
      });
      setTempEdu({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
      });
      setShowEdu(false);
    }
  };
  const removeEdu = (id: string) =>
    setForm({ ...form, education: form.education.filter((e) => e.id !== id) });

  const save = async () => {
    if (cvData) await updateCV(form);
    else await createCV(form);
  };

  const formatDate = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <main className="min-h-screen bg-bg">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary via-primary to-primary-dark pt-12">
        {" "}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_45%)]" />
        <div className="container-custom relative z-10 py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" /> Back Home
              </Link>
              <h1 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                CV Builder
              </h1>
              <p className="mt-2 text-white/80">Create your professional CV</p>
            </div>

            <Card className="w-full lg:w-64 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-white/80">Completion</span>
                <span className="text-xl font-bold text-white">
                  {getCompletion()}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${getCompletion()}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-xl font-bold text-white">
                    {form.skills.length}
                  </p>
                  <p className="text-xs text-white/70">Skills</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">
                    {form.experience.length}
                  </p>
                  <p className="text-xs text-white/70">Experience</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="container-custom py-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Build Your CV
            </h2>
            <p className="text-sm text-text-secondary">Complete all sections</p>
          </div>
          <div className="flex gap-3">
            {cvData && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="h-4 w-4" />}
                onClick={() => downloadCV("pdf")}
              >
                PDF
              </Button>
            )}
            <Button
              size="sm"
              leftIcon={<Save className="h-4 w-4" />}
              onClick={save}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : cvData ? "Update" : "Save"}
            </Button>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                tab === t.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-surface text-text-secondary hover:bg-surface-secondary"
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <Card className="p-6 rounded-2xl border-border">
          {/* ===== PERSONAL ===== */}
          {tab === "personal" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={form.personal.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, firstName: e.target.value },
                    })
                  }
                  leftIcon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Last Name"
                  value={form.personal.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, lastName: e.target.value },
                    })
                  }
                  leftIcon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.personal.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, email: e.target.value },
                    })
                  }
                  leftIcon={<Mail className="h-4 w-4" />}
                />
                <Input
                  label="Phone"
                  value={form.personal.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, phone: e.target.value },
                    })
                  }
                  leftIcon={<Phone className="h-4 w-4" />}
                />
                <Input
                  label="Address"
                  value={form.personal.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, address: e.target.value },
                    })
                  }
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
                <Input
                  label="Title"
                  value={form.personal.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, title: e.target.value },
                    })
                  }
                  leftIcon={<Briefcase className="h-4 w-4" />}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary block mb-1">
                  Summary
                </label>
                <textarea
                  rows={4}
                  value={form.personal.summary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personal: { ...form.personal, summary: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-border bg-surface p-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Tell about yourself..."
                />
              </div>
            </motion.div>
          )}

          {/* ===== EXPERIENCE ===== */}
          {tab === "experience" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-text-primary">
                  Work Experience
                </h3>
                <Button
                  size="sm"
                  leftIcon={<Plus className="h-4 w-4" />}
                  onClick={() => setShowExp(true)}
                >
                  Add
                </Button>
              </div>
              {form.experience.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between items-start p-4 bg-surface rounded-xl border border-border"
                >
                  <div>
                    <p className="font-semibold text-text-primary">
                      {e.position}
                    </p>
                    <p className="text-sm text-text-secondary">{e.company}</p>
                    <p className="text-xs text-text-secondary">
                      {formatDate(e.startDate)} —{" "}
                      {e.current ? "Present" : formatDate(e.endDate)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeExp(e.id!)}
                    className="text-error hover:text-error/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {showExp && (
                <Card className="p-5 border-primary/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      label="Company"
                      value={tempExp.company}
                      onChange={(e) =>
                        setTempExp({ ...tempExp, company: e.target.value })
                      }
                    />
                    <Input
                      label="Position"
                      value={tempExp.position}
                      onChange={(e) =>
                        setTempExp({ ...tempExp, position: e.target.value })
                      }
                    />
                    <Input
                      label="Start"
                      type="date"
                      value={tempExp.startDate}
                      onChange={(e) =>
                        setTempExp({ ...tempExp, startDate: e.target.value })
                      }
                    />
                    {!tempExp.current && (
                      <Input
                        label="End"
                        type="date"
                        value={tempExp.endDate}
                        onChange={(e) =>
                          setTempExp({ ...tempExp, endDate: e.target.value })
                        }
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tempExp.current}
                        onChange={(e) =>
                          setTempExp({ ...tempExp, current: e.target.checked })
                        }
                      />{" "}
                      <span className="text-sm text-text-secondary">
                        Current
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={addExp}>Save</Button>
                    <Button variant="outline" onClick={() => setShowExp(false)}>
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {/* ===== EDUCATION ===== */}
          {tab === "education" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-text-primary">Education</h3>
                <Button
                  size="sm"
                  leftIcon={<Plus className="h-4 w-4" />}
                  onClick={() => setShowEdu(true)}
                >
                  Add
                </Button>
              </div>
              {form.education.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between items-start p-4 bg-surface rounded-xl border border-border"
                >
                  <div>
                    <p className="font-semibold text-text-primary">
                      {e.degree}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {e.institution}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatDate(e.startDate)} —{" "}
                      {e.current ? "Present" : formatDate(e.endDate)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeEdu(e.id!)}
                    className="text-error hover:text-error/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {showEdu && (
                <Card className="p-5 border-primary/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      label="Institution"
                      value={tempEdu.institution}
                      onChange={(e) =>
                        setTempEdu({ ...tempEdu, institution: e.target.value })
                      }
                    />
                    <Input
                      label="Degree"
                      value={tempEdu.degree}
                      onChange={(e) =>
                        setTempEdu({ ...tempEdu, degree: e.target.value })
                      }
                    />
                    <Input
                      label="Field"
                      value={tempEdu.field}
                      onChange={(e) =>
                        setTempEdu({ ...tempEdu, field: e.target.value })
                      }
                    />
                    <Input
                      label="Start"
                      type="date"
                      value={tempEdu.startDate}
                      onChange={(e) =>
                        setTempEdu({ ...tempEdu, startDate: e.target.value })
                      }
                    />
                    {!tempEdu.current && (
                      <Input
                        label="End"
                        type="date"
                        value={tempEdu.endDate}
                        onChange={(e) =>
                          setTempEdu({ ...tempEdu, endDate: e.target.value })
                        }
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tempEdu.current}
                        onChange={(e) =>
                          setTempEdu({ ...tempEdu, current: e.target.checked })
                        }
                      />{" "}
                      <span className="text-sm text-text-secondary">
                        Current
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={addEdu}>Save</Button>
                    <Button variant="outline" onClick={() => setShowEdu(false)}>
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {/* ===== SKILLS ===== */}
          {tab === "skills" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex gap-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1"
                />
                <Button
                  onClick={addSkill}
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.skills.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {s}{" "}
                    <button onClick={() => removeSkill(i)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </Card>

        {/* ===== PREVIEW ===== */}
        {tab === "preview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">CV Preview</h3>

              <Button
                size="sm"
                leftIcon={<Download className="h-4 w-4" />}
                onClick={() => downloadCV("pdf")}
              >
                Download PDF
              </Button>
            </div>

            <Card
              id="cv-preview"
              className="p-6 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                borderColor: "#E5E7EB",
              }}
            >
              <div className="text-center border-b pb-4 mb-4">
                <h1 className="text-2xl font-bold" style={{ color: "#000000" }}>
                  {form.personal.firstName} {form.personal.lastName}
                </h1>

                <p style={{ color: "#16A34A" }}>{form.personal.title}</p>

                <div
                  className="flex justify-center gap-4 text-sm flex-wrap"
                  style={{ color: "#4B5563" }}
                >
                  <span>{form.personal.email}</span>
                  <span>{form.personal.phone}</span>
                  <span>{form.personal.address}</span>
                </div>
              </div>

              {form.personal.summary && (
                <div className="mb-4">
                  <h4 className="font-semibold" style={{ color: "#000000" }}>
                    Summary
                  </h4>

                  <p className="text-sm" style={{ color: "#4B5563" }}>
                    {form.personal.summary}
                  </p>
                </div>
              )}

              {form.experience.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold" style={{ color: "#000000" }}>
                    Experience
                  </h4>

                  {form.experience.map((e) => (
                    <div key={e.id} className="text-sm">
                      <strong style={{ color: "#000000" }}>{e.position}</strong>{" "}
                      — {e.company}
                      <span style={{ color: "#6B7280" }}>
                        {" "}
                        ({formatDate(e.startDate)} -{" "}
                        {e.current ? "Present" : formatDate(e.endDate)})
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {form.education.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold" style={{ color: "#000000" }}>
                    Education
                  </h4>

                  {form.education.map((e) => (
                    <div key={e.id} className="text-sm">
                      <strong style={{ color: "#000000" }}>{e.degree}</strong> —{" "}
                      {e.institution}
                    </div>
                  ))}
                </div>
              )}

              {form.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold" style={{ color: "#000000" }}>
                    Skills
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {form.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-2 my-3"
                        style={{
                          backgroundColor: "#DCFCE7",
                          color: "#16A34A",
                          borderRadius: "9999px",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default CVBuilderPage;

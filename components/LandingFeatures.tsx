// app/components/LandingFeatures.tsx
"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Secure Cloud Storage",
    description:
      "All your files are encrypted and safely stored with 99.99% uptime.",
    icon: "🔐",
  },
  {
    title: "Instant Access",
    description: "Access your files from anywhere, on any device.",
    icon: "⚡",
  },
  {
    title: "Organized for You",
    description: "Auto-sorted by file type, date, and space-saving folders.",
    icon: "🗂️",
  },
  {
    title: "Share with Ease",
    description: "Generate links and control access to shared files securely.",
    icon: "🔗",
  },
  {
    title: "Lightning Fast Uploads",
    description: "Optimized infrastructure for faster uploads and downloads.",
    icon: "🚀",
  },
  {
    title: "Privacy Focused",
    description: "Your data stays yours. We never track, index or monetize it.",
    icon: "🔒",
  },
];

export default function LandingFeatures() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full"
    >
      {features.map(({ title, description, icon }) => (
        <div
          key={title}
          className="bg-gray p-6 rounded-2xl shadow-md hover:shadow-xl hover:bg-blue transition"
        >
          <div className="mb-4 text-blue-600 text-4xl">{icon}</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-600 text-sm">{description}</p>
        </div>
      ))}
    </motion.section>
  );
}

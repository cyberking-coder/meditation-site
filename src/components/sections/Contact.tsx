"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-cosmos-deep py-28">
      <div className="mx-auto max-w-2xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-glow text-center font-serif text-5xl font-light text-white"
        >
          Begin the Conversation
        </motion.h2>
        <p className="mt-4 text-center text-muted">
          Reach out and we&apos;ll guide you to your first session.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass mt-12 space-y-5 rounded-2xl border border-white/10 p-8"
        >
          <input
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-muted/60 focus:border-cosmos-purple focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Your email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-muted/60 focus:border-cosmos-purple focus:outline-none"
          />
          <textarea
            required
            rows={4}
            placeholder="Your message"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-muted/60 focus:border-cosmos-purple focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-cosmos-purple to-cosmos-indigo py-3 font-medium text-white transition hover:opacity-90"
            style={{ boxShadow: "0 0 30px rgba(124,58,237,0.45)" }}
          >
            {sent ? "✦ Message Sent" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

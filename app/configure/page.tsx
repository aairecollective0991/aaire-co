"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BuildingConfigurator from "@/components/BuildingConfigurator";
import DesignTips from "@/components/DesignTips";
import { fadeUp, fadeIn } from "@/app/lib/animations";

type Pending = { spec: unknown; specText: string } | null;

export default function ConfigurePage() {
  const [pending, setPending] = useState<Pending>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const close = () => { setPending(null); setStatus("idle"); setErrorMsg(""); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pending) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/configurator-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, spec: pending.spec, specText: pending.specText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  };

  const inputCls =
    "w-full rounded-md bg-[#0a1420] px-3 py-2.5 text-sm text-neutral-100 outline-none border border-[#1e3a5a] focus:border-[#C9A96E] focus-visible:ring-2 focus-visible:ring-[#C9A96E] placeholder:text-neutral-500";

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-[#1e3a5a] pb-6">
          <motion.div
            className="mb-3 flex items-center gap-2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
            <span className="text-xs font-semibold tracking-wide text-[#C9A96E]">Interactive designer</span>
          </motion.div>
          <motion.h1
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-white sm:text-4xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Design your steel building
          </motion.h1>
          <motion.p
            className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            Dial in dimensions, roof, materials, and openings — every view updates live. When it
            looks right, download the spec sheet or request a free, engineered quote.
          </motion.p>
        </header>

        <BuildingConfigurator onQuoteRequest={(spec, specText) => { setPending({ spec, specText }); setStatus("idle"); }} />
      </div>
      <DesignTips />

      {/* Quote contact modal */}
      <AnimatePresence>
        {pending && (
          <>
            <motion.div
              key="backdrop"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={close}
            >
              <motion.div
                key="panel"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18, ease: [0.36, 0, 1, 0.36] } }}
                className="w-full max-w-md rounded-xl border border-[#1e3a5a] bg-[#162336] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {status === "done" ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A96E]/15 text-2xl text-[#C9A96E]">✓</div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">Quote sent</h2>
                    <p className="mt-2 text-sm text-neutral-400">
                      Your build and spec sheet are on their way to our team. We&apos;ll follow up shortly with pricing.
                    </p>
                    <button onClick={close} className="mt-6 w-full rounded-md bg-[#C9A96E] py-2.5 text-sm font-bold text-[#0d1b2a] transition-colors hover:bg-[#b8954f]">
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit}>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">Request your quote</h2>
                        <p className="mt-1 text-sm text-neutral-400">We&apos;ll email your build to our team and follow up with pricing.</p>
                      </div>
                      <button type="button" onClick={close} aria-label="Close" className="text-neutral-500 hover:text-neutral-300">✕</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input className={inputCls} placeholder="First name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                      <input className={inputCls} placeholder="Last name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    </div>
                    <input className={`${inputCls} mt-3`} type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input className={`${inputCls} mt-3`} type="tel" placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <textarea className={`${inputCls} mt-3`} rows={3} placeholder="Anything else we should know? (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                    {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
                    <button type="submit" disabled={status === "sending"} className="mt-5 w-full rounded-md bg-[#C9A96E] py-3 text-sm font-bold text-[#0d1b2a] transition-colors hover:bg-[#b8954f] disabled:opacity-60">
                      {status === "sending" ? "Sending…" : "Send my quote request"}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-neutral-500">Your spec sheet is attached automatically. No spam.</p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

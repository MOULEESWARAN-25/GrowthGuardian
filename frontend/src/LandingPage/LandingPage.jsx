/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { Target, ArrowRight, ShieldCheck, TrendingUp, BookOpen, Zap, Lock, BrainCircuit } from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const TRUST_STATS = [
  { metric: "70B", label: "Parameters", desc: "Llama 3.3 via Groq" },
  { metric: "< 1s", label: "Response Time", desc: "Edge AI Architecture" },
  { metric: "100%", label: "Encrypted", desc: "Zero-knowledge Auth" },
  { metric: "24/7", label: "AI Monitoring", desc: "Algorithmic Scanning" },
];

const FEATURES = [
  {
    icon: TrendingUp,
    accent: "#4f6ef7",
    title: "Algorithmic Precision",
    desc: "Predict asset performance with vectorized probability matrices processing thousands of market signals in real-time — entirely client-side.",
  },
  {
    icon: ShieldCheck,
    accent: "#10b981",
    title: "Generative Defense",
    desc: "Advanced phishing & scam detection powered by a 70B parameter model that intercepts threats before your money moves.",
  },
  {
    icon: BrainCircuit,
    accent: "#a855f7",
    title: "Adaptive Intelligence",
    desc: "Self-evolving financial literacy modules that tailor every lesson to your unique spending patterns and investment goals.",
  },
];

const SOCIAL_PROOF = [
  { name: "Arjun S.", role: "Freelancer", text: "The scam prevention AI saved me from a ₹2L phishing attack. Within seconds it flagged every red flag." },
  { name: "Priya R.", role: "Student Investor", text: "Asset Forecast gave me clarity on my SIP returns. The charts are crisp and the AI explanations are spot-on." },
  { name: "Karan M.", role: "Finance Enthusiast", text: "Finally a fintech dashboard that doesn't feel like a bank from 2010. The UX is exceptional." },
];

const LandingPage = () => {
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to([title1Ref.current, title2Ref.current, title3Ref.current], {
        y: 0, opacity: 1, duration: 1.3, stagger: 0.16, ease: "power4.out",
      }).fromTo(".hero-sub",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
        "-=0.8"
      );

      gsap.utils.toArray('.feature-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 86%", toggleActions: "play none none reverse" }
          }
        );
      });

      gsap.fromTo(".trust-stat",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".trust-row", start: "top 88%" }
        }
      );

      gsap.fromTo(".social-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".social-row", start: "top 88%" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans relative"
      style={{ background: "#04040a", color: "rgba(255,255,255,0.55)" }}
    >
      {/* === Subtle grain overlay === */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* === FIXED HEADER === */}
      <header
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 flex justify-between items-center"
        style={{
          height: "68px",
          background: "rgba(4,4,10,0.72)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.18 265), oklch(0.48 0.18 265))",
              boxShadow: "0 0 20px oklch(0.65 0.18 265 / 0.35)",
            }}
          >
            <Target size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[17px] font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
            Growth<span style={{ color: "oklch(0.72 0.18 265)" }}>Guardian</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.48)" }}>
          {["Platform", "Intelligence", "Security"].map(n => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className="transition-colors hover:text-white"
            >
              {n}
            </a>
          ))}
        </nav>

        <Link
          to="/"
          className="px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.94)",
            color: "#04040a",
            boxShadow: "0 0 40px rgba(255,255,255,0.12)",
          }}
        >
          Open App →
        </Link>
      </header>

      {/* === HERO === */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "900px", height: "900px",
            background: "radial-gradient(ellipse at center, oklch(0.65 0.18 265 / 0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 pointer-events-none"
          style={{
            width: "600px", height: "400px",
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)",
          }}
        />

        <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-[1060px] mx-auto flex flex-col items-center">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-[11px] font-bold tracking-[0.18em] uppercase hero-sub"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.65 0.18 265)", boxShadow: "0 0 8px oklch(0.65 0.18 265)" }} />
            Powered by Llama 3.3 · 70B Parameters
          </div>

          {/* Hero Headline */}
          <h1
            className="font-bold leading-none tracking-tight mb-8"
            style={{ fontSize: "clamp(52px, 9vw, 118px)", letterSpacing: "-0.04em" }}
          >
            <span
              ref={title1Ref}
              className="block"
              style={{ opacity: 0, transform: "translateY(40px)", color: "rgba(255,255,255,0.95)" }}
            >
              Absolute
            </span>
            <span
              ref={title2Ref}
              className="block"
              style={{ opacity: 0, transform: "translateY(40px)", color: "rgba(255,255,255,0.65)" }}
            >
              Financial
            </span>
            <span
              ref={title3Ref}
              className="block italic font-light"
              style={{
                opacity: 0, transform: "translateY(40px)",
                fontFamily: "Georgia, serif",
                color: "oklch(0.68 0.18 265)",
                letterSpacing: "-0.02em",
                fontSize: "clamp(48px, 8.5vw, 112px)",
              }}
            >
              Mastery.
            </span>
          </h1>

          <p
            className="hero-sub max-w-2xl mb-12 font-medium leading-relaxed"
            style={{ fontSize: "clamp(15px, 2vw, 20px)", color: "rgba(255,255,255,0.42)" }}
          >
            The premier wealth architecture platform. Uncompromising security powered by generative AI protocols natively scanning your assets 24/7.
          </p>

          <div className="hero-sub flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/"
              className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[14px] tracking-wide transition-all hover:scale-[1.03]"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#04040a",
                boxShadow: "0 0 60px rgba(255,255,255,0.12)",
              }}
            >
              Launch Application
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#intelligence"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[14px] tracking-wide transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.65)" }}
            >
              <Zap size={15} /> Explore Features
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))" }} />
        </div>
      </section>

      {/* === TRUST STATS === */}
      <section className="trust-row py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#030308" }}>
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUST_STATS.map((item, i) => (
            <div
              key={i}
              className="trust-stat flex flex-col gap-2 opacity-0"
              style={{ paddingLeft: "28px", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                className="font-bold leading-none"
                style={{ fontSize: "clamp(42px, 6vw, 66px)", letterSpacing: "-0.04em", color: "rgba(255,255,255,0.88)" }}
              >
                {item.metric}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "oklch(0.65 0.18 265)" }}>
                {item.label}
              </span>
              <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.32)" }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="intelligence" className="py-40 px-8" style={{ background: "#04040a" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "oklch(0.65 0.18 265)" }}>Platform</p>
            <h2
              className="font-semibold leading-tight mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 58px)", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.9)" }}
            >
              Uncompromising intelligence.<br />
              <span style={{ color: "rgba(255,255,255,0.32)" }}>Architected for clarity.</span>
            </h2>
            <p className="max-w-xl text-[17px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              We stripped away the noise to deliver mathematically pure dashboards. No bloat. Fully embedded AI routing data directly to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="feature-card opacity-0 group relative rounded-[28px] p-9 flex flex-col justify-end transition-all duration-500 overflow-hidden"
                style={{
                  height: "380px",
                  background: "#090911",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = `1px solid ${feat.accent}30`;
                  e.currentTarget.style.boxShadow = `0 0 60px ${feat.accent}14, 0 20px 60px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Background accent glow */}
                <div
                  className="absolute top-0 right-0 w-[280px] h-[280px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at top right, ${feat.accent}0d 0%, transparent 60%)` }}
                />

                {/* Icon */}
                <div
                  className="absolute top-9 left-9 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `${feat.accent}12`,
                    border: `1px solid ${feat.accent}25`,
                    color: feat.accent,
                  }}
                >
                  <feat.icon size={26} strokeWidth={1.8} />
                </div>

                <div className="transition-transform duration-500 group-hover:-translate-y-2">
                  <h3
                    className="text-[22px] font-semibold mb-3 tracking-tight"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.42)" }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SOCIAL PROOF === */}
      <section className="py-32 px-8" style={{ background: "#030308", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "oklch(0.65 0.18 265)" }}>Trusted by Users</p>
            <h2
              className="font-semibold"
              style={{ fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.82)" }}
            >
              Real results. Real people.
            </h2>
          </div>

          <div className="social-row grid md:grid-cols-3 gap-6">
            {SOCIAL_PROOF.map((item, i) => (
              <div
                key={i}
                className="social-card opacity-0 rounded-[22px] p-7 flex flex-col gap-5 transition-all duration-300"
                style={{
                  background: "#090911",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"}
              >
                <p className="text-[14px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                  "{item.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: "oklch(0.65 0.18 265 / 0.15)", color: "oklch(0.72 0.18 265)" }}
                  >
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.78)" }}>{item.name}</p>
                    <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.32)" }}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA BAND === */}
      <section className="py-28 px-8" style={{ background: "#04040a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          className="max-w-[700px] mx-auto text-center relative rounded-[32px] px-10 py-16 overflow-hidden"
          style={{
            background: "#090911",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, oklch(0.65 0.18 265 / 0.08) 0%, transparent 60%)" }}
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4 relative z-10" style={{ color: "oklch(0.65 0.18 265)" }}>
            Get Started
          </p>
          <h2
            className="font-bold mb-5 relative z-10"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.9)" }}
          >
            Your wealth fortress starts here.
          </h2>
          <p className="mb-10 text-[15px] leading-relaxed relative z-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.38)" }}>
            Join thousands of users leveraging AI to protect, grow, and understand their finances.
          </p>
          <Link
            to="/"
            className="relative z-10 inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-[14px] tracking-wide transition-all hover:scale-[1.04]"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#04040a",
              boxShadow: "0 0 60px rgba(255,255,255,0.15)",
            }}
          >
            Launch GrowthGuardian <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-14 px-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#030308" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.9)" }}
            >
              <Target size={14} style={{ color: "#04040a" }} />
            </div>
            <span className="font-bold text-[16px]" style={{ color: "rgba(255,255,255,0.8)" }}>GrowthGuardian</span>
          </div>
          <div className="flex items-center gap-8 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.28)" }}>
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
            <span>© 2026 GrowthGuardian</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

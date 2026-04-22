"use client";

import Link from "next/link";
import { ArrowRight, Brain, Lightbulb, MessageSquare, Code, Target, Award, ChevronDown, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView, type Variants, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Magnetic from "@/components/ui/Magnetic";

// ─── Counter Animation Hook ───
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted) return;
    
    setHasStarted(true);
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - easeOutExpo
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(end * easeOutExpo));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView, hasStarted]);

  return { count, ref };
}

// ─── Smooth Parallax Hook ───
function useSmoothParallax(factor: number = 0.5) {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothY, (value) => value * factor);
  return y;
}

// ─── Animation Variants ───
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

// ─── Group Companies Data ───
const groupCompanies = [
  {
    num: "01",
    title: "IT 솔루션 공급",
    subtitle: "고객 니즈에 맞는 최상의 솔루션을 제공",
    desc: "AI블록코딩, 파이썬, 생성형 AI 등 다양한 교육 프로그램",
    color: "#f72585"
  },
  {
    num: "02",
    title: "디지털 트랜스포메이션",
    subtitle: "고객 비즈니스 경쟁력 강화를 위한 디지털 전환 동반자",
    desc: "미래 교육 방향 제시와 커리큘럼 컨설팅",
    color: "#00d4ff"
  },
  {
    num: "03",
    title: "SMART LEARNING",
    subtitle: "에티버스의 글로벌 IT 경험을 활용한 최신 IT 전문 교육",
    desc: "KT와이즈교육 공식 강사진의 체계적인 교육",
    color: "#ff6a00"
  },
  {
    num: "04",
    title: "AI 인재 양성",
    subtitle: "글로벌 ICT 인재 양성 프로그램",
    desc: "AICE Future 자격증 취득 지원",
    color: "#7b2fff"
  }
];

// ─── News Data ───
const newsData = [
  {
    date: "2026.03.31",
    category: "교육 소식",
    title: "AI 블록코딩 신규 커리큘럼 런칭",
    desc: "아이들의 창의적 사고력을 키우는 새로운 AI 블록코딩 교육 과정을 시작합니다."
  },
  {
    date: "2026.03.25",
    category: "자격증",
    title: "AICE Future 3급 합격자 배출",
    desc: "마이유틱 AI 에듀의 체계적인 교육을 통해 다수의 학생들이 자격증 취득에 성공했습니다."
  },
  {
    date: "2026.03.20",
    category: "파트너십",
    title: "KT와이즈교육 공식 파트너 선정",
    desc: "질 높은 AI 교육 콘텐츠 제공을 위한 공식 파트너십을 체결했습니다."
  }
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax effects
  const heroParallax = useSmoothParallax(-0.3);
  const textParallax = useSmoothParallax(-0.1);
  
  // Counter values
  const yearsCounter = useCountUp(5, 2500);
  const studentsCounter = useCountUp(500, 2500);
  const programsCounter = useCountUp(12, 2000);
  
  // Background parallax for hero
  const bgY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Mouse tracking for hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: "#07050f" }}>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Full Screen with Large Title
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Animated Background */}
        <motion.div 
          style={{ y: bgY, opacity: bgOpacity }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/neon-cloud-bg.jpg')",
              filter: "brightness(0.4)"
            }}
          />
          
          {/* Animated gradient overlay */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 30% 40%, rgba(247,37,133,0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 70% 60%, rgba(0,212,255,0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 30% 40%, rgba(247,37,133,0.15) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
        </motion.div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px"
          }}
        />

        {/* Floating orbs with mouse tracking */}
        <motion.div
          style={{ 
            x: mousePosition.x * 2,
            y: mousePosition.y * 2
          }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{ 
              background: "radial-gradient(circle, rgba(247,37,133,0.2) 0%, transparent 70%)",
              filter: "blur(60px)"
            }}
          />
        </motion.div>
        
        <motion.div
          style={{ 
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5
          }}
          className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{ 
              background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
              filter: "blur(60px)"
            }}
          />
        </motion.div>

        {/* Main Title Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Small subtitle */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span 
                className="inline-block text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                style={{ color: "#64748b" }}
              >
                Challenge for Transformation
              </span>
            </motion.div>
            
            {/* Large Title - ETEVERS Style */}
            <motion.h1 
              variants={fadeInUp}
              className="relative"
            >
              <motion.span 
                className="block text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tight text-white leading-none"
                style={{ 
                  textShadow: "0 0 80px rgba(247,37,133,0.3)",
                }}
              >
                MAIEUTIC
              </motion.span>
              <motion.span 
                className="block text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.2em] mt-2"
                style={{ 
                  background: "linear-gradient(135deg, #f72585, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none"
                }}
              >
                AI EDU
              </motion.span>
            </motion.h1>
            
            {/* Tagline */}
            <motion.p 
              variants={fadeInUp}
              className="mt-8 text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: "#94a3b8" }}
            >
              질문하고 토론하며 스스로 생각하는 AI·코딩 교육
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span 
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#64748b" }}
          >
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" style={{ color: "#f72585" }} />
          </motion.div>
        </motion.div>

        {/* Side decorative lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute left-8 top-1/4 w-px h-1/2 origin-top hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(247,37,133,0.5), transparent)" }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute right-8 top-1/4 w-px h-1/2 origin-top hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.5), transparent)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRANSFORMATION SECTION - Philosophy Intro
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: "#0a0814" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Text Content */}
            <motion.div variants={slideInLeft}>
              <span 
                className="text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "#f72585" }}
              >
                Challenge for Transformation
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                끊임없는 미래 지향적인<br />
                <span className="gradient-text-neon">발상의 전환</span>으로
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                아이들이 단순히 기술을 따라하는 것이 아니라,
                철학적 질문을 통해 사고의 구조를 세우고 
                코딩으로 표현하게 합니다.
                다음 세대를 위한 AI 교육과 서비스를 준비합니다.
              </p>
              <Magnetic>
                <Link href="/philosophy">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center space-x-2 font-semibold"
                    style={{ color: "#00d4ff" }}
                  >
                    <span>교육 철학 알아보기</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </Magnetic>
            </motion.div>

            {/* Right - Visual Element */}
            <motion.div variants={slideInRight} className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    border: "1px solid rgba(247,37,133,0.3)",
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full"
                  style={{ 
                    border: "1px dashed rgba(0,212,255,0.3)",
                  }}
                />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ 
                      background: "rgba(247,37,133,0.1)",
                      boxShadow: "0 0 60px rgba(247,37,133,0.3)"
                    }}
                  >
                    <Lightbulb className="w-16 h-16" style={{ color: "#f72585" }} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS SECTION - Counter Animation (ETEVERS Style)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: "#07050f" }}>
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(ellipse at center, rgba(247,37,133,0.05) 0%, transparent 70%)"
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeIn} className="text-lg mb-2" style={{ color: "#64748b" }}>
              끊임없이 변화해 온 AI 교육의 중심에서
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white">
              마이유틱 AI 에듀는 학생들과 함께 성장해왔습니다
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Stat 1 */}
            <motion.div 
              variants={scaleUp}
              className="text-center p-8 rounded-2xl relative overflow-hidden group"
              style={{ background: "rgba(13,10,26,0.6)", border: "1px solid rgba(247,37,133,0.15)" }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at center, rgba(247,37,133,0.1) 0%, transparent 70%)" }}
              />
              <p className="text-sm font-medium mb-2 tracking-wider" style={{ color: "#f72585" }}>
                교육 경력
              </p>
              <p className="text-xs mb-4" style={{ color: "#64748b" }}>풍부한 교육 경험</p>
              <div className="text-6xl md:text-7xl font-black text-white relative z-10">
                <span ref={yearsCounter.ref}>{yearsCounter.count}</span>
                <span className="text-3xl" style={{ color: "#f72585" }}>년</span>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              variants={scaleUp}
              className="text-center p-8 rounded-2xl relative overflow-hidden group"
              style={{ background: "rgba(13,10,26,0.6)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at center, rgba(0,212,255,0.1) 0%, transparent 70%)" }}
              />
              <p className="text-sm font-medium mb-2 tracking-wider" style={{ color: "#00d4ff" }}>
                누적 수강생
              </p>
              <p className="text-xs mb-4" style={{ color: "#64748b" }}>함께 성장한 학생들</p>
              <div className="text-6xl md:text-7xl font-black text-white relative z-10">
                <span ref={studentsCounter.ref}>{studentsCounter.count}</span>
                <span className="text-3xl" style={{ color: "#00d4ff" }}>+명</span>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              variants={scaleUp}
              className="text-center p-8 rounded-2xl relative overflow-hidden group"
              style={{ background: "rgba(13,10,26,0.6)", border: "1px solid rgba(255,106,0,0.15)" }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at center, rgba(255,106,0,0.1) 0%, transparent 70%)" }}
              />
              <p className="text-sm font-medium mb-2 tracking-wider" style={{ color: "#ff6a00" }}>
                교육 프로그램
              </p>
              <p className="text-xs mb-4" style={{ color: "#64748b" }}>체계적인 커리큘럼</p>
              <div className="text-6xl md:text-7xl font-black text-white relative z-10">
                <span ref={programsCounter.ref}>{programsCounter.count}</span>
                <span className="text-3xl" style={{ color: "#ff6a00" }}>개</span>
              </div>
            </motion.div>
          </motion.div>
          
          <p className="text-center mt-8 text-sm" style={{ color: "#475569" }}>
            2024년도 기준
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INNOVATION SECTION - Better Tomorrow
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: "#0d0a1a" }}>
        {/* Decorative background text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.02, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[20rem] font-black text-white whitespace-nowrap pointer-events-none"
          style={{ writingMode: "vertical-rl" }}
        >
          INNOVATION
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-20">
              <span 
                className="text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "#00d4ff" }}
              >
                Innovation for a Better Tomorrow
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                더 좋은 미래를<br />
                <span className="gradient-text-neon">가능하게 하는 혁신</span>
              </h2>
              <p className="text-lg max-w-2xl" style={{ color: "#94a3b8" }}>
                마이유틱 AI 에듀는 미래 목표 실현을 위해 현재의 실질적인 성과와 구체적인 변화를 추구합니다.
                각 분야에서 지속 가능한 가치를 창조해 나가는 마이유틱과 함께 미래를 현실로 만들어가는 여정을 함께해 보세요.
              </p>
            </motion.div>

            {/* Group Companies - Horizontal Cards */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-8">교육 프로그램</h3>
              <p className="text-base mb-8" style={{ color: "#64748b" }}>
                실질적인 AI 교육(디지털 트랜스포메이션)을 이끌어내는 통합적인 커리큘럼과 서비스를 제공합니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {groupCompanies.map((company, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${company.color}20`
                  }}
                  className="p-6 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-300 group"
                  style={{ 
                    background: "rgba(7,5,15,0.8)",
                    border: `1px solid ${company.color}20`
                  }}
                >
                  {/* Number */}
                  <span 
                    className="text-5xl font-black opacity-20 absolute top-4 right-4"
                    style={{ color: company.color }}
                  >
                    {company.num}
                  </span>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white mb-2">{company.title}</h4>
                    <p className="text-sm mb-4" style={{ color: company.color }}>{company.subtitle}</p>
                    <p className="text-sm" style={{ color: "#64748b" }}>{company.desc}</p>
                  </div>

                  {/* Hover line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: company.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PHILOSOPHY CARDS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32" style={{ background: "#07050f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              생각의 근육을 키우는 AI 교육
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-16 max-w-2xl mx-auto font-medium" style={{ color: "#64748b" }}>
              우리는 &apos;정답&apos;을 찾는 기계가 아닌, &apos;질문&apos;을 던지는 창조자를 길러냅니다.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MessageSquare className="h-12 w-12" style={{ color: "#f72585", filter: "drop-shadow(0 0 8px rgba(247,37,133,0.5))" }} />,
                  title: "질문과 토론",
                  desc: "철학적 질문을 통해 문제의 본질을 파악하고, 자신의 생각을 논리적으로 정리합니다.",
                  accent: "#f72585",
                  glow: "rgba(247,37,133,0.15)",
                },
                {
                  icon: <Brain className="h-12 w-12" style={{ color: "#00d4ff", filter: "drop-shadow(0 0 8px rgba(0,212,255,0.5))" }} />,
                  title: "논리적 사고",
                  desc: "코딩을 단순한 기능이 아닌, 사고를 구조화하고 문제를 해결하는 도구로 활용합니다.",
                  accent: "#00d4ff",
                  glow: "rgba(0,212,255,0.15)",
                },
                {
                  icon: <Code className="h-12 w-12" style={{ color: "#ff6a00", filter: "drop-shadow(0 0 8px rgba(255,106,0,0.5))" }} />,
                  title: "실천적 표현",
                  desc: "생각한 해결책을 블록코딩과 파이썬으로 구현하며 실질적인 결과물을 만들어냅니다.",
                  accent: "#ff6a00",
                  glow: "rgba(255,106,0,0.15)",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -10,
                    boxShadow: `0 0 40px ${item.glow}, 0 30px 60px rgba(0,0,0,0.5)`,
                    borderColor: item.accent,
                  }}
                  className="p-10 rounded-3xl text-left transition-all duration-300"
                  style={{
                    background: "rgba(13,10,26,0.8)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                >
                  <div
                    className="mb-8 p-4 inline-block rounded-2xl"
                    style={{ background: `${item.glow}`, border: `1px solid ${item.accent}30` }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-lg" style={{ color: "#64748b" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NEWS SECTION (ETEVERS Style)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32" style={{ background: "#0d0a1a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-between items-end mb-12"
            >
              <div>
                <span 
                  className="text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
                  style={{ color: "#f72585" }}
                >
                  NEWS
                </span>
                <h2 className="text-4xl font-bold text-white">최신 소식</h2>
              </div>
              <Magnetic>
                <Link href="/insight">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 font-semibold"
                    style={{ color: "#00d4ff" }}
                  >
                    <span>전체 보기</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </Magnetic>
            </motion.div>

            {/* News Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData.map((news, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  className="p-6 rounded-2xl cursor-pointer transition-all duration-300 group"
                  style={{ 
                    background: "rgba(7,5,15,0.8)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}
                >
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ 
                        background: "rgba(247,37,133,0.1)",
                        color: "#f72585"
                      }}
                    >
                      {news.category}
                    </span>
                    <span className="text-xs" style={{ color: "#475569" }}>
                      {news.date}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#f72585] transition-colors duration-300 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm line-clamp-3" style={{ color: "#64748b" }}>
                    {news.desc}
                  </p>
                  
                  {/* Read more link */}
                  <div className="mt-4 flex items-center space-x-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#00d4ff" }}>
                    <span>자세히 보기</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROGRAM PREVIEW SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32" style={{ background: "#07050f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            >
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  대표 프로그램
                </h2>
                <p className="text-xl font-medium" style={{ color: "#64748b" }}>
                  아이의 성장 단계에 맞춘 체계적인 AI 커리큘럼
                </p>
              </div>
              <Magnetic>
                <Link href="/programs">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="font-bold flex items-center space-x-2 text-lg"
                    style={{ color: "#f72585" }}
                  >
                    <span>전체 보기</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { tag: "입문", title: "AI 블록코딩 첫걸음", desc: "코디니와 함께하는 재미있는 AI 기초", level: "초등 저/고학년", accent: "#f72585", tagBg: "rgba(247,37,133,0.1)" },
                { tag: "자격증", title: "AICE Future 대비반", desc: "1/2/3급 자격증 취득 및 역량 강화", level: "초등/중등", accent: "#ff6a00", tagBg: "rgba(255,106,0,0.1)" },
                { tag: "심화", title: "생각하는 파이썬", desc: "논리 구조를 세우는 텍스트 코딩 수업", level: "중학생/고급", accent: "#00d4ff", tagBg: "rgba(0,212,255,0.1)" },
                { tag: "미래", title: "생성형 AI 리터러시", desc: "ChatGPT와 함께하는 창의적 프로젝트", level: "초등 고학년/중등", accent: "#7b2fff", tagBg: "rgba(123,47,255,0.1)" },
              ].map((program, index) => (
                <motion.div
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.03,
                    borderColor: program.accent,
                    boxShadow: `0 0 30px ${program.tagBg}, 0 20px 40px rgba(0,0,0,0.4)`,
                  }}
                  key={index}
                  className="p-8 rounded-3xl cursor-pointer transition-all duration-300"
                  style={{
                    background: "rgba(7,5,15,0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-6"
                    style={{ background: program.tagBg, color: program.accent }}
                  >
                    {program.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="mb-6 font-medium" style={{ color: "#64748b" }}>
                    {program.desc}
                  </p>
                  <div className="flex items-center text-sm font-semibold mt-auto" style={{ color: "#475569" }}>
                    <Target className="h-4 w-4 mr-2" style={{ color: program.accent }} />
                    {program.level}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: "#0a0814" }}>
        {/* Background effects */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(247,37,133,0.1) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white"
            >
              함께 고민하고 질문할 준비가 되었나요?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl mb-12 leading-relaxed"
              style={{ color: "#64748b" }}
            >
              마이유틱 AI 에듀와 함께 아이의 생각 근육을 키워주세요.
              <br className="hidden md:block" />
              질문이 있으시면 언제든 연락해 주세요.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Magnetic>
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center space-x-2 py-4 px-10 text-lg"
                  >
                    <span>출강 문의하기</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/programs">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center justify-center space-x-2 py-4 px-10 text-lg"
                  >
                    <span>프로그램 보기</span>
                  </motion.div>
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

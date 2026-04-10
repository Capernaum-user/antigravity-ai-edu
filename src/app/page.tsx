"use client";

import Link from "next/link";
import { ArrowRight, Brain, Lightbulb, MessageSquare, Code, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-20 md:py-32 overflow-hidden">
        {/* Animated background blobs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary-100 rounded-full blur-[100px] opacity-60 pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-secondary-100 rounded-full blur-[80px] opacity-50 pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-sm text-primary-600 border border-primary-100 text-sm font-semibold mb-8">
              <Award className="h-4 w-4" />
              <span>KT와이즈교육 AI블록코딩 공식 강사</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              질문하고 토론하며 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">스스로 생각하는</span><br/> 
              AI·코딩 수업
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              AI블록코딩, 파이썬, 생성형 AI, AICE Future 자격증까지. <br className="hidden md:block"/>
              아이들이 단순히 기술을 따라하는 것이 아니라, <br className="hidden md:block"/>
              철학적 질문을 통해 사고의 구조를 세우고 코딩으로 표현하게 합니다.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/programs">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary flex items-center justify-center space-x-2 py-4 px-8 text-lg shadow-lg shadow-primary/30">
                  <span>프로그램 보기</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
              <Link href="/classroom">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary flex items-center justify-center space-x-2 py-4 px-8 text-lg bg-white shadow-md border-slate-100">
                  <span>수업실 체험하기</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Name Meaning Storytelling Section */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 0.05, rotate: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none"
        >
          <Brain className="w-[600px] h-[600px]" />
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center gap-16"
          >
            <motion.div variants={fadeInUp} className="md:w-1/3 text-center">
              <motion.div 
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center p-6 bg-white/10 rounded-full mb-6 backdrop-blur-md border border-white/20"
              >
                <Lightbulb className="h-16 w-16 text-primary-300" />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">Maieutic</h2>
              <p className="text-primary-300 font-bold tracking-[0.3em] uppercase text-sm">[마이유틱]</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:w-2/3">
              <h3 className="text-3xl font-bold mb-6">왜 'Maieutic(마이유틱)'인가요?</h3>
              <p className="text-xl text-primary-100 leading-relaxed mb-6 font-medium">
                마이유틱(Maieutic)은 고대 그리스 철학자 소크라테스의 교육법인 <strong className="text-white border-b-2 border-primary-400 pb-1">산파술(조산술)</strong>을 뜻합니다. 
              </p>
              <p className="text-lg text-primary-200 leading-relaxed">
                우리는 아이들에게 그저 정답을 주입하지 않습니다. 대신 아이들이 내면에 가진 '생각의 씨앗'이 발아하도록 끊임없이 <strong>질문(Question)</strong>을 던집니다. 
                스스로 해답을 낳게 도와주는 과정, 그것이 바로 코딩보다 더 큰 세상을 배우는 Maieutic AI Edu의 철학입니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Summary Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">생각의 근육을 키우는 AI 교육</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto font-medium">
              우리는 '정답'을 찾는 기계가 아닌, '질문'을 던지는 창조자를 길러냅니다.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <MessageSquare className="h-12 w-12 text-primary" />, title: "질문과 토론", desc: "철학적 질문을 통해 문제의 본질을 파악하고, 자신의 생각을 논리적으로 정리합니다." },
                { icon: <Brain className="h-12 w-12 text-secondary" />, title: "논리적 사고", desc: "코딩을 단순한 기능이 아닌, 사고를 구조화하고 문제를 해결하는 도구로 활용합니다." },
                { icon: <Code className="h-12 w-12 text-accent" />, title: "실천적 표현", desc: "생각한 해결책을 블록코딩과 파이썬으로 구현하며 실질적인 결과물을 만들어냅니다." }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                  className="p-10 rounded-3xl border border-slate-100 bg-white text-left transition-all duration-300"
                >
                  <div className="mb-8 p-4 bg-slate-50 inline-block rounded-2xl">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Preview Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">대표 프로그램</h2>
                <p className="text-xl text-slate-600 font-medium">아이의 성장 단계에 맞춘 체계적인 AI 커리큘럼</p>
              </div>
              <Link href="/programs">
                <motion.div whileHover={{ x: 5 }} className="text-primary font-bold flex items-center space-x-2 text-lg">
                  <span>전체 보기</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { tag: "입문", title: "AI 블록코딩 첫걸음", desc: "코디니와 함께하는 재미있는 AI 기초", level: "초등 저/고학년", color: "bg-blue-50 text-blue-700" },
                { tag: "자격증", title: "AICE Future 대비반", desc: "1/2/3급 자격증 취득 및 역량 강화", level: "초등/중등", color: "bg-amber-50 text-amber-700" },
                { tag: "심화", title: "생각하는 파이썬", desc: "논리 구조를 세우는 텍스트 코딩 수업", level: "중학생/고급", color: "bg-primary-50 text-primary-700" },
                { tag: "미래", title: "생성형 AI 리터러시", desc: "ChatGPT와 함께하는 창의적 프로젝트", level: "초등 고학년/중등", color: "bg-purple-50 text-purple-700" }
              ].map((program, index) => (
                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  key={index} 
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm cursor-pointer"
                >
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-6 ${program.color}`}>{program.tag}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{program.title}</h3>
                  <p className="text-slate-600 mb-6 font-medium">{program.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-slate-400 mt-auto">
                    <Target className="h-4 w-4 mr-2" />
                    <span>{program.level}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">함께 고민하고 질문할 준비가 되었나요?</motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-300 text-xl mb-12 leading-relaxed">
              학교, 기관, 학부모님들의 다양한 교육 목적에 맞춘 최적화된 AI 수업을 제안해 드립니다.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20">
                  출강 및 수업 문의하기
                </motion.div>
              </Link>
              <Link href="/philosophy">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white/10 text-white backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                  교육 철학 더 읽어보기
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

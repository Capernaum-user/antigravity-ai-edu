import { Quote, CheckCircle2, Lightbulb, GraduationCap, Users } from "lucide-react";

export default function Philosophy() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            AI를 배우기 전에 <br/>
            <span className="text-primary-400">먼저 생각하는 법</span>을 배웁니다
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            코딩은 단순한 기술이 아닙니다. <br className="hidden md:block"/>
            자신의 생각을 세상에 구현해내는 가장 논리적인 언어입니다.
          </p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <Quote className="h-12 w-12 text-primary-200 mb-8" />
          <h2 className="text-3xl font-bold text-slate-900 mb-10 leading-snug">
            "정답을 맞히는 사람"이 아니라, <br/>
            "가치 있는 질문"을 던지는 사람으로.
          </h2>
          <div className="prose prose-lg text-slate-600 space-y-8">
            <p>
              AI가 수많은 정답을 순식간에 내놓는 시대입니다. 이제 중요한 것은 '어떻게 정답을 빨리 찾는가'가 아니라, 
              <strong>'어떤 질문이 우리 삶을 더 가치 있게 만드는가'</strong>입니다.
            </p>
            <p>
              Maieutic AI Edu는 아이들이 AI 기술의 파도에 휩쓸리지 않고, 스스로 생각의 키를 잡을 수 있도록 돕습니다. 
              우리의 수업은 단순한 기능 습득을 넘어 철학, 윤리, 과학, 논리를 AI 교육과 긴밀하게 연결합니다.
            </p>
            <p>
              아이들이 토론을 통해 문제의 본질을 파악하고, 그 해결책을 코딩으로 구현하며, 
              다시 그 결과가 우리 사회에 어떤 영향을 미칠지 성찰하는 과정. 
              이것이 진정한 의미의 미래 교육이라고 믿습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">5단계 사고 순환 시스템</h2>
            <p className="section-subtitle">질문에서 시작하여 성찰로 완성되는 깊이 있는 학습 경험</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "질문 (Question)", desc: "문제 상황에 대한 철학적/과학적 질문 던지기" },
              { step: "02", title: "토론 (Discussion)", desc: "다양한 관점에서 해결책 모색 및 논리 정교화" },
              { step: "03", title: "코딩 (Coding)", desc: "정리된 논리를 알고리즘과 코드로 직접 구현" },
              { step: "04", title: "해석 (Analysis)", desc: "실행 결과를 분석하고 오류와 한계 파악하기" },
              { step: "05", title: "성찰 (Reflection)", desc: "학습 내용이 삶과 사회에 주는 의미 되새기기" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <span className="text-primary-500 font-bold text-sm mb-4">{item.step}</span>
                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Psychology Integration */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">교육 공학적 기반의 커리큘럼</h2>
              <ul className="space-y-6">
                {[
                  { title: "아들러 개인심리학 기반", desc: "아이들의 자존감과 공동체 의식을 높이는 수평적 교육 지향" },
                  { title: "비고츠키 근접발달영역(ZPD)", desc: "적절한 스캐폴딩을 통해 아이의 잠재력을 최대한 발휘" },
                  { title: "구조주의 교육론", desc: "지식을 전달받는 것이 아니라 아이 스스로 지식을 재구성" }
                ].map((item, index) => (
                  <li key={index} className="flex space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-50 p-12 rounded-3xl relative overflow-hidden">
              <GraduationCap className="h-24 w-24 text-primary-200 absolute -bottom-4 -right-4" />
              <h3 className="text-2xl font-bold text-primary-900 mb-6">학부모님께 드리는 약속</h3>
              <p className="text-primary-800 leading-relaxed italic">
                "아이들이 코딩 기술 하나를 더 배우는 것보다, 세상을 바라보는 자신만의 관점을 가지는 것이 더 중요합니다. 
                기술은 변하지만, 스스로 생각하는 힘은 평생의 자산이 됩니다. 정성을 다해 아이들의 생각 근육을 함께 키우겠습니다."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Play, Info, MessageCircle, Lightbulb } from "lucide-react";

const SAMPLE_LESSONS = [
  {
    id: 1,
    title: "트롤리 딜레마와 AI의 선택",
    topic: "AI 윤리",
    steps: [
      { label: "오늘의 질문", content: "AI가 사람의 생명을 결정해야 한다면, 어떤 기준을 가져야 할까요?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "자율주행 자동차가 사고 상황에서 5명을 구할지 1명을 구할지 결정해야 합니다. AI는 어떻게 해야 할까요?", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "생명의 가치를 숫자로 계산할 수 있을까요? 알고리즘에 도덕을 담을 수 있을까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "블록코딩을 사용하여 다양한 상황에 따른 자율주행 알고리즘을 설계해봅시다.", icon: <Play className="h-5 w-5" /> }
    ]
  },
  {
    id: 2,
    title: "데이터를 믿어야 할까?",
    topic: "데이터 과학",
    steps: [
      { label: "오늘의 질문", content: "우리가 보는 데이터는 항상 진실만을 말할까요?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "아이스크림 판매량이 늘 때 익사 사고도 늘어난다는 통계가 있습니다. 아이스크림이 원인일까요?", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "상관관계와 인과관계의 차이는 무엇일까요? 데이터를 해석하는 우리의 편견은 무엇일까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "편향된 데이터를 학습시킨 AI 모델의 결과를 확인하고, 이를 보정하는 과정을 실습합니다.", icon: <Play className="h-5 w-5" /> }
    ]
  },
  {
    id: 3,
    title: "AI와 예술의 경계",
    topic: "창의성과 저작권",
    steps: [
      { label: "오늘의 질문", content: "AI가 그린 그림의 진짜 주인은 누구일까?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "AI가 수백만 장의 그림을 학습해 멋진 작품을 그렸습니다. 작가는 AI일까요, 프로그래머일까요?", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "창작의 기준은 무엇인가요? 노력 없이 만들어진 결과물도 예술이라 부를 수 있을까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "생성형 AI 도구를 활용해 나만의 주제로 그림을 그려보고, 프롬프트의 역할을 체험합니다.", icon: <Play className="h-5 w-5" /> }
    ]
  },
  {
    id: 4,
    title: "눈으로 보는 것이 진실일까?",
    topic: "디지털 리터러시",
    steps: [
      { label: "오늘의 질문", content: "우리가 보는 영상과 목소리는 항상 진짜일까요?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "친구의 얼굴과 목소리를 완벽하게 흉내 낸 가짜 영상이 인터넷에 올라왔습니다.", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "가짜와 진짜를 어떻게 구별할까요? 기술의 오용을 막기 위한 우리의 책임은 무엇일까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "딥페이크 탐지 원리를 배우고, 디지털 정보를 비판적으로 수용하는 방법을 연습합니다.", icon: <Play className="h-5 w-5" /> }
    ]
  },
  {
    id: 5,
    title: "로봇에게도 권리가 있을까?",
    topic: "로봇 윤리",
    steps: [
      { label: "오늘의 질문", content: "인간처럼 느끼고 생각하는 로봇도 생명체처럼 존중해야 할까?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "반려 로봇이 고장 나 버려지게 되었습니다. 로봇이 '버려지기 싫어'라고 말한다면?", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "권리는 어디에서 올까요? 감정을 흉내 내는 것과 실제로 느끼는 것의 차이는 무엇일까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "로봇 윤리 헌장을 직접 작성해보고, 인간과 기술의 공존 방안을 모색합니다.", icon: <Play className="h-5 w-5" /> }
    ]
  },
  {
    id: 6,
    title: "AI 면접관은 공정할까?",
    topic: "알고리즘과 사회",
    steps: [
      { label: "오늘의 질문", content: "AI는 사람보다 더 공평하게 판단할까요?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "채용 AI가 특정 지역 지원자를 자꾸 탈락시킵니다. 데이터에 편견이 섞여 있다면?", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "알고리즘은 정말 중립적일까요? 데이터의 편향성이 사회적 차별을 정당화할 수 있을까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "편향된 데이터를 학습시켜보고 결과의 차이를 직접 확인하는 시뮬레이션을 진행합니다.", icon: <Play className="h-5 w-5" /> }
    ]
  },
  {
    id: 7,
    title: "AI가 모든 일을 대신한다면?",
    topic: "미래와 진로",
    steps: [
      { label: "오늘의 질문", content: "미래에 AI가 인간의 일을 모두 대신한다면, 우리는 무엇을 해야 할까?", icon: <MessageCircle className="h-5 w-5" /> },
      { label: "상황 제시", content: "의사, 요리사, 작가까지 AI가 더 잘하게 되는 미래. 우리의 일상은 어떻게 바뀔까요?", icon: <Info className="h-5 w-5" /> },
      { label: "토론 포인트", content: "인간 고유의 가치는 무엇인가요? 기술과 경쟁하는 것이 아니라 협력하는 방법은 무엇일까요?", icon: <Lightbulb className="h-5 w-5" /> },
      { label: "실습 미션", content: "미래에 생겨날 새로운 직업을 상상해보고, 필요한 인간적 역량을 설계해봅니다.", icon: <Play className="h-5 w-5" /> }
    ]
  }
];

export default function Classroom() {
  const [activeLesson, setActiveLesson] = useState(SAMPLE_LESSONS[0]);

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="bg-white border-b py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center space-x-2 text-primary font-bold mb-2">
              <BookOpen className="h-5 w-5" /><span>실시간 수업실</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">질문으로 시작하는 AI 클래스</h1>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-4 overflow-y-auto max-h-[700px] no-scrollbar">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2">샘플 강의 목록</h3>
              {SAMPLE_LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    activeLesson.id === lesson.id 
                    ? "bg-primary-50 border-primary text-primary shadow-sm" 
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-semibold block mb-1 opacity-70">{lesson.topic}</span>
                  <span className="font-bold block leading-snug text-sm">{lesson.title}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b bg-slate-50">
                  <h2 className="text-2xl font-bold text-slate-900">{activeLesson.title}</h2>
                </div>
                
                <div className="p-8 space-y-12">
                  {activeLesson.steps.map((step, index) => (
                    <div key={index} className="flex space-x-6 relative">
                      {index !== activeLesson.steps.length - 1 && (
                        <div className="absolute left-6 top-14 bottom-0 w-px bg-slate-100"></div>
                      )}
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary z-10">
                        {step.icon}
                      </div>
                      <div className="pb-4 w-full">
                        <h4 className="text-sm font-bold text-primary-600 mb-2">{step.label}</h4>
                        <div className="text-slate-800 text-lg leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          {step.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span className="text-sm">이 수업을 성공적으로 마쳤다면, 자신의 생각을 정리해보세요.</span>
                  </div>
                  <Link href={`/classroom/journal?lessonId=${activeLesson.id}`} className="px-6 py-2 bg-white text-slate-900 rounded-lg font-bold text-sm block hover:bg-slate-100 transition-colors">
                    성장 일지 쓰기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

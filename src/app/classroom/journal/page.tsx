"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Smile, Meh, Frown, Sparkles, MessageCircle, Bug, Rocket, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function JournalForm() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lessonId') || '1';

  const [mood, setMood] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const moods = [
    { id: "great", icon: <Sparkles className="h-6 w-6" />, label: "짜릿해요" },
    { id: "good", icon: <Smile className="h-6 w-6" />, label: "배웠어요" },
    { id: "hmm", icon: <Meh className="h-6 w-6" />, label: "아리송해요" },
    { id: "hard", icon: <Frown className="h-6 w-6" />, label: "어려워요" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-24">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center max-w-lg w-full">
          <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">성장 일지가 저장되었습니다!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            오늘 남긴 질문과 생각이 훌륭한 배움의 씨앗이 될 거예요.<br/>
            수고 많으셨습니다.
          </p>
          <div className="space-y-3">
            <Link href="/classroom" className="btn-primary block w-full py-3">수업실로 돌아가기</Link>
            <Link href="/lab" className="text-primary-600 font-semibold block w-full py-3 hover:underline">질문 연구소로 가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <Link href="/classroom" className="inline-flex items-center text-primary-600 font-bold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 수업실로 돌아가기
        </Link>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="mb-6 flex justify-between items-center border-b pb-4">
              <span className="text-slate-400 font-medium">
                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </span>
              <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full uppercase">
                Maieutic Journal
              </span>
            </div>
            <input 
              type="text" 
              placeholder="오늘의 성장 일지 제목을 적어주세요!" 
              className="w-full text-3xl font-extrabold text-slate-900 border-none outline-none placeholder:text-slate-300"
              required
            />
          </div>

          {/* Mood Tracker */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 text-orange-500">😎</span>
              오늘 수업의 느낌은 어땠나요?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {moods.map(m => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                    mood === m.id ? "border-primary-500 bg-primary-50 text-primary-700" : "border-slate-100 bg-white text-slate-400 hover:border-primary-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="mb-2">{m.icon}</div>
                  <span className="text-sm font-bold">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Philosophy Question */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                <MessageCircle className="h-4 w-4" />
              </div>
              철학적 질문과 나의 생각
            </h3>
            <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm">
              💡 **힌트**: 오늘 가장 기억에 남는 질문이 무엇이었나요? 그 질문에 대해 정답이 아니라 '나만의 생각'을 자유롭게 적어보세요.
            </div>
            <textarea 
              rows={4} 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-700" 
              placeholder="예: AI가 면접관이라면 진짜 사람의 따뜻함을 파악할 수 있을지 궁금했다. 나는..."
              required
            ></textarea>
          </div>

          {/* Code & Troubleshooting */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mr-3 text-rose-600">
                <Bug className="h-4 w-4" />
              </div>
              코딩 실습과 트러블슈팅
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">내가 만든 작품 / 활동 요약</label>
              <input type="text" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="예: 무단횡단을 방지하는 스마트 신호등 알고리즘 작성" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">실수했거나 어려웠던 점, 그리고 어떻게 해결했나요?</label>
              <textarea rows={3} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" placeholder="예: 무한 루프에 빠져서 프로그램이 멈췄었는데, 반복 조건문을 수정하여 해결했다."></textarea>
            </div>
          </div>

          {/* Next Step */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-3 text-violet-600">
                <Rocket className="h-4 w-4" />
              </div>
              나의 다음 스텝
            </h3>
            <textarea rows={2} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none" placeholder="오늘 배운 것을 바탕으로 새롭게 만들어보고 싶은 것은 무엇인가요?"></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="btn-primary py-4 px-12 flex items-center text-lg shadow-lg hover:shadow-xl">
              <Save className="h-5 w-5 mr-2" />
              나의 생각 저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function JournalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">일지 양식을 불러오는 중입니다...</div>}>
      <JournalForm />
    </Suspense>
  );
}

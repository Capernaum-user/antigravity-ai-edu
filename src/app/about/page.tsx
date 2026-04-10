import { Award, BookOpen, GraduationCap, MapPin, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative border-4 border-white shadow-xl">
                {/* 강사 프로필 이미지 자리 */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <GraduationCap className="h-24 w-24" />
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full mb-4">
                Maieutic AI Edu 대표 강사
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-6">"질문하는 아이가 미래를 바꿉니다"</h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                안녕하세요. KT와이즈교육 소속 AI블록코딩 공식 강사입니다. <br/>
                저는 아이들이 단순히 기술을 소비하는 사용자를 넘어, 기술의 원리를 이해하고 <br/>
                가치 있는 질문을 던질 줄 아는 창조자로 성장하도록 돕고 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold">AICE Future 1/2/3급 보유</span>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold">KT와이즈교육 공식 강사</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Certs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-8 border-b pb-4">강사 이력 및 활동</h2>
              <ul className="space-y-6">
                {[
                  { title: "KT와이즈교육 AI블록코딩 전임 강사", date: "Present" },
                  { title: "서울/경기 지역 초·중학교 AI 특강 다수 출강", date: "Present" },
                  { title: "기관 맞춤형 AI 리터러시 캠프 기획 및 운영", date: "Present" },
                  { title: "AICE Future 자격 대비반 전문 지도", date: "Present" }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800">{item.title}</h4>
                      <p className="text-sm text-slate-400">활동 중</p>
                    </div>
                    <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-1 rounded">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-8 border-b pb-4">보유 자격 및 전문성</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "AICE Future 1급 (Expert)",
                  "AICE Future 2급 (Intermediate)",
                  "AICE Future 3급 (Basic)",
                  "AI 교육 전문가 과정 수료",
                  "코디니(Codiny) 활용 능력 우수"
                ].map((cert, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-slate-700">{cert}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-slate-500 italic">
                * 지속적인 역량 개발을 위해 AICE Basic 및 상위 자격 취득을 준비하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">교육의 미래를 함께 고민합니다</h2>
          <p className="text-primary-100 text-lg leading-relaxed">
            단순히 코딩을 가르치는 것을 넘어, 아동 심리학과 교육 공학적 관점을 바탕으로 <br/>
            아이들의 자존감과 공동체 의식을 함께 키우는 교육을 지향합니다. <br/>
            질문하고 토론하며 성장하는 기쁨을 아이들에게 선물하고 싶습니다.
          </p>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Target, BookOpen, Layers } from 'lucide-react';

const PROGRAMS_DATA: any = {
  'ai-block-intro': { title: 'AI 블록코딩 첫걸음', category: '입문', target: '초등 저학년/고학년', desc: '엔트리와 코디니를 활용하여 AI의 기본 원리를 쉽고 재미있게 배웁니다.', goals: ['인공지능의 기본 개념 이해', '블록코딩을 활용한 프로그램 제작', '데이터 학습의 원리 습득'], curriculum: ['1차시: 인공지능과 인사하기', '2차시: 소리를 듣고 반응하는 AI', '3차시: 이미지를 분류하는 AI', '4차시: 나만의 AI 프로젝트 완성'] },
  'aice-future': { title: 'AICE Future 완벽 대비', category: '자격증', target: '초등 고학년/중등', desc: 'KT AICE Future 자격증 취득을 위한 핵심 과정입니다.', goals: ['AICE Future 평가 항목 완벽 숙지', '실무형 AI 문제 해결 능력 배양', '자격증 취득을 통한 자신감 향상'], curriculum: ['1차시: 데이터의 이해와 수집', '2차시: 모델링 기초와 평가', '3차시: 기출문제 풀이 및 분석', '4차시: 모의고사 및 실전 대비'] }
};

export default async function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = PROGRAMS_DATA[id] || PROGRAMS_DATA['ai-block-intro'];
  return (
    <div className='bg-white min-h-screen pb-20'>
      <section className='bg-slate-900 text-white py-20'><div className='max-w-7xl mx-auto px-4'><Link href='/programs' className='flex items-center text-primary-400 mb-8 hover:text-primary-300'><ArrowLeft className='h-4 w-4 mr-2'/>목록으로</Link><h1 className='text-4xl font-bold mb-4'>{program.title}</h1><p className='text-slate-400 text-lg'>{program.desc}</p></div></section>
      <section className='py-20'><div className='max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12'>
        <div className='lg:col-span-2'><h2 className='text-2xl font-bold mb-8 flex items-center'><Target className='h-6 w-6 mr-2 text-primary'/>학습 목표</h2><ul className='space-y-4 mb-12'>{program.goals.map((g: any, i: number) => (<li key={i} className='flex items-start space-x-3'><CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0 mt-1'/><span>{g}</span></li>))}</ul><h2 className='text-2xl font-bold mb-8 flex items-center'><Layers className='h-6 w-6 mr-2 text-primary'/>커리큘럼 (예시)</h2><div className='bg-slate-50 rounded-2xl p-8 space-y-4'>{program.curriculum.map((c: any, i: number) => (<div key={i} className='p-4 bg-white rounded-xl border border-slate-100 font-medium'>{c}</div>))}</div></div>
        <div className='lg:col-span-1'><div className='bg-primary-50 p-8 rounded-3xl sticky top-24'><h3 className='text-xl font-bold text-primary-900 mb-6'>프로그램 정보</h3><div className='space-y-6 mb-8'><div className='flex items-center'><Clock className='h-5 w-5 text-primary mr-3'/><div><p className='text-xs text-primary-700'>수업 시간</p><p className='font-bold'>90분 x 4차시 (조절 가능)</p></div></div><div className='flex items-center'><BookOpen className='h-5 w-5 text-primary mr-3'/><div><p className='text-xs text-primary-700'>준비물</p><p className='font-bold'>개인 노트북 (태블릿 가능)</p></div></div></div><Link href='/contact' className='btn-primary w-full text-center'>상담 및 신청하기</Link></div></div>
      </div></section>
    </div>
  );
}

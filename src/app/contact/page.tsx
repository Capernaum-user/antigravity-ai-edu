'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    type: '학교/기관 출강 문의',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      alert('전송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center px-4'>
        <div className='max-w-md w-full text-center p-12 bg-white rounded-3xl shadow-xl border border-slate-100'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8'>
            <CheckCircle2 className='h-10 w-10' />
          </div>
          <h2 className='text-2xl font-bold text-slate-900 mb-4'>문의가 접수되었습니다!</h2>
          <p className='text-slate-600 mb-8'>보내주신 소중한 문의 내용을 확인한 후, <br/>빠른 시일 내에 회신 드리겠습니다.</p>
          <button onClick={() => window.location.href = '/'} className='btn-primary w-full'>홈으로 돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full bg-slate-50 min-h-screen'>
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            <div className='lg:col-span-1'>
              <h1 className='text-4xl font-bold text-slate-900 mb-6'>함께 교육을 <br/>만들어가요</h1>
              <div className='space-y-8 mt-12'>
                <div className='flex items-start space-x-4'>
                  <div className='p-3 bg-white rounded-xl shadow-sm'><Mail className='h-6 w-6 text-primary' /></div>
                  <div><h4 className='font-bold text-slate-900'>Email</h4><p className='text-slate-500 text-sm'>maieutic.edu@gmail.com</p></div>
                </div>
                <div className='flex items-start space-x-4'>
                  <div className='p-3 bg-white rounded-xl shadow-sm'><Phone className='h-6 w-6 text-primary' /></div>
                  <div><h4 className='font-bold text-slate-900'>Phone</h4><p className='text-slate-500 text-sm'>010-XXXX-XXXX (예약제)</p></div>
                </div>
              </div>
            </div>
            <div className='lg:col-span-2'>
              <div className='bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <input required className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl' placeholder='이름/담당자명' onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input required className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl' placeholder='학교/기관명' onChange={e => setFormData({...formData, organization: e.target.value})} />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <input required className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl' placeholder='연락처' onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input required className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl' placeholder='이메일' type='email' onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <select className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl' onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option>학교/기관 출강 문의</option><option>개인/소그룹 수업 문의</option><option>자격증 대비반 문의</option><option>기타</option>
                  </select>
                  <textarea required rows={5} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl' placeholder='문의 내용' onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
                  <button type='submit' disabled={loading} className='btn-primary w-full py-4 flex items-center justify-center space-x-2'>
                    {loading ? '전송 중...' : <><Send className='h-5 w-5' /><span>문의하기 제출</span></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

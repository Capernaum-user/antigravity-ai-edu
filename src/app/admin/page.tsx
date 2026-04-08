import { query } from '@/lib/db';
import { Download } from 'lucide-react';
export default async function Admin() {
  let inquiries: any = [];
  try { inquiries = await query('SELECT * FROM inquiries ORDER BY created_at DESC'); } catch(e) {}
  return (
    <div className='p-8 max-w-7xl mx-auto'>
      <div className='flex justify-between mb-8'>
        <h1 className='text-3xl font-bold'>관리자 대시보드</h1>
        <a href='/api/admin/export' className='flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg'>
          <Download className='h-4 w-4'/><span>엑셀 다운로드</span>
        </a>
      </div>
      <table className='w-full text-sm text-left border'>
        <thead className='bg-slate-50'><tr><th className='p-4'>날짜</th><th className='p-4'>이름</th><th className='p-4'>기관</th><th className='p-4'>유형</th><th className='p-4'>내용</th></tr></thead>
        <tbody>{inquiries.map((iq: any) => (<tr key={iq.id}><td className='p-4'>{new Date(iq.created_at).toLocaleDateString()}</td><td className='p-4 font-bold'>{iq.name}</td><td className='p-4'>{iq.organization}</td><td className='p-4'>{iq.type}</td><td className='p-4'>{iq.content}</td></tr>))}</tbody>
      </table>
    </div>
  );
}

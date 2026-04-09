import { query } from "@/lib/db";
import Link from "next/link";
import { Download, LayoutDashboard, Newspaper, ArrowRight } from "lucide-react";

export default async function Admin() {
  let inquiries: any = [];
  try {
    inquiries = await query("SELECT * FROM inquiries ORDER BY created_at DESC");
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center space-x-3">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-slate-900">관리 대시보드</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/insight"
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            <Newspaper className="h-4 w-4" />
            <span>AI 인사이트 관리</span>
          </Link>
          <a
            href="/api/admin/export"
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Download className="h-4 w-4" />
            <span>엑셀 다운로드</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">전체 문의</p>
          <p className="text-3xl font-bold text-slate-900">{inquiries.length}건</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">미답변 문의</p>
          <p className="text-3xl font-bold text-primary">{inquiries.length}건</p>
        </div>
        <Link href="/admin/insight" className="bg-primary-50 p-6 rounded-2xl border border-primary-100 shadow-sm group hover:bg-primary-100 transition-all">
          <p className="text-sm font-medium text-primary-700 mb-1">AI 인사이트 포스팅</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-primary-900">새 소식 올리기</p>
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">최근 접수된 문의 내역</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-white text-slate-400 font-semibold border-b">
              <tr>
                <th className="p-4 uppercase tracking-wider">날짜</th>
                <th className="p-4 uppercase tracking-wider">이름</th>
                <th className="p-4 uppercase tracking-wider">소속/기관</th>
                <th className="p-4 uppercase tracking-wider">유형</th>
                <th className="p-4 uppercase tracking-wider">문의 내용</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.map((iq: any) => (
                <tr key={iq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 whitespace-nowrap text-slate-500">
                    {new Date(iq.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-bold text-slate-900">{iq.name}</td>
                  <td className="p-4 text-slate-600">{iq.organization}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-bold">
                      {iq.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 max-w-md truncate">
                    {iq.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {inquiries.length === 0 && (
            <div className="text-center py-20 text-slate-400 font-medium">
              아직 접수된 문의 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { query } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Download, Calendar, Tag, FileText } from 'lucide-react';

export default async function InsightDetail({ params }: { params: { id: string } }) {
  const posts: any = await query('SELECT * FROM posts WHERE id = ?', [params.id]);
  const post = posts[0];

  if (!post) return <div className="text-center py-24">글을 찾을 수 없습니다.</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/insight" className="flex items-center text-primary font-bold mb-10 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 목록으로 돌아가기
        </Link>

        <div className="flex items-center space-x-3 mb-6">
          <span className="px-3 py-1 bg-primary-50 text-primary text-xs font-extrabold rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center text-slate-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-10 leading-tight">
          {post.title}
        </h1>

        {post.image_url && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <img src={post.image_url} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap mb-16">
          {post.content}
        </div>

        {post.file_url && (
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm"><FileText className="h-8 w-8 text-primary" /></div>
              <div><h4 className="font-bold text-slate-900">관련 자료 다운로드</h4><p className="text-sm text-slate-500">본 게시글과 관련된 추가 자료입니다.</p></div>
            </div>
            <a href={post.file_url} target="_blank" className="btn-primary flex items-center space-x-2">
              <Download className="h-4 w-4" /> <span>파일 받기</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

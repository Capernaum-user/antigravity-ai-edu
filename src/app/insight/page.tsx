import { query } from '@/lib/db';
import Link from 'next/link';
import { Newspaper, ArrowRight, Tag } from 'lucide-react';

export default async function InsightPage() {
  const posts: any = await query('SELECT * FROM posts ORDER BY created_at DESC');

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">AI 인사이트</h1>
          <p className="text-lg text-slate-600">최신 AI 기술 동향과 생성형 AI 활용법을 공유합니다.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              {post.image_url && (
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                  <Tag className="h-3 w-3" />
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3">{post.content?.replace(/<[^>]*>?/gm, '')}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-xs text-slate-400">{new Date(post.created_at).toLocaleDateString()}</span>
                  <Link href={`/insight/${post.id}`} className="text-primary font-bold text-sm flex items-center">
                    읽어보기 <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center py-24 text-slate-400">등록된 게시글이 없습니다.</div>
        )}
      </section>
    </div>
  );
}

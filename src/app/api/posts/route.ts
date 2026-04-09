import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const posts = await query('SELECT * FROM posts ORDER BY created_at DESC');
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, content, image_url, file_url } = body;
    await query(
      'INSERT INTO posts (title, category, content, image_url, file_url) VALUES (?, ?, ?, ?, ?)',
      [title, category, content, image_url, file_url]
    );
    return NextResponse.json({ message: 'Post created' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

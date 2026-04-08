import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
export async function GET() {
  const data: any = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
  let csv = '\ufeffID,Name,Org,Phone,Email,Type,Content,Date\n';
  data.forEach((iq: any) => {
    csv += [iq.id, iq.name, iq.organization, iq.phone, iq.email, iq.type, '', iq.created_at].join(',') + '\n';
  });
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename=inquiries.csv',
    },
  });
}

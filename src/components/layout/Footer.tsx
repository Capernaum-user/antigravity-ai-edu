import Link from "next/link";
import { BrainCircuit, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <BrainCircuit className="h-7 w-7 text-primary-400" />
              <span className="text-xl font-bold text-white tracking-tight">Maieutic <span className="text-primary-400">AI Edu</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              <strong>Maieutic(마이유틱)</strong>은 소크라테스의 산파술을 의미합니다.<br/>
              지식을 주입하는 것이 아니라, 끊임없는 질문을 통해 아이들 스스로 해답과 생각을 낳도록 돕는 미래 교육을 지향합니다.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">바로가기</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-primary-400">강사 소개</Link></li>
              <li><Link href="/philosophy" className="hover:text-primary-400">교육 철학</Link></li>
              <li><Link href="/programs" className="hover:text-primary-400">프로그램</Link></li>
              <li><Link href="/lab" className="hover:text-primary-400">질문 연구소</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">학습 지원</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/classroom" className="hover:text-primary-400">온라인 수업실</Link></li>
              <li><Link href="/resources" className="hover:text-primary-400">교육 자료실</Link></li>
              <li><Link href="/gallery" className="hover:text-primary-400">갤러리/성과</Link></li>
              <li><Link href="/admin" className="hover:text-primary-400">관리자</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>maieutic.edu@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>010-XXXX-XXXX (예약제)</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>서울/경기/온라인 전 지역 출강</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>© 2026 Maieutic AI Edu. All rights reserved. KT Wise AI Coding Instructor.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-white">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

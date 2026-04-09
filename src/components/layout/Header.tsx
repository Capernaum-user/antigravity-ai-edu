"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, BrainCircuit } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "교육 철학", href: "/philosophy" },
    { name: "프로그램", href: "/programs" },
    { name: "질문 연구소", href: "/lab" },
    { name: "AI 인사이트", href: "/insight" },
    { name: "수업실", href: "/classroom" },
    { name: "문의하기", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">Antigravity <span className="text-primary">AI Edu</span></span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-slate-600 hover:text-primary font-medium transition-colors text-sm">
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary py-2 px-5 text-xs">출강 문의</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary rounded-md" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wind, User } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Inicio', href: '#' },
    { name: 'Beneficios', href: '#about' },
    { name: 'Arquitectura', href: '#tech' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#32b24b] flex items-center justify-center text-white shadow-md shadow-[#32b24b]/20">
              <Wind size={20} />
            </div>
            Air<span className="text-[#32b24b]">Watch</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-500 hover:text-sky-500 transition-colors">
                {link.name}
              </a>
            ))}
            <div className="w-px h-6 bg-slate-200"></div>
            <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
              <User size={16} /> Entrar
            </Link>
            <LiquidButton href="#contact" size="default" className="px-6">
              Comprar Ahora
            </LiquidButton>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full bg-white border-b border-slate-200/50 shadow-2xl z-40 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-slate-600 hover:text-sky-500"
                >
                  {link.name}
                </a>
              ))}
              <div className="w-full h-px bg-slate-100 my-2"></div>
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 text-lg font-bold text-sky-600 hover:text-sky-700 w-full py-3 bg-sky-50 rounded-xl"
              >
                <User size={20} /> Iniciar Sesión
              </Link>
              <LiquidButton href="#contact" onClick={() => setIsOpen(false)} size="default" className="mt-2 flex justify-center py-4 rounded-2xl h-auto text-lg">
                Comprar Ahora
              </LiquidButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

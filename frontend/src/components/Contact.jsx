import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, GitBranch, Code2 } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';

export default function Contact() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer id="contact" ref={ref} className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-sky-50 rounded-2xl mx-auto flex items-center justify-center text-sky-500 mb-8 border border-sky-100 shadow-xl shadow-sky-500/10">
             <Mail size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 mb-8 leading-none">
            Empieza a <br className="hidden md:block"/> monitorear hoy.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-16 font-medium max-w-xl mx-auto px-4">
            ¿Representas a las autoridades de salud, protección civil o Global Water Watch México? Contacta a los investigadores.
          </p>

          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative">
                <label className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all font-medium"
                  required
                />
              </div>
              <div className="relative">
                <label className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  placeholder="hola@empresa.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Mensaje</label>
              <textarea
                placeholder="Cuéntanos cómo podemos ayudarte con el monitoreo ambiental..."
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all font-medium resize-none shadow-sm"
                required
              ></textarea>
            </div>

            <LiquidButton type="submit" size="xxl" className="w-full mt-4">
              Contactar con el equipo
            </LiquidButton>
          </form>

          <div className="mt-32 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-sm">
            <p className="text-slate-400 font-medium">© {new Date().getFullYear()} Air Watch | Sede Admva: Pachuca de Soto, Hgo. - Sede Operativa: Ixmiquilpan, Hgo.</p>
            <div className="flex gap-6 mt-6 md:mt-0">
              <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors">
                <GitBranch size={18} /> Github
              </a>
              <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors">
                <Code2 size={18} /> Código Hardware
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}


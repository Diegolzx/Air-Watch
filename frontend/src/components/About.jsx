import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Wind, Activity, Zap } from 'lucide-react';

const blocks = [
  {
    id: 1,
    title: 'Detección de Gases Tóxicos',
    description: 'Sensores MEMS (SGP41, MiCS-5524) cuantifican concentraciones de H₂S, Metano y COVs en ppm y ppb.',
    icon: <Wind size={36} className="text-cyan-500" />,
    style: "md:col-span-2 md:col-start-1 md:row-start-1"
  },
  {
    id: 2,
    title: 'Autonomía NB-IoT',
    description: 'Equipado con Lilygo T-SIM7070G. Transmisión directa a la nube sin depender del Wi-Fi local.',
    icon: <Activity size={36} className="text-sky-500" />,
    style: "md:col-start-3 md:row-start-1"
  },
  {
    id: 3,
    title: 'Diseño para Extremos',
    description: 'Gabinete con protección IP65 y membranas de PTFE. Resiste entornos altamente corrosivos como los canales de aguas residuales.',
    icon: <Zap size={36} className="text-amber-500" />,
    style: "md:col-span-2 md:col-start-1 md:row-start-2"
  },
  {
    id: 4,
    title: 'Datos Hiperlocales',
    description: 'Monitoreo específico para zonas afectadas como El Bondho, Mixquiahuala.',
    icon: <Leaf size={36} className="text-emerald-500" />,
    style: "md:col-start-3 md:row-start-2"
  }
];

export default function About() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="about" ref={ref} className="py-32 bg-slate-50 relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-none">
            La amenaza invisible. <br className="hidden md:block" />
            Cuantificada.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium px-4">
            Los canales de aguas residuales actúan como reactores químicos a la intemperie. Pasa de la dependencia olfativa a datos científicos hiperlocales.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 max-w-5xl mx-auto">
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group bg-white rounded-[2rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${block.style}`}
            >
              <div>
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-sky-50 mb-8 overflow-hidden group-hover:scale-110 transition-transform">
                  {block.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">{block.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{block.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

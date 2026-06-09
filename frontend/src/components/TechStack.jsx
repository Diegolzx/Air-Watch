import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Box, Cpu, Fingerprint } from 'lucide-react';

const techDetails = [
  {
    icon: <Fingerprint className="text-blue-500 w-8 h-8" />,
    title: 'Hardware Lilygo T-SIM7070G',
    spec: 'NB-IoT Cell',
    desc: 'Microcontrolador avanzado de bajo consumo enfocado en comunicación máquina a máquina (M2M) con despliegue autónomo.',
  },
  {
    icon: <Cpu className="text-cyan-500 w-8 h-8" />,
    title: 'Sensores MEMS y MOX',
    spec: 'Hardware de captura',
    desc: 'Uso de SGP41, MiCS-5524 y SHT31 para identificar humedad, temperatura, NOx, Metano y parámetros críticos ambientales.',
  },
  {
    icon: <Layers className="text-sky-500 w-8 h-8" />,
    title: 'InfluxDB TSDB',
    spec: 'Almacenamiento Temporal',
    desc: 'Estructura robusta capaz de correlacionar aumentos de la temperatura (radiación solar) con los picos de emisión de gases.',
  },
  {
    icon: <Box className="text-emerald-500 w-8 h-8" />,
    title: 'Grafana & Node-RED',
    spec: 'Broker y Visualización',
    desc: 'Algoritmos de gestión energética programados mediante C/C++ despachando a la nube mediante comandos AT.',
  },
];

export default function TechStack() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tech" ref={ref} className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-sm font-semibold text-slate-500 mb-8 border border-slate-200">
              TECNOLOGÍA NB-IOT
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.1]">
              Ingeniería <br className="hidden md:block" />
              sobre IP65. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Completamente Autónomo.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
              Diseñado para el Valle del Mezquital. Construido sobre un ensamblaje robusto con membranas de Teflón (PTFE) que protegen los circuitos de la sulfato-reducción y metanogénesis.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 relative">
            {techDetails.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200/60 hover:shadow-2xl hover:shadow-sky-100 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">{tech.title}</h4>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-500 mb-4">{tech.spec}</div>
                <p className="text-slate-500 font-medium leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

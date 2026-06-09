import React from 'react';
import { ShoppingCart, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { user } = useAuth();
  // Si no ha iniciado sesión, que cree cuenta o inicie. Si ya lo hizo, mandarlo a su panel para procesar
  const actionRoute = user ? "/panel" : "/registro";

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden" id="pricing">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#32b24b]/20 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Adquiere tu Sistema <span className="text-[#32b24b]">Air Watch</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Soluciones adaptables y escalables para la vigilancia de la calidad del aire. Desde pruebas iniciales hasta implementaciones gubernamentales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-7xl mx-auto pb-10">
          
          {/* VERSIÓN BÁSICA */}
          <div className="bg-white/60 backdrop-blur-2xl border border-slate-200 rounded-[3rem] p-10 pb-16 text-center shadow-xl shadow-slate-200/50 relative group hover:-translate-y-2 transition-transform duration-500 mt-0 lg:mt-8 h-fit">
            <h3 className="text-3xl font-bold text-slate-800 mb-2">Versión Básica</h3>
            <p className="text-slate-500 font-medium mb-8 text-sm">Monitoreo con sensores esenciales para pruebas iniciales o zonas de bajo requerimiento.</p>
            
            <div className="flex justify-center items-baseline mb-8">
              <span className="text-3xl font-extrabold text-slate-800 tracking-wider uppercase bg-slate-100 px-4 py-2 rounded-xl">Próximamente</span>
            </div>

            <ul className="text-left space-y-4 mb-14 text-slate-700 font-medium border-t border-b border-slate-100 py-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-slate-400 shrink-0" size={24} />
                <span>Microcontrolador ESP32 con sensores básicos.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-slate-400 shrink-0" size={24} />
                <span>Acceso a Dashboard de monitoreo local.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-slate-400 shrink-0" size={24} />
                <span>Instalación y configuración inicial.</span>
              </li>
            </ul>

            <div className="absolute left-0 w-full flex justify-center -bottom-8">
              <LiquidButton href={actionRoute} size="xxl" className="w-[95%] max-w-[320px] shadow-lg shadow-slate-200/50">
                <span className="flex items-center gap-3 justify-center text-slate-700 font-extrabold text-base">
                  <ShoppingCart size={24} /> Solicitar Básico
                </span>
              </LiquidButton>
            </div>
          </div>

          {/* VERSIÓN INTERMEDIA */}
          <div className="bg-gradient-to-b from-green-50 to-white backdrop-blur-2xl border-2 border-[#32b24b] rounded-[3rem] p-10 pb-16 text-center shadow-2xl shadow-green-900/15 relative group hover:-translate-y-2 transition-transform duration-500 z-20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#32b24b] to-green-600 text-xs font-bold text-white shadow-md flex items-center gap-1 whitespace-nowrap">
              <Zap size={14} /> MÁS POPULAR
            </div>
            
            <h3 className="text-3xl font-bold text-green-900 mb-2">Versión Intermedia</h3>
            <p className="text-green-600 font-medium mb-8 text-sm">Mayor estabilidad y sensores para aplicaciones comunitarias o institucionales.</p>
            
            <div className="flex justify-center items-baseline mb-8">
              <span className="text-3xl font-extrabold text-green-800 tracking-wider uppercase bg-green-100 px-4 py-2 rounded-xl">Próximamente</span>
            </div>

            <ul className="text-left space-y-4 mb-14 text-slate-700 font-medium border-t border-b border-green-100 py-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#32b24b] shrink-0" size={24} />
                <span><strong>Integración de comunicación LoRa / Celular (NB-IoT).</strong></span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#32b24b] shrink-0" size={24} />
                <span>Gabinete de alta resistencia para exteriores.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#32b24b] shrink-0" size={24} />
                <span>Monitoreo en tiempo real vía Grafana.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#32b24b] shrink-0" size={24} />
                <span>Mantenimiento técnico periódico y calibración.</span>
              </li>
            </ul>

            <div className="absolute left-0 w-full flex justify-center -bottom-8">
              {/* Alineado al mismo tamaño XXL y ancho que los otros */}
              <LiquidButton href={actionRoute} size="xxl" className="w-[95%] max-w-[320px] shadow-xl shadow-[#32b24b]/20">
                <span className="flex items-center gap-3 justify-center text-white font-extrabold text-base">
                  <ShoppingCart size={24} /> Adquirir Intermedia
                </span>
              </LiquidButton>
            </div>
          </div>

          {/* VERSIÓN AVANZADA */}
          <div className="bg-white/60 backdrop-blur-2xl border border-slate-200 rounded-[3rem] p-10 pb-16 text-center shadow-xl shadow-slate-200/50 relative group hover:-translate-y-2 transition-transform duration-500 mt-0 lg:mt-8 h-fit">
            <h3 className="text-3xl font-bold text-slate-800 mb-2">Versión Avanzada</h3>
            <p className="text-slate-500 font-medium mb-8 text-sm">Múltiples nodos y análisis complejo para proyectos gubernamentales.</p>
            
            <div className="flex justify-center items-baseline mb-8">
              <span className="text-3xl font-extrabold text-slate-800 tracking-wider uppercase bg-slate-100 px-4 py-2 rounded-xl">Próximamente</span>
            </div>

            <ul className="text-left space-y-4 mb-14 text-slate-700 font-medium border-t border-b border-slate-100 py-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-slate-400 shrink-0" size={24} />
                <span>Implementación de múltiples nodos de red.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-slate-400 shrink-0" size={24} />
                <span>Gestión energética autónoma total (Paneles Solares).</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-slate-400 shrink-0" size={24} />
                <span>Análisis de datos avanzado y generación de reportes.</span>
              </li>
              <li className="flex items-start gap-4 opacity-75">
                <ShieldCheck className="text-slate-400 shrink-0" size={24} />
                <span>Soporte técnico premium in-situ.</span>
              </li>
            </ul>

            <div className="absolute left-0 w-full flex justify-center -bottom-8">
              <LiquidButton href={actionRoute} size="xxl" className="w-[95%] max-w-[320px] shadow-lg shadow-slate-200/50">
                <span className="flex items-center gap-3 justify-center text-slate-700 font-extrabold text-base">
                  <ShoppingCart size={24} /> Solicitar Avanzada
                </span>
              </LiquidButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

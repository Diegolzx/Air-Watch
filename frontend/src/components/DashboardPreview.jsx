import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Database, Radio, Server, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DashboardPreview() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [liveData, setLiveData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        // Fetch Live Data
        const liveRes = await fetch('https://node-red-production-4598.up.railway.app/api/v1/live');
        const liveJson = await liveRes.json();
        
        if (liveJson.ok && liveJson.data) {
          setLiveData(liveJson.data);
          setLastUpdate(liveJson.data.timestamp);
          setIsOnline(true);
        } else {
          setLiveData(null);
          // If the API connects but returns ok: false, it's still online but without recent data
          setIsOnline(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemData();
    // Refresh every 15 seconds
    const interval = setInterval(fetchSystemData, 15000);
    return () => clearInterval(interval);
  }, []);

  // Calcular alertas simples
  const getAlertStatus = (data) => {
    if (!data) return { status: 'Normal', color: 'text-slate-400', bg: 'bg-slate-100', icon: <CheckCircle2 size={24}/> };
    if (data.eco2 > 1000 || data.tvoc > 250 || data.mics > 800) {
      return { status: 'Crítico', color: 'text-red-600', bg: 'bg-red-100', icon: <AlertTriangle size={24}/> };
    }
    if (data.eco2 > 800 || data.tvoc > 100 || data.mics > 500) {
      return { status: 'Alerta', color: 'text-amber-500', bg: 'bg-amber-100', icon: <AlertTriangle size={24}/> };
    }
    return { status: 'Normal', color: 'text-emerald-500', bg: 'bg-emerald-100', icon: <CheckCircle2 size={24}/> };
  };

  const alert = getAlertStatus(liveData);

  return (
    <section id="dashboard" ref={ref} className="py-32 bg-slate-50 relative overflow-hidden">
      
      {/* Texture Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

      {/* Orbes de luz ambiental */}
      <div className="absolute top-1/4 left-1/4 w-[25rem] h-[25rem] bg-sky-400/20 rounded-full mix-blend-multiply filter blur-[64px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[25rem] h-[25rem] bg-emerald-400/15 rounded-full mix-blend-multiply filter blur-[64px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[25rem] h-[25rem] bg-cyan-400/15 rounded-full mix-blend-multiply filter blur-[64px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-sm font-bold text-sky-500 mb-6">
            LIVE MONITORING
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Sistema IoT Ambiental
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium px-4">
            Monitoreo ambiental inteligente con LoRa, MQTT, Node-RED, InfluxDB Cloud y Grafana Cloud.
          </p>
        </motion.div>

        {/* Dashboard Mockup Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/60 bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(14,165,233,0.15)] flex flex-col md:flex-row h-auto min-h-[650px]"
        >
          {/* Left Sidebar Floating Card - Status */}
          <div className="w-full md:w-80 border-r border-white/40 bg-white/40 p-8 flex flex-col relative z-20 shadow-[10px_0_30px_-10px_rgba(0,0,0,0.05)]">
             <div className="flex items-center justify-between mb-8">
               <span className="text-sm font-bold text-slate-600">Estado del Sistema</span>
               <div className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full flex items-center gap-1.5 ${isOnline ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                 <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                 {isOnline ? 'Activo' : 'Offline'}
               </div>
             </div>

             <div className="space-y-6 mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600"><Server size={20}/></div>
                 <div>
                   <div className="text-xs font-bold text-slate-400">API Backend</div>
                   <div className="text-sm font-semibold text-slate-700">Node-RED Railway</div>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><Database size={20}/></div>
                 <div>
                   <div className="text-xs font-bold text-slate-400">Base de Datos</div>
                   <div className="text-sm font-semibold text-slate-700">InfluxDB Cloud</div>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600"><Radio size={20}/></div>
                 <div>
                   <div className="text-xs font-bold text-slate-400">Protocolo IoT</div>
                   <div className="text-sm font-semibold text-slate-700">MQTT HiveMQ</div>
                 </div>
               </div>
             </div>

             {/* Minimalist Sub-Card for Alerts */}
             <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border-t border-l border-white/80 shadow-[0_4px_24px_0_rgba(14,165,233,0.1)] mt-auto cursor-default">
                <div className="text-xs text-slate-500 font-bold mb-4 uppercase">Estado del Aire</div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${alert.bg} ${alert.color}`}>
                    {alert.icon}
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${alert.color}`}>{alert.status}</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Niveles locales</div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right Main Interface Area */}
          <div className="flex-1 bg-gradient-to-br from-white/10 to-slate-100/20 backdrop-blur-sm flex flex-col relative w-full h-auto p-8 overflow-y-auto">
             
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-white/40 gap-4">
               <div>
                 <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Niveles en Tiempo Real</div>
                 {lastUpdate && <div className="text-xs text-slate-400 mt-1">Última lectura: {new Date(lastUpdate).toLocaleTimeString()}</div>}
               </div>
               <div className="flex gap-2">
                 <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                 <span className="w-3 h-3 rounded-full bg-slate-300"></span>
               </div>
             </div>

             {loading ? (
               <div className="flex-1 flex items-center justify-center text-slate-400 font-medium animate-pulse">
                 Cargando conexión con Node-RED...
               </div>
             ) : !liveData ? (
               <div className="flex-1 flex items-center justify-center flex-col text-slate-400 p-8 text-center bg-white/30 rounded-3xl border border-white/50">
                 <Activity size={48} className="mb-4 opacity-50" />
                 <h4 className="text-xl font-bold text-slate-700 mb-2">Sin datos recientes</h4>
                 <p className="font-medium text-sm">Esperando lectura del prototipo por MQTT.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                 {/* eCO2 Card */}
                 <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1">
                   <div className="text-xs font-bold text-slate-400 mb-2 uppercase">eCO2</div>
                   <div className="text-3xl font-extrabold text-slate-800">{liveData.eco2} <span className="text-sm font-bold text-slate-400">ppm</span></div>
                 </div>
                 
                 {/* TVOC Card */}
                 <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1">
                   <div className="text-xs font-bold text-slate-400 mb-2 uppercase">TVOC</div>
                   <div className="text-3xl font-extrabold text-slate-800">{liveData.tvoc} <span className="text-sm font-bold text-slate-400">ppb</span></div>
                 </div>

                 {/* MiCS RAW Card */}
                 <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1">
                   <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Gases MiCS-5524</div>
                   <div className="text-3xl font-extrabold text-slate-800">{liveData.mics} <span className="text-sm font-bold text-slate-400">raw</span></div>
                 </div>

                 {/* Temp Card */}
                 <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1">
                   <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Temperatura</div>
                   <div className="text-3xl font-extrabold text-slate-800">{liveData.temp} <span className="text-sm font-bold text-slate-400">°C</span></div>
                 </div>

                 {/* Hum Card */}
                 <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-sm transition-transform hover:-translate-y-1">
                   <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Humedad</div>
                   <div className="text-3xl font-extrabold text-slate-800">{liveData.hum} <span className="text-sm font-bold text-slate-400">%</span></div>
                 </div>
               </div>
             )}

             {/* Grafana Dashboard Link Section */}
             <div className="mt-auto bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-xl">
                {/* Decoración del fondo oscuro */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-sky-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">Análisis Técnico Ambiental</h3>
                    <p className="text-slate-400 text-sm max-w-md">
                      Accede a históricos detallados, tendencias y analíticas completas almacenadas en InfluxDB a través de nuestro panel técnico oficial.
                    </p>
                  </div>
                  <a 
                    href="https://reyvax145.grafana.net/public-dashboards/b9035e1b64154d8daa4ffc300b79d456" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
                  >
                    Abrir Dashboard en Grafana
                    <ExternalLink size={18} />
                  </a>
                </div>
             </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

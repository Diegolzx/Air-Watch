import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Activity, MapPin, Settings, AlertTriangle, CheckCircle2, Wind, CloudRain, ThermometerSun, Leaf, Droplets } from 'lucide-react';

export default function DashboardUser() {
  const { user, logout } = useAuth();
  const [liveData, setLiveData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('nodered');

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const liveRes = await fetch('https://node-red-production-4598.up.railway.app/api/v1/live');
        const liveJson = await liveRes.json();
        
        if (liveJson.ok && liveJson.data) {
          setLiveData(liveJson.data);
          setIsOnline(true);
        } else {
          setLiveData(null);
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
    const interval = setInterval(fetchSystemData, 15000);
    return () => clearInterval(interval);
  }, []);

  const getAlertStatus = (data) => {
    if (!data) return { status: 'Normal', color: 'text-slate-400', bg: 'bg-slate-100', icon: <CheckCircle2 size={24}/> };
    if (data.eco2 > 1000 || data.tvoc > 250 || data.mics > 800) {
      return { status: 'Peligro', color: 'text-red-600', bg: 'bg-red-100/50', icon: <AlertTriangle size={24}/>, msg: 'Evacuar zona' };
    }
    if (data.eco2 > 800 || data.tvoc > 100 || data.mics > 500) {
      return { status: 'Alerta', color: 'text-amber-500', bg: 'bg-amber-100/50', icon: <AlertTriangle size={24}/>, msg: 'Precaución' };
    }
    return { status: 'Óptimo', color: 'text-[#32b24b]', bg: 'bg-[#32b24b]/10', icon: <CheckCircle2 size={24}/>, msg: 'Niveles seguros' };
  };

  const alert = getAlertStatus(liveData);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm z-10">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="w-9 h-9 bg-[#32b24b] rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-md shadow-[#32b24b]/30">
            <Wind size={20} />
          </div>
          <span className="font-extrabold text-slate-800 text-xl tracking-tight">Air Watch<span className="text-[#32b24b]">.</span></span>
        </div>
        
        <div className="p-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Estación de Monitoreo</p>
          <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#32b24b]/5 rounded-bl-full pointer-events-none"></div>
            
            <h3 className="font-bold text-slate-800 text-sm mb-1">{user?.name}'s ESP32</h3>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-4">
               <MapPin className="w-3.5 h-3.5 text-slate-400"/> Canal Progreso, Ixmiquilpan
            </p>
            <div className="flex items-center gap-2 bg-white w-fit px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#32b24b] animate-pulse' : 'bg-red-500'}`}></span>
              <span className={`text-xs font-bold ${isOnline ? 'text-[#32b24b]' : 'text-red-500'}`}>{isOnline ? 'Sensor En línea' : 'Desconectado'}</span>
            </div>
          </div>

          {/* Alerta Lateral Dinámica */}
          <div className={`rounded-2xl p-5 mb-8 border flex items-center gap-4 ${alert.bg} border-transparent transition-colors duration-500`}>
             <div className={`${alert.color}`}>
                {alert.icon}
             </div>
             <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Estado Actual</p>
                <p className={`text-lg font-bold ${alert.color} leading-none`}>{alert.status}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{alert.msg}</p>
             </div>
          </div>

          <nav className="space-y-1.5">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl bg-[#32b24b]/10 text-[#32b24b] transition-colors">
              <Activity className="w-4.5 h-4.5" />
              Monitor en Vivo
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
              <Settings className="w-4.5 h-4.5" />
              Configuración del Nodo
            </a>
          </nav>
        </div>
        
        <div className="mt-auto p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-5 px-1">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#32b24b] font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden text-sm">
              <p className="font-bold text-slate-800 truncate">{user?.name}</p>
              <p className="text-[11px] font-medium text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl text-slate-600 bg-white border border-slate-200 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 md:hidden z-10">
            <span className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Wind size={20} className="text-[#32b24b]" />
              Air Watch
            </span>
            <button onClick={logout} className="text-slate-500"><LogOut className="w-5 h-5"/></button>
         </header>

         <div className="flex-1 p-4 md:p-8 lg:px-12 overflow-auto bg-slate-50/50 pb-20">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Telemetría Ambiental</h1>
                  <p className="text-slate-500 font-medium mt-1">Monitoreo NB-IoT en tiempo real de tu estación.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  ACTUALIZACIÓN <span className="text-[#32b24b]">15s</span>
                </div>
            </div>

            {/* Dashboards Embebidos (Node-RED y Grafana) con Navegación de Pestañas */}
            
            {/* Controles de Pestañas */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200 mb-6 w-fit mx-auto md:mx-0">
              <button 
                onClick={() => setActiveTab('nodered')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'nodered' 
                    ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Activity size={16}/>
                Monitor Operativo
              </button>
              <button 
                onClick={() => setActiveTab('grafana')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'grafana' 
                    ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CloudRain size={16}/>
                Análisis Histórico
              </button>
            </div>

            {/* Contenedor Único de Iframes */}
            <div className="w-full bg-white border border-slate-200 shadow-md shadow-slate-200/50 rounded-[2rem] overflow-hidden flex flex-col h-[750px] mb-8">
                
                {/* Cabecera Dinámica */}
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                    {activeTab === 'nodered' ? (
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                            <Activity size={16} className="text-red-500"/>
                          </div>
                          <div>
                            <h2 className="font-bold text-slate-800">Node-RED Dashboard</h2>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Control IoT en Vivo</p>
                          </div>
                       </div>
                    ) : (
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                            <Activity size={16} className="text-orange-500"/>
                          </div>
                          <div>
                            <h2 className="font-bold text-slate-800">Grafana Analytics</h2>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estadísticas y Series de Tiempo</p>
                          </div>
                       </div>
                    )}
                </div>

                {/* Área de Visualización */}
                <div className="flex-1 w-full bg-slate-50 relative p-1">
                    
                    {/* Panel Node-RED - Oculto con CSS si no es la pestaña activa para evitar que se recargue */}
                    <div className={`absolute inset-0 w-full h-full pb-2 ${activeTab === 'nodered' ? 'block z-10' : 'hidden z-0'}`}>
                        <iframe 
                            src="https://node-red-production-4598.up.railway.app/dashboard/calidad-aire-real" 
                            className="w-full h-full rounded-b-[2rem]"
                            frameBorder="0"
                            title="Node-RED Panel"
                        ></iframe>
                    </div>

                    {/* Panel Grafana - Oculto con CSS si no es la pestaña activa */}
                    <div className={`absolute inset-0 w-full h-full pb-2 ${activeTab === 'grafana' ? 'block z-10' : 'hidden z-0'}`}>
                        <iframe 
                            src="https://outlying-antiques-underwent.ngrok-free.dev/d/adx4rzz/new-dashboard?orgId=1&from=now-7d&to=now&timezone=browser&theme=light&refresh=30s&kiosk" 
                            className="w-full h-full rounded-b-[2rem]"
                            frameBorder="0"
                            title="Grafana Panel"
                        ></iframe>
                    </div>

                </div>
            </div>

         </div>
      </main>
    </div>
  );
}

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Center } from '@react-three/drei';
import { LiquidButton } from './ui/liquid-glass-button';

function PrototypeHeroModel() {
  const { scene } = useGLTF('/CaseFinal2.glb');
  return (
    <Center>
      {/* Escala aumentada a 11 y posicionada ligeramente a la derecha para destacar sin chocar con el texto */}
      <primitive object={scene} scale={11} position={[0.5, -0.5, 0]} />
    </Center>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col lg:flex-row items-center overflow-hidden bg-slate-50 pt-24 lg:pt-0">
      {/* Elementos de fondo desenfocado */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full">
        
        {/* TEXTO REFINADO Y ORGANIZADO */}
        <div className="w-full lg:w-[45%] text-center lg:text-left z-20 pointer-events-auto flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-xs md:text-sm font-bold text-sky-600 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Air Watch | Detección IoT
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight mb-6 text-slate-800 leading-[1.1]"
          >
            Protege el ambiente.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-[#32b24b]">
              Con datos precisos.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-slate-600 mb-8 font-medium leading-relaxed bg-white/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl lg:rounded-none max-w-lg mx-auto lg:mx-0 shadow-sm lg:shadow-none border border-white/50 lg:border-none"
          >
            Sistema de monitoreo ambiental IoT para canales de aguas residuales. Detecta gases tóxicos y protege a tu comunidad en tiempo real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 lg:mb-0"
          >
            <LiquidButton href="#tech" size="xxl" className="w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Ver Especificaciones <ArrowRight size={18} />
              </span>
            </LiquidButton>
          </motion.div>
        </div>

        {/* ÁREA DEL LIENZO 3D (Mesa de trabajo para móvil separada) */}
        <div className="w-full h-[45vh] sm:h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 lg:w-[55%] z-10 cursor-grab active:cursor-grabbing relative">
          <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }} className="w-full h-full block">
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />
            <Suspense fallback={null}>
              <PrototypeHeroModel />
              <Environment preset="city" />
              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#0f172a" />
            </Suspense>
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={1.0}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              target={[0, -0.5, 0]} 
            />
          </Canvas>
        </div>

      </div>
    </section>
  );
}

useGLTF.preload('/CaseFinal2.glb');

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Center } from '@react-three/drei';

function PrototypeModel() {
  // Cargamos el modelo GLB
  const { scene } = useGLTF('/CaseFinal2.glb');
  
  return (
    <Center>
      <primitive 
        object={scene} 
        scale={8} // Aumentado de 5 a 8 para que se vea masivo e imponente
      />
    </Center>
  );
}

export default function ModelShowcase() {
  return (
    <section className="h-[800px] w-full bg-slate-50 relative border-y border-slate-200 overflow-hidden">
      <div className="absolute top-12 left-0 w-full text-center z-10 pointer-events-none">
        <div className="inline-flex px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-sm font-bold text-sky-500 mb-6 uppercase tracking-widest">
          Hardware IP65
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
          Resistencia Extrema. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            Diseño Inmersivo.
          </span>
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          Interacciona con el diseño 3D de nuestra carcasa. Preparada para soportar los embates de los ríos residuales del Valle del Mezquital.
        </p>
      </div>

      <div className="absolute inset-0 bg-transparent cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          {/* Luces sutiles estilo "Apple" */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <Suspense fallback={null}>
            <PrototypeModel />
            {/* El ambiente le dará reflejos muy premium a cualquier material del blender */}
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#0f172a" />
          </Suspense>
          
          {/* Controles para que el usuario gire el modelo con el mouse/dedo */}
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={1.5}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={0} // Permite ver desde la parte superior (cenit)
            maxPolarAngle={Math.PI} // Permite ver desde la parte inferior (nadir)
          />
        </Canvas>
      </div>
    </section>
  );
}

// Pre-cargamos el modelo para que se renderice casi instantáneo
useGLTF.preload('/CaseFinal2.glb');

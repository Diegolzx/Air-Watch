# 🛸 Air-Watch

![Air-Watch Logo o Banner](https://img.shields.io/badge/Status-En%20Desarrollo-brightgreen?style=for-the-badge)

🌐 **Visita el sitio en vivo:** [Enlace a la página web](#) *(Reemplaza este # con el enlace real de tu página instalada)*

**Air-Watch** es una aplicación web moderna e interactiva diseñada como proyecto integrador. Desarrollada utilizando tecnologías de vanguardia para ofrecer una experiencia fluida, incluyendo visualización de modelos 3D y un panel de control con autenticación.

## 🌟 Características Principales

- **Experiencia 3D Interactiva**: Visualización de modelos en 3D utilizando `@react-three/fiber` y `Three.js` (incluyendo la sección `ModelShowcase`).
- **Autenticación de Usuarios**: Flujos completos de Registro, Inicio de Sesión y Rutas Protegidas mediante `AuthContext`.
- **Panel de Usuario (Dashboard)**: Interfaz informativa e interactiva exclusiva para usuarios registrados (`DashboardUser`).
- **Animaciones Fluidas**: Transiciones y efectos atractivos usando `framer-motion`.
- **Diseño UI/UX Responsivo**: Maquetado moderno, adaptable y rápido gracias a `Tailwind CSS v4`.

## 🛠️ Tecnologías y Stack

El frontend del proyecto está construido con:

- ⚛️ **Framework**: [React 19](https://react.dev/)
- ⚡ **Bundler**: [Vite](https://vitejs.dev/)
- 🧊 **Motor 3D**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/)
- 🎨 **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- 🎬 **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- 🗺️ **Rutas**: [React Router](https://reactrouter.com/)
- 💠 **Iconos**: [Lucide React](https://lucide.dev/)

## 🚀 Instalación y Uso Local

Sigue estos pasos para levantar el proyecto en tu propia computadora:

### 1. Clonar el repositorio
```bash
git clone git@github.com:Diegolzx/Air-Watch.git
cd Air-Watch
```

### 2. Instalar las dependencias
Navega a la carpeta principal del frontend e instala los paquetes:
```bash
cd frontend
npm install
```

### 3. Iniciar el servidor de desarrollo
Levanta el proyecto para visualización en vivo:
```bash
npm run dev
```
La aplicación estará disponible (usualmente) en `http://localhost:5173/`.

## 📁 Arquitectura del Proyecto

```text
Air-Watch/
├── frontend/
│   ├── public/             # Archivos estáticos y modelos 3D (.glb)
│   ├── src/
│   │   ├── assets/         # Imágenes y gráficos
│   │   ├── components/     # Componentes UI (Navbar, Hero, About, TechStack)
│   │   ├── context/        # Estado global (AuthContext)
│   │   ├── pages/          # Vistas (Home, Login, Register, DashboardUser)
│   │   ├── lib/            # Utilidades varias
│   │   ├── App.jsx         # Configuración principal y enrutador
│   │   └── main.jsx        # Punto de entrada de la aplicación
│   ├── vite.config.js      # Configuración del servidor de desarrollo
│   └── package.json        # Dependencias y scripts
└── README.md               # Esta documentación
```

## 👨‍💻 Autor

- Creado por **Diego** ([Diegolzx](https://github.com/Diegolzx)).

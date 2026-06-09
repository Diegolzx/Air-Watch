import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Al cargar la app, revisamos si hay una sesión guardada en localStorage
    // Esto es IDEAL para presentaciones ya que no depende de internet ni APIs externas
    const storedUser = localStorage.getItem('aqms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (email, password) => {
    // Simulación de login. En producción aquí va Firebase o Supabase.
    // Para la presentación, aceptaremos cualquier login.
    const fakeUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email: email,
      name: email.split('@')[0],
      dispositivo_mac: "AA:BB:CC:DD:EE:FF"
    };
    setUser(fakeUser);
    localStorage.setItem('aqms_user', JSON.stringify(fakeUser));
    return true;
  };

  const register = (name, email, password) => {
    // Simulación de registro
    const newUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email: email,
      name: name,
      dispositivo_mac: "PENDING_SETUP" // Hasta que registre su placa
    };
    setUser(newUser);
    localStorage.setItem('aqms_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aqms_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

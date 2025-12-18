'use client';
import Link from "next/link";
import { useAuth } from "@/services/AuthContext";
import { useState, useEffect } from "react";

export default function Home() {
  const [userEmail, setUserEmail] = useState<any | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    setUserEmail(user?.email);
  }, [user]);



  const logOutService = async () => {
    await logout();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
              C
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">CoachApp</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (<div className="flex items-center space-x-3">
              <p>Hola {userEmail}</p>

              <button
                onClick={logOutService}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
              >
                Cerrar Sesión
              </button>
            </div>) : (
              <Link
                href="/login"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
              >
                Iniciar Sesión
              </Link>)}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Fondo Gradiente inspirado en tu Login */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Potencia tu Futuro
            </span>
            <span className="block text-white mt-2">
              con Coaching de Élite
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
            Supera tus límites personales y profesionales con nuestra metodología probada. Planes adaptados a tus necesidades.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Ver Planes
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 border border-white/20 rounded-full hover:bg-white/10 backdrop-blur-sm"
            >
              Saber más
            </a>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Elige tu transformación</h2>
            <p className="mt-4 text-lg text-slate-400">Selecciona el plan que mejor se adapte a tus objetivos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PLAN BASICO */}
            <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">Coaching Personal</h3>
                <p className="text-slate-400 mt-2">Para individuos que buscan crecimiento.</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-300">
                <li className="flex items-center"><svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>1 sesión mensual</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Soporte por email</li>
              </ul>

              {/* DESAFÍO DE LÓGICA AQUÍ: 
                        Al hacer click, debe verificar Auth.
                    */}
              <button
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/10"
                onClick={() => alert("Lógica pendiente: Validar sesión -> Ir a checkout")}
              >
                Comenzar Ahora
              </button>
            </div>

            {/* PLAN EMPRESAS */}
            <div className="relative p-8 bg-gradient-to-b from-purple-900/20 to-slate-900/50 border border-purple-500/30 rounded-2xl backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 flex flex-col shadow-xl shadow-purple-900/20">
              <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">Empresarial PRO</h3>
                <p className="text-slate-400 mt-2">Equipos y alto rendimiento.</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$199</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-300">
                <li className="flex items-center"><svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>4 sesiones mensuales</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Soporte prioritario 24/7</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Acceso a cursos</li>
              </ul>

              {/* DESAFÍO DE LÓGICA AQUÍ: 
                        Mismo botón, diferente destino (posiblemente).
                    */}
              <button
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all shadow-lg"
                onClick={() => alert("Lógica pendiente: Validar sesión -> Ir a checkout")}
              >
                Contratar Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

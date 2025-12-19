'use client';
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/services/AuthContext";
import { createCheckoutSession } from "@/services/paymentService"; // 👈 Tu nueva capa de lógica
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout, userData } = useAuth();
  const [loading, setLoading] = useState(false); // Para que el botón muestre "Cargando..."
  const router = useRouter();

  const logOutService = async () => {
    await logout();
  }

  // 👇 ESTA ES LA CONEXIÓN FINAL
  const handleSubscribe = async () => {
    // 1. Protección: Si no hay usuario, mandarlo a login
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true); // Bloqueamos el botón

    try {
      // 2. Usamos tu servicio (Capa de Lógica Front)
      const url = await createCheckoutSession(user.uid);

      // 3. Redirigimos a Stripe
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el pago. Revisa la consola.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">C</div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">CoachApp</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-3">
                <p className="hidden md:block text-sm text-slate-300">Hola {user.email}</p>
                <button onClick={logOutService} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Potencia tu Futuro</span>
          </h1>
          <a href="#pricing" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:scale-105 shadow-lg">
            Ver Planes
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Plan Premium</h2>
          </div>

          <div className="flex justify-center max-w-md mx-auto">
            <div className="w-full p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-all flex flex-col">
              <div className="mb-6 text-center">
                <span className="text-5xl font-bold text-white">$0.01</span>
                <span className="text-slate-400">/mes</span>
              </div>

              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex items-center">✅ Acceso total</li>
                <li className="flex items-center">✅ Soporte 24/7</li>
              </ul>

              {/* 👇 BOTÓN INTELIGENTE */}
              {userData?.isPremium ? (
                <button disabled className="w-full py-3 px-4 bg-green-600/20 border border-green-500/50 text-green-400 font-semibold rounded-xl cursor-not-allowed">
                  ✅ Ya eres Premium
                </button>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all ${loading ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {loading ? 'Cargando Stripe...' : 'Contratar Plan'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { useDevice } from '../hooks/useDevice';

interface IntroductionProps {
  onComplete: () => void;
}

export default function Introduction({ onComplete }: IntroductionProps) {
  const [step, setStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const device = useDevice();

  const steps = [
    {
      title: "¡Bienvenido a FracciónLandia!",
      content: (
        <div className="text-center">
          <div className={`${device === 'mobile' ? 'text-6xl' : 'text-8xl'} mb-4 md:mb-6 animate-float`}>🦉</div>
          <p className={`${device === 'mobile' ? 'text-base' : 'text-xl'} text-gray-700 mb-3 md:mb-4`}>
            ¡Hola! Soy <strong className="text-purple-600">Sabio</strong>, tu guía en este viaje.
          </p>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-600`}>
            Te enseñaré todo sobre las <span className="font-bold text-blue-600">fracciones</span> de forma divertida.
          </p>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-600 mt-2`}>
            ¿Estás listo para aprender? ¡Vamos! 🚀
          </p>
        </div>
      ),
    },
    {
      title: "¿Qué es una Fracción?",
      content: (
        <div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 md:p-4 rounded-lg mb-3 md:mb-4">
            <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} font-semibold text-yellow-800`}>
              🍕 Una fracción representa <strong>partes iguales</strong> de un todo.
            </p>
          </div>
          <div className={`grid ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'} gap-2 md:gap-4 mb-3 md:mb-4`}>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md text-center">
              <svg viewBox="0 0 100 100" width={device === 'mobile' ? '60' : '80'} height={device === 'mobile' ? '60' : '80'} className="mx-auto mb-1 md:mb-2">
                <circle cx="50" cy="50" r="40" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="3"/>
              </svg>
              <p className={`${device === 'mobile' ? 'text-xs' : 'text-sm'} font-bold`}>1 pizza entera</p>
              <p className={`${device === 'mobile' ? 'text-[10px]' : 'text-xs'} text-gray-500`}>= 1/1 = Todo</p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md text-center">
              <svg viewBox="0 0 100 100" width={device === 'mobile' ? '60' : '80'} height={device === 'mobile' ? '60' : '80'} className="mx-auto mb-1 md:mb-2">
                <path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
                <path d="M50,50 L90,50 A40,40 0 0,1 50,90 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                <path d="M50,50 L50,90 A40,40 0 0,1 10,50 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                <path d="M50,50 L10,50 A40,40 0 0,1 50,10 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
              </svg>
              <p className={`${device === 'mobile' ? 'text-xs' : 'text-sm'} font-bold`}>1/4 de pizza</p>
              <p className={`${device === 'mobile' ? 'text-[10px]' : 'text-xs'} text-gray-500`}>1 parte de 4</p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md text-center">
              <svg viewBox="0 0 100 100" width={device === 'mobile' ? '60' : '80'} height={device === 'mobile' ? '60' : '80'} className="mx-auto mb-1 md:mb-2">
                <path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
                <path d="M50,50 L90,50 A40,40 0 0,1 50,90 Z" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
                <path d="M50,50 L50,90 A40,40 0 0,1 10,50 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                <path d="M50,50 L10,50 A40,40 0 0,1 50,10 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
              </svg>
              <p className={`${device === 'mobile' ? 'text-xs' : 'text-sm'} font-bold`}>2/4 de pizza</p>
              <p className={`${device === 'mobile' ? 'text-[10px]' : 'text-xs'} text-gray-500`}>2 partes de 4</p>
            </div>
          </div>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-base'} text-gray-700`}>
            Cuando cortamos algo en partes <strong>iguales</strong> y tomamos algunas, estamos usando fracciones.
          </p>
        </div>
      ),
    },
    {
      title: "Las Partes de una Fracción",
      content: (
        <div>
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg">
              <div className="text-center">
                <div className={`${device === 'mobile' ? 'text-4xl' : 'text-6xl'} font-black mb-1 md:mb-2`}>
                  <span className="text-red-500">3</span>
                </div>
                <div className={`h-0.5 md:h-1 ${device === 'mobile' ? 'w-14' : 'w-20'} bg-gray-800 mx-auto my-1 md:my-2`}></div>
                <div className={`${device === 'mobile' ? 'text-4xl' : 'text-6xl'} font-black mt-1 md:mt-2`}>
                  <span className="text-blue-500">4</span>
                </div>
              </div>
              <div className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                <div className="flex items-center gap-1 md:gap-2">
                  <span className={`${device === 'mobile' ? 'text-lg' : 'text-2xl'}`}>👆</span>
                  <p className={`${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                    <strong className="text-red-500">NUMERADOR</strong> = Partes que TOMAMOS
                  </p>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <span className={`${device === 'mobile' ? 'text-lg' : 'text-2xl'}`}>👇</span>
                  <p className={`${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                    <strong className="text-blue-500">DENOMINADOR</strong> = Partes TOTALES
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-2 md:p-4 rounded-lg">
            <p className={`${device === 'mobile' ? 'text-sm' : 'text-base'} text-green-800`}>
              💡 <strong>Truco para recordar:</strong>
            </p>
            <ul className="mt-1 md:mt-2 space-y-0.5 md:space-y-1 text-green-700">
              <li className={`${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>🔴 <strong>N</strong>umerador = <strong>N</strong>úmero que tomamos (arriba)</li>
              <li className={`${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>🔵 <strong>D</strong>enominador = <strong>D</strong>ivisión total (abajo)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Ejemplos con Objetos",
      content: (
        <div>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-700 mb-3 md:mb-4`}>
            Mira estos ejemplos con frutas:
          </p>
          <div className={`grid ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'} gap-2 md:gap-4`}>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md">
              <p className={`font-bold text-center mb-1 md:mb-2 ${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>3/5 de las frutas son rojas</p>
              <div className={`flex justify-center gap-0.5 md:gap-1 ${device === 'mobile' ? 'text-xl' : 'text-3xl'}`}>
                <span>🍎</span><span>🍎</span><span>🍎</span>
                <span className="opacity-30">🍊</span>
                <span className="opacity-30">🍊</span>
              </div>
              <p className={`text-center mt-1 md:mt-2 ${device === 'mobile' ? 'text-[10px]' : 'text-sm'} text-gray-600`}>
                3 manzanas de 5 frutas = <strong>3/5</strong>
              </p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md">
              <p className={`font-bold text-center mb-1 md:mb-2 ${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>2/6 de los animales son gatos</p>
              <div className={`flex justify-center gap-0.5 md:gap-1 ${device === 'mobile' ? 'text-xl' : 'text-3xl'}`}>
                <span>🐱</span><span>🐱</span>
                <span className="opacity-30">🐶</span>
                <span className="opacity-30">🐶</span>
                <span className="opacity-30">🐶</span>
                <span className="opacity-30">🐶</span>
              </div>
              <p className={`text-center mt-1 md:mt-2 ${device === 'mobile' ? 'text-[10px]' : 'text-sm'} text-gray-600`}>
                2 gatos de 6 animales = <strong>2/6</strong>
              </p>
            </div>
          </div>
          <div className="mt-3 md:mt-4 bg-blue-50 rounded-lg md:rounded-xl p-2 md:p-4">
            <p className={`${device === 'mobile' ? 'text-xs' : 'text-base'} text-blue-800 text-center`}>
              🎯 <strong>Recuerda:</strong> El numerador cuenta las partes que nos interesan, y el denominador cuenta el total.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "¡Practiquemos!",
      content: (
        <div>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-700 mb-3 md:mb-4`}>
            Mira este dibujo y responde:
          </p>
          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg text-center mb-3 md:mb-4">
            <p className={`font-bold mb-2 md:mb-3 ${device === 'mobile' ? 'text-sm' : 'text-base'}`}>¿Qué fracción del círculo está coloreada?</p>
            <svg viewBox="0 0 120 120" width={device === 'mobile' ? '120' : '150'} height={device === 'mobile' ? '120' : '150'} className="mx-auto">
              <path d="M60,60 L60,10 A50,50 0 0,1 110,60 Z" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
              <path d="M60,60 L110,60 A50,50 0 0,1 60,110 Z" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
              <path d="M60,60 L60,110 A50,50 0 0,1 10,60 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
              <path d="M60,60 L10,60 A50,50 0 0,1 60,10 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
            </svg>
            <p className={`${device === 'mobile' ? 'text-[10px]' : 'text-sm'} text-gray-500 mt-1 md:mt-2`}>El círculo está dividido en 4 partes iguales</p>
          </div>
          <div className={`grid ${device === 'mobile' ? 'grid-cols-2' : 'grid-cols-2'} gap-2 md:gap-3`}>
            {["1/4", "2/4", "3/4", "4/4"].map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuizAnswer(i);
                  setShowResult(true);
                }}
                disabled={showResult}
                className={`option-btn ${device === 'mobile' ? 'text-base py-2' : 'text-xl'} font-bold ${
                  showResult
                    ? i === 1
                      ? 'correct'
                      : quizAnswer === i
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`mt-3 md:mt-4 p-2 md:p-4 rounded-lg md:rounded-xl animate-slide-up ${quizAnswer === 1 ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <p className={`font-bold ${device === 'mobile' ? 'text-sm' : 'text-lg'}`}>
                {quizAnswer === 1 ? '🎉 ¡Correcto!' : '💡 ¡Casi!'}
              </p>
              <p className={`${device === 'mobile' ? 'text-xs' : 'text-base'} text-gray-700 mt-1`}>
                Hay 4 partes iguales y 2 están coloreadas, por eso es <strong>2/4</strong>.
                El numerador (2) dice cuántas partes tomamos, y el denominador (4) dice cuántas hay en total.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Representaciones Gráficas",
      content: (
        <div>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-700 mb-3 md:mb-4`}>
            Las fracciones se pueden dibujar de varias formas:
          </p>
          <div className="space-y-2 md:space-y-4">
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md">
              <h4 className={`font-bold text-purple-600 mb-1 md:mb-2 ${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>🔵 En Círculos (como pizzas)</h4>
              <div className="flex justify-center">
                <svg viewBox="0 0 100 100" width={device === 'mobile' ? '60' : '80'} height={device === 'mobile' ? '60' : '80'}>
                  <path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" fill="#48dbfb" stroke="#333" strokeWidth="2"/>
                  <path d="M50,50 L90,50 A40,40 0 0,1 50,90 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                  <path d="M50,50 L50,90 A40,40 0 0,1 10,50 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                  <path d="M50,50 L10,50 A40,40 0 0,1 50,10 Z" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                </svg>
              </div>
              <p className={`text-center ${device === 'mobile' ? 'text-[10px]' : 'text-sm'} mt-1`}>= 1/4</p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md">
              <h4 className={`font-bold text-green-600 mb-1 md:mb-2 ${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>📊 En Barras (como chocolate)</h4>
              <div className="flex justify-center">
                <svg viewBox="0 0 200 40" width={device === 'mobile' ? '150' : '200'} height={device === 'mobile' ? '30' : '40'}>
                  <rect x="0" y="0" width="50" height="40" fill="#00d2d3" stroke="#333" strokeWidth="2"/>
                  <rect x="50" y="0" width="50" height="40" fill="#00d2d3" stroke="#333" strokeWidth="2"/>
                  <rect x="100" y="0" width="50" height="40" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                  <rect x="150" y="0" width="50" height="40" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
                </svg>
              </div>
              <p className={`text-center ${device === 'mobile' ? 'text-[10px]' : 'text-sm'} mt-1`}>= 2/4</p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md">
              <h4 className={`font-bold text-orange-600 mb-1 md:mb-2 ${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>🍎 En Conjuntos (como frutas)</h4>
              <div className={`flex justify-center gap-0.5 md:gap-1 ${device === 'mobile' ? 'text-xl' : 'text-3xl'}`}>
                <span>🍎</span><span>🍎</span>
                <span className="opacity-30">🍊</span>
                <span className="opacity-30">🍊</span>
              </div>
              <p className={`text-center ${device === 'mobile' ? 'text-[10px]' : 'text-sm'} mt-1`}>= 2/4</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "¡Estás Listo!",
      content: (
        <div className="text-center">
          <div className={`${device === 'mobile' ? 'text-6xl' : 'text-8xl'} mb-4 md:mb-6 animate-float`}>🎉</div>
          <h3 className={`${device === 'mobile' ? 'text-lg' : 'text-2xl'} font-bold text-gray-800 mb-3 md:mb-4`}>
            ¡Felicidades! Ya conoces las bases
          </h3>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4">
            <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-700`}>
              Ahora aprenderás en <strong>5 niveles</strong> increíbles:
            </p>
            <ul className={`mt-2 md:mt-3 space-y-1 md:space-y-2 text-left ${device === 'mobile' ? 'text-xs' : 'text-sm'} max-w-md mx-auto`}>
              <li className="flex items-center gap-1 md:gap-2"><span className={`${device === 'mobile' ? 'text-base' : 'text-2xl'}`}>🍕</span> Nivel 1: ¿Qué es una fracción?</li>
              <li className="flex items-center gap-1 md:gap-2"><span className={`${device === 'mobile' ? 'text-base' : 'text-2xl'}`}>🔢</span> Nivel 2: Numerador y denominador</li>
              <li className="flex items-center gap-1 md:gap-2"><span className={`${device === 'mobile' ? 'text-base' : 'text-2xl'}`}>🎨</span> Nivel 3: Representación gráfica</li>
              <li className="flex items-center gap-1 md:gap-2"><span className={`${device === 'mobile' ? 'text-base' : 'text-2xl'}`}>📏</span> Nivel 4: Recta numérica</li>
              <li className="flex items-center gap-1 md:gap-2"><span className={`${device === 'mobile' ? 'text-base' : 'text-2xl'}`}>🏆</span> Nivel 5: Tipos de fracciones</li>
            </ul>
          </div>
          <p className={`${device === 'mobile' ? 'text-xs' : 'text-base'} text-gray-600 mb-3 md:mb-4`}>
            Cada nivel tiene <strong>3 subniveles</strong> con <strong>10 ejercicios</strong> interactivos.
            ¡Necesitas estrellas para desbloquear el siguiente!
          </p>
          <div className="flex justify-center gap-1 md:gap-2 text-xl md:text-3xl">
            <span className="animate-float" style={{animationDelay: '0s'}}>⭐</span>
            <span className="animate-float" style={{animationDelay: '0.2s'}}>⭐</span>
            <span className="animate-float" style={{animationDelay: '0.4s'}}>⭐</span>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setQuizAnswer(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setQuizAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-2 md:p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress dots */}
        <div className="flex justify-center gap-1 md:gap-2 mb-4 md:mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                i === step ? 'bg-white scale-125' : i < step ? 'bg-white/70' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-3 md:p-8 animate-slide-up">
          <h2 className={`${device === 'mobile' ? 'text-lg' : 'text-2xl md:text-3xl'} font-black text-center text-gray-800 mb-4 md:mb-6`}>
            {steps[step].title}
          </h2>

          <div className="intro-step" key={step}>
            {steps[step].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-4 md:mt-8 gap-2">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`btn-game text-xs md:text-base px-3 md:px-6 py-2 md:py-3 ${step === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              ← Anterior
            </button>
            <button
              onClick={nextStep}
              className="btn-game text-xs md:text-base bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg px-3 md:px-6 py-2 md:py-3"
            >
              {step === steps.length - 1 ? '¡Empezar! 🎮' : 'Siguiente →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Introduction from './components/Introduction';
import SublevelSelection from './components/SublevelSelection';
import LevelGame from './components/LevelGame';
import { useDevice } from './hooks/useDevice';

interface SublevelProgress {
  completed: boolean;
  stars: number;
}

interface LevelProgress {
  sublevels: SublevelProgress[];
}

const TOTAL_LEVELS = 5;
const SUBLEVELS_PER_LEVEL = 3;

const LEVEL_INFO = [
  { title: "¿Qué es una Fracción?", subtitle: "Descubre el mundo de las partes", icon: "🍕", color: "from-red-400 to-pink-500", bg: "from-red-100 to-pink-100", description: "Aprende qué es una fracción y cómo representa partes de un todo." },
  { title: "Numerador y Denominador", subtitle: "Las partes de la fracción", icon: "🔢", color: "from-blue-400 to-indigo-500", bg: "from-blue-100 to-indigo-100", description: "Identifica el numerador y denominador en cada fracción." },
  { title: "Representación Gráfica", subtitle: "¡Dibuja las fracciones!", icon: "🎨", color: "from-green-400 to-emerald-500", bg: "from-green-100 to-emerald-100", description: "Visualiza fracciones en círculos, barras y conjuntos." },
  { title: "Recta Numérica", subtitle: "¿Dónde viven las fracciones?", icon: "📏", color: "from-purple-400 to-violet-500", bg: "from-purple-100 to-violet-100", description: "Ubica fracciones en la recta numérica y compáralas." },
  { title: "Tipos de Fracciones", subtitle: "Propias, impropias y mixtas", icon: "🏆", color: "from-yellow-400 to-orange-500", bg: "from-yellow-100 to-orange-100", description: "Domina los diferentes tipos de fracciones." },
];

const createEmptyProgress = (): LevelProgress[] => {
  return Array(TOTAL_LEVELS).fill(null).map(() => ({
    sublevels: Array(SUBLEVELS_PER_LEVEL).fill(null).map(() => ({ completed: false, stars: 0 }))
  }));
};

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'home' | 'sublevels' | 'levelIntro' | 'game' | 'results'>('intro');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentSublevel, setCurrentSublevel] = useState(1);
  const [progress, setProgress] = useState<LevelProgress[]>(() => {
    const saved = localStorage.getItem('fractionGame_v3_progress');
    if (saved) return JSON.parse(saved);
    return createEmptyProgress();
  });
  const [resultStars, setResultStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const device = useDevice();

  useEffect(() => {
    localStorage.setItem('fractionGame_v3_progress', JSON.stringify(progress));
  }, [progress]);

  const isLevelUnlocked = (level: number): boolean => {
    if (level === 1) return true;
    const prevLevelProgress = progress[level - 2];
    return prevLevelProgress.sublevels.every(s => s.completed);
  };

  const isLevelCompleted = (level: number): boolean => {
    return progress[level - 1].sublevels.every(s => s.completed);
  };

  const getLevelStars = (level: number): number => {
    return progress[level - 1].sublevels.reduce((sum, s) => sum + s.stars, 0);
  };

  const handleIntroComplete = () => {
    setScreen('home');
  };

  const openLevel = (level: number) => {
    setCurrentLevel(level);
    setScreen('sublevels');
  };

  const startSublevel = (sublevel: number) => {
    setCurrentSublevel(sublevel);
    setScreen('levelIntro');
  };

  const startGame = () => {
    setScreen('game');
  };

  const handleGameComplete = (stars: number) => {
    setResultStars(stars);
    const newProgress = [...progress];
    const levelIndex = currentLevel - 1;
    const sublevelIndex = currentSublevel - 1;

    newProgress[levelIndex].sublevels[sublevelIndex] = {
      completed: stars >= 1,
      stars: Math.max(stars, newProgress[levelIndex].sublevels[sublevelIndex].stars),
    };

    setProgress(newProgress);
    if (stars >= 2) setShowConfetti(true);
    setScreen('results');
  };

  const getStars = (count: number) => {
    return Array(3).fill(0).map((_, i) => (
      <span key={i} className={`star ${i < count ? 'earned' : 'empty'}`}>⭐</span>
    ));
  };

  // INTRO SCREEN
  if (screen === 'intro') {
    return <Introduction onComplete={handleIntroComplete} />;
  }

  // HOME SCREEN
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-2 md:p-4 relative overflow-hidden">
        {/* Floating decorations - hidden on mobile for performance */}
        {device !== 'mobile' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {['½', '¼', '¾', '⅓', '⅔', '⅛', '⅜', '⅝'].map((frac, i) => (
              <span
                key={i}
                className="absolute text-white/20 font-bold animate-float"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${5 + (i % 3) * 30}%`,
                  fontSize: `${20 + i * 4}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              >
                {frac}
              </span>
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center py-4 md:py-8 animate-slide-up">
            <div className="flex justify-center mb-2 md:mb-4">
              <span className={`${device === 'mobile' ? 'text-5xl' : 'text-7xl'} animate-float`}>🦉</span>
            </div>
            <h1 className={`${device === 'mobile' ? 'text-3xl' : 'text-5xl md:text-6xl'} font-black text-white drop-shadow-lg mb-1 md:mb-2`}>
              🎮 FracciónLandia
            </h1>
            <p className={`${device === 'mobile' ? 'text-base' : 'text-xl'} text-white/90 font-semibold`}>
              ¡Aprende fracciones jugando!
            </p>
            <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-6 py-1 md:py-2 inline-block">
              <p className="text-white/90 text-xs md:text-sm font-medium">
                🎓 5 niveles · 3 subniveles · 10 ejercicios
              </p>
            </div>
          </div>

          {/* Level Cards */}
          <div className={`grid gap-2 md:gap-4 mt-4 md:mt-8 ${
            device === 'mobile' ? 'grid-cols-1' : device === 'tablet' ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'
          }`}>
            {LEVEL_INFO.map((level, index) => {
              const levelNum = index + 1;
              const unlocked = isLevelUnlocked(levelNum);
              const completed = isLevelCompleted(levelNum);
              const totalStars = getLevelStars(levelNum);

              return (
                <div
                  key={levelNum}
                  onClick={() => unlocked && openLevel(levelNum)}
                  className={`level-card rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg ${level.bg} ${!unlocked ? 'locked' : ''}`}
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <span className={`${device === 'mobile' ? 'text-3xl' : 'text-4xl'}`}>{level.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm md:text-lg truncate">Nivel {levelNum}</h3>
                      <p className="text-xs md:text-sm text-gray-600 truncate">{level.title}</p>
                    </div>
                    {!unlocked && <span className={`${device === 'mobile' ? 'text-xl' : 'text-2xl'} shrink-0`}>🔒</span>}
                  </div>
                  {device !== 'mobile' && (
                    <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3 line-clamp-2">{level.description}</p>
                  )}

                  {/* Sublevels indicator */}
                  <div className="flex gap-1 mb-2 items-center">
                    {progress[index].sublevels.map((s, i) => (
                      <div key={i} className="flex items-center gap-1 flex-1">
                        <div className={`flex-1 h-1.5 md:h-2 rounded-full ${s.completed ? 'bg-green-400' : 'bg-gray-300'}`} />
                        <span className="text-[10px] md:text-xs text-gray-500">{levelNum}.{i + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 md:gap-1 items-center">
                      {Array(Math.min(3, Math.floor(totalStars / 3) + (totalStars % 3 > 0 ? 1 : 0))).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs md:text-sm">⭐</span>
                      ))}
                      <span className="text-[10px] md:text-xs text-gray-500 ml-1">{totalStars}/9</span>
                    </div>
                    {unlocked && (
                      <span className={`text-[10px] md:text-sm font-bold bg-gradient-to-r ${level.color} text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full whitespace-nowrap`}>
                        {completed ? '✓ Completo' : '3 subniveles'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Summary */}
          <div className="mt-4 md:mt-8 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 text-center">
            <h3 className="text-white font-bold text-sm md:text-lg mb-2">Tu Progreso General</h3>
            <div className="flex justify-center gap-1 md:gap-2 mb-2">
              {Array(TOTAL_LEVELS).fill(0).map((_, i) => (
                <span key={i} className={`${device === 'mobile' ? 'text-lg' : 'text-2xl'}`}>
                  {isLevelCompleted(i + 1) ? '✅' : '⬜'}
                </span>
              ))}
            </div>
            <p className="text-white/80 text-xs md:text-sm">
              {progress.filter(p => p.sublevels.every(s => s.completed)).length} de {TOTAL_LEVELS} niveles completados
            </p>
            <div className="flex justify-center gap-3 md:gap-4 mt-2 md:mt-3 flex-wrap">
              <button
                onClick={() => setScreen('intro')}
                className="text-white/70 hover:text-white text-xs md:text-sm underline transition"
              >
                📖 Introducción
              </button>
              {progress.some(p => p.sublevels.some(s => s.completed)) && (
                <button
                  onClick={() => {
                    if (confirm('¿Reiniciar todo el progreso?')) {
                      setProgress(createEmptyProgress());
                    }
                  }}
                  className="text-white/70 hover:text-white text-xs md:text-sm underline transition"
                >
                  🔄 Reiniciar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUBLEVEL SELECTION
  if (screen === 'sublevels') {
    return (
      <SublevelSelection
        level={currentLevel}
        sublevelProgress={progress[currentLevel - 1].sublevels}
        onSelectSublevel={startSublevel}
        onBack={() => setScreen('home')}
      />
    );
  }

  // LEVEL INTRO
  if (screen === 'levelIntro') {
    const levelInfo = LEVEL_INFO[currentLevel - 1];
    const sublevelTitles: Record<number, Record<number, { title: string; icon: string; description: string }>> = {
      1: {
        1: { title: "Básico", icon: "🌱", description: "Fracciones simples: 1/2, 1/3, 1/4" },
        2: { title: "Intermedio", icon: "🌿", description: "Fracciones con más partes: 2/3, 3/4, 2/5" },
        3: { title: "Avanzado", icon: "🌳", description: "Fracciones complejas: 5/8, 7/10, 3/6" },
      },
      2: {
        1: { title: "Numerador", icon: "🔝", description: "Identifica el número de arriba" },
        2: { title: "Denominador", icon: "🔽", description: "Identifica el número de abajo" },
        3: { title: "Ambos", icon: "🎯", description: "Identifica numerador y denominador" },
      },
      3: {
        1: { title: "Círculos", icon: "🔵", description: "Fracciones en círculos como pizzas" },
        2: { title: "Barras", icon: "📊", description: "Fracciones en barras como chocolate" },
        3: { title: "Conjuntos", icon: "🍎", description: "Fracciones en grupos de objetos" },
      },
      4: {
        1: { title: "Ubicación", icon: "📍", description: "Ubica fracciones en la recta" },
        2: { title: "Comparación", icon: "⚖️", description: "Compara fracciones" },
        3: { title: "Equivalencias", icon: "🔄", description: "Fracciones equivalentes" },
      },
      5: {
        1: { title: "Propias", icon: "🟢", description: "Numerador menor que denominador" },
        2: { title: "Impropias", icon: "🔴", description: "Numerador mayor que denominador" },
        3: { title: "Mixtos", icon: "🟡", description: "Entero + fracción" },
      },
    };

    const subInfo = sublevelTitles[currentLevel]?.[currentSublevel] || sublevelTitles[1][1];

    return (
      <div className={`min-h-screen bg-gradient-to-br ${levelInfo.color} p-2 md:p-4 flex items-center justify-center`}>
        <div className="max-w-lg w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 text-center animate-bounce-in">
          <span className={`${device === 'mobile' ? 'text-5xl' : 'text-6xl'} mb-2 md:mb-4 block animate-float`}>{subInfo.icon}</span>
          <h2 className={`${device === 'mobile' ? 'text-xl' : 'text-2xl'} font-black text-gray-800 mb-1`}>
            Nivel {currentLevel}.{currentSublevel}
          </h2>
          <h3 className={`${device === 'mobile' ? 'text-lg' : 'text-xl'} font-bold text-gray-600 mb-2`}>
            {subInfo.title}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mb-3 md:mb-4">{subInfo.description}</p>

          {/* Exercise types preview */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4 border-2 border-yellow-200">
            <h4 className="font-bold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">🎮 Tipos de ejercicios</h4>
            <div className="grid grid-cols-3 gap-1 md:gap-2 text-center">
              <div className="bg-white rounded-md md:rounded-lg p-1.5 md:p-2 shadow-sm">
                <span className={`${device === 'mobile' ? 'text-xl' : 'text-2xl'}`}>📝</span>
                <p className="text-[10px] md:text-xs font-bold text-gray-600 mt-0.5 md:mt-1">Quiz</p>
              </div>
              <div className="bg-white rounded-md md:rounded-lg p-1.5 md:p-2 shadow-sm">
                <span className={`${device === 'mobile' ? 'text-xl' : 'text-2xl'}`}>🎯</span>
                <p className="text-[10px] md:text-xs font-bold text-gray-600 mt-0.5 md:mt-1">Arrastrar</p>
              </div>
              <div className="bg-white rounded-md md:rounded-lg p-1.5 md:p-2 shadow-sm">
                <span className={`${device === 'mobile' ? 'text-xl' : 'text-2xl'}`}>🎨</span>
                <p className="text-[10px] md:text-xs font-bold text-gray-600 mt-0.5 md:mt-1">Dibujar</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs md:text-sm">Ejercicios:</span>
              <span className={`font-bold text-purple-600 ${device === 'mobile' ? 'text-lg' : 'text-xl'}`}>10</span>
            </div>
            <div className="flex justify-between items-center mt-1 md:mt-2">
              <span className="text-gray-600 text-xs md:text-sm">Para aprobar:</span>
              <span className="font-bold text-green-600 text-xs md:text-sm">⭐ mínimo 1 estrella</span>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3 justify-center">
            <button onClick={() => setScreen('sublevels')} className="btn-game text-xs md:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 md:px-6 py-2 md:py-3">
              ← Volver
            </button>
            <button onClick={startGame} className={`btn-game text-xs md:text-base bg-gradient-to-r ${levelInfo.color} text-white shadow-lg px-3 md:px-6 py-2 md:py-3`}>
              ¡Comenzar! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GAME SCREEN
  if (screen === 'game') {
    return (
      <LevelGame
        level={currentLevel}
        sublevel={currentSublevel}
        onBack={() => setScreen('sublevels')}
        onComplete={handleGameComplete}
      />
    );
  }

  // RESULTS SCREEN
  if (screen === 'results') {
    const levelInfo = LEVEL_INFO[currentLevel - 1];
    const passed = resultStars >= 1;
    const isLastSublevel = currentSublevel === SUBLEVELS_PER_LEVEL;

    return (
      <div className={`min-h-screen bg-gradient-to-br ${passed ? 'from-green-400 to-emerald-500' : 'from-orange-400 to-red-400'} p-2 md:p-4 flex items-center justify-center relative overflow-hidden`}>
        {/* Confetti */}
        {passed && showConfetti && device !== 'mobile' && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3'][Math.floor(Math.random() * 6)],
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-lg w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 text-center animate-bounce-in relative z-10">
          <div className="flex justify-center gap-1 md:gap-2 mb-3 md:mb-4">
            {[0, 1, 2].map(i => (
              <span key={i} className={`${device === 'mobile' ? 'text-3xl' : 'text-5xl'} ${i < resultStars ? 'animate-float' : 'opacity-30'}`} style={{ animationDelay: `${i * 0.2}s` }}>
                ⭐
              </span>
            ))}
          </div>

          <h2 className={`${device === 'mobile' ? 'text-xl' : 'text-3xl'} font-black mb-1 md:mb-2`}>
            {passed ? '🎉 ¡Completado!' : '💪 ¡Sigue Intentando!'}
          </h2>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-600 mb-1`}>
            Nivel {currentLevel}.{currentSublevel}
          </p>
          <p className={`${device === 'mobile' ? 'text-base' : 'text-xl'} text-gray-600 mb-3 md:mb-4`}>
            {passed ? '¡Excelente trabajo!' : 'Necesitas al menos 1 estrella'}
          </p>

          <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex justify-center gap-1">{getStars(resultStars)}</div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              {resultStars === 3 ? '¡Perfecto! 🏆' : resultStars === 2 ? '¡Muy bien! 👏' : resultStars === 1 ? '¡Bien! 📚' : 'Sigue practicando 💪'}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            {!passed && (
              <button onClick={() => startGame()} className="btn-game text-xs md:text-base bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg">
                🔄 Intentar de Nuevo
              </button>
            )}
            {passed && !isLastSublevel && (
              <button onClick={() => startSublevel(currentSublevel + 1)} className="btn-game text-xs md:text-base bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                Siguiente ({currentLevel}.{currentSublevel + 1}) → 🚀
              </button>
            )}
            {passed && isLastSublevel && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg md:rounded-xl p-2 md:p-4 mb-2 md:mb-3">
                <p className="text-sm md:text-lg font-bold text-yellow-700">🏆 ¡Nivel {currentLevel} Completado!</p>
                <p className="text-xs md:text-sm text-yellow-600">
                  {currentLevel < TOTAL_LEVELS
                    ? '¡Siguiente nivel desbloqueado!'
                    : '¡Eres un experto! 🎉'}
                </p>
              </div>
            )}
            {passed && isLastSublevel && currentLevel < TOTAL_LEVELS && (
              <button onClick={() => { setCurrentLevel(currentLevel + 1); setScreen('sublevels'); }} className="btn-game text-xs md:text-base bg-gradient-to-r from-purple-400 to-violet-500 text-white shadow-lg">
                Ir al Nivel {currentLevel + 1} → 🎯
              </button>
            )}
            <button onClick={() => setScreen('sublevels')} className="btn-game text-xs md:text-base bg-gray-200 text-gray-700 hover:bg-gray-300">
              📋 Ver Subniveles
            </button>
            <button onClick={() => setScreen('home')} className="btn-game text-xs md:text-base bg-gray-100 text-gray-600 hover:bg-gray-200">
              🏠 Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

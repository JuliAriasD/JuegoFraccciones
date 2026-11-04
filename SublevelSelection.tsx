import { useDevice } from '../hooks/useDevice';

interface SublevelSelectionProps {
  level: number;
  sublevelProgress: { completed: boolean; stars: number }[];
  onSelectSublevel: (sublevel: number) => void;
  onBack: () => void;
}

const SUBLEVEL_INFO: Record<number, { title: string; subtitle: string; icon: string; description: string }[]> = {
  1: [
    { title: "Básico", subtitle: "Fracciones simples", icon: "🌱", description: "Aprende con fracciones simples como 1/2, 1/3 y 1/4." },
    { title: "Intermedio", subtitle: "Más partes", icon: "🌿", description: "Fracciones con más partes como 2/3, 3/4 y 2/5." },
    { title: "Avanzado", subtitle: "Fracciones complejas", icon: "🌳", description: "Domina fracciones como 5/8, 7/10 y más." },
  ],
  2: [
    { title: "Numerador", subtitle: "Partes que tomamos", icon: "🔝", description: "Aprende a identificar el número de arriba." },
    { title: "Denominador", subtitle: "Partes totales", icon: "🔽", description: "Aprende a identificar el número de abajo." },
    { title: "Ambos", subtitle: "¡Los dos!", icon: "🎯", description: "Identifica numerador y denominador juntos." },
  ],
  3: [
    { title: "Círculos", subtitle: "Como pizzas", icon: "🔵", description: "Visualiza fracciones en círculos divididos." },
    { title: "Barras", subtitle: "Como chocolate", icon: "📊", description: "Visualiza fracciones en barras rectangulares." },
    { title: "Conjuntos", subtitle: "Como frutas", icon: "🍎", description: "Visualiza fracciones en grupos de objetos." },
  ],
  4: [
    { title: "Ubicación", subtitle: "¿Dónde están?", icon: "📍", description: "Ubica fracciones en la recta numérica." },
    { title: "Comparación", subtitle: "¿Cuál es mayor?", icon: "⚖️", description: "Compara fracciones y ordénalas." },
    { title: "Equivalencias", subtitle: "Fracciones iguales", icon: "🔄", description: "Descubre fracciones equivalentes." },
  ],
  5: [
    { title: "Propias", subtitle: "Menos de 1", icon: "🟢", description: "Fracciones donde el numerador es menor." },
    { title: "Impropias", subtitle: "1 o más", icon: "🔴", description: "Fracciones donde el numerador es mayor." },
    { title: "Mixtos", subtitle: "Entero + fracción", icon: "🟡", description: "Convierte entre impropias y mixtas." },
  ],
};

const LEVEL_COLORS = [
  "from-red-400 to-pink-500",
  "from-blue-400 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-purple-400 to-violet-500",
  "from-yellow-400 to-orange-500",
];

const LEVEL_BGS = [
  "from-red-100 to-pink-100",
  "from-blue-100 to-indigo-100",
  "from-green-100 to-emerald-100",
  "from-purple-100 to-violet-100",
  "from-yellow-100 to-orange-100",
];

export default function SublevelSelection({ level, sublevelProgress, onSelectSublevel, onBack }: SublevelSelectionProps) {
  const sublevels = SUBLEVEL_INFO[level] || SUBLEVEL_INFO[1];
  const levelColor = LEVEL_COLORS[level - 1];
  const levelBg = LEVEL_BGS[level - 1];
  const device = useDevice();

  const isSublevelUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    return sublevelProgress[index - 1]?.completed;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${levelBg} p-2 md:p-4`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center py-3 md:py-6 animate-slide-up relative">
          <button
            onClick={onBack}
            className="absolute top-0 left-0 md:top-2 md:left-2 bg-white/80 rounded-full p-1.5 md:p-2 shadow hover:bg-white transition text-sm md:text-base"
          >
            ← 🏠
          </button>
          <h2 className={`${device === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'} font-black text-gray-800 mb-1 md:mb-2 mt-8 md:mt-0`}>
            Nivel {level}
          </h2>
          <p className={`${device === 'mobile' ? 'text-sm' : 'text-lg'} text-gray-600`}>
            Elige un subnivel para practicar
          </p>
        </div>

        {/* Sublevel Cards */}
        <div className={`grid gap-2 md:gap-4 mt-3 md:mt-6 ${
          device === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'
        }`}>
          {sublevels.map((sub, index) => {
            const subNum = index + 1;
            const unlocked = isSublevelUnlocked(index);
            const progress = sublevelProgress[index];

            return (
              <div
                key={subNum}
                onClick={() => unlocked && onSelectSublevel(subNum)}
                className={`level-card bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg ${!unlocked ? 'locked' : ''} animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <span className={`${device === 'mobile' ? 'text-4xl' : 'text-5xl'} mb-2 md:mb-3 block`}>{sub.icon}</span>
                  <h3 className={`font-bold text-gray-800 ${device === 'mobile' ? 'text-base' : 'text-lg'}`}>
                    {level}.{subNum}
                  </h3>
                  <h4 className={`font-bold text-gray-700 ${device === 'mobile' ? 'text-sm' : 'text-md'} mb-0.5 md:mb-1`}>
                    {sub.title}
                  </h4>
                  <p className={`text-gray-500 ${device === 'mobile' ? 'text-[10px]' : 'text-xs'} mb-1 md:mb-2`}>{sub.subtitle}</p>
                  <p className={`text-gray-600 ${device === 'mobile' ? 'text-xs' : 'text-sm'} mb-2 md:mb-3 line-clamp-2`}>{sub.description}</p>

                  {/* Stars */}
                  <div className="flex justify-center gap-0.5 md:gap-1 mb-2 md:mb-3">
                    {[0, 1, 2].map(i => (
                      <span key={i} className={`${device === 'mobile' ? 'text-base' : 'text-xl'} ${i < (progress?.stars || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Status */}
                  {!unlocked ? (
                    <div className="bg-gray-100 text-gray-500 rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-bold inline-block">
                      🔒 Bloqueado
                    </div>
                  ) : progress?.completed ? (
                    <div className={`bg-gradient-to-r ${levelColor} text-white rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-bold inline-block`}>
                      ✓ Completado
                    </div>
                  ) : (
                    <div className={`bg-gradient-to-r ${levelColor} text-white rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-bold inline-block`}>
                      🎮 10 ejercicios
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-4 md:mt-8 bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 text-center">
          <h3 className="text-gray-700 font-bold text-sm md:text-lg mb-2 md:mb-3">Progreso del Nivel {level}</h3>
          <div className="flex justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            {sublevelProgress.map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className={`${device === 'mobile' ? 'text-lg' : 'text-2xl'} ${p?.completed ? 'text-green-500' : 'text-gray-300'}`}>
                  {p?.completed ? '✅' : '⬜'}
                </span>
                <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">{level}.{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs md:text-sm">
            {sublevelProgress.filter(p => p?.completed).length} de 3 subniveles completados
          </p>
          <div className="progress-bar mt-2 md:mt-3 max-w-xs mx-auto">
            <div
              className="progress-bar-fill"
              style={{ width: `${(sublevelProgress.filter(p => p?.completed).length / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

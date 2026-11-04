import { useState, useMemo } from 'react';
import { generateExercises } from '../data/exercises';
import DragDropExercise from './DragDropExercise';
import DrawFraction from './DrawFraction';
import { useDevice } from '../hooks/useDevice';

interface LevelGameProps {
  level: number;
  sublevel: number;
  onBack: () => void;
  onComplete: (stars: number) => void;
}

const LEVEL_INFO = [
  { title: "¿Qué es una Fracción?", icon: "🍕", color: "from-red-400 to-pink-500", bg: "from-red-100 to-pink-100" },
  { title: "Numerador y Denominador", icon: "🔢", color: "from-blue-400 to-indigo-500", bg: "from-blue-100 to-indigo-100" },
  { title: "Representación Gráfica", icon: "🎨", color: "from-green-400 to-emerald-500", bg: "from-green-100 to-emerald-100" },
  { title: "Recta Numérica", icon: "📏", color: "from-purple-400 to-violet-500", bg: "from-purple-100 to-violet-100" },
  { title: "Tipos de Fracciones", icon: "🏆", color: "from-yellow-400 to-orange-500", bg: "from-yellow-100 to-orange-100" },
];

export default function LevelGame({ level, sublevel, onBack, onComplete }: LevelGameProps) {
  const EXERCISES_PER_SESSION = 10;
  const exercises = useMemo(() => generateExercises(level, sublevel, EXERCISES_PER_SESSION), [level, sublevel]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [exerciseMode, setExerciseMode] = useState<'quiz' | 'drag' | 'draw'>('quiz');
  const [drawMode, setDrawMode] = useState<'circle' | 'bar' | 'set'>('circle');
  const device = useDevice();

  const levelInfo = LEVEL_INFO[level - 1];
  const currentExercise = exercises[currentIndex];
  const progressPercent = (currentIndex / EXERCISES_PER_SESSION) * 100;

  const getMode = (index: number): 'quiz' | 'drag' | 'draw' => {
    const mod = index % 5;
    if (mod === 0 || mod === 1) return 'quiz';
    if (mod === 2 || mod === 3) return 'drag';
    return 'draw';
  };

  const getDrawMode = (index: number): 'circle' | 'bar' | 'set' => {
    const mod = index % 3;
    if (mod === 0) return 'circle';
    if (mod === 1) return 'bar';
    return 'set';
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    if (optionIndex === currentExercise.correctOption) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleDragComplete = (correct: boolean) => {
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex >= EXERCISES_PER_SESSION - 1) {
      const finalScore = score;
      const stars = finalScore >= EXERCISES_PER_SESSION * 0.9 ? 3 : finalScore >= EXERCISES_PER_SESSION * 0.7 ? 2 : finalScore >= EXERCISES_PER_SESSION * 0.5 ? 1 : 0;
      onComplete(stars);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setExerciseMode(getMode(nextIndex));
    setDrawMode(getDrawMode(nextIndex));
  };

  const renderQuiz = () => (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-3 md:p-6 animate-slide-up">
      <h3 className="text-base md:text-xl font-bold text-gray-800 mb-3 md:mb-4 text-center px-2">
        {currentExercise.question}
      </h3>

      {/* Visual for quiz */}
      {(exerciseMode === 'quiz' && currentExercise.type !== 'compare') && (
        <div className="flex justify-center mb-3 md:mb-4 bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2">
            {Array.from({ length: currentExercise.denominator }).map((_, i) => (
              <span
                key={i}
                className={`${device === 'mobile' ? 'text-2xl' : 'text-3xl'} transition-all ${
                  currentExercise.coloredIndices.includes(i) ? 'scale-110' : 'opacity-30 grayscale'
                }`}
              >
                {currentExercise.category.items[i % currentExercise.category.items.length]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Options */}
      <div className={`grid gap-2 md:gap-3 ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {currentExercise.options?.map((option, i) => {
          let btnClass = 'option-btn text-center text-sm md:text-base';
          if (selectedAnswer !== null) {
            if (i === currentExercise.correctOption) btnClass += ' correct';
            else if (i === selectedAnswer) btnClass += ' incorrect';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={btnClass}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`mt-3 md:mt-4 p-3 md:p-4 rounded-lg md:rounded-xl animate-slide-up ${
          selectedAnswer === currentExercise.correctOption
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <p className="font-bold text-sm md:text-lg">
            {selectedAnswer === currentExercise.correctOption ? '🎉 ¡Correcto!' : '💡 Respuesta correcta:'}
          </p>
          <p className="text-xs md:text-base text-gray-700 mt-1">{currentExercise.explanation}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${levelInfo.bg} p-2 md:p-4`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 md:mb-4 gap-1">
          <button onClick={onBack} className="bg-white/80 rounded-full p-1.5 md:p-2 shadow hover:bg-white transition shrink-0">
            <span className="text-sm md:text-base">← 🏠</span>
          </button>
          <div className="flex items-center gap-1 md:gap-2">
            <span className={`${device === 'mobile' ? 'text-xl' : 'text-2xl'}`}>{levelInfo.icon}</span>
            <span className="font-bold text-gray-700 text-xs md:text-base">
              Nv.{level}.{sublevel}
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {streak >= 3 && (
              <div className="bg-orange-100 rounded-full px-2 md:px-3 py-0.5 md:py-1 animate-pulse-glow">
                <span className="font-bold text-orange-600 text-xs md:text-sm">🔥 x{streak}</span>
              </div>
            )}
            <div className="bg-white/80 rounded-full px-2 md:px-4 py-0.5 md:py-1 shadow">
              <span className="font-bold text-gray-700 text-xs md:text-sm">⭐ {score}/{currentIndex + (showExplanation ? 1 : 0)}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-2 md:mb-3">
          <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-1">
            <span>Ejercicio {currentIndex + 1}/{EXERCISES_PER_SESSION}</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Exercise type indicator */}
        <div className="flex justify-center gap-2 mb-2 md:mb-4">
          <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold ${
            exerciseMode === 'quiz' ? 'bg-blue-100 text-blue-700' :
            exerciseMode === 'drag' ? 'bg-purple-100 text-purple-700' :
            'bg-green-100 text-green-700'
          }`}>
            {exerciseMode === 'quiz' && '📝 Quiz'}
            {exerciseMode === 'drag' && '🎯 Arrastra'}
            {exerciseMode === 'draw' && '🎨 Dibuja'}
          </span>
        </div>

        {/* Exercise */}
        {exerciseMode === 'quiz' && renderQuiz()}
        {exerciseMode === 'drag' && (
          <DragDropExercise
            key={currentIndex}
            exercise={currentExercise}
            onComplete={handleDragComplete}
          />
        )}
        {exerciseMode === 'draw' && (
          <DrawFraction
            key={currentIndex}
            exercise={currentExercise}
            mode={drawMode}
            onComplete={handleDragComplete}
          />
        )}

        {/* Next button */}
        {showExplanation && (
          <div className="mt-4 md:mt-6 text-center">
            <button
              onClick={handleNext}
              className={`btn-game text-sm md:text-lg px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r ${levelInfo.color} text-white shadow-lg`}
            >
              {currentIndex >= EXERCISES_PER_SESSION - 1 ? 'Ver Resultados 🏆' : 'Siguiente →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

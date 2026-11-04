import { useState, useRef } from 'react';
import { Exercise } from '../data/exercises';
import { useDevice } from '../hooks/useDevice';

interface DragDropExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export default function DragDropExercise({ exercise, onComplete }: DragDropExerciseProps) {
  const [placed, setPlaced] = useState<boolean[]>(new Array(exercise.denominator).fill(false));
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const dropRefs = useRef<(HTMLDivElement | null)[]>([]);
  const device = useDevice();

  const filledCount = placed.filter(Boolean).length;

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (draggedIndex !== null) {
      const newPlaced = [...placed];
      newPlaced[targetIndex] = !newPlaced[targetIndex];
      setPlaced(newPlaced);
      setDraggedIndex(null);
    }
  };

  const handleClick = (index: number) => {
    if (feedback) return;
    const newPlaced = [...placed];
    newPlaced[index] = !newPlaced[index];
    setPlaced(newPlaced);
  };

  const handleCheck = () => {
    const newCount = placed.filter(Boolean).length;
    if (newCount === exercise.numerator) {
      setFeedback('correct');
      setShowExplanation(true);
      onComplete(true);
    } else {
      setFeedback('incorrect');
      setAttempts(a => a + 1);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleReset = () => {
    setPlaced(new Array(exercise.denominator).fill(false));
    setFeedback(null);
    setShowExplanation(false);
  };

  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#1dd1a1', '#ee5a24'];

  // Responsive sizes
  const boxSize = device === 'mobile' ? 'w-14 h-14' : device === 'tablet' ? 'w-16 h-16' : 'w-20 h-20';
  const textSize = device === 'mobile' ? 'text-2xl' : device === 'tablet' ? 'text-3xl' : 'text-4xl';
  const gapSize = device === 'mobile' ? 'gap-2' : 'gap-3';

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-3 md:p-6 animate-slide-up">
      <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-4 text-center px-2">
        🎯 {exercise.question}
      </h3>

      <p className="text-center text-sm md:text-base text-gray-600 mb-3 md:mb-4 px-2">
        Toca las partes para colorear{' '}
        <strong className="text-purple-600">{exercise.numerator}</strong> de{' '}
        <strong className="text-blue-600">{exercise.denominator}</strong>
      </p>

      {/* Target fraction display */}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg md:rounded-xl px-4 md:px-6 py-2 md:py-3 shadow-md">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Fracción objetivo:</p>
          <div className={`fraction-display ${device === 'mobile' ? 'text-2xl' : 'text-3xl'} text-purple-700`}>
            <span className="numerator">{exercise.numerator}</span>
            <span className="denominator">{exercise.denominator}</span>
          </div>
        </div>
      </div>

      {/* Interactive grid */}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-6 w-full max-w-md">
          <div className={`flex flex-wrap justify-center ${gapSize}`}>
            {Array.from({ length: exercise.denominator }).map((_, i) => (
              <div
                key={i}
                ref={el => { dropRefs.current[i] = el; }}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, i)}
                onClick={() => handleClick(i)}
                className={`${boxSize} drop-zone flex items-center justify-center ${textSize} transition-all active:scale-90 ${
                  placed[i] ? 'filled' : ''
                } ${dragOverIndex === i ? 'drag-over' : ''} ${
                  feedback === 'correct' && placed[i] ? 'animate-pop' : ''
                } ${
                  feedback === 'incorrect' ? 'animate-shake' : ''
                }`}
                style={{
                  backgroundColor: placed[i] ? colors[i % colors.length] : 'white',
                  borderColor: placed[i] ? colors[i % colors.length] : undefined,
                }}
              >
                {exercise.category.items[i % exercise.category.items.length]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="text-center mb-3 md:mb-4">
        <p className="text-sm md:text-lg font-bold">
          Colores colocados: <span className="text-purple-600">{filledCount}</span> / <span className="text-blue-600">{exercise.numerator}</span>
        </p>
        <div className="progress-bar mt-2 max-w-xs mx-auto">
          <div
            className="progress-bar-fill"
            style={{ width: `${(filledCount / exercise.numerator) * 100}%` }}
          />
        </div>
      </div>

      {/* Buttons */}
      {!showExplanation && (
        <div className="flex justify-center gap-2 md:gap-3">
          <button
            onClick={handleReset}
            className="btn-game text-sm md:text-base bg-gray-200 text-gray-700 px-3 md:px-6 py-2 md:py-3"
          >
            🔄 Reiniciar
          </button>
          <button
            onClick={handleCheck}
            disabled={filledCount === 0}
            className={`btn-game text-sm md:text-base px-3 md:px-6 py-2 md:py-3 ${
              filledCount === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
            }`}
          >
            ✅ Verificar
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback === 'incorrect' && !showExplanation && (
        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border-2 border-red-200 rounded-lg md:rounded-xl text-center animate-shake">
          <p className="text-sm md:text-base font-bold text-red-700">
            😅 ¡Casi! Necesitas exactamente {exercise.numerator} partes coloreadas.
            {attempts >= 2 && ` Tienes ${filledCount}.`}
          </p>
        </div>
      )}

      {showExplanation && (
        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-green-50 border-2 border-green-200 rounded-lg md:rounded-xl animate-slide-up">
          <p className="font-bold text-green-700 text-base md:text-lg mb-1">🎉 ¡Excelente!</p>
          <p className="text-sm md:text-base text-gray-700">{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}

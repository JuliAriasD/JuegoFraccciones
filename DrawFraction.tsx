import { useState } from 'react';
import { Exercise } from '../data/exercises';
import { useDevice } from '../hooks/useDevice';

interface DrawFractionProps {
  exercise: Exercise;
  mode: 'circle' | 'bar' | 'set';
  onComplete: (correct: boolean) => void;
}

export default function DrawFraction({ exercise, mode, onComplete }: DrawFractionProps) {
  const [colored, setColored] = useState<boolean[]>(new Array(exercise.denominator).fill(false));
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const device = useDevice();

  const coloredCount = colored.filter(Boolean).length;

  const toggleColor = (index: number) => {
    if (feedback) return;
    const newColored = [...colored];
    newColored[index] = !newColored[index];
    setColored(newColored);
  };

  const handleCheck = () => {
    const count = colored.filter(Boolean).length;
    if (count === exercise.numerator) {
      setFeedback('correct');
      setShowExplanation(true);
      onComplete(true);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleReset = () => {
    setColored(new Array(exercise.denominator).fill(false));
    setFeedback(null);
    setShowExplanation(false);
  };

  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];

  // Responsive sizes
  const circleSize = device === 'mobile' ? 140 : device === 'tablet' ? 180 : 200;
  const barHeight = device === 'mobile' ? 50 : device === 'tablet' ? 60 : 70;

  const renderCircle = () => {
    const size = circleSize;
    const center = size / 2;
    const radius = size / 2 - 8;
    const angleStep = 360 / exercise.denominator;

    return (
      <svg
        width="100%"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="cursor-pointer max-w-full"
        style={{ maxWidth: `${size}px` }}
      >
        {Array.from({ length: exercise.denominator }).map((_, i) => {
          const startAngle = i * angleStep - 90;
          const endAngle = (i + 1) * angleStep - 90;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = center + radius * Math.cos(startRad);
          const y1 = center + radius * Math.sin(startRad);
          const x2 = center + radius * Math.cos(endRad);
          const y2 = center + radius * Math.sin(endRad);
          const largeArc = angleStep > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={colored[i] ? colors[i % colors.length] : '#f0f0f0'}
              stroke="white"
              strokeWidth={device === 'mobile' ? 2 : 3}
              onClick={() => toggleColor(i)}
              className="transition-all hover:opacity-80 active:opacity-60"
              style={{ cursor: 'pointer' }}
            />
          );
        })}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#333" strokeWidth={device === 'mobile' ? 1.5 : 2} />
      </svg>
    );
  };

  const renderBar = () => {
    const width = 320;
    const height = barHeight;
    const segWidth = width / exercise.denominator;

    return (
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="cursor-pointer max-w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: exercise.denominator }).map((_, i) => (
          <rect
            key={i}
            x={i * segWidth}
            y={0}
            width={segWidth}
            height={height}
            fill={colored[i] ? colors[i % colors.length] : '#f0f0f0'}
            stroke="white"
            strokeWidth={device === 'mobile' ? 2 : 3}
            onClick={() => toggleColor(i)}
            className="transition-all hover:opacity-80 active:opacity-60"
            style={{ cursor: 'pointer' }}
            rx="4"
          />
        ))}
        <rect x={0} y={0} width={width} height={height} fill="none" stroke="#333" strokeWidth={device === 'mobile' ? 1.5 : 2} rx="4" />
      </svg>
    );
  };

  const renderSet = () => {
    const itemSize = device === 'mobile' ? 'w-12 h-12' : device === 'tablet' ? 'w-14 h-14' : 'w-16 h-16';
    const textSize = device === 'mobile' ? 'text-2xl' : device === 'tablet' ? 'text-3xl' : 'text-4xl';
    const gapSize = device === 'mobile' ? 'gap-2' : 'gap-3';

    return (
      <div className={`flex flex-wrap justify-center ${gapSize} p-2 md:p-4`}>
        {Array.from({ length: exercise.denominator }).map((_, i) => (
          <div
            key={i}
            onClick={() => toggleColor(i)}
            className={`${itemSize} flex items-center justify-center ${textSize} rounded-xl border-3 transition-all cursor-pointer active:scale-95 ${
              colored[i]
                ? 'scale-110 shadow-lg border-green-400'
                : 'opacity-40 grayscale border-gray-300 hover:opacity-70'
            }`}
            style={{
              backgroundColor: colored[i] ? colors[i % colors.length] + '30' : 'white',
              borderWidth: '3px',
            }}
          >
            {exercise.category.items[i % exercise.category.items.length]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-3 md:p-6 animate-slide-up">
      <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-4 text-center">
        🎨 {exercise.question}
      </h3>
      <p className="text-center text-sm md:text-base text-gray-600 mb-3 md:mb-4 px-2">
        Toca las partes para colorear exactamente{' '}
        <strong className="text-purple-600">{exercise.numerator}</strong> de{' '}
        <strong className="text-blue-600">{exercise.denominator}</strong>
      </p>

      {/* Target fraction */}
      <div className="flex justify-center mb-3 md:mb-4">
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg md:rounded-xl px-4 md:px-6 py-2 md:py-3 shadow-md">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Dibuja esta fracción:</p>
          <div className={`fraction-display ${device === 'mobile' ? 'text-2xl' : 'text-3xl'} text-blue-700`}>
            <span className="numerator">{exercise.numerator}</span>
            <span className="denominator">{exercise.denominator}</span>
          </div>
        </div>
      </div>

      {/* Drawing area */}
      <div className="flex justify-center mb-3 md:mb-4 bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-4 overflow-hidden">
        <div className="w-full flex justify-center">
          {mode === 'circle' && renderCircle()}
          {mode === 'bar' && renderBar()}
          {mode === 'set' && renderSet()}
        </div>
      </div>

      {/* Counter */}
      <div className="text-center mb-3 md:mb-4">
        <p className="text-sm md:text-lg font-bold">
          Partes coloreadas: <span className="text-purple-600">{coloredCount}</span> / <span className="text-blue-600">{exercise.numerator}</span>
        </p>
      </div>

      {/* Buttons */}
      {!showExplanation && (
        <div className="flex justify-center gap-2 md:gap-3">
          <button onClick={handleReset} className="btn-game text-sm md:text-base bg-gray-200 text-gray-700 px-3 md:px-6 py-2 md:py-3">
            🔄 Borrar
          </button>
          <button
            onClick={handleCheck}
            disabled={coloredCount === 0}
            className={`btn-game text-sm md:text-base px-3 md:px-6 py-2 md:py-3 ${
              coloredCount === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
            }`}
          >
            ✅ Verificar
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback === 'incorrect' && (
        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border-2 border-red-200 rounded-lg md:rounded-xl text-center animate-shake">
          <p className="text-sm md:text-base font-bold text-red-700">
            😅 Necesitas colorear exactamente {exercise.numerator} partes. Tienes {coloredCount}.
          </p>
        </div>
      )}

      {showExplanation && (
        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-green-50 border-2 border-green-200 rounded-lg md:rounded-xl animate-slide-up">
          <p className="font-bold text-green-700 text-base md:text-lg mb-1">🎉 ¡Perfecto!</p>
          <p className="text-sm md:text-base text-gray-700">{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}

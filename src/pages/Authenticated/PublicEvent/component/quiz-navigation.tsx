import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Left Panel Component - Simple and Clean
const QuizNavigation = ({ questions, answers, currentQuestion, onQuestionSelect, timeLeft }) => {
    const [soundEnabled, setSoundEnabled] = useState(true);
  const playTickSound = () => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // Create oscillator for tick sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      // Connect audio nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      // Set frequency for tick sound (higher pitch for urgency)
      if (timeLeft <= 10) {
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Higher pitch when time is low
      } else {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Normal tick
      }
      // Set volume
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      // Play the sound
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  // Play tick sound when timer changes
  useEffect(() => {
    if (timeLeft > 0 && timeLeft <= 20) { 
      playTickSound();
    }
  }, [timeLeft, soundEnabled]);
  return (
    <div className="bg-amber-800 text-white p-4 rounded-lg">
      {/* Timer */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">टाइमर</span>
        </div>
        <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-300' : 'text-white'}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="w-full bg-amber-700 rounded-full h-1 mt-2">
          <div
            className={`h-1 rounded-full ${timeLeft <= 10 ? 'bg-red-400' : 'bg-white'}`}
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Numbers */}
      <div className="mb-4">
        <p className="text-sm mb-3">प्रश्न चुनें:</p>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={`
                w-8 h-8 rounded-full text-sm font-bold
                ${currentQuestion === index 
                  ? 'bg-white text-amber-800' 
                  : answers[question.id] 
                    ? 'bg-green-500 text-white' 
                    : 'bg-amber-600 text-white hover:bg-amber-500'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="text-sm">
        <p>प्रगति: {Object.keys(answers).length} / {questions.length}</p>
        <div className="w-full bg-amber-700 rounded-full h-1 mt-1">
          <div
            className="bg-green-400 h-1 rounded-full"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;
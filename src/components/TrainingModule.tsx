import React, { useState, useEffect } from 'react';
import { Keyboard, Mic, MicOff, Play, Pause, RotateCcw, Check } from 'lucide-react';

interface TrainingModuleProps {
  username: string;
  onComplete: () => void;
}

const TRAINING_TEXTS = [
  'Quick brown foxes jump over 13 lazy dogs! @home, they mix #hashtags, $dollars, &ampersands, while stars sparkle. (Yes, [brackets] and {braces} too!) Nothing\'s odd; everything\'s fine: ~tilde, backtick, |pipes|, \\slashes/, and ^carets^ are here.',
  'Why? Because 1 fox said: "Check all keys — 0 through 9, plus symbols like !, ?, %, =, +, <, >, and quotes: \'single\' "double"." Everyone nodded. Curly braces, slashes, semicolons; colons, commas, periods... all join the keyboard jamboree!'
];

export const TrainingModule: React.FC<TrainingModuleProps> = ({ username, onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [completedTexts, setCompletedTexts] = useState<boolean[]>([false, false]);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const currentText = TRAINING_TEXTS[currentTextIndex];

  useEffect(() => {
    if (typedText.length === 1 && !startTime) {
      setStartTime(new Date());
    }

    // Calculate WPM and accuracy
    if (startTime && typedText.length > 0) {
      const timeElapsed = (Date.now() - startTime.getTime()) / 60000; // in minutes
      const wordsTyped = typedText.trim().split(' ').length;
      setWpm(Math.round(wordsTyped / timeElapsed) || 0);

      // Calculate accuracy
      let correct = 0;
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) {
          correct++;
        }
      }
      setAccuracy(Math.round((correct / typedText.length) * 100) || 100);
    }
  }, [typedText, startTime, currentText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTypedText(value);

    // Check if text is completed
    if (value === currentText) {
      const newCompletedTexts = [...completedTexts];
      newCompletedTexts[currentTextIndex] = true;
      setCompletedTexts(newCompletedTexts);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop audio recording
  };

  const nextText = () => {
    if (currentTextIndex < TRAINING_TEXTS.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
      setTypedText('');
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
    }
  };

  const resetText = () => {
    setTypedText('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
  };

  const handleCompleteTraining = async () => {
    setIsTraining(true);
    // Simulate ML training
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsTraining(false);
    onComplete();
  };

  const allTextsCompleted = completedTexts.every(completed => completed);

  if (isTraining) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 shadow-2xl">
            <Keyboard className="w-16 h-16 text-orange-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-white mb-4">Training AI Model</h2>
            <p className="text-slate-300 mb-6">Learning your unique keystroke patterns...</p>
            <div className="w-64 bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Keystroke Training</h1>
          <p className="text-slate-300">Welcome, <span className="text-orange-400">{username}</span>! Let's train your typing pattern.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            {TRAINING_TEXTS.map((_, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  completedTexts[index]
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentTextIndex === index
                    ? 'border-orange-500 text-orange-400'
                    : 'border-slate-600 text-slate-400'
                }`}
              >
                {completedTexts[index] ? <Check className="w-6 h-6" /> : index + 1}
              </div>
            ))}
          </div>
          <div className="text-center text-slate-300">
            Text {currentTextIndex + 1} of {TRAINING_TEXTS.length}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-white">{wpm}</div>
            <div className="text-sm text-slate-400">WPM</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-white">{accuracy}%</div>
            <div className="text-sm text-slate-400">Accuracy</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 text-center">
            <button
              onClick={toggleRecording}
              className={`flex items-center justify-center space-x-2 mx-auto px-4 py-2 rounded-lg transition-all duration-200 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-slate-600 hover:bg-slate-500 text-slate-300'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="text-sm">{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
            </button>
          </div>
        </div>

        {/* Training Area */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Type the following text exactly:</h3>
            <div className="bg-slate-700 p-4 rounded-lg text-slate-300 leading-relaxed text-base mb-4">
              {currentText.split('').map((char, index) => {
                let className = '';
                if (index < typedText.length) {
                  className = typedText[index] === char ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30';
                } else if (index === typedText.length) {
                  className = 'bg-orange-400/50';
                }
                return (
                  <span key={index} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          <textarea
            value={typedText}
            onChange={handleTextChange}
            className="w-full h-32 p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Start typing here..."
          />

          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-2">
              <button
                onClick={resetText}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex space-x-2">
              {currentTextIndex < TRAINING_TEXTS.length - 1 && completedTexts[currentTextIndex] && (
                <button
                  onClick={nextText}
                  className="flex items-center space-x-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200"
                >
                  <span>Next Text</span>
                  <Play className="w-4 h-4" />
                </button>
              )}

              {allTextsCompleted && (
                <button
                  onClick={handleCompleteTraining}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200"
                >
                  <Check className="w-4 h-4" />
                  <span>Complete Training</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-slate-700/50 rounded-lg p-6 border border-slate-600">
          <h4 className="text-lg font-semibold text-white mb-3">Training Instructions:</h4>
          <ul className="text-slate-300 space-y-2 text-sm">
            <li>• Type each text exactly as shown, including all punctuation and symbols</li>
            <li>• Keep the microphone recording enabled to capture keystroke sounds</li>
            <li>• Try to maintain your natural typing rhythm</li>
            <li>• Complete both texts to train the AI model effectively</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
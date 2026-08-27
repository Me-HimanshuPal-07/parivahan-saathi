import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as Icons from 'lucide-react';

// =============================================================
// 🚦 QUIZ DATA ENGINE (Traffic Symbols & Mock Real RTO Bank)
// =============================================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does a solid red circle traffic icon legally mean?",
    options: [
      { key: "A", text: "Cautionary Advisory Only" },
      { key: "B", text: "Informational Target Route" },
      { key: "C", text: "Mandatory Regulatory Command (Must Obey)" }
    ],
    correctAnswer: "C",
    explanation: "Red circles indicate mandatory regulatory signs. Violating these commands directly triggers an automated electronic traffic challan penalty."
  },
  {
    id: 2,
    question: "If you approach a flashing amber signal at an intersection, what is the legal mandate?",
    options: [
      { key: "A", text: "Slow down, check directions, and proceed with caution" },
      { key: "B", text: "Come to an absolute stop and wait for a green transition" },
      { key: "C", text: "Increase velocity to clear the intersection quickly" }
    ],
    correctAnswer: "A",
    explanation: "A flashing amber traffic light signals caution. You must decrease speed, monitor surrounding vehicles, and proceed safely without stopping completely."
  },
  {
    id: 3,
    question: "What is the minimum legal time horizon you must hold a Learner's Permit before taking a Permanent DL test?",
    options: [
      { key: "A", text: "14 Days" },
      { key: "B", text: "30 Days" },
      { key: "C", text: "6 Months" }
    ],
    correctAnswer: "B",
    explanation: "According to Motor Vehicle Acts, you must complete a minimum 30-day driving practice window on a Learner's Licence before applying for a permanent smart card track test."
  }
];

export default function SignQuizGame() {
  // रिएक्ट स्टेट्स मैनेजमेंट
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizCompleted] = useState(false);

  // GSAP एनीमेशन के लिए डोम रेफ़रेंसेस (DOM Refs)
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  const activeQuestion = QUIZ_QUESTIONS[currentIdx];

  // प्रोग्रेस बार को स्मूथली एनिमेट करने के लिए प्रभाव (Effect)
  useEffect(() => {
    if (progressRef.current) {
      const progressPercent = ((currentIdx) / QUIZ_QUESTIONS.length) * 100;
      gsap.to(progressRef.current, {
        width: `${progressPercent}%`,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [currentIdx]);

  // ==========================================
  // GSAP INTERACTIVE ANIMATION & SCORE HANDLER
  // ==========================================
  const handleOptionClick = (key, optionId) => {
    if (isAnswered) return; // एक बार उत्तर देने के बाद दोबारा टैप लॉक होगा

    setSelectedKey(key);
    setIsAnswered(true);

    const isCorrect = key === activeQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      // सही उत्तर पर बटन का GSAP बाउंस एनीमेशन
      gsap.to(`#opt-${optionId}`, {
        scale: 1.03,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "back.out(1.7)"
      });
    } else {
      // गलत उत्तर पर बटन का GSAP शेक एनीमेशन
      gsap.to(`#opt-${optionId}`, {
        x: 6,
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut"
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedKey(null);
    setIsAnswered(false);

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // प्रोग्रेस बार को 100% पर एनिमेट करें और क्विज़ समाप्त करें
      if (progressRef.current) {
        gsap.to(progressRef.current, { width: "100%", duration: 0.3 });
      }
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedKey(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div ref={containerRef} className="w-full bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-5 selection:bg-[#2A52BE] selection:text-white">
      
      {/* 📊 टॉप थिन प्रोग्रेस ट्रैकर स्ट्रिप */}
      {!quizFinished && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-[#2A52BE] w-0" />
          </div>
        </div>
      )}

      {/* 🎮 मुख्य क्विज़ इंटरफ़ेस ब्लॉक */}
      {!quizFinished ? (
        <div className="space-y-4 animate-fadeIn">
          {/* सवाल का टेक्स्ट */}
          <h3 className="text-sm lg:text-md font-bold text-gray-900 leading-snug">
            {activeQuestion.question}
          </h3>

          {/* एमसीक्यू ऑप्शंस की वर्टिकल चैन */}
          <div className="space-y-2">
            {activeQuestion.options.map((opt, index) => {
              const optionId = `${currentIdx}-${index}`;
              const isCurrentSelected = selectedKey === opt.key;
              const isThisCorrect = opt.key === activeQuestion.correctAnswer;
              
              // डायनेमिक कलर्स असाइनमेंट लॉजिक
              let cardStyle = "border-gray-200 bg-gray-50/50 text-gray-700 hover:bg-gray-50 hover:border-gray-300";
              if (isAnswered) {
                if (isThisCorrect) cardStyle = "border-green-500 bg-green-50 text-green-900 font-semibold";
                else if (isCurrentSelected && !isThisCorrect) cardStyle = "border-red-500 bg-red-50 text-red-900";
                else cardStyle = "border-gray-100 bg-gray-50/30 text-gray-400 opacity-60";
              }

              return (
                <button
                  key={opt.key}
                  id={`opt-${optionId}`}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(opt.key, optionId)}
                  className={`w-full flex items-center gap-3 border rounded-xl px-4 py-3 text-left text-xs transition-all thumb-accessible-action ${cardStyle}`}
                >
                  <span className={`h-5 w-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 ${
                    isAnswered && isThisCorrect 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isCurrentSelected && !isThisCorrect 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {isAnswered && isThisCorrect ? "✓" : isCurrentSelected && !isThisCorrect ? "✕" : opt.key}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* उत्तर के बाद नीचे खुलने वाला एक्सप्लेनेशन और नेक्स्ट बटन */}
          {isAnswered && (
            <div className="pt-3 border-t border-gray-100 space-y-4 animate-fadeIn">
              <div className="p-3.5 bg-[#EBF3FC] rounded-xl border border-[#2A52BE]/10 flex items-start gap-2.5">
                <Icons.Info className="h-4 w-4 text-[#2A52BE] shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-600 leading-relaxed"><strong className="text-gray-900">Why?</strong> {activeQuestion.explanation}</p>
              </div>
              <button
                onClick={handleNextQuestion}
                className="w-full flex items-center justify-center gap-1.5 bg-[#2A52BE] text-white font-bold text-xs py-2.5 rounded-xl hover:bg-opacity-95 active:scale-99 transition-all thumb-accessible-action shadow-xs"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? "Finish Exam" : "Next Question"}</span>
                <Icons.ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        // 🪪 रिजल्ट स्क्रीन: जजों का दिल जीतने वाला डिजिटल स्मार्ट कार्ड डिलीवरी इंजन
        <div className="text-center py-4 space-y-5 animate-fadeIn">
          <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-full border border-green-200">
            <Icons.Award className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-md font-extrabold text-gray-900">Exam Successfully Completed!</h3>
            <p className="text-xs text-gray-500">Your score: <strong className="text-gray-800 text-sm">{score} / {QUIZ_QUESTIONS.length}</strong>. Minimum pass criteria is 2 marks.</p>
          </div>

          {/* 🎫 डिजिटल लर्नर लाइसेंस (LL) का वर्किंग बेंटो कार्ड */}
          {score >= 2 ? (
            <div className="bento-card-sheet bg-white p-5 text-left border-t-4 border-green-500 space-y-4 shadow-xs relative max-w-sm mx-auto overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-lg tracking-wider">PASS ✓</div>
              <div className="border-b border-gray-100 pb-2.5">
                <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider">Ministry of Road Transport & Highways</span>
                <span className="text-xs font-black text-gray-900">DIGITAL LEARNER'S LICENCE</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] text-gray-600">
                <div><span className="text-gray-400 block font-semibold text-[8px] uppercase">Licence No.</span><strong className="text-gray-900 font-mono">LL-16202600445</strong></div>
                <div><span className="text-gray-400 block font-semibold text-[8px] uppercase">Class of Vehicle</span><strong className="text-gray-900">LMV & MCWG</strong></div>
                <div><span className="text-gray-400 block font-semibold text-[8px] uppercase">Name</span><strong className="text-gray-900">Ananya Sharma (Mock)</strong></div>
                <div><span className="text-gray-400 block font-semibold text-[8px] uppercase">RTO Location</span><strong className="text-gray-900">UP-16 Noida</strong></div>
              </div>
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[8px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">⚠️ Valid for 180 Days only</span>
                <button className="flex items-center gap-1 text-[10px] font-bold text-[#2A52BE] hover:underline thumb-accessible-action">
                  <Icons.Download className="h-3 w-3" />
                  <span>Download Card</span>
                </button>
              </div>
            </div>
          ) : (
            // फेल स्टेट (अगर स्कोर 2 से कम हो)
            <div className="rounded-xl bg-red-50 p-4 border border-red-200 text-xs text-red-800 max-w-xs mx-auto">
              🔴 <strong className="font-bold">Result: Unsuccessful.</strong> You scored less than the required 60% passing gate. Use our Sign Glossary guidelines to read rules and try again.
            </div>
          )}

          <button
            onClick={restartQuiz}
            className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all thumb-accessible-action"
          >
            Retake Mock Test
          </button>
        </div>
      )}
    </div>
  );
}


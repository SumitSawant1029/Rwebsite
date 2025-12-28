import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";

export default function Wishes() {
  const [step, setStep] = useState(0); // 0: initial, 1: lights, 2: music, 3: cake, 4: blow, 5: confetti, 6: message
  const [lightsOn, setLightsOn] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [showCakePopup, setShowCakePopup] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [typedText, setTypedText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const finalStepRef = useRef(null);
  
  const messageText = `
  On your special day, I want to tell you something truly from the heart...
  
  You are the kind of person who brings warmth wherever you go.
  Your smile heals, your presence comforts,
  and your kindness creates its own little universe of love.

  I hope this year gives you every joy, every dream, and every moment that you truly deserve.

  You are cherished.
  You are appreciated.
  You are loved — more than words can ever describe.

  Happy Birthday, with all my heart 💖✨
  `;

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/songs/happy-birthday.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Typewriter effect for final message
  useEffect(() => {
    if (step !== 6) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(messageText.substring(0, index));
      index++;
      
      if (index > messageText.length) clearInterval(interval);
    }, 40);
    
    return () => clearInterval(interval);
  }, [step]);

  // Reset scroll when final step appears
  useEffect(() => {
    if (step === 6 && finalStepRef.current) {
      window.scrollTo(0, 0);
      finalStepRef.current.scrollTop = 0;
    }
  }, [step]);

  const handleLightUp = () => {
    setLightsOn(true);
    setTimeout(() => setStep(1), 500);
  };

  const handleMusicOn = () => {
    setMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.log);
    }
    setTimeout(() => setStep(2), 500);
  };

  const handleCakeClick = () => {
    setShowCakePopup(true);
  };

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setShowCakePopup(false);
    
    // Play blow sound
    const blowSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-candle-blow-738.mp3");
    blowSound.play();
    
    // Show confetti
    setShowConfetti(true);
    setStep(4);
    
    setTimeout(() => {
      setStep(5);
    }, 3000);
    
    setTimeout(() => {
      setStep(6);
      setShowConfetti(false);
    }, 5000);
  };

  const handleSkipToVideo = () => {
    setStep(6);
    setLightsOn(true);
    setMusicPlaying(true);
    if (audioRef.current && !musicPlaying) {
      audioRef.current.play().catch(console.log);
    }
  };

  // Background gradient based on lights state
  const getBackgroundStyle = () => {
    if (!lightsOn) {
      return {
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        animation: "none"
      };
    }
    return {
      background: "linear-gradient(135deg, #ff4d79, #ff78b5, #ffa8e6)",
      animation: "bgMove 8s ease infinite"
    };
  };

  return (
    <div 
      className="big-container"
      style={getBackgroundStyle()}
    >
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={step === 4}
          numberOfPieces={step === 4 ? 500 : 200}
          gravity={0.1}
        />
      )}

      {/* Step 0: Initial - Light Up Button */}
      {step === 0 && (
        <div className="step-container">
          <h1 className="title">🎉 Happy Birthday! 🎂</h1>
          <p className="subtitle">Let's light up the celebration! 💡</p>
          <button className="action-btn glow-btn" onClick={handleLightUp}>
            ✨ Light Up the Party! ✨
          </button>
        </div>
      )}

      {/* Step 1: Music ON Button */}
      {step === 1 && (
        <div className="step-container">
          <h1 className="title">🎉 Lights Are On! 🎉</h1>
          <p className="subtitle">Now let's add some music! 🎵</p>
          <button className="action-btn music-btn" onClick={handleMusicOn}>
            🎵 Turn On the Music! 🎵
          </button>
          <div className="floating-emojis">✨ 🎶 💖 ✨</div>
        </div>
      )}

      {/* Step 2: Cake with Candles */}
      {step === 2 && (
        <div className="step-container">
          <h1 className="title">🎶 Music is Playing! 🎶</h1>
          <p className="subtitle">Here's your birthday cake! 🎂</p>
          
          <div className="cake-container" onClick={handleCakeClick}>
            <div className="cake">
              <div className="cake-top"></div>
              <div className="cake-middle"></div>
              <div className="cake-bottom"></div>
              
              {/* Candles - FIXED VERSION */}
              {candlesLit && (
                <div className="candles-container">
                  <div className="candle">
                    <div className="flame"></div>
                    <div className="candle-body"></div>
                  </div>
                  <div className="candle">
                    <div className="flame"></div>
                    <div className="candle-body"></div>
                  </div>
                  <div className="candle">
                    <div className="flame"></div>
                    <div className="candle-body"></div>
                  </div>
                  <div className="candle">
                    <div className="flame"></div>
                    <div className="candle-body"></div>
                  </div>
                  <div className="candle">
                    <div className="flame"></div>
                    <div className="candle-body"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <p className="instruction">Tap the cake to blow out the candles! 🎂</p>
          <div className="floating-emojis">✨ 🕯️ 🎂 ✨</div>
        </div>
      )}

      {/* Step 3: Blow Candles Popup */}
      {showCakePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Blow Out the Candles! 🎂</h2>
            <p>Make a wish and blow out the candles!</p>
            <button className="blow-btn" onClick={handleBlowCandles}>
              🎂 Blow Candles! 🎂
            </button>
            <div className="breath-indicator">
              <div className="breath-dot"></div>
              <p>Take a deep breath...</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confetti Celebration */}
      {step === 4 && (
        <div className="step-container celebration">
          <h1 className="title big-celebration">🎉 HAPPY BIRTHDAY! 🎉</h1>
          <div className="confetti-emoji">🎊 🎈 🎉 🥳 🎁</div>
          <p className="subtitle">Wishing you all the happiness in the world! ✨</p>
        </div>
      )}

      {/* Step 5: Birthday Wish */}
      {step === 5 && (
        <div className="step-container">
          <h1 className="title">🎂 Happy Birthday! 🎂</h1>
          <div className="heart-message">💖 May your day be filled with joy and laughter! 💖</div>
          <div className="sparkle-animation">✨ ✨ ✨</div>
        </div>
      )}

      {/* Step 6: Final Message with Video - FIXED SCROLLING ISSUE */}
      {step === 6 && (
        <div className="final-step-container" ref={finalStepRef}>
          <div className="final-step-content">
            <h1 className="title">A Special Message For You 💌</h1>
            
            {/* Video container with fixed position */}
            <div className="video-container-fixed">
              <video
                ref={videoRef}
                src="/videos/birthday-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="birthday-video-fixed"
              />
            </div>
            
            {/* Message container with scrollable content */}
            <div className="message-container-scrollable">
              <div className="typed-message-fixed">
                {typedText.split("\n").map((line, i) => (
                  <p key={i} className="message-line">{line}</p>
                ))}
              </div>
              
              {musicPlaying && (
                <div className="music-controls-fixed">
                  <button 
                    className="music-btn-small"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.pause();
                        setMusicPlaying(false);
                      }
                    }}
                  >
                    🔇 Pause Music
                  </button>
                  <button 
                    className="music-btn-small"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.play();
                        setMusicPlaying(true);
                      }
                    }}
                    style={{marginLeft: '10px'}}
                  >
                    🔊 Play Music
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Skip button for testing */}
      {step < 6 && (
        <button className="skip-btn" onClick={handleSkipToVideo}>
          Skip to Video
        </button>
      )}

      <style jsx>{`
        /* Main Container */
        .big-container {
          min-height: 100vh;
          padding: 20px;
          text-align: center;
          background-size: 400% 400%;
          color: white;
          position: relative;
          overflow-x: hidden;
          transition: background 1s ease;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .step-container {
          animation: fadeIn 1s ease;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Titles */
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 20px 0;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          animation: glow 2s infinite alternate;
        }

        .big-celebration {
          font-size: 3rem;
          animation: pulse 1s infinite;
        }

        @keyframes glow {
          from { text-shadow: 0 0 10px #fff; }
          to { text-shadow: 0 0 25px #fff, 0 0 50px #ffd9f1; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .subtitle {
          font-size: 1.3rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        /* Buttons */
        .action-btn {
          font-size: 1.5rem;
          padding: 18px 35px;
          border-radius: 50px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 20px 0;
          min-width: 300px;
        }

        .glow-btn {
          background: linear-gradient(135deg, #ffd700, #ffaa00);
          color: #333;
          box-shadow: 0 0 40px #ffd700;
          animation: glowPulse 2s infinite;
        }

        .music-btn {
          background: linear-gradient(135deg, #4ecdc4, #44a08d);
          color: white;
          box-shadow: 0 0 40px #4ecdc4;
        }

        .blow-btn {
          font-size: 1.4rem;
          padding: 15px 30px;
          border-radius: 30px;
          border: none;
          background: linear-gradient(135deg, #ff4d79, #ff78b5);
          color: white;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(255, 77, 121, 0.5);
          animation: pulse 1.5s infinite;
          margin: 20px 0;
        }

        .action-btn:hover, .blow-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 50px currentColor;
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 20px #ffd700; }
          50% { box-shadow: 0 0 40px #ffd700; }
          100% { box-shadow: 0 0 20px #ffd700; }
        }

        /* Cake - FIXED VERSION */
        .cake-container {
          margin: 40px auto;
          cursor: pointer;
          position: relative;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .cake {
          position: relative;
          width: 200px;
          height: 120px;
          margin: 0 auto;
        }

        .cake-top {
          position: absolute;
          top: 0;
          left: 25px;
          width: 150px;
          height: 40px;
          background: #ff99cc;
          border-radius: 50% 50% 0 0;
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
        }

        .cake-middle {
          position: absolute;
          top: 30px;
          left: 15px;
          width: 170px;
          height: 40px;
          background: #ff6699;
          border-radius: 10px;
        }

        .cake-bottom {
          position: absolute;
          top: 60px;
          width: 200px;
          height: 60px;
          background: #ff3366;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* Candles Container - FIXED POSITIONING */
        .candles-container {
          position: absolute;
          top: -40px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          padding: 0 15px;
          z-index: 10;
        }

        .candle {
          position: relative;
          width: 10px;
          height: 40px;
        }

        .candle-body {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(white, #ffccff);
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(255,255,255,0.5);
        }

        .flame {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 15px;
          height: 25px;
          background: linear-gradient(orange, yellow);
          border-radius: 50% 50% 20% 20%;
          animation: flicker 0.5s infinite alternate;
          box-shadow: 0 0 20px orange;
          z-index: 11;
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 0.8; }
          50% { transform: translateX(-50%) scale(1.1); opacity: 1; }
          100% { transform: translateX(-50%) scale(0.9); opacity: 0.9; }
        }

        /* Popup */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .popup-content {
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 30px;
          border-radius: 20px;
          max-width: 400px;
          width: 90%;
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Breath Indicator */
        .breath-indicator {
          margin-top: 20px;
        }

        .breath-dot {
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #4ecdc4, #44a08d);
          border-radius: 50%;
          margin: 0 auto;
          animation: breath 3s infinite ease-in-out;
        }

        @keyframes breath {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        /* FINAL STEP - FIXED LAYOUT */
        .final-step-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #ff4d79, #ff78b5, #ffa8e6);
          animation: bgMove 8s ease infinite;
          overflow-y: auto; /* Allow scrolling for the entire container */
          -webkit-overflow-scrolling: touch;
        }

        .final-step-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Fixed Video Container */
        .video-container-fixed {
          width: 100%;
          max-width: 500px;
          margin: 20px auto;
          flex-shrink: 0; /* Prevent video from shrinking */
        }

        .birthday-video-fixed {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          object-fit: cover;
          max-height: 300px;
        }

        /* Scrollable Message Container */
        .message-container-scrollable {
          flex: 1;
          margin-top: 20px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          max-height: 50vh;
        }

        .typed-message-fixed {
          padding: 25px;
          font-size: 1.1rem;
          line-height: 1.8;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 20px;
          animation: fadeIn 1s ease;
        }

        .message-line {
          margin-bottom: 10px;
          min-height: 1.8em;
        }

        /* Celebration Elements */
        .celebration {
          animation: celebrate 1s ease;
        }

        @keyframes celebrate {
          0% { transform: scale(0.5); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .confetti-emoji {
          font-size: 3rem;
          margin: 30px 0;
          animation: bounce 1s infinite alternate;
        }

        .heart-message {
          font-size: 1.5rem;
          margin: 30px 0;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          animation: heartbeat 1.5s infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .sparkle-animation {
          font-size: 2rem;
          margin-top: 20px;
          animation: sparkle 2s infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .floating-emojis {
          font-size: 2rem;
          margin: 30px 0;
          animation: floatUp 3s infinite ease-in-out;
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .instruction {
          margin-top: 20px;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: inline-block;
        }

        /* Skip Button */
        .skip-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          opacity: 0.7;
          transition: opacity 0.3s;
          z-index: 100;
        }

        .skip-btn:hover {
          opacity: 1;
        }

        /* Music Controls */
        .music-controls-fixed {
          margin: 20px 0;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .music-btn-small {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .music-btn-small:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .title {
            font-size: 2rem;
          }
          
          .big-celebration {
            font-size: 2.2rem;
          }
          
          .action-btn {
            font-size: 1.2rem;
            padding: 15px 25px;
            min-width: 250px;
          }
          
          .cake {
            width: 150px;
            height: 90px;
          }
          
          .cake-top {
            width: 120px;
            left: 15px;
          }
          
          .cake-middle {
            width: 140px;
            left: 5px;
          }
          
          .cake-bottom {
            width: 150px;
          }
          
          .candles-container {
            top: -30px;
            padding: 0 10px;
          }
          
          .candle {
            width: 8px;
            height: 30px;
          }
          
          .flame {
            top: -20px;
            width: 12px;
            height: 20px;
          }
          
          .typed-message-fixed {
            font-size: 1rem;
            padding: 15px;
          }
          
          .birthday-video-fixed {
            max-height: 250px;
          }
          
          .message-container-scrollable {
            max-height: 40vh;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.8rem;
          }
          
          .action-btn {
            font-size: 1.1rem;
            padding: 12px 20px;
            min-width: 200px;
          }
          
          .subtitle {
            font-size: 1.1rem;
          }
          
          .cake {
            width: 120px;
            height: 70px;
          }
          
          .cake-top {
            width: 100px;
            left: 10px;
            height: 30px;
          }
          
          .cake-middle {
            width: 110px;
            left: 5px;
            top: 25px;
            height: 30px;
          }
          
          .cake-bottom {
            width: 120px;
            top: 45px;
            height: 40px;
          }
          
          .candles-container {
            top: -25px;
            padding: 0 5px;
          }
          
          .candle {
            width: 6px;
            height: 25px;
          }
          
          .flame {
            top: -15px;
            width: 10px;
            height: 15px;
          }
          
          .birthday-video-fixed {
            max-height: 200px;
          }
          
          .message-container-scrollable {
            max-height: 35vh;
          }
          
          .music-controls-fixed {
            flex-direction: column;
            align-items: center;
          }
          
          .music-btn-small {
            width: 100%;
            max-width: 200px;
          }
        }

        /* Prevent overscroll on iOS */
        .final-step-container {
          overscroll-behavior: contain;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .message-container-scrollable::-webkit-scrollbar {
          width: 5px;
        }
        
        .message-container-scrollable::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .message-container-scrollable::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
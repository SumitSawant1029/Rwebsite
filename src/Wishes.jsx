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
  
  const audioRef = useRef(null);
  const cakeVideoRef = useRef(null);
  
  const messageText = `
  Happpyyyy Birthhdayyyy my jaan, my sunshine, my heart’s favorite person Riyuuuuuuuuuu! 🥳💖
You are the warmth in my days, the softness in my nights, and the reason behind my happiest smiles. Mi tula khup prem karato… more than words can ever describe 😚🧿

Every moment with you feels like a blessing. Our late night talks, our silly jokes, our cozy weekends, our cute fights, and every small memory we create together makes our story so beautiful. You bring magic into my life without even trying. When you smile, the whole world feels calm. And when you laugh, it becomes my favorite sound.

I am so proud of you, of your strength, your kindness, your brilliance, and the way you handle everything that comes your way. You inspire me every single day. Tumhi mazi khushi aahat… in every possible way.

I promise to stay by your side in every season, in calm moments, in storms, in joy, in all our crazy dreams and plans. I want to see the whole world with you, live every moment with you, and hold your hand through it all.

Stay happy, stay blessed, and never forget how deeply you are loved.
Happpyyyy Birthhdayyyy my baby, my shona, my forever girl 🫶💋💋🧿
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
    
    setTimeout(() => {
      setStep(4); // Show confetti
    }, 800);
    
    setTimeout(() => {
      setStep(5); // Show birthday message
    }, 3000);
    
    setTimeout(() => {
      setStep(6); // Show final message with video
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
      {step >= 4 && (
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
              
              {/* Candles */}
              {candlesLit && (
                <>
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
                </>
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

      {/* Step 6: Final Message with Video */}
      {step === 6 && (
        <div className="step-container final-step">
          <h1 className="title">A Special Message For You 💌</h1>
          
          
          
          <div className="typed-message">
            {typedText.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="video-wrapper">
            <video
              ref={cakeVideoRef}
              src="/videos/birthday-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="birthday-video"
            />
          </div>
          
          {musicPlaying && (
            <div className="music-controls">
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
            </div>
          )}
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

        /* Cake */
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

        /* Candles */
        .candle {
          position: absolute;
          top: -30px;
          width: 10px;
          height: 40px;
          background: white;
          border-radius: 5px;
        }

        .candle:nth-child(1) { left: 50px; }
        .candle:nth-child(2) { left: 80px; }
        .candle:nth-child(3) { left: 110px; }
        .candle:nth-child(4) { left: 140px; }
        .candle:nth-child(5) { left: 170px; }

        .candle-body {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(white, #ffccff);
          border-radius: 5px;
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
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); }
          100% { transform: translateX(-50%) scale(1.1); }
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

        /* Video */
        .video-wrapper {
          margin: 30px auto;
          width: 100%;
          max-width: 500px;
        }

        .birthday-video {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Typed Message */
        .typed-message {
          margin: 30px auto;
          padding: 25px;
          font-size: 1.1rem;
          line-height: 1.8;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          max-width: 600px;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.2);
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
        .music-controls {
          margin-top: 20px;
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
          
          .candle:nth-child(1) { left: 40px; }
          .candle:nth-child(2) { left: 65px; }
          .candle:nth-child(3) { left: 90px; }
          .candle:nth-child(4) { left: 115px; }
          .candle:nth-child(5) { left: 140px; }
          
          .typed-message {
            font-size: 1rem;
            padding: 15px;
            margin: 20px 10px;
          }
          
          .confetti-emoji {
            font-size: 2rem;
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
          }
          
          .cake-middle {
            width: 110px;
            left: 5px;
            top: 25px;
          }
          
          .cake-bottom {
            width: 120px;
            top: 45px;
          }
          
          .candle {
            width: 8px;
            height: 30px;
            top: -20px;
          }
          
          .candle:nth-child(1) { left: 30px; }
          .candle:nth-child(2) { left: 50px; }
          .candle:nth-child(3) { left: 70px; }
          .candle:nth-child(4) { left: 90px; }
          .candle:nth-child(5) { left: 110px; }
          
          .flame {
            top: -15px;
            width: 12px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
}
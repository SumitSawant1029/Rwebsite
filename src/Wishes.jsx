import { useEffect, useState } from "react";

export default function Wishes() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [typedText, setTypedText] = useState("");
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

  // Background Music
  useEffect(() => {
    const audio = new Audio("/songs/happy-birthday.mp3");
    audio.loop = true;

    audio.play().catch(() => {
      console.log("Autoplay blocked. Music will play when user interacts.");
    });

    return () => audio.pause();
  }, []);

  // Typewriter Effect
  useEffect(() => {
    if (!showSurprise) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(messageText.substring(0, index));
      index++;

      if (index > messageText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [showSurprise]);

  return (
    <div className="big-container">

      {/* Floating Hearts Background */}
      <div className="heart-bg"></div>

      {/* Confetti Layers */}
      <div className="confetti"></div>
      <div className="confetti2"></div>
      <div className="confetti3"></div>

      {/* Floating Emojis */}
      <div className="floating-emojis">🎉 ✨ 🎂 💖 🎊</div>

      <h1 className="title">🎉 Happy Birthday! 🎂</h1>

      <p className="subtitle">
        A Special Surprise Awaits You 💖
      </p>

      {/* Surprise Reveal Button */}
      {!showSurprise && (
        <button className="surprise-btn" onClick={() => setShowSurprise(true)}>
          Tap to Reveal 🎁
        </button>
      )}

      {/* Content Reveals After Tap */}
      {showSurprise && (
        <>
          {/* Auto-looping video */}
          <div className="video-wrapper">
            <video
              src="/videos/birthday-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="video"
            ></video>
          </div>

          {/* Typewriter message */}
          <div className="typed-message">
            {typedText.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </>
      )}

      <style>{`
      
      /* Main Container */
      .big-container {
        min-height: 100vh;
        padding: 20px;
        text-align: center;
        background: linear-gradient(135deg, #ff4d79, #ff78b5, #ffa8e6);
        background-size: 400% 400%;
        animation: bgMove 8s ease infinite;
        color: white;
        position: relative;
        overflow-x: hidden;
      }

      @keyframes bgMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Title */
      .title {
        font-size: 2.8rem;
        font-weight: bold;
        margin-top: 15px;
        text-shadow: 0 0 20px #ff99bb, 0 0 40px white;
        animation: glow 2s infinite alternate;
      }

      @keyframes glow {
        from { text-shadow: 0 0 10px #fff; }
        to { text-shadow: 0 0 25px #fff, 0 0 50px #ffd9f1; }
      }

      /* Subtitle */
      .subtitle {
        font-size: 1.2rem;
        margin-bottom: 20px;
        opacity: 0.9;
        text-shadow: 0 0 10px #fff;
      }

      /* Surprise Button */
      .surprise-btn {
        font-size: 1.4rem;
        padding: 12px 25px;
        border-radius: 30px;
        border: none;
        background: white;
        color: #ff2e6a;
        font-weight: bold;
        box-shadow: 0 0 20px #ffd1e9;
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.07); }
        100% { transform: scale(1); }
      }

      /* Video */
      .video-wrapper {
        margin: 20px auto;
        width: 100%;
        max-width: 500px;
        animation: fadeUp 1.3s ease;
      }

      .video {
        width: 100%;
        border-radius: 20px;
        box-shadow: 0 0 20px #ffb4e6;
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Typed Message */
      .typed-message {
        margin-top: 20px;
        padding: 18px;
        font-size: 1.1rem;
        line-height: 1.7rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 20px #ffcdf3;
        white-space: pre-wrap;
        animation: fadeUp 2s ease;
        text-align: left;
      }

      /* Floating Emojis */
      .floating-emojis {
        font-size: 1.8rem;
        animation: float 3s infinite ease-in-out;
      }

      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }

      /* Floating Hearts Background */
      .heart-bg::before {
        content: "💖 💕 💗 💞 💘";
        position: fixed;
        top: 30%;
        left: 50%;
        font-size: 4rem;
        opacity: 0.1;
        transform: translateX(-50%);
        animation: drift 12s infinite linear;
      }

      @keyframes drift {
        0% { transform: translate(-50%, -40px); }
        100% { transform: translate(-50%, 40px); }
      }

      /* Confetti Animation */
      .confetti, .confetti2, .confetti3 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background-repeat: repeat;
        opacity: 0.15;
      }

     .confetti {
  background-image: url("https://cdn.pixabay.com/photo/2017/08/30/01/05/confetti-2698254_640.png");
}

.confetti2 {
  background-image: url("https://cdn.pixabay.com/photo/2020/12/10/12/07/confetti-5921072_640.png");
}

.confetti3 {
  background-image: url("https://cdn.pixabay.com/photo/2022/02/15/13/53/confetti-7014795_640.png");
}


      @keyframes fall {
        0% { background-position: 0 0; }
        100% { background-position: 0 600px; }
      }

      @keyframes fall2 {
        0% { background-position: 0 0; }
        100% { background-position: 0 800px; }
      }

      @keyframes fall3 {
        0% { background-position: 0 0; }
        100% { background-position: 0 900px; }
      }

      /* Mobile Optimization */
      @media (max-width: 500px) {
        .title { font-size: 2rem; }
        .subtitle { font-size: 1rem; }
        .typed-message { font-size: 1rem; }
      }

      `}</style>
    </div>
  );
}

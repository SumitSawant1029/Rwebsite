import { useEffect, useRef, useState } from "react";
import "./App.css";
import Wishes from "./Wishes";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Fireworks } from "@fireworks-js/react";

export default function App() {
  const birthday = new Date("2025-12-29T00:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState(birthday - Date.now());
  const [showMessage, setShowMessage] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const diff = birthday - Date.now();

      if (diff <= 0) {
        clearInterval(timerRef.current);
        setShowMessage(true);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = () => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const testNow = () => {
    clearInterval(timerRef.current);
    setShowMessage(true);
  };

  return (
    <div className="container">
      {!showMessage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="countdown-box"
        >
          <h1 className="title">Riya💖!</h1>
          <h1 className="title">Birthday Countdown 🎉</h1>
          <div className="countdown">{formatTime()}</div>

          {/* <button className="test-btn" onClick={testNow}>
            Test Birthday 🎂
          </button> */}
        </motion.div>
      ) : (
        <div className="wish-screen">
          {/* CONFETTI */}
          <Confetti numberOfPieces={450} recycle={false} />

          {/* FIREWORKS FULL SCREEN & CENTERED */}
          <div className="fireworks-screen">
            <Fireworks
              options={{
                opacity: 0.9,
                acceleration: 1.02,
                friction: 0.97,
                gravity: 1.5,
                particles: 150,
                traceLength: 4,
                explosion: 8,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* WISHES FADE-IN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Wishes />
          </motion.div>
        </div>
      )}
    </div>
  );
}

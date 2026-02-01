import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Success from "./components/Success";
import Asking from "./components/Asking";
import flower from "./flower.gif";
import attention from "./attention.gif";
import blinking from "./blinking.gif";
import running from "./running.gif";
import badGirl from "./badgirl.gif";
import confetti from "canvas-confetti";
import popSound from "./assets/pop.mp3";
import chimeSound from "./assets/chime.mp3";

/**
 * Main App component managing the Valentine's Day proposal.
 *
 * @returns {JSX.Element} JSX element representing the App component.
 */
const App = () => {
  // State to track acceptance and rejection
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [noButtonText, setNoButtonText] = useState("No");
  const [lastRejectedIndex, setLastRejectedIndex] = useState(-1);
  const [loveProgress, setLoveProgress] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [rejectCount, setRejectCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [startGif, setStartGif] = useState(attention);
  const [rejectGif, setRejectGif] = useState(running);

  const pop = useMemo(() => new Audio(popSound), []);
  const chime = useMemo(() => new Audio(chimeSound), []);

  useEffect(() => {
  if (accepted || rejected) return;

  const sequence = [attention, flower, blinking];
  let step = 0;

  const timer = setInterval(() => {
    step = (step + 1) % sequence.length; // 🔁 loop
    setStartGif(sequence[step]);
  }, 1800);

  return () => clearInterval(timer);
}, [accepted, rejected]);

  useEffect(() => {
  if (!rejected) return;

  const sequence = [running, badGirl];
  let step = 0;

  const timer = setInterval(() => {
    step = (step + 1) % sequence.length; // 🔁 loop
    setRejectGif(sequence[step]);
  }, 1800);

  return () => clearInterval(timer);
}, [rejected]);
  // Handler for accepting the proposal
  const handleAccept = () => {
  // 🎉 confetti burst
  confetti({
    particleCount: 140,
    spread: 70,
    origin: { y: 0.6 },
  });

  // small extra pop after 200ms
  setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.55 },
    });
  }, 200);

  if (soundOn) {
  chime.currentTime = 0;
  chime.play().catch(() => {});
  }

  setAccepted(true);
};

  // Handler for rejecting the proposal
  const handleReject = () => {
  setRejected(true);

  if (soundOn) {
  pop.currentTime = 0;
  pop.play().catch(() => {});
  }

  const rejectionTexts = [
    "Are you sure?",
    "Maybe try again?",
    "Think again!",
    "Loser :(",
  ];

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * rejectionTexts.length);
  } while (randomIndex === lastRejectedIndex);

  setLastRejectedIndex(randomIndex);
  setNoButtonText(rejectionTexts[randomIndex]);

  // ❤️ existing love progress logic (keep yours)
  setLoveProgress((prev) => {
    const next = Math.min(prev + 7, 100);

    if (next === 100) {
      setTimeout(() => setAccepted(true), 400);
    }

    return next;
  });

  // 🔥 NEW: fun behaviour
  const newCount = rejectCount + 1;
  setRejectCount(newCount);

  // random movement
  setNoPosition({
    x: Math.random() * 200 - 100,
    y: Math.random() * 150 - 75,
  });

  // shrink each click
  setNoScale(Math.max(0.35, 1 - newCount * 0.15));
};

  return (
    <div className="App">
      <div className="App-body">
        {/* Asking to be my Valentine */}
        <button
          className="sound-toggle"
          onClick={() => setSoundOn((s) => !s)}
        >
          {soundOn ? "🔊 Sound On" : "🔇 Sound Off"}
        </button>
        {!accepted && (
          <Asking
            gif={rejected ? rejectGif : startGif}
            altText={rejected ? "Rejected Bear" : "I love you Bear"}
            handleAccept={handleAccept}
            handleReject={handleReject}
            noButtonText={noButtonText}
            loveProgress={loveProgress}
            noPosition={noPosition}
            noScale={noScale}
          />
        )}

        {/* She said YES! */}
        {accepted && <Success />}
      </div>
      <div className="watermark">Made with ❤️ by Shiva</div>
    </div>
  );
};

export default App;

import React, { useMemo, useState } from "react";
import kisses from "../kisses.gif";
import * as htmlToImage from "html-to-image";

const Heart = ({ left, delay, size }) => (
  <span
    className="floating-heart"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      fontSize: `${size}px`,
    }}
  >
    ❤️
  </span>
);

const Success = () => {
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Hearts (keep as you already had)
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 1.8,
        size: Math.random() * 14 + 18,
      })),
    []
  );

  // Receipt ID stable for this render session
  const receiptId = useMemo(() => {
    const part1 = Math.random().toString(36).slice(2, 6).toUpperCase();
    const part2 = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `SUSHI`-`${part1}`-`${part2}`;
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  }, []);

  const reasons = [
    "Because you’re cute 😌",
    "Because I had no choice 😭",
    "Because Sushi deserves hugs 🫂",
    "Because I love you (obviously) ❤️",
    "Because you’ll behave now 😤",
    "Because you’re my safe place 🥺",
  ];

  const handlePick = (r) => {
    setReason(r);
    setConfirmed(true);
  };

  return (
    <div className="App-success success-pop">
      {/* floating hearts layer */}
      <div className="hearts-layer">
        {hearts.map((h) => (
          <Heart key={h.id} left={h.left} delay={h.delay} size={h.size} />
        ))}
      </div>

      <img className="App-gif" src={kisses} alt="Kisses" />

      {!confirmed ? (
        <>
          <p className="App-text-success">Yayyy 😭❤️ You said YES!</p>

          <p className="App-text-success">
            Okay Sushi… ek baat batao 😌 <br />
            <b>Why did you say yes?</b>
          </p>

          <div className="reason-grid">
            {reasons.map((r) => (
              <button key={r} className="reason-btn" onClick={() => handlePick(r)}>
                {r}
              </button>
            ))}
          </div>

          <p className="tiny-hint">Pick one. No take-backs 😌</p>
          
        </>
        
      ) : (
        <>
          <div className="certificate" id="valentine-certificate">
            <h2 className="certificate-title">Valentine Acceptance Certificate ✅</h2>

            <div className="certificate-row">
              <span className="label">Recipient</span>
              <span className="value">Sushi</span>
            </div>

            <div className="certificate-row">
              <span className="label">Reason Chosen</span>
              <span className="value">{reason}</span>
            </div>

            <div className="certificate-row">
              <span className="label">Our Memory Date ❤️</span>
              <span className="value">07/03/2022</span>
            </div>

            <div className="certificate-row">
              <span className="label">Accepted On Latest Date✅</span>
              <span className="value">{today}</span>
            </div>

            <div className="certificate-row">
              <span className="label">Receipt ID</span>
              <span className="value mono">{receiptId}</span>
            </div>

            <p className="certificate-foot">
              Screenshot and Download this & claim your hug + kiss voucher 😤❤️
            </p>
          </div>

          <button
            className="App-button"
            onClick={async () => {
              const node = document.getElementById("valentine-certificate");
              if (!node) return;

              try {
                const dataUrl = await htmlToImage.toPng(node);
                const link = document.createElement("a");
                link.download = "valentine-certificate.png";
                link.href = dataUrl;
                link.click();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Download Certificate 📄
          </button>
          <button
            className="App-button"
            onClick={() => {
              setConfirmed(false);
              setReason("");
            }}
          >
            Choose another reason 😌
          </button>
        </>
      )}
    </div>
  );
};

export default Success;

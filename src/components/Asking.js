import React,  { useState }  from "react";

/**
 * Asking component for proposing the Valentine's Day question.
 *
 * @param {string} gif - The URL or import path of the chosen gif.
 * @param {string} altText - The alt text for the displayed gif.
 * @param {function} handleAccept - Callback function for accepting the proposal.
 * @param {function} handleReject - Callback function for rejecting the proposal.
 * @param {string} noButtonText - The text to be displayed on the rejection button.
 * @returns {JSX.Element} JSX element representing the Asking component.
 */
const Asking = ({
  gif,
  altText,
  handleAccept,
  handleReject,
  noButtonText,
  loveProgress,
  noPosition,
  noScale
}) => {
  const [dialogue, setDialogue] = useState("");

  const messages = [
    "Acha soch lo 😤",
    "Sushi please 🥺",
    "Think again na…",
    "Hint: choose YES ❤️",
    "Main aa jaau kya apni pe",
    "Aisa Mat Kariye, jaanu"
  ];

  const handleNoClick = () => {
    const random =
      messages[Math.floor(Math.random() * messages.length)];

    setDialogue(random);
    handleReject();
  };

  return (
    <>
      <img className="App-gif" src={gif} alt={altText} />

      <p className="App-text">Sushi, will you be my Valentine?</p>

      {/* NEW dialogue bubble */}
      {dialogue && <p className="App-dialogue">{dialogue}</p>}

      {/* ❤️ Love Meter */}
      <div className="love-meter">
        <div
          className="love-meter-fill"
          style={{ width: `${loveProgress}%` }}
        />
        <span className="love-text">❤️ Love loading: {loveProgress}%</span>
      </div>

      <div>
        <button className="App-button" onClick={handleAccept}>
          Yes
        </button>
        <button
          className="App-button"
          onClick={handleNoClick}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
            position: "relative",
            transition: "all 0.25s ease",
          }}
        >
          {noButtonText}
        </button>
      </div>
    </>
  );
};

export default Asking;

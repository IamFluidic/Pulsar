// import React, { useEffect, useState, useMemo } from "react";
// import "./InteractableStars.css";
// import "./NoteModal.jsx"; 

// function StarIcon({ className = "", size = 15 }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       aria-hidden
//     >
//       <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.17L12 18.896 4.664 23.168l1.402-8.17L.132 9.21l8.2-1.192z" />
//     </svg>
//   );
// }

// function MoonIcon({ className = "", size = 25 }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       aria-hidden
//     >
//       <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
//     </svg>
//   );
// }

// const DEFAULT_NOTES = [
//   "I love you more than words can hold. 💖",
//   "Thank you for always being there. 🌟",
//   "You make my days brighter. ☀️",
//   "Forever grateful for you. 🙏",
//   "You're my favorite hello and hardest goodbye. 😘",
//   "Your smile is my favorite song. 🎵",
//   "We make the best memories together. 🥰",
//   "Thank you for believing in me. 💪",
//   "Every moment with you is magic. ✨",
//   "I love how you laugh — it's everything. 😂",
//   "A little moonlight thank you — you mean so much.",
// ];

// function InteractableStars({ numStars = 12, numMoons = 2 }) {
//   const [stars, setStars] = useState([]);
//   const [activeNote, setActiveNote] = useState(null);
//   const clickSound = useMemo(() => new Audio("/twinkle.mp3"), []);

//   useEffect(() => {
//     const items = [];

//     for (let i = 0; i < numStars; i++) {
//       const left = Math.random() * 90;
//       const top = Math.random() * 80;
//       const animationClass = `animate-float${Math.ceil(Math.random() * 4)}`;
//       items.push({
//         id: `star-${i}`,
//         type: "star",
//         left,
//         top,
//         animationClass,
//         note: DEFAULT_NOTES[i % DEFAULT_NOTES.length],
//       });
//     }

//     for (let i = 0; i < numMoons; i++) {
//       const left = Math.random() * 90;
//       const top = Math.random() * 80;
//       const animationClass = `animate-float${Math.ceil(Math.random() * 4)}`;
//       items.push({
//         id: `moon-${i}`,
//         type: "moon",
//         left,
//         top,
//         animationClass,
//         note: DEFAULT_NOTES[(numStars + i) % DEFAULT_NOTES.length],
//       });
//     }

//     setStars(items);
//   }, [numStars, numMoons]);

//   const handleClick = (note) => {
//     clickSound.currentTime = 0;
//     clickSound.play();
//     setActiveNote(note);
//   };

//   return (
//     <>
//       {stars.map((it) => {
//         const baseClasses = "floating-item";
//         const typeClasses = it.type === "moon" ? "moon" : "star";
//         return (
//           <button
//             key={it.id}
//             className={`${baseClasses} ${typeClasses} ${it.animationClass}`}
//             style={{ left: `${it.left}%`, top: `${it.top}%` }}
//             onClick={() => handleClick(it.note)}
//             aria-label={it.type === "moon" ? "Moon note" : "Star note"}
//           >
//             {it.type === "moon" ? <MoonIcon /> : <StarIcon />}
//           </button>
//         );
//       })}

//       {activeNote && (
//         <div className="note-modal-backdrop" onClick={() => setActiveNote(null)}>
//           <div className="note-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="note-close" onClick={() => setActiveNote(null)}>
//               &times;
//             </button>
//             <h3>A Celestial Note</h3>
//             <p>{activeNote}</p>
//             <button className="note-btn" onClick={() => setActiveNote(null)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default InteractableStars;

import React, { useEffect, useState, useMemo } from "react";
import "./InteractableStars.css";

const DEFAULT_NOTES = [
  "I love you more than words can hold. 💖",
  "Thank you for always being there. 🌟",
  "You make my days brighter. ☀️",
  "Forever grateful for you. 🙏",
  "You're my favorite hello and hardest goodbye. 😘",
  "Your smile is my favorite song. 🎵",
  "We make the best memories together. 🥰",
  "Thank you for believing in me. 💪",
  "Every moment with you is magic. ✨",
  "I love how you laugh — it's everything. 😂",
  "A little moonlight thank you — you mean so much.",
];

// Smaller star size
function StarIcon({ className = "", size = 10 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.17L12 18.896 4.664 23.168l1.402-8.17L.132 9.21l8.2-1.192z" />
    </svg>
  );
}

function MoonIcon({ className = "", size = 18, phase = "full" }) {
  const clipStyle = {
    full: "none",
    "waxing-crescent": "inset(0 50% 0 0)",
    "first-quarter": "inset(0 50% 0 0)",
    "waxing-gibbous": "inset(0 20% 0 0)",
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#fff"
        style={{ clipPath: clipStyle[phase] }}
      />
    </svg>
  );
}

function InteractableStars({ numStars = 12, numMoons = 1, moonSpeed = 0.00002 }) {
  const [stars, setStars] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const clickSound = useMemo(() => new Audio("/twinkle.mp3"), []);

  useEffect(() => {
    const items = [];

    // Stars with slower random flying directions
    for (let i = 0; i < numStars; i++) {
      items.push({
        id: `star-${i}`,
        type: "star",
        left: Math.random() * 90, // now cover 90% width
        top: Math.random() * 90, // now cover 90% height
        dx: (Math.random() - 0.5) * 0.006, // slower horizontal speed
        dy: (Math.random() - 0.5) * 0.006, // slower vertical speed
        shooting: false,
        note: DEFAULT_NOTES[i % DEFAULT_NOTES.length],
      });
    }

    // Moons
    for (let i = 0; i < numMoons; i++) {
      items.push({
        id: `moon-${i}`,
        type: "moon",
        progress: Math.random(),
        phase: "full",
        note: DEFAULT_NOTES[(numStars + i) % DEFAULT_NOTES.length],
      });
    }

    setStars(items);
  }, [numStars, numMoons]);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      setStars((prev) =>
        prev.map((it) => {
          if (it.type === "star") {
            let { left, top, dx, dy, shooting } = it;

            if (!shooting && Math.random() < 0.00008) {
              shooting = true;
              dx = (Math.random() - 0.5) * 1.2;
              dy = (Math.random() - 0.5) * 1.2;
            }

            if (shooting) {
              left += dx;
              top += dy;
              if (left > 90 || left < 0 || top > 90 || top < 0) {
                shooting = false;
                left = Math.random() * 90;
                top = Math.random() * 90;
                dx = (Math.random() - 0.5) * 0.04;
                dy = (Math.random() - 0.5) * 0.04;
              }
            } else {
              left += dx;
              top += dy;
              if (left > 90) left = 0;
              if (left < 0) left = 90;
              if (top > 90) top = 0;
              if (top < 0) top = 90;
            }

            return { ...it, left, top, dx, dy, shooting };
          }

          if (it.type === "moon") {
            let newProgress = it.progress + moonSpeed;
            if (newProgress > 1) newProgress = 0;

            const radiusX = 40;
            const radiusY = 15;
            const centerX = 50;
            const centerY = 30;
            const angle = newProgress * Math.PI;

            const left = centerX + radiusX * Math.cos(Math.PI - angle);
            const top = centerY - radiusY * Math.sin(angle);

            let phase = "full";
            if (newProgress < 0.25) phase = "waxing-crescent";
            else if (newProgress < 0.5) phase = "first-quarter";
            else if (newProgress < 0.75) phase = "waxing-gibbous";
            else phase = "full";

            return { ...it, left, top, progress: newProgress, phase };
          }

          return it;
        })
      );

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [moonSpeed]);

  const handleClick = (note) => {
    clickSound.currentTime = 0;
    clickSound.play();
    setActiveNote(note);
  };

  return (
    <>
      {stars.map((it) => (
        <button
          key={it.id}
          className={`floating-item ${it.type} ${it.shooting ? "shooting" : ""}`}
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            opacity: it.shooting ? 0.8 : 0.95,
          }}
          onClick={() => handleClick(it.note)}
          aria-label={it.type === "moon" ? "Moon note" : "Star note"}
        >
          {it.type === "moon" ? <MoonIcon phase={it.phase} /> : <StarIcon />}
        </button>
      ))}

      {activeNote && (
        <div className="note-modal-backdrop" onClick={() => setActiveNote(null)}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <button className="note-close" onClick={() => setActiveNote(null)}>
              &times;
            </button>
            <h3>A Celestial Note</h3>
            <p>{activeNote}</p>
            <button className="note-btn" onClick={() => setActiveNote(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InteractableStars;

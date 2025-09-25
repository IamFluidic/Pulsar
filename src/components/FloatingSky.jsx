// import React, { useState, useEffect, useMemo } from "react";
// import NoteModal from "./NoteModal";

// const NUM_INTERACTABLE_STARS = 20;

// // --- SVG Icons ---
// function StarIcon({ className = "", size = 5 }) {
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

// function MoonIcon({ className = "", size = 12 }) {
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

// // --- FloatingSky Component ---
// function FloatingSky({
//   notes = null,
//   numBackgroundStars = 450,
//   maxStarRadius = 1.5,
//   twinkleSpeed = 0.009,
//   cometFrequency = 0.007,
// }) {
//   const defaultNotes = useMemo(
//     () => [
//       "I love you more than words can hold. 💖",
//       "Thank you for always being there. 🌟",
//       "You make my days brighter. ☀️",
//       "Forever grateful for you. 🙏",
//       "You're my favorite hello and hardest goodbye. 😘",
//       "Your smile is my favorite song. 🎵",
//       "We make the best memories together. 🥰",
//       "Thank you for believing in me. 💪",
//       "Every moment with you is magic. ✨",
//       "I love how you laugh — it's everything. 😂",
//       "A little moonlight thank you — you mean so much.",
//     ],
//     []
//   );

//   const items = useMemo(() => {
//     const source =
//       Array.isArray(notes) && notes.length >= NUM_INTERACTABLE_STARS + 1
//         ? notes
//         : defaultNotes;
//     return [
//       ...Array.from({ length: NUM_INTERACTABLE_STARS }, (_, i) => ({
//         id: `star-${i}`,
//         type: "star",
//         text: source[i % source.length],
//       })),
//       { id: "moon-0", type: "moon", text: source[NUM_INTERACTABLE_STARS % source.length] },
//     ];
//   }, [notes, defaultNotes]);

//   const [activeNote, setActiveNote] = useState(null);
//   const [positions, setPositions] = useState({});
//   const animations = useMemo(() => ["float1", "float2", "float3", "float4"], []);

//   // --- Random positions & floating animation ---
//   useEffect(() => {
//     const arr = {};
//     items.forEach((it, i) => {
//       const left = Math.round(Math.random() * 90);
//       const top = Math.round(4 + Math.random() * 45);
//       const duration = (6 + Math.random() * 8).toFixed(1);
//       const delay = (Math.random() * 4).toFixed(2);
//       const animationName = animations[i % animations.length];
//       arr[it.id] = { left, top, duration, delay, animationName };
//     });
//     setPositions(arr);
//   }, [items, animations]);

//   // --- Starfield Background + Comets ---
//   useEffect(() => {
//     const canvas = document.createElement("canvas");
//     canvas.style.position = "fixed";
//     canvas.style.inset = "0";
//     canvas.style.zIndex = "-1";
//     canvas.style.background = "#010118"; // dark night
//     document.body.appendChild(canvas);

//     const ctx = canvas.getContext("2d");
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     const stars = Array.from({ length: numBackgroundStars }, () => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       radius: Math.random() * maxStarRadius,
//       alpha: Math.random(),
//       alphaChange: twinkleSpeed + Math.random() * twinkleSpeed,
//       speedX: 0.01 + Math.random() * 0.05,
//       speedY: 0.01 + Math.random() * 0.05,
//     }));

//     let comets = [];

//     function animate() {
//       ctx.clearRect(0, 0, width, height);

//       // draw stars
//       stars.forEach((s) => {
//         s.alpha += s.alphaChange;
//         if (s.alpha <= 0 || s.alpha >= 1) s.alphaChange *= -1;
//         s.x += s.speedX;
//         s.y -= s.speedY;
//         if (s.y < 0) s.y = height;
//         if (s.x > width) s.x = 0;
//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
//         ctx.fill();
//       });

//       // spawn comets randomly
//       if (Math.random() < cometFrequency) {
//         comets.push({
//           x: Math.random() * width,
//           y: Math.random() * height / 2,
//           length: 100 + Math.random() * 150,
//           speedX: 2 + Math.random() * 2,
//           speedY: 1 + Math.random(),
//           alpha: 1,
//         });
//       }

//       // draw comets
//       comets.forEach((c, idx) => {
//         c.x += c.speedX;
//         c.y -= c.speedY;
//         c.alpha -= 0.005;
//         ctx.beginPath();
//         ctx.moveTo(c.x, c.y);
//         ctx.lineTo(c.x - c.length, c.y + c.length / 2);
//         ctx.strokeStyle = `rgba(255,255,255,${c.alpha})`;
//         ctx.lineWidth = 2;
//         ctx.stroke();
//         if (c.alpha <= 0) comets.splice(idx, 1);
//       });

//       requestAnimationFrame(animate);
//     }
//     animate();

//     const handleResize = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       document.body.removeChild(canvas);
//     };
//   }, [numBackgroundStars, maxStarRadius, twinkleSpeed, cometFrequency]);

//   return (
//     <>
//       <div className="fixed inset-0 pointer-events-none z-50">
//         {items.map((it) => {
//           const pos = positions[it.id];
//           if (!pos) return null;

//           const baseClasses =
//             "absolute inline-flex items-center justify-center rounded-full p-1 cursor-pointer pointer-events-auto transition-transform ease-in-out";
//           const typeClasses =
//             it.type === "moon"
//               ? "w-8 h-8 group hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-110 transition-all"
//               : "w-4 h-4 group";

//           return (
//             <button
//               key={it.id}
//               className={`${baseClasses} ${typeClasses} animate-[var(--animation)]`}
//               style={{
//                 left: `${pos.left}%`,
//                 top: `${pos.top}%`,
//                 animationDuration: `${pos.duration}s`,
//                 animationDelay: `${pos.delay}s`,
//                 "--animation": pos.animationName,
//               }}
//               onClick={() => setActiveNote(it)}
//               title={it.type === "moon" ? "Moon — open note" : "Star — open note"}
//               aria-label={it.type === "moon" ? "Open moon note" : `Open star note ${it.id}`}
//             >
//               {it.type === "moon" ? (
//                 <MoonIcon />
//               ) : (
//                 <StarIcon className="group-hover:animate-twinkle" />
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {activeNote && (
//         <NoteModal
//           title={activeNote.type === "moon" ? "A Moon Note" : "A Star Note"}
//           text={activeNote.text}
//           onClose={() => setActiveNote(null)}
//         />
//       )}
//     </>
//   );
// }

// export default FloatingSky;


//varying star sizes, smoother twinkle, comet trails
import React, { useEffect } from "react";

function FloatingSky({
  numBackgroundStars = 450,
  maxStarRadius = 1.5,
  twinkleSpeed = 0.008,
  cometFrequency = 0.004,
}) {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.zIndex = "-1";
    canvas.style.background = "#010118"; // dark night sky
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create stars
    const stars = Array.from({ length: numBackgroundStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * maxStarRadius + 0.3, // vary size
      radius: 0,
      alpha: Math.random(),
      alphaChange: twinkleSpeed + Math.random() * twinkleSpeed,
      twinkleDirection: 1,
    }));

    let comets = [];

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw twinkling stars
      stars.forEach((s) => {
        s.alpha += s.alphaChange * s.twinkleDirection;
        if (s.alpha <= 0.3 || s.alpha >= 1) s.twinkleDirection *= -1;

        // subtle radius change for twinkle
        s.radius = s.baseRadius * (0.8 + 0.4 * s.alpha);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      // Randomly spawn comets
      if (Math.random() < cometFrequency) {
        comets.push({
          x: Math.random() * width,
          y: Math.random() * height / 2,
          length: 100 + Math.random() * 150,
          speedX: 2 + Math.random() * 2,
          speedY: 1 + Math.random(),
          alpha: 1,
        });
      }

      // Draw comets
      comets.forEach((c, idx) => {
        c.x += c.speedX;
        c.y -= c.speedY;
        c.alpha -= 0.005;

        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.length, c.y + c.length / 2);
        ctx.strokeStyle = `rgba(255,255,255,${c.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (c.alpha <= 0) comets.splice(idx, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, [numBackgroundStars, maxStarRadius, twinkleSpeed, cometFrequency]);

  return null; // purely background effect
}

export default FloatingSky;

// default floating sky with stars and comets
// import React, { useEffect } from "react";

// function FloatingSky({
//   numBackgroundStars = 450,
//   maxStarRadius = 1.5,
//   twinkleSpeed = 0.009,
//   cometFrequency = 0.007,
// }) {
//   useEffect(() => {
//     const canvas = document.createElement("canvas");
//     canvas.style.position = "fixed";
//     canvas.style.inset = "0";
//     canvas.style.zIndex = "-1";
//     canvas.style.background = "#010118";
//     document.body.appendChild(canvas);

//     const ctx = canvas.getContext("2d");
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     const stars = Array.from({ length: numBackgroundStars }, () => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       radius: Math.random() * maxStarRadius,
//       alpha: Math.random(),
//       alphaChange: twinkleSpeed + Math.random() * twinkleSpeed,
//       speedX: 0.01 + Math.random() * 0.05,
//       speedY: 0.01 + Math.random() * 0.05,
//     }));

//     let comets = [];

//     function animate() {
//       ctx.clearRect(0, 0, width, height);

//       // Draw stars
//       stars.forEach((s) => {
//         s.alpha += s.alphaChange;
//         if (s.alpha <= 0 || s.alpha >= 1) s.alphaChange *= -1;

//         s.x += s.speedX;
//         s.y -= s.speedY;

//         if (s.y < 0) s.y = height;
//         if (s.x > width) s.x = 0;

//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
//         ctx.fill();
//       });

//       // Spawn comets randomly
//       if (Math.random() < cometFrequency) {
//         comets.push({
//           x: Math.random() * width,
//           y: Math.random() * height / 2,
//           length: 100 + Math.random() * 150,
//           speedX: 2 + Math.random() * 2,
//           speedY: 1 + Math.random(),
//           alpha: 1,
//         });
//       }

//       // Draw comets
//       comets.forEach((c, idx) => {
//         c.x += c.speedX;
//         c.y -= c.speedY;
//         c.alpha -= 0.005;

//         ctx.beginPath();
//         ctx.moveTo(c.x, c.y);
//         ctx.lineTo(c.x - c.length, c.y + c.length / 2);
//         ctx.strokeStyle = `rgba(255,255,255,${c.alpha})`;
//         ctx.lineWidth = 2;
//         ctx.stroke();

//         if (c.alpha <= 0) comets.splice(idx, 1);
//       });

//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       document.body.removeChild(canvas);
//     };
//   }, [numBackgroundStars, maxStarRadius, twinkleSpeed, cometFrequency]);

//   return null; // No interactable stars or moon
// }

// export default FloatingSky;

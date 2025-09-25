import React from "react";

function NoteModal({ title, text, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-[rgba(2,6,23,0.45)] to-[rgba(2,6,23,0.65)] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white bg-gradient-to-b from-white to-[#fffefc] rounded-xl p-6 w-full max-w-md shadow-2xl relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-gray-700 hover:text-gray-900 transition"
          onClick={onClose}
          aria-label="Close note"
        >
          &times;
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        {/* Text */}
        <p className="text-gray-800 text-base mb-4">{text}</p>

        {/* Close button */}
        <button
          className="bg-gradient-to-r from-[#ff7ab6] to-[#ff5f9e] text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NoteModal;

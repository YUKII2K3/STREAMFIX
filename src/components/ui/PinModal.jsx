import React, { useState } from "react";

export default function PinModal({ open, onClose, onSuccess }) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (idx, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newPin = [...pin];
    newPin[idx] = value;
    setPin(newPin);
    setError("");
    // Move to next input if filled
    if (value && idx < 3) {
      document.getElementById(`pin-input-${idx + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.join("") === "2003") {
      setPin(["", "", "", ""]);
      setError("");
      onSuccess();
    } else {
      setError("Incorrect PIN. Try again.");
      setPin(["", "", "", ""]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-xs relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4">Enter your PIN to access this profile.</h2>
          <div className="flex space-x-2 mb-4">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`pin-input-${idx}`}
                type="password"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                className="w-12 h-12 text-2xl text-center border rounded-lg focus:outline-none focus:border-red-500 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                autoFocus={idx === 0}
                inputMode="numeric"
              />
            ))}
          </div>
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          <div className="flex space-x-4">
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">Submit</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
} 
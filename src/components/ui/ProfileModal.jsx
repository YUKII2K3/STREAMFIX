import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ProfileModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img
            src="/StreamNest images/Profile image-1.jpg"
            alt="Yuktheshwar M P"
            className="w-28 h-28 rounded-full object-cover border-4 border-red-500 mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">Yuktheshwar M P</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-4 text-center">Netflix Clone Professional Profile</p>
          <div className="flex space-x-4 mb-4">
            <a href="https://github.com/YUKII2K3" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-7 h-7 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white" />
            </a>
            <a href="https://linkedin.com/in/yuktheshwar-mp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-7 h-7 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200" />
            </a>
            <a href="mailto:yukiis.dev@gmail.com" aria-label="Email">
              <Mail className="w-7 h-7 text-red-500 hover:text-red-700" />
            </a>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">yukiis.dev@gmail.com</div>
        </div>
      </div>
    </div>
  );
} 
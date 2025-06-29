import React, { useState } from "react";
import PinModal from "./PinModal";
import { Lock } from "lucide-react";

const profiles = [
  {
    name: "Yukii",
    img: "/StreamNest images/Profile image-2.jpg",
    locked: true,
  },
  {
    name: "Home",
    img: "/StreamNest images/Home.jpeg",
    locked: false,
  },
  {
    name: "Vicky",
    img: "/StreamNest images/Vicky.jpeg",
    locked: false,
  },
  {
    name: "TV",
    img: "/StreamNest images/TV.jpeg",
    locked: false,
  },
  {
    name: "Children",
    img: "/StreamNest images/Children.jpeg",
    locked: false,
  },
];

export default function ProfileSelection({ onSelect }) {
  const [showPin, setShowPin] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    if (profile.locked) {
      setSelectedProfile(profile);
      setShowPin(true);
    } else {
      onSelect(profile.name);
    }
  };

  const handlePinSuccess = () => {
    setShowPin(false);
    onSelect(selectedProfile.name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose your profile</h1>
      </div>
      <div className="flex flex-wrap gap-8 justify-center mb-8">
        {profiles.map((profile) => (
          <div key={profile.name} className="flex flex-col items-center">
            <button
              onClick={() => handleProfileClick(profile)}
              className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg bg-gray-800 group focus:outline-none"
            >
              <img
                src={profile.img}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              {profile.locked && (
                <span className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 flex items-center justify-center z-10" style={{ width: 36, height: 36 }}>
                  <span className="w-full h-full rounded-full border-4 border-red-600 bg-red-600 flex items-center justify-center shadow-md">
                    <Lock className="w-5 h-5 text-white" />
                  </span>
                </span>
              )}
            </button>
            <span className="mt-3 text-lg font-semibold text-white drop-shadow-lg">{profile.name}</span>
          </div>
        ))}
      </div>
      <PinModal open={showPin} onClose={() => setShowPin(false)} onSuccess={handlePinSuccess} />
    </div>
  );
} 
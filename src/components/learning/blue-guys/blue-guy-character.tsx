'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/sound-effects';

export type BlueGuyPose = 'hero' | 'runner' | 'chai' | 'dancer' | 'dramatic';

interface BlueGuyCharacterProps {
  pose?: BlueGuyPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  onClick?: () => void;
  showGlow?: boolean;
}

export function BlueGuyCharacter({
  pose = 'hero',
  size = 'md',
  animated = true,
  className = '',
  onClick,
  showGlow = true,
}: BlueGuyCharacterProps) {
  const [isWiggling, setIsWiggling] = useState(false);

  // Size mapping
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const handleClick = () => {
    sound.playClick();
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 ${
        sizeMap[size]
      } ${isWiggling ? 'animate-bounce' : ''} ${className}`}
      title="Click me for an iconic Indian cinema cybersecurity dialogue!"
    >
      {/* Background Cyber Ambient Glow */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl animate-pulse pointer-events-none" />
      )}

      {/* SVG Character Rendering Based on Pose */}
      {pose === 'hero' && (
        <svg
          viewBox="0 0 120 120"
          className={`w-full h-full drop-shadow-[0_4px_16px_rgba(56,189,248,0.4)] ${
            animated ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''
          }`}
        >
          {/* Defs for gradients & filters */}
          <defs>
            <linearGradient id="blueGuyHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="heroCapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="sunglassesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Fluttering Cape */}
          <path
            d="M40 68 C20 75 10 95 15 110 C28 102 38 92 48 80 Z"
            fill="url(#heroCapeGrad)"
            opacity="0.9"
            className={animated ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}
          />
          <path
            d="M80 68 C100 75 110 95 105 110 C92 102 82 92 72 80 Z"
            fill="url(#heroCapeGrad)"
            opacity="0.9"
            className={animated ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}
          />

          {/* Legs */}
          <rect x="42" y="86" width="12" height="24" rx="6" fill="#0369a1" />
          <rect x="66" y="86" width="12" height="24" rx="6" fill="#0369a1" />
          {/* Boots */}
          <rect x="40" y="102" width="16" height="10" rx="4" fill="#0f172a" />
          <rect x="64" y="102" width="16" height="10" rx="4" fill="#0f172a" />

          {/* Torso / Cyber Armor */}
          <rect x="36" y="52" width="48" height="40" rx="14" fill="url(#blueGuyHeroGrad)" />
          {/* Armor Chest Emblem (Cyan Cyber Shield) */}
          <path
            d="M60 60 L70 65 L60 80 L50 65 Z"
            fill="#38bdf8"
            stroke="#ffffff"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          <circle cx="60" cy="68" r="2.5" fill="#ffffff" />

          {/* Left Arm (Holding Energy Shield) */}
          <path
            d="M36 60 Q22 68 24 82"
            fill="none"
            stroke="#0284c7"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Holographic Shield */}
          <polygon
            points="22,65 14,75 18,92 28,90 28,70"
            fill="#38bdf8"
            opacity="0.8"
            stroke="#7dd3fc"
            strokeWidth="1.5"
          />

          {/* Right Arm (Heroic Thumbs-Up / Finger Gun) */}
          <path
            d="M84 60 Q98 62 100 76"
            fill="none"
            stroke="#0284c7"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Golden cyber spark at fingertip */}
          <circle cx="100" cy="76" r="4" fill="#facc15" className="animate-ping" />
          <circle cx="100" cy="76" r="3" fill="#ffffff" />

          {/* Head */}
          <circle cx="60" cy="38" r="22" fill="url(#blueGuyHeroGrad)" />

          {/* Cyber Antenna with Beacon Light */}
          <line x1="60" y1="16" x2="60" y2="8" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="60" cy="6" r="4" fill="#38bdf8" className="animate-ping" />
          <circle cx="60" cy="6" r="3" fill="#ffffff" />

          {/* Headset Earcups */}
          <rect x="35" y="32" width="6" height="12" rx="3" fill="#0f172a" />
          <rect x="79" y="32" width="6" height="12" rx="3" fill="#0f172a" />
          <path d="M38 32 C38 20 82 20 82 32" fill="none" stroke="#0f172a" strokeWidth="2.5" />

          {/* Cool Indian Cinema Sunglasses (Don / Thalaiva Style) */}
          <path
            d="M44 32 C44 28 54 28 56 32 L56 38 C54 42 44 42 44 38 Z"
            fill="url(#sunglassesGrad)"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
          <path
            d="M64 32 C64 28 74 28 76 32 L76 38 C74 42 64 42 64 38 Z"
            fill="url(#sunglassesGrad)"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
          <line x1="56" y1="34" x2="64" y2="34" stroke="#38bdf8" strokeWidth="2" />
          {/* Sunglasses Specular Glint */}
          <line x1="47" y1="31" x2="52" y2="31" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          <line x1="67" y1="31" x2="72" y2="31" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

          {/* Confident Smile */}
          <path d="M54 48 Q60 52 66 48" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {pose === 'runner' && (
        <svg
          viewBox="0 0 130 120"
          className={`w-full h-full drop-shadow-[0_4px_16px_rgba(56,189,248,0.5)] ${
            animated ? 'animate-[bounce_1.5s_infinite]' : ''
          }`}
        >
          <defs>
            <linearGradient id="hoverFlame" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="blueRunnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Speed Trail Lines */}
          <line x1="10" y1="50" x2="30" y2="50" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="5" y1="70" x2="25" y2="70" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" opacity="0.8" />
          <line x1="15" y1="90" x2="35" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

          {/* Cyber Hoverboard */}
          <ellipse cx="65" cy="104" rx="45" ry="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="65" cy="104" rx="35" ry="4" fill="#0284c7" />
          {/* Neon Thruster Flames */}
          <polygon points="20,104 5,100 0,104 5,108" fill="url(#hoverFlame)" className="animate-pulse" />

          {/* Leaning Body & Legs */}
          <rect x="52" y="80" width="12" height="24" rx="5" fill="#0369a1" transform="rotate(-12 52 80)" />
          <rect x="74" y="82" width="12" height="22" rx="5" fill="#0369a1" transform="rotate(15 74 82)" />

          {/* Torso */}
          <rect x="48" y="48" width="44" height="38" rx="14" fill="url(#blueRunnerGrad)" transform="rotate(-6 48 48)" />

          {/* Arms (Surfing / Driving Cyber Controls) */}
          <path d="M50 56 Q35 60 40 76" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
          <path d="M88 56 Q105 60 102 74" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />

          {/* Head with Visor */}
          <circle cx="72" cy="34" r="20" fill="url(#blueRunnerGrad)" />
          {/* Cyber Visor */}
          <rect x="64" y="28" width="26" height="11" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="68" y1="33" x2="84" y2="33" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />

          {/* Cute Antenna leaning back */}
          <line x1="72" y1="14" x2="62" y2="6" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="60" cy="5" r="3.5" fill="#38bdf8" className="animate-ping" />
        </svg>
      )}

      {pose === 'chai' && (
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(56,189,248,0.35)]"
        >
          <defs>
            <linearGradient id="chaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="teaGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Legs & Comfortable Stance */}
          <rect x="42" y="86" width="12" height="24" rx="6" fill="#0369a1" />
          <rect x="66" y="86" width="12" height="24" rx="6" fill="#0369a1" />
          <rect x="40" y="102" width="16" height="10" rx="4" fill="#0f172a" />
          <rect x="64" y="102" width="16" height="10" rx="4" fill="#0f172a" />

          {/* Torso / Casual Hoodie */}
          <rect x="36" y="52" width="48" height="40" rx="14" fill="url(#chaiGrad)" />
          {/* Hoodie Strings */}
          <line x1="56" y1="56" x2="56" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="56" x2="64" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

          {/* Left Arm: Resting on Hip */}
          <path d="M38 58 Q24 66 32 80" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />

          {/* Right Arm: Holding Cutting Chai Glass */}
          <path d="M82 58 Q96 66 88 80" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />

          {/* Authentic Indian Cutting Chai Glass */}
          <polygon points="86,74 96,74 94,90 88,90" fill="url(#teaGlassGrad)" stroke="#ffffff" strokeWidth="1" />
          {/* Glass Holder Wire */}
          <line x1="85" y1="80" x2="95" y2="80" stroke="#94a3b8" strokeWidth="1" />

          {/* Rising Steam Lines */}
          <path
            d="M89 70 Q92 64 89 58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-[pulse_1.5s_infinite]"
          />
          <path
            d="M93 70 Q96 64 93 58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-[pulse_2s_infinite]"
          />

          {/* Head with Warm Friendly Smile */}
          <circle cx="60" cy="38" r="22" fill="url(#chaiGrad)" />
          {/* Headset */}
          <rect x="35" y="32" width="6" height="12" rx="3" fill="#0f172a" />
          <rect x="79" y="32" width="6" height="12" rx="3" fill="#0f172a" />
          <path d="M38 32 C38 20 82 20 82 32" fill="none" stroke="#0f172a" strokeWidth="2.5" />

          {/* Happy Eyes */}
          <path d="M48 34 Q53 30 58 34" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M62 34 Q67 30 72 34" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cheerful Smile with Dimple */}
          <path d="M52 46 Q60 54 68 46" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

          {/* Antenna */}
          <line x1="60" y1="16" x2="60" y2="8" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="60" cy="7" r="3" fill="#38bdf8" />
        </svg>
      )}

      {pose === 'dancer' && (
        <svg
          viewBox="0 0 120 120"
          className={`w-full h-full drop-shadow-[0_4px_16px_rgba(56,189,248,0.5)] ${
            animated ? 'animate-[bounce_1s_infinite]' : ''
          }`}
        >
          <defs>
            <linearGradient id="dancerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Swagger Celebration Dance Pose */}
          {/* Tilted Legs */}
          <rect x="38" y="86" width="12" height="24" rx="6" fill="#0369a1" transform="rotate(-15 38 86)" />
          <rect x="68" y="86" width="12" height="24" rx="6" fill="#0369a1" transform="rotate(15 68 86)" />

          {/* Torso */}
          <rect x="36" y="50" width="48" height="40" rx="14" fill="url(#dancerGrad)" />
          {/* Gold Chain Pendant with Lock */}
          <path d="M48 50 Q60 66 72 50" fill="none" stroke="#facc15" strokeWidth="2" />
          <rect x="57" y="64" width="6" height="8" rx="2" fill="#facc15" />

          {/* Arms Raised High in Victory (Bhangra / South Cinema Style!) */}
          <path d="M36 56 Q16 42 22 26" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
          <circle cx="22" cy="24" r="5" fill="#38bdf8" />

          <path d="M84 56 Q104 42 98 26" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
          <circle cx="98" cy="24" r="5" fill="#38bdf8" />

          {/* Head Tilted with Victory Grin */}
          <circle cx="60" cy="36" r="22" fill="url(#dancerGrad)" />

          {/* Dark Aviator Shades */}
          <polygon points="42,30 57,30 54,42 45,42" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <polygon points="63,30 78,30 75,42 66,42" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="57" y1="33" x2="63" y2="33" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Open Joyful Laugh */}
          <path d="M50 46 Q60 58 70 46 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

          {/* Golden Sparkles Around Head */}
          <polygon points="30,18 32,22 36,20 33,24 35,28 31,25 28,27 29,23" fill="#facc15" className="animate-ping" />
          <polygon points="90,14 92,18 96,16 93,20 95,24 91,21 88,23 89,19" fill="#facc15" className="animate-ping" />
        </svg>
      )}

      {pose === 'dramatic' && (
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(244,63,94,0.4)]"
        >
          <defs>
            <linearGradient id="dramaticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Legs */}
          <rect x="42" y="86" width="12" height="24" rx="6" fill="#0369a1" />
          <rect x="66" y="86" width="12" height="24" rx="6" fill="#0369a1" />

          {/* Torso */}
          <rect x="36" y="52" width="48" height="40" rx="14" fill="url(#dramaticGrad)" />

          {/* Left Hand Dramatic to Forehead ("Rajesh, I hate packet drops!") */}
          <path d="M36 60 Q20 48 38 32" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />

          {/* Right Hand Holding Broken Ethernet Cable */}
          <path d="M84 60 Q98 72 90 84" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
          <line x1="90" y1="84" x2="98" y2="92" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 2" />
          <circle cx="100" cy="94" r="3" fill="#facc15" className="animate-ping" />

          {/* Head */}
          <circle cx="60" cy="38" r="22" fill="url(#dramaticGrad)" />

          {/* Dramatic Tearful Eyes */}
          <circle cx="50" cy="34" r="4" fill="#0f172a" />
          <circle cx="70" cy="34" r="4" fill="#0f172a" />
          {/* Comedic Blue Tear */}
          <path d="M50 40 Q48 46 50 48 Q52 46 50 40" fill="#38bdf8" className="animate-bounce" />

          {/* Shocked / Agonized O-Mouth */}
          <ellipse cx="60" cy="48" rx="4" ry="5" fill="#0f172a" />
        </svg>
      )}
    </div>
  );
}

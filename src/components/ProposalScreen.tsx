import React, { useState, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ProposalScreenProps {
  onAccept: () => void;
}

const NO_MESSAGES = [
  "No 🥺",
  "Try again! 😜",
  "Nice try! 🚫",
  "Oops, too slow! 💨",
  "Not an option! 🔒",
  "Error 404: 'No' not found 🤖",
  "Are you sure? 🤔",
  "Maybe click Yes? 👉👈",
  "Access Denied! 🙅‍♂️",
  "Try harder! ⚡️",
  "Click Yes! ❤️",
  "Still trying? 😂",
  "Give up! 😉"
];

export const ProposalScreen: React.FC<ProposalScreenProps> = ({ onAccept }) => {
  const [noIndex, setNoIndex] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showBadge, setShowBadge] = useState(true);
  
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = (clientX?: number, clientY?: number) => {
    if (!noButtonRef.current) return;

    const btnWidth = noButtonRef.current.offsetWidth || 110;
    const btnHeight = noButtonRef.current.offsetHeight || 45;
    
    // Bounds with a safe margin from the viewport edges
    const padding = 60;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    let newX = padding;
    let newY = padding;
    let attempts = 0;
    const minDistance = 160; // Safe distance from cursor/tap

    do {
      if (maxX > padding) {
        newX = padding + Math.random() * (maxX - padding);
      } else {
        newX = padding;
      }

      if (maxY > padding) {
        newY = padding + Math.random() * (maxY - padding);
      } else {
        newY = padding;
      }

      attempts++;
      
      if (clientX !== undefined && clientY !== undefined) {
        const dist = Math.hypot(newX + btnWidth / 2 - clientX, newY + btnHeight / 2 - clientY);
        if (dist > minDistance) break;
      } else {
        break;
      }
    } while (attempts < 20);

    setNoPosition({ x: newX, y: newY });
    setHasMoved(true);
    setNoIndex((prev) => (prev + 1) % NO_MESSAGES.length);
  };

  const handleNoMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    moveNoButton(e.clientX, e.clientY);
  };

  const handleNoTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent double trigger
    if (e.touches[0]) {
      moveNoButton(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleCloseBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBadge(false);
  };

  return (
    <div className="screen-container">
      <div className="proposal-wrapper">
        <div className="top-tagline">A very important question</div>
        <h1 className="proposal-heading">
          Will you write a <span>letter of rec</span> for me Mr. Tymeson?
        </h1>
        <p className="proposal-subtitle">
          Take your time. Choose carefully. There is definitely a right answer.
        </p>

        <div className="button-container">
          <button className="btn btn-yes" onClick={onAccept}>
            Yes 💕
          </button>
          
          <button
            ref={noButtonRef}
            className={`btn btn-no ${hasMoved ? 'dodging' : ''}`}
            style={
              hasMoved
                ? {
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                  }
                : {}
            }
            onMouseEnter={handleNoMouseEnter}
            onTouchStart={handleNoTouchStart}
            onClick={() => moveNoButton()}
          >
            {NO_MESSAGES[noIndex]}
          </button>
        </div>
      </div>

      <div className="footer-text">
        yes I made this website - yes I used AI - no I won't write it myself, need your signature
      </div>

      {showBadge && (
        <div className="antigravity-badge" onClick={() => window.open('https://github.com/google-deepmind', '_blank')}>
          <Sparkles size={11} className="sparkle-icon" style={{ color: 'var(--accent-gold)' }} />
          <span>Edit with Antigravity</span>
          <button className="antigravity-close" onClick={handleCloseBadge}>
            <X size={8} />
          </button>
        </div>
      )}
    </div>
  );
};

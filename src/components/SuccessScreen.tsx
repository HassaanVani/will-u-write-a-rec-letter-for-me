import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { PolaroidPhoto } from './PolaroidPhoto';
import { RefreshCw, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessScreenProps {
  onRestart: () => void;
}

const SAMMY_PHOTOS = [
  { file: '1000035741.jpg', caption: 'Deep in thought... 🧠' },
  { file: '1000043056.jpg', caption: 'Writing code like a pro 💻' },
  { file: '1000050640.jpg', caption: 'Studying hard! 📚' },
  { file: '1000054792.jpg', caption: 'Analyzing data 📊' },
  { file: '1000054793.jpg', caption: 'Is this math correct? 📐' },
  { file: '1000055686.jpg', caption: 'Ready for college! 🎓' },
  { file: '1000070191.jpg', caption: 'Vibecoding champion 🚀' },
  { file: '1000073256.jpg', caption: 'Calculated poses only 🧐' },
  { file: '1000073715.jpg', caption: 'Exhibit A: Prime student 🏆' },
  { file: '1000073758.jpg', caption: 'Thinking about that rec letter... 👉👈' },
  { file: '1000074512.jpg', caption: 'Will make you proud! 💯' },
  { file: 'IMG_5282.jpg', caption: 'Peak academic energy ⚡️' },
  { file: 'IMG_8286.jpg', caption: 'Focus mode active 🎯' },
  { file: 'IMG_8782.jpg', caption: 'Looking towards the future! 🌟' },
];

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onRestart }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Z-Indexing tracking ref
  const maxZIndexRef = useRef(SAMMY_PHOTOS.length + 10);
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>(() => {
    const initialMap: Record<string, number> = {};
    SAMMY_PHOTOS.forEach((photo, idx) => {
      initialMap[photo.file] = idx + 10;
    });
    return initialMap;
  });

  // Lightbox viewer states
  const [selectedPhoto, setSelectedPhoto] = useState<{ file: string; caption: string } | null>(null);

  // Scramble state to force remount
  const [scrambleKey, setScrambleKey] = useState(0);

  // Confetti celebration
  useEffect(() => {
    // Initial explosion
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff66b2', '#ff99c8', '#fadbe6', '#ffffff']
    });

    const fireSideConfetti = () => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff3366', '#ff66b2', '#ff99c8', '#fadbe6']
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff3366', '#ff66b2', '#ff99c8', '#fadbe6']
      });
    };

    // Fire side bursts every 3 seconds to keep energy high
    const interval = setInterval(fireSideConfetti, 3000);
    return () => clearInterval(interval);
  }, [scrambleKey]); // Refire initial on scramble too!

  const handleFocusPhoto = (file: string) => {
    maxZIndexRef.current += 1;
    const nextZ = maxZIndexRef.current;
    setZIndexMap((prevMap) => ({
      ...prevMap,
      [file]: nextZ,
    }));
  };

  const handleScramble = () => {
    setScrambleKey((prev) => prev + 1);
  };

  return (
    <div className="screen-container success-screen">
      <div className="success-header">
        <h1>
          THANK YOU! - <span>Sammy</span> 💖
        </h1>
        <p>Double-click a photo to view it closely. Drag them around to rearrange!</p>
      </div>

      <div ref={boardRef} className="collage-board">
        {SAMMY_PHOTOS.map((photo, index) => (
          <PolaroidPhoto
            key={`${photo.file}-${scrambleKey}`}
            imageName={photo.file}
            caption={photo.caption}
            index={index}
            boardRef={boardRef}
            zIndex={zIndexMap[photo.file]}
            onFocus={() => handleFocusPhoto(photo.file)}
            onSelect={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      <div className="success-actions">
        <button className="btn btn-secondary" onClick={handleScramble}>
          <RefreshCw size={15} />
          Scramble Collage
        </button>
        <button className="btn btn-secondary" onClick={onRestart}>
          <RotateCcw size={15} />
          Ask Again
        </button>
      </div>

      {/* Lightbox / Modal Modal View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="lightbox-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="lightbox-content"
            >
              <img
                src={`/sammy/${selectedPhoto.file}`}
                alt={selectedPhoto.caption}
                className="lightbox-img"
              />
              <div className="lightbox-caption">{selectedPhoto.caption}</div>
              <button className="antigravity-close" style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', background: 'rgba(255,255,255,0.9)', zIndex: 10 }} onClick={() => setSelectedPhoto(null)}>
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

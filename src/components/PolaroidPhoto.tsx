import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PolaroidPhotoProps {
  imageName: string;
  caption: string;
  index: number;
  boardRef: React.RefObject<HTMLDivElement>;
  zIndex: number;
  onFocus: () => void;
  onSelect: () => void;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  imageName,
  caption,
  index,
  boardRef,
  zIndex,
  onFocus,
  onSelect,
}) => {
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Determine bounds for scatter
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Compute a bounding box in the center, leaving space for headers/footers
    const cardWidth = w < 600 ? 140 : 200;
    const cardHeight = w < 600 ? 180 : 250;
    
    const minX = 20;
    const maxX = w - cardWidth - 20;
    
    // Success header takes top 20%, action buttons take bottom 15%
    const minY = h * 0.18;
    const maxY = h * 0.72 - cardHeight;

    const randomX = minX + Math.random() * (maxX - minX);
    const randomY = minY + Math.random() * (maxY - minY);
    const randomRotate = (Math.random() - 0.5) * 36; // between -18 and 18 degrees

    setInitialPos({ x: randomX, y: randomY, rotate: randomRotate });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const cardWidthStyle = window.innerWidth < 600 ? '140px' : '200px';
  const cardHeightStyle = window.innerWidth < 600 ? '180px' : '250px';

  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      dragElastic={0.08}
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      initial={{
        scale: 0.1,
        opacity: 0,
        x: window.innerWidth / 2 - (window.innerWidth < 600 ? 70 : 100),
        y: window.innerHeight / 2 - (window.innerWidth < 600 ? 90 : 125),
        rotate: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        x: initialPos.x,
        y: initialPos.y,
        rotate: initialPos.rotate,
        transition: {
          type: 'spring',
          stiffness: 90,
          damping: 14,
          delay: index * 0.08, // Cascading/exploding arrival
        },
      }}
      whileHover={{
        scale: 1.06,
        rotate: initialPos.rotate * 0.4,
        transition: { duration: 0.2 },
      }}
      whileDrag={{
        scale: 1.1,
        transition: { duration: 0.1 },
      }}
      onPointerDown={onFocus}
      onDoubleClick={onSelect}
      className="polaroid-card"
      style={{
        zIndex,
        width: cardWidthStyle,
        height: cardHeightStyle,
      }}
    >
      <div className="polaroid-img-wrapper" style={{ height: '80%' }}>
        <img
          src={`/ryan/${imageName}`}
          alt={caption}
          className="polaroid-img"
          loading="lazy"
        />
      </div>
      <div className="polaroid-caption">{caption}</div>
    </motion.div>
  );
};

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, RotateCcw, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessScreenProps {
  onRestart: () => void;
}

const SAMMY_CREDITS = [
  {
    file: '1000035741.jpg',
    role: 'Aspiring Neuroscientist',
    achievement: 'Winner of the Brain Bee; successfully diagnosed Mr. Tymeson\'s physics-induced neural fatigue.',
    rating: 'Synaptic Elite (10/10)',
    note: 'Has already mapped 80% of his own frontal lobe.'
  },
  {
    file: '1000043056.jpg',
    role: 'Physics Skeptic',
    achievement: 'Formally declared that thermodynamics is 100% less interesting than cellular mitosis.',
    rating: 'Gravity = Vibe (0/10)',
    note: 'Stated F = ma is "fake news" and action potentials are the truth.'
  },
  {
    file: '1000050640.jpg',
    role: 'Biology Enthusiast',
    achievement: 'Can explain the electron transport chain backwards while asleep.',
    rating: 'Cell-Tastic (10/10)',
    note: 'Will pick mitochondria over equations any day.'
  },
  {
    file: '1000054792.jpg',
    role: 'Self-Proclaimed Brahmin',
    achievement: 'Achieved ultimate cosmic enlightenment and coding nirvana in class.',
    rating: 'Pure Karma (10/10)',
    note: 'Conducts spiritual calculations on physics worksheets.'
  },
  {
    file: '1000054793.jpg',
    role: 'Brain Bee Champion',
    achievement: 'Memorized the entire human nervous system just to win a trophy.',
    rating: 'Synaptic Gold',
    note: 'Knows more cranial nerves than Mr. Tymeson knows formulas.'
  },
  {
    file: '1000055686.jpg',
    role: 'Science Bowl Team Captain',
    achievement: 'Led the team under Mr. Tymeson\'s supervision; fastest buzzer fingers in the district.',
    rating: 'Buzz-Master (10/10)',
    note: 'Answered a biology bonus question before the reader finished.'
  },
  {
    file: '1000070191.jpg',
    role: 'Eagle Boy Scout',
    achievement: 'Can start a campfire with two sticks, but prefers using his laptop to vibecode.',
    rating: 'Prepared for College',
    note: 'Ready for any scenario (except a sudden physics pop quiz).'
  },
  {
    file: '1000073256.jpg',
    role: 'Speech & Debate Lead',
    achievement: 'Self-proclaimed master debator; successfully argued that biology is the superior science.',
    rating: 'Unmatched Rhetoric',
    note: 'Could convince an examiner that friction doesn\'t exist.'
  },
  {
    file: '1000073715.jpg',
    role: 'Lead Vibecoder',
    achievement: 'Wrote this entire interactive website using vibes, feelings, and absolute confidence.',
    rating: '11/10 Vibe Check',
    note: 'Does not debug; simply reframes the compiler\'s reality.'
  },
  {
    file: '1000073758.jpg',
    role: 'AP Physics Survivor',
    achievement: 'Survived class lectures by converting kinematic vectors into biological pathways.',
    rating: 'High Resilience',
    note: 'Please do not include block-on-inclined-plane questions on the letter.'
  },
  {
    file: '1000074512.jpg',
    role: 'Synapse Sculptor',
    achievement: 'Demonstrated that reviewing photos of Sammy increases AP physics pass rates.',
    rating: 'High Dopamine Signal',
    note: 'The data is conclusive: Sammy is college-ready.'
  },
  {
    file: 'IMG_5282.jpg',
    role: 'Debate Tactician',
    achievement: 'Won three straight tournament rounds using neuro-linguistic biology trivia.',
    rating: 'Master Debator',
    note: 'Arguments travel faster than a myelinated axon.'
  },
  {
    file: 'IMG_8286.jpg',
    role: 'Science Bowl MVP',
    achievement: 'Scored 120 points on biology tossups while ignoring Mr. Tymeson\'s kinematics hints.',
    rating: 'AP Star (10/10)',
    note: 'Mr. Tymeson\'s proudest Science Bowl supervision asset.'
  },
  {
    file: 'IMG_8782.jpg',
    role: 'Ultimate Candidate',
    achievement: 'Created a custom React site with cursor-dodging logic to secure the recommendation.',
    rating: 'Rec Level: Maxed',
    note: 'Mr. Tymeson, your digital pen is required. Please sign below!'
  }
];

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onRestart }) => {
  // Spotlight photo structure
  const [spotlight, setSpotlight] = useState<typeof SAMMY_CREDITS[number] & { isManual?: boolean } | null>(null);
  const [isPaused, setIsPaused] = useState(false);


  // Divide images into two separate lists for the dual scrolling reels
  const row1Photos = SAMMY_CREDITS.slice(0, 7);
  const row2Photos = SAMMY_CREDITS.slice(7);

  // Initial big confetti explosion on mount
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c59b27', '#e9c46a', '#15305b', '#ffffff']
    });
  }, []);

  // Automated cinematic spotlight cycles
  useEffect(() => {
    if (spotlight?.isManual) return; // Pause auto-scrolling slideshow if manual overlay is active

    const timer = setInterval(() => {
      // Pick a random photo to spotlight
      const randomItem = SAMMY_CREDITS[Math.floor(Math.random() * SAMMY_CREDITS.length)];
      setSpotlight({ ...randomItem, isManual: false });
      setIsPaused(true);

      // Auto close after 2.8 seconds
      setTimeout(() => {
        setSpotlight((curr) => {
          if (curr && !curr.isManual) {
            setIsPaused(false);
            return null;
          }
          return curr;
        });
      }, 2800);
    }, 4500); // Cycle every 4.5 seconds

    return () => clearInterval(timer);
  }, [spotlight]);

  // Trigger golden confetti every time a new slide enters the spotlight
  useEffect(() => {
    if (spotlight) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#c59b27', '#e9c46a', '#15305b', '#ffffff']
      });
    }
  }, [spotlight?.file]);

  const handleSlideClick = (photo: typeof SAMMY_CREDITS[number]) => {
    setSpotlight({ ...photo, isManual: true });
    setIsPaused(true);
  };

  const handleCloseSpotlight = () => {
    setSpotlight(null);
    setIsPaused(false);
  };

  const handleForceSpotlight = () => {
    const randomItem = SAMMY_CREDITS[Math.floor(Math.random() * SAMMY_CREDITS.length)];
    setSpotlight({ ...randomItem, isManual: true });
    setIsPaused(true);
  };

  return (
    <div className="screen-container success-screen">
      <div className="success-header-cinematic">
        <h1>
          THANK YOU! - <span>Sammy</span> 🎓
        </h1>
        <p>A cinematic credits reel of your future star student. Click any slide to pause and spotlight.</p>
      </div>

      <div className={`filmstrip-reels-container ${isPaused ? 'reels-paused' : ''}`}>
        {/* Row 1: Left to Right */}
        <div className="filmstrip-row scroll-ltr">
          {/* Double list for seamless looping infinite scroll */}
          {[...row1Photos, ...row1Photos].map((photo, idx) => (
            <div
              key={`row1-${photo.file}-${idx}`}
              className="film-slide"
              onClick={() => handleSlideClick(photo)}
            >
              <div className="film-slide-img-wrapper">
                <img src={`/sammy/${photo.file}`} alt={photo.role} className="film-slide-img" />
              </div>
              <div className="film-slide-label">{photo.role}</div>
            </div>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="filmstrip-row scroll-rtl">
          {[...row2Photos, ...row2Photos].map((photo, idx) => (
            <div
              key={`row2-${photo.file}-${idx}`}
              className="film-slide"
              onClick={() => handleSlideClick(photo)}
            >
              <div className="film-slide-img-wrapper">
                <img src={`/sammy/${photo.file}`} alt={photo.role} className="film-slide-img" />
              </div>
              <div className="film-slide-label">{photo.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="success-actions-cinematic">
        <button className="btn btn-cinematic" onClick={handleForceSpotlight}>
          <RefreshCw size={15} />
          Spotlight Random
        </button>
        <button className="btn btn-cinematic" onClick={onRestart}>
          <RotateCcw size={15} />
          Ask Again
        </button>
      </div>

      {/* Cinematic Spotlight Modal Overlay */}
      <AnimatePresence>
        {spotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSpotlight}
            className="spotlight-overlay"
          >
            <motion.div
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="spotlight-wrapper"
            >
              {/* Photo slide zoomed in */}
              <div className="spotlight-slide">
                <div className="spotlight-slide-img-wrapper">
                  <img
                    src={`/sammy/${spotlight.file}`}
                    alt={spotlight.role}
                    className="spotlight-slide-img"
                  />
                </div>
                <div className="spotlight-slide-caption">{spotlight.role}</div>
              </div>

              {/* Movie style credential credits */}
              <div className="spotlight-credentials">
                <div className="credits-tagline">Academic Spotlight</div>
                <h2 className="credits-title">{spotlight.role}</h2>
                <div className="credits-divider"></div>
                
                <div className="credits-details">
                  <div className="credits-row">
                    <span className="credits-label">Candidate:</span>
                    <span className="credits-value highlight">Sammy</span>
                  </div>
                  <div className="credits-row">
                    <span className="credits-label">Key Feat:</span>
                    <span className="credits-value">{spotlight.achievement}</span>
                  </div>
                  <div className="credits-row">
                    <span className="credits-label">Rating:</span>
                    <span className="credits-value highlight">
                      <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" style={{ marginRight: '4px', display: 'inline' }} />
                      {spotlight.rating}
                    </span>
                  </div>
                  <div className="credits-row">
                    <span className="credits-label">Evaluation:</span>
                    <span className="credits-value" style={{ fontStyle: 'italic', color: '#c59b27' }}>
                      "{spotlight.note}"
                    </span>
                  </div>
                </div>
              </div>

              {/* Close button (only visible/required for manual spotlight, but nice to have in general) */}
              <button className="spotlight-close" onClick={handleCloseSpotlight}>
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

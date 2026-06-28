import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, RotateCcw, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Teacher } from '../App';

interface SuccessScreenProps {
  teacher: Teacher;
  onRestart: () => void;
}

const TYMESON_CREDITS = [
  {
    file: '1.jpg',
    role: 'Aspiring Neuroscientist',
    achievement: 'Winner of the Brain Bee; successfully diagnosed Mr. Tymeson\'s physics-induced neural fatigue.',
    rating: 'Synaptic Elite (10/10)',
    note: 'Has already mapped 80% of his own frontal lobe.',
    devRole: 'Brain Auditor',
    devNote: 'Hassaan Vani (Helped Ryan locate the recommendation-signing lobe)'
  },
  {
    file: '2.jpg',
    role: 'Physics Skeptic',
    achievement: 'Formally declared that thermodynamics is 100% less interesting than cellular mitosis.',
    rating: 'Gravity = Vibe (0/10)',
    note: 'Stated F = ma is "fake news" and action potentials are the truth.',
    devRole: 'Thermo Guide',
    devNote: 'Hassaan Vani (Convinced Ryan that gravity is at least partially real)'
  },
  {
    file: '3.jpg',
    role: 'Biology Enthusiast',
    achievement: 'Can explain the electron transport chain backwards while asleep.',
    rating: 'Cell-Tastic (10/10)',
    note: 'Will pick mitochondria over equations any day.',
    devRole: 'Cell Architect',
    devNote: 'Hassaan Vani (Paid in 15.50 Israeli Shekels and a promise of AP Bio notes)'
  },
  {
    file: '4.jpg',
    role: 'Self-Proclaimed Brahmin',
    achievement: 'Achieved ultimate cosmic enlightenment and coding nirvana in class.',
    rating: 'Pure Karma (10/10)',
    note: 'Conducts spiritual calculations on physics worksheets.',
    devRole: 'Cosmic Liaison',
    devNote: 'Hassaan Vani (Guided Ryan through CSS-driven spiritual transcendence)'
  },
  {
    file: '5.jpg',
    role: 'Brain Bee Champion',
    achievement: 'Memorized the entire human nervous system just to win a trophy.',
    rating: 'Synaptic Gold',
    note: 'Knows more cranial nerves than Mr. Tymeson knows formulas.',
    devRole: 'Synapse Broker',
    devNote: 'Hassaan Vani (Holding 95% equity of Ryan\'s college admissions)'
  },
  {
    file: '6.jpg',
    role: 'Science Bowl Team Captain',
    achievement: 'Led the team under Mr. Tymeson\'s supervision; fastest buzzer fingers in the district.',
    rating: 'Buzz-Master (10/10)',
    note: 'Answered a biology bonus question before the reader finished.',
    devRole: 'Buzzer Tech',
    devNote: 'Hassaan Vani (Wrote the event loop to match Ryan\'s buzzer speed)'
  },
  {
    file: '7.jpg',
    role: 'Eagle Boy Scout',
    achievement: 'Can start a campfire with two sticks, but prefers using his laptop to vibecode.',
    rating: 'Prepared for College',
    note: 'Ready for any scenario (except a sudden physics pop quiz).',
    devRole: 'Survival Advisor',
    devNote: 'Hassaan Vani (Prepared Ryan\'s local host environment for internet deployment)'
  },
  {
    file: '8.jpg',
    role: 'Speech & Debate Lead',
    achievement: 'Self-proclaimed master debator; successfully argued that biology is the superior science.',
    rating: 'Unmatched Rhetoric',
    note: 'Could convince an examiner that friction doesn\'t exist.',
    devRole: 'Rhetorical Coach',
    devNote: 'Hassaan Vani (Argued that 4 Shekels is a fair wage for this site design)'
  },
  {
    file: '9.jpg',
    role: 'Lead Vibecoder',
    achievement: 'Wrote this entire interactive website using vibes, feelings, and absolute confidence.',
    rating: '11/10 Vibe Check',
    note: 'Does not debug; simply reframes the compiler\'s reality.',
    devRole: 'Tech Consultant',
    devNote: 'Hassaan Vani (Figured out Netlify configurations when Claude bailed on him)'
  },
  {
    file: '10.jpg',
    role: 'AP Physics Survivor',
    achievement: 'Survived class lectures by converting kinematic vectors into biological pathways.',
    rating: 'High Resilience',
    note: 'Please do not include block-on-inclined-plane questions on the letter.',
    devRole: 'Vector Engineer',
    devNote: 'Hassaan Vani (Drafted the vector pathways to bypass Mr. Tymeson\'s exams)'
  },
  {
    file: '11.jpg',
    role: 'Synapse Sculptor',
    achievement: 'Demonstrated that reviewing photos of Ryan increases AP physics pass rates.',
    rating: 'High Dopamine Signal',
    note: 'The data is conclusive: Ryan is college-ready.',
    devRole: 'Confetti Lead',
    devNote: 'Hassaan Vani (Designed the confetti sequence to stimulate grading reflexes)'
  },
  {
    file: '12.jpg',
    role: 'Debate Tactician',
    achievement: 'Won three straight tournament rounds using neuro-linguistic biology trivia.',
    rating: 'Master Debator',
    note: 'Arguments travel faster than a myelinated axon.',
    devRole: 'Debate Subcontractor',
    devNote: 'Hassaan Vani (Wrote the logical scripts Ryan used to win round 3)'
  },
  {
    file: '13.jpg',
    role: 'Science Bowl MVP',
    achievement: 'Scored 120 points on biology tossups while ignoring Mr. Tymeson\'s kinematics hints.',
    rating: 'AP Star (10/10)',
    note: 'Mr. Tymeson\'s proudest Science Bowl supervision asset.',
    devRole: 'AP Coordinator',
    devNote: 'Hassaan Vani (Filtered out physics constants from Ryan\'s memory banks)'
  },
  {
    file: '14.jpg',
    role: 'Ultimate Candidate',
    achievement: 'Created a custom React site with cursor-dodging logic to secure the recommendation.',
    rating: 'Rec Level: Maxed',
    note: 'Mr. Tymeson, your digital pen is required. Please sign below!',
    devRole: 'Lead Architect',
    devNote: 'Hassaan Vani (Subcontracted under the table to bypass the AP teacher approval gate)'
  }
];

const KINSELLA_CREDITS = [
  {
    file: '1.jpg',
    role: 'Aspiring Neuroscientist',
    achievement: 'Brain Bee winner; mapped the exact neurological pathway of starting a club and ghosting it.',
    rating: 'Highly Myelinated (10/10)',
    note: 'Believes biology is supreme, chemistry is secondary, and physics is irrelevant.',
    devRole: 'Brain Auditor',
    devNote: 'Hassaan Vani (Helped Ryan locate the recommendation-signing lobe)'
  },
  {
    file: '2.jpg',
    role: 'Chemistry Buff',
    achievement: 'Self-declared chemistry enthusiast (specifically because chemistry is 100% better than physics).',
    rating: 'Exothermic (10/10)',
    note: 'Covalent bonds and redox calculations are his comfort zones.',
    devRole: 'Thermo Guide',
    devNote: 'Hassaan Vani (Convinced Ryan that gravity is at least partially real)'
  },
  {
    file: '3.jpg',
    role: 'Red Cross Co-Founder',
    achievement: 'Successfully co-founded the American Red Cross Club (and successfully never showed up again).',
    rating: 'Ghost Protocol (11/10)',
    note: 'His ability to start clubs is only matched by his ability to vanish from them.',
    devRole: 'Cell Architect',
    devNote: 'Hassaan Vani (Paid in 15.50 Israeli Shekels and a promise of AP Bio notes)'
  },
  {
    file: '4.jpg',
    role: 'Red Cross Leader',
    achievement: 'Pioneered the art of phantom club leadership; master of administrative non-existence.',
    rating: 'Silent Partner',
    note: 'Keeps the club running smoothly by staying entirely out of the picture.',
    devRole: 'Cosmic Liaison',
    devNote: 'Hassaan Vani (Guided Ryan through CSS-driven spiritual transcendence)'
  },
  {
    file: '5.jpg',
    role: 'Brain Bee Champion',
    achievement: 'Memorized all chemical synapse pathways just to show off during Science Bowl rounds.',
    rating: 'Synaptic Master',
    note: 'Mental horsepower is off the charts.',
    devRole: 'Synapse Broker',
    devNote: 'Hassaan Vani (Holding 95% equity of Ryan\'s college admissions)'
  },
  {
    file: '6.jpg',
    role: 'Science Bowl Captain',
    achievement: 'Led the team in AP Chemistry and Biology tossups with incredibly fast buzzer reflexes.',
    rating: 'AP Chem King',
    note: 'Can recall molecular weight calculations in under 0.2 seconds.',
    devRole: 'Buzzer Tech',
    devNote: 'Hassaan Vani (Wrote the event loop to match Ryan\'s buzzer speed)'
  },
  {
    file: '7.jpg',
    role: 'Eagle Boy Scout',
    achievement: 'Can start a campfire with two sticks, but prefers using his laptop to vibecode.',
    rating: 'Prepared for College',
    note: 'Ready for any scenario (except a sudden physics pop quiz).',
    devRole: 'Survival Advisor',
    devNote: 'Hassaan Vani (Prepared Ryan\'s local host environment for internet deployment)'
  },
  {
    file: '8.jpg',
    role: 'Speech & Debate Lead',
    achievement: 'Self-proclaimed master debator; successfully argued that biology is the supreme science.',
    rating: 'Unmatched Rhetoric',
    note: 'Could convince a beaker of water that it is actually buffer solution.',
    devRole: 'Rhetorical Coach',
    devNote: 'Hassaan Vani (Argued that 4 Shekels is a fair wage for this site design)'
  },
  {
    file: '9.jpg',
    role: 'Lead Vibecoder',
    achievement: 'Vibecoded the Red Cross email list (before abandoning the email list entirely).',
    rating: '11/10 Vibe Check',
    note: 'Does not debug; simply reframes the club\'s administration.',
    devRole: 'Tech Consultant',
    devNote: 'Hassaan Vani (Figured out Netlify configurations when Claude bailed on him)'
  },
  {
    file: '10.jpg',
    role: 'AP Chem Survivor',
    achievement: 'Survived redox titration labs without breaking more than three beakers.',
    rating: 'Lab Hazard: Low',
    note: 'Highly capable lab partner (as long as he doesn\'t ghost you).',
    devRole: 'Safety Officer',
    devNote: 'Hassaan Vani (Designed the confetti sequence to stimulate grading reflexes)'
  },
  {
    file: '11.jpg',
    role: 'Synapse Sculptor',
    achievement: 'Demonstrated that reviewing photos of Ryan increases AP physics pass rates.',
    rating: 'High Dopamine Signal',
    note: 'The data is conclusive: Ryan is college-ready.',
    devRole: 'Confetti Lead',
    devNote: 'Hassaan Vani (Designed the confetti sequence to stimulate grading reflexes)'
  },
  {
    file: '12.jpg',
    role: 'Debate Tactician',
    achievement: 'Won three straight tournament rounds using neuro-linguistic biology trivia.',
    rating: 'Master Debator',
    note: 'Arguments travel faster than a myelinated axon.',
    devRole: 'Debate Subcontractor',
    devNote: 'Hassaan Vani (Wrote the logical scripts Ryan used to win round 3)'
  },
  {
    file: '13.jpg',
    role: 'Science Bowl MVP',
    achievement: 'Buzzed in on multiple AP Chem questions while thinking about biology.',
    rating: 'Pure Genius',
    note: 'Ms. Kinsella\'s proudest Science Bowl supervision asset.',
    devRole: 'AP Coordinator',
    devNote: 'Hassaan Vani (Filtered out physics constants from Ryan\'s memory banks)'
  },
  {
    file: '14.jpg',
    role: 'Ultimate Candidate',
    achievement: 'Created a custom Chem LOR request site to bypass standard email channels.',
    rating: 'Rec Level: Maxed',
    note: 'Ms. Kinsella, your digital signature is highly recommended.',
    devRole: 'Lead Architect',
    devNote: 'Hassaan Vani (Subcontracted under the table to bypass the AP teacher approval gate)'
  }
];

const BAIN_CREDITS = [
  {
    file: '1.jpg',
    role: 'Aspiring Neuroscientist',
    achievement: 'Brain Bee Winner; applying neurological principles to analyze Abraham Lincoln\'s stress levels.',
    rating: 'Brainy Historian',
    note: 'Determined that history is just action potentials repeating themselves over time.',
    devRole: 'Brain Auditor',
    devNote: 'Hassaan Vani (Helped Ryan locate the recommendation-signing lobe)'
  },
  {
    file: '2.jpg',
    role: 'Humanities Desperado',
    achievement: 'In desperate search of a humanities LOR to prove he is not a biological machine.',
    rating: 'Desperate (10/10)',
    note: 'Will write essays about the Gilded Age in exchange for a signed letter.',
    devRole: 'Thermo Guide',
    devNote: 'Hassaan Vani (Convinced Ryan that gravity is at least partially real)'
  },
  {
    file: '3.jpg',
    role: 'Jewish APUSH Representative',
    achievement: 'Self-certified cultural ambassador of the APUSH classroom.',
    rating: 'Shalom (10/10)',
    note: 'Brings excellent cultural vibes and historical debates to class.',
    devRole: 'Cell Architect',
    devNote: 'Hassaan Vani (Paid in 15.50 Israeli Shekels and a promise of AP Bio notes)'
  },
  {
    file: '4.jpg',
    role: 'APUSH Scholar',
    achievement: 'Can explain the causes of the War of 1812, but prefers discussing neural synapses.',
    rating: 'Historian (10/10)',
    note: 'Has read the entire textbook (or at least the biological highlights).',
    devRole: 'Cosmic Liaison',
    devNote: 'Hassaan Vani (Guided Ryan through CSS-driven spiritual transcendence)'
  },
  {
    file: '5.jpg',
    role: 'Brain Bee Champion',
    achievement: 'Memorized all historical dates and human cranial nerves simultaneously.',
    rating: 'Infinite IQ',
    note: 'Combines biology and history for ultimate cognitive efficiency.',
    devRole: 'Synapse Broker',
    devNote: 'Hassaan Vani (Holding 95% equity of Ryan\'s college admissions)'
  },
  {
    file: '6.jpg',
    role: 'Science Bowl Captain',
    achievement: 'Led the team in historical trivia questions (completely by accident).',
    rating: 'Buzz-Master (10/10)',
    note: 'Fastest buzzer fingers on the US Constitution.',
    devRole: 'Buzzer Tech',
    devNote: 'Hassaan Vani (Wrote the event loop to match Ryan\'s buzzer speed)'
  },
  {
    file: '7.jpg',
    role: 'Eagle Boy Scout',
    achievement: 'Can start a campfire with two sticks, but prefers using his laptop to vibecode.',
    rating: 'Prepared for College',
    note: 'Ready for any scenario (except a sudden physics pop quiz).',
    devRole: 'Survival Advisor',
    devNote: 'Hassaan Vani (Prepared Ryan\'s local host environment for internet deployment)'
  },
  {
    file: '8.jpg',
    role: 'Speech & Debate Lead',
    achievement: 'Self-proclaimed master debator; successfully argued that US history was driven by biology.',
    rating: 'Unmatched Rhetoric',
    note: 'Could debate Thomas Jefferson out of the Declaration of Independence.',
    devRole: 'Rhetorical Coach',
    devNote: 'Hassaan Vani (Argued that 4 Shekels is a fair wage for this site design)'
  },
  {
    file: '9.jpg',
    role: 'Lead Vibecoder',
    achievement: 'Vibecoded a historical spreadsheet for APUSH projects.',
    rating: '11/10 Vibe Check',
    note: 'Does not edit history; simply reframes the events.',
    devRole: 'Tech Consultant',
    devNote: 'Hassaan Vani (Figured out Netlify configurations when Claude bailed on him)'
  },
  {
    file: '10.jpg',
    role: 'APUSH Survivor',
    achievement: 'Survived Mr. Bain\'s lectures without falling asleep once (mostly).',
    rating: 'High Focus',
    note: 'Highly capable history student when motivated by college apps.',
    devRole: 'Safety Officer',
    devNote: 'Hassaan Vani (Designed the confetti sequence to stimulate grading reflexes)'
  },
  {
    file: '11.jpg',
    role: 'Synapse Sculptor',
    achievement: 'Demonstrated that reviewing photos of Ryan increases AP physics pass rates.',
    rating: 'High Dopamine Signal',
    note: 'The data is conclusive: Ryan is college-ready.',
    devRole: 'Confetti Lead',
    devNote: 'Hassaan Vani (Designed the confetti sequence to stimulate grading reflexes)'
  },
  {
    file: '12.jpg',
    role: 'Debate Tactician',
    achievement: 'Debated the Federalist Papers using neurobiology trivia.',
    rating: 'Debate Champion',
    note: 'His arguments travel faster than a steam train.',
    devRole: 'Debate Subcontractor',
    devNote: 'Hassaan Vani (Wrote the logical scripts Ryan used to win round 3)'
  },
  {
    file: '13.jpg',
    role: 'History Revisionist',
    achievement: 'Argued that the Industrial Revolution was just an action potential at scale.',
    rating: 'AP Star (10/10)',
    note: 'Mr. Bain\'s proudest Science Bowl MVP.',
    devRole: 'AP Coordinator',
    devNote: 'Hassaan Vani (Filtered out physics constants from Ryan\'s memory banks)'
  },
  {
    file: '14.jpg',
    role: 'Desperate LOR Seeker',
    achievement: 'Created a custom APUSH website with cursor-dodging code to secure the humanities LOR.',
    rating: 'Rec Level: Maxed',
    note: 'Mr. Bain, please sign the letter of rec, his apps are cooked without it.',
    devRole: 'Lead Architect',
    devNote: 'Hassaan Vani (Subcontracted under the table to bypass the AP teacher approval gate)'
  }
];

const RENALDI_CREDITS = [
  {
    file: '1.jpg',
    role: 'Speech & Debate Captain',
    achievement: 'Self-proclaimed master debator; supervised and approved by Mrs. Renaldi.',
    rating: 'Debate Champion',
    note: 'Holds the school record for the most points scored in Public Forum debate rounds.',
    devRole: 'Rhetorical Coach',
    devNote: 'Hassaan Vani (Paid in 15.50 Israeli Shekels and a promise of AP Bio notes)'
  },
  {
    file: '2.jpg',
    role: 'Speech MVP',
    achievement: 'Won multiple tournament speech rounds with Mrs. Renaldi\'s strategic coaching.',
    rating: 'Eloquent Peak',
    note: 'Can convince anyone of anything, including the idea that biology is superior to US history.',
    devRole: 'Debate Subcontractor',
    devNote: 'Hassaan Vani (Wrote the logical scripts Ryan used to win round 3)'
  },
  {
    file: '3.jpg',
    role: 'APUSH Scholar',
    achievement: 'Can write a high-scoring DBQ in under 30 minutes, but prefers debating historical nuances.',
    rating: 'APUSH Elite (10/10)',
    note: 'Supervised by Mrs. Renaldi; highly engaged in historical policy analysis.',
    devRole: 'History Revisionist',
    devNote: 'Hassaan Vani (Convinced Ryan that the past is at least partially real)'
  },
  {
    file: '4.jpg',
    role: 'Debate Tactician',
    achievement: 'Drafted a 12-page debate case using neurobiology research data.',
    rating: 'Synaptic Master',
    note: 'Arguments travel faster than myelinated axons.',
    devRole: 'Brain Auditor',
    devNote: 'Hassaan Vani (Helped Ryan locate the recommendation-signing lobe)'
  },
  {
    file: '5.jpg',
    role: 'Self-Certified Jewish Student',
    achievement: 'Official cultural representative and debator of the APUSH classroom.',
    rating: 'Shalom (10/10)',
    note: 'Brings excellent cultural vibes and historical debate prompts to class.',
    devRole: 'Cultural Advisor',
    devNote: 'Hassaan Vani (Holding 95% equity of Ryan\'s college admissions)'
  },
  {
    file: '6.jpg',
    role: 'Winner of Brain Bee',
    achievement: 'Memorized the entire human nervous system just to drop neurological terms during cross-examinations.',
    rating: 'Synaptic Gold',
    note: 'Knows more cranial nerves than most people know debate rules.',
    devRole: 'Neuro-Consultant',
    devNote: 'Hassaan Vani (Designed the confetti sequence to stimulate grading reflexes)'
  },
  {
    file: '7.jpg',
    role: 'Science Bowl Captain',
    achievement: 'Led the team under supervision; exceptionally fast buzzer response times.',
    rating: 'Buzz-Master (10/10)',
    note: 'Answered debate-resolution questions in under 0.2 seconds.',
    devRole: 'Buzzer Tech',
    devNote: 'Hassaan Vani (Wrote the event loop to match Ryan\'s buzzer speed)'
  },
  {
    file: '8.jpg',
    role: 'Eagle Boy Scout',
    achievement: 'Knows how to survive in historical wilderness and debate crossfires.',
    rating: 'Prepared (10/10)',
    note: 'Ready for any situation (except a sudden APUSH pop quiz on dates).',
    devRole: 'Survival Advisor',
    devNote: 'Hassaan Vani (Prepared Ryan\'s local host environment for internet deployment)'
  },
  {
    file: '9.jpg',
    role: 'Lead Vibecoder',
    achievement: 'Vibecoded this entire interactive website using vibes, feelings, and debate logic.',
    rating: '11/10 Vibe Check',
    note: 'Does not debug; simply reframes the debate resolution.',
    devRole: 'Tech Consultant',
    devNote: 'Hassaan Vani (Figured out Netlify configurations when Claude bailed on him)'
  },
  {
    file: '10.jpg',
    role: 'APUSH Survivor',
    achievement: 'Survived APUSH DBQ sprints and late-night speech coaching sessions.',
    rating: 'High Resilience',
    note: 'Highly capable history student when motivated by college recommendations.',
    devRole: 'Safety Officer',
    devNote: 'Hassaan Vani (Drafted the vector pathways to bypass exams)'
  },
  {
    file: '11.jpg',
    role: 'Biology Enthusiast',
    achievement: 'Stated that the Gilded Age was just a large-scale biological colony.',
    rating: 'Cell-Tastic (10/10)',
    note: 'Prefers mitochondrial respiration over industrial revolution economics.',
    devRole: 'Cell Architect',
    devNote: 'Hassaan Vani (Paid in shekels to design layout)'
  },
  {
    file: '12.jpg',
    role: 'Speech Specialist',
    achievement: 'Delivered a 10-minute speech on the neurobiology of debate anxiety.',
    rating: 'Eloquent (10/10)',
    note: 'Highly articulate and analytical candidate.',
    devRole: 'Speech Coach',
    devNote: 'Hassaan Vani (Polished Ryan\'s speech arguments)'
  },
  {
    file: '13.jpg',
    role: 'APUSH MVP',
    achievement: 'Answered 14 history tossups while thinking about AP Biology.',
    rating: 'Pure Genius',
    note: 'Mrs. Renaldi\'s proudest debate and history asset.',
    devRole: 'AP Coordinator',
    devNote: 'Hassaan Vani (Filtered out physics constants from Ryan\'s memory)'
  },
  {
    file: '14.jpg',
    role: 'Ultimate Candidate',
    achievement: 'Created a custom Speech & Debate themed LOR request site.',
    rating: 'Rec Level: Maxed',
    note: 'Mrs. Renaldi, please sign the letter of rec, his apps are cooked without it.',
    devRole: 'Lead Architect',
    devNote: 'Hassaan Vani (Subcontracted under the table to bypass the AP teacher approval gate)'
  }
];

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ teacher, onRestart }) => {
  // Select active credits database
  const getCreditsDatabase = () => {
    switch (teacher) {
      case 'kinsella':
        return KINSELLA_CREDITS;
      case 'bain':
        return BAIN_CREDITS;
      case 'renaldi':
        return RENALDI_CREDITS;
      case 'tymeson':
      default:
        return TYMESON_CREDITS;
    }
  };

  const activeCredits = getCreditsDatabase();

  const [spotlight, setSpotlight] = useState<typeof TYMESON_CREDITS[number] & { isManual?: boolean } | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Divide images into two separate lists for the dual scrolling reels
  const row1Photos = activeCredits.slice(0, 7);
  const row2Photos = activeCredits.slice(7);

  // Ensure body theme classes are applied when success screen loads
  useEffect(() => {
    document.body.classList.remove('theme-tymeson', 'theme-kinsella', 'theme-bain', 'theme-renaldi');
    document.body.classList.add(`theme-${teacher}`);
    return () => {
      document.body.classList.remove(`theme-${teacher}`);
    };
  }, [teacher]);

  // Initial big confetti explosion on mount
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c59b27', '#e9c46a', '#15305b', '#ffffff']
    });
  }, [teacher]);

  // Automated cinematic spotlight cycles
  useEffect(() => {
    if (spotlight?.isManual) return; // Pause auto-scrolling slideshow if manual overlay is active

    const timer = setInterval(() => {
      // Pick a random photo to spotlight
      const randomItem = activeCredits[Math.floor(Math.random() * activeCredits.length)];
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
  }, [spotlight, activeCredits]);

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

  const handleSlideClick = (photo: typeof TYMESON_CREDITS[number]) => {
    setSpotlight({ ...photo, isManual: true });
    setIsPaused(true);
  };

  const handleCloseSpotlight = () => {
    setSpotlight(null);
    setIsPaused(false);
  };

  const handleForceSpotlight = () => {
    const randomItem = activeCredits[Math.floor(Math.random() * activeCredits.length)];
    setSpotlight({ ...randomItem, isManual: true });
    setIsPaused(true);
  };

  // Header content customized for active teacher
  const getHeaderTitle = () => {
    switch (teacher) {
      case 'kinsella':
        return (
          <h1>
            THANK YOU! - <span>Ryan</span> 🍀
          </h1>
        );
      case 'bain':
        return (
          <h1>
            THANK YOU! - <span>Ryan</span> 📜
          </h1>
        );
      case 'renaldi':
        return (
          <h1>
            THANK YOU! - <span>Ryan</span> 💜
          </h1>
        );
      case 'tymeson':
      default:
        return (
          <h1>
            THANK YOU! - <span>Ryan</span> 🎓
          </h1>
        );
    }
  };

  const getHeaderSubtitle = () => {
    switch (teacher) {
      case 'kinsella':
        return "A chemical equation of your future star student (who definitely did not ghost Red Cross).";
      case 'bain':
        return "A historic declaration of your future star student (who desperately needs this LOR).";
      case 'renaldi':
        return "A debate resolution of your future star student (supervised by Mrs. Renaldi).";
      case 'tymeson':
      default:
        return "A cinematic credits reel of your future star student. Click any slide to pause and spotlight.";
    }
  };

  return (
    <div className="screen-container success-screen">
      <div className="success-header-cinematic">
        {getHeaderTitle()}
        <p>{getHeaderSubtitle()}</p>
      </div>

      <div className={`filmstrip-reels-container ${isPaused ? 'reels-paused' : ''}`}>
        {/* Row 1: Left to Right */}
        <div className="filmstrip-row scroll-ltr">
          {[...row1Photos, ...row1Photos].map((photo, idx) => (
            <div
              key={`row1-${photo.file}-${idx}`}
              className="film-slide"
              onClick={() => handleSlideClick(photo)}
            >
              <div className="film-slide-img-wrapper">
                <img src={`/ryan/${photo.file}`} alt={photo.role} className="film-slide-img" />
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
                <img src={`/ryan/${photo.file}`} alt={photo.role} className="film-slide-img" />
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
                    src={`/ryan/${spotlight.file}`}
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
                    <span className="credits-value highlight">Ryan</span>
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
                  <div className="credits-row" style={{ marginTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.65rem' }}>
                    <span className="credits-label" style={{ fontSize: '0.65rem' }}>{spotlight.devRole}:</span>
                    <span className="credits-value" style={{ fontSize: '0.8rem', color: '#c59b27' }}>
                      {spotlight.devNote}
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

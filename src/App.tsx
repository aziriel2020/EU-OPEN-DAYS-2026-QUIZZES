import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink, Atom, Users, Compass, Settings, Lock, Unlock, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const QUIZZES = [
  {
    id: 1,
    village_en: 'PROSPERITY',
    village_fr: 'PROSPÉRITÉ',
    badge_en: 'Science Challenge',
    badge_fr: 'Défi Scientifique',
    icon: Atom,
    image_en: '/quiz_1.png',
    image_fr: '/quiz_2.png',
    en: {
      title: 'The EU stands for Science — Do You?',
      subtitle: 'Science, Innovation and Prosperity',
      link: 'https://kahoot.it/challenge/06855606?challenge-id=2a71d7ed-52c5-47d9-a84e-ddf6d0040bd7_1778006069798',
    },
    fr: {
      title: 'L\'EU mise sur la Science — et vous?',
      subtitle: 'Science, Innovation et Prospérité',
      link: 'https://kahoot.it/challenge/03693368?challenge-id=2a71d7ed-52c5-47d9-a84e-ddf6d0040bd7_1778006046631',
    },
  },
  {
    id: 2,
    village_en: 'SOCIAL FAIRNESS',
    village_fr: 'ÉQUITÉ SOCIALE',
    badge_en: 'Europe Challenge',
    badge_fr: 'Défi Europe',
    icon: Users,
    image_en: '/quiz_3.png',
    image_fr: '/quiz_4.png',
    en: {
      title: 'Choose Europe!',
      subtitle: 'Social Fairness and Inclusion',
      link: 'https://kahoot.it/challenge/08751377?challenge-id=2a71d7ed-52c5-47d9-a84e-ddf6d0040bd7_1777931311081',
    },
    fr: {
      title: 'Choisissez l\'Europe !',
      subtitle: 'Équité Sociale et Inclusion',
      link: 'https://kahoot.it/challenge/06621854?challenge-id=2a71d7ed-52c5-47d9-a84e-ddf6d0040bd7_1777932155310',
    },
  },
  {
    id: 3,
    village_en: 'SOCIAL FAIRNESS — ERC',
    village_fr: 'ÉQUITÉ SOCIALE — ERC',
    badge_en: 'ERC Discovery',
    badge_fr: 'Découverte ERC',
    icon: Compass,
    image_en: '/quiz_5.png',
    image_fr: '/quiz_6.png',
    en: {
      title: 'Ready to Explore the Frontiers of Science?',
      subtitle: 'Frontiers of Science',
      link: 'https://kahoot.it/challenge/09519407?challenge-id=2a71d7ed-52c5-47d9-a84e-ddf6d0040bd7_1778006021611',
    },
    fr: {
      title: 'Prêt(e) à Explorer les Frontières de la Science ?',
      subtitle: 'Frontières de la Science',
      link: 'https://kahoot.it/challenge/0516471?challenge-id=2a71d7ed-52c5-47d9-a84e-ddf6d0040bd7_1778005878250',
    },
  },
];

// Custom diamond star SVG component
function DiamondStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" />
    </svg>
  );
}

function FloatingStars() {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random stars on mount
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4, // 4px to 12px
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4, // 4s to 8s
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-eu-yellow/60"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <DiamondStar className="w-full h-full drop-shadow-[0_0_8px_rgba(255,238,0,0.5)]" />
        </motion.div>
      ))}
    </div>
  );
}

function SettingsModal({ isOpen, onClose, currentPage, setPage }: { isOpen: boolean, onClose: () => void, currentPage: number, setPage: (p: number) => void }) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setUnlocked(false);
      setPassword('');
    }
  }, [isOpen]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'eudays2026') {
      setUnlocked(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#002266] border border-white/20 rounded-3xl p-8 w-full max-w-sm relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-display font-bold text-white mb-6">Device Settings</h2>
        
        {!unlocked ? (
          <form onSubmit={handleUnlock} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Enter password to unlock</span>
            </div>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password (admin)"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-eu-yellow focus:bg-white/20 transition-colors"
            />
            <button type="submit" className="w-full py-3 mt-2 bg-eu-yellow text-[#002266] font-bold rounded-xl hover:bg-white transition-colors shadow-lg">
              Unlock Terminal
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-eu-yellow mb-2 bg-eu-yellow/10 px-4 py-2 rounded-lg border border-eu-yellow/20">
              <Unlock className="w-4 h-4" />
              <span className="text-sm font-bold">Terminal Unlocked</span>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-white/80 text-sm mb-1">Select Default Village Screen:</label>
              {[
                { id: 0, label: 'Prosperity Village' },
                { id: 1, label: 'Social Fairness' },
                { id: 2, label: 'ERC Discovery' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setPage(opt.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between py-3 px-5 rounded-xl font-display font-bold text-sm text-left transition-all ${
                    currentPage === opt.id 
                      ? 'bg-eu-yellow text-[#002266] shadow-md scale-[1.02]' 
                      : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/15'
                  }`}
                >
                  <span>{opt.label}</span>
                  {currentPage === opt.id && <div className="w-2 h-2 rounded-full bg-[#002266]" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<number>(() => {
    // 1. Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page');
    if (p !== null) {
      const parsed = parseInt(p, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 2) return parsed;
    }
    // 2. Fallback to localStorage
    const saved = localStorage.getItem('selectedVillage');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 2) return parsed;
    }
    return 0; // Default
  });

  const [showSettings, setShowSettings] = useState(false);
  const [activeGameUrl, setActiveGameUrl] = useState<string | null>(null);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('selectedVillage', page.toString());
    // Update URL without reloading page
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', page.toString());
    window.history.replaceState({}, '', newUrl.toString());
  }, [page]);

  const currentQuiz = QUIZZES[page];
  const Icon = currentQuiz.icon;

  const cards = [
    { lang: 'EN' as const, data: currentQuiz.en, villageName: currentQuiz.village_en, badgeText: currentQuiz.badge_en, image: currentQuiz.image_en },
    { lang: 'FR' as const, data: currentQuiz.fr, villageName: currentQuiz.village_fr, badgeText: currentQuiz.badge_fr, image: currentQuiz.image_fr },
  ];

  return (
    <div className="min-h-screen bg-[#003399] font-sans overflow-x-hidden relative flex flex-col">
      {/* Main Poster Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: "url('/europe-day-bg.png')" }}
      />
      {/* Subtle bottom gradient to ensure card text readability without muddying the top part */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#001746] via-[#003399]/40 to-transparent opacity-90" />
      
      <FloatingStars />

      {/* Main Content & Text Overlays */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen p-6 sm:p-8 md:p-12">
        
        {/* Top Text (EUROPE DAY) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full pointer-events-none mb-8"
        >
          <div className="max-w-md">
            <h1 className="text-white font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight drop-shadow-2xl">
              EUROPE <br />
              <span className="text-eu-yellow">DAY 2026</span>
            </h1>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <main className="flex-1 flex flex-col justify-center w-full max-w-[1000px] xl:max-w-[1200px] mx-auto py-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch w-full mx-auto shadow-2xl rounded-3xl z-20 relative pointer-events-auto"
            >
            {cards.map((card, i) => (
              <motion.article
                key={card.lang}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col relative group hover-glow shadow-2xl"
              >
                {/* Top Image Section */}
                <div className="h-[250px] sm:h-[300px] lg:h-[360px] relative shrink-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-105 opacity-90"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B80]/95 via-[#002B80]/40 to-transparent opacity-90 mix-blend-multiply" />
                  
                  {/* Image Overlays */}
                  <div className="absolute top-8 left-6 sm:top-10 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/10 group-hover:bg-eu-yellow/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow" />
                  </div>
                  <div className="absolute top-8 right-6 sm:top-10 sm:right-8 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-1.5 flex items-center shadow-lg">
                    <span className="text-[#002266] font-display font-bold text-[10px] sm:text-xs tracking-wide">{card.badgeText}</span>
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-[#002B80]/95 to-[#001A4C]/95 backdrop-blur-md">
                  <h3 className="text-eu-yellow font-display font-black text-[11px] sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
                    {card.villageName}
                  </h3>
                  <h2 className="font-display font-extrabold text-[22px] sm:text-[28px] leading-tight text-white mb-2 drop-shadow-md">
                    {card.data.title}
                  </h2>
                  <p className="text-white/80 font-sans text-sm font-medium mb-6 sm:mb-auto">
                    {card.data.subtitle}
                  </p>

                  <div className="mt-8 sm:mt-auto pt-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                    {/* Primary Action */}
                    <button
                      onClick={() => setActiveGameUrl(card.data.link)}
                      className="flex-1 py-4 sm:py-5 px-4 bg-eu-yellow rounded-xl flex items-center justify-center gap-3 group/btn hover:bg-white transition-colors duration-300 shadow-[0_4px_20px_rgba(240,187,0,0.3)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.4)]"
                    >
                      <span className="text-[#002266] font-display font-black text-[15px] sm:text-[17px] tracking-wide text-center">
                        {card.lang === 'EN' ? 'Start the English Quiz' : 'Démarrer le quiz en français'}
                      </span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#002266] group-hover/btn:translate-x-1 transition-transform shrink-0" />
                    </button>
                    {/* QR Code component */}
                    <div className="hidden sm:flex items-center justify-center shrink-0 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] bg-white p-1.5 rounded-xl border-4 border-eu-yellow border-opacity-40 shadow-lg mx-auto lg:mx-0">
                      <QRCode value={card.data.link} size={100} style={{ width: '100%', height: '100%' }} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Text (9 MAY) */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-22 md:left-12 pointer-events-none z-30"
      >
        <div className="border-l-4 border-eu-yellow pl-4 sm:pl-6">
          <h2 className="text-white font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-xl uppercase whitespace-nowrap">
            9 MAY <br />
            <span className="text-white/80 text-lg sm:text-xl md:text-2xl font-semibold">10:00-18:00</span>
          </h2>
        </div>
      </motion.div>

      </div>

      {/* Settings Toggle Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#001A4C]/60 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-40 shadow-xl"
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        currentPage={page}
        setPage={setPage}
      />

      {/* Fullscreen Game Overlay */}
      <AnimatePresence>
        {activeGameUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Top Bar for Navigation */}
            <div className="absolute top-0 left-0 w-full p-4 pointer-events-none z-[110] flex items-start">
              <motion.button
                onClick={() => setActiveGameUrl(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="pointer-events-auto bg-[#002266] text-white hover:text-eu-yellow transition-colors w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/20 ml-2 mt-2 group"
              >
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <iframe 
              src={activeGameUrl}
              className="w-full h-full border-0 absolute inset-0 z-[105]"
              allow="autoplay; fullscreen"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
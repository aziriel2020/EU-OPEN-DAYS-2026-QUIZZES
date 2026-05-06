import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink, Atom, Users, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';

const QUIZZES = [
  {
    id: 1,
    village_en: 'PROSPERITY VILLAGE',
    village_fr: 'VILLAGE PROSPÉRITÉ',
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
    village_en: 'SOCIAL FAIRNESS VILLAGE',
    village_fr: 'VILLAGE ÉQUITÉ SOCIALE',
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

export default function App() {
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');

  return (
    <div className="min-h-screen bg-[#003399] font-sans overflow-x-hidden relative flex flex-col">
      {/* Main Poster Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/europe-day-bg.png')" }}
      />
      {/* Subtle bottom gradient to ensure card text readability without muddying the top part */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#001746] via-[#003399]/40 to-transparent opacity-90" />
      
      <FloatingStars />

      {/* Header with Language Toggle */}
      <header className="relative z-10 w-full p-4 sm:p-8 flex justify-end items-center">
        <div className="bg-[#002266]/60 backdrop-blur-md rounded-full border border-white/20 p-1.5 flex gap-1 shadow-xl">
          <button
            onClick={() => setLang('EN')}
            className={`px-6 py-2 rounded-full font-display font-bold text-sm transition-all duration-300 ${
              lang === 'EN' ? 'bg-eu-yellow text-[#002266] shadow-md' : 'text-white/80 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('FR')}
            className={`px-6 py-2 rounded-full font-display font-bold text-sm transition-all duration-300 ${
              lang === 'FR' ? 'bg-eu-yellow text-[#002266] shadow-md' : 'text-white/80 hover:text-white'
            }`}
          >
            Français
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 flex-1 flex flex-col justify-end pb-8 sm:pb-16 pt-[25vh] lg:pt-32 px-4 md:px-8 max-w-[1600px] w-full mx-auto mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {QUIZZES.map((quiz, i) => {
            const data = quiz[lang.toLowerCase() as 'en' | 'fr'];
            const villageName = lang === 'EN' ? quiz.village_en : quiz.village_fr;
            const badgeText = lang === 'EN' ? quiz.badge_en : quiz.badge_fr;
            const Icon = quiz.icon;

            return (
              <motion.article
                key={quiz.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col relative group hover-glow"
              >
                {/* Top Image Section */}
                <div className="h-[200px] sm:h-[220px] lg:h-[260px] relative shrink-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                    style={{ backgroundImage: `url(${lang === 'EN' ? quiz.image_en : quiz.image_fr})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B80]/95 via-[#002B80]/40 to-transparent opacity-90 mix-blend-multiply" />
                  
                  {/* Image Overlays */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/10 group-hover:bg-eu-yellow/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow" />
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-1.5 flex items-center shadow-lg">
                    <span className="text-[#002266] font-display font-bold text-[10px] sm:text-xs tracking-wide">{badgeText}</span>
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-[#002B80]/95 to-[#001A4C]/95 backdrop-blur-md">
                  <h3 className="text-eu-yellow font-display font-black text-[11px] sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
                    {villageName}
                  </h3>
                  <h2 className="font-display font-extrabold text-[22px] sm:text-[28px] leading-tight text-white mb-2 drop-shadow-md">
                    {data.title}
                  </h2>
                  <p className="text-white/80 font-sans text-sm font-medium mb-6 sm:mb-auto">
                    {data.subtitle}
                  </p>

                  <div className="mt-auto pt-2 space-y-3 sm:space-y-4">
                    {/* Primary Action */}
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 sm:py-4 bg-eu-yellow rounded-xl flex items-center justify-center gap-2 group/btn hover:bg-white transition-colors duration-300 shadow-[0_4px_20px_rgba(240,187,0,0.3)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.4)]"
                    >
                      <span className="text-[#002266] font-display font-black text-[13px] sm:text-[15px] tracking-wide">
                        {lang === 'EN' ? 'Start the English Quiz' : 'Démarrer le quiz en français'}
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#002266] group-hover/btn:translate-x-1 transition-transform" />
                    </a>

                    {/* Secondary Languages */}
                    <div className="flex gap-3 sm:gap-4">
                      <a
                        href={quiz.en.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group/sub"
                      >
                        <span className="font-display font-bold text-white text-[10px] sm:text-xs tracking-widest">EN</span>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50 group-hover/sub:text-white transition-colors" />
                      </a>
                      <a
                        href={quiz.fr.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group/sub"
                      >
                        <span className="font-display font-bold text-white text-[10px] sm:text-xs tracking-widest">FR</span>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50 group-hover/sub:text-white transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

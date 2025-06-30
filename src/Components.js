import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import toast from 'react-hot-toast';
import { 
  Play, 
  Plus, 
  ThumbsUp, 
  ChevronDown, 
  Search, 
  Bell, 
  User,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Info,
  Menu,
  Home,
  Film,
  Music,
  Users,
  Star,
  Clock,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Sun,
  Moon,
  Zap,
  Award,
  Calendar,
  BookOpen,
  Headphones,
  Download,
  Settings,
  LogOut,
  PlayCircle,
  Pause,
  SkipForward,
  Shuffle
} from 'lucide-react';
import YouTube from 'react-youtube';
import ProfileModal from "./components/ui/ProfileModal";

// Placeholder hooks - these will be provided by App.js context
const useTheme = () => ({ theme: 'dark', toggleTheme: () => {} });
const useUser = () => ({ 
  userData: { 
    notifications: [],
    watchHistory: [],
    favorites: [],
    reviews: [],
    preferences: { genres: [], actors: [] }
  }, 
  updateUserData: () => {} 
});

// Enhanced Navbar Component
const Navbar = ({ onSearchClick, onNotificationClick, onMenuClick, currentSection, setCurrentSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { theme } = useTheme();
  const { userData } = useUser();

  const unreadCount = userData.notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? theme === 'dark' 
              ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50' 
              : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50'
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between px-4 md:px-16 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={onMenuClick}
                className="md:hidden text-white hover:text-red-500 transition-colors"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-red-500 text-2xl md:text-3xl font-bold tracking-tight">
                STREAMFIX
              </h1>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('home-section')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  currentSection === 'home' 
                    ? 'bg-red-500/20 text-red-500' 
                    : theme === 'dark' ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500'
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </button>
              <button 
                onClick={() => scrollToSection('movies-section')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  theme === 'dark' ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500'
                }`}
              >
                <Film size={16} />
                <span>Movies</span>
              </button>
              <button 
                onClick={() => scrollToSection('ai-recommendations-section')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  theme === 'dark' ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500'
                }`}
              >
                <PlayCircle size={16} />
                <span>TV Shows</span>
              </button>
              <button 
                onClick={() => scrollToSection('trending-section')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  theme === 'dark' ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500'
                }`}
              >
                <TrendingUp size={16} />
                <span>Trending</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className={`p-2 rounded-full transition-all hover:bg-gray-800/20 ${
                theme === 'dark' ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500'
              }`}
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={onNotificationClick}
              className={`relative p-2 rounded-full transition-all hover:bg-gray-800/20 ${
                theme === 'dark' ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500'
              }`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowProfile(true)}
                className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg"
                aria-label="Profile"
              >
                <img
                  src="/streamnest-images/profile-1.jpg"
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

// Enhanced Sidebar Component
const Sidebar = ({ onClose, currentSection, setCurrentSection, onShowSoundtracks, onShowActors }) => {
  const { theme } = useTheme();

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', action: () => setCurrentSection('home') },
    { id: 'movies', icon: Film, label: 'Movies', action: () => {} },
    { id: 'tv', icon: PlayCircle, label: 'TV Shows', action: () => {} },
    { id: 'soundtracks', icon: Music, label: 'Soundtracks', action: onShowSoundtracks },
    { id: 'actors', icon: Users, label: 'Actors', action: onShowActors },
    { id: 'trending', icon: TrendingUp, label: 'Trending', action: () => {} },
    { id: 'favorites', icon: Heart, label: 'My List', action: () => {} },
    { id: 'settings', icon: Settings, label: 'Settings', action: () => {} },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`fixed left-0 top-0 h-full w-80 ${
            theme === 'dark' 
              ? 'bg-gray-900/95 border-r border-gray-800' 
              : 'bg-white/95 border-r border-gray-200'
          } backdrop-blur-xl`}
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-red-500">STREAMFIX</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800/20">
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      currentSection === item.id
                        ? 'bg-red-500/20 text-red-500'
                        : theme === 'dark'
                        ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Hero Section with glassmorphism
const HeroSection = ({ movie, onPlayClick, imageBaseUrl }) => {
  const [muted, setMuted] = useState(true);
  const { theme } = useTheme();
  
  const title = movie.title || movie.name;
  const backdropUrl = movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : '/api/placeholder/1920/1080';

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-110"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent backdrop-blur-[2px]" />

      {/* Content with enhanced styling */}
      <div className="relative z-10 px-4 md:px-16 max-w-3xl">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-400 text-sm font-medium">
            <TrendingUp size={16} />
            <span>Trending Now</span>
          </span>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        
        <motion.div
          className="flex items-center space-x-6 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500 fill-current" size={20} />
            <span className="text-white font-semibold">{movie.vote_average?.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-300">
              {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
            </span>
          </div>
          {movie.trending_score && (
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-400 font-semibold">{movie.trending_score}% Hot</span>
            </div>
          )}
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl mb-8 line-clamp-3 text-gray-200 leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {movie.overview}
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={onPlayClick}
            className="flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl"
          >
            <Play size={24} className="fill-current" />
            <span>Play Now</span>
          </button>
          
          <button className="flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700/80 transition-all transform hover:scale-105 border border-gray-600/50">
            <Info size={24} />
            <span>More Info</span>
          </button>
          
          <button className="flex items-center space-x-3 bg-gray-800/40 backdrop-blur-sm text-white px-6 py-4 rounded-xl hover:bg-gray-700/60 transition-all transform hover:scale-105 border border-gray-600/30">
            <Plus size={24} />
          </button>
        </motion.div>
      </div>

      {/* Enhanced Volume Control */}
      <motion.button 
        onClick={() => setMuted(!muted)}
        className="absolute bottom-32 right-8 z-10 p-4 bg-gray-900/60 backdrop-blur-sm rounded-full border border-gray-600/50 hover:bg-gray-800/60 transition-all transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </motion.button>
    </div>
  );
};

// Trending Meter Component
const TrendingMeter = ({ score, size = 60 }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-${size} h-${size}`}>
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textSize: '20px',
          pathColor: score > 80 ? '#10b981' : score > 60 ? '#f59e0b' : '#ef4444',
          textColor: theme === 'dark' ? '#ffffff' : '#1f2937',
          trailColor: theme === 'dark' ? '#374151' : '#e5e7eb',
          backgroundColor: 'transparent',
        })}
      />
    </div>
  );
};

// Enhanced Movie Card with glassmorphism and trending meter
const MovieCard = ({ movie, onMovieClick, imageBaseUrl, index, showTrendingMeter = false, showProgress = false }) => {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { theme } = useTheme();
  
  const title = movie.title || movie.name;
  const posterUrl = movie.poster_path && !imageError 
    ? `${imageBaseUrl}${movie.poster_path}` 
    : '/api/placeholder/300/450';

  return (
    <motion.div
      className="relative min-w-[200px] md:min-w-[250px] cursor-pointer group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onMovieClick(movie)}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-[300px] md:h-[375px] object-cover transition-all duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Trending Meter */}
        {showTrendingMeter && movie.trending_score && (
          <div className="absolute top-3 right-3">
            <div className="w-12 h-12">
              <TrendingMeter score={movie.trending_score} size={12} />
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {showProgress && movie.watch_progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${movie.watch_progress}%` }}
            />
          </div>
        )}
        
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center text-white">
                <div className="mb-4">
                  <Play size={48} className="mx-auto mb-3 fill-white drop-shadow-lg" />
                </div>
                <h3 className="text-lg font-bold mb-2 drop-shadow-lg">{title}</h3>
                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{movie.vote_average?.toFixed(1)}</span>
                  </div>
                  {movie.trending_score && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="text-sm font-semibold text-green-400">{movie.trending_score}%</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center space-x-2">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all">
                    <Plus size={16} />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all">
                    <ThumbsUp size={16} />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Continue Watching Component
const ContinueWatching = ({ movies, onMovieClick, imageBaseUrl }) => {
  const scrollRef = useRef(null);
  const { theme } = useTheme();

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-16 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="text-blue-500" size={24} />
        <h2 className="text-2xl md:text-3xl font-bold">Continue Watching</h2>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie, index) => (
          <div key={movie.id} className="relative min-w-[280px] md:min-w-[320px]">
            <MovieCard
              movie={movie}
              onMovieClick={onMovieClick}
              imageBaseUrl={imageBaseUrl}
              index={index}
              showProgress={true}
            />
            <div className="mt-2 px-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{movie.watch_progress}% watched</span>
                <span>{movie.runtime ? `${Math.round((movie.runtime * (100 - movie.watch_progress)) / 100)}min left` : ''}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// AI Recommendations Component
const AIRecommendations = ({ movies, onMovieClick, imageBaseUrl }) => {
  const { theme } = useTheme();

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-16 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="text-purple-500" size={24} />
        <h2 className="text-2xl md:text-3xl font-bold">AI Picks for You</h2>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
          Personalized
        </span>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={onMovieClick}
            imageBaseUrl={imageBaseUrl}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Smart Categories Component
const SmartCategories = ({ categories, onMovieClick, imageBaseUrl }) => {
  const { theme } = useTheme();

  const categoryIcons = {
    'Comfort Movies': Heart,
    'Weekend Binge': Calendar,
    'Hidden Gems': Award
  };

  const categoryColors = {
    'Comfort Movies': 'text-pink-500',
    'Weekend Binge': 'text-green-500',
    'Hidden Gems': 'text-yellow-500'
  };

  return (
    <div className="px-4 md:px-16 mb-8 space-y-8">
      {Object.entries(categories).map(([categoryName, movies]) => {
        if (!movies || movies.length === 0) return null;
        
        const Icon = categoryIcons[categoryName] || Star;
        const colorClass = categoryColors[categoryName] || 'text-blue-500';
        
        return (
          <div key={categoryName}>
            <div className="flex items-center space-x-3 mb-6">
              <Icon className={colorClass} size={24} />
              <h2 className="text-2xl md:text-3xl font-bold">{categoryName}</h2>
              <span className="px-3 py-1 bg-gray-800/40 backdrop-blur-sm text-gray-300 rounded-full text-sm">
                AI Curated
              </span>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
              {movies.slice(0, 10).map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={onMovieClick}
                  imageBaseUrl={imageBaseUrl}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Enhanced Content Row
const ContentRow = ({ title, movies, onMovieClick, imageBaseUrl, showTrendingMeter = false }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { theme } = useTheme();

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 1000;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-16 mb-8 relative group">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      
      <div className="relative">
        {/* Enhanced Navigation Arrows */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 ${
                theme === 'dark' 
                  ? 'bg-gray-900/80 hover:bg-gray-800/90' 
                  : 'bg-white/80 hover:bg-white/90'
              } backdrop-blur-sm p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-2xl border border-gray-600/30`}
              onClick={() => scroll('left')}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 ${
                theme === 'dark' 
                  ? 'bg-gray-900/80 hover:bg-gray-800/90' 
                  : 'bg-white/80 hover:bg-white/90'
              } backdrop-blur-sm p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-2xl border border-gray-600/30`}
              onClick={() => scroll('right')}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Movies Container */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
              imageBaseUrl={imageBaseUrl}
              index={index}
              showTrendingMeter={showTrendingMeter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Movie Modal with Community Features
const MovieModal = ({ movie, onClose, imageBaseUrl }) => {
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { theme } = useTheme();
  const { userData, updateUserData } = useUser();
  
  const title = movie.title || movie.name;
  const backdropUrl = movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : '/api/placeholder/1920/1080';
  
  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const youtubeOpts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: muted ? 1 : 0,
      controls: 1,
      rel: 0,
    },
  };

  const mockReviews = [
    {
      id: 1,
      user: 'MovieBuff2024',
      avatar: '🎬',
      rating: 5,
      comment: 'Absolutely incredible! The cinematography and storyline kept me engaged throughout.',
      date: '2 days ago',
      likes: 24
    },
    {
      id: 2,
      user: 'CinemaLover',
      avatar: '🍿',
      rating: 4,
      comment: 'Great characters and plot development. Highly recommend!',
      date: '1 week ago',
      likes: 18
    }
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLike = () => {
    toast.success('Added to your favorites!');
  };

  const handleAddToList = () => {
    toast.success('Added to My List!');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`${
            theme === 'dark' 
              ? 'bg-gray-900/95 border border-gray-800' 
              : 'bg-white/95 border border-gray-200'
          } backdrop-blur-xl rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-gray-800/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-700/80 transition-all"
          >
            <X size={20} />
          </button>

          {/* Video/Image Section */}
          <div className="relative">
            {trailer ? (
              <div className="relative">
                <YouTube
                  videoId={trailer.key}
                  opts={youtubeOpts}
                  className="w-full rounded-t-2xl overflow-hidden"
                />
                <button
                  onClick={() => setMuted(!muted)}
                  className="absolute bottom-6 right-6 bg-gray-800/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-700/80 transition-all"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            ) : (
              <div className="relative h-[400px] bg-cover bg-center rounded-t-2xl" style={{backgroundImage: `url(${backdropUrl})`}}>
                <div className="absolute inset-0 bg-black/30 rounded-t-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={80} className="text-white/70" />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 font-bold text-lg">
                      {Math.round(movie.vote_average * 10)}% Match
                    </span>
                  </div>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
                  </span>
                  <span className="border border-gray-500 px-2 py-1 rounded text-xs">HD</span>
                  {movie.trending_score && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="text-green-500 font-semibold">{movie.trending_score}% Hot</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => toast.success('Playing now!')}
                  className="bg-white text-black px-8 py-3 rounded-xl flex items-center space-x-2 hover:bg-gray-200 transition-all font-semibold"
                >
                  <Play size={20} className="fill-current" />
                  <span>Play</span>
                </button>
                <button 
                  onClick={handleAddToList}
                  className="border border-gray-500 p-3 rounded-xl hover:border-white transition-all"
                >
                  <Plus size={20} />
                </button>
                <button 
                  onClick={handleLike}
                  className="border border-gray-500 p-3 rounded-xl hover:border-white transition-all"
                >
                  <ThumbsUp size={20} />
                </button>
                <button className="border border-gray-500 p-3 rounded-xl hover:border-white transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <nav className="flex space-x-8">
                {['overview', 'reviews', 'details'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-red-500 text-red-500'
                        : 'border-transparent hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-lg`}>
                  {movie.overview}
                </p>
                
                {movie.genres && (
                  <div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Genres: </span>
                    <span className="font-medium">
                      {movie.genres.map(genre => genre.name).join(', ')}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Rating:</span>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.round(movie.vote_average / 2) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <span className="font-medium">{movie.vote_average?.toFixed(1)}/10</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Community Reviews</h3>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Write Review
                  </button>
                </div>
                
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className={`${
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                    } p-6 rounded-xl`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{review.avatar}</span>
                          <div>
                            <p className="font-semibold">{review.user}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex text-yellow-500">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} size={14} className="fill-current" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center space-x-1 text-sm hover:text-red-500">
                          <Heart size={16} />
                          <span>{review.likes}</span>
                        </button>
                      </div>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Movie Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Runtime:</span>
                      <span>{movie.runtime || 'N/A'} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Language:</span>
                      <span>{movie.original_language?.toUpperCase() || 'EN'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Budget:</span>
                      <span>${movie.budget?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                {movie.credits?.cast && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Cast</h3>
                    <div className="space-y-2">
                      {movie.credits.cast.slice(0, 5).map((actor) => (
                        <div key={actor.id} className="flex justify-between">
                          <span>{actor.name}</span>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                            {actor.character}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced Search Modal
const SearchModal = ({ onClose, onSearch, searchResults, onMovieClick, imageBaseUrl, query }) => {
  const [searchQuery, setSearchQuery] = useState(query || '');
  const inputRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Search Movies & TV Shows</h2>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, TV shows, actors..."
                className={`w-full pl-14 pr-6 py-4 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                } backdrop-blur-sm border-2 rounded-2xl focus:border-red-500 focus:outline-none text-lg transition-all`}
              />
            </div>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6">Results for "{searchQuery}"</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {searchResults.slice(0, 18).map((movie) => {
                  const title = movie.title || movie.name;
                  const posterUrl = movie.poster_path 
                    ? `${imageBaseUrl}${movie.poster_path}` 
                    : '/api/placeholder/300/450';

                  return (
                    <motion.div
                      key={movie.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        onMovieClick(movie);
                        onClose();
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={posterUrl}
                          alt={title}
                          className="w-full h-[250px] md:h-[300px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play size={40} className="fill-white" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="font-semibold truncate">{title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-400">
                            {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
                          </p>
                          {movie.vote_average && (
                            <div className="flex items-center space-x-1">
                              <Star size={12} className="text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-400">{movie.vote_average.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="text-center mt-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-400 mb-2">No results found for "{searchQuery}"</p>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Soundtracks Section Component
const SoundtracksSection = ({ onClose, movies }) => {
  const { theme } = useTheme();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mockSoundtracks = [
    {
      id: 1,
      title: "Stranger Things Theme",
      artist: "Kyle Dixon & Michael Stein",
      movie: "Stranger Things",
      duration: "3:42",
      cover: "/api/placeholder/300/300"
    },
    {
      id: 2,
      title: "Toss a Coin to Your Witcher",
      artist: "Jaskier",
      movie: "The Witcher",
      duration: "2:58",
      cover: "/api/placeholder/300/300"
    },
    {
      id: 3,
      title: "Paint It Black",
      artist: "Ciara",
      movie: "Wednesday",
      duration: "4:15",
      cover: "/api/placeholder/300/300"
    }
  ];

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(!isPlaying);
    toast.success(`${isPlaying ? 'Paused' : 'Playing'}: ${track.title}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Music className="text-green-500" size={32} />
              <h2 className="text-3xl font-bold">Soundtracks</h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Featured Soundtrack */}
          <div className={`${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          } backdrop-blur-sm p-8 rounded-2xl mb-8`}>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Music size={48} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Featured Album</h3>
                <p className="text-xl mb-2">Stranger Things Soundtrack</p>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Immerse yourself in the nostalgic synth-wave sounds
                </p>
                <button 
                  onClick={() => handlePlay({ title: "Stranger Things Theme", artist: "Kyle Dixon & Michael Stein" })}
                  className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
                >
                  <Play size={20} className="fill-current" />
                  <span>Play Album</span>
                </button>
              </div>
            </div>
          </div>

          {/* Soundtrack List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Popular Tracks</h3>
            {mockSoundtracks.map((track, index) => (
              <motion.div
                key={track.id}
                className={`${
                  theme === 'dark' ? 'bg-gray-800/30 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'
                } backdrop-blur-sm p-4 rounded-xl transition-all cursor-pointer group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePlay(track)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Music size={24} className="text-white" />
                    </div>
                    <button className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause size={20} className="text-white fill-current" />
                      ) : (
                        <Play size={20} className="text-white fill-current" />
                      )}
                    </button>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{track.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {track.artist} • {track.movie}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {track.duration}
                    </span>
                    <button className="p-2 hover:bg-gray-600/20 rounded-full">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Now Playing Bar */}
          {currentTrack && (
            <motion.div
              className={`fixed bottom-0 left-0 right-0 ${
                theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
              } backdrop-blur-xl border-t ${
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              } p-4`}
              initial={{ y: 100 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Music size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{currentTrack.title}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-600/20 rounded-full">
                    <Shuffle size={20} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors"
                  >
                    {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
                  </button>
                  <button className="p-2 hover:bg-gray-600/20 rounded-full">
                    <SkipForward size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Actor Section Component
const ActorSection = ({ onClose, onMovieClick, imageBaseUrl }) => {
  const { theme } = useTheme();

  const mockActors = [
    {
      id: 1,
      name: "Ryan Reynolds",
      profilePath: "/api/placeholder/300/450",
      movies: [
        { id: 101, title: "Deadpool", poster_path: "/api/placeholder/200/300" },
        { id: 102, title: "Free Guy", poster_path: "/api/placeholder/200/300" },
      ]
    },
    {
      id: 2,
      name: "Emma Stone",
      profilePath: "/api/placeholder/300/450",
      movies: [
        { id: 201, title: "La La Land", poster_path: "/api/placeholder/200/300" },
        { id: 202, title: "Cruella", poster_path: "/api/placeholder/200/300" },
      ]
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Users className="text-purple-500" size={32} />
              <h2 className="text-3xl font-bold">Browse by Actor</h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Actors Grid */}
          <div className="space-y-12">
            {mockActors.map((actor) => (
              <div key={actor.id}>
                <div className="flex items-center space-x-6 mb-6">
                  <img
                    src={actor.profilePath}
                    alt={actor.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{actor.name}</h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {actor.movies.length} movies available
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
                  {actor.movies.map((movie) => (
                    <motion.div
                      key={movie.id}
                      className="min-w-[200px] cursor-pointer group"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => onMovieClick(movie)}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <div className="w-full h-[300px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Film size={48} className="text-white" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play size={40} className="fill-white" />
                        </div>
                      </div>
                      <p className="mt-2 font-semibold text-center">{movie.title}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Notification Center Component
const NotificationCenter = ({ onClose, notifications, updateUserData }) => {
  const { theme } = useTheme();

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    updateUserData({ notifications: updatedNotifications });
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    updateUserData({ notifications: updatedNotifications });
    toast.success('All notifications marked as read');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_release': return <PlayCircle className="text-blue-500" size={20} />;
      case 'recommendation': return <Star className="text-yellow-500" size={20} />;
      case 'reminder': return <Clock className="text-green-500" size={20} />;
      default: return <Bell className="text-gray-500" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`fixed right-0 top-0 h-full w-96 ${
            theme === 'dark' 
              ? 'bg-gray-900/95 border-l border-gray-800' 
              : 'bg-white/95 border-l border-gray-200'
          } backdrop-blur-xl overflow-y-auto`}
          initial={{ x: 384 }}
          animate={{ x: 0 }}
          exit={{ x: 384 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Bell className="text-red-500" size={24} />
                <h2 className="text-xl font-bold">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800/20">
                <X size={20} />
              </button>
            </div>

            {/* Mark all as read */}
            <button 
              onClick={markAllAsRead}
              className="w-full mb-4 py-2 px-4 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
            >
              Mark all as read
            </button>

            {/* Notifications List */}
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    notification.read
                      ? theme === 'dark' 
                        ? 'bg-gray-800/30 border-gray-700' 
                        : 'bg-gray-50 border-gray-200'
                      : theme === 'dark'
                      ? 'bg-gray-800/60 border-gray-600'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold text-sm ${
                          notification.read ? 'text-gray-500' : ''
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      } ${notification.read ? 'opacity-60' : ''}`}>
                        {notification.message}
                      </p>
                      <p className={`text-xs mt-2 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed bottom-8 left-8 p-4 ${
        theme === 'dark' 
          ? 'bg-gray-800/80 hover:bg-gray-700/80' 
          : 'bg-white/80 hover:bg-white/90'
      } backdrop-blur-sm rounded-full shadow-2xl border ${
        theme === 'dark' ? 'border-gray-600/50' : 'border-gray-200/50'
      } transition-all z-40`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={24} className="text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={24} className="text-gray-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-red-500/30 border-t-red-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            STREAMFIX
          </h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading your entertainment...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Export all components
export const Components = {
  Navbar,
  Sidebar,
  HeroSection,
  ContentRow,
  MovieCard,
  MovieModal,
  SearchModal,
  SoundtracksSection,
  ActorSection,
  NotificationCenter,
  CommunityReviews: () => null, // Placeholder
  ThemeToggle,
  TrendingMeter,
  SmartCategories,
  ContinueWatching,
  AIRecommendations,
  LoadingSpinner
};
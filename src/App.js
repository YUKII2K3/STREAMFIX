import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Components } from './Components';
import { Footer } from "./components/ui/footer";
import { Hexagon, Github, Twitter, Linkedin, Mail } from "lucide-react";
import ProfileSelection from "./components/ui/ProfileSelection";

const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Theme Context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// User Context for personalization
const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const {
  Navbar,
  HeroSection,
  ContentRow,
  MovieModal,
  LoadingSpinner,
  SearchModal,
  SoundtracksSection,
  ActorSection,
  NotificationCenter,
  ThemeToggle,
  SmartCategories,
  ContinueWatching,
  AIRecommendations,
  Sidebar
} = Components;

function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Main app state
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentary: [],
    aiRecommended: [],
    continueWatching: [],
    comfortMovies: [],
    weekendBinge: [],
    hiddenGems: []
  });

  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSoundtracks, setShowSoundtracks] = useState(false);
  const [showActors, setShowActors] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProfile, setSelectedProfile] = useState(null);

  // User data state
  const [userData, setUserData] = useState({
    watchHistory: [],
    favorites: [],
    reviews: [],
    preferences: {
      genres: ['Action', 'Comedy', 'Drama'],
      actors: ['Ryan Reynolds', 'Emma Stone', 'Robert Downey Jr.']
    },
    notifications: [
      {
        id: 1,
        type: 'new_release',
        title: 'New Season Available',
        message: 'Stranger Things Season 5 is now streaming!',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        type: 'recommendation',
        title: 'Perfect Match',
        message: 'Based on your viewing history, you might love "The Witcher"',
        time: '1 day ago',
        read: false
      },
      {
        id: 3,
        type: 'reminder',
        title: 'Continue Watching',
        message: 'Resume watching "Money Heist" - 23 minutes left',
        time: '2 days ago',
        read: true
      }
    ]
  });

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Fetch movies from TMDB API
  const fetchMovies = async (endpoint, retryCount = 0) => {
    try {
      const joiner = endpoint.includes('?') ? '&' : '?';
      const response = await fetch(`${TMDB_BASE_URL}${endpoint}${joiner}api_key=${TMDB_API_KEY}&language=en-US&page=1`);
      if (response.status === 429 && retryCount < 2) {
        return await fetchMoviesWithFallback(endpoint);
      }
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return getMockMovies(endpoint);
    }
  };

  const fetchMoviesWithFallback = async (endpoint) => {
    const fallbackKey = '3cb41ecea3bf606c56552db3d17adefd';
    try {
      const joiner = endpoint.includes('?') ? '&' : '?';
      const response = await fetch(`${TMDB_BASE_URL}${endpoint}${joiner}api_key=${fallbackKey}&language=en-US&page=1`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      return getMockMovies(endpoint);
    }
  };

  // Enhanced mock data with additional properties
  const getMockMovies = (endpoint) => {
    const mockMovies = [
      {
        id: 1,
        title: "Stranger Things",
        name: "Stranger Things",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
        poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        vote_average: 8.7,
        release_date: "2016-07-15",
        first_air_date: "2016-07-15",
        genre_ids: [18, 10765, 9648],
        popularity: 95.8,
        trending_score: 98,
        watch_progress: 65,
        runtime: 51,
        seasons: 4
      },
      {
        id: 2,
        title: "The Witcher",
        name: "The Witcher",
        overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.",
        poster_path: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
        backdrop_path: "/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
        vote_average: 8.2,
        release_date: "2019-12-20",
        first_air_date: "2019-12-20",
        genre_ids: [10759, 18, 10765],
        popularity: 87.3,
        trending_score: 92,
        watch_progress: 0,
        runtime: 60,
        seasons: 3
      },
      {
        id: 3,
        title: "Wednesday",
        name: "Wednesday",
        overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates murders.",
        poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        backdrop_path: "/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
        vote_average: 8.5,
        release_date: "2022-11-23",
        first_air_date: "2022-11-23",
        genre_ids: [35, 80, 10765],
        popularity: 91.2,
        trending_score: 96,
        watch_progress: 32,
        runtime: 45,
        seasons: 1
      },
      {
        id: 4,
        title: "Money Heist",
        name: "Money Heist",
        overview: "An unusual group of robbers attempt to carry out the most perfect robbery.",
        poster_path: "/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        backdrop_path: "/mYM8x2Atv4MaLulaV0KVJWI1Djv.jpg",
        vote_average: 8.3,
        release_date: "2017-05-02",
        first_air_date: "2017-05-02",
        genre_ids: [80, 18],
        popularity: 83.7,
        trending_score: 89,
        watch_progress: 78,
        runtime: 70,
        seasons: 5
      },
      {
        id: 5,
        title: "Squid Game",
        name: "Squid Game",
        overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.",
        poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        backdrop_path: "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg",
        vote_average: 7.8,
        release_date: "2021-09-17",
        first_air_date: "2021-09-17",
        genre_ids: [18, 53, 10759],
        popularity: 99.1,
        trending_score: 100,
        watch_progress: 45,
        runtime: 56,
        seasons: 2
      },
      {
        id: 6,
        title: "Avatar: The Way of Water",
        overview: "Jake Sully lives with his newfamily formed on the planet of Pandora.",
        poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        vote_average: 7.6,
        release_date: "2022-12-14",
        genre_ids: [878, 12, 28],
        popularity: 88.9,
        trending_score: 94,
        watch_progress: 0,
        runtime: 192
      }
    ];
    return mockMovies;
  };

  // Generate AI recommendations based on user preferences
  const generateAIRecommendations = (allMovies) => {
    const { preferences, watchHistory } = userData;
    // Simple AI logic based on genres and viewing history
    return allMovies.filter(movie => {
      const hasPreferredGenre = preferences.genres.some(genre => 
        movie.genre_ids?.includes(getGenreId(genre))
      );
      const notInHistory = !watchHistory.includes(movie.id);
      return hasPreferredGenre && notInHistory && movie.vote_average > 7.5;
    }).slice(0, 10);
  };

  const getGenreId = (genreName) => {
    const genreMap = {
      'Action': 28, 'Comedy': 35, 'Drama': 18, 'Horror': 27,
      'Romance': 10749, 'Sci-Fi': 878, 'Thriller': 53
    };
    return genreMap[genreName] || 18;
  };

  // Search movies
  const searchMovies = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  };

  // Get movie details with trailer
  const getMovieDetails = async (id, mediaType = 'movie') => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,reviews`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  // Load all movie data
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      
      const [
        trendingData,
        popularData,
        topRatedData,
        actionData,
        comedyData,
        horrorData,
        romanceData,
        documentaryData
      ] = await Promise.all([
        fetchMovies('/trending/all/week'),
        fetchMovies('/movie/popular'),
        fetchMovies('/movie/top_rated'),
        fetchMovies('/discover/movie?with_genres=28'),
        fetchMovies('/discover/movie?with_genres=35'),
        fetchMovies('/discover/movie?with_genres=27'),
        fetchMovies('/discover/movie?with_genres=10749'),
        fetchMovies('/discover/movie?with_genres=99')
      ]);

      // Generate smart categories
      const allMovies = [...trendingData, ...popularData, ...topRatedData];
      const aiRecommended = generateAIRecommendations(allMovies);
      const continueWatching = allMovies.filter(movie => movie.watch_progress > 0);
      const comfortMovies = allMovies.filter(movie => 
        movie.genre_ids?.includes(35) || movie.genre_ids?.includes(10749)
      ).slice(0, 10);
      const weekendBinge = allMovies.filter(movie => 
        movie.seasons && movie.seasons > 1
      ).slice(0, 10);
      const hiddenGems = allMovies.filter(movie => 
        movie.vote_average > 8.0 && movie.popularity < 50
      ).slice(0, 10);

      setMovies({
        trending: trendingData,
        popular: popularData,
        topRated: topRatedData,
        action: actionData,
        comedy: comedyData,
        horror: horrorData,
        romance: romanceData,
        documentary: documentaryData,
        aiRecommended,
        continueWatching,
        comfortMovies,
        weekendBinge,
        hiddenGems
      });

      if (trendingData.length > 0) {
        setFeaturedMovie(trendingData[0]);
      }

      setLoading(false);
    };

    loadMovies();
  }, [userData.preferences]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleMovieSelect = async (movie) => {
    const movieDetails = await getMovieDetails(movie.id, movie.media_type || 'movie');
    setSelectedMovie(movieDetails);
    setShowModal(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchMovies(query);
  };

  const updateUserData = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  if (!selectedProfile) {
    return <ProfileSelection onSelect={setSelectedProfile} />;
  }

  if (loading) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LoadingSpinner />
      </ThemeContext.Provider>
    );
  }

  const themeValue = { theme, toggleTheme };
  const userValue = { userData, updateUserData };

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <div className={`App min-h-screen transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
        }`}>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: theme === 'dark' ? '#1f2937' : '#ffffff',
                color: theme === 'dark' ? '#ffffff' : '#1f2937',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
          
          <Navbar 
            onSearchClick={() => setShowSearch(true)}
            onNotificationClick={() => setShowNotifications(true)}
            onMenuClick={() => setShowSidebar(true)}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          
          {showSidebar && (
            <Sidebar 
              onClose={() => setShowSidebar(false)}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              onShowSoundtracks={() => {
                setShowSoundtracks(true);
                setShowSidebar(false);
              }}
              onShowActors={() => {
                setShowActors(true);
                setShowSidebar(false);
              }}
            />
          )}

          {currentSection === 'home' && (
            <>
              <div id="home-section">
                {featuredMovie && (
                  <HeroSection 
                    movie={featuredMovie} 
                    onPlayClick={() => handleMovieSelect(featuredMovie)}
                    imageBaseUrl={TMDB_BACKDROP_BASE_URL}
                  />
                )}
              </div>
              <div className="relative z-10 pb-20 space-y-8">
                {movies.continueWatching.length > 0 && (
                  <div id="continue-watching-section">
                    <ContinueWatching 
                      movies={movies.continueWatching}
                      onMovieClick={handleMovieSelect}
                      imageBaseUrl={TMDB_IMAGE_BASE_URL}
                    />
                  </div>
                )}
                <div id="ai-recommendations-section">
                  <AIRecommendations 
                    movies={movies.aiRecommended}
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                </div>
                <div id="trending-section">
                  <ContentRow 
                    title="Trending Now" 
                    movies={movies.trending} 
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                    showTrendingMeter={true}
                  />
                </div>
                <div id="smart-categories-section">
                  <SmartCategories 
                    categories={{
                      'Comfort Movies': movies.comfortMovies,
                      'Weekend Binge': movies.weekendBinge,
                      'Hidden Gems': movies.hiddenGems
                    }}
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                </div>
                <div id="movies-section">
                  <ContentRow 
                    title="Popular Right Now" 
                    movies={movies.popular} 
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                  <ContentRow 
                    title="Top Rated" 
                    movies={movies.topRated} 
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                  <ContentRow 
                    title="Action & Adventure" 
                    movies={movies.action} 
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                  <ContentRow 
                    title="Comedy Movies" 
                    movies={movies.comedy} 
                    onMovieClick={handleMovieSelect}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                </div>
              </div>
            </>
          )}

          {showModal && selectedMovie && (
            <MovieModal 
              movie={selectedMovie} 
              onClose={() => setShowModal(false)}
              imageBaseUrl={TMDB_BACKDROP_BASE_URL}
            />
          )}

          {showSearch && (
            <SearchModal 
              onClose={() => setShowSearch(false)}
              onSearch={handleSearch}
              searchResults={searchResults}
              onMovieClick={handleMovieSelect}
              imageBaseUrl={TMDB_IMAGE_BASE_URL}
              query={searchQuery}
            />
          )}

          {showSoundtracks && (
            <SoundtracksSection 
              onClose={() => setShowSoundtracks(false)}
              movies={movies.trending}
            />
          )}

          {showActors && (
            <ActorSection 
              onClose={() => setShowActors(false)}
              onMovieClick={handleMovieSelect}
              imageBaseUrl={TMDB_IMAGE_BASE_URL}
            />
          )}

          {showNotifications && (
            <NotificationCenter 
              onClose={() => setShowNotifications(false)}
              notifications={userData.notifications}
              updateUserData={updateUserData}
            />
          )}

          <ThemeToggle />
          <Footer
            logo={<Hexagon className="h-10 w-10" />}
            brandName="Netflix Clone"
            socialLinks={[
              {
                icon: <Github className="h-5 w-5" />,
                href: "https://github.com/YUKII2K3",
                label: "GitHub",
              },
              {
                icon: <Linkedin className="h-5 w-5" />,
                href: "https://linkedin.com/in/yuktheshwar-mp",
                label: "LinkedIn",
              },
              {
                icon: <Mail className="h-5 w-5" />,
                href: "mailto:yukiis.dev@gmail.com",
                label: "Email",
              },
            ]}
            mainLinks={[
              { href: "/browse", label: "Browse" },
              { href: "/my-list", label: "My List" },
              { href: "/account", label: "Account" },
            ]}
            legalLinks={[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ]}
            copyright={{
              text: "© 2024 Netflix Clone",
              license: "All rights reserved",
            }}
          />
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
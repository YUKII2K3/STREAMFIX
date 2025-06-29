# STREAMFIX - Netflix Clone

A modern, responsive Netflix clone built with React, featuring a beautiful UI with glassmorphism effects, smooth animations, and a comprehensive streaming platform experience.

## 🚀 Features

- **Modern UI/UX**: Glassmorphism design with smooth animations using Framer Motion
- **Responsive Design**: Fully responsive across all devices
- **Profile Selection**: Netflix-style profile selection with PIN protection
- **Movie Browsing**: Browse movies by categories, trending, and AI recommendations
- **Search Functionality**: Advanced search with real-time results
- **Movie Details**: Comprehensive movie information with trailers and reviews
- **Dark/Light Theme**: Toggle between dark and light themes
- **Notifications**: Real-time notification system
- **Soundtracks**: Music player for movie soundtracks
- **Actor Profiles**: Browse movies by favorite actors
- **Continue Watching**: Track your viewing progress
- **AI Recommendations**: Personalized movie suggestions

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (JSX)
- **Styling**: Tailwind CSS, CSS3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: CRACO (Create React App Configuration Override)
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd netflix-clone-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect it's a React app
   - Build command: `npm run build`
   - Output directory: `build`
   - Deploy!

### Environment Variables

No environment variables are required for basic functionality. The app uses mock data and public APIs.

## 📁 Project Structure

```
netflix-clone-main/
├── public/
│   ├── index.html
│   ├── favicon 4.ico
│   ├── favicon-32x32.png
│   └── StreamNest images/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── ProfileSelection.jsx
│   │       ├── PinModal.jsx
│   │       ├── button.jsx
│   │       ├── ProfileModal.jsx
│   │       └── footer.jsx
│   ├── lib/
│   │   ├── utils.js
│   │   └── utils.ts
│   ├── App.js
│   ├── Components.js
│   ├── App.css
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── craco.config.js
└── README.md
```

## 🎨 Key Components

- **ProfileSelection**: Netflix-style profile selection screen
- **Navbar**: Responsive navigation with smooth scrolling
- **HeroSection**: Featured movie showcase with glassmorphism
- **ContentRow**: Horizontal scrolling movie rows
- **MovieModal**: Detailed movie information modal
- **SearchModal**: Advanced search functionality
- **Footer**: Professional footer with social links

## 🎯 Features in Detail

### Profile Selection
- Multiple profile support
- PIN protection for specific profiles
- Smooth animations and transitions

### Movie Browsing
- Trending movies with trending meters
- AI-powered recommendations
- Smart categories (Comfort Movies, Weekend Binge, Hidden Gems)
- Continue watching with progress tracking

### Search & Discovery
- Real-time search results
- Multi-category search (movies, TV shows, actors)
- Advanced filtering options

### User Experience
- Smooth scrolling navigation
- Hover effects and animations
- Responsive design for all screen sizes
- Dark/light theme toggle

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configurations in `tailwind.config.js`.

### CRACO
Custom React App Configuration Override for enhanced build process.

### Build Optimization
- Optimized bundle size
- Gzip compression ready
- Static asset optimization

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Netflix for inspiration
- TMDB API for movie data
- Framer Motion for animations
- Tailwind CSS for styling
- Lucide React for icons

## 📞 Contact

- **Developer**: Yuktheshwar MP
- **Portfolio**: [https://my-portfolio-ten-tan-36.vercel.app/](https://my-portfolio-ten-tan-36.vercel.app/)
- **GitHub**: [https://github.com/YUKII2K3](https://github.com/YUKII2K3)
- **LinkedIn**: [https://linkedin.com/in/yuktheshwar-mp](https://linkedin.com/in/yuktheshwar-mp)
- **Email**: yukiis.dev@gmail.com

---

**Made with ❤️ by Yuktheshwar MP**

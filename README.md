# 🌸 The Midnight Garden

A high-end, botanical-themed Valentine's proposal website featuring hyper-realistic florals, sophisticated animations, and timeless elegance.

![The Midnight Garden](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80)

## ✨ Features

- **Blooming Entrance:** Scroll-triggered floral animation with parallax depth
- **Growth Clock:** Real-time countdown with animated wreath progress bar
- **Petal Gallery:** Physics-based floating photo gallery with hover effects
- **Parchment Letter:** Typewriter animation with fountain pen cursor
- **Vinyl Player:** Rotating disc audio player with sound wave indicators
- **Proposal Section:** Gold seal button with full-screen floral explosion

## 🎨 Design System

**Color Palette:** Deep emerald greens, cream silks, and gold accents  
**Typography:** Cormorant Garamond (serif) + Inter (sans-serif)  
**Effects:** Grain filter, glassmorphism, parallax scrolling, custom cursor

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit: http://localhost:5173/

## 📝 Customization

### 1. Update Target Date
Edit `src/App.tsx`:
```tsx
<GrowthClock targetDate="2026-02-14T00:00:00" />
```

### 2. Add Your Photos
Place photos in `public/images/gallery/` and update `src/components/PetalGallery.tsx`

### 3. Customize Letter
Edit the letter content in `src/components/ParchmentLetter.tsx`

### 4. Add Audio Track
Place your audio file in `public/audio/` and update `src/components/VinylPlayer.tsx`

## 🛠️ Tech Stack

- **React 18** + TypeScript
- **Vite 7.3.1** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## 📦 Project Structure

```
src/
├── components/
│   ├── BloomingHero.tsx       # Hero section with bloom animation
│   ├── CustomCursor.tsx       # Sparkle cursor trail
│   ├── FloralExplosion.tsx    # Petal confetti effect
│   ├── GrowthClock.tsx        # Countdown timer
│   ├── ParallaxLayer.tsx      # Parallax wrapper
│   ├── ParchmentLetter.tsx    # Animated letter
│   ├── PetalGallery.tsx       # Photo gallery
│   ├── ProposalSection.tsx    # Final proposal
│   └── VinylPlayer.tsx        # Audio player
├── App.tsx                    # Main app
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## 🎯 Performance

- ✅ Smooth 60fps animations
- ✅ Lazy loading for images
- ✅ Scroll-triggered animations
- ✅ Optimized particle system
- ✅ Mobile-responsive design

## 📱 Responsive Design

- **Mobile (375px):** Single column layout, cursor disabled
- **Tablet (768px):** Two column gallery
- **Desktop (1920px+):** Three column gallery, full effects

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## 📄 License

MIT License - Feel free to use for your own romantic proposals! 💐

---

**Built with love** using React, Framer Motion, and Tailwind CSS

*"Where every moment blooms eternal"*

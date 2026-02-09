import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ParallaxLayer } from './ParallaxLayer';

export const BloomingHero = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden grain-filter" style={{ background: 'linear-gradient(to bottom, #0a1628 0%, #1a3a4a 100%)' }}>
            {/* Twinkling stars background */}
            <div className="absolute inset-0 opacity-30 z-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cream-light rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Background layers with parallax */}
            <ParallaxLayer speed={0.3} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/10 to-transparent" />
            </ParallaxLayer>

            <ParallaxLayer speed={0.5} className="absolute inset-0 z-10">
                <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" fill="#2d5f3f" opacity="0.3" />
                        <path d="M50 20 Q30 40 50 60 Q70 40 50 20" fill="#4a7c59" />
                    </svg>
                </div>
            </ParallaxLayer>

            <ParallaxLayer speed={0.7} className="absolute inset-0 z-20">
                <div className="absolute bottom-20 right-10 w-40 h-40 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="35" fill="#2d5f3f" opacity="0.2" />
                        <path d="M50 25 Q35 45 50 55 Q65 45 50 25" fill="#4a7c59" />
                    </svg>
                </div>
            </ParallaxLayer>

            {/* Main blooming flower */}
            <div className="absolute inset-0 z-30 flex items-center justify-center">
                <motion.div
                    style={{ scale, opacity }}
                    className="relative w-64 h-64 md:w-96 md:h-96"
                >
                    {/* Peony/Ranunculus bloom */}
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                        {/* Outer petals */}
                        <g className="animate-bloom">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
                                <motion.ellipse
                                    key={i}
                                    cx="100"
                                    cy="60"
                                    rx="30"
                                    ry="50"
                                    fill="#faf8f3"
                                    stroke="#d4af37"
                                    strokeWidth="0.5"
                                    transform={`rotate(${rotation} 100 100)`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                />
                            ))}
                        </g>

                        {/* Middle petals */}
                        <g>
                            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rotation, i) => (
                                <motion.ellipse
                                    key={i}
                                    cx="100"
                                    cy="70"
                                    rx="25"
                                    ry="40"
                                    fill="#f5f1e8"
                                    stroke="#d4af37"
                                    strokeWidth="0.5"
                                    transform={`rotate(${rotation} 100 100)`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + i * 0.08, duration: 0.7 }}
                                />
                            ))}
                        </g>

                        {/* Inner petals */}
                        <g>
                            {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                                <motion.ellipse
                                    key={i}
                                    cx="100"
                                    cy="80"
                                    rx="18"
                                    ry="28"
                                    fill="#ebe5d6"
                                    stroke="#d4af37"
                                    strokeWidth="0.5"
                                    transform={`rotate(${rotation} 100 100)`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.06, duration: 0.6 }}
                                />
                            ))}
                        </g>

                        {/* Center */}
                        <motion.circle
                            cx="100"
                            cy="100"
                            r="15"
                            fill="#d4af37"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        />

                        {/* Center details */}
                        <motion.circle
                            cx="100"
                            cy="100"
                            r="8"
                            fill="#b8941f"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.4 }}
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Title text */}
            <motion.div
                className="absolute inset-0 z-40 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
            >
                <div className="text-center px-4">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-light mb-4">
                        The Midnight Garden
                    </h1>
                    <p className="font-serif text-xl md:text-2xl text-gold italic">
                        Where love blooms eternal
                    </p>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-gold text-sm font-serif"
                >
                    ↓ Scroll to explore ↓
                </motion.div>
            </motion.div>
        </div>
    );
};

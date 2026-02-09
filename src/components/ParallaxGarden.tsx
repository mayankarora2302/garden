import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ParallaxGardenProps {
    children: ReactNode;
}

export const ParallaxGarden = ({ children }: ParallaxGardenProps) => {
    return (
        <div className="relative">
            {/* Background Layer - Large blurred leaves */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Top left leaf */}
                <motion.div
                    className="absolute -top-20 -left-20 w-96 h-96 opacity-10"
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full blur-xl">
                        <ellipse cx="100" cy="100" rx="80" ry="120" fill="#1A2F23" />
                        <path d="M100 20 Q60 100 100 180" stroke="#2d5f3f" strokeWidth="8" fill="none" />
                    </svg>
                </motion.div>

                {/* Bottom right leaf */}
                <motion.div
                    className="absolute -bottom-20 -right-20 w-[500px] h-[500px] opacity-10"
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full blur-xl">
                        <ellipse cx="100" cy="100" rx="90" ry="130" fill="#1A2F23" />
                        <path d="M100 20 Q140 100 100 180" stroke="#2d5f3f" strokeWidth="8" fill="none" />
                    </svg>
                </motion.div>

                {/* Middle left leaf */}
                <motion.div
                    className="absolute top-1/3 -left-32 w-80 h-80 opacity-8"
                    animate={{
                        y: [0, 20, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full blur-2xl">
                        <ellipse cx="100" cy="100" rx="70" ry="110" fill="#2d5f3f" />
                    </svg>
                </motion.div>
            </div>

            {/* Middle Layer - Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Foreground Layer - Sharp flower petals overlapping content */}
            <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
                {/* Top right petal cluster */}
                <motion.div
                    className="absolute top-20 right-10 w-32 h-32"
                    animate={{
                        rotate: [0, 10, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                        {/* Peony petals */}
                        {[0, 45, 90, 135].map((rotation) => (
                            <ellipse
                                key={rotation}
                                cx="50"
                                cy="30"
                                rx="15"
                                ry="25"
                                fill="#E6AACE"
                                opacity="0.6"
                                transform={`rotate(${rotation} 50 50)`}
                            />
                        ))}
                        <circle cx="50" cy="50" r="10" fill="#d4af37" opacity="0.8" />
                    </svg>
                </motion.div>

                {/* Bottom left petal */}
                <motion.div
                    className="absolute bottom-32 left-20 w-24 h-24"
                    animate={{
                        rotate: [0, -15, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                        <ellipse cx="50" cy="50" rx="20" ry="35" fill="#faf8f3" opacity="0.7" />
                        <ellipse cx="50" cy="50" rx="12" ry="20" fill="#f4e4c1" opacity="0.8" />
                    </svg>
                </motion.div>

                {/* Middle right ranunculus */}
                <motion.div
                    className="absolute top-1/2 right-32 w-28 h-28"
                    animate={{
                        rotate: [0, 8, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                        {/* Layered ranunculus petals */}
                        {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                            <ellipse
                                key={rotation}
                                cx="50"
                                cy="35"
                                rx="12"
                                ry="18"
                                fill={i % 2 === 0 ? '#FDF5E6' : '#F5E6D3'}
                                opacity="0.7"
                                transform={`rotate(${rotation} 50 50)`}
                            />
                        ))}
                        <circle cx="50" cy="50" r="8" fill="#8B4513" opacity="0.6" />
                    </svg>
                </motion.div>

                {/* Top left jasmine */}
                <motion.div
                    className="absolute top-40 left-1/4 w-20 h-20"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                        {[0, 72, 144, 216, 288].map((rotation) => (
                            <ellipse
                                key={rotation}
                                cx="50"
                                cy="30"
                                rx="10"
                                ry="15"
                                fill="#FFFFFF"
                                opacity="0.8"
                                transform={`rotate(${rotation} 50 50)`}
                            />
                        ))}
                        <circle cx="50" cy="50" r="6" fill="#D4AF37" opacity="0.9" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

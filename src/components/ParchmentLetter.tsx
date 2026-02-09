import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const PLACEHOLDER_LETTER = `My Dearest Love,

In the garden of my heart, you are the most exquisite bloom. Like the midnight jasmine that releases its sweetest fragrance under the stars, our love has flourished in the quiet moments, in the gentle whispers, in the tender glances we share.

Every petal that falls is a memory we've created together. Every thorn I've faced has been softened by your touch. You are the sunlight that makes me grow, the rain that nourishes my soul, and the earth that grounds me when the world feels uncertain.

I have watched our garden grow from a single seed of possibility into a magnificent landscape of shared dreams, laughter, and unwavering devotion. With you, every season is spring, every day is a new beginning, and every moment is a treasure.

As the moon watches over the midnight garden, I promise to watch over you. To nurture our love with patience, to tend to it with care, and to let it bloom wild and free, just as nature intended.

You are my forever spring, my eternal bloom, my midnight garden.

With all the love my heart can hold,
Forever Yours`;

export const ParchmentLetter = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end center'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div
            ref={ref}
            className="min-h-screen w-full flex items-center justify-center py-20 px-4 grain-filter bg-gradient-to-b from-cream to-cream-dark"
        >
            <motion.div
                style={{ opacity }}
                onViewportEnter={() => setIsVisible(true)}
                viewport={{ once: true, margin: '-100px' }}
                className="max-w-4xl w-full"
            >
                {/* Parchment container */}
                <div className="relative">
                    {/* Decorative corners */}
                    <div className="absolute -top-6 -left-6 w-16 h-16 opacity-30">
                        <svg viewBox="0 0 100 100">
                            <path d="M0 0 Q50 0 50 50 Q50 0 100 0" fill="#2d5f3f" />
                        </svg>
                    </div>
                    <div className="absolute -top-6 -right-6 w-16 h-16 opacity-30 rotate-90">
                        <svg viewBox="0 0 100 100">
                            <path d="M0 0 Q50 0 50 50 Q50 0 100 0" fill="#2d5f3f" />
                        </svg>
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 opacity-30 -rotate-90">
                        <svg viewBox="0 0 100 100">
                            <path d="M0 0 Q50 0 50 50 Q50 0 100 0" fill="#2d5f3f" />
                        </svg>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 opacity-30 rotate-180">
                        <svg viewBox="0 0 100 100">
                            <path d="M0 0 Q50 0 50 50 Q50 0 100 0" fill="#2d5f3f" />
                        </svg>
                    </div>

                    {/* Main parchment */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="parchment-texture bg-cream-light border-2 border-gold/30 rounded-lg shadow-2xl p-8 md:p-12 lg:p-16"
                        style={{
                            boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                        }}
                    >
                        {/* Letter content with typewriter effect */}
                        <div className="relative">
                            {/* Fountain pen cursor */}
                            <motion.div
                                className="absolute -left-8 top-0 w-6 h-6 opacity-50"
                                animate={isVisible ? {
                                    y: [0, 600],
                                } : {}}
                                transition={{
                                    duration: 8,
                                    ease: 'linear',
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="#2d5f3f" strokeWidth="2">
                                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                                    <path d="M2 2l7.586 7.586" />
                                </svg>
                            </motion.div>

                            {/* Animated text */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : {}}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="font-serif text-emerald-dark leading-relaxed"
                            >
                                {PLACEHOLDER_LETTER.split('\n\n').map((paragraph, pIndex) => (
                                    <motion.p
                                        key={pIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: pIndex * 0.3, duration: 0.8 }}
                                        className="mb-6 text-base md:text-lg"
                                        style={{
                                            textIndent: pIndex === 0 ? '2em' : '0',
                                        }}
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </motion.div>

                            {/* Signature */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 3, duration: 1 }}
                                className="mt-12 text-right"
                            >
                                <div className="inline-block">
                                    <svg width="200" height="60" viewBox="0 0 200 60">
                                        <motion.path
                                            d="M10 40 Q30 10 50 40 T90 40 Q110 20 130 40 T170 40"
                                            stroke="#2d5f3f"
                                            strokeWidth="2"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={isVisible ? { pathLength: 1 } : {}}
                                            transition={{ delay: 3.5, duration: 2 }}
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                        {/* Wax seal */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                            transition={{ delay: 4, duration: 0.8, type: 'spring' }}
                            className="absolute -bottom-8 right-12 w-16 h-16"
                        >
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="#d4af37" />
                                <circle cx="50" cy="50" r="35" fill="#b8941f" />
                                <path
                                    d="M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z"
                                    fill="#d4af37"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const LETTER_TEXT = `Dearest, TANJUM

Mere paas woh alfaaz hi nahi
jo tumhari ahmiyat bata sakein,
Kaise samjhaun duniya ko tum mere liye kya ho...

Tum sirf ek naam nahi, ek ehsaas ho,
jo har dhadkan ke saath chalta hai.

Main shayad keh na paun sab kuch,
par itna zaroor hai—
tum woh shakhs ho jisse mujhe be-panah mohabbat hai.

from, ADNAAN`;

export const GrowingLetter = () => {
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
            className="min-h-screen w-full flex items-center justify-center py-20 px-4 grain-filter"
            style={{ background: 'linear-gradient(to bottom, rgba(15, 30, 46, 0.8) 0%, rgba(26, 47, 63, 0.8) 100%)' }}
        >
            <motion.div
                style={{ opacity }}
                onViewportEnter={() => setIsVisible(true)}
                viewport={{ once: true, margin: '-100px' }}
                className="max-w-4xl w-full"
            >
                {/* Letter container with growing vine border */}
                <div className="relative">
                    {/* Animated vine border */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 800 1000"
                        preserveAspectRatio="none"
                    >
                        {/* Left vine */}
                        <motion.path
                            d="M 50 0 Q 30 100 50 200 Q 70 300 50 400 Q 30 500 50 600 Q 70 700 50 800 Q 30 900 50 1000"
                            stroke="#2d5f3f"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : {}}
                            transition={{ duration: 3, ease: 'easeInOut' }}
                        />

                        {/* Right vine */}
                        <motion.path
                            d="M 750 0 Q 770 100 750 200 Q 730 300 750 400 Q 770 500 750 600 Q 730 700 750 800 Q 770 900 750 1000"
                            stroke="#2d5f3f"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : {}}
                            transition={{ duration: 3, ease: 'easeInOut', delay: 0.2 }}
                        />

                        {/* Rose blooms along the vines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.g
                                key={`left-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
                            >
                                {/* Left side roses */}
                                <circle
                                    cx="50"
                                    cy={i * 200 + 100}
                                    r="12"
                                    fill="#E6AACE"
                                    opacity="0.8"
                                />
                                {[0, 60, 120, 180, 240, 300].map((angle) => (
                                    <ellipse
                                        key={angle}
                                        cx="50"
                                        cy={i * 200 + 88}
                                        rx="6"
                                        ry="10"
                                        fill="#faf8f3"
                                        opacity="0.9"
                                        transform={`rotate(${angle} 50 ${i * 200 + 100})`}
                                    />
                                ))}
                            </motion.g>
                        ))}

                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.g
                                key={`right-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.7 + i * 0.3, duration: 0.8 }}
                            >
                                {/* Right side roses */}
                                <circle
                                    cx="750"
                                    cy={i * 200 + 100}
                                    r="12"
                                    fill="#E6AACE"
                                    opacity="0.8"
                                />
                                {[0, 60, 120, 180, 240, 300].map((angle) => (
                                    <ellipse
                                        key={angle}
                                        cx="750"
                                        cy={i * 200 + 88}
                                        rx="6"
                                        ry="10"
                                        fill="#faf8f3"
                                        opacity="0.9"
                                        transform={`rotate(${angle} 750 ${i * 200 + 100})`}
                                    />
                                ))}
                            </motion.g>
                        ))}

                        {/* Small leaves */}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.ellipse
                                key={`leaf-left-${i}`}
                                cx={i % 2 === 0 ? '35' : '65'}
                                cy={i * 110 + 50}
                                rx="8"
                                ry="15"
                                fill="#4a7c59"
                                opacity="0.6"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 0.6 } : {}}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                transform={`rotate(${i % 2 === 0 ? -30 : 30} ${i % 2 === 0 ? '35' : '65'} ${i * 110 + 50})`}
                            />
                        ))}

                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.ellipse
                                key={`leaf-right-${i}`}
                                cx={i % 2 === 0 ? '735' : '765'}
                                cy={i * 110 + 50}
                                rx="8"
                                ry="15"
                                fill="#4a7c59"
                                opacity="0.6"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 0.6 } : {}}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                transform={`rotate(${i % 2 === 0 ? 30 : -30} ${i % 2 === 0 ? '735' : '765'} ${i * 110 + 50})`}
                            />
                        ))}
                    </svg>

                    {/* Main parchment */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="parchment border-2 border-gold/30 rounded-lg shadow-2xl p-8 md:p-12 lg:p-16 mx-8"
                        style={{
                            boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                        }}
                    >
                        {/* Letter content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : {}}
                            transition={{ delay: 1, duration: 1 }}
                            className="font-serif text-emerald-dark leading-relaxed"
                        >
                            {LETTER_TEXT.split('\n\n').map((paragraph, pIndex) => (
                                <motion.p
                                    key={pIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1 + pIndex * 0.3, duration: 0.8 }}
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
                            transition={{ delay: 3.5, duration: 1 }}
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
                                        transition={{ delay: 4, duration: 2 }}
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Wax seal */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                        transition={{ delay: 4.5, duration: 0.8, type: 'spring' }}
                        className="absolute -bottom-8 right-16 w-16 h-16"
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
                </div>
            </motion.div>
        </div>
    );
};

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface GrowthClockProps {
    startDate?: string;
}

export const GrowthClock = ({ startDate = '2025-11-24T00:00:00' }: GrowthClockProps) => {
    const [timeTogether, setTimeTogether] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    useEffect(() => {
        const calculateTimeTogether = () => {
            const difference = +new Date() - +new Date(startDate);

            if (difference > 0) {
                setTimeTogether({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeTogether();
        const timer = setInterval(calculateTimeTogether, 1000);

        return () => clearInterval(timer);
    }, [startDate]);

    // Calculate progress based on days (each full day = more progress)
    // Progress wraps around every 30 days for visual effect
    const progress = ((timeTogether.days % 30) / 30) * 100;

    return (
        <div ref={ref} className="min-h-screen w-full flex items-center justify-center py-20 px-4 grain-filter" style={{ background: 'rgba(10, 22, 40, 0.6)' }}>
            <motion.div
                style={{ scale, opacity }}
                className="relative"
            >
                {/* Glass container */}
                <div className="glass-morphism rounded-3xl p-12 md:p-16 shadow-2xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-cream-light text-center mb-4">
                        Growing Together
                    </h2>
                    <p className="font-serif text-lg text-gold text-center mb-12 italic">
                        Since November 24, 2025
                    </p>

                    {/* Circular progress with wreath */}
                    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-8">
                        {/* Background circle */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="none"
                                stroke="#ebe5d6"
                                strokeWidth="2"
                            />

                            {/* Progress circle */}
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                                strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                                className="transition-all duration-1000"
                            />

                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#d4af37" />
                                    <stop offset="100%" stopColor="#2d5f3f" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Wreath decoration */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                            {/* Leaves around the circle */}
                            {Array.from({ length: 12 }).map((_, i) => {
                                const angle = (i * 30 * Math.PI) / 180;
                                const x = 100 + 85 * Math.cos(angle);
                                const y = 100 + 85 * Math.sin(angle);
                                const shouldFill = (i / 12) * 100 < progress;

                                return (
                                    <motion.g
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: shouldFill ? 1 : 0.3,
                                            scale: shouldFill ? 1 : 0.8,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <ellipse
                                            cx={x}
                                            cy={y}
                                            rx="8"
                                            ry="12"
                                            fill={shouldFill ? '#2d5f3f' : '#ebe5d6'}
                                            transform={`rotate(${i * 30} ${x} ${y})`}
                                        />
                                    </motion.g>
                                );
                            })}
                        </svg>

                        {/* Center time display */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <TimeUnit value={timeTogether.days} label="Days" />
                                    <TimeUnit value={timeTogether.hours} label="Hours" />
                                    <TimeUnit value={timeTogether.minutes} label="Minutes" />
                                    <TimeUnit value={timeTogether.seconds} label="Seconds" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-serif text-xl md:text-2xl text-cream-light text-center italic">
                        And counting... forever 💝
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <motion.div
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-3xl md:text-4xl font-bold text-gold"
        >
            {String(value).padStart(2, '0')}
        </motion.div>
        <div className="font-sans text-xs md:text-sm text-emerald uppercase tracking-wider mt-1">
            {label}
        </div>
    </div>
);

import { motion } from 'framer-motion';
import { Volume2, X } from 'lucide-react';
import { useState } from 'react';

export const VinylPlayer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    const togglePlayer = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsSpinning(true);
        }
    };

    return (
        <>
            {/* Vinyl disc button - fixed position */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="fixed bottom-8 right-8 z-50"
            >
                {/* Glass container */}
                <div className="glass-morphism rounded-full p-4 shadow-2xl">
                    <div className="relative">
                        {/* Vinyl disc */}
                        <motion.div
                            animate={{ rotate: isSpinning ? 360 : 0 }}
                            transition={{
                                duration: 3,
                                repeat: isSpinning ? Infinity : 0,
                                ease: 'linear',
                            }}
                            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-emerald-dark to-emerald cursor-pointer"
                            onClick={togglePlayer}
                        >
                            {/* Vinyl grooves */}
                            <div className="absolute inset-0 rounded-full">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 rounded-full border border-emerald-dark/20"
                                        style={{
                                            margin: `${i * 2}px`,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Center label */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-emerald-dark" />
                                </div>
                            </div>

                            {/* Hover overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-emerald-dark/50 rounded-full"
                            >
                                <Volume2 className="w-8 h-8 text-cream-light" />
                            </motion.div>
                        </motion.div>

                        {/* Sound waves indicator */}
                        {isSpinning && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <div className="flex gap-1">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                height: ['8px', '16px', '8px'],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                            className="w-1 bg-gold rounded-full"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Volume icon badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isSpinning ? 1 : 0 }}
                        className="absolute -top-2 -left-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center"
                    >
                        <Volume2 className="w-3 h-3 text-emerald-dark" />
                    </motion.div>
                </div>

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
                >
                    <div className="glass-morphism px-4 py-2 rounded-lg">
                        <p className="font-serif text-sm text-emerald-dark">
                            {isOpen ? 'Our Song' : 'Play Our Song'}
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Spotify player modal */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 flex items-center justify-center p-4"
                    onClick={togglePlayer}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-emerald-dark/80 backdrop-blur-sm" />

                    {/* Player container */}
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative z-10 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="glass-morphism rounded-3xl p-6 shadow-2xl border border-gold/30">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-serif text-2xl text-cream-light">
                                    Our Song 🎵
                                </h3>
                                <button
                                    onClick={togglePlayer}
                                    className="w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-cream-light" />
                                </button>
                            </div>

                            {/* Spotify embed */}
                            <div className="rounded-2xl overflow-hidden">
                                <iframe
                                    style={{ borderRadius: '12px' }}
                                    src="https://open.spotify.com/embed/track/6G8vN5EUtcDxOXOXadF6kp?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

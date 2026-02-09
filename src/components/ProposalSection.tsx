import { motion } from 'framer-motion';
import { useState } from 'react';
import { FloralExplosion } from './FloralExplosion.tsx';

export const ProposalSection = () => {
    const [showExplosion, setShowExplosion] = useState(false);
    const [answered, setAnswered] = useState(false);

    const handleYes = () => {
        setShowExplosion(true);
        setAnswered(true);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-20 px-4 grain-filter" style={{ background: 'linear-gradient(to bottom, rgba(10, 22, 40, 0.7) 0%, rgba(26, 47, 63, 0.9) 100%)' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-3xl w-full text-center"
            >
                {!answered ? (
                    <>
                        {/* Question */}
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                            className="mb-12"
                        >
                            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-emerald-dark mb-6">
                                Will you be my Valentine?
                            </h2>
                            <p className="font-serif text-xl md:text-2xl text-emerald italic">
                                Let our garden bloom together, forever
                            </p>
                        </motion.div>

                        {/* Decorative flowers */}
                        <div className="relative mb-12">
                            <div className="absolute left-1/4 -top-8 w-16 h-16 opacity-30">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="30" fill="#d4af37" />
                                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                                        <ellipse
                                            key={angle}
                                            cx="50"
                                            cy="30"
                                            rx="12"
                                            ry="20"
                                            fill="#faf8f3"
                                            transform={`rotate(${angle} 50 50)`}
                                        />
                                    ))}
                                </svg>
                            </div>
                            <div className="absolute right-1/4 -top-8 w-16 h-16 opacity-30">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="30" fill="#d4af37" />
                                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                                        <ellipse
                                            key={angle}
                                            cx="50"
                                            cy="30"
                                            rx="12"
                                            ry="20"
                                            fill="#faf8f3"
                                            transform={`rotate(${angle} 50 50)`}
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full max-w-3xl mx-auto mt-8">
                            {/* Yes button column */}
                            <div className="flex justify-center items-center">
                                <motion.button
                                    onClick={handleYes}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gold hover:bg-gold-light px-12 py-6 rounded-full font-serif text-2xl md:text-3xl font-bold text-cream-light shadow-xl transition-colors"
                                >
                                    Yes
                                </motion.button>
                            </div>

                            {/* No button column */}
                            <div className="relative flex justify-center items-center min-h-[150px]">
                                <NoButton />
                            </div>
                        </div>

                        {/* Hint text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="mt-8 font-serif text-sm text-emerald/60 italic"
                        >
                            (You know there's only one right answer... ✨)
                        </motion.p>
                    </>
                ) : (
                    /* Success message */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="glass-morphism rounded-3xl p-12 md:p-16"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: 3,
                            }}
                            className="text-6xl md:text-8xl mb-6"
                        >
                            💐
                        </motion.div>
                        <h3 className="font-serif text-4xl md:text-5xl text-emerald-dark mb-4">
                            Forever Blooming!
                        </h3>
                        <p className="font-serif text-xl md:text-2xl text-emerald italic">
                            Our garden will flourish for eternity
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* Floral explosion overlay */}
            {showExplosion && <FloralExplosion />}
        </div>
    );
};

// No button that jumps around when you try to hover over it
const NoButton = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [attempts, setAttempts] = useState(0);

    const jumpAway = () => {
        setAttempts(prev => prev + 1);

        // Random position within the column bounds only
        const maxX = 80;
        const maxY = 60;

        const newX = (Math.random() - 0.5) * maxX;
        const newY = (Math.random() - 0.5) * maxY;

        setPosition({ x: newX, y: newY });
    };

    return (
        <motion.div
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15,
            }}
            className="absolute"
        >
            <motion.button
                onMouseEnter={jumpAway}
                onTouchStart={jumpAway}
                whileHover={{ scale: 0.95 }}
                className="bg-emerald hover:bg-emerald-dark px-12 py-6 rounded-full font-serif text-2xl md:text-3xl font-bold text-cream-light shadow-xl transition-colors cursor-pointer"
            >
                {attempts === 0 && 'No'}
                {attempts === 1 && 'No...?'}
                {attempts === 2 && 'Wait...'}
                {attempts === 3 && 'Stop!'}
                {attempts === 4 && 'Please?'}
                {attempts >= 5 && '😢'}
            </motion.button>
        </motion.div>
    );
};


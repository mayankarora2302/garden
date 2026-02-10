import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';

// Sweet love messages - each photo reveals a random romantic message
const MEMORIES = [
    {
        image: '/memories/pic1.jpeg',
        message: 'In a garden of a thousand flowers, you are the one that caught my eye. Every moment with you feels like a beautiful dream I never want to wake from.',
    },
    {
        image: '/memories/pic2.jpeg',
        message: 'You are my today and all of my tomorrows. With you, I have found my forever home in your heart.',
    },
    {
        image: '/memories/pic3.jpeg',
        message: 'Like the moon loves the stars, like the sun loves the dawn - that\'s how deeply I love you. You are my light in every darkness.',
    },
    {
        image: '/memories/pic4.jpeg',
        message: 'Every love story is beautiful, but ours is my favorite. You make my heart bloom in ways I never knew were possible.',
    },
    {
        image: '/memories/pic5.jpeg',
        message: 'I choose you. And I\'ll choose you over and over, without pause, without doubt, in a heartbeat. You are my always.',
    },
    {
        image: '/memories/pic6.jpeg',
        message: 'You are the poem I never knew how to write, and this life is the story I have always wanted to tell. Forever grateful for you.',
    },
];

export const PetalGallery = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="min-h-screen w-full py-20 px-4 md:px-8 grain-filter" style={{ background: 'linear-gradient(to bottom, rgba(15, 30, 46, 0.6) 0%, rgba(26, 47, 63, 0.7) 100%)' }}>
            <motion.div style={{ opacity }}>
                <h2 className="font-serif text-4xl md:text-6xl text-cream-light text-center mb-4">
                    Moments in Bloom
                </h2>
                <p className="font-serif text-xl text-gold text-center mb-16 italic">
                    Click each memory to relive our journey together
                </p>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MEMORIES.map((memory, index) => (
                        <PetalImage
                            key={index}
                            memory={memory}
                            onClick={() => setSelectedMemory(index)}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Memory Modal */}
            <AnimatePresence>
                {selectedMemory !== null && (
                    <MemoryModal
                        memory={MEMORIES[selectedMemory]}
                        onClose={() => setSelectedMemory(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const PetalImage = ({ memory, onClick }: { memory: typeof MEMORIES[0]; onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Random values for natural petal fall
    const randomRotation = Math.random() * 20 - 10;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 8 + Math.random() * 4;

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: -50,
                rotate: randomRotation,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
            }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                delay: randomDelay,
                duration: 1,
            }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 10,
            }}
            onClick={onClick}
            className="group relative aspect-[3/4] cursor-pointer"
        >
            {/* Floating animation */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [randomRotation, randomRotation + 5, randomRotation],
                }}
                transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-full h-full"
            >
                {/* Glass frame */}
                <div className="relative w-full h-full glass-morphism rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    {/* Image */}
                    <img
                        src={memory.image}
                        alt="A cherished memory"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-emerald-dark/90 via-emerald-dark/50 to-transparent flex items-end p-6"
                    >
                        <div className="text-cream-light">
                            <p className="font-serif text-2xl mb-2">A Memory</p>
                            <p className="font-sans text-sm opacity-90">Click to reveal ✨</p>
                        </div>
                    </motion.div>

                    {/* Decorative corner */}
                    <div className="absolute top-4 right-4 w-8 h-8 opacity-50">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L13 9L20 10L13 11L12 18L11 11L4 10L11 9L12 2Z"
                                fill="#d4af37"
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>

            {/* Petal particles on hover */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: '10%',
                        }}
                        animate={{
                            y: [0, 100],
                            x: [0, (i - 1) * 20],
                            rotate: [0, 360],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    >
                        <svg viewBox="0 0 20 20">
                            <ellipse cx="10" cy="10" rx="4" ry="8" fill="#faf8f3" opacity="0.6" />
                        </svg>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

const MemoryModal = ({ memory, onClose }: { memory: typeof MEMORIES[0]; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-gradient-to-br from-cream-light to-cream rounded-3xl overflow-hidden shadow-2xl"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-emerald-dark/80 hover:bg-emerald-dark rounded-full flex items-center justify-center transition-colors"
                >
                    <X className="w-6 h-6 text-cream-light" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image side */}
                    <div className="relative h-64 md:h-auto">
                        <img
                            src={memory.image}
                            alt="A special moment"
                            className="w-full h-full object-cover"
                        />
                        {/* Decorative overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream-light/20" />
                    </div>

                    {/* Content side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        {/* Decorative flower */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="w-16 h-16 mb-6"
                        >
                            <svg viewBox="0 0 100 100">
                                {[0, 60, 120, 180, 240, 300].map((rotation) => (
                                    <ellipse
                                        key={rotation}
                                        cx="50"
                                        cy="30"
                                        rx="12"
                                        ry="20"
                                        fill="#E6AACE"
                                        opacity="0.7"
                                        transform={`rotate(${rotation} 50 50)`}
                                    />
                                ))}
                                <circle cx="50" cy="50" r="10" fill="#d4af37" />
                            </svg>
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-4xl md:text-5xl text-emerald-dark mb-8"
                        >
                            For You
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="font-serif text-lg md:text-xl text-emerald leading-relaxed"
                        >
                            {memory.message}
                        </motion.p>

                        {/* Decorative flourish */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-8 h-px bg-gradient-to-r from-gold via-gold to-transparent"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

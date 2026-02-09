import { motion } from 'framer-motion';
import { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // You can customize the password here
        if (password === '24/11/25' || password === '241125') {
            onLogin();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => {
                setShake(false);
                setError(false);
            }, 820);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center grain-filter"
            style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f3f 50%, #1a4d2e 100%)' }}>

            {/* Floating petals in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: -50,
                            rotate: Math.random() * 360,
                        }}
                        animate={{
                            y: window.innerHeight + 50,
                            rotate: Math.random() * 360 + 360,
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'linear',
                        }}
                    >
                        <svg width="30" height="30" viewBox="0 0 20 20">
                            <ellipse
                                cx="10"
                                cy="10"
                                rx="6"
                                ry="10"
                                fill="#d4af37"
                                opacity="0.3"
                            />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Main login card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 max-w-md w-full mx-4"
            >
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-emerald/20 rounded-3xl blur-xl" />

                <div className="relative bg-cream-light/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gold/30 shadow-2xl">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        {/* Decorative flower */}
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="inline-block mb-4"
                        >
                            <svg width="80" height="80" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="15" fill="#d4af37" />
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
                        </motion.div>

                        <h1 className="font-serif text-4xl md:text-5xl text-cream-light mb-3">
                            A Token of Love
                        </h1>
                        <p className="font-serif text-xl text-gold italic">
                            ft. Adnaan & Tanjum
                        </p>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="3" fill="#d4af37" />
                        </svg>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    </div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        animate={shake ? {
                            x: [0, -10, 10, -10, 10, 0],
                        } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block font-serif text-cream-light text-lg mb-3"
                            >
                                Enter the secret garden
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`w-full px-6 py-4 bg-cream-light/5 border-2 rounded-2xl font-sans text-cream-light placeholder-cream/40 focus:outline-none focus:border-gold transition-all ${error ? 'border-red-400' : 'border-gold/30'
                                    }`}
                                autoFocus
                            />
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-red-400 text-sm font-sans"
                                >
                                    The garden remains locked... try again 🌹
                                </motion.p>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold px-8 py-4 rounded-2xl font-serif text-xl font-bold text-emerald-dark shadow-lg transition-all"
                        >
                            Unlock the Garden
                        </motion.button>
                    </motion.form>

                    {/* Hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 text-center text-cream/50 text-sm font-serif italic"
                    >
                        Where love blooms eternal ✨
                    </motion.p>
                </div>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 opacity-20">
                <svg width="60" height="60" viewBox="0 0 100 100">
                    <path d="M50 10 Q30 30 10 50 Q30 70 50 90 Q70 70 90 50 Q70 30 50 10" fill="#d4af37" />
                </svg>
            </div>
            <div className="absolute bottom-8 right-8 opacity-20">
                <svg width="60" height="60" viewBox="0 0 100 100">
                    <path d="M50 10 Q30 30 10 50 Q30 70 50 90 Q70 70 90 50 Q70 30 50 10" fill="#d4af37" />
                </svg>
            </div>
        </div>
    );
};

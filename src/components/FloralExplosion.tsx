import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Petal {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    color: string;
    velocityX: number;
    velocityY: number;
    rotationSpeed: number;
}

export const FloralExplosion = () => {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        // Generate petals
        const colors = ['#faf8f3', '#f5f1e8', '#d4af37', '#f4e4c1'];
        const newPetals: Petal[] = [];

        for (let i = 0; i < 100; i++) {
            const angle = (Math.PI * 2 * i) / 100;
            const velocity = 5 + Math.random() * 10;

            newPetals.push({
                id: i,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                velocityX: Math.cos(angle) * velocity,
                velocityY: Math.sin(angle) * velocity,
                rotationSpeed: (Math.random() - 0.5) * 20,
            });
        }

        setPetals(newPetals);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    initial={{
                        x: petal.x,
                        y: petal.y,
                        rotate: petal.rotation,
                        scale: 0,
                        opacity: 1,
                    }}
                    animate={{
                        x: petal.x + petal.velocityX * 100,
                        y: petal.y + petal.velocityY * 100 + 500, // Add gravity
                        rotate: petal.rotation + petal.rotationSpeed * 100,
                        scale: petal.scale,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 3,
                        ease: 'easeOut',
                    }}
                    className="absolute"
                    style={{
                        width: '20px',
                        height: '20px',
                    }}
                >
                    <svg viewBox="0 0 20 20" className="w-full h-full">
                        <ellipse
                            cx="10"
                            cy="10"
                            rx="6"
                            ry="10"
                            fill={petal.color}
                            opacity="0.8"
                        />
                    </svg>
                </motion.div>
            ))}

            {/* Additional sparkles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    initial={{
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                        scale: 0,
                        opacity: 1,
                    }}
                    animate={{
                        x: window.innerWidth / 2 + (Math.random() - 0.5) * 800,
                        y: window.innerHeight / 2 + (Math.random() - 0.5) * 800,
                        scale: [0, 1, 0],
                        opacity: 0,
                    }}
                    transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                    }}
                    className="absolute"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                            fill="#d4af37"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

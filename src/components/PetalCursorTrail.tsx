import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Petal {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    velocityX: number;
    velocityY: number;
    color: string;
}

export const PetalCursorTrail = () => {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        let petalId = 0;
        let lastSpawnTime = 0;

        const handleMouseMove = (e: MouseEvent) => {

            const now = Date.now();
            // Spawn petals more frequently (every 50ms instead of 100ms)
            if (now - lastSpawnTime > 50) {
                const colors = ['#E6AACE', '#faf8f3', '#f4e4c1', '#FFE4E1', '#d4af37'];
                const newPetal: Petal = {
                    id: petalId++,
                    x: e.clientX,
                    y: e.clientY,
                    rotation: Math.random() * 360,
                    scale: 0.8 + Math.random() * 0.7, // Larger petals
                    velocityX: (Math.random() - 0.5) * 3,
                    velocityY: 2 + Math.random() * 3, // Slower fall
                    color: colors[Math.floor(Math.random() * colors.length)],
                };

                setPetals((prev) => [...prev.slice(-30), newPetal]); // Keep last 30 petals (more visible trail)
                lastSpawnTime = now;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Only show on desktop
    if (window.innerWidth < 768) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-40">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    initial={{
                        x: petal.x,
                        y: petal.y,
                        rotate: petal.rotation,
                        scale: 0,
                        opacity: 0.9,
                    }}
                    animate={{
                        x: petal.x + petal.velocityX * 60,
                        y: petal.y + petal.velocityY * 150,
                        rotate: petal.rotation + 360,
                        scale: petal.scale,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 3, // Longer animation (3s instead of 2s)
                        ease: 'easeOut',
                    }}
                    className="absolute"
                    style={{
                        width: '20px', // Larger petals
                        height: '20px',
                    }}
                >
                    <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-md">
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
        </div>
    );
};

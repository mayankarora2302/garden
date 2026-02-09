import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Only show on desktop
    if (window.innerWidth < 768) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                }}
            />

            {/* Trailing sparkle */}
            <motion.div
                className="cursor-sparkle"
                animate={{
                    x: mousePosition.x - 12,
                    y: mousePosition.y - 12,
                    opacity: isVisible ? 0.6 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                        fill="#d4af37"
                        opacity="0.6"
                    />
                </svg>
            </motion.div>
        </>
    );
};

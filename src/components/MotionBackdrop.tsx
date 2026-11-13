import {useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import backdropImage from '../assets/images/medical_billing_backdrop_1794605582805.jpg';

export function MotionBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]"
    >
      {!imageFailed ? (
        <motion.img
          src={backdropImage}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          initial={{scale: 1.04, x: 0, y: 0}}
          animate={
            shouldReduceMotion
              ? {scale: 1.04, x: 0, y: 0}
              : {
                  scale: [1.04, 1.11, 1.06, 1.04],
                  x: [0, -18, 12, 0],
                  y: [0, -12, 8, 0],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="h-full w-full object-cover object-center opacity-45 will-change-transform"
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(circle_at_75%_25%,rgba(21,128,61,0.22),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(21,128,61,0.12),transparent_50%)]" />
      )}

      {/* Measured dark contrast scrim to preserve WCAG AA text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/60 to-[#050505]/95" />
    </div>
  );
}

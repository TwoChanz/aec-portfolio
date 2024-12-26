'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function DynamicBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 }
  const animatedY = useSpring(backgroundY, springConfig)

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 z-[-1]"
      style={{
        opacity,
        y: animatedY,
        background: `
          radial-gradient(circle at top left, #1a1f35, transparent 50%),
          radial-gradient(circle at top right, #3B82F6, transparent 50%),
          radial-gradient(circle at bottom left, #2DD4BF, transparent 50%),
          radial-gradient(circle at bottom right, #1a1f35, transparent 50%)
        `,
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  )
}


'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function AnimatedHero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.section 
      className="text-center py-20 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ y: useTransform(y, (value) => `${parseFloat(value) * -0.5}%`) }}
      >
        Innovative AEC Solutions
      </motion.h1>
      <motion.p 
        className="text-xl mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ y: useTransform(y, (value) => `${parseFloat(value) * -0.2}%`) }}
      >
        Transforming skylines and infrastructure with award-winning, sustainable designs.
        Explore our key projects that are shaping the future of architecture and engineering.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <a href="#projects" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold">
          Explore Projects
        </a>
      </motion.div>
    </motion.section>
  )
}


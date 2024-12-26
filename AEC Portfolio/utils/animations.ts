'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeInUp = (element: Element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

export const staggerFadeIn = (elements: Element[]) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
    }
  )
}


import React, { useEffect, useRef } from 'react'

interface ExplosionAnimationProps {
  isVisible: boolean
}

const ExplosionAnimation: React.FC<ExplosionAnimationProps> = ({ isVisible }) => {
  const explosionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && explosionRef.current) {
      const container = explosionRef.current
      const items = Array.from(container.querySelectorAll<HTMLImageElement>('.explosion-item'))

      // Reset and pre-compute radial targets using CSS variables
      const rect = container.getBoundingClientRect()
      const baseRadius = Math.max(rect.width, rect.height) * 0.55 // slightly further from center

      items.forEach((item, index) => {
        item.classList.remove('animate')

        // Evenly distribute angles with a bit of jitter
        const angleBase = (index / items.length) * Math.PI * 2
        const jitter = (Math.random() - 0.5) * (Math.PI / items.length) * 1.5
        const angle = angleBase + jitter

        // Randomize radius with wider spread
        const radius = baseRadius * (0.5 + Math.random() * 0.90) // 50% - 130% of base

        const dx = Math.cos(angle) * radius
        const dy = Math.sin(angle) * radius
        const rot = (Math.random() * 70 - 35).toFixed(2) // -35deg..35deg
        const dur = (1.2 + Math.random() * 0.6).toFixed(2) + 's' // 1.2s..1.8s slower

        item.style.setProperty('--dx', dx.toFixed(2) + 'px')
        item.style.setProperty('--dy', dy.toFixed(2) + 'px')
        item.style.setProperty('--rot', rot + 'deg')
        item.style.setProperty('--dur', dur)
      })

      // Trigger all animations at the same time (after brief paint)
      setTimeout(() => {
        items.forEach((item) => item.classList.add('animate'))
      }, 80)
    }
  }, [isVisible])

  return (
    <div className="explosion-container" ref={explosionRef}>
      {/* Lots of stars */}
      <img src="/images/star.png" alt="Star" className="explosion-item item-1" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-2" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-3" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-4" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-5" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-6" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-7" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-8" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-9" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-10" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-11" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-12" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-13" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-14" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-15" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-16" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-17" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-18" />
      <img src="/images/star.png" alt="Star" className="explosion-item item-19" />
      <img src="/images/star2.png" alt="Star 2" className="explosion-item item-20" />
    </div>
  )
}

export default ExplosionAnimation

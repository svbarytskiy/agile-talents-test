import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const skills = [
  'React',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'Express',
  'CSS',
  'GraphQL',
  'Redux',
  'PostgreSQL',
]

const colorSets = [
  { bg: '#e9f0ff', text: '#1e3a8a' },
  { bg: '#f3e8ff', text: '#6b21a8' },
]

export const TagCloudChaotic = () => {
  const [tags, setTags] = useState(
    skills.map(tag => {
      const set = colorSets[Math.floor(Math.random() * colorSets.length)]
      const yOffset = Math.random() * 8 - 5
      return { tag, ...set, yOffset }
    }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTags(prev =>
        [...prev]
          .sort(() => Math.random() - 0.5)
          .map(t => ({ ...t, yOffset: Math.random() * 8 - 20 })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-80 h-50 p-4 rounded-2xl flex flex-wrap justify-center items-center gap-4">
      <AnimatePresence>
        {tags.map(({ tag, bg, text, yOffset }) => (
          <motion.span
            key={tag}
            layout
            animate={{ y: yOffset }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{
              backgroundColor: bg,
              color: text,
            }}
            className="px-4 py-2 rounded-full shadow cursor-default"
          >
            {tag}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

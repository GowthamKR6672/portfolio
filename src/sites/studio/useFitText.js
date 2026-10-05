import { useLayoutEffect, useState } from 'react'

// Font size (px) that makes `text` exactly fill `width` in the given font.
export default function useFitText(text, width, font) {
  const [size, setSize] = useState(0)
  useLayoutEffect(() => {
    if (!width) return
    const measure = () => {
      const c = document.createElement('canvas').getContext('2d')
      c.font = `${font.weight} ${font.stretch} 100px ${font.family}`
      const w = c.measureText(text).width
      if (w) setSize((100 * width) / w)
    }
    measure()
    document.fonts?.ready.then(measure)
  }, [text, width, font.weight, font.stretch, font.family])
  return size
}

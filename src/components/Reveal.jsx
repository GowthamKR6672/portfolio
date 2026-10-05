import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ease } from '../lib/motion.js'

export function Reveal({ children, delay = 0, y = 36, className = '', as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </M>
  )
}

export function SectionHeading({ index, kicker, title, children }) {
  const words = title.split(' ')
  return (
    <header className="sec-head">
      <Reveal className="sec-head__kicker" y={12}>
        <span className="sec-head__index">{index}</span>
        <span className="sec-head__line" />
        {kicker}
      </Reveal>
      <motion.h2 className="sec-head__title" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="mask">
              <motion.span
                className="mask__inner"
                variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, delay: i * 0.06, ease } } }}
              >
                {w}
              </motion.span>
            </span>{' '}
          </Fragment>
        ))}
      </motion.h2>
      {children && (
        <Reveal className="sec-head__sub" delay={0.15}>
          {children}
        </Reveal>
      )}
    </header>
  )
}

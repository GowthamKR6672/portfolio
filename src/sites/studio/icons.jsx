// Small filled glyphs in the Studio style (solid shapes, read well at 12–20px).
const paths = {
  home: <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" />,
  user: <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.6-9 6v2h18v-2c0-3.4-4-6-9-6Z" />,
  layers: <path d="m12 2 10 5-10 5L2 7l10-5Zm-7.6 9L12 15l7.6-4L22 12l-10 5-10-5 2.4-1Zm0 5L12 20l7.6-4L22 17l-10 5-10-5 2.4-1Z" />,
  stack: <path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z" />,
  code: <path d="M8.6 6.4 3 12l5.6 5.6 1.4-1.4L5.8 12 10 7.8 8.6 6.4Zm6.8 0L14 7.8 18.2 12 14 16.2l1.4 1.4L21 12l-5.6-5.6Z" />,
  badge: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.4-5.4 1.4 1.4-6.8 6.8Z" />,
  help: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 16h-2v-2h2v2Zm2.1-7.7-.9.9c-.7.7-1.2 1.3-1.2 2.8h-2v-.5c0-1.1.5-2.1 1.2-2.8l1.2-1.3c.4-.3.6-.8.6-1.4a2 2 0 0 0-4 0H7a5 5 0 0 1 10 0c0 .9-.4 1.7-.9 2.3Z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  grid: <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />,
  chart: <path d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z" />,
  flow: <path d="M6 3a3 3 0 0 0-1 5.8V15a3 3 0 1 0 2 0v-2h6a4 4 0 0 0 4-4V8.8A3 3 0 1 0 15 8.8V9a2 2 0 0 1-2 2H7V8.8A3 3 0 0 0 6 3Z" />,
  heart: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z" />,
  pin: <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />,
  phone: <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 17.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM8 5v10h8V5H8Z" />,
  server: <path d="M4 3h16v7H4V3Zm0 11h16v7H4v-7Zm3-8v1h2V6H7Zm0 11v1h2v-1H7Z" />,
  check: <path d="m9.5 16.2-4.2-4.2-1.4 1.4 5.6 5.6 11-11-1.4-1.4z" />,
  plus: <path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z" />,
  arrow: <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  quote: <path d="M4 11c0-3.3 2-6 5-7l1 2c-1.8.8-3 2.3-3 4h3v7H4v-6Zm9 0c0-3.3 2-6 5-7l1 2c-1.8.8-3 2.3-3 4h3v7h-6v-6Z" />,
  info: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />,
}

export function Icon({ name, size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {paths[name] || paths.grid}
    </svg>
  )
}

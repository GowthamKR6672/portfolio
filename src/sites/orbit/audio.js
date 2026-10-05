// Generated ambient soundtrack for Orbit: a slow drone plus filtered "wind"
// that swells while descending through the atmosphere. No audio files.
export function createAmbience() {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  const ctx = new AC()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  // Drone: detuned low partials through a slowly breathing low-pass filter.
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 520
  filter.Q.value = 0.7
  filter.connect(master)
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.05
  lfoGain.gain.value = 260
  lfo.connect(lfoGain).connect(filter.frequency)
  lfo.start()
  ;[
    [55, 'sine', 0.16, -4],
    [82.4, 'sine', 0.1, 5],
    [110, 'triangle', 0.035, -7],
    [164.8, 'sine', 0.025, 3],
  ].forEach(([f, type, gain, detune]) => {
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.value = f
    o.detune.value = detune
    const g = ctx.createGain()
    g.gain.value = gain
    o.connect(g).connect(filter)
    o.start()
  })

  // Wind: looped noise through a band-pass filter.
  const len = ctx.sampleRate * 2
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  const noise = ctx.createBufferSource()
  noise.buffer = buf
  noise.loop = true
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 700
  band.Q.value = 0.6
  const wind = ctx.createGain()
  wind.gain.value = 0.01
  noise.connect(band).connect(wind).connect(master)
  noise.start()

  let on = false
  return {
    get on() {
      return on
    },
    async setOn(v) {
      on = v
      if (ctx.state === 'suspended') await ctx.resume()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(v ? 0.32 : 0, ctx.currentTime, v ? 1.2 : 0.3)
    },
    // 0..1 — more air rushing past while in the clouds.
    setWind(v) {
      wind.gain.setTargetAtTime(0.01 + v * 0.16, ctx.currentTime, 0.4)
      band.frequency.setTargetAtTime(500 + v * 900, ctx.currentTime, 0.4)
    },
    close() {
      ctx.close()
    },
  }
}

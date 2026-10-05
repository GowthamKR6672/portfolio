import { profile } from '../data/resume.js'
import TiltCard from './TiltCard.jsx'
import { GitHub, Pin } from './Icons.jsx'

// A tilting "developer ID" card with a holographic foil that follows the cursor.
export default function HoloCard() {
  return (
    <TiltCard className="holo" max={18}>
      <span className="holo__foil" aria-hidden="true" />
      <span className="holo__grid" aria-hidden="true" />
      <div className="holo__top">
        <span className="holo__chip" aria-hidden="true" />
        <span className="holo__brand">DEVELOPER ID</span>
      </div>
      <div className="holo__mono" aria-hidden="true">
        GKR
      </div>
      <div className="holo__id">
        <strong>{profile.name}</strong>
        <span>Full-Stack Developer · Process Analyst</span>
      </div>
      <dl className="holo__meta">
        <div>
          <dt>Currently</dt>
          <dd>{profile.current.company}</dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>
            <Pin width={12} height={12} /> Erode, IN
          </dd>
        </div>
      </dl>
      <div className="holo__foot">
        <span>
          <GitHub width={13} height={13} /> {profile.githubUser}
        </span>
        <span className="holo__barcode" aria-hidden="true" />
      </div>
    </TiltCard>
  )
}

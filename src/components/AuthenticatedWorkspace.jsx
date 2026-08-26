import { AlertTriangle, BadgeCheck, Car, ChevronRight, FileClock, LogOut, ShieldCheck, UserRound } from 'lucide-react'
import { getCopy } from '../data/copy'
import { MOCK_SYSTEM_DB } from '../data/mockSystem'
import { Button } from './ui/button'

export function AuthenticatedWorkspace({ session, language, onSignOut }) {
  const t = getCopy(language)
  const isExisting = session.kind === 'existing'
  const existing = MOCK_SYSTEM_DB.existingOfflineUser

  return (
    <main className="workspace-main">
      <section className="workspace-head">
        <div>
          <p className="eyebrow">{t.verified}</p>
          <h1>{isExisting ? t.welcomeExisting : t.welcomeNew}</h1>
          <p>{isExisting ? t.currentRecords : t.readyLL}</p>
        </div>
        <Button variant="outline" onClick={onSignOut}><LogOut size={17} /> {t.signOut}</Button>
      </section>

      {!isExisting ? (
        <section className="new-workspace-card">
          <div className="workspace-success-icon"><BadgeCheck size={31} /></div>
          <div>
            <span className="status-pill status-green"><ShieldCheck size={13} /> {t.verified}</span>
            <h2>Identity profile connected</h2>
            <p><b>{session.profile.fullName}</b> · {session.profile.registeredMobile}<br />{session.profile.address}</p>
          </div>
          <div className="ll-next-panel">
            <FileClock size={23} />
            <div><strong>{t.llNext}</strong><p>The complete application wizard will begin here in the next build task.</p></div>
            <ChevronRight size={18} />
          </div>
        </section>
      ) : (
        <div className="workspace-grid">
          <section className="profile-card workspace-card">
            <span className="profile-avatar">RK</span>
            <div><p className="card-kicker">Connected identity</p><h2>{existing.profile.fullName}</h2><p>{existing.profile.registeredMobile}<br />{existing.profile.address}</p></div>
            <span className="status-pill status-green"><BadgeCheck size={13} /> Verified</span>
          </section>
          <section className="workspace-card licence-card">
            <div className="card-icon"><UserRound size={22} /></div>
            <p className="card-kicker">Driving Licence</p><h2>{existing.drivingLicense.licenceType}</h2>
            <p>{existing.drivingLicense.dlNumber}<br />Valid until {existing.drivingLicense.expiryDate}</p>
            <span className="status-pill status-green">{existing.drivingLicense.status}</span>
          </section>
          <section className="workspace-card">
            <div className="card-icon"><Car size={22} /></div>
            <p className="card-kicker">Vehicle</p><h2>{existing.vehicles[0].modelName}</h2>
            <p>{existing.vehicles[0].registrationNumber}<br />PUCC renewal due soon</p>
            <span className="status-pill status-amber"><AlertTriangle size={13} /> Due 28 Aug</span>
          </section>
          <section className="workspace-card challan-card">
            <div className="card-icon"><AlertTriangle size={22} /></div>
            <p className="card-kicker">Open challan</p><h2>₹{existing.challans[0].amount.toLocaleString('en-IN')}</h2>
            <p>{existing.challans[0].reason}</p>
            <span className="status-pill status-red">{existing.challans[0].status}</span>
          </section>
        </div>
      )}
    </main>
  )
}

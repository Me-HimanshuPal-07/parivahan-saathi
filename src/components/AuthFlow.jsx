import { useMemo, useState } from 'react'
import { BadgeCheck, ChevronLeft, CreditCard, Fingerprint, KeyRound, LockKeyhole, Phone, ScanFace, ShieldCheck } from 'lucide-react'
import { DEMO_NEW_CITIZEN, MOCK_SYSTEM_DB } from '../data/mockSystem'
import { getCopy } from '../data/copy'
import { Button } from './ui/button'
import { Input } from './ui/input'

const icons = { phone: Phone, aadhaar: ScanFace, licence: CreditCard, pan: Fingerprint }

export function AuthFlow({ language, onAuthenticated, onBack }) {
  const t = getCopy(language)
  const [journey, setJourney] = useState('new')
  const [step, setStep] = useState('choose')
  const [method, setMethod] = useState('phone')
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [mpin, setMpin] = useState('')
  const [error, setError] = useState('')

  const methods = useMemo(() => [
    { id: 'phone', label: t.phone, placeholder: '98765 43210' },
    { id: 'aadhaar', label: t.aadhaar, placeholder: 'XXXX XXXX 1234' },
    { id: 'licence', label: t.licence, placeholder: 'DL-1420240098765' },
    { id: 'pan', label: t.pan, placeholder: 'ABCDE1234F' },
  ], [t])
  const selectedMethod = methods.find((item) => item.id === method)

  const goToOtp = () => {
    if (identifier.trim().length < 4) return setError(t.fieldRequired)
    setError('')
    setStep('otp')
  }
  const verifyOtp = () => {
    if (otp !== '123456') return setError(t.invalidOtp)
    onAuthenticated({
      kind: journey === 'existing' ? 'existing' : 'new',
      profile: journey === 'existing' ? MOCK_SYSTEM_DB.existingOfflineUser.profile : DEMO_NEW_CITIZEN,
      method,
    })
  }
  const verifyMpin = () => {
    if (mpin !== '4455') return setError(t.invalidMpin)
    onAuthenticated({ kind: 'existing', profile: MOCK_SYSTEM_DB.existingOfflineUser.profile, method: 'mpin' })
  }

  return (
    <section className="auth-layout" aria-labelledby="auth-title">
      <div className="auth-aside">
        <span className="auth-aside-icon"><ShieldCheck size={24} /></span>
        <p className="eyebrow">Secure demo access</p>
        <h2>Identity, explained—not complicated.</h2>
        <p>Every option is simulated safely in your browser. No Aadhaar, OTP, payment or government record is used.</p>
        <div className="auth-aside-steps">
          <span><b>1</b> Choose an identity method</span>
          <span><b>2</b> Verify locally with demo values</span>
          <span><b>3</b> Continue to your workspace</span>
        </div>
      </div>

      <div className="auth-card">
        {step !== 'choose' && (
          <button className="auth-back" type="button" onClick={() => { setError(''); setStep('choose') }}><ChevronLeft size={18} /> {t.back}</button>
        )}
        {step === 'choose' && (
          <>
            <button className="auth-back auth-back-home" type="button" onClick={onBack}><ChevronLeft size={18} /> {t.back}</button>
            <p className="eyebrow">{t.secureDemo}</p>
            <h1 id="auth-title">{t.authTitle}</h1>
            <p className="auth-intro">{t.authSubtitle}</p>
            <div className="journey-switch" role="group" aria-label="Account type">
              <button className={journey === 'new' ? 'journey-selected' : ''} type="button" onClick={() => setJourney('new')}>
                <BadgeCheck size={19} /><span><b>{t.newCitizen}</b><small>{t.newCitizenHelp}</small></span>
              </button>
              <button className={journey === 'existing' ? 'journey-selected' : ''} type="button" onClick={() => setJourney('existing')}>
                <KeyRound size={19} /><span><b>{t.existingCitizen}</b><small>{t.existingCitizenHelp}</small></span>
              </button>
            </div>
            <div className="method-title-row"><h2>{t.chooseMethod}</h2><button type="button" onClick={() => { setError(''); setStep('mpin') }}><LockKeyhole size={15} /> {t.mpin}</button></div>
            <div className="auth-methods">
              {methods.map((item) => {
                const Icon = icons[item.id]
                return <button type="button" className={method === item.id ? 'method-selected' : ''} onClick={() => setMethod(item.id)} key={item.id}><Icon size={21} />{item.label}</button>
              })}
            </div>
            <label className="form-label" htmlFor="identity-value">{selectedMethod.label}</label>
            <Input id="identity-value" value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder={selectedMethod.placeholder} />
            {error && <p className="form-error" role="alert">{error}</p>}
            <Button className="auth-continue" type="button" onClick={goToOtp}>{t.sendOtp}</Button>
            <p className="auth-safe-line"><ShieldCheck size={15} /> {t.secureDemo}</p>
          </>
        )}
        {step === 'otp' && (
          <>
            <span className="auth-step-icon"><Phone size={25} /></span>
            <p className="eyebrow">{selectedMethod.label}</p>
            <h1>{t.otpTitle}</h1>
            <p className="auth-intro">{t.otpSubtitle}</p>
            <label className="form-label" htmlFor="otp-value">OTP</label>
            <Input id="otp-value" className="otp-input" inputMode="numeric" maxLength="6" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="123456" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <Button className="auth-continue" type="button" onClick={verifyOtp}>{t.verifyOtp}</Button>
            <p className="auth-safe-line"><ShieldCheck size={15} /> {t.secureDemo}</p>
          </>
        )}
        {step === 'mpin' && (
          <>
            <span className="auth-step-icon"><KeyRound size={25} /></span>
            <p className="eyebrow">Returning citizen</p>
            <h1>{t.mpinTitle}</h1>
            <p className="auth-intro">{t.mpinSubtitle}</p>
            <div className="demo-credential"><span>{t.mpinHint}</span><small>For reviewer testing only</small></div>
            <label className="form-label" htmlFor="mpin-value">MPIN</label>
            <Input id="mpin-value" className="otp-input" inputMode="numeric" type="password" maxLength="4" value={mpin} onChange={(event) => setMpin(event.target.value.replace(/\D/g, ''))} placeholder="••••" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <Button className="auth-continue" type="button" onClick={verifyMpin}>{t.unlock}</Button>
            <p className="auth-safe-line"><ShieldCheck size={15} /> {t.secureDemo}</p>
          </>
        )}
      </div>
    </section>
  )
}

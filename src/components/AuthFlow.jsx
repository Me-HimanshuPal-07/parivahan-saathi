import { useMemo, useState } from "react";
import {
  ChevronLeft,
  CreditCard,
  Fingerprint,
  KeyRound,
  Phone,
  ScanFace,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { DEMO_NEW_CITIZEN, MOCK_SYSTEM_DB } from "../data/mockSystem";
import { copy } from "../data/copy";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const PERSONAS = {
  new: {
    kind: "new",
    name: "Himanshu",
    identifiers: {
      phone: "9876543210",
      aadhaar: "234567891098",
      pan: "ABCDE1234F",
      dl: "UP1420240012345",
    },
  },
  existing: {
    kind: "existing",
    name: "Varun",
    identifiers: {
      phone: "8765432109",
      aadhaar: "345678912109",
      pan: "PQRSX5678K",
      dl: "DL1420230098765",
    },
  },
};

const FIELD_ICON = {
  phone: Phone,
  aadhaar: ScanFace,
  pan: Fingerprint,
  dl: CreditCard,
};
const MOCK_OTP = "1234";

function detectType(raw) {
  const value = raw.replace(/\s/g, "");
  if (/^[6-9]\d{9}$/.test(value)) return "phone";
  if (/^\d{12}$/.test(value)) return "aadhaar";
  if (/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(value)) return "pan";
  if (value.length >= 8) return "dl";
  return null;
}

function findPersona(raw) {
  const value = raw.replace(/\s/g, "").toUpperCase();
  if (!value) return null;
  return (
    Object.values(PERSONAS).find((persona) =>
      Object.values(persona.identifiers).some(
        (id) => id.replace(/\s/g, "").toUpperCase() === value,
      ),
    ) ?? null
  );
}

export function AuthFlow({ language = "en", onAuthenticated, onBack }) {
  const t = copy[language] ?? copy.hinglish;

  const [step, setStep] = useState("identify");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [persona, setPersona] = useState(null);

  const detectedType = useMemo(() => detectType(value), [value]);

  const handleBack = () => {
    setError("");
    if (step === "otp") return setStep("identify");
    onBack();
  };

  const handleContinue = () => {
    if (value.trim().length < 4) return setError(t.fieldRequired);
    const matched = findPersona(value);
    setPersona(
      matched ?? {
        kind: "new",
        name: PERSONAS.new.name,
        identifiers: { [detectedType ?? "phone"]: value },
      },
    );
    setError("");
    setOtp("");
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp !== MOCK_OTP) return setError(t.invalidOtp);
    onAuthenticated({
      kind: persona.kind,
      profile:
        persona.kind === "existing"
          ? MOCK_SYSTEM_DB.existingOfflineUser.profile
          : DEMO_NEW_CITIZEN,
      method: detectedType ?? "phone",
    });
  };

  const fillFrom = (personaKey, field) => {
    setValue(PERSONAS[personaKey].identifiers[field]);
    setError("");
  };

  return (
    <section className="auth-layout" aria-labelledby="auth-title">
      <div className="auth-aside">
        <span className="auth-aside-icon">
          <ShieldCheck size={24} />
        </span>
        <p className="eyebrow">{t.asideEyebrow}</p>
        <h2>{t.asideHeading}</h2>
        <p>{t.asideBody}</p>
        <div className="auth-aside-steps">
          {(t.authSteps ?? t.steps ?? []).map((label, index) => (
            <span key={label}>
              <b>{index + 1}</b> {label}
            </span>
          ))}
        </div>
      </div>

      <div className="auth-card">
        <button className="auth-back" type="button" onClick={handleBack}>
          <ChevronLeft size={18} /> {t.back}
        </button>

        {step === "identify" && (
          <>
            <h1 id="auth-title">{t.authTitle}</h1>
            <p className="auth-intro">{t.authIntro}</p>

            <label className="form-label" htmlFor="identity-value">
              {t.identifyLabel}
              {detectedType && (
                <span className="detected-pill">
                  {" "}
                  · {t.detected}: {t.fieldLabels[detectedType]}
                </span>
              )}
            </label>
            <Input
              id="identity-value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={t.placeholder}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button
              className="auth-continue"
              type="button"
              onClick={handleContinue}
            >
              {t.continueBtn}
            </Button>
            <p className="auth-safe-line">
              <ShieldCheck size={15} /> {t.safeLine}
            </p>

            <div className="identity-personas">
              {Object.entries(PERSONAS).map(([key, p]) => (
                <div className="identity-persona" key={key}>
                  <div className="identity-persona-head">
                    <span className="persona-tag">
                      <UserRound size={11} style={{ verticalAlign: "-2px" }} />{" "}
                      {key === "existing" ? t.existingUser : t.newUser}
                    </span>
                    <b>{p.name}</b>
                  </div>
                  <div className="identity-chip-row">
                    {Object.entries(p.identifiers).map(([field, id]) => {
                      const Icon = FIELD_ICON[field];
                      return (
                        <button
                          type="button"
                          className="identity-chip"
                          key={field}
                          onClick={() => fillFrom(key, field)}
                        >
                          <Icon size={12} /> {id}
                        </button>
                      );
                    })}
                  </div>
                  <p className="identity-hint">{t.tapHint}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <span className="auth-step-icon">
              <KeyRound size={25} />
            </span>
            <p className="eyebrow">
              {persona?.kind === "existing"
                ? t.welcomeBack(persona.name)
                : t.newRegistration}
            </p>
            <h1>{t.otpTitle}</h1>
            <p className="auth-intro">{t.otpIntro}</p>

            <div className="demo-credential">
              <span>
                {t.demoOtpLabel}: <b>{MOCK_OTP}</b>
              </span>
              <small>{t.reviewerOnly}</small>
            </div>

            <label className="form-label" htmlFor="otp-value">
              OTP
            </label>
            <Input
              id="otp-value"
              className="otp-input"
              inputMode="numeric"
              maxLength="4"
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, ""))
              }
              placeholder="1234"
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button
              className="auth-continue"
              type="button"
              onClick={handleVerify}
            >
              {t.verifyBtn}
            </Button>
            <p className="auth-safe-line">
              <ShieldCheck size={15} /> {t.safeLine}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

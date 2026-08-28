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
import { MOCK_SYSTEM_DB } from "../data/mockSystem";
import { copy } from "../data/copy";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const PERSONA_IDENTIFIERS = {
  ananyaSharma: {
    phone: "9876547812",
    aadhaar: "234567891234",
    pan: "ANSPS1234A",
  },
  rameshSrivastava: {
    phone: "9812345670",
    aadhaar: "345678912345",
    pan: "RMSPS5678B",
    dl: "UP15420220034521",
  },
  surajVerma: {
    phone: "9911223344",
    aadhaar: "456789123456",
    pan: "SRVPV9012C",
  },
  rajeshKumar: {
    phone: "9876543456",
    aadhaar: "567891234567",
    pan: "RJKPK3456D",
    dl: "DL1420240098765",
  },
  rahulMalhotra: {
    phone: "9955667788",
    aadhaar: "678912345678",
    pan: "RHLPM7890E",
    dl: "LL16202600445",
  },
};

const PERSONAS = Object.fromEntries(
  Object.entries(PERSONA_IDENTIFIERS).map(([userId, identifiers]) => [
    userId,
    {
      kind: "existing",
      userId,
      name: MOCK_SYSTEM_DB.users[userId].fullName,
      identifiers,
    },
  ]),
);

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

function buildProfile(userId) {
  const user = MOCK_SYSTEM_DB.users[userId] ?? MOCK_SYSTEM_DB.users.ananyaSharma;
  return {
    fullName: user.fullName,
    dob: user.dob,
    address: user.address,
    registeredMobile: user.mobileMasked,
    avatarSeed: user.avatarSeed,
    personaTag: user.personaTag,
  };
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
        userId: "ananyaSharma",
        name: PERSONAS.ananyaSharma.name,
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
      userId: persona.userId,
      profile: buildProfile(persona.userId),
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
                      {p.kind === "existing" ? t.existingUser : t.newUser}
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
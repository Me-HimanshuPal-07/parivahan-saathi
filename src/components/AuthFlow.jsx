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
    pan: "ANSPS1234A",
  },
  rameshSrivastava: {
    phone: "9812345670",
    pan: "RMSPS5678B",
    dl: "UP15420220034521",
  },
  surajVerma: {
    phone: "9911223344",
    pan: "SRVPV9012C",
  },
  rajeshKumar: {
    phone: "9876543456",
    pan: "RJKPK3456D",
    dl: "DL1420240098765",
  },
  rahulMalhotra: {
    phone: "9955667788",
    pan: "RHLPM7890E",
    dl: "LL16202600445",
  },
};

// SAFE PERSONAS BUILDER (Prevents crashes if MOCK_SYSTEM_DB.users is undefined)
const PERSONAS = Object.fromEntries(
  Object.entries(PERSONA_IDENTIFIERS).map(([userId, identifiers]) => [
    userId,
    {
      kind: "existing",
      userId,
      name:
        MOCK_SYSTEM_DB?.users?.[userId]?.fullName ||
        userId.replace(/([A-Z])/g, " $1").trim(),
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
const MOCK_OTP = "123456";

function detectType(raw) {
  const value = String(raw || "").replace(/\s/g, "");
  if (/^[6-9]\d{9}$/.test(value)) return "phone";
  if (/^\d{12}$/.test(value)) return "aadhaar";
  if (/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(value)) return "pan";
  if (value.length >= 8) return "dl";
  return null;
}

function findPersona(raw) {
  const value = String(raw || "").replace(/\s/g, "").toUpperCase();
  if (!value) return null;
  return (
    Object.values(PERSONAS).find((persona) =>
      Object.values(persona?.identifiers || {}).some(
        (id) => String(id).replace(/\s/g, "").toUpperCase() === value,
      ),
    ) ?? null
  );
}

function buildProfile(userId) {
  // Safe Fallback chaining to prevent TypeError
  const user =
    MOCK_SYSTEM_DB?.users?.[userId] ||
    MOCK_SYSTEM_DB?.users?.ananyaSharma ||
    {};

  return {
    fullName: user.fullName || "Demo User",
    dob: user.dob || "1995-01-01",
    address: user.address || "Noida, UP",
    registeredMobile: user.mobileMasked || "98******12",
    avatarSeed: user.avatarSeed || "default",
    personaTag: user.personaTag || "Citizen",
  };
}

export function AuthFlow({ language = "en", onAuthenticated, onBack }) {
  const t = copy?.[language] ?? copy?.hinglish ?? copy?.en ?? {};

  const [step, setStep] = useState("identify");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [persona, setPersona] = useState(null);

  const detectedType = useMemo(() => detectType(value), [value]);

  const handleBack = () => {
    setError("");
    if (step === "otp") return setStep("identify");
    if (onBack) onBack();
  };

  const handleContinue = () => {
    if (value.trim().length < 4)
      return setError(t.fieldRequired || "This field is required");

    const matched = findPersona(value);
    setPersona(
      matched ?? {
        kind: "new",
        userId: "ananyaSharma",
        name: PERSONAS?.ananyaSharma?.name || "Ananya Sharma",
        identifiers: { [detectedType ?? "phone"]: value },
      },
    );
    setError("");
    setOtp("");
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp !== MOCK_OTP)
      return setError(t.invalidOtp || "Invalid OTP entered");

    if (onAuthenticated && persona) {
      onAuthenticated({
        kind: persona.kind,
        userId: persona.userId,
        profile: buildProfile(persona.userId),
        method: detectedType ?? "phone",
      });
    }
  };

  const fillFrom = (personaKey, field) => {
    const targetValue = PERSONAS?.[personaKey]?.identifiers?.[field];
    if (targetValue) {
      setValue(targetValue);
      setError("");
    }
  };

  return (
    <section className="auth-layout" aria-labelledby="auth-title">
      <div className="auth-aside">
        <span className="auth-aside-icon">
          <ShieldCheck size={24} />
        </span>
        <p className="eyebrow">{t.asideEyebrow || "Secure Access"}</p>
        <h2>{t.asideHeading || "Citizen Verification"}</h2>
        <p>{t.asideBody || "Enter registered details to proceed."}</p>
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
          <ChevronLeft size={18} /> {t.back || "Back"}
        </button>

        {step === "identify" && (
          <>
            <h1 id="auth-title">{t.authTitle || "Identity Check"}</h1>
            <p className="auth-intro">
              {t.authIntro || "Enter mobile number, PAN, or DL number"}
            </p>

            <label className="form-label" htmlFor="identity-value">
              {t.identifyLabel || "Enter Credential"}
              {detectedType && (
                <span className="detected-pill">
                  {" "}
                  · {t.detected || "Detected"}:{" "}
                  {t.fieldLabels?.[detectedType] || detectedType}
                </span>
              )}
            </label>
            <Input
              id="identity-value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={t.placeholder || "Mobile / PAN / DL Number"}
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
              {t.continueBtn || "Continue"}
            </Button>
            <p className="auth-safe-line">
              <ShieldCheck size={15} />{" "}
              {t.safeLine || "Protected sandbox system"}
            </p>

            <div className="identity-personas">
              {Object.entries(PERSONAS).map(([key, p]) => (
                <div className="identity-persona" key={key}>
                  <div className="identity-persona-head">
                    <span className="persona-tag">
                      <UserRound size={11} style={{ verticalAlign: "-2px" }} />{" "}
                      {p.kind === "existing"
                        ? t.existingUser || "Existing User"
                        : t.newUser || "New User"}
                    </span>
                    <b>{p.name}</b>
                  </div>
                  <div className="identity-chip-row">
                    {Object.entries(p?.identifiers || {}).map(([field, id]) => {
                      const Icon = FIELD_ICON[field] || Phone;
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
                  <p className="identity-hint">
                    {t.tapHint || "Tap any chip to autofill"}
                  </p>
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
                ? t.welcomeBack?.(persona.name) || `Welcome back, ${persona.name}`
                : t.newRegistration || "New Account Setup"}
            </p>
            <h1>{t.otpTitle || "Verify OTP"}</h1>
            <p className="auth-intro">
              {t.otpIntro || "Enter the 6-digit code sent to your credentials."}
            </p>

            <div className="demo-credential">
              <span>
                {t.demoOtpLabel || "Demo OTP"}: <b>{MOCK_OTP}</b>
              </span>
              <small>{t.reviewerOnly || "(For Testing)"}</small>
            </div>

            <label className="form-label" htmlFor="otp-value">
              OTP
            </label>
            <Input
              id="otp-value"
              className="otp-input"
              inputMode="numeric"
               maxLength="6"
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, ""))
              }
               placeholder="123456"
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
              {t.verifyBtn || "Verify & Proceed"}
            </Button>
            <p className="auth-safe-line">
              <ShieldCheck size={15} />{" "}
              {t.safeLine || "Protected sandbox system"}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
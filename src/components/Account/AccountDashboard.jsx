import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  IndianRupee,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { MOCK_SYSTEM_DB } from "../../data/mockSystem";

export function AccountDashboard({ userSession, onLogout, onPayChallan }) {
  const userId = userSession?.userId ?? "rajeshKumar";
  
  // Single Source of Truth DB se user ka complete profile aur data fetch
  const user = MOCK_SYSTEM_DB.users[userId];
  const sarathi = MOCK_SYSTEM_DB.sarathiLedger[userId];
  const vahan = MOCK_SYSTEM_DB.vahanLedger[userId];
  const userChallans = MOCK_SYSTEM_DB.challans.filter(
    (c) => c.userId === userId && c.status === "Unpaid"
  );

  return (
    <div className="account-shell-landing mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* 1. Header / Profile Bar */}
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#2A52BE] text-2xl font-bold text-white shadow-md">
            {user?.fullName?.charAt(0) ?? "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">
                {user?.fullName}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> KYC Verified
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {user?.mobileMasked} · {user?.city}, {user?.state}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </header>

      {/* 2. Urgent Regulatory Warnings & PUCC Alerts (If Any) */}
      {sarathi?.regulatoryWarning?.active && (
        <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-sm">
          <ShieldAlert className="h-6 w-6 shrink-0 text-red-600" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-base">
              {sarathi.regulatoryWarning.titleHi}
            </h3>
            <p className="text-sm leading-relaxed opacity-90">
              {sarathi.regulatoryWarning.bodyHinglish}
            </p>
          </div>
        </div>
      )}

      {/* 3. Grid Section: DL Status & Vehicle Garage */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Driving License / Sarathi Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <CreditCard className="h-4 w-4 text-[#2A52BE]" /> Driving Licence (Sarathi)
            </span>
            {sarathi?.hasLicense ? (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Active
              </span>
            ) : sarathi?.ll ? (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                Learner's Licence
              </span>
            ) : (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                No License
              </span>
            )}
          </div>

          {sarathi?.hasLicense && sarathi.dl && (
            <div className="space-y-2">
              <p className="font-mono text-xl font-extrabold text-slate-900 tracking-wide">
                {sarathi.dl.dlNumber}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 pt-2">
                <div>
                  <span className="block text-slate-400">Class:</span>
                  {sarathi.dl.licenceType}
                </div>
                <div>
                  <span className="block text-slate-400">RTO Code:</span>
                  {sarathi.dl.rtoCode}
                </div>
                <div>
                  <span className="block text-slate-400">Expires:</span>
                  {sarathi.dl.expiryDate}
                </div>
              </div>
            </div>
          )}

          {sarathi?.ll && (
            <div className="space-y-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 p-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-base font-bold text-slate-900">
                  {sarathi.ll.llNumber}
                </span>
                <span className="text-xs font-extrabold text-amber-700">
                  {sarathi.ll.daysRemaining} Days Left
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Learner Licence expiring soon. Book permanent DL test to stay compliant.
              </p>
            </div>
          )}

          {!sarathi?.hasLicense && !sarathi?.ll && (
            <p className="text-sm text-slate-500 py-2">
              Aapke paas koi active driving licence nahi hai. Direct learner's test ke liye apply karein.
            </p>
          )}
        </div>

        {/* Vehicles / Vahan Garage */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FileText className="h-4 w-4 text-[#2A52BE]" /> Registered Garage (Vahan)
            </span>
            <span className="text-xs font-bold text-slate-500">
              {vahan?.vehicles?.length ?? 0} Vehicle(s)
            </span>
          </div>

          {vahan?.vehicles && vahan.vehicles.length > 0 ? (
            vahan.vehicles.map((v) => (
              <div
                key={v.vehicleId}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-lg font-extrabold text-slate-900">
                      {v.registrationNumber}
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      {v.modelName}
                    </p>
                  </div>
                  <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 border border-slate-200">
                    Chassis: {v.chassisMasked}
                  </span>
                </div>

                {v.puccAlert?.active && (
                  <div className="flex items-center gap-2 rounded-xl bg-amber-100/80 border border-amber-200 p-2.5 text-xs font-bold text-amber-900">
                    <Clock className="h-4 w-4 shrink-0 text-amber-700" />
                    <span>{v.puccAlert.titleHinglish}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-4 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                {vahan?.emptyStatePrompt?.titleHinglish ?? "Garage Khaali Hai"}
              </p>
              <p className="text-xs text-slate-500">
                {vahan?.emptyStatePrompt?.bodyHinglish ?? "Aapke naam par koi vehicle registered nahi hai."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Active E-Challan Settlement Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <IndianRupee className="h-5 w-5 text-red-600" /> Active E-Challans
          </h2>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
            {userChallans.length} Unpaid
          </span>
        </div>

        {userChallans.length > 0 ? (
          userChallans.map((challan) => (
            <div
              key={challan.challanId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/40 p-5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {challan.challanId}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    ({challan.registrationNumber})
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600">
                  {challan.reasonEn}
                </p>
              </div>

              <div className="flex items-center gap-4 justify-between sm:justify-end">
                <span className="text-xl font-extrabold text-slate-900">
                  ₹{challan.amount}
                </span>
                <button
                  type="button"
                  onClick={() => onPayChallan && onPayChallan(challan)}
                  className="rounded-xl bg-[#2A52BE] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#2245a3]"
                >
                  Pay via UPI
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900 text-sm font-bold border border-emerald-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Koi pending challan nahi hai — aapka record bilkul saaf hai.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDashboard;
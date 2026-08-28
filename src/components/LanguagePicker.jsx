import React from 'react'
import { Languages } from 'lucide-react'

const options = [
  { value: 'hinglish', label: 'Hinglish' },
  { value: 'hi', label: 'Hindi' },
  { value: 'en', label: 'English' },
]

export function LanguagePicker({ language, onChange }) {
  const currentLabel = options.find((opt) => opt.value === language)?.label || 'Hinglish'

  return (
    <div className="language-chip">
      <Languages size={15} aria-hidden="true" />
      <span>
        <small>Language</small>
        <strong>{currentLabel}</strong>
      </span>
      <select
        value={language}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Choose language"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguagePicker
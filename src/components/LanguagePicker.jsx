import { Languages } from 'lucide-react'

const options = [
  { value: 'hinglish', label: 'Hinglish' },
  { value: 'hi', label: 'HI' },
  { value: 'en', label: 'EN' },
]

export function LanguagePicker({ language, onChange }) {
  return (
    <label className="language-picker">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">Choose language</span>
      <select value={language} onChange={(event) => onChange(event.target.value)} aria-label="Choose language">
        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

import { cn } from '../../lib/utils'

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2A52BE] focus:ring-4 focus:ring-blue-100',
        className,
      )}
      {...props}
    />
  )
}

export { Input }

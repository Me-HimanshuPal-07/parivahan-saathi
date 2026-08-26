import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#2A52BE] text-white hover:bg-[#2245a3]',
        secondary: 'border border-[#d4e1f2] bg-white text-[#254581] hover:bg-[#f6faff]',
        ghost: 'bg-transparent text-slate-600 hover:bg-[#EBF3FC] hover:text-[#2A52BE]',
        outline: 'border border-slate-200 bg-white text-slate-700 hover:border-[#bcd0ed] hover:bg-[#f8fbff]',
      },
      size: {
        default: 'px-4',
        sm: 'min-h-10 px-3 text-xs',
        icon: 'min-h-12 w-12 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }

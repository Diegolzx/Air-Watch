import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

export const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 outline-none hover:scale-105 duration-300 transition text-sky-900 group",
  {
    variants: {
      variant: {
        default: "bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        xxl: "h-14 rounded-full px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
)

export function LiquidButton({ className, variant, size, children, href, ...props }) {
  const Comp = href ? "a" : "button"

  return (
    <Comp
      href={href}
      className={cn("relative overflow-hidden shadow-xl shadow-sky-500/20", liquidbuttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* Background and border effects */}
      <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(255,255,255,0.9),inset_-3px_-3px_0.5px_-3px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(255,255,255,0.5)] transition-all bg-white/40 backdrop-blur-xl border border-white/60" />
      
      {/* Liquid effect filter */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md opacity-50"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      
      {/* Content wrapper */}
      <div className="pointer-events-none z-10 flex items-center gap-2 font-bold text-sky-800 drop-shadow-sm group-hover:text-blue-700 transition-colors">
        {children}
      </div>
      
      <GlassFilter />
    </Comp>
  )
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
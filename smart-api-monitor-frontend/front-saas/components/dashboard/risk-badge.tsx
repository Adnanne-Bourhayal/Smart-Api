import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/types"

interface RiskBadgeProps {
  level: RiskLevel
  score?: number
  className?: string
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const variants = {
    LOW: "bg-risk-low/15 text-risk-low border-risk-low/30",
    MEDIUM: "bg-risk-medium/15 text-risk-medium border-risk-medium/30",
    HIGH: "bg-risk-high/15 text-risk-high border-risk-high/30"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        variants[level],
        className
      )}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        level === "LOW" && "bg-risk-low",
        level === "MEDIUM" && "bg-risk-medium",
        level === "HIGH" && "bg-risk-high"
      )} />
      {level}
      {score !== undefined && (
        <span className="text-[10px] opacity-75">({score})</span>
      )}
    </span>
  )
}

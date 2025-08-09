interface CircularProgressGaugeProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
}

export function CircularProgressGauge({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#22D3EE',
  backgroundColor = '#374151'
}: CircularProgressGaugeProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  // Create gradient colors for the gauge
  const getGradientColor = (percentage: number) => {
    if (percentage < 25) return '#EF4444' // Red
    if (percentage < 50) return '#F97316' // Orange  
    if (percentage < 75) return '#EAB308' // Yellow
    return '#10B981' // Green
  }

  const strokeColor = color === '#22D3EE' ? getGradientColor(percentage) : color

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.4))'
          }}
        />
      </svg>
      
      {/* Center text overlay for smaller gauges */}
      {size <= 100 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
        </div>
      )}
    </div>
  )
}
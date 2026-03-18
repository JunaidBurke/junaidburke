import { FadeIn } from '@/components/ui/FadeIn'
import type { FlowStep } from '@/lib/products'

interface FlowDiagramProps {
  steps: FlowStep[]
  orientation?: 'vertical' | 'horizontal'
}

type StepType = FlowStep['type']

const dotColor: Record<StepType, string> = {
  input: 'bg-cyan',
  process: 'bg-text-muted',
  llm: 'bg-purple',
  data: 'bg-orange',
  gate: 'bg-red',
  output: 'bg-green',
}

const glowColor: Record<StepType, string> = {
  input: 'rgba(62,232,255,0.4)',
  process: 'rgba(135,133,163,0.4)',
  llm: 'rgba(139,122,255,0.4)',
  data: 'rgba(255,154,92,0.4)',
  gate: 'rgba(255,95,120,0.4)',
  output: 'rgba(0,255,170,0.4)',
}

function StepDot({ type }: { type: StepType }) {
  return (
    <span
      className={`shrink-0 w-3 h-3 rounded-full ${dotColor[type]}`}
      style={{ boxShadow: `0 0 8px ${glowColor[type]}` }}
    />
  )
}

function VerticalDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="bg-bg-flow rounded-xl p-6 border border-border">
      {steps.map((step, i) => (
        <FadeIn key={i} delay={i * 100}>
          <div className="flex items-start">
            {/* Dot + connector column */}
            <div className="flex flex-col items-center">
              <StepDot type={step.type} />
              {i < steps.length - 1 && (
                <span className="border-l-2 border-dashed border-border-hi h-8 mt-1" />
              )}
            </div>
            {/* Label column */}
            <div className="ml-4 pb-1">
              <p className="text-sm font-medium text-text leading-none">{step.label}</p>
              {step.sublabel && (
                step.type === 'llm' ? (
                  <span className="mt-1.5 inline-block bg-purple/10 border border-purple/30 text-purple text-[10px] font-mono px-2 py-0.5 rounded-full">
                    {step.sublabel}
                  </span>
                ) : (
                  <p className="mt-0.5 text-xs text-text-dim">{step.sublabel}</p>
                )
              )}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

function HorizontalDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="bg-bg-flow rounded-xl p-6 border border-border overflow-x-auto">
      <div className="flex items-start min-w-max">
        {steps.map((step, i) => (
          <FadeIn key={i} delay={i * 100} className="flex items-start flex-1 min-w-0">
            {/* Step column */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <StepDot type={step.type} />
              <p className="mt-2 text-sm font-medium text-text text-center leading-snug px-1">
                {step.label}
              </p>
              {step.sublabel && (
                step.type === 'llm' ? (
                  <span className="mt-1 inline-block bg-purple/10 border border-purple/30 text-purple text-[10px] font-mono px-2 py-0.5 rounded-full">
                    {step.sublabel}
                  </span>
                ) : (
                  <p className="mt-0.5 text-xs text-text-dim text-center">{step.sublabel}</p>
                )
              )}
            </div>
            {/* Connector line between steps */}
            {i < steps.length - 1 && (
              <span className="border-t-2 border-dashed border-border-hi flex-1 mt-1.5 shrink-0" />
            )}
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

export function FlowDiagram({ steps, orientation = 'vertical' }: FlowDiagramProps) {
  if (orientation === 'horizontal') {
    return <HorizontalDiagram steps={steps} />
  }
  return <VerticalDiagram steps={steps} />
}

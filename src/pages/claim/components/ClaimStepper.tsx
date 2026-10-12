interface ClaimStepperProps {
  step: number;
  steps: string[];
}

export default function ClaimStepper({ step, steps }: ClaimStepperProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-y-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono border transition-all ${
                step > i + 1
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                  : step === i + 1
                  ? 'bg-teal-50 border-teal-400 text-teal-700'
                  : 'border-slate-200 text-slate-400'
              }`}
            >
              {step > i + 1 ? <i className="ri-check-line"></i> : i + 1}
            </div>
            <span className={`text-[10px] font-mono uppercase tracking-wider whitespace-nowrap ${step === i + 1 ? 'text-teal-700' : 'text-slate-400'}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 md:w-20 h-px mx-2 mb-5 ${step > i + 1 ? 'bg-emerald-300' : 'bg-slate-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}
import effStyles from '@/components/etfEfficiency/EtfEfficiencyGrades.module.css'

export type EtfEfficiencyGradeLine = {
  /** Include trailing colon, e.g. `Equity Efficiency:` */
  label: string
  grade: string
  /** `gold` highlights standout grades (e.g. A+). Default: muted. */
  gradeTone?: 'gold' | 'muted'
  /** Two paragraphs supported via `\n\n` + `white-space: pre-line` in CSS. */
  tooltip: string
}

export function EtfEfficiencyMetaExtras({
  lines,
  notes,
}: {
  lines: EtfEfficiencyGradeLine[]
  notes?: string[]
}) {
  return (
    <div>
      <div className={effStyles.efficiencyRow} aria-label="Beta efficiency grades">
        {lines.map((line, i) => {
          const tone = line.gradeTone ?? (line.grade === 'A+' ? 'gold' : 'muted')
          const gradeClass = tone === 'gold' ? effStyles.efficiencyGradeStrong : effStyles.efficiencyGrade
          return (
            <span key={i} className={effStyles.efficiencyItem}>
              <span className={effStyles.efficiencyTooltipHost} tabIndex={0}>
                <strong className={effStyles.efficiencyTitle}>{line.label}</strong>
                <span className={gradeClass}>{line.grade}</span>
                <span className={effStyles.efficiencyTooltip} role="tooltip">
                  {line.tooltip}
                </span>
              </span>
            </span>
          )
        })}
      </div>
      {notes != null && notes.length > 0 ? (
        <div className={effStyles.efficiencyNotes}>
          {notes.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function EtfEfficiencyPageFootnotes({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length === 0) return null
  return (
    <div className={effStyles.pageFootnotes}>
      {paragraphs.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </div>
  )
}

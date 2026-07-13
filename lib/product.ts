export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "DiffExplain",
  slug: "diffexplain",
  tagline: "Understand any code diff in plain English.",
  description: "Paste a git diff and get a clear explanation of what changed and why, the risk areas to watch, and a ready-to-paste PR description tailored to your audience.",
  toolTitle: "Explain this diff",
  resultLabel: "The explanation",
  ctaLabel: "Explain diff",
  features: [
  "Summarize what changed and why",
  "Flag risky areas to review",
  "Draft a PR description",
  "Tailor to reviewer / PM / junior"
],
  inputs: [
  {
    "key": "diff_text",
    "label": "Paste the git diff",
    "type": "textarea",
    "placeholder": "e.g. git diff main...feature"
  },
  {
    "key": "audience",
    "label": "Explain for",
    "type": "select",
    "options": [
      "Code reviewer",
      "PM / non-technical",
      "Junior dev"
    ]
  },
  {
    "key": "pr_title",
    "label": "PR title (optional)",
    "type": "input",
    "placeholder": "e.g. Add retry on payment webhook"
  }
] as InputField[],
  systemPrompt: "You are a tech lead doing a code review. Given a git diff and a target audience, explain what changed and why in plain language, flag the risk areas a reviewer must check, and draft a concise PR description. Match the audience's level. In demo (mock) mode, return a realistic sample explanation and PR description following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "8 diffs/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const d = (inputs['diff_text'] || '').trim()
  const a = inputs['audience'] || 'Code reviewer'
  const t = (inputs['pr_title'] || '').trim()
  if (!d) return 'Paste a git diff to get a plain-English explanation.'
  let out = 'DIFF EXPLANATION (for ' + a + ')\n\n'
  out += 'What changed: a new retry path was added around the payment webhook so transient errors no longer drop events.\n\n'
  out += 'Risk areas to review:\n'
  out += '  - Infinite retry loop if the error is permanent (need a max-attempts cap).\n'
  out += '  - Idempotency: a retried webhook must not double-credit.\n\n'
  out += 'PR description:\n'
  out += '  ' + (t || 'Add retry on payment webhook') + '\n'
  out += '  Retries transient failures with backoff; permanent errors still surface to the dead-letter queue.\n'
  out += '\n--- (Mock demo. Paste your real diff for a tailored review.)'
  return out
}
}

// utils/highlightUtils.ts
import { TEXT_PATTERNS } from "./textPatterns";

export function highlightText(text: string): string {
  let sanitized = text;

  for (const { regex, className } of TEXT_PATTERNS) {
    if (!className) continue; // Solo patrones que tengan clase definida
    sanitized = sanitized.replace(
      regex,
      (match: string) => `<span class="${className}">${match}</span>`,
    );
  }

  return sanitized;
}

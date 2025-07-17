// utils/textPatterns.ts

export type ContentType = "url" | "email" | "mention" | "hashtag" | "text";

export interface TextPattern {
  type: ContentType;
  regex: RegExp;
  className?: string; // Opcional, solo usado para highlight
  priority: number; // Para parseText
}

export const TEXT_PATTERNS: TextPattern[] = [
  {
    type: "email",
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    className: "text-green-600",
    priority: 2,
  },
  {
    type: "url",
    regex: /\bhttps?:\/\/[^\s]+/g,
    className: "text-orange-500",
    priority: 1,
  },
  {
    type: "url",
    regex: /\bwww\.[^\s]+/g,
    className: "text-orange-400",
    priority: 1,
  },
  {
    type: "mention",
    regex: /(?<![a-zA-Z0-9._%+-])@[a-zA-Z0-9_-]+/g,
    className: "text-blue-600",
    priority: 3,
  },
  {
    type: "hashtag",
    regex: /#([\w-]+)/g,
    className: "text-purple-600",
    priority: 4,
  },
];

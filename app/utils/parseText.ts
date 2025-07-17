// utils/parseText.ts
import { TEXT_PATTERNS, ContentType } from "./textPatterns";

export interface ParsedElement {
  id: string;
  type: ContentType | "text";
  content: string;
  originalText: string;
}

export function parseText(text: string): ParsedElement[] {
  const elements: ParsedElement[] = [];

  const matches: Array<{
    type: ContentType;
    match: string;
    start: number;
    end: number;
    priority: number;
  }> = [];

  TEXT_PATTERNS.forEach(({ type, regex, priority }) => {
    const localRegex = new RegExp(regex.source, regex.flags); // crear nueva instancia
    let match;
    while ((match = localRegex.exec(text)) !== null) {
      matches.push({
        type,
        match: match[0],
        start: match.index,
        end: match.index + match[0].length,
        priority,
      });
    }
  });
  // Ordenar por posición y prioridad
  matches.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.priority - b.priority;
  });

  // Filtrar matches para evitar solapamientos
  const nonOverlapping: typeof matches = [];
  let occupied: boolean[] = Array(text.length).fill(false);
  matches.forEach((m) => {
    let overlaps = false;
    for (let i = m.start; i < m.end; i++) {
      if (occupied[i]) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      nonOverlapping.push(m);
      for (let i = m.start; i < m.end; i++) {
        occupied[i] = true;
      }
    }
  });

  // Procesar el texto secuencialmente usando los matches filtrados
  let lastEnd = 0;
  nonOverlapping.forEach((match, index) => {
    // Agregar texto plano antes del match
    if (match.start > lastEnd) {
      const plainText = text.slice(lastEnd, match.start);
      if (plainText.trim()) {
        elements.push({
          id: `${Date.now()}-${index}-text`,
          type: "text",
          content: plainText.trim(),
          originalText: plainText.trim(),
        });
      }
    }

    // Agregar el elemento identificado
    elements.push({
      id: `${Date.now()}-${index}-${match.type}`,
      type: match.type,
      content: match.match,
      originalText: match.match,
    });

    lastEnd = match.end;
  });

  // Agregar texto restante
  if (lastEnd < text.length) {
    const remainingPlainText = text.slice(lastEnd).trim();
    if (remainingPlainText) {
      elements.push({
        id: `${Date.now()}-final-text`,
        type: "text",
        content: remainingPlainText,
        originalText: remainingPlainText,
      });
    }
  }

  // Si no se encontraron patrones, tratar todo como texto
  if (elements.length === 0 && text.trim()) {
    elements.push({
      id: `${Date.now()}-text`,
      type: "text",
      content: text.trim(),
      originalText: text.trim(),
    });
  }

  return elements;
}

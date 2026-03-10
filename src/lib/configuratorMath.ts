export type TimelineDays = {
  min: number;
  max: number;
  days: number;
};

export const parseTimelineToDays = (timeline: string): TimelineDays => {
  const normalized = timeline
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[–—]/g, "-");

  const match = normalized.match(/(\d+)\s*-\s*(\d+)\s*(jour|jours|semaine|semaines)/i);
  if (!match) {
    return { min: 0, max: 0, days: 0 };
  }

  const rawMin = Number(match[1]);
  const rawMax = Number(match[2]);
  const unit = match[3];

  if (unit.startsWith("semaine")) {
    const min = rawMin * 7;
    const max = rawMax * 7;
    return { min, max, days: min };
  }

  return { min: rawMin, max: rawMax, days: rawMin };
};

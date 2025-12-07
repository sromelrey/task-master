import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTimeToSeconds(time?: string) {
  if (!time) {
    return null;
  }

  const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map((value) => Number(value));

  if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return null;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

export function checkTimeOverlap(
  startA?: string,
  endA?: string,
  startB?: string,
  endB?: string
) {
  const startSecondsA = parseTimeToSeconds(startA);
  const endSecondsA = parseTimeToSeconds(endA);
  const startSecondsB = parseTimeToSeconds(startB);
  const endSecondsB = parseTimeToSeconds(endB);

  if (
    startSecondsA === null ||
    endSecondsA === null ||
    startSecondsB === null ||
    endSecondsB === null
  ) {
    return false;
  }

  return startSecondsA < endSecondsB && startSecondsB < endSecondsA;
}

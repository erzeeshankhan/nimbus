import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// \utility function used in user action 
export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
}
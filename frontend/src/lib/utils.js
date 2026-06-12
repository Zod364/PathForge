import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) { return twMerge(clsx(inputs)); }
export function slugify(s = "") { return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
export function fmtDate(s) { try { return new Date(s).toLocaleDateString(); } catch { return ""; } }

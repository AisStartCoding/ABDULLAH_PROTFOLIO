import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Plain <img> tags (unlike next/image) don't get GitHub Pages' basePath
// auto-prefixed, so a hardcoded "/foo.png" 404s once deployed under
// /ABDULLAH_PROTFOLIO/. Route any hardcoded public/ asset path through this.
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}

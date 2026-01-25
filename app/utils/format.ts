/**
 * Format bytes into human-readable storage size
 */
export function formatStorage(bytes: number): string {
  if (bytes < 1024)
    return `${bytes} B`
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

/**
 * Format GB into human-readable size (for sidebar storage display)
 */
export function formatSizeGB(gb: number): string {
  if (gb < 1) {
    return `${Math.round(gb * 1024)} MB`
  }
  return `${gb.toFixed(1)} GB`
}

/**
 * Extract initials from a name (up to 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

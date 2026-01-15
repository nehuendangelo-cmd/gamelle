/**
 * Format a date relative to now (e.g., "il y a 2 heures")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "à l'instant";
  if (diffMins < 60) return `il y a ${diffMins} min`;
  if (diffHours < 24) return `il y a ${diffHours}h`;
  if (diffDays < 7) return `il y a ${diffDays}j`;

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Format token count with proper pluralization
 */
export function formatTokens(count: number): string {
  return `${count} token${count !== 1 ? 's' : ''}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Check if a meal is expired
 */
export function isMealExpired(expirationDate: Date): boolean {
  return new Date() > new Date(expirationDate);
}

/**
 * Get time remaining until expiration
 */
export function getTimeRemaining(expirationDate: Date): string {
  const now = new Date();
  const expiry = new Date(expirationDate);
  const diffMs = expiry.getTime() - now.getTime();

  if (diffMs <= 0) return 'Expiré';

  const diffHours = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);

  if (diffHours >= 24) {
    const days = Math.floor(diffHours / 24);
    return `${days}j restant${days > 1 ? 's' : ''}`;
  }
  if (diffHours > 0) {
    return `${diffHours}h${diffMins > 0 ? ` ${diffMins}min` : ''} restant`;
  }
  return `${diffMins}min restant`;
}

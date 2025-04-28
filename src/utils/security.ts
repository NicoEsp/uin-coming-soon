
/**
 * Security utility functions
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * 
 * @param input - The user input to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Generates a CSRF token to protect against CSRF attacks
 * 
 * @returns CSRF token string
 */
export const generateCSRFToken = (): string => {
  return `${Math.random().toString(36).substring(2)}_${Date.now()}`;
}

/**
 * Obfuscates an email address to prevent harvesting by bots
 * 
 * @param email - The email address to obfuscate
 * @returns HTML encoded email
 */
export const obfuscateEmail = (email: string): string => {
  return email.split('').map(c => `&#${c.charCodeAt(0)};`).join('');
};

/**
 * Implements rate limiting for form submissions
 * 
 * @param actionType - Type of action to check (e.g. 'formSubmission')
 * @param timeout - Timeout in milliseconds (default: 60000ms = 1 minute)
 * @returns Boolean indicating if the action should be allowed
 */
export const checkRateLimit = (actionType: string, timeout: number = 60000): boolean => {
  const key = `lastAction_${actionType}`;
  const lastAction = localStorage.getItem(key);
  
  if (lastAction && (Date.now() - parseInt(lastAction)) < timeout) {
    return false;
  }
  
  // Update timestamp
  localStorage.setItem(key, Date.now().toString());
  return true;
};

/**
 * Checks if input contains potentially malicious content
 *
 * @param input - String to check
 * @returns Boolean indicating if input contains suspicious patterns
 */
export const hasSuspiciousContent = (input: string): boolean => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i, // matches onclick=, onload=, etc.
    /data:/i,
    /vbscript:/i,
    /expression\(/i,
    /url\(/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};

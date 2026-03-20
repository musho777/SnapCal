export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const buildQueryString = params => {
  return Object.entries(params)
    .flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map(item => `${key}=${encodeURIComponent(item)}`)
        : value !== undefined && value !== null && value !== ''
        ? `${key}=${encodeURIComponent(value)}`
        : [],
    )
    .join('&');
};

/**
 * Format ISO timestamp string to different formats
 * @param {string} isoString - ISO timestamp string (e.g., "2026-03-14T14:29:41.446Z")
 * @param {string} format - Format type: 'time', 'date', or 'datetime'
 * @param {object} options - Optional formatting options
 * @param {boolean} options.use12Hour - Use 12-hour format for time (default: false)
 * @param {string} options.dateStyle - Date format: 'short' (03/14/2026), 'medium' (Mar 14, 2026), 'long' (March 14, 2026)
 * @returns {string} Formatted date/time string
 */
export const formatTimestamp = (
  isoString,
  format = 'datetime',
  options = {},
) => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const { use12Hour = false, dateStyle = 'short' } = options;

  const pad = num => String(num).padStart(2, '0');

  // Format time
  const formatTime = () => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (use12Hour) {
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${pad(minutes)} ${period}`;
    }

    return `${pad(hours)}:${pad(minutes)}`;
  };

  // Format date
  const formatDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (dateStyle === 'short') {
      return `${pad(month)}/${pad(day)}/${year}`;
    } else if (dateStyle === 'medium') {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${monthNames[date.getMonth()]} ${day}, ${year}`;
    } else if (dateStyle === 'long') {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return `${monthNames[date.getMonth()]} ${day}, ${year}`;
    }

    return `${year}-${pad(month)}-${pad(day)}`;
  };

  // Return based on format
  if (format === 'time') {
    return formatTime();
  } else if (format === 'date') {
    return formatDate();
  } else {
    return `${formatDate()} ${formatTime()}`;
  }
};

/**
 * Check if a date string is today
 * @param {string} dateString - Date string in format "YYYY-MM-DD"
 * @returns {boolean} True if the date is today, false otherwise
 */
export const isToday = dateString => {
  if (!dateString) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(dateString);
  compareDate.setHours(0, 0, 0, 0);

  return today.getTime() === compareDate.getTime();
};

/**
 * Parse birth date string (DD.MM.YYYY or ISO 8601 format) to Date object
 * @param {string} dateStr - Birth date string in format "DD.MM.YYYY" or "YYYY-MM-DD"
 * @returns {Date} Date object, or default date (Jan 1, 2000) if invalid
 */
export const parseBirthDateString = dateStr => {
  if (!dateStr) return new Date(2000, 0, 1);

  // Check if it's ISO format (YYYY-MM-DD)
  if (dateStr.includes('-')) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Check if it's DD.MM.YYYY format
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  return new Date(2000, 0, 1);
};

/**
 * Format ISO date string (YYYY-MM-DD) to DD.MM.YYYY format
 * @param {string} isoDateStr - ISO date string (e.g., "2001-03-03")
 * @returns {string} Formatted date string in DD.MM.YYYY format (e.g., "03.03.2001")
 */
export const formatISODateToDDMMYYYY = isoDateStr => {
  if (!isoDateStr) return '';

  // If already in DD.MM.YYYY format, return as is
  if (isoDateStr.includes('.')) return isoDateStr;

  // Parse ISO format YYYY-MM-DD
  const parts = isoDateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}.${month}.${year}`;
  }

  return '';
};

/**
 * Convert birth date from Date object or DD.MM.YYYY string to ISO 8601 format
 * @param {Date|string} date - Date object or birth date string in format "DD.MM.YYYY" (e.g., "03.03.2001")
 * @returns {string|null} ISO 8601 date string (e.g., "2001-03-03"), or null if invalid
 */
export const convertBirthDateToISO = date => {
  if (!date) return null;

  // If it's a Date object
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // If it's a string in DD.MM.YYYY format
  if (typeof date === 'string') {
    const parts = date.split('.');
    if (parts.length !== 3) return null;

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${year}-${month}-${day}`;
  }

  return null;
};

/**
 * Calculate age from birth date string (DD.MM.YYYY or ISO 8601 format)
 * @param {string} birthDateStr - Birth date string in format "DD.MM.YYYY" or "YYYY-MM-DD"
 * @returns {number|null} Age in years, or null if invalid date
 */
export const calculateAgeFromBirthDate = birthDateStr => {
  if (!birthDateStr) return null;

  let birthDate;

  // Check if it's ISO format (YYYY-MM-DD)
  if (birthDateStr.includes('-')) {
    birthDate = new Date(birthDateStr);
    if (isNaN(birthDate.getTime())) return null;
  } else {
    // Parse DD.MM.YYYY format
    const parts = birthDateStr.split('.');
    if (parts.length !== 3) return null;
    birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

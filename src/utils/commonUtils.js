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

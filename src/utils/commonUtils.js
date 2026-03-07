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

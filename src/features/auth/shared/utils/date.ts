/**
 * Date utility functions shared
 * across authentication features.
 */

/**
 * Create a future Date.
 *
 * @param milliseconds Number of milliseconds
 * to add to the current time.
 */
export function addMilliseconds(
  milliseconds: number,
): Date {

  return new Date(
    Date.now() + milliseconds,
  );
}

/**
 * Create a future Date in minutes.
 */
export function addMinutes(
  minutes: number,
): Date {

  return addMilliseconds(
    minutes * 60 * 1000,
  );
}

/**
 * Create a future Date in hours.
 */
export function addHours(
  hours: number,
): Date {

  return addMilliseconds(
    hours * 60 * 60 * 1000,
  );
}

/**
 * Create a future Date in days.
 */
export function addDays(
  days: number,
): Date {

  return addMilliseconds(
    days * 24 * 60 * 60 * 1000,
  );
}

/**
 * Check whether a date has expired.
 */
export function isExpired(
  date: Date,
): boolean {

  return date.getTime() <= Date.now();
}

/**
 * Check whether a date is still valid.
 */
export function isValidUntil(
  date: Date,
): boolean {

  return date.getTime() > Date.now();
}
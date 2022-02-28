import moment from "moment";

/**
 * Get day name from date string
 * @function getDayName
 * @returns {string} day name
 */
export function getDayName(str: string): string {
  return moment(str).format("dddd");
}

/**
 * Get time formatted (AM/PM) from string
 * @function getTime
 * @returns {string} time with AM/PM format
 */
export function getTime(str: string): string {
  return moment(str).format("LT");
}

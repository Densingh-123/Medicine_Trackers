import moment from 'moment';

/**
 * Formats a timestamp by setting its time to 00:00:00 (start of the day).
 * @param {number|string|Date} timestamp - The timestamp to format.
 * @returns {number} - The timestamp in milliseconds for the start of the day.
 */
export const FormatDate = (timestamp) => {
  if (!timestamp) return null;
  return new Date(timestamp).setHours(0, 0, 0, 0);
};

/**
 * Formats a date to a readable text format (e.g., "Jan 1, 2025").
 * @param {string|number|Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDateForText = (date) => {
  if (!date) return 'Invalid Date';
  return moment(date).format('ll'); // e.g., "Jan 1, 2025"
};

/**
 * Formats a timestamp to a time string in "HH:MM AM/PM" format.
 * @param {number|string|Date} timestamp - The timestamp to format.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return 'Invalid Time';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }); // e.g., "10:30 AM"
};

/**
 * Generates an array of dates between two given dates (inclusive).
 * @param {string|Date} startDate - The start date (format: "MM/DD/YYYY").
 * @param {string|Date} endDate - The end date (format: "MM/DD/YYYY").
 * @returns {string[]} - An array of date strings in "MM/DD/YYYY" format.
 */
export const getDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return [];
  const start = moment(new Date(startDate), 'MM/DD/YYYY');
  const end = moment(new Date(endDate), 'MM/DD/YYYY');
  if (!start.isValid() || !end.isValid()) return [];

  const dates = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format('MM/DD/YYYY')); // e.g., "01/01/2025"
    start.add(1, 'days');
  }
  return dates;
};


export const getDateRangeToDiplay = () => {
    const dateList = [];
    for (let i = 0; i <= 7; i++) {
        const dateItem = {
            date: moment().add(i, 'days').format('DD'),
            day: moment().add(i, 'days').format('dd'),
            formatDate: moment().add(i, 'days').format('L'),
        };
        console.log(dateItem); // Add this line to check the output
        dateList.push(dateItem);
    }
    console.log(dateList); // Verify the final array
    return dateList;
};
 
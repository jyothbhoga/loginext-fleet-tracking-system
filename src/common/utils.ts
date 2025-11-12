export function formatCustomLocal(isoString: string): string {
  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, 
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);
    
    // Extract required parts in order
    const day = parts.find(p => p.type === 'day')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;
    const hour = parts.find(p => p.type === 'hour')?.value;
    const minute = parts.find(p => p.type === 'minute')?.value;
    const second = parts.find(p => p.type === 'second')?.value;

    if (!day || !month || !year || !hour || !minute || !second) {
        return 'Formatting Error: Missing date/time parts';
    }

    const datePart = `${day}:${month}:${year}`;
    const timePart = `${hour}:${minute}:${second}`;

    return `${datePart}, ${timePart}`;

  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Formatting Error';
  }
}
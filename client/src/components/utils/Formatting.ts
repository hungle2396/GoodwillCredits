

export const MonthDayYear = (date: Date | string) => {
    // Convert to Date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (typeof date === 'string') {
        const parsedDate = new Date(date);

        // Check if the parsed date is valid
        if (!isNaN(parsedDate.getTime())) {
            date = parsedDate;
        } else {
            return '-';
        }
    }

    date = new Date(date);
    const month = months[date.getMonth()];
    const day = date.getUTCDate();
    const year = date.getFullYear();

    console.log('monthNumber: ', month);
    
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}
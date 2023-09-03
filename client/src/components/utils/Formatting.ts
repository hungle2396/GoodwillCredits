

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
    const monthIndex = date.getUTCMonth();
    const month = months[monthIndex];
    const day = date.getUTCDate();
    const year = date.getFullYear();
    
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}

export const MonthDayYearByNumber = (date: Date | string) => {

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
    const month = date.getUTCMonth() + 1;
    console.log('month: ', month);
    const day = date.getUTCDate();
    const year = date.getFullYear();
    
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}
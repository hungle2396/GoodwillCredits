

export const lastLoginDate = (date: Date) => {
    // Convert to Date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    date = new Date(date);

    console.log('date: ', date);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    console.log('monthNumber: ', month);
    
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}
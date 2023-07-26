

// Day Counter
export const Days_Counter = (startDate: Date, endDate: Date) => {
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    console.log('startDateObject: ', startDateObject);
    const differentInTime = endDateObject.getTime() - startDateObject.getTime();

    const differentInDays = differentInTime / (1000 * 3600 * 24);

    console.log('Days left: ', differentInDays);

    return differentInDays;
}
/**
 * Formats a date string into "DD Month YYYY" format.
 * Example: "2024-03-23" => "23 March 2024"
 * @param date - The date string or Date object to format.
 * @returns A formatted date string.
 */
export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            reject(error);
        }
    })
}
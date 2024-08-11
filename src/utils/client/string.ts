export function isNumeric(str: string) {
    const regex = /^\d+$/;
    return regex.test(str);
}

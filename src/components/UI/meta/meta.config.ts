export const siteName = 'Coffee Shop';
export const onlyText = (text:string, length:number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
}
export const titleMerge = (title: string) => {
    return  `${title} | ${siteName}`;
}
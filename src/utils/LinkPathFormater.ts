export const LinkPathFormater = (url: string, toInsertValue: number) => {
    return url.replace("{" + url.split("{")[1].split("}")[0] + "}", toInsertValue.toString());
}
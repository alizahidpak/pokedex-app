export class StringUtils {
    upperCaseFirstLetter(str: string) {
        return str[0].toUpperCase() + str.slice(1);
    }

    removeHyphens(str: string) {
        return str.split("-").map(this.upperCaseFirstLetter).join(" ");
    }
}

export const useStringUtils = () => new StringUtils();

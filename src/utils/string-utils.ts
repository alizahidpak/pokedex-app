export class StringUtils {
  upperCaseFirstLetter(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }
}

export const useStringUtils = () => new StringUtils();

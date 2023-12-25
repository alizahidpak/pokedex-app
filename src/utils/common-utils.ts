export class CommonUtils {
    // eslint-disable-next-line @typescript-eslint/ban-types
    debounce(func: Function, wait: number) {
        let timeout: any;
        return function executedFunction(...args: any) {
            const later = () => {
                timeout = null;
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

export const useCommonUtils = () => new CommonUtils();

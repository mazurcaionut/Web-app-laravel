import { useState } from "react";

export const useLocalStorage = <T = string>(
    key: string,
    initialValue?: any
) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            return window.localStorage.getItem(key) ?? initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, valueToStore);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as [T, (value: T) => void];
};

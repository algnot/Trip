import { useState, useEffect } from 'react';

export const useLocalStorage = (key:string):[string, (value: string) => void] => {
    const [data, setData] = useState("");

    useEffect(() => {
        const localVal = window.localStorage.getItem(key);
        if(localVal) {
            setData(localVal);
        }
    },[key]);

    const setLocalStorage = (value: string) => {
        window.localStorage.setItem(key, value);
        setData(value);
    }

    return [data, setLocalStorage]
} 
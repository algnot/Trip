import { useState, useEffect } from 'react';

export const useLocalStorage = (key:string):[string, (value: string) => void, () => void] => {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch()
    },[key]);

    const setLocalStorage = (value: string) => {
        window.localStorage.setItem(key, value);
        setData(value);
    }

    const fetch = () => {
        const localVal = window.localStorage.getItem(key);
        if(localVal) {
            setData(localVal);
        }
    }

    return [data, setLocalStorage, fetch]
} 
import { useEffect, useState } from "react";

export default function useLocalstorage<T>(key: string, initialValue: T) {
	const [isMounted, setIsMounted] = useState(false);
	const [storedValue, setStoredValue] = useState<T>(() => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			localStorage.setItem(key, JSON.stringify(storedValue));
		}
	}, [storedValue]);

	return [storedValue, setStoredValue] as const;
}

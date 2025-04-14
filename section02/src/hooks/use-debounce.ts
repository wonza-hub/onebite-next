import { useEffect, useState } from "react";

interface IUseDebounceProps {
  value: string;
  delay: number;
}
export function useDebounce({ value, delay }: IUseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

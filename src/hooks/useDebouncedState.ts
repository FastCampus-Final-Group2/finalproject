import React, { useState, useEffect } from "react";

const useDebouncedState = <T>(
  initialValue: T,
  delay: number = 1000,
): [T, React.Dispatch<React.SetStateAction<T>>, T] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue];
};

export default useDebouncedState;

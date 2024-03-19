import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 300):string => {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(()=>{

    const handler = setTimeout(()=>setDebounced(value),delay)
    return ()=>clearTimeout(handler);

  }, [value, delay])

  return debounced;
};

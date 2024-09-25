import { useCallback, useState } from "react";

// @ts-ignore
export default function useAsync<T>(asyncFunction: (...args: any) => Promise<T>) {
  const [pending, setPending] = useState(false);
  const [errorState, setErrorState] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    //@ts-ignore
    async (...args: any) => {
      try {
        setPending(true);
        setErrorState(null);
        return await asyncFunction(...args);
        // @ts-ignore
      } catch (error: any) {
        setErrorState(error);
        return 0;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction],
  );
  return [pending, errorState, wrappedFunction];
}

import { useCallback, useState } from "react";

export default function useAsync<T>(asyncFunction: (...args: unknown[]) => Promise<T>) {
  const [pending, setPending] = useState(false);
  const [errorState, setErrorState] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    async (...args: unknown[]) => {
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

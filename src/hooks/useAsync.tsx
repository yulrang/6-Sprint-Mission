import { useCallback, useState } from "react";

export default function useAsync<T>(asyncFunction: (...args: any[]) => Promise<T>) {
  const [pending, setPending] = useState(false);
  const [errorState, setErrorState] = useState("");

  const wrappedFunction = useCallback(
    async (...args: any) => {
      try {
        setPending(true);
        setErrorState("");
        return await asyncFunction(...args);
      } catch (error) {
        const nextError = new Error("error");
        setErrorState(nextError.message);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction],
  );
  return [pending, errorState, wrappedFunction];
}

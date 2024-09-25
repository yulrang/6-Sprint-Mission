import { useCallback, useState } from "react";

export default function useAsync<T, Args extends any[]>(asyncFunction: (...args: Args) => Promise<T>) {
  const [pending, setPending] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    async (...args: Args) => {
      try {
        setPending(true);
        setErrorState(null);
        return await asyncFunction(...args);
      } catch (error) {
        setErrorState(error instanceof Error ? error : new Error("Unknown error"));
        return null as unknown as T; // 원하는 기본값으로 변경 가능
      } finally {
        setPending(false);
      }
    },
    [asyncFunction],
  );

  return [pending, errorState, wrappedFunction] as const; // 타입 안전성을 위해 'as const' 사용
}

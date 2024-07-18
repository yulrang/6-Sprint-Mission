import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  updatedAt: Date;
  createdAt: Date;
  image: string;
  nickname: string;
  id: number;
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  login: async ({ email, password }) => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState<{ user: User | null; isPending: boolean }>({
    user: null,
    isPending: true,
  });

  const getMe = async (accessToken: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    let nextUser: User | null = null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await res.json();
      nextUser = result;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  };

  const login = async (data: { email: string; password: string }) => {
    let accessToken;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.");
      } else {
        const result = await response.json();
        localStorage.setItem("accessToken", result.accessToken);
        await getMe(result.accessToken);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (values.user) {
      getMe();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (!context.user && !context.isPending) {
      router.push("/signin");
    }
  }, [context.user, context.isPending]);

  return context;
}

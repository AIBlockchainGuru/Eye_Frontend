import { useState, useEffect } from "react";

interface AuthUser {
  id: string;
  isDesigner: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userID = sessionStorage.getItem("userID");
    const isDesigner = sessionStorage.getItem("idDesigner");

    if (userID) {
      setUser({
        id: userID,
        isDesigner: !!isDesigner,
      });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("idDesigner");
    setUser(null);
  };

  return { user, loading, logout };
};

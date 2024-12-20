import { API_HOST } from "@/constant";
import { ApiStatus } from "@/enum";
import { User } from "@/type";
import { createContext, useContext, useEffect, useState } from "react";

const TOKEN_KEY_IN_LOCAL_STORAGE = "_token";
const ORIGINAL_PAGE_BEFORE_LOGIN_KEY_IN_LOCAL_STORAGE =
  "_originalPageBeforeLogin";

export const AuthContext = createContext({} as any);

export const useAuthState = (): {
  state: ApiStatus;
  user: User | null;
  isShownLoginPopup: boolean;
  showLoginPopup: () => void;
  hideLoginPopup: () => void;
  token: string | null;
  setToken: (newToken: string) => void;
  doGoogleLogin: () => void;
  doGithubLogin: () => void;
  goBackToPageBeforeLoginOrHomePage: () => void;
  refreshUserInfo: () => void;
} => {
  const [state, setState] = useState<ApiStatus>(ApiStatus.loading);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isShownLoginPopup, setIsShownLoginPopup] = useState<boolean>(false);
  const [latestRefreshInfoAt, setLatestRefreshInfoAt] = useState<number>(
    Date.now()
  );

  useEffect(() => {
    if (!token) {
      if (typeof window !== "undefined") {
        const existsToken = localStorage.getItem(TOKEN_KEY_IN_LOCAL_STORAGE);
        if (existsToken) {
          setToken(existsToken);
        } else {
          setState(() => ApiStatus.done);
        }
      }
    }
    if (token) {
      const fetchUser = async () => {
        setState(() => ApiStatus.loading);
        try {
          const res = await fetch(`${API_HOST}/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status !== 200) {
            setToken("");
            localStorage.removeItem(TOKEN_KEY_IN_LOCAL_STORAGE);
            setState(() => ApiStatus.error);
            return;
          }
          const user = await res.json();
          setUser(user);
          setState(() => ApiStatus.done);
          console.debug({ user });
        } catch (error) {
          setState(() => ApiStatus.error);
          console.error("Error:", error);
        }
      };
      fetchUser();
    }
  }, [token, setToken, latestRefreshInfoAt]);

  const doGoogleLogin = () => {
    localStorage.setItem(
      ORIGINAL_PAGE_BEFORE_LOGIN_KEY_IN_LOCAL_STORAGE,
      window.location.href
    );
    window.location.href = `${API_HOST}/auth/google`;
  };

  const doGithubLogin = () => {
    localStorage.setItem(
      ORIGINAL_PAGE_BEFORE_LOGIN_KEY_IN_LOCAL_STORAGE,
      window.location.href
    );
    window.location.href = `${API_HOST}/auth/github`;
  };

  const goBackToPageBeforeLoginOrHomePage = () => {
    const url =
      localStorage.getItem(ORIGINAL_PAGE_BEFORE_LOGIN_KEY_IN_LOCAL_STORAGE) ||
      "/";
    localStorage.removeItem(ORIGINAL_PAGE_BEFORE_LOGIN_KEY_IN_LOCAL_STORAGE);
    window.location.href = url;
  };

  return {
    state,
    user,
    isShownLoginPopup,
    showLoginPopup: () => setIsShownLoginPopup(true),
    hideLoginPopup: () => setIsShownLoginPopup(false),
    token,
    setToken: (newToken: string) => {
      localStorage.setItem(TOKEN_KEY_IN_LOCAL_STORAGE, newToken);
      setToken(newToken);
    },
    doGoogleLogin,
    doGithubLogin,
    goBackToPageBeforeLoginOrHomePage,
    refreshUserInfo: () => setLatestRefreshInfoAt(Date.now()),
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

"use client";

import { useAuth } from "@/context/useAuth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SigninPage() {
  const { setToken, user, goBackToPageBeforeLoginOrHomePage } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setToken(token);
    } else {
      goBackToPageBeforeLoginOrHomePage();
    }
  }, [token])

  useEffect(() => {
    if (user) {
      goBackToPageBeforeLoginOrHomePage();
    }
  }, [user])

  return null;
}

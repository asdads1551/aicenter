"use client";

import { useAuth } from "@/context/useAuth";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SigninPage() {
  const { setToken, user, goBackToPageBeforeLoginOrHomePage } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token])

  useEffect(() => {
    if (user) {
      goBackToPageBeforeLoginOrHomePage();
    }
  }, [user])

  return null;
}

const Page = () => <Suspense><SigninPage /></Suspense>
export default Page;

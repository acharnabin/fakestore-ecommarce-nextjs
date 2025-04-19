import { authStore } from "@/store/auth.store";
import React, { useEffect } from "react";
import { useStoreState } from "zustand-x";

const ProtectedRouteWrapper = ({children}:{children:React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useStoreState(authStore, "isLoggedIn");

  console.log(isLoggedIn,"isLoggedIn")

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token?.length) {
      setIsLoggedIn(true);
    }
  }, []);


  return <>{children}</>



};

export default ProtectedRouteWrapper;

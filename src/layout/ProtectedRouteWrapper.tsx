import { authStore } from "@/store/auth.store";
import React, { useEffect } from "react";
import { useStoreState } from "zustand-x";
import Cookies from "js-cookie";
import { createClient } from "@/lib/supabase/client";

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useStoreState(authStore, "isLoggedIn");
  const [user,setUser]=useStoreState(authStore,'user');

  const fetchUSerDetails = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    setUser(data?.user)
    
  };

  console.log(isLoggedIn, "isLoggedIn");

  useEffect(() => {
    const token = Cookies.get("token");

    if (token?.length) {
      fetchUSerDetails();
      setIsLoggedIn(true);
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRouteWrapper;

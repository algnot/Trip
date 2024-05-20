import axios from "axios";
import { IdTokenResult } from "firebase/auth";
import { useState, useEffect } from "react";

export const login = async (auth: IdTokenResult) => {
  if (!auth) {
    return;
  }

  try {
    const response = await axios.post(
      "/api/login",
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {}

  return null;
};

export const logout = async () => {
  window.localStorage.clear();
  return await axios.get("/api/logout");
};

export const isUserLogin = async () => {
  try {
    return (await axios.get("/api/login")).data;
  } catch (e) {
    return { isLogged: false };
  }
};

export const getUser = async () => {
  try {
    return (await axios.get("/api/me")).data;
  } catch (e) {
    return { };
  }
};

export const useUser = ():[any, (value: string) => void] => {
  const [userData, setUserData] = useState({
    data: {
      name: "",
      imageUrl: "",
    }
  });

  useEffect(() => {
    const getUserData = async () => {
      const catchData = window.localStorage.getItem("catch-data-user")
      if(!catchData) {
        const userData = await getUser();
        window.localStorage.setItem("catch-data-user", JSON.stringify(userData))
        setUserData(userData)
      } else {
        setUserData(JSON.parse(catchData))
      }
    }

    if(!userData.data.name){
      getUserData()
    }
  });

  const refetch = async () => {
    const userData = await getUser();
    window.localStorage.setItem("catch-data-user", JSON.stringify(userData))
    setUserData(userData)
  }

  return [userData, refetch];
};

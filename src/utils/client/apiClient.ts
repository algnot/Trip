import axios from "axios";
import { UserCredential } from "firebase/auth";
import { useState, useEffect } from 'react';

export const login = async (auth: UserCredential | null) => {
  if (!auth) {
    return;
  }

  try {
    const response = await axios.post(
      "/api/login",
      {},
      {
        headers: {
          Authorization: `Bearer ${await auth.user.getIdToken()}`,
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

export const useUser = () => {
  const [userData, setUserData] = useState({
    data: {
      name: "",
      imageUrl: "",
    }
  });

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUser();
      setUserData(userData)
    }

    if(!userData.data.name){
      getUserData()
    }
  });

  return userData;
};

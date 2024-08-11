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
    return false;
  }
};

export const addPayment = async (paymentNumber: string) => {
  try {
    const response = await axios.post("/api/payment", {
      paymentNumber: paymentNumber,
    });
    if (response.status === 200) {
      window.localStorage.setItem("input-text-paymentNumber", "");
      window.localStorage.setItem(
        "input-select-payment",
        JSON.stringify({
          label: `พร้อมเพย์ ${paymentNumber}`,
          value: paymentNumber,
          isSelected: true,
          disabled: false,
        })
      );
      return response.data;
    }
  } catch (e) {}

  return null;
};

export const useUser = (): [any, () => Promise<void>] => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const getUserData = async () => {
      let catchData = window.localStorage.getItem("catch-data-user");
      if (catchData) {
        catchData = JSON.parse(catchData);
      }

      if (Object.keys(catchData ?? {}).length === 0) {
        const userData = await getUser();
        if (!userData) {
          window.location.href = "/logout";
        }
        window.localStorage.setItem(
          "catch-data-user",
          JSON.stringify(userData)
        );
        setUserData(userData);
      } else {
        setUserData(catchData);
      }
    };

    if (Object.keys(userData).length === 0) {
      getUserData();
    }
  });

  const refetch = async () => {
    const userData = await getUser();
    window.localStorage.setItem("catch-data-user", JSON.stringify(userData));
    setUserData(userData);
  };

  return [userData, refetch];
};

import { useState } from "react";
import { loginUser } from "../services/api";

export const useFetchUser = () => {
 const [userId, setUserId] = useState({})

 const login = async (login, password) => {
  const { userId: id } = await loginUser({ login, password });
  setUserId(id)
  return id
 }

 return [userId, login]
}
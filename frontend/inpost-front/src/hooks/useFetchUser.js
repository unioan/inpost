import { useState } from "react";
import { loginUser, signup } from "../services/api";

export const useFetchUser = () => {
 const [userId, setUserId] = useState({})

 const login = async (login, password) => {
  const { userId: id } = await loginUser({ login, password });
  setUserId(id)
  return id
 }

 const createNewUser = async (login, password) => {
  const { userId: id } = await signup({ login, password });
  setUserId(id)
  return id
 }

 return [userId, login, signup]
}
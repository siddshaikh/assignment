import { createContext, useState } from "react";

export const userContext = createContext({
  name: "",
  setName: (name: string) => {},
  email: "",
  setEmail: (email: string) => {},
  phone: 0,
  setPhone: (phone: number) => {},
  active: "",
  setActive: (active: string) => {},
  // localstorage items
  storedEmail: "",
  storedName: "",
  storedPhone: "",
});
interface ContextProviderProp {
  children?: React.ReactNode;
}
export const UserProvider: React.FC<ContextProviderProp> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>(Number);
  const [active, setActive] = useState<string>("");
  const {
    name: storedName,
    email: storedEmail,
    phone: storedPhone,
  } = JSON.parse(localStorage.getItem("loginItems")) || {};

  return (
    <userContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        active,
        setActive,
        storedEmail,
        storedName,
        storedPhone
      }}
    >
      {children}
    </userContext.Provider>
  );
};

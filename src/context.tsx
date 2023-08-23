import { createContext, useState } from "react";


interface UserContextType {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: number;
  setPhone: (phone: number) => void;
  active: string;
  setActive: (active: string) => void;
  // localstorage items
  storedEmail: string;
  storedName: string;
  storedPhone: string;
}

export const userContext = createContext<UserContextType>({
  name: "",
  setName: () => { },
  email: "",
  setEmail: () => { },
  phone: 0,
  setPhone: () => { },
  active: "",
  setActive: () => { },
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
    name: storedName = "",
    email: storedEmail = "",
    phone: storedPhone = 0
  } = JSON.parse(localStorage.getItem("loginItems") ?? "{}")

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

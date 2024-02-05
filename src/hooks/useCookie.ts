import { cookies } from "next/headers";

const useCookie = () => {
  const getCookie = (key: string) => cookies().get(key);

  const setCookie = (key: string, value: string) =>
    cookies().set(key, value);

  const removeCookie = (key: string) => cookies().delete(key);

  return { setCookie, getCookie, removeCookie };
};

export default useCookie;
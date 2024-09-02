import { myMenusState } from "@/atoms/myMenus";
import localStorage from "@/service/localStorage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useMyMenus() {
  const [myMenus, setMyMenus] = useRecoilState(myMenusState);

  useEffect(() => {
    const storedMyMenus = localStorage.myMenus.get();
    setMyMenus(storedMyMenus);
  }, [setMyMenus]);

  const addMyMenu = (menu: string) => {
    if (myMenus.includes(menu)) return;
    localStorage.myMenus.set([...myMenus, menu]);
    setMyMenus((prev) => [...prev, menu]);
  };

  const removeMyMenu = (menu: string) => {
    localStorage.myMenus.set(myMenus.slice().filter((myMenu) => myMenu !== menu));
    setMyMenus((prev) => prev.slice().filter((myMenu) => myMenu !== menu));
  };

  return { myMenus, addMyMenu, removeMyMenu };
}

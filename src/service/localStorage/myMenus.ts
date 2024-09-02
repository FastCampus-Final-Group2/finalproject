const MY_MENUS_KEY = "GLT_MY_MENUS";

export const myMenusService = {
  get: () => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(MY_MENUS_KEY);
      return jsonValue ? (JSON.parse(jsonValue) as string[]) : [];
    }
    return [];
  },
  set: (myMenus: string[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(MY_MENUS_KEY, JSON.stringify(myMenus));
    }
  },
};

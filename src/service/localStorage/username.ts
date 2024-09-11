const USERNAME_KEY = "GLT_USERNAME";

export const usernameService = {
  get: () => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(USERNAME_KEY);
      return jsonValue ? (JSON.parse(jsonValue) as string) : "";
    }
    return "";
  },
  set: (username: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USERNAME_KEY, JSON.stringify(username));
    }
  },
  remove: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USERNAME_KEY);
    }
  },
};

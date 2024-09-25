import { NameType } from "@/contexts/TabStateContext";

export const replaceUrl = (url: string) => {
  if (url === "/dispatch/manual") {
    return "/dispatch";
  }

  if (new RegExp(/^\/control\/detail\/\d+$/).test(url)) {
    return "/control";
  }

  return url;
};

export const urlToName = (url: string): NameType | undefined => {
  if (url === "/control" || new RegExp(/^\/control\/detail\/\d+$/).test(url)) {
    return "차량관제";
  }
};

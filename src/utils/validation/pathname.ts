export const matchPathname = (pathname: string, href?: string) => {
  if (!href) return false;

  if (pathname === "/dispatch/manual") {
    return "/dispatch" === href;
  }

  if (new RegExp(/^\/control\/detail\/\d+$/).test(pathname)) {
    return "/control" === href;
  }

  return pathname === href;
};

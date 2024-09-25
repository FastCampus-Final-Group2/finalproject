import { usePathname, useSearchParams } from "next/navigation";

const useFullUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = new URLSearchParams(searchParams.toString()).toString();
  const fullUrl = queryString ? `${pathname}?${queryString}` : pathname;

  return fullUrl;
};

export default useFullUrl;

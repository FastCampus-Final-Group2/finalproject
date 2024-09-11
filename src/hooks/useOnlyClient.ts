import { useEffect, useState } from "react";

const useOnlyClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default useOnlyClient;

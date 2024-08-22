import GlobalNavBar from "@/components/GlobalNavBar";
import SideNavBar from "@/components/SideNavBar";
import { SNBStateContextProvider } from "@/contexts/SNBStateContext";

interface WithAuthLayoutProps {
  children?: React.ReactNode;
}

const WithAuthLayout = ({ children }: WithAuthLayoutProps) => {
  return (
    <div className="flex h-screen w-screen">
      <SNBStateContextProvider>
        <SideNavBar />
      </SNBStateContextProvider>
      <div className="flex-1">
        <GlobalNavBar />
        <main className="h-[calc(100vh-104px)] bg-blue-30">{children}</main>
      </div>
    </div>
  );
};

export default WithAuthLayout;

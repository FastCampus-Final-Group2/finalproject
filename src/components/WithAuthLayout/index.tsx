import GlobalNavBar from "@/components/GlobalNavBar";
import SideNavBar from "@/components/SideNavBar";
import { SNBStateContextProvider } from "@/contexts/SNBStateContext";
import { TabStateContextProvider } from "@/contexts/TabStateContext";

interface WithAuthLayoutProps {
  children?: React.ReactNode;
}

const WithAuthLayout = ({ children }: WithAuthLayoutProps) => {
  return (
    <div className="flex h-screen w-screen">
      <TabStateContextProvider>
        <SNBStateContextProvider>
          <SideNavBar />
        </SNBStateContextProvider>
        <div className="flex-1">
          <GlobalNavBar />
          <main className="h-[calc(100vh-104px)] bg-white">{children}</main>
        </div>
      </TabStateContextProvider>
    </div>
  );
};

export default WithAuthLayout;

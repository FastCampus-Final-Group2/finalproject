import GlobalNavBar from "@/components/GlobalNavBar";
import SideNavBar from "@/components/SideNavBar";

interface WithAuthLayoutProps {
  children?: React.ReactNode;
}

const WithAuthLayout = ({ children }: WithAuthLayoutProps) => {
  return (
    <div className="flex h-screen w-screen">
      <SideNavBar />
      <div className="flex-1">
        <GlobalNavBar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default WithAuthLayout;

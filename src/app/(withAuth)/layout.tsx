import WithAuthLayout from "@/components/WithAuthLayout";
import { SNBStateContextProvider } from "@/contexts/SNBStateContext";
import { TabStateContextProvider } from "@/contexts/TabStateContext";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TabStateContextProvider>
      <SNBStateContextProvider>
        <WithAuthLayout>{children}</WithAuthLayout>
      </SNBStateContextProvider>
    </TabStateContextProvider>
  );
};

export default Template;

import WithAuthLayout from "@/components/WithAuthLayout";
import { SNBStateContextProvider } from "@/contexts/SNBStateContext";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SNBStateContextProvider>
      <WithAuthLayout>{children}</WithAuthLayout>
    </SNBStateContextProvider>
  );
};

export default Template;

import WithAuthLayout from "@/components/WithAuthLayout";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <WithAuthLayout>{children}</WithAuthLayout>;
};

export default Template;

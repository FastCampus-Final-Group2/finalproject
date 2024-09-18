import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import RecoilRootProvider from "@/providers/RecoilRootProvider";
import { TabStateContextProvider } from "@/contexts/TabStateContext";
import { QueryProvider } from "@/providers/query";

export const metadata: Metadata = {
  title: {
    default: "GLT Korea TMS",
    template: "%s | GLT Korea TMS",
  },
  description: "GLT Korea TMS서비스에 오신 것을 환영합니다.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className="overflow-hidden">
        <RecoilRootProvider>
          <QueryProvider>
            <TabStateContextProvider>{children}</TabStateContextProvider>
          </QueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
};

export default RootLayout;

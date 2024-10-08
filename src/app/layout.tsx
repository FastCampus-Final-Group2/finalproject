import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import RecoilRootProvider from "@/providers/RecoilRootProvider";
import { QueryProvider } from "@/providers/query";

export const metadata: Metadata = {
  title: {
    default: "GLT Korea TMS",
    template: "%s | GLT Korea TMS",
  },
  description: "GLT Korea TMS서비스에 오신 것을 환영합니다.",
  icons: {
    icon: "/favicon.ico",
  },
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
          <QueryProvider>{children}</QueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
};

export default RootLayout;

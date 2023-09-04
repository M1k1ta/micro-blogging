"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

export const metadata = {
  title: 'MicroBlogging',
}

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode,
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout;

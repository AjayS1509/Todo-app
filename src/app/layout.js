import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Todo App",
  description: "Todo app Created by Aj",
  icons: {
    icon: "/Todo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

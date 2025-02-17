import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen mx-auto text-slate-900 bg-slate-50 flex flex-col">
        <main className="flex flex-1 ">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}

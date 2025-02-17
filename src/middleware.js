import { NextResponse } from "next/server";
import { getLoggedInUser } from "./appwrite/auth";

export async function middleware(request) {
  const user = await getLoggedInUser();

  const permission = user?.labels[0] === "admin";

  if (!permission) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin(.*)"],
};

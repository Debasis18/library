import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div>
      <h1>This Book is NotFound</h1>
      <Link href={"/dashboard/admin/books"}>Back to All Books</Link>
    </div>
  );
}

export default NotFound;

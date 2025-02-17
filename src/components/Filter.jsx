"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Filter(categories) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  // nevegating to url
  const router = useRouter();
  // Getting the initial url
  const pathname = usePathname();

  const activeFilter = searchParams.get("category") ?? "all";

  function handelFilter(filter) {
    // creating the url
    const params = new URLSearchParams(searchParams);
    // modifiying the url
    params.set("category", filter);
    params.set("bookname", "");
    //replacing the url
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(name) {
    const params = new URLSearchParams(searchParams);
    params.set("bookname", name);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border rounded-lg p-2 my-4 border-gray-800 md:flex justify-between items-center bg-white ">
      <div className="flex flex-wrap">
        <Button
          filter="all"
          handelFilter={handelFilter}
          activeFilter={activeFilter}
        >
          All Boks
        </Button>
        {categories.categories.map((category) => (
          <Button
            key={category}
            filter={category}
            handelFilter={handelFilter}
            activeFilter={activeFilter}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="border flex items-center w-fit px-4">
        <input
          className="mx-2 px-4 py-2  focus:outline-none w-full text-gray-600"
          type="search"
          placeholder="Search book..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            // handleSearch(value);
          }}
        />
        <Search
          className="w-6 h-6 text-gray-400"
          onClick={() => {
            setSearch("");
            handleSearch(search);
          }}
        />
      </div>
    </div>
  );
}

function Button({ filter, handelFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 rounded-sm py-2 mb-4 md:mb-0 ${
        filter === activeFilter
          ? "bg-indigo-900 text-slate-100"
          : " text-slate-800"
      }`}
      onClick={() => handelFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;

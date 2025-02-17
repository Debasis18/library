"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter(categories) {
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
    //replacing the url
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2 border px-2 py-1 w-fit">
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
  );
}

function Button({ filter, handelFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 rounded-sm py-2 text-slate-200 hover:bg-indigo-900 hover:text-slate-200 ${
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

import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import s from "./searchable-layout.module.css";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";

async function filterFetchedData(val: string) {
  if (!val) return [];
  console.log("서버로부터 데이터를 가져오는 중...");
  const res = await fetchBooks();
  return res.filter((item) => item.title.includes(val));
}

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search, delay: 300 });
  const [result, setResult] = useState<BookData[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAndFilter() {
      // debouncedSearch가 바뀔 때마다 서버에서 데이터를 가져옴
      const books = await filterFetchedData(debouncedSearch);
      setResult(books);
    }
    fetchAndFilter();
  }, [debouncedSearch]);

  const q = router.query.q as string;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setSearch(q || "");
  }, [q]);
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className={s.searchable_container}>
        <div className={s.search_box_container}>
          <input
            value={search}
            onKeyDown={onkeydown}
            onChange={onChangeSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="검색어를 입력하세요..."
          />
          {result.length > 0 && isFocused && (
            <ul className={s.dropdown_list}>
              {result.map((item) => (
                <li key={item.id}>
                  <a href={`/book/${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </>
  );
}

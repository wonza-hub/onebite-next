import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import s from "./searchable-layout.module.css";

/**
 * LAYOUT: 검색 기능을 포함한 레이아웃
 */
export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  // 해결방법: useEffect 대신 렌더링 중 상태 업데이트 패턴 사용
  // q(props)가 변경되면 search(state)도 즉시 업데이트합니다.
  const [targetQ, setTargetQ] = useState(q);

  if (q !== targetQ) {
    setSearch(q || "");
    setTargetQ(q);
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={s.searchable_container}>
        <input
          type="text"
          value={search}
          placeholder="검색어를 입력하세요..."
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}

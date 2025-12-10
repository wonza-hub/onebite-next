import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const q = router.query.q;

  return (
    <>
      <h1>검색 결과 : {q}</h1>
    </>
  );
}

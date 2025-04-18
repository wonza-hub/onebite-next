import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>에러가 발생했습니다.</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  // 현재 페이지의 메타 데이터를 동적으로 생성하는 역할을 함.
  const { q } = await searchParams;

  return {
    title: `${q}:한입북스 검색`,
    description: `한입북스의 ${q} 검색 결과입니다.`,
    openGraph: {
      title: `${q}:한입북스 검색`,
      description: `한입북스의 ${q} 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense
      key={resolvedSearchParams.q}
      fallback={<BookListSkeleton count={3} />}
    >
      {/* SearchResult: 비동기 fetching 진행 */}
      <SearchResult q={resolvedSearchParams.q || ""} />
    </Suspense>
  );
}

import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";
// import {
//   GetServerSidePropsContext,
//   GetStaticPropsContext,
//   InferGetStaticPropsType,
// } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

// // export const getServerSideProps = async (
// //   context: GetServerSidePropsContext
// // ) => {
// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q; // SSG로는 쿼리스트링을 불러올 수 없음 => 클라이언트 사이드에서 조작해야 함
//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };
export default function Page(
  {
    // books,
    // }: InferGetStaticPropsType<typeof getStaticProps>) {
  }
) {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string); // 쿼리스트링을 통해 검색된 도서 목록을 가져옴
    setBooks(data); // 가져온 도서 목록을 상태에 저장
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>네스트넷 도서관 | 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="네스트넷 도서관" />
        <meta
          property="og:description"
          content="네스트넷 도서관에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

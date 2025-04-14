import { ReactNode } from "react";
import s from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// // SSR
// export const getServerSideProps = async () => {
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// SSG
export const getStaticProps = async () => {
  console.log("ssg 인덱스 페이지");
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // // ISR 적용
    // revalidate: 3,
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>네스트넷 도서관</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="네스트넷 도서관" />
        <meta
          property="og:description"
          content="네스트넷 도서관에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div className={s.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

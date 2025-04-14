import s from "./[id].module.css";
import {
  // GetServerSidePropsContext,
  GetStaticPropsContext,
  // InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    // 정적 생성할 경로를 지정하는 부분
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // 정적 생성되지 않은 경로에 대한 fallback 처리
    // true, false, 'blocking' 중 하나를 선택할 수 있음
    // true: 정적 생성되지 않은 경로에 대한 fallback을 제공하며, 페이지가 로드될 때 서버에서 데이터를 가져옴
    // false: 정적 생성되지 않은 경로에 대한 fallback을 제공하지 않음. 404 페이지로 이동함
    // 'blocking': 정적 생성되지 않은 경로에 대한 fallback을 제공하며, 페이지가 로드될 때 서버에서 데이터를 가져옴. 클라이언트에게는 페이지가 준비될 때까지 기다리게 함
    fallback: true,
  };
};
// // SSR
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  // 정적 생성된 페이지에 대한 fallback을 제공하지 않음
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    // fallback 상태일 때도 메타태그를 보여줄 수 있음
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
      </>
    );
  }
  if (!book) return "문제가 발생했습니다 다시 시도하세요";
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div key={id} className={s.container}>
        <div
          className={s.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={s.title}>{title}</div>
        <div className={s.subTitle}>{subTitle}</div>
        <div className={s.author}>
          {author} | {publisher}
        </div>
        <div className={s.description}>{description}</div>
      </div>
    </>
  );
}

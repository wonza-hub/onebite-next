import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import Image from "next/image";
import { Metadata } from "next";

// export const dynamicParams = false;
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!res.ok) {
    throw new Error(`Book List Error: ${res.statusText}`);
  }
  const books: BookData[] = await res.json();

  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>에러가 발생했습니다.</div>;
  }
  const book = await response.json();
  const { title, subTitle, author, publisher, description, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* <img src={coverImgUrl} /> */}
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표시 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } } // revalidateTag을 사용하기 위해 추가
  );

  if (!response.ok) {
    throw new Error(`Review List Error: ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // cf) Reqeust Memoization에 의해 동일한 페이지 내에서 같은 api에 대해 중복 호출은 발생하지 않음
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!res.ok) {
    throw new Error(`Review List Error: ${res.statusText}`);
  }

  const book: BookData = await res.json();

  return {
    title: `${book.title}:한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title}:한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}

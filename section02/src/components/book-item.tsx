import { BookData } from "@/types";
import Link from "next/link";
import s from "./book-item.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={s.container}>
      <img src={coverImgUrl} />
      <div>
        <div className={s.title}>{title}</div>
        <div className={s.subTitle}>{subTitle}</div>
        <br />
        <div className={s.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}

import { ReviewData } from "@/types";
import s from "./review-item.module.css";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className={s.container}>
      <div className={s.author}>{author}</div>
      <div className={s.content}>{content}</div>
      <div className={s.bottom_container}>
        <div className={s.date}>{new Date(createdAt).toLocaleString()}</div>
        <div className={s.delete_btn}>삭제하기</div>
      </div>
    </div>
  );
}

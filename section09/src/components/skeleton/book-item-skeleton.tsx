import s from "./book-item-skeleton.module.css";

export default function BookItemSkeleton() {
  return (
    <div className={s.container}>
      <div className={s.cover_img}></div>
      <div className={s.info_container}>
        <div className={s.title}></div>
        <div className={s.subtitle}></div>
        <br />
        <div className={s.author}></div>
      </div>
    </div>
  );
}

// COMPONENT: 전역 레이아웃
import Link from "next/link";
import s from "./global-layout.module.css";
import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      <main className={s.main}>{children}</main>
      <footer className={s.footer}>제작 @woonil</footer>
    </div>
  );
}

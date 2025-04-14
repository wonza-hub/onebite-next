import Link from "next/link";
import { ReactNode } from "react";
import s from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <Link href={"/"}>📚 Nestnet Library</Link>
      </header>
      <main>{children}</main>
      <footer className={s.footer}>제작 @woonil</footer>
    </div>
  );
}

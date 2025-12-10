import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
  };

  // PRE-FETCHING:프로그래밍 방식으로 페이지 이동 시 미리 페이지를 로드하기 위해 사용
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* PRE-FETCHING: Link는 기본적으로 수행 */}
        <Link href={"/search"}>search</Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>click</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}

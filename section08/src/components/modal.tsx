"use client";

import { ReactNode, useEffect } from "react";
import s from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  });

  return createPortal(
    <dialog
      className={s.modal}
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 배경 클릭 시, 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLDialogElement
  );
}

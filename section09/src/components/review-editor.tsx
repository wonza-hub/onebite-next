"use client";

import s from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  ); // 액션 상태를 사용하여 서버 컴포넌트에서 클라이언트 컴포넌트로 전환

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  });

  return (
    <section>
      <form className={s.form_container} action={formAction}>
        {/* bookId는 hidden으로 전달, readOnly로 오류 숨김 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={s.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "리뷰 작성중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}

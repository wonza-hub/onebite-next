"use server";

export async function createReviewAction(formData: FormData) {
  // File 타입은 받지 않으므로 null이 아니면 문자열로 변환
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.status);
    if (!response.ok) {
      throw new Error("리뷰 작성에 실패했습니다.");
    }
  } catch (err) {
    console.error(err);
    return;
  }
}

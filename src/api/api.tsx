import { GetArticlesResult } from "@/src/types/article";
import { GetProductResult } from "@/src/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
let accessToken: string;
if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken") ?? "";
}

export async function getArticles({ order, page = 1, pageSize, keyword = "" }: { order: string; page: number; pageSize: number; keyword?: string }): Promise<GetArticlesResult> {
  const query = `?orderBy=${order}&page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  let response;
  try {
    response = await fetch(`${BASE_URL}/articles${query}`);
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getArticleDetail(articleId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/articles/${articleId}`);
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getArticleComments(articleId: string, limit: number, cursor: number) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/articles/${articleId}/comments/?limit=${limit}&cursor=${cursor}`);
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function postArticle(data: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 등록에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function editArticle(articleId: string, data: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteArticle(articleId: string) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function postArticleComment(articleId: string, data: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("댓글 등록에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function EditComment(commentId: string, data: Record<string, string>) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("댓글을 수정하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteComment(commentId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("댓글을 삭제하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function postLike(articleId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/articles/${articleId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("좋아요 업데이트에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteLike(articleId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/articles/${articleId}/like`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("좋아요 업데이트에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function uploadImg(data: FormData) {
  console.log(accessToken);
  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }
  const body = await response.json();
  return body.url;
}

export async function getItems({ order, page, pageSize, keyword = "" }: { order: string; page: number; pageSize: number; keyword?: string }): Promise<GetProductResult> {
  const query = `?orderBy=${order}&page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  let response;
  try {
    response = await fetch(`${BASE_URL}/products${query}`);
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("아이템을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function postProduct(formData: FormData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("아이템을 등록하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getProductDetail(productId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/products/${productId}`);
  } catch (error) {
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("아이템을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getProductComments(productId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/products/${productId}/comments/?limit=9999`);
  } catch (error) {
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body.list;
}

export async function postProductComment(productId: string, data: Record<string, unknown>) {
  console.log(accessToken);
  const response = await fetch(`${BASE_URL}/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("댓글 등록에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function postProductLike(productId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("좋아요 업데이트에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteProductLike(productId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("좋아요 업데이트에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function postItem(data: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 등록에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function editItem(productId: number, data: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteItem(productId: string) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error("주소가 유효하지 않습니다.");
  }
  if (!response.ok) {
    throw new Error("상품 삭제에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function join(data: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

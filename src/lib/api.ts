const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";
function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("papers_token") : null;
  return token ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` } : { "Content-Type": "application/json" };
}
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
async function refreshToken(): Promise<boolean> {
  const refresh = typeof window !== "undefined" ? localStorage.getItem("papers_refresh") : null;
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    if (json.data?.accessToken) {
      localStorage.setItem("papers_token", json.data.accessToken);
      if (json.data.refreshToken) localStorage.setItem("papers_refresh", json.data.refreshToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
async function authFetch(url: string, init?: RequestInit): Promise<Response> {
  let res = await fetch(url, { ...init, headers: { ...getAuthHeaders(), ...init?.headers } });
  if (res.status === 401 && typeof window !== "undefined" && localStorage.getItem("papers_refresh")) {
    // Deduplicate concurrent refresh calls
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshToken().finally(() => { isRefreshing = false; });
    }
    const success = await refreshPromise;
    if (success) {
      // Retry with new token
      res = await fetch(url, { ...init, headers: { ...getAuthHeaders(), ...init?.headers } });
    } else {
      // Refresh failed — clear session
      localStorage.removeItem("papers_user");
      localStorage.removeItem("papers_token");
      localStorage.removeItem("papers_refresh");
    }
  }
  return res;
}
export interface ApiBook {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverUrl: string | null;
  price: number;
  pageCount: number | null;
  language: string | null;
  author: {
    id: string;
    penName: string | null;
    user: { firstName: string; lastName: string; avatarUrl: string | null };
  };
  _count: { reviews: number };
}
export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  _count: { books: number };
  children?: ApiCategory[];
}
export interface ApiBookDetail {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverUrl: string | null;
  price: number;
  pageCount: number | null;
  language: string | null;
  isbn: string | null;
  fileFormat: string | null;
  publishedAt: string | null;
  createdAt: string;
  author: {
    id: string;
    penName: string | null;
    bio: string | null;
    photoUrl: string | null;
    user: { firstName: string; lastName: string; avatarUrl: string | null };
  };
  categories: { id: string; category: { id: string; name: string; slug: string } }[];
  _count: { reviews: number; purchases: number };
}
export interface ReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { id: string; firstName: string; lastName: string; avatarUrl: string | null };
}
export interface ReviewsResponse {
  data: ReviewItem[];
  averageRating: number;
  totalRatings: number;
  ratingDistribution: Record<string, number>;
}
export async function fetchBooks(params: {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
} = {}): Promise<{ books: ApiBook[]; total: number }> {
  try {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.q) searchParams.set("q", params.q);
    if (params.categoryId) searchParams.set("categoryId", params.categoryId);
    const res = await fetch(`${API_URL}/books?${searchParams.toString()}`);
    if (!res.ok) return { books: [], total: 0 };
    const json = await res.json();
    return {
      books: json.data ?? [],
      total: json.pagination?.total ?? 0,
    };
  } catch {
    return { books: [], total: 0 };
  }
}
export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export async function fetchStats(): Promise<{ totalBooks: number; totalAuthors: number }> {
  try {
    const [booksRes, authorsRes] = await Promise.all([
      fetch(`${API_URL}/books?limit=1`),
      fetch(`${API_URL}/authors?limit=1`),
    ]);
    let totalBooks = 0;
    let totalAuthors = 0;
    if (booksRes.ok) {
      const json = await booksRes.json();
      totalBooks = json.pagination?.total ?? 0;
    }
    if (authorsRes.ok) {
      const json = await authorsRes.json();
      totalAuthors = json.pagination?.total ?? 0;
    }
    return { totalBooks, totalAuthors };
  } catch {
    return { totalBooks: 0, totalAuthors: 0 };
  }
}
export async function fetchBookDetail(id: string): Promise<ApiBookDetail | null> {
  try {
    const res = await fetch(`${API_URL}/books/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
export async function fetchReviews(bookId: string): Promise<ReviewsResponse | null> {
  try {
    const res = await fetch(`${API_URL}/reviews/books/${bookId}/reviews?limit=20`);
    if (!res.ok) return null;
    const json = await res.json();
    return {
      data: json.data ?? [],
      averageRating: json.averageRating ?? 0,
      totalRatings: json.totalRatings ?? 0,
      ratingDistribution: json.ratingDistribution ?? {},
    };
  } catch {
    return null;
  }
}
export async function fetchTrendingBooks(limit = 10): Promise<ApiBook[]> {
  try {
    const res = await fetch(`${API_URL}/books/trending?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export async function fetchNewBooks(limit = 10): Promise<ApiBook[]> {
  try {
    const res = await fetch(`${API_URL}/books/new?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export async function fetchRecommendedBooks(limit = 10): Promise<ApiBook[]> {
  try {
    const res = await fetch(`${API_URL}/books/recommended?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export interface AuthorDetail {
  id: string;
  penName: string | null;
  bio: string | null;
  photoUrl: string | null;
  user: { firstName: string; lastName: string; avatarUrl: string | null };
  books?: { id: string; title: string; slug: string; coverUrl: string | null; price: number; publishedAt: string | null }[];
  _count?: { followers: number };
}
export async function fetchAuthor(id: string): Promise<AuthorDetail | null> {
  try {
    const res = await fetch(`${API_URL}/authors/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
// ─── Authenticated API calls ───
export interface PurchaseResponse {
  id: string;
  bookId: string;
  amount: number;
  paymentMethod: string;
  phoneNumber: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paymentRef: string | null;
  operator: string | null;
  failureCode: string | null;
  failureMessage: string | null;
  createdAt: string;
}
export async function createPurchase(bookId: string, paymentMethod: "MTN" | "OM", phoneNumber: string): Promise<{ success: boolean; data?: PurchaseResponse; message?: string }> {
  try {
    const res = await authFetch(`${API_URL}/purchases`, {
      method: "POST",
            body: JSON.stringify({ bookId, paymentMethod, phoneNumber }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json.message || "Erreur lors du paiement" };
    return { success: true, data: json.data };
  } catch {
    return { success: false, message: "Erreur de connexion au serveur" };
  }
}
export async function getPurchaseStatus(purchaseId: string): Promise<{ status: string; failureCode?: string; failureMessage?: string } | null> {
  try {
    const res = await authFetch(`${API_URL}/purchases/${purchaseId}/status`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}
export async function checkLibraryOwnership(bookId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/library/${bookId}`);
    return res.ok;
  } catch {
    return false;
  }
}
// ─── Library ───
export interface LibraryBook {
  bookId: string;
  progress: number;
  currentPage: number;
  lastReadAt: string | null;
  createdAt: string;
  book: {
    id: string;
    title: string;
    slug: string;
    coverUrl: string | null;
    price: number;
    author: { id: string; penName: string | null; user: { firstName: string; lastName: string } };
  };
}
export async function fetchLibrary(): Promise<LibraryBook[]> {
  try {
    const res = await authFetch(`${API_URL}/library`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export async function fetchFavorites(): Promise<LibraryBook[]> {
  try {
    const res = await authFetch(`${API_URL}/library/favorites`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
// ─── Blog ───
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author: { id: string; firstName: string; lastName: string; avatarUrl: string | null };
  _count: { likes: number; comments: number };
  isLiked?: boolean;
}
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; firstName: string; lastName: string; avatarUrl: string | null };
}
export async function fetchArticles(page = 1, limit = 12): Promise<{ articles: Article[]; total: number }> {
  try {
    const res = await fetch(`${API_URL}/blog?page=${page}&limit=${limit}`);
    if (!res.ok) return { articles: [], total: 0 };
    const json = await res.json();
    return { articles: json.data ?? [], total: json.pagination?.total ?? 0 };
  } catch {
    return { articles: [], total: 0 };
  }
}
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await authFetch(`${API_URL}/blog/slug/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
export async function toggleArticleLike(articleId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/blog/${articleId}/like`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}
export async function fetchComments(articleId: string): Promise<Comment[]> {
  try {
    const res = await fetch(`${API_URL}/blog/${articleId}/comments`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export async function postComment(articleId: string, content: string): Promise<{ success: boolean; data?: Comment }> {
  try {
    const res = await authFetch(`${API_URL}/blog/${articleId}/comments`, {
      method: "POST",
            body: JSON.stringify({ content }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false };
    return { success: true, data: json.data };
  } catch {
    return { success: false };
  }
}
export async function deleteComment(articleId: string, commentId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/blog/${articleId}/comments/${commentId}`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}
// ─── Collections ───
export interface Collection {
  id: string;
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  _count: { books: number };
}
export interface CollectionDetail extends Collection {
  books: { book: ApiBook }[];
}
export async function fetchCollections(): Promise<Collection[]> {
  try {
    const res = await fetch(`${API_URL}/collections`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
export async function fetchCollectionDetail(id: string): Promise<CollectionDetail | null> {
  try {
    const res = await fetch(`${API_URL}/collections/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
// ─── Notifications ───
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
export async function fetchNotifications(page = 1, limit = 20): Promise<{ notifications: Notification[]; total: number }> {
  try {
    const res = await authFetch(`${API_URL}/notifications?page=${page}&limit=${limit}`);
    if (!res.ok) return { notifications: [], total: 0 };
    const json = await res.json();
    return { notifications: json.data ?? [], total: json.pagination?.total ?? 0 };
  } catch {
    return { notifications: [], total: 0 };
  }
}
export async function fetchUnreadCount(): Promise<number> {
  try {
    const res = await authFetch(`${API_URL}/notifications/unread-count`);
    if (!res.ok) return 0;
    const json = await res.json();
    return json.data?.count ?? json.count ?? 0;
  } catch {
    return 0;
  }
}
export async function markNotificationRead(id: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/notifications/${id}/read`, { method: "PATCH" });
    return res.ok;
  } catch {
    return false;
  }
}
export async function markAllNotificationsRead(): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/notifications/mark-all-read`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}
// ─── Profile ───
export async function fetchPurchaseHistory(page = 1, limit = 20): Promise<{ purchases: PurchaseResponse[]; total: number }> {
  try {
    const res = await authFetch(`${API_URL}/purchases?page=${page}&limit=${limit}`);
    if (!res.ok) return { purchases: [], total: 0 };
    const json = await res.json();
    return { purchases: json.data ?? [], total: json.pagination?.total ?? 0 };
  } catch {
    return { purchases: [], total: 0 };
  }
}
export async function updateProfile(userId: string, data: { firstName?: string; lastName?: string }): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await authFetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
            body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json.message };
    return { success: true };
  } catch {
    return { success: false, message: "Erreur de connexion" };
  }
}
// ─── Favorites ───
export async function checkFavorite(bookId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/library/${bookId}/favorite`);
    if (!res.ok) return false;
    const json = await res.json();
    return !!json.data;
  } catch {
    return false;
  }
}
export async function addFavorite(bookId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/library/${bookId}/favorite`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}
export async function removeFavorite(bookId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/library/${bookId}/favorite`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}
// ─── Follow ───
export async function checkFollowing(authorId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/authors/${authorId}/is-following`);
    if (!res.ok) return false;
    const json = await res.json();
    return !!json.data;
  } catch {
    return false;
  }
}
export async function followAuthor(authorId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/authors/${authorId}/follow`, { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}
export async function unfollowAuthor(authorId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/authors/${authorId}/follow`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}
// ─── Reviews (write) ───
export async function createReview(bookId: string, rating: number, comment?: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await authFetch(`${API_URL}/reviews/books/${bookId}/reviews`, {
      method: "POST",
            body: JSON.stringify({ rating, comment: comment || undefined }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json.message };
    return { success: true };
  } catch {
    return { success: false, message: "Erreur de connexion" };
  }
}
export async function updateReview(reviewId: string, rating: number, comment?: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await authFetch(`${API_URL}/reviews/${reviewId}`, {
      method: "PUT",
            body: JSON.stringify({ rating, comment: comment || undefined }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json.message };
    return { success: true };
  } catch {
    return { success: false, message: "Erreur de connexion" };
  }
}
export async function deleteReview(reviewId: string): Promise<boolean> {
  try {
    const res = await authFetch(`${API_URL}/reviews/${reviewId}`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}

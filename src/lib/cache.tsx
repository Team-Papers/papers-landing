"use client";

import { createContext, useContext, useCallback, useRef, type ReactNode } from "react";
import {
  fetchCategories as apiFetchCategories,
  fetchBooks as apiFetchBooks,
  fetchBookDetail as apiFetchBookDetail,
  fetchReviews as apiFetchReviews,
  type ApiCategory,
  type ApiBook,
  type ApiBookDetail,
  type ReviewsResponse,
} from "@/lib/api";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CATEGORIES_TTL = 10 * 60 * 1000; // 10 min
const BOOKS_TTL = 5 * 60 * 1000; // 5 min
const DETAIL_TTL = 10 * 60 * 1000; // 10 min
const REVIEWS_TTL = 5 * 60 * 1000; // 5 min

interface CacheContextType {
  getCategories: () => Promise<ApiCategory[]>;
  getBooks: (params: { page?: number; limit?: number; q?: string; categoryId?: string }) => Promise<{ books: ApiBook[]; total: number }>;
  getBookDetail: (id: string) => Promise<ApiBookDetail | null>;
  getReviews: (bookId: string) => Promise<ReviewsResponse | null>;
  prefetchBookDetail: (id: string) => void;
  invalidateBooks: () => void;
}

const CacheContext = createContext<CacheContextType | null>(null);

function isValid<T>(entry: CacheEntry<T> | undefined, ttl: number): entry is CacheEntry<T> {
  return !!entry && Date.now() - entry.timestamp < ttl;
}

export function CacheProvider({ children }: { children: ReactNode }) {
  const categoriesCache = useRef<CacheEntry<ApiCategory[]> | undefined>(undefined);
  const booksCache = useRef<Map<string, CacheEntry<{ books: ApiBook[]; total: number }>>>(new Map());
  const detailCache = useRef<Map<string, CacheEntry<ApiBookDetail>>>(new Map());
  const reviewsCache = useRef<Map<string, CacheEntry<ReviewsResponse>>>(new Map());
  const inflightRef = useRef<Map<string, Promise<unknown>>>(new Map());

  // Deduplicate in-flight requests
  function dedupe<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = inflightRef.current.get(key);
    if (existing) return existing as Promise<T>;
    const promise = fn().finally(() => inflightRef.current.delete(key));
    inflightRef.current.set(key, promise);
    return promise;
  }

  const getCategories = useCallback(async (): Promise<ApiCategory[]> => {
    if (isValid(categoriesCache.current, CATEGORIES_TTL)) {
      return categoriesCache.current.data;
    }
    return dedupe("categories", async () => {
      const cats = await apiFetchCategories();
      const sorted = [...cats].sort((a, b) => b._count.books - a._count.books);
      categoriesCache.current = { data: sorted, timestamp: Date.now() };
      return sorted;
    });
  }, []);

  const getBooks = useCallback(async (params: { page?: number; limit?: number; q?: string; categoryId?: string }) => {
    const key = JSON.stringify(params);
    const cached = booksCache.current.get(key);
    if (isValid(cached, BOOKS_TTL)) {
      return cached.data;
    }
    return dedupe(`books:${key}`, async () => {
      const result = await apiFetchBooks(params);
      booksCache.current.set(key, { data: result, timestamp: Date.now() });
      return result;
    });
  }, []);

  const getBookDetail = useCallback(async (id: string): Promise<ApiBookDetail | null> => {
    const cached = detailCache.current.get(id);
    if (isValid(cached, DETAIL_TTL)) {
      return cached.data;
    }
    return dedupe(`detail:${id}`, async () => {
      const detail = await apiFetchBookDetail(id);
      if (detail) {
        detailCache.current.set(id, { data: detail, timestamp: Date.now() });
      }
      return detail;
    });
  }, []);

  const getReviews = useCallback(async (bookId: string): Promise<ReviewsResponse | null> => {
    const cached = reviewsCache.current.get(bookId);
    if (isValid(cached, REVIEWS_TTL)) {
      return cached.data;
    }
    return dedupe(`reviews:${bookId}`, async () => {
      const reviews = await apiFetchReviews(bookId);
      if (reviews) {
        reviewsCache.current.set(bookId, { data: reviews, timestamp: Date.now() });
      }
      return reviews;
    });
  }, []);

  const prefetchBookDetail = useCallback((id: string) => {
    const cached = detailCache.current.get(id);
    if (!isValid(cached, DETAIL_TTL)) {
      getBookDetail(id);
    }
  }, [getBookDetail]);

  const invalidateBooks = useCallback(() => {
    booksCache.current.clear();
  }, []);

  return (
    <CacheContext.Provider value={{ getCategories, getBooks, getBookDetail, getReviews, prefetchBookDetail, invalidateBooks }}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const ctx = useContext(CacheContext);
  if (!ctx) throw new Error("useCache must be used within CacheProvider");
  return ctx;
}

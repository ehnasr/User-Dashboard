import { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "../services/api.js";

export function usePosts({ query, page, pageSize }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.listPosts();
        if (cancelled) return;
        setData(res);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(
      (p) =>
        String(p.id).includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
    );
  }, [data, query]);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  const addPost = useCallback((post) => {
    setData((arr) => [post, ...arr]);
  }, []);

  const updatePost = useCallback((id, patch) => {
    setData((arr) => arr.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const removePost = useCallback((id) => {
    setData((arr) => arr.filter((p) => p.id !== id));
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.listPosts();
      setData(res);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    items,
    total,
    loading,
    error,
    addPost,
    updatePost,
    removePost,
    refetch,
  };
}

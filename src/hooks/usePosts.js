import { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "../services/api.js";

export function usePosts({ query, page, pageSize }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LOCAL_KEY = "localPosts";

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.listPosts();
        if (cancelled) return;
        try {
          const localRaw = localStorage.getItem(LOCAL_KEY);
          const localPosts = localRaw ? JSON.parse(localRaw) : [];
          const byId = new Map();
          res.forEach((p) => byId.set(p.id, p));
          localPosts.forEach((p) => byId.set(p.id, p));
          setData(Array.from(byId.values()));
        } catch (_) {
          setData(res);
        }
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
    setData((arr) => {
      // Avoid duplicate entries by id in state
      const exists = arr.some((p) => p.id === post.id);
      const next = exists ? arr.map((p) => (p.id === post.id ? post : p)) : [...arr, post];
      try {
        const localRaw = localStorage.getItem(LOCAL_KEY);
        const localPosts = localRaw ? JSON.parse(localRaw) : [];
        const localExists = localPosts.some((p) => p.id === post.id);
        const updatedLocal = localExists
          ? localPosts.map((p) => (p.id === post.id ? post : p))
          : [...localPosts, post];
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedLocal));
      } catch (_) {}
      return next;
    });
  }, []);

  const updatePost = useCallback((id, patch) => {
    setData((arr) => {
      const next = arr.map((p) => (p.id === id ? { ...p, ...patch } : p));
      try {
        const localRaw = localStorage.getItem(LOCAL_KEY);
        const localPosts = localRaw ? JSON.parse(localRaw) : [];
        const updatedLocal = localPosts.map((p) => (p.id === id ? { ...p, ...patch } : p));
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedLocal));
      } catch (_) {}
      return next;
    });
  }, []);

  const removePost = useCallback((id) => {
    setData((arr) => {
      const next = arr.filter((p) => p.id !== id);
      try {
        const localRaw = localStorage.getItem(LOCAL_KEY);
        const localPosts = localRaw ? JSON.parse(localRaw) : [];
        const updatedLocal = localPosts.filter((p) => p.id !== id);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedLocal));
      } catch (_) {}
      return next;
    });
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.listPosts();
      try {
        const localRaw = localStorage.getItem(LOCAL_KEY);
        const localPosts = localRaw ? JSON.parse(localRaw) : [];
        const byId = new Map();
        res.forEach((p) => byId.set(p.id, p));
        localPosts.forEach((p) => byId.set(p.id, p));
        setData(Array.from(byId.values()));
      } catch (_) {
        setData(res);
      }
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
    allData: data, 
  };
}

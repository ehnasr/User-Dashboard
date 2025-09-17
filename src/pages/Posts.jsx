import { useMemo, useState } from "react";
import Button from "../components/UI/Button.jsx";
import { usePosts } from "../hooks/usePosts.js";
import { api } from "../services/api.js";
import Input from "../components/UI/Input.jsx";
import Table from "../components/UI/Table.jsx";
import Modal from "../components/UI/Modal.jsx";
import EditPostIcon from "../components/icons/EditPostIcon.jsx";
import DeletePostIcon from "../components/icons/DeletePostIcon.jsx";
import PlusIcon from "../components/icons/PlusIcon.jsx";
import { useNotification } from "../context/NotificationContext.jsx";
import styles from "./Posts.module.css";

export default function Posts() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editing, setEditing] = useState(undefined);
  const [form, setForm] = useState({ title: "", body: "" });
  const {
    items,
    total,
    loading,
    error,
    addPost,
    updatePost,
    removePost,
    allData,
  } = usePosts({ query, page, pageSize });
  const { success, error: showError, warning, info } = useNotification();

  const nextLocalId =
    allData.length > 0 ? Math.max(...allData.map((item) => item.id)) + 1 : 1;

  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessor: "id",
        render: (row) => (
          <p className={styles.idCell} title={row.id}>
            {row.id}
          </p>
        ),
      },
      {
        header: "Title",
        accessor: "title",
        render: (row) => (
          <p className={styles.titleCell} title={row.title}>
            {highlightText(row.title, query)}
          </p>
        ),
      },
      {
        header: "Body",
        accessor: "body",
        render: (row) => (
          <p className={styles.bodyCell} title={row.body}>
            {highlightText(row.body, query)}
          </p>
        ),
      },
      {
        header: "Actions",
        key: "actions",
        render: (row) => (
          <div className={styles.actionsContainer}>
            <button
              className="ghost"
              onClick={() => onEdit(row)}
              aria-label="Edit"
            >
              <EditPostIcon />
            </button>
            <button
              className="danger"
              onClick={() => onDelete(row)}
              aria-label="Delete"
            >
              <DeletePostIcon />
            </button>
          </div>
        ),
      },
    ],
    [query]
  );

  function onEdit(row) {
    setEditing(row);
    setForm({ title: row.title, body: row.body });
  }

  async function onDelete(row) {
    try {
      if (row.isLocal) {
        removePost(row.id);
        success("Post deleted successfully");
      } else {
        await api.deletePost(row.id);
        removePost(row.id);
        success("Post deleted successfully");
      }
    } catch (e) {
      showError(`Failed to delete post: ${e.message}`);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (editing) {
        if (editing.isLocal) {
          updatePost(editing.id, form);
          success("Post updated successfully");
        } else {
          await api.updatePost(editing.id, form);
          updatePost(editing.id, form);
          success("Post updated successfully");
        }
      } else {
        const local = {
          id: nextLocalId,
          ...form,
          isLocal: true,
        };
        addPost(local);
        success("Post created successfully");
      }
      setEditing(undefined);
      setForm({ title: "", body: "" });
    } catch (e) {
      showError(`Failed to save post: ${e.message}`);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.left}>
          <Input
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
          />
          <span className={styles.badge}>{total} results</span>
        </div>
        <div className={styles.right}>
          <span className={styles.pageSizeLabel}>Posts per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPage(1);
              setPageSize(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <Button
            onClick={() => {
              setEditing(null);
              setForm({ title: "", body: "" });
            }}
            title="Add new post"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className={`panel ${styles.skeletonContainer}`}>
          <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
          <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
          <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
          <div className={`${styles.skeleton} ${styles.skeletonItem}`} />
        </div>
      ) : error ? (
        <div className={`panel ${styles.errorPanel}`}>
          Error: {error.message}
        </div>
      ) : (
        <div className={styles.slideUp}>
          <div className={styles.tableContainer}>
            <Table columns={columns} data={items} />
          </div>
        </div>
      )}

      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          <span className={styles.paginationText}>
            Showing {Math.min((page - 1) * pageSize + 1, total)} to{" "}
            {Math.min(page * pageSize, total)} of {total} results
          </span>
          <div className={styles.goToContainer}>
            <label className={styles.goToLabel}>Go to:</label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={page}
              onChange={(e) => {
                const newPage = Math.max(
                  1,
                  Math.min(totalPages, parseInt(e.target.value) || 1)
                );
                setPage(newPage);
              }}
              className={styles.goToInput}
            />
          </div>
        </div>

        <div className={styles.paginationControls}>
          <Button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="ghost"
          >
            First
          </Button>
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="ghost"
          >
            ‹
          </Button>

          {/* Page numbers */}
          <div className={styles.pageNumbers}>
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let start = Math.max(1, page - Math.floor(maxVisible / 2));
              let end = Math.min(totalPages, start + maxVisible - 1);

              if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
              }

              if (start > 1) {
                pages.push(
                  <Button key={1} onClick={() => setPage(1)} className="ghost">
                    1
                  </Button>
                );
                if (start > 2) {
                  pages.push(
                    <span key="ellipsis1" className={styles.ellipsis}>
                      ...
                    </span>
                  );
                }
              }

              for (let i = start; i <= end; i++) {
                pages.push(
                  <Button
                    key={i}
                    onClick={() => setPage(i)}
                    className={i === page ? "primary" : "ghost"}
                  >
                    {i}
                  </Button>
                );
              }

              if (end < totalPages) {
                if (end < totalPages - 1) {
                  pages.push(
                    <span key="ellipsis2" className={styles.ellipsis}>
                      ...
                    </span>
                  );
                }
                pages.push(
                  <Button
                    key={totalPages}
                    onClick={() => setPage(totalPages)}
                    className="ghost"
                  >
                    {totalPages}
                  </Button>
                );
              }

              return pages;
            })()}
          </div>

          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="ghost"
          >
            ›
          </Button>
          <Button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="ghost"
          >
            Last
          </Button>
        </div>
      </div>

      <Modal
        open={editing !== undefined}
        title={editing ? "Edit Post" : "New Post"}
        onClose={() => setEditing(undefined)}
        footer={
          <>
            <Button className="ghost" onClick={() => setEditing(undefined)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="post-form">
              Save
            </Button>
          </>
        }
      >
        <form id="post-form" onSubmit={onSubmit} className="form">
          <div className="formField">
            <Input
              label="Title"
              className="formInput"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="formField">
            <label>Body</label>
            <textarea
              rows={6}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

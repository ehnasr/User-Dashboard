import { memo, useMemo } from "react";
import styles from "./Table.module.css";

function Table({
  columns,
  data,
  rowKey = (row) => row.id,
  empty = "No data",
}) {
  const resolvedColumns = useMemo(() => columns, [columns]);
  const resolvedData = useMemo(() => data, [data]);
  return (
    <div className={`panel ${styles.tableContainer}`}>
      <div className={styles.tableWrapper}>
        <table className="table">
          <thead>
            <tr>
              {resolvedColumns.map((col) => (
                <th key={col.key || col.accessor}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resolvedData.length === 0 ? (
              <tr>
                <td
                  colSpan={resolvedColumns.length}
                  className={styles.emptyCell}
                >
                  {empty}
                </td>
              </tr>
            ) : (
              resolvedData.map((row) => (
                <tr
                  key={typeof rowKey === "function" ? rowKey(row) : row[rowKey]}
                >
                  {resolvedColumns.map((col) => (
                    <td key={col.key || col.accessor}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(Table);

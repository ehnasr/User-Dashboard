import styles from "./Table.module.css";

export default function Table({
  columns,
  data,
  rowKey = (row) => row.id,
  empty = "No data",
}) {
  return (
    <div className={`panel ${styles.tableContainer}`}>
      <div className={styles.tableWrapper}>
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key || col.accessor}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={styles.emptyCell}
                >
                  {empty}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={typeof rowKey === "function" ? rowKey(row) : row[rowKey]}
                >
                  {columns.map((col) => (
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

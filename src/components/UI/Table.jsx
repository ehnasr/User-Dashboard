export default function Table({
  columns,
  data,
  rowKey = (row) => row.id,
  empty = "No data",
}) {
  return (
    <div className="panel" style={{ overflow: "hidden" }}>
      <div style={{ overflow: "auto" }}>
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
                  style={{
                    textAlign: "center",
                    padding: 20,
                    color: "var(--muted)",
                  }}
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

import { ResponsiveBar } from "@nivo/bar";

const data = Array.from({ length: 4 }).map((_, i) => ({
  label: `W${i + 1}`,
  sales: Math.round(100 + Math.random() * 200),
}));

export default function NivoBarDemo() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["sales"]}
        indexBy="label"
        margin={{ top: 10, right: 30, bottom: 30, left: 30 }}
        padding={0.5}
        colors={["var(--primary)"]}
        axisBottom={{ tickSize: 0, tickPadding: 6 }}
        axisLeft={{ tickSize: 0, tickPadding: 4 }}
        enableGridX={true}
        theme={{
          background: "transparent",
          textColor: "var(--text)",
          axis: { ticks: { text: { fill: "var(--text-muted)" } } },
          grid: { line: { stroke: "var(--border)" } },
          tooltip: {
            container: { background: "var(--panel)", color: "var(--text)" },
          },
        }}
      />
    </div>
  );
}

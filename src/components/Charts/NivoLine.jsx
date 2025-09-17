import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "revenue",
    color: "var(--primary)",
    data: Array.from({ length: 12 }).map((_, i) => ({
      x: `${i + 1}`,
      y: Math.round(20 + Math.random() * 80),
    })),
  },
];

export default function NivoLine() {
  return (
    <div style={{ height: "80%" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 10, bottom: 30, left: 30 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 100, stacked: false }}
        curve="monotoneX"
        axisBottom={{ tickSize: 0, tickPadding: 6 }}
        axisLeft={{ tickSize: 0, tickPadding: 6 }}
        enableGridX={true}
        colors={{ datum: "color" }}
        theme={{
          background: "transparent",
          textColor: "var(--text)",
          axis: { ticks: { text: { fill: "var(--text-muted)" } } },
          grid: { line: { stroke: "var(--border)" } },
          tooltip: {
            container: { background: "var(--panel)", color: "var(--text)" },
          },
        }}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh
        enableArea
        areaOpacity={0.15}
      />
    </div>
  );
}

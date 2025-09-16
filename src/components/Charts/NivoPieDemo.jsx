import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "Email", value: Math.round(30 + Math.random() * 20) },
  { id: "Social", value: Math.round(20 + Math.random() * 20) },
  { id: "Ads", value: Math.round(10 + Math.random() * 20) },
  { id: "Referral", value: Math.round(5 + Math.random() * 15) },
];

export default function NivoPieDemo() {
  return (
    <div style={{ height: "80%", display: "flex", alignItems: "center" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={6}
        colors={["#60a5fa", "#34d399", "#f59e0b", "#f87171"]}
        theme={{
          background: "transparent",
          textColor: "var(--text)",
          tooltip: {
            container: { background: "var(--panel)", color: "var(--text)" },
          },
          labels: { text: { fill: "var(--text)" } },
        }}
        enableArcLabels={false}
        legends={[]}
      />
    </div>
  );
}

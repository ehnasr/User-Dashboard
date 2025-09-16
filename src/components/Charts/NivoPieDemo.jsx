import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "Email", value: Math.round(30 + Math.random() * 20) },
  { id: "Social", value: Math.round(20 + Math.random() * 20) },
  { id: "Ads", value: Math.round(10 + Math.random() * 20) },
  { id: "Referral", value: Math.round(5 + Math.random() * 15) },
];

export default function NivoPieDemo() {
  return (
    <div style={{ height: "75%" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        padding={0.5}
        innerRadius={0.5}
        padAngle={3}
        cornerRadius={5}
        activeOuterRadiusOffset={5}
        colors={["#60a5fa", "#34d399", "#f59e0b", "#f87171"]}
        theme={{
          background: "transparent",
          textColor: "var(--text)",
          tooltip: {
            container: { background: "var(--panel)", color: "var(--text)" },
          },
          labels: { text: { fill: "var(--text)" } },
        }}
        enableArcLabels={true}
        legends={[]}
      />
    </div>
  );
}

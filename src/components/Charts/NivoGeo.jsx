import { memo, useMemo } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import geoFeatures from "./world_countries.js";

const data = geoFeatures.features.map((f, index) => ({
  id: f.id || f.properties.name,
  value: Math.round(Math.random() * 1000),
}));

function NivoGeo() {
  const chartData = useMemo(() => data, []);
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveChoropleth
        data={chartData}
        features={geoFeatures.features}
        margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
        colors="nivo"
        domain={[0, 1000]}
        label="properties.name"
        valueFormat=","
        tooltip={({ feature, value }) => (
          <div style={{ padding: 6 }}>
            <div style={{ fontWeight: 700 }}>{feature?.properties?.name}</div>
            {typeof value === "number" ? (
              <div>Value: {value.toLocaleString()}</div>
            ) : null}
          </div>
        )}
        projectionScale={50}
        borderWidth={0.5}
        borderColor="var(--border)"
        theme={{
          textColor: "var(--text)",
          background: "transparent",
          tooltip: {
            container: {
              background: "var(--panel, #111827)",
              color: "var(--text)",
              fontSize: 12,
              borderRadius: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            },
          },
        }}
      />
    </div>
  );
}

export default memo(NivoGeo);

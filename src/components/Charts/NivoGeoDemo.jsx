import { ResponsiveChoropleth } from "@nivo/geo";
import worldFeatures from "./world_countries.js";

const data = worldFeatures.features.slice(0, 20).map((f) => ({
  id: f.id || f.properties.iso_a3,
  value: Math.round(Math.random() * 1000),
}));

export default function NivoGeoDemo() {
  return (
    <div style={{ height: 200 }}>
      <ResponsiveChoropleth
        data={data}
        features={worldFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, 1000]}
        unknownColor="#222"
        label="properties.name"
        valueFormat="," 
        projectionTranslation={[0.5, 0.55]}
        projectionScale={90}
        borderWidth={0.5}
        borderColor="var(--border)"
        theme={{ textColor: "var(--text)", background: "transparent" }}
      />
    </div>
  );
}



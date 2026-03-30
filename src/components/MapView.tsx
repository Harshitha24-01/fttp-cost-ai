import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnalyzedRoute, RouteType } from "@/lib/routeAnalyzer";
import MapLegend from "@/components/MapLegend";

interface MapViewProps {
  source: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  routes?: AnalyzedRoute[];
  selectedRoute?: RouteType | null;
  onRouteClick?: (type: RouteType) => void;
}

const MapView = ({ source, destination, onMapClick, center, zoom, routes, selectedRoute, onRouteClick }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Layer[]>([]);
  const onMapClickRef = useRef(onMapClick);
  onMapClickRef.current = onMapClick;
  const onRouteClickRef = useRef(onRouteClick);
  onRouteClickRef.current = onRouteClick;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);
    map.on("click", (e: L.LeafletMouseEvent) => {
      onMapClickRef.current(e.latlng.lat, e.latlng.lng);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((l) => map.removeLayer(l));
    markersRef.current = [];

    const greenIcon = L.divIcon({ className: "", html: `<div style="width:14px;height:14px;background:hsl(142,70%,45%);border-radius:50%;border:2px solid hsl(142,70%,60%);box-shadow:0 0 10px hsl(142,70%,45%/0.5)"></div>`, iconSize: [14, 14], iconAnchor: [7, 7] });
    const redIcon = L.divIcon({ className: "", html: `<div style="width:14px;height:14px;background:hsl(0,72%,55%);border-radius:50%;border:2px solid hsl(0,72%,65%);box-shadow:0 0 10px hsl(0,72%,55%/0.5)"></div>`, iconSize: [14, 14], iconAnchor: [7, 7] });

    if (source) {
      const m = L.marker([source.lat, source.lng], { icon: greenIcon }).addTo(map).bindPopup("Source");
      markersRef.current.push(m);
    }
    if (destination) {
      const m = L.marker([destination.lat, destination.lng], { icon: redIcon }).addTo(map).bindPopup("Destination");
      markersRef.current.push(m);
    }

    if (routes && routes.length > 0) {
      const formatCost = (v: number) => {
        if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
        if (v >= 100000) return `₹${(v / 100000).toFixed(2)} L`;
        return `₹${(v / 1000).toFixed(1)}K`;
      };

      routes.forEach((route) => {
        const isSelected = selectedRoute === route.type;
        const weight = isSelected ? 5 : 3;
        const opacity = selectedRoute && !isSelected ? 0.35 : 0.85;
        const dashArray = route.type === "risky" ? "8 6" : undefined;

        const polyline = L.polyline(route.coordinates, {
          color: route.color, weight, opacity, dashArray,
        }).addTo(map);

        polyline.bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:180px">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
              <div style="width:10px;height:10px;border-radius:50%;background:${route.color}"></div>
              <strong style="font-size:13px">${route.label}</strong>
            </div>
            <table style="width:100%;font-size:12px;border-collapse:collapse">
              <tr><td style="padding:2px 0;color:#666">Distance</td><td style="text-align:right;font-weight:600">${route.distance_km} km</td></tr>
              <tr><td style="padding:2px 0;color:#666">Cost</td><td style="text-align:right;font-weight:600">${formatCost(route.estimated_cost)}</td></tr>
              <tr><td style="padding:2px 0;color:#666">Risk</td><td style="text-align:right;font-weight:600;text-transform:capitalize">${route.risk_level}</td></tr>
              <tr><td style="padding:2px 0;color:#666">Environment</td><td style="text-align:right;font-weight:600;text-transform:capitalize">${route.environmental_impact}</td></tr>
              <tr><td style="padding:2px 0;color:#666">Terrain</td><td style="text-align:right;font-weight:600">${route.terrain}</td></tr>
            </table>
            <p style="font-size:11px;color:#888;margin-top:8px;line-height:1.4">${route.description}</p>
          </div>
        `);

        polyline.on("click", () => { onRouteClickRef.current?.(route.type); });
        markersRef.current.push(polyline);
      });

      const allCoords = routes.flatMap((r) => r.coordinates);
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords.map((c) => [c[0], c[1]] as [number, number]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    } else if (source && destination) {
      const line = L.polyline([[source.lat, source.lng], [destination.lat, destination.lng]], {
        color: "hsl(168,80%,45%)", weight: 3, opacity: 0.8, dashArray: "8 4",
      }).addTo(map);
      markersRef.current.push(line);
      map.fitBounds(line.getBounds(), { padding: [40, 40] });
    }
  }, [source, destination, routes, selectedRoute]);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], zoom || 12);
    }
  }, [center, zoom]);

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full h-[450px] rounded-xl border border-border overflow-hidden" />
      {routes && routes.length > 0 && <MapLegend />}
    </div>
  );
};

export default MapView;

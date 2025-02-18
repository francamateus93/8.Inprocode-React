import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "TU_TOKEN_DE_MAPBOX";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.1589);
  const [lat, setLat] = useState(41.3887);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl());

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clean up existing markers
    map.current.getStyle().layers.forEach((layer) => {
      if (layer.id.startsWith("marker-")) {
        map.current.removeLayer(layer.id);
        map.current.removeSource(layer.id);
      }
    });

    fetch("http://localhost:5001/ubicaciones") // AJUSTAR URL !!
      .then((response) => response.json())
      .then((data) => {
        data.forEach((ubicacion, index) => {
          const markerId = `marker-${index}`;
          const el = document.createElement("div");
          (el.className = "size-20px"),
            "cursor-pointer",
            "rounded-lg",
            "bg-blue-400"; // Aplica clases de Tailwind para el marcador
          el.style.width = "w-5";
          el.style.height = "w-5";
          el.style.backgroundImage =
            "url(https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg)";
          el.style.backgroundSize = "cover";
          el.style.borderRadius = "rounded-full";
          el.addEventListener("click", () => {
            window.alert(ubicacion.nombre);
          });

          // Add the marker to the map
          new mapboxgl.Marker(el)
            .setLngLat([ubicacion.longitud, ubicacion.latitud])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<h3>${ubicacion.nombre}</h3><p>${ubicacion.descripcion}</p>`
              )
            )
            .addTo(map.current);
        });
      })
      .catch((error) => console.error("Error al cargar ubicaciones:", error));
  }, []);

  return (
    <div className="w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

export default Map;

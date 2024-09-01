import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ coordinates }) => {
    console.log(coordinates)
    if (coordinates) {

        return (
            <MapContainer
                center={[coordinates[0]?.lat || 51.505, coordinates[0]?.lng || -0.09]}
                zoom={10}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={[coord.lat, coord.lng]} >
                        <Popup>
                            <div>
                                <h2>{coord.name}</h2>
                                <p>{coord.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        );
    }
};

export default MapComponent;
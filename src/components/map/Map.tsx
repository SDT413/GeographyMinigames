import React, {FC} from 'react';
import {useEffect, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import classNames from "classnames";
import styles from './Map.module.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGs0MTMiLCJhIjoiY2xmN2I0Z3ppMDBwZjN2cDcxMXBpeW92MyJ9.P4O2mbHyviXylMkyk1C3zw';

interface MapProps {
    addStyles?: string;
    onClick?: () => void;
}

const Map: FC<MapProps> = ({addStyles, onClick}) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(4.5);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });
    return (
        <div className={addStyles}>
            <div ref={mapContainer} className={styles.map}/>
        </div>
    );
};

export default Map;
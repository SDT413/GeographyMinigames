import React, {FC} from 'react';
import {useEffect, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// @ts-ignore
import wc from 'which-country';
// @ts-ignore
import infoCountries from 'get-countries-info';
import {countries} from 'country-data';
import classNames from "classnames";
import styles from './Map.module.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGs0MTMiLCJhIjoiY2xmN2I0Z3ppMDBwZjN2cDcxMXBpeW92MyJ9.P4O2mbHyviXylMkyk1C3zw';

interface MapProps {
    addStyles?: string;
    onClick?: () => void;
    correctAnswer?: string;
    mapStyle?: string;
    setCurrentQuestionState?: any;
    gameMode?: string;
    onCheckAnswer?: (answer: string, correctAnswer: string, gameMode: string) => void;
}

const Map: FC<MapProps> = ({addStyles, onClick, mapStyle, correctAnswer, setCurrentQuestionState, gameMode, onCheckAnswer}) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(4.5);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: mapStyle || 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current?.on('click', onMapClick);
    });

    const onMapClick = async (e: mapboxgl.MapMouseEvent) => {
        const {lng, lat} = e.lngLat;
        const alpha3 = await getCountryAlpha3(lng, lat);
       /* console.log('alpha3:', alpha3);
        console.log('country:',  getCountryName(alpha3));
        console.log('capital:', getCountryCapital(alpha3));
        console.log('currency:', getCountryCurrency(alpha3));*/

        if (onClick){
            onClick();
        }
        if (gameMode === "shapes" && onCheckAnswer && correctAnswer) {
            onCheckAnswer(getCountryName(alpha3), correctAnswer, gameMode)
        }
        if (gameMode === "countries" && onCheckAnswer && correctAnswer) {
            console.log('country:', getCountryName(alpha3));
            onCheckAnswer(getCountryName(alpha3), correctAnswer, gameMode)
        }
        if (gameMode === "capitals" && onCheckAnswer && correctAnswer) {
            onCheckAnswer(getCountryCapital(alpha3), correctAnswer, gameMode)
        }
        if (gameMode === "currencies" && onCheckAnswer && correctAnswer) {
            onCheckAnswer(getCountryCurrency(alpha3), correctAnswer, gameMode)
        }
    }

    const getCountryAlpha3 = async (lng: number, lat: number) => {
        const country = wc([lng, lat]);
        if (country) {
           return country;
       }
         return "";

    }

    const getCountryName = (alpha3: string) => {
        let country = countries[alpha3];
        if (!country) {
            country = countries[alpha3.toLowerCase()];
        }
        let result = country.name;
        if(country.name === "Russian Federation") result = "Russia";
        if (country.name === "Tanzania, United Republic Of") result = "Tanzania";
        if (country.name === "Viet Nam") result = "Vietnam";
        if (country.name === "Korea, Republic Of") result = "South Korea";
        if (country.name === "Korea, Democratic People's Republic Of") result = "North Korea";
        if (country.name === "Iran, Islamic Republic Of") result = "Iran";
        if (country.name === "Syrian Arab Republic") result = "Syria";
        if (country.name === "Congo, The Democratic Republic Of The") result = "Congo";
        return result;
    }

    const getCountryCapital = (alpha3: string) => {
        if (alpha3 === "") return "";
        const capital = infoCountries({ISO: alpha3}, 'capital');
        let result = capital[0];
        if (result === "Washington D.C.") result = "Washington";
        return result;
    }

    const getCountryCurrency = (alpha3: string) => {
        let country = countries[alpha3];
        if (!country) {
            country = countries[alpha3.toLowerCase()];
        }
        return country.currencies[0];
    }

    return (
        <div className={addStyles}>
            <div ref={mapContainer} className={styles.map}/>
        </div>
    );
};

export default Map;
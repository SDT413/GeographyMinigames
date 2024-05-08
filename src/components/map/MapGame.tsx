import React, {FC, useEffect, useRef, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// @ts-ignore
import wc from 'which-country';
// @ts-ignore
import infoCountries from 'get-countries-info';
import {countries} from 'country-data';
import styles from './Map.module.scss';
import {useQuestions} from "@/hooks/useQuestions";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import {featureCollection, point} from "@turf/helpers";
import {GeoJSON} from "geojson";
import {useActions} from "@/hooks/useActions";
import axios from "axios";
import {state} from "sucrase/dist/types/parser/traverser/base";

mapboxgl.accessToken = 'pk.eyJ1IjoiZGs0MTMiLCJhIjoiY2xmN2I0Z3ppMDBwZjN2cDcxMXBpeW92MyJ9.P4O2mbHyviXylMkyk1C3zw';

interface MapProps {
    addStyles?: string;
    onClick?: () => void;
    mapStyle?: string;
    gameMode?: string;
    setAnswer?: (answer: string) => void;
    useHelper?: boolean;
    setUseHelper: (useHelper: boolean) => void;
    helperSize: number;
    setMapClicked?: (mapClicked: boolean) => void;
    helperPunishment: number;
    currentTime: number;
    setTimer: (timer: number) => void;
    param_zoom?: number
    param_lat?: number
    param_lng?: number
    fixed?: boolean
}

const Map: FC<MapProps> = ({addStyles, onClick, mapStyle, setAnswer, gameMode, useHelper, setUseHelper, helperSize, setMapClicked, helperPunishment, currentTime, setTimer, param_zoom, param_lat, param_lng, fixed}) => {
    const {increaseHelperUsed} = useActions();
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(param_lng || 44);
    const [lat, setLat] = useState(param_lat || 33);
    const [alpha3, setAlpha3] = useState("");
    const [state, setState] = useState("");
    const [countryName, setCountryName] = useState("");
    const [countryCapital, setCountryCapital] = useState("");
    const [countryCurrency, setCountryCurrency] = useState("");
    const [zoom, setZoom] = useState(param_zoom || 4.5);
    const [points, setPoints] = useState<GeoJSON.FeatureCollection<GeoJSON.Point>>(featureCollection([]));
    const questions = useQuestions();
    const currentQuestion = questions.questions[questions.currentQuestionIndex];
    const typed = currentQuestion as IQuestion;
    const rightAnswer = typed ? typed.correct_answer : "";
    const typedShape = currentQuestion as IShape;
    const rightShape = typedShape ? typedShape.place : "";
    const stateSource = {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: []
        }
    };
    const statesLayer = {
        id: "states",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
            "fill-color": "#627BC1",
            "fill-opacity": 0.5
        }
    };

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: mapStyle || 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        //fix map location
        if (fixed) {
            map.current.scrollZoom.disable();
            map.current.dragPan.disable();
            map.current.dragRotate.disable();
            map.current.doubleClickZoom.disable();
            map.current.touchZoomRotate.disable();
        }
        map.current?.on('load', function() { //On map load, we want to do some stuff
            map.current?.addLayer({ //here we are adding a layer containing the tileset we just uploaded
                'id': 'countries',//this is the name of our layer, which we will need later
                'source': {
                    'type': 'vector',
                    'url': 'mapbox://byfrost-articles.74qv0xp0' // <--- Add the Map ID you copied here
                },
                'source-layer': 'ne_10m_admin_0_countries-76t9ly', // <--- Add the source layer name you copied here
                'type': 'fill',
                'paint': {
                    'fill-color': 'rgba(82,72,156,0)', //this is the color you want your tileset to have (I used a nice purple color)
                    'fill-outline-color': 'rgba(242,242,242,0)' //this helps us distinguish individual countries a bit better by giving them an outline
                }
            });
            map.current?.addSource("circleData", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            });
                // state layer
            map.current?.addSource("states", stateSource as any);
            map.current?.addLayer(statesLayer as any);

        });



    }, []);

    useEffect(() => {
        map.current?.on('click', onMapClick)
    }, [rightAnswer, rightShape, useHelper]);

    useEffect(() => {
        if (useHelper) {
            increaseHelperUsed();
            setTimer(currentTime - helperPunishment);
            map.current?.addLayer({
                id: "circle",
                source: "circleData",
                type: "circle",
                paint: {
                    'circle-color': 'rgba(0,183,191,0)',
                    // make circles fixed size on the screen regardless of zoom
                    'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 2, 6, helperSize],
                    'circle-stroke-width': 3,
                    'circle-stroke-color': '#ff1e1e',
                },
            });
            if (gameMode === "shapes") {
                ShowCircleAroundCountry(rightShape);
            }
            else if (gameMode === "countries") {
                ShowCircleAroundCountry(rightAnswer);
            }
            else if (gameMode === "states") {
                ShowCircleAroundState(rightShape);
            }
            else if (gameMode === "currencies") {
                ShowCircleAroundCountry(rightAnswer);
            }
        }
        else {
            if (map.current?.getLayer('circle')) {
            map.current?.removeLayer("circle");
            }
            setPoints(featureCollection([]));
            // @ts-ignore
            map.current?.getSource("circleData")?.setData(featureCollection([]));
        }
    }, [useHelper, helperSize]);



    const addCountryLayerByAnswer = (answer: string, alpha3: string) => {
       if (map.current?.getLayer('countries-highlighted')) {
            map.current?.removeLayer('countries-highlighted');
       }
       console.log('rightAnswer:', rightAnswer);
       console.log('rightShape:', rightShape);
       console.log('answer:', answer);

        if (answer === rightAnswer || answer === rightShape) {
            return map.current?.addLayer(
                {
                    'id': 'countries-highlighted',
                    'source': 'countries',
                    'source-layer': 'ne_10m_admin_0_countries-76t9ly',
                    'filter': ['in', 'ADM0_A3_IS'].concat([alpha3]), // This line lets us filter by country codes.
                    'type': 'fill',
                    'paint': {
                        'fill-color': '#02f820', // This is the color you want your highlighted country to be
                        'fill-opacity': 0.5
                    }
                }
            );
        }
        else {
          return map.current?.addLayer(
                {
                    'id': 'countries-highlighted',
                    'source': 'countries',
                    'source-layer': 'ne_10m_admin_0_countries-76t9ly',
                    'filter': ['in', 'ADM0_A3_IS'].concat([alpha3]), // This line lets us filter by country codes.
                    'type': 'fill',
                    'paint': {
                        'fill-color': '#ff1e1e', // This is the color you want your highlighted country to be
                        'fill-opacity': 0.5
                    }
                }
            );
        }
    }
    const addStateLayerByAnswer = (answer: string) => {

    }

    const setCountryFilterAndLayer = (answer: string, alpha3: string) => {
        addCountryLayerByAnswer(answer, alpha3);
        map.current?.setFilter('countries', ['in', 'ADM0_A3_IS'].concat([alpha3]));
    }

    const setStateFilterAndLayer = (answer: string) => {
        addStateLayerByAnswer(answer);
        map.current?.setFilter('states', ['in', 'name'].concat([answer]));
    }

    const ShowCircleAroundCountry = async (country: string) => {
        const latlng = RandomizeLatLng(country);
        const newPoints = featureCollection([point(latlng)]);
        setPoints(newPoints);
        // @ts-ignore
        map.current?.getSource("circleData")?.setData(newPoints);
    }

    const ShowCircleAroundState = async (state: string) => {
        const geocoding_query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + state + '.json?access_token=' + mapboxgl.accessToken;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.get(geocoding_query, axiosConfig);
            const features = response.data.features;
            let latlng = features[0].center;
            const newPoints = featureCollection([point(latlng)]);
            setPoints(newPoints);
            // @ts-ignore
            map.current?.getSource("circleData")?.setData(newPoints);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUSAState(lng, lat).then((state) => {
            setState(state);
        } );
    }, [lng, lat]);
    useEffect(() => {
        if (gameMode === "states" && setAnswer) {
            console.log('setAnswer:', state);
            setAnswer(state);
        }
    }, [state]);


    const onMapClick = async (e: mapboxgl.MapMouseEvent) => {
        const {lng, lat} = e.lngLat;
        setLng(lng);
        setLat(lat);
        const alpha3 = await getCountryAlpha3(lng, lat);
        if (alpha3 === "" && gameMode !== "states") {
            return;
        }
        if (setMapClicked) {
            setMapClicked(true);
        }
        setAlpha3(alpha3);
        setUseHelper(false);
        if (onClick){
            onClick();
        }
        console.log('gameMode:', gameMode);
        if (gameMode === "shapes" && setAnswer) {
            console.log('setAnswer:', getCountryName(alpha3));
            setAnswer(getCountryName(alpha3))
            setCountryFilterAndLayer(getCountryName(alpha3), alpha3);
        }
        if (gameMode === "countries" && setAnswer) {
            console.log('setAnswer:', getCountryName(alpha3));
            setAnswer(getCountryName(alpha3))
            setCountryFilterAndLayer(getCountryName(alpha3), alpha3);
        }
        if (gameMode === "currencies" && setAnswer) {
            console.log('setAnswer:', getCountryName(alpha3));
            setAnswer(getCountryName(alpha3))
            setCountryFilterAndLayer(getCountryName(alpha3), alpha3);
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

    const getLatLngByCountry = (country: string) => {
        console.log('country:', country);
        let result = infoCountries({name: country}, 'latlng')[0];
        console.log('result:', result, "lat:", result[1], "lng:", result[0]);
        let latlng = [result[1], result[0]];
        return latlng;
    }

    const RandomizeLatLng = (country: string) => {
        const latlng = getLatLngByCountry(country);
        let randomLat = latlng[0] + (Math.random() - 0.5) * 15;
        let randomLng = latlng[1] + (Math.random() - 0.5) * 15;
        if (gameMode === "states") {
            randomLat = latlng[0] + (Math.random() - 0.5) * 5;
            randomLng = latlng[1] + (Math.random() - 0.5) * 5;
        }
        return [randomLat, randomLng];
    }

    const getUSAState = async (lng: any, lat: any) => {
        const geocoding_query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + lng + ',' + lat + '.json?access_token=' + mapboxgl.accessToken;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.get(geocoding_query, axiosConfig);
            const features = response.data.features;
            for (let i = 0; i < features.length; i++) {
                if (features[i].id.includes("region")) {
                    console.log('features[i].text:', features[i].text);
                    return features[i].text;
                }
            }
            return "";
        } catch (error) {
            console.error(error);
            return "";
        }
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
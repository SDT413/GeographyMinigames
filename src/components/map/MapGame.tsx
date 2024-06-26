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
import {WhatUSAStateCordinates} from "@/utils/WhatUSAStateCordinates";
import {useConfig} from "@/hooks/useConfig";
import {CoordinatesOfUSAState} from "@/utils/CoordinatesOfUSAState";

mapboxgl.accessToken = 'pk.eyJ1IjoiZGs0MTMiLCJhIjoiY2xmN2I0Z3ppMDBwZjN2cDcxMXBpeW92MyJ9.P4O2mbHyviXylMkyk1C3zw';

interface MapProps {
    addStyles?: string;
    onClick?: () => void;
    mapStyle?: string;
    gameMode?: string;
    setAnswer?: (answer: string) => void;
    setActualChosenState?: (actualChosenState: string) => void;
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

const Map: FC<MapProps> = ({addStyles, onClick, mapStyle, setAnswer, gameMode, useHelper, setUseHelper, helperSize, setMapClicked, helperPunishment, currentTime, setTimer, param_zoom, param_lat, param_lng, fixed, setActualChosenState}) => {
    const {increaseHelperUsed} = useActions();
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(param_lng || 44);
    const [lat, setLat] = useState(param_lat || 33);
    const [alpha3, setAlpha3] = useState("");
    const [zoom, setZoom] = useState(param_zoom || 4.5);
    const [points, setPoints] = useState<GeoJSON.FeatureCollection<GeoJSON.Point>>(featureCollection([]));
    const questions = useQuestions();
    const config = useConfig();
    const diff = config.difficulty === "custom" ? config.questionsDiff : config.difficulty;
    const currentQuestion = questions.questions[questions.currentQuestionIndex];
    const typed = currentQuestion as IQuestion;
    const rightAnswer = typed ? typed.correct_answer : "";
    const typedShape = currentQuestion as IShape;
    const rightShape = typedShape ? typedShape.place : "";
    const [mapClicked, setMapClickedTrigger] = useState(false);
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

    //create popup with right country name when user clicks on the map
    useEffect(() => {
        console.log('checkToCreatePopup:', rightAnswer, rightShape, mapClicked)
         if (!rightAnswer && !rightShape) return;
         if (!mapClicked) return;
            setMapClickedTrigger(false);
         const isAnswerRight = rightAnswer === getCountryName(alpha3) || rightShape === getCountryName(alpha3);
         if (isAnswerRight) { return; }

        if (gameMode === "shapes" && rightShape) {
            getLatLngByCountryAndCreatePopup(rightShape);
        }
        if (gameMode === "states" && rightShape) {
            getLatLngByStateAndCreatePopup(rightShape);
        }
        if (gameMode === "countries" && rightAnswer) {
            getLatLngByCountryAndCreatePopup(rightAnswer);
        }
        if (gameMode === "currencies" && rightAnswer) {
            getLatLngByCountryAndCreatePopup(rightAnswer);
        }
    }, [rightAnswer, rightShape, mapClicked]);


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

    const setCountryFilterAndLayer = (answer: string, alpha3: string) => {
        addCountryLayerByAnswer(answer, alpha3);
        map.current?.setFilter('countries', ['in', 'ADM0_A3_IS'].concat([alpha3]));
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


    const onMapClick = async (e: mapboxgl.MapMouseEvent) => {
        const {lng, lat} = e.lngLat;
        /*console.log('FROM MAP CLICK lng:', lng, 'lat:', lat);*/
        setLng(lng);
        setLat(lat);
        const alpha3 = await getCountryAlpha3(lng, lat);
        if (alpha3 === "" && gameMode !== "states") {
            return;
        }
        if (gameMode === "states" && WhatUSAStateCordinates(lng, lat, rightShape, diff).state === "Outside USA") {
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
        setMapClickedTrigger(true);
        /*console.log('gameMode:', gameMode);*/
        if (gameMode === "shapes" && setAnswer) {
            console.log('setAnswer:', getCountryName(alpha3));
            setAnswer(getCountryName(alpha3))
            setCountryFilterAndLayer(getCountryName(alpha3), alpha3);
            createPopup(lat, lng, getCountryName(alpha3), getCountryName(alpha3));
        }
        if (gameMode === "states" && setAnswer) {
            console.log('setAnswer:', getUSAState(lng, lat).state);
            const savedState = getUSAState(lng, lat).state;
            setAnswer(savedState);
            console.log('savedState:', savedState, 'actualChosenState:', getUSAState(lng, lat).actualChosenState);
            setActualChosenState!(getUSAState(lng, lat).actualChosenState);
            /*createPopup(lat, lng, getUSAState(lng, lat).state, getUSAState(lng, lat).actualChosenState);*/
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
            createPopup(lat, lng, getCountryName(alpha3), getCountryName(alpha3));
        }
    }

    const getCountryAlpha3 = async (lng: number, lat: number) => {
        const country = wc([lng, lat]);
        if (country) {
           return country;
       }
         return "";

    }

    const createPopup = (lat: number, lng: number, answer: string, text: string) => {
       if (answer === rightAnswer || answer === rightShape) {
           if (map.current?.getLayer('mark')) {
               map.current?.removeLayer('mark');
           }
           const mark = new mapboxgl.Popup( {
               closeButton: false,
               closeOnClick: true,
           })
               .setLngLat([lng, lat])
               .setHTML('<div style="' +
                   'color: black;' +
                   'font-size: 20px;' +
                   'font-weight: bold;' +
                   'background-color: #00ff17;' +
                   'border-radius: 10px;' +
                   'width: 100%;' +
                   'height: 100%;' +
                   'padding: 12px;' +
                   '">' + text + '</div>')
               .addTo(map.current!);
           /*setTimeout(() => {
               mark.remove();
           }, 3000);*/
        }
        else {
            if (map.current?.getLayer('mark')) {
                map.current?.removeLayer('mark');
            }
           const mark = new mapboxgl.Popup( {
                closeButton: false,
                closeOnClick: true,
            })
                .setLngLat([lng, lat])
                .setHTML('<div style="' +
                    'color: black;' +
                    'font-size: 20px;' +
                    'font-weight: bold;' +
                    'background-color: red;' +
                    'border-radius: 10px;' +
                    'width: 100%;' +
                    'height: 100%;' +
                    'padding: 12px;' +
                    '">' + text + '</div>')
                .addTo(map.current!);
           /*setTimeout(() => {
               mark.remove();
           }, 3000);*/
            }
        const markDocument = document.getElementsByClassName('mapboxgl-popup-content');
        if (markDocument) {
            markDocument[0].className = ''
        }
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
        if (country.name === "Bolivia, Plurinational State Of") result = "Bolivia";
        if (country.name === "Venezuela, Bolivarian Republic Of") result = "Venezuela";
        if (country.name === "Macedonia, The Former Yugoslav Republic Of") result = "Macedonia";
        return result;
    }

    const getLatLngByCountry = (country: string) => {
        console.log('country:', country);
        let result = infoCountries({name: country}, 'latlng')[0];
        console.log('result:', result, "lat:", result[1], "lng:", result[0]);
        let latlng = [result[1], result[0]];
        return latlng;
    }

    const getLatLngByCountryAndCreatePopup = (country: string) => {
        console.log('country:', country);
        let check = infoCountries({name: country}, 'latlng');
        if (check.length === 0) {
            return;
        }
        let result = infoCountries({name: country}, 'latlng')[0];
        console.log('result:', result, "lat:", result[0], "lng:", result[1]);
        createPopup(result[0], result[1], country, country)
        let latlng = [result[0], result[1]];
        return latlng;
    }

    const getLatLngByStateAndCreatePopup = (state: string) => {
        const {lat, lng} = CoordinatesOfUSAState(state);
        if (!lat || !lng) {
            return;
        }
        createPopup(lat, lng, state, state);
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

    const getUSAState = (lng: any, lat: any) => {
        const state = WhatUSAStateCordinates(lng, lat, rightShape, diff);
        return {
            state: state.state,
            actualChosenState: state.actualChosenState
        }
    }

    return (
        <div className={addStyles}>
            <div ref={mapContainer} className={styles.map}/>
        </div>
    );
};

export default Map;
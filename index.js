
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Point } from 'ol/geom.js';
import { Style, RegularShape, Fill, Stroke, Text, Icon, Circle as CircleStyle } from 'ol/style.js';
import Feature from 'ol/Feature.js';
import icon from './icon.png';

const viewSettings = {
    extent: {
        max: {
            x: 612435.55,
            y: 1234954.16
        },
        min: {
            x: -90619.29,
            y: 10097.13
        }
    },
    projection: {
        code: 'EPSG:27700',
        definition: '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
    },
    zoom: 16,
    mapCentre: {
        x: 308188.48,
        y: 608846.16
    }
    
}

const iconImage = new Icon({
    src: icon,
    imgSize: [32, 32],
    scale: 1,
    anchor: [12, 24],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    rotation: 0,
    opacity: 1
});



const pointSource = new VectorSource({
    features: []
});

const pointLayer = new VectorLayer({
    source: pointSource
});

proj4.defs(viewSettings.projection.code, viewSettings.projection.definition);
register(proj4);

new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        pointLayer
    ],
    view: new View({
        extent: [viewSettings.extent.min.x, viewSettings.extent.min.y, viewSettings.extent.max.x, viewSettings.extent.max.y],
        projection: viewSettings.projection.code,
        center: [viewSettings.mapCentre.x, viewSettings.mapCentre.y],
        zoom: viewSettings.zoom
    })
});

// set img src as same svg URI
document.getElementById('img').setAttribute('src', icon);

const addPoint = (evt, reference) => {
    const iconPoint = new Point(evt.coordinate);
    const iconFeature = new Feature({
        geometry: iconPoint,
        reference
    });

    const iconStyle = new Style({
        image: iconImage,
        text: new Text({
            font: '12px Montseratt,sans-serif',
            stroke: new Stroke({
                color: '#000',
                width: 0.75
            }),
            fill: new Fill({
                color: '#000',
                width: 0.75
            }),
            backgroundFill: new Fill({
                color: 'white'
            }),
            backgroundStroke: new Stroke({
                color: 'transparent',
                lineDash: [0],
                width: 4
            }),
            offsetY: 22,
            text: String(reference),
            padding: [2, 2, 2, 2]
        })
    });

    iconFeature.setStyle(iconStyle);
    pointSource.addFeature(iconFeature);
}

// render 100 points on map
for (let i = 0;i < 100; i++) {
    addPoint({ coordinate: [ 308188.48 + (i * 100), 608846.16 + (i * 100) ]}, i);
}
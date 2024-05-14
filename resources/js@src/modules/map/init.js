import { Loader } from '@googlemaps/js-api-loader';
import markRaw from '@img/svg/mark.svg?raw';

/*global google*/

const styles = [
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#F7F7F7'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 29
            },
            {
                weight: 0.2
            }
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 18
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#F7F7F7'
            },
            {
                lightness: 21
            }
        ]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                color: '#ffffff'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36
            },
            {
                color: '#333333'
            },
            {
                lightness: 40
            }
        ]
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    }
];

export const init = async mapEl => {
    const lat = Number(mapEl.dataset.lat);
    const lng = Number(mapEl.dataset.lng);
    const target = {
        lat: lat,
        lng: lng
    };
    const markerPosition = {
        lat: lat - 0.00025,
        lng: lng
    };
    let map = null;

    const parser = new DOMParser();
    const markSvg = parser.parseFromString(
        markRaw,
        'image/svg+xml'
    ).documentElement;

    const loader = new Loader({
        apiKey: 'AIzaSyAdLJAsgvHdX_TC_8e7Ui1u5RkTt8DpQfc', // apiKey
        version: 'weekly',
        language: 'uk',
        libraries: [ 'places' ]
    });

    await Promise.all([
        loader.importLibrary('maps'),
        loader.importLibrary('marker')
    ]).then(() => {
        map = new google.maps.Map(mapEl, {
            zoom: 17,
            center: target,
            styles: styles,
            mapId: '71e97c65db99e6d8'
        });
        new google.maps.marker.AdvancedMarkerElement({
            position: markerPosition,
            map: map,
            content: markSvg
        });
    });
};

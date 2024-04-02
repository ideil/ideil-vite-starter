import 'intersection-observer';

/*global google*/

(() => {
    const mapBlock = document.querySelector('[data-map]');

    if (!mapBlock) {
        return;
    }

    const lat = Number(mapBlock.dataset.lat);
    const lng = Number(mapBlock.dataset.lng);
    const target = {
        lat: lat,
        lng: lng
    };
    const markerPosition = {
        lat: lat - 0.00025,
        lng: lng
    };

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

    const startMap = async mapBlock => {
        let map = null;
        const [
            { Loader },
            { default: markRaw }
        ] = await Promise.all([
            await import('@googlemaps/js-api-loader'),
            await import('@img/svg/mark.svg?raw')
        ]);
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
            map = new google.maps.Map(mapBlock, {
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

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && mapBlock) {
                    observer.unobserve(mapBlock);

                    startMap(mapBlock);
                }
            });
        },
        {
            rootMargin: '100px'
        }
    );

    observer.observe(mapBlock);
})();

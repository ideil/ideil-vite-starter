import 'intersection-observer';

/*global google*/

(() => {
    const mapBlock = document.querySelector('[data-map]');

    if (!mapBlock) {
        return;
    }

    const startMap = async mapBlock => {
        const [
            { Loader },
            { default: markUrl },
        ] = await Promise.all([
            await import('@googlemaps/js-api-loader'),
            await import('@img/svg/mark.svg?url'),
        ]);

        const loader = new Loader({
            apiKey: '', // apiKey
            version: 'weekly',
            language: 'uk',
        });

        loader.load().then(() => {
            const lat = Number(mapBlock.dataset.lat);
            const lng = Number(mapBlock.dataset.lng);
            const styles = [
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                        {
                            color: '#F7F7F7',
                        },
                        {
                            lightness: 17,
                        },
                    ],
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.fill',
                    stylers: [
                        {
                            color: '#ffffff',
                        },
                        {
                            lightness: 17,
                        },
                    ],
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [
                        {
                            color: '#ffffff',
                        },
                        {
                            lightness: 29,
                        },
                        {
                            weight: 0.2,
                        },
                    ],
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [
                        {
                            color: '#ffffff',
                        },
                        {
                            lightness: 18,
                        },
                    ],
                },
                {
                    featureType: 'road.local',
                    elementType: 'geometry',
                    stylers: [
                        {
                            color: '#ffffff',
                        },
                        {
                            lightness: 16,
                        },
                    ],
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [
                        {
                            color: '#F7F7F7',
                        },
                        {
                            lightness: 21,
                        },
                    ],
                },
                {
                    elementType: 'labels.text.stroke',
                    stylers: [
                        {
                            visibility: 'on',
                        },
                        {
                            color: '#ffffff',
                        },
                        {
                            lightness: 16,
                        },
                    ],
                },
                {
                    elementType: 'labels.text.fill',
                    stylers: [
                        {
                            saturation: 36,
                        },
                        {
                            color: '#333333',
                        },
                        {
                            lightness: 40,
                        },
                    ],
                },
                {
                    elementType: 'labels.icon',
                    stylers: [
                        {
                            visibility: 'off',
                        },
                    ],
                },
            ];

            const mapMarker = {
                url: markUrl,
                size: new google.maps.Size(44, 44),
                scaledSize: new google.maps.Size(44, 44),
            };

            const target = {
                lat: lat,
                lng: lng,
            };
            const markerPosition = {
                lat: lat - 0.00025,
                lng: lng,
            };

            const map = new google.maps.Map(mapBlock, {
                zoom: 17,
                center: target,
                styles: styles,
                // scrollwheel: false,
                // panControl: false,
                // mapTypeControl: false,
                // streetViewControl: false,
                // zoomControl: false,
                // fullscreenControl: false
            });

            new google.maps.Marker({
                position: markerPosition,
                map: map,
                icon: mapMarker,
            });
        });
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && mapBlock) {
                    observer.unobserve(mapBlock);

                    startMap(mapBlock);
                }
            });
        },
        {
            rootMargin: '100px',
        },
    );

    observer.observe(mapBlock);
})();

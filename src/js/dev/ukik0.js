document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.communication')) {
        (async () => {
            await ymaps3.ready;

            const center = [60, 55];

            const content = document.createElement('div');

            content.classList.add('marker');

            const marker = new ymaps3.YMapMarker({ coordinates: center, draggable: false }, content);
            content.insertAdjacentHTML(
                'beforeend',
                `
                     <img src="./assets/images/icons/marker.svg" alt="" />
			    `
            );

            const map = new ymaps3.YMap(document.querySelector(`#communication-map`), {
                location: {
                    center,
                    zoom: 14
                }
            });

            map.addChild(new ymaps3.YMapDefaultSchemeLayer());
            map.addChild(new ymaps3.YMapDefaultFeaturesLayer({ zIndex: 1800 }));
            map.addChild(marker);
        })();
    }
});

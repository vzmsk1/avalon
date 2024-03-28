import { bodyLock, bodyUnlock } from '../utils/utils';

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

    if (document.querySelector('.catalog__filters')) {
        const filtersOpenButton = document.querySelector('.catalog__selection-button');
        const filtersCloseButton = document.querySelector('.catalog__filters-heading-button');
        const filtersMenu = document.querySelector('.catalog__filters');

        filtersOpenButton.addEventListener('click', () => {
            filtersMenu.classList.add('--active');

            bodyLock();
        });

        filtersCloseButton.addEventListener('click', (event) => {
            event.preventDefault();

            filtersMenu.classList.remove('--active');

            bodyUnlock();
        });
    }

    const searchInput = document.querySelector('.search__input input');
    const searchMenu = document.querySelector('.header__search-menu');

    searchInput.addEventListener('focusin', (event) => {
        document.documentElement.classList.add('_show-search');
    });

    window.addEventListener('click', (event) => {
        if (event.target === searchInput || event.target.closest('.search-btn')) {
            document.documentElement.classList.add('_show-search');

            if (window.innerWidth <= 768) {
                bodyLock();
            }
            return;
        }

        document.documentElement.classList.remove('_show-search');
        bodyUnlock();
    });

    searchMenu.addEventListener('click', (event) => event.stopPropagation());
});

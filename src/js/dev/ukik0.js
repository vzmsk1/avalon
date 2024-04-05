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

        if (filtersCloseButton) {
            filtersCloseButton.addEventListener('click', (event) => {
                event.preventDefault();

                filtersMenu.classList.remove('--active');

                bodyUnlock();
            });
        }
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

    if (document.querySelector('.catalog')) {
        //add selection item on change checkbox
        const selectionList = document.querySelector('.catalog__selection-list');
        const checkboxes = document.querySelectorAll('.catalog__filters-block-item input');

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', ({ target: { value, checked } }) => {
                const html = `
                <li data-name="${value}" class="catalog__selection-item txt txt_16">
                    <button>
                        <span>${value}</span>
                        <img src="./assets/images/icons/close.svg" alt="">
                    </button>
                </li>
            `;

                if (checked) {
                    selectionList.insertAdjacentHTML('beforeend', html);

                    removeSelectionItemOnClick();

                    return;
                }

                removeSelectionItem(value);
                removeSelectionItemOnClick();
            });

            function removeSelectionItem(value) {
                document.querySelector(`[data-name="${value}"]`).remove();
            }

            function removeSelectionItemOnClick() {
                Array.from(document.querySelectorAll('[data-name]'), (item) => {
                    item.addEventListener('click', () => {
                        const name = item.dataset.name;

                        item.remove();

                        removeSelectionCheckbox(name);
                    });

                    function removeSelectionCheckbox(value) {
                        document.querySelector(`.catalog__filters-block-item input[value="${value}"]`).checked = false;
                    }
                });
            }
        });

        //reset filters
        const resetButton = document.querySelector('.catalog__filters-button.--reset');

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;

                    selectionList.innerHTML = '';
                });
            });
        }
    }

    if (document.querySelector('.detailed')) {
        const bookmarkMenu = document.querySelector('.detailed__block-bookmark-menu');
        const bookmarkMenuButton = document.querySelector('.detailed__block-bookmark');

        bookmarkMenuButton.addEventListener('click', () => {
            bookmarkMenu.classList.toggle('--active');
        });
    }

    if (document.querySelector('.answers')) {
        Array.from(document.querySelectorAll('.answers__box'), (box) => {
            box.addEventListener('click', () => {
                resetActiveClasses();

                box.classList.add('--active');
            });

            function resetActiveClasses() {
                Array.from(document.querySelectorAll('.answers__box'), (box) => {
                    box.classList.remove('--active');
                });
            }
        });
    }
});

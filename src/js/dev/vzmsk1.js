// swiper
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
// utils
import { removeClasses, remToPx } from '../utils/utils';

document.addEventListener('DOMContentLoaded', function () {
    const doc = document.documentElement;
    const mm = window.matchMedia('(max-width: 768px)');

    /**
     * init sliders
     */
    const initSliders = () => {
        if (document.querySelector('.hero__carousel')) {
            new Swiper('.hero__carousel', {
                modules: [Pagination, EffectFade, Autoplay, Navigation],
                speed: 800,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.hero__carousel-pagination',
                    type: mm.matches ? 'fraction' : 'bullets',
                    renderBullet: function (index, className) {
                        const idx = index >= 10 ? ++index : '0' + ++index;
                        return `<span class="${className}">${idx}</span>`;
                    },
                    formatFractionCurrent: function (number) {
                        return number;
                    },
                    clickable: true
                },
                navigation: {
                    prevEl: '.hero__slider-navigation .arrow-btn_prev',
                    nextEl: '.hero__slider-navigation .arrow-btn_next'
                }
            });
        }
        if (document.querySelector('.places__slider')) {
            const slides = document.querySelectorAll('.places__slide');
            for (let i = 0; i < slides.length; i += 2) {
                const slide = slides[i];
                slide.classList.add('_large');
            }
            new Swiper('.places__slider', {
                modules: [Navigation, Autoplay],
                speed: 800,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
                loopPreventsSliding: true,
                spaceBetween: remToPx(2.5),
                navigation: {
                    prevEl: '.places__slider-navigation .arrow-btn_prev',
                    nextEl: '.places__slider-navigation .arrow-btn_next'
                },
                breakpoints: {
                    768: {
                        freeMode: true,
                        slidesPerView: 'auto'
                    }
                }
            });
        }
        if (document.querySelectorAll('.shopify-carousel__slider').length) {
            document.querySelectorAll('.shopify-carousel__slider').forEach((slider) => {
                new Swiper(slider, {
                    modules: [Navigation, Autoplay],
                    speed: 800,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false
                    },
                    spaceBetween: remToPx(2.8),
                    navigation: {
                        prevEl: slider.closest('section').querySelector('.arrow-btn_prev'),
                        nextEl: slider.closest('section').querySelector('.arrow-btn_next')
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 4
                        }
                    }
                });
            });
        }
        if (document.querySelector('.news__slider')) {
            new Swiper('.news__slider', {
                modules: [Navigation, Autoplay],
                speed: 800,
                rewind: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
                spaceBetween: remToPx(2.8),
                navigation: {
                    prevEl: '.news__slider-navigation .arrow-btn_prev',
                    nextEl: '.news__slider-navigation .arrow-btn_next'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2
                    }
                }
            });
        }
    };
    initSliders();

    /**
     * init yandex map
     * @returns {Promise<void>}
     */
    if (document.getElementById('map')) {
        const markers = [
            {
                address: 'Москва, улица Барклая дом 13 стр. 1',
                coordinate: [37.495302499999994, 55.744986568978845]
            }
        ];

        async function initMap() {
            await ymaps3.ready;
            const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;
            const map = new YMap(document.getElementById('map'), {
                location: {
                    center: [37.495302499999994, 55.744986568978845],
                    zoom: 15
                },
                behaviors: ['drag']
            });
            map.addChild(new YMapDefaultSchemeLayer());
            map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));

            markers.forEach((el) => {
                let content = document.createElement('div');
                content.classList.add('marker', el.type);
                content.insertAdjacentHTML(
                    'beforeend',
                    `
				<svg width="42" height="54" viewBox="0 0 42 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 54C21 54 41.25 34.8097 41.25 20.25C41.25 14.8794 39.1165 9.7287 35.3189 5.93109C31.5213 2.13348 26.3706 0 21 0C15.6294 0 10.4787 2.13348 6.68109 5.93109C2.88348 9.7287 0.75 14.8794 0.75 20.25C0.75 34.8097 21 54 21 54ZM21 30.375C18.3147 30.375 15.7394 29.3083 13.8405 27.4095C11.9417 25.5107 10.875 22.9353 10.875 20.25C10.875 17.5647 11.9417 14.9894 13.8405 13.0905C15.7394 11.1917 18.3147 10.125 21 10.125C23.6853 10.125 26.2607 11.1917 28.1595 13.0905C30.0583 14.9894 31.125 17.5647 31.125 20.25C31.125 22.9353 30.0583 25.5107 28.1595 27.4095C26.2607 29.3083 23.6853 30.375 21 30.375Z" fill="#000001"/>
                </svg>
			`
                );
                const marker = new YMapMarker({ coordinates: el.coordinate, draggable: false }, content);
                map.addChild(marker);
            });
        }
        initMap();
    }

    /**
     * set classes to active menu chapter
     */
    const setCatalogMenuClasses = () => {
        if (document.querySelectorAll('[data-nav-sublink-index]').length) {
            const sublinkNode = document.querySelectorAll('[data-nav-sublink-index]');

            for (let i = 0; i < sublinkNode.length; i++) {
                const subnav = document.querySelectorAll('[data-subnav-index]')[i];

                if (sublinkNode[i].classList.contains('_is-active') && subnav) {
                    subnav.classList.add('_is-active');
                }
            }
        }
    };
    setCatalogMenuClasses();

    /**
     * set current year (footer)
     */
    const setCurrentYear = () => {
        const year = document.getElementById('currentYear');

        if (year) {
            year.innerHTML = new Date().getFullYear();
        }
    };
    setCurrentYear();

    // handler functions
    const mouseoverHandler = (e) => {
        const target = e.target;

        // header catalog menu
        if (target.closest('.header__catalog-btn')) {
            doc.classList.add('_show-catalog');
        } else if (
            doc.classList.contains('_show-catalog') &&
            !target.closest('.header__catalog-menu') &&
            !target.closest('.header__catalog-btn')
        ) {
            doc.classList.remove('_show-catalog');
        }
        if (target.closest('[data-nav-sublink-index]')) {
            const el = target.closest('[data-nav-sublink-index]');
            const subnav = document.querySelector(`[data-subnav-index="${el.dataset.navSublinkIndex}"]`);

            removeClasses(document.querySelectorAll('[data-nav-sublink-index]'), '_is-active');
            removeClasses(document.querySelectorAll('[data-subnav-index]'), '_is-active');
            el.classList.add('_is-active');
            if (subnav) subnav.classList.add('_is-active');
        }
    };

    // document events
    document.addEventListener('mouseover', mouseoverHandler);
    // on media query change
    mm.addEventListener('change', initSliders);
});

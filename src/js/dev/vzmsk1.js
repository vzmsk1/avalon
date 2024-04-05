// swiper
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
// utils
import { _slideToggle, _slideUp, bodyLockToggle, bodyUnlock, menuClose, removeClasses, remToPx } from '../utils/utils';

document.addEventListener('DOMContentLoaded', function () {
    const doc = document.documentElement;
    const mm = window.matchMedia('(max-width: 768px)');

    /**
     * init sliders
     */
    const initSliders = () => {
        if (document.querySelector('.hero__carousel')) {
            new Swiper('.hero__carousel', {
                modules: [Pagination, EffectFade, Autoplay],
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
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        const idx = index >= 10 ? ++index : '0' + ++index;
                        return `<span class="${className}">${mm.matches ? '' : idx}</span>`;
                    },
                    clickable: true
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
                modules: [Navigation, Autoplay, Pagination],
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
                    0: {
                        centeredSlides: true,
                        slidesPerView: 1,
                        pagination: {
                            el: '.places__carousel-pagination',
                            type: 'bullets',
                            clickable: true
                        }
                    },
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
                    modules: [Navigation, Autoplay, Pagination],
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
                    pagination: {
                        el: slider.closest('section').querySelector('.slider-pagination'),
                        type: 'bullets',
                        clickable: true
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
                modules: [Navigation, Autoplay, Pagination],
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
                pagination: {
                    el: doc.querySelector('.news__slider-pagination'),
                    type: 'bullets',
                    clickable: true
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
     * init timers
     */
    const initTimers = () => {
        const timers = document.querySelectorAll('[data-timer]');
        if (timers.length) {
            timers.forEach((timer) => {
                const minutes = timer.dataset.timer;
                let timeInSecs, ticker;

                const startTimer = (s) => {
                    timeInSecs = parseInt(s);
                    ticker = setInterval(function tick() {
                        let s = timeInSecs;

                        if (s > 0) {
                            timeInSecs--;
                        } else {
                            clearInterval(ticker);
                        }

                        let m = Math.floor(s / 60);
                        s %= 60;
                        let pretty = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;

                        timer.innerHTML = pretty;
                    }, 1000);
                };

                startTimer(minutes * 60);
            });
        }
    };
    initTimers();

    /**
     * init quantity inputs
     */
    const initQuantityInputs = () => {
        if (document.querySelectorAll('.quantity').length) {
            const min = 1;
            const step = 1;

            document.querySelectorAll('.quantity').forEach((input) => {
                const inp = input.querySelector('input');
                const btnminus = input.querySelector('.quantity__button_minus');
                const btnplus = input.querySelector('.quantity__button_plus');

                const qtyminus = (e) => {
                    const current = Number(inp.value);
                    let newval = current - step;

                    if (newval < min) {
                        newval = min;
                    }

                    inp.value = Number(newval);
                    e.preventDefault();
                };

                const qtyplus = (e) => {
                    const current = Number(inp.value);
                    const newval = current + step;

                    inp.value = Number(newval);
                    e.preventDefault();
                };

                btnminus.addEventListener('click', qtyminus);
                btnplus.addEventListener('click', qtyplus);
            });
        }
    };
    initQuantityInputs();

    /**
     * show more catalog categories
     */
    const showmoreCategories = () => {
        if (document.querySelectorAll('.categories-catalog__item-txt._heading').length) {
            document.querySelectorAll('.categories-catalog__item-txt._heading').forEach((item) => {
                _slideUp(item.nextElementSibling);
                item.addEventListener('click', function () {
                    item.closest('._chapter').classList.toggle('_showmore');
                    _slideToggle(item.nextElementSibling);
                });
            });
        }
    };
    showmoreCategories();

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

    // show project modal
    if (document.querySelector('.catalog__products')) {
        document.querySelector('.catalog__products').addEventListener('click', function (e) {
            const target = e.target;

            if (target.closest('.product-card-horizontal__add-btn')) {
                removeClasses(document.querySelectorAll('.modal-product-card-horizontal'), '_is-active');
                target.closest('.product-card-horizontal').querySelector('.modal-product-card-horizontal').classList.toggle('_is-active');
            } else if (document.querySelector('.modal-product-card-horizontal._is-active') && !target.closest('.modal-product-card-horizontal')) {
                document.querySelector('.modal-product-card-horizontal._is-active').classList.remove('_is-active');
            }
            if (target.closest('.modal-product-card-horizontal__btn')) {
                target.closest('.product-card-horizontal').querySelector('.modal-product-card-horizontal').classList.remove('_is-active');
            }
        });
    }

    // close mobile search
    if (document.querySelector('.header__close-search-btn')) {
        document.querySelector('.header__close-search-btn').addEventListener('click', function () {
            document.documentElement.classList.remove('_show-search');
            bodyUnlock();
        });
    }

    // show option menu (project item)
    if (document.querySelector('.account__projects')) {
        document.querySelector('.account__projects').addEventListener('click', function (e) {
            const target = e.target;

            if (target.closest('.item-projects-account__options-btn')) {
                removeClasses(document.querySelectorAll('.item-projects-account'), '_is-active');
                target.closest('.item-projects-account').classList.add('_is-active');
            } else if (document.querySelector('.item-projects-account._is-active') && !target.closest('.item-projects-account__actions')) {
                document.querySelector('.item-projects-account._is-active').classList.remove('_is-active');
            }
        });
    }

    // handler functions
    const mouseoverHandler = (e) => {
        const target = e.target;

        // header catalog menu
        if (target.closest('.header__catalog-btn')) {
            doc.classList.add('_show-catalog');
        } else if (doc.classList.contains('_show-catalog') && !target.closest('.header__catalog-menu') && !target.closest('.header__catalog-btn')) {
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
    const clickHandler = (e) => {
        // show mobile contacts
        if (e.target.closest('.menu-bar__item-content_contacts')) {
            document.documentElement.classList.toggle('_show-contacts');
            bodyLockToggle();
        }
        if (
            document.documentElement.classList.contains('_show-contacts') &&
            !e.target.closest('.menu-bar__item-content_contacts') &&
            !e.target.closest('.menu-bar__contacts')
        ) {
            document.documentElement.classList.remove('_show-contacts');
            bodyUnlock();
        }
    };

    document.querySelector('.header__close-search-btn').addEventListener('click', function () {
        document.documentElement.classList.remove('_show-search');
        bodyUnlock();
    });

    // document events
    document.addEventListener('mouseover', mouseoverHandler);
    window.addEventListener('click', clickHandler);
    // on media query change
    mm.addEventListener('change', function () {
        initSliders();

        if (!mm.matches) {
            if (document.documentElement.classList.contains('_show-menu')) {
                menuClose();
            }
            if (document.documentElement.classList.contains('_show-search')) {
                bodyUnlock();
            }
        }
    });
});

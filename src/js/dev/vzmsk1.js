// swiper
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
// utils
import { removeClasses, remToPx } from '../utils/utils';

document.addEventListener('DOMContentLoaded', function () {
    const doc = document.documentElement;

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
                    delay: 4000
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.hero__carousel-pagination',
                    renderBullet: function (index, className) {
                        const idx = index >= 10 ? ++index : '0' + ++index;
                        return `<span class="${className}">${idx}</span>`;
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
                modules: [Navigation],
                speed: 800,
                loop: true,
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
                    modules: [Navigation],
                    speed: 800,
                    loop: true,
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
                modules: [Navigation],
                speed: 800,
                rewind: true,
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
});

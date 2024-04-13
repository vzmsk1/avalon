import Swiper from 'swiper';
import { remToPx } from '../utils/utils';
import { EffectFade, Navigation, Thumbs, Autoplay, Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.brands')) {
        new Swiper('.brands-swiper', {
            modules: [Navigation, Autoplay],
            speed: 800,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: '.brands__navigation .arrow-btn_prev',
                nextEl: '.brands__navigation .arrow-btn_next'
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: remToPx(1.6),
                    centeredSlides: true,
                    loop: true
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: remToPx(2.8)
                }
            }
        });

        new Swiper('.brands-companies-swiper', {
            modules: [Navigation, Autoplay],
            speed: 800,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: '.brands__companies-slider .arrow-btn_prev',
                nextEl: '.brands__companies-slider .arrow-btn_next'
            },
            breakpoints: {
                0: {
                    slidesPerView: 4,
                    spaceBetween: remToPx(4),
                    loop: true
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: remToPx(8)
                }
            }
        });
    }

    if (document.querySelector('.detailed')) {
        const detailedGalleryThumbs = new Swiper('.detailed-product-thumbs-swiper', {
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            speed: 1200,
            slideToClickedSlide: true,
            breakpoints: {
                0: {
                    spaceBetween: remToPx(1.6)
                },
                768: {
                    spaceBetween: remToPx(2.8)
                }
            }
        });

        new Swiper('.detailed-product-gallery-swiper', {
            modules: [Thumbs, Navigation],
            speed: 1200,
            grabCursor: true,
            thumbs: {
                swiper: detailedGalleryThumbs
            },
            slidesPerView: 1,
            breakpoints: {
                0: {
                    spaceBetween: remToPx(3.2)
                },
                768: {
                    spaceBetween: remToPx(1.6)
                }
            }
        });
    }

    if (document.querySelector('.analogs')) {
        new Swiper('.analogs-swiper', {
            modules: [Navigation, Pagination],
            speed: 1200,
            navigation: {
                prevEl: '.analogs__navigation .arrow-btn_prev',
                nextEl: '.analogs__navigation .arrow-btn_next'
            },
            pagination: {
                el: '.analogs-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: remToPx(1.6),
                    centeredSlides: true,
                    loop: true
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: remToPx(2.8)
                }
            }
        });
    }

    if (document.querySelector('.gallery')) {
        new Swiper('.gallery-swiper', {
            modules: [Navigation],
            speed: 1200,
            slidesPerView: 1.3,
            loop: true,
            navigation: {
                prevEl: '.gallery__slider-navigation .arrow-btn_prev',
                nextEl: '.gallery__slider-navigation .arrow-btn_next'
            },
          

            
            breakpoints: {
                0: {
                    spaceBetween: remToPx(2.4)
                },
                768: {
                    slidesPerView: 1.6,
                    spaceBetween: remToPx(2.8),
                    loop: true
                }
            }
        });
    }

    if (document.querySelector('.benefits-work')) {
        new Swiper('.benefits-work-swiper', {
            modules: [Navigation],
            speed: 1200,

            navigation: {
                prevEl: '.benefits-work__navigation .arrow-btn_prev',
                nextEl: '.benefits-work__navigation .arrow-btn_next'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.5
                }
            }
        });
    }

    if (document.querySelector('.news-c')) {
        new Swiper('.news-c-swiper', {
            modules: [Navigation, Pagination],
            speed: 1200,
            slidesPerView: 1,
            navigation: {
                prevEl: '.news-c__navigation .arrow-btn_prev',
                nextEl: '.news-c__navigation .arrow-btn_next'
            },
            pagination: {
                el: '.news-c-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }


    
    if (document.querySelector('.portfolio-m-swiper')) {
        // Initialize Swiper inside the DOMContentLoaded event listener
        new Swiper('.portfolio-m-swiper', {
            modules: [EffectFade, Navigation, Pagination],
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 3000,
            loop: true,
            mousewheel: {
                invert: false
            },
            navigation: {
                prevEl: '.portfolio-m__slider-navigation .arrow-btn_prev',
                nextEl: '.portfolio-m__slider-navigation .arrow-btn_next'
            },

            
            pagination: {
                el: '.portfolio-m__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            grabCursor: true,

            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 1,
    
                    spaceBetween: `${remToPx(0.8)}rem`
                }
            }
        });
    }
});

import {removeClasses} from "../utils/utils";


document.addEventListener('DOMContentLoaded', function () {
    const doc = document.documentElement

    const setCatalogMenuClasses = () => {
        if (document.querySelectorAll('[data-nav-sublink-index]').length) {
            const sublinkNode = document.querySelectorAll('[data-nav-sublink-index]')

            for (let i = 0; i < sublinkNode.length; i++) {
                const subnav = document.querySelectorAll('[data-subnav-index]')[i]

                if (sublinkNode[i].classList.contains('_is-active') && subnav) {
                    subnav.classList.add('_is-active')
                }
            }
        }
    }
    setCatalogMenuClasses()

    const setCurrentYear = () => {
        const year = document.getElementById('currentYear')

        if (year) {
            year.innerHTML = new Date().getFullYear();
        }
    }
    setCurrentYear()

    // handler functions
    const mouseoverHandler = e => {
        const target = e.target

        // header catalog menu
        if (target.closest('.header__catalog-btn')) {
            doc.classList.add('_show-catalog')
        } else if (doc.classList.contains('_show-catalog') && !target.closest('.header__catalog-menu') && !target.closest('.header__catalog-btn')) {
            doc.classList.remove('_show-catalog')
        }
        if (target.closest('[data-nav-sublink-index]')) {
            const el = target.closest('[data-nav-sublink-index]')
            const subnav = document.querySelector(`[data-subnav-index="${el.dataset.navSublinkIndex}"]`)

            removeClasses(document.querySelectorAll('[data-nav-sublink-index]'), '_is-active')
            removeClasses(document.querySelectorAll('[data-subnav-index]'), '_is-active')
            el.classList.add('_is-active')
            if (subnav) subnav.classList.add('_is-active')
        }
    }

    // document events
    document.addEventListener('mouseover', mouseoverHandler)
})
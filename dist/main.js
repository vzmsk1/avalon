/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/dev/kie6er.js":
/*!******************************!*\
  !*** ./src/js/dev/kie6er.js ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/markusDM.js":
/*!********************************!*\
  !*** ./src/js/dev/markusDM.js ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/ukik0.js":
/*!*****************************!*\
  !*** ./src/js/dev/ukik0.js ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/vzmsk1.js":
/*!******************************!*\
  !*** ./src/js/dev/vzmsk1.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/js/utils/utils.js");

document.addEventListener('DOMContentLoaded', function () {
  const doc = document.documentElement;
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
  const setCurrentYear = () => {
    const year = document.getElementById('currentYear');
    if (year) {
      year.innerHTML = new Date().getFullYear();
    }
  };
  setCurrentYear();

  // handler functions
  const mouseoverHandler = e => {
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
      (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.removeClasses)(document.querySelectorAll('[data-nav-sublink-index]'), '_is-active');
      (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.removeClasses)(document.querySelectorAll('[data-subnav-index]'), '_is-active');
      el.classList.add('_is-active');
      if (subnav) subnav.classList.add('_is-active');
    }
  };

  // document events
  document.addEventListener('mouseover', mouseoverHandler);
});

/***/ }),

/***/ "./src/js/modules.js":
/*!***************************!*\
  !*** ./src/js/modules.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modules: () => (/* binding */ modules)
/* harmony export */ });
const modules = {};

/***/ }),

/***/ "./src/js/utils/accordion.js":
/*!***********************************!*\
  !*** ./src/js/utils/accordion.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");


// --------------------------------------------------------------------------

class Accordion {
  constructor() {
    this.accordionItems = document.querySelectorAll('[data-accordion]');
    this.mdQueriesArray = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dataMediaQueries)(this.accordionItems, 'accordion');
    this.regItems = Array.from(this.accordionItems).filter(function (item, index, self) {
      return !item.dataset.accordion.split(',')[0];
    });
    this.attrs = {
      ACCORDION: 'data-accordion',
      ITEM: 'data-accordion-item',
      SINGLE: 'data-accordion-single'
    };
    this.classes = {
      INIT: '_accordion-init',
      ACTIVE: '_is-active'
    };

    // init regular accordion items
    if (this.regItems.length) {
      this.init(this.regItems);
    }
    // init accordion items with media queries
    if (this.mdQueriesArray && this.mdQueriesArray.length) {
      const _this = this;
      this.mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          _this.init(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        this.init(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  hideBody(accordionGroup) {
    const activeTitle = accordionGroup.querySelector(`[${this.attrs.ITEM}].${this.classes.ACTIVE}`);
    const speed = accordionGroup.dataset.accordionSpeed ? parseInt(accordionGroup.dataset.accordionSpeed) : 500;
    if (activeTitle && !accordionGroup.querySelectorAll('._slide').length) {
      activeTitle.classList.remove(this.classes.ACTIVE);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__._slideUp)(activeTitle.nextElementSibling, speed);
    }
  }
  setActions(e) {
    const target = e.target;
    if (target.closest(`[${this.attrs.ITEM}]`)) {
      const title = target.closest(`[${this.attrs.ITEM}]`);
      const group = title.closest(`[${this.attrs.ACCORDION}]`);
      const isSingle = group.hasAttribute(this.attrs.SINGLE);
      const speed = group.dataset.accordionSpeed ? parseInt(group.dataset.accordionSpeed) : 500;
      if (!group.querySelectorAll('._slide').length) {
        if (isSingle && !title.classList.contains(this.classes.ACTIVE)) {
          this.hideBody(group);
        }
        title.classList.toggle(this.classes.ACTIVE);
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__._slideToggle)(title.nextElementSibling, speed);
      }
      e.preventDefault();
    }
  }
  initBody(accordionGroup) {
    let hideBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let titles = accordionGroup.querySelectorAll(`[${this.attrs.ITEM}]`);
    if (titles.length) {
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.ACCORDION}]`) === accordionGroup);
      titles.forEach(title => {
        if (hideBody) {
          title.removeAttribute('tabindex');
          if (!title.classList.contains(this.classes.ACTIVE)) {
            title.nextElementSibling.hidden = true;
          }
        } else {
          title.setAttribute('tabindex', '-1');
          title.nextElementSibling.hidden = false;
        }
      });
    }
  }
  init(accordionItems) {
    let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    accordionItems.forEach(accordionGroup => {
      accordionGroup = matchMedia ? accordionGroup.item : accordionGroup;
      if (matchMedia.matches || !matchMedia) {
        accordionGroup.classList.add(this.classes.INIT);
        this.initBody(accordionGroup);
        accordionGroup.addEventListener('click', this.setActions.bind(this));
      } else {
        accordionGroup.classList.remove(this.classes.INIT);
        this.initBody(accordionGroup, false);
        accordionGroup.removeEventListener('click', this.setActions.bind(this));
      }
    });
  }
}

// --------------------------------------------------------------------------

new Accordion();

/***/ }),

/***/ "./src/js/utils/forms.js":
/*!*******************************!*\
  !*** ./src/js/utils/forms.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules.js */ "./src/js/modules.js");


// --------------------------------------------------------------------------

class Validation {
  constructor() {
    this.attrs = {
      REQUIRED: 'data-required',
      IGNORE_VALIDATION: 'data-ignore-validation',
      AJAX: 'data-ajax',
      DEV: 'data-dev',
      IGNORE_FOCUS: 'data-ignore-focus',
      SHOW_PLACEHOLDER: 'data-show-placeholder',
      VALIDATE: 'data-validate'
    };
    this.classes = {
      HAS_ERROR: '_has-error',
      HAS_FOCUS: '_has-focus',
      IS_FILLED: '_is-filled',
      IS_REVEALED: '_is-revealed'
    };
  }
  getErrors(form) {
    let err = 0;
    let requiredFields = form.querySelectorAll(`*[${this.attrs.REQUIRED}]`);
    if (requiredFields.length) {
      requiredFields.forEach(requiredField => {
        if ((requiredField.offsetParent !== null || requiredField.tagName === 'SELECT') && !requiredField.disabled) {
          err += this.validateField(requiredField);
        }
      });
    }
    return err;
  }
  addError(requiredField) {
    requiredField.classList.add(this.classes.HAS_ERROR);
    requiredField.parentElement.classList.remove(this.classes.IS_FILLED);
    requiredField.parentElement.classList.add(this.classes.HAS_ERROR);
  }
  removeError(requiredField) {
    requiredField.classList.remove(this.classes.HAS_ERROR);
    requiredField.parentElement.classList.remove(this.classes.HAS_ERROR);
  }
  validateField(requiredField) {
    let err = 0;
    if (requiredField.dataset.required === 'email') {
      requiredField.value = requiredField.value.replace(' ', '');
      if (this.testEmail(requiredField)) {
        this.addError(requiredField);
        err++;
      } else {
        this.removeError(requiredField);
      }
    } else if (requiredField.type === 'checkbox' && !requiredField.checked) {
      this.addError(requiredField);
      err++;
    } else {
      if (!requiredField.value.trim()) {
        this.addError(requiredField);
        err++;
      } else {
        this.removeError(requiredField);
      }
    }
    return err;
  }
  clearFields(form) {
    form.reset();
    setTimeout(() => {
      const inputs = form.querySelectorAll('input,textarea');
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      if (inputs.length) {
        for (let index = 0; index < inputs.length; index++) {
          const input = inputs[index];
          input.parentElement.classList.remove(this.classes.HAS_FOCUS);
          input.classList.remove(this.classes.HAS_FOCUS);
          this.removeError(input);
        }
      }
      if (checkboxes.length) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
    }, 0);
  }
  testEmail(requiredField) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(requiredField.value);
  }
}
class FormSubmition extends Validation {
  constructor(shouldValidate) {
    super();
    this.shouldValidate = shouldValidate ? shouldValidate : true;
    this.forms = document.querySelectorAll('form');
    this.init();
  }
  sendForm(form) {
    let responseResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ``;
    document.dispatchEvent(new CustomEvent('sendForm', {
      detail: {
        form: form
      }
    }));

    // show modal, if popup module is connected
    setTimeout(() => {
      if (_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.popup) {
        const modal = form.dataset.modalMessage;
        modal ? _modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal.open(modal) : null;
      }
    }, 0);
    this.clearFields(form);
    console.log('is sent');
  }
  async handleSubmition(form, e) {
    const err = !form.hasAttribute(this.attrs.IGNORE_VALIDATION) ? this.getErrors(form) : 0;
    if (err === 0) {
      const ajax = form.hasAttribute(this.attrs.AJAX);
      if (ajax) {
        e.preventDefault();
        const action = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const method = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const data = new FormData(form);
        form.classList.add('_is-sending');
        const response = await fetch(action, {
          method: method,
          body: data
        });
        if (response.ok) {
          const result = await response.json();
          form.classList.remove('_is-sending');
          this.sendForm(form, result);
        } else {
          alert('error');
          form.classList.remove('_is-sending');
        }
      } else if (form.hasAttribute(this.attrs.DEV)) {
        // in development mode
        e.preventDefault();
        this.sendForm(form);
      }
    } else {
      e.preventDefault();
    }
  }
  init() {
    const _this = this;
    const passwordFields = document.querySelectorAll('[data-required="pass"]');
    if (this.forms.length) {
      this.forms.forEach(form => {
        form.addEventListener('submit', function (e) {
          _this.handleSubmition(e.target, e);
        });
        form.addEventListener('reset', function (e) {
          _this.clearFields(e.target);
        });
      });
    }
    if (passwordFields.length) {
      passwordFields.forEach(field => {
        const btn = field.nextElementSibling;
        if (btn) {
          btn.addEventListener('click', function () {
            const type = field.parentElement.classList.contains(_this.classes.IS_REVEALED) ? 'password' : 'text';
            field.setAttribute('type', type);
            field.parentElement.classList.toggle(_this.classes.IS_REVEALED);
          });
        }
      });
    }
  }
}
class FormFields extends Validation {
  constructor() {
    super();
    this.fields = document.querySelectorAll('input,textarea');
    this.init();
  }
  savePlaceholder() {
    if (this.fields.length) {
      this.fields.forEach(field => {
        if (!field.hasAttribute(this.attrs.SHOW_PLACEHOLDER)) {
          field.dataset.placeholder = field.placeholder;
        }
      });
    }
  }
  handleFocusin(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (target.dataset.placeholder) target.placeholder = '';
      if (!target.hasAttribute(this.attrs.IGNORE_FOCUS)) {
        target.classList.add(this.classes.HAS_FOCUS);
        target.parentElement.classList.add(this.classes.HAS_FOCUS);
        target.classList.remove(this.classes.HAS_ERROR);
        target.parentElement.classList.remove(this.classes.HAS_ERROR);
      }
      if (target.type !== 'file' && target.type !== 'checkbox' && target.type !== 'radio') {
        target.closest('.input').classList.remove(this.classes.IS_FILLED);
      }
      this.removeError(target);
    }
  }
  handleFocusout(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (target.dataset.placeholder) {
        target.placeholder = target.dataset.placeholder;
      }
      if (!target.hasAttribute(this.attrs.IGNORE_FOCUS)) {
        target.classList.remove(this.classes.HAS_FOCUS);
        target.parentElement.classList.remove(this.classes.HAS_FOCUS);
      }
      if (target.hasAttribute(this.attrs.VALIDATE)) {
        this.validateField(target);
      }
      if (target.type !== 'file' && target.type !== 'checkbox' && target.type !== 'radio') {
        if (!target.classList.contains(this.classes.HAS_ERROR) && target.value.trim()) {
          target.closest('.input').classList.add(this.classes.IS_FILLED);
        } else {
          target.closest('.input').classList.remove(this.classes.IS_FILLED);
        }
      }
    }
  }
  init() {
    // save placeholder in data attribute
    this.savePlaceholder();

    // handle submition
    new FormSubmition();

    // events
    document.body.addEventListener('focusin', this.handleFocusin.bind(this));
    document.body.addEventListener('focusout', this.handleFocusout.bind(this));
  }
}

// --------------------------------------------------------------------------

new FormFields();

/***/ }),

/***/ "./src/js/utils/modals.js":
/*!********************************!*\
  !*** ./src/js/utils/modals.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules.js */ "./src/js/modules.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");



// --------------------------------------------------------------------------

class Modal {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: 'data-modal',
      attributeCloseButton: 'data-close',
      fixElementSelector: '[data-lp]',
      youtubeAttribute: 'data-modal-youtube',
      youtubePlaceAttribute: 'data-modal-youtube-place',
      setAutoplayYoutube: true,
      classes: {
        modal: 'modal',
        // modalWrapper: 'modal__wrapper',
        modalContent: 'modal__content',
        modalActive: 'modal_show',
        bodyActive: 'modal-show'
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        location: true,
        goHash: true
      },
      on: {
        beforeOpen: function () {},
        afterOpen: function () {},
        beforeClose: function () {},
        afterClose: function () {}
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ['a[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'area[href]', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
    //this.options = Object.assign(config, options);
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initmodals() : null;
  }
  initmodals() {
    this.eventsmodal();
  }
  eventsmodal() {
    document.addEventListener('click', function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : 'error';
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if (this._dataValue !== 'error') {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (!e.target.closest('#unconfirmedAgeModal') && !e.target.closest('#confirmAgeModal') && (buttonClose || !e.target.closest(`.${this.options.classes.modalContent}`) && this.isOpen)) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && e.which == 9 && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener('hashchange', function () {
        if (window.location.hash) {
          this._openToHash();
        } else {
          this.close(this.targetOpen.selector);
        }
      }.bind(this));
      window.addEventListener('load', function () {
        if (window.location.hash) {
          this._openToHash();
        }
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement('iframe');
          iframe.setAttribute('allowfullscreen', '');
          const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
          iframe.setAttribute('allow', `${autoplay}; encrypted-media`);
          iframe.setAttribute('src', urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            const youtubePlace = this.targetOpen.element.querySelector('.modal__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent('beforemodalOpen', {
          detail: {
            modal: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.modalActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) {
          const m = document.querySelector(this.hash);
          setTimeout(() => {
            !this.bodyLock && !m.hasAttribute('data-bl-mobile') || !this.bodyLock && window.innerWidth <= 768 && m.hasAttribute('data-bl-mobile') ? (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLock)() : null;
          }, 0);
        } else this._reopen = false;
        this.targetOpen.element.setAttribute('aria-hidden', 'false');
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        setTimeout(() => {
          this._focusTrap();
        }, 50);
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent('aftermodalOpen', {
          detail: {
            modal: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
      this.previousOpen.selector = selectorValue;
    }
    if (!this.isOpen || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLockStatus) {
      return;
    }
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent('beforemodalClose', {
      detail: {
        modal: this
      }
    }));
    if (this.youTubeCode) {
      if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
    }
    this.previousOpen.element.classList.remove(this.options.classes.modalActive);
    // aria-hidden
    this.previousOpen.element.setAttribute('aria-hidden', 'true');
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyUnlock)() : null;
      this.isOpen = false;
    }
    this._removeHash();
    if (this._selectorOpen) {
      this.lastClosed.selector = this.previousOpen.selector;
      this.lastClosed.element = this.previousOpen.element;
    }
    this.options.on.afterClose(this);
    document.dispatchEvent(new CustomEvent('aftermodalClose', {
      detail: {
        modal: this
      }
    }));
    setTimeout(() => {
      this._focusTrap();
    }, 50);
  }
  _getHash() {
    if (this.options.hashSettings.location) {
      this.hash = this.targetOpen.selector.includes('#') ? this.targetOpen.selector : this.targetOpen.selector.replace('.', '#');
    }
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', '#')}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState('', '', this.hash);
  }
  _removeHash() {
    history.pushState('', '', window.location.href.split('#')[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
  _focusTrap() {
    const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
    if (!this.isOpen && this.lastFocusEl) {
      this.lastFocusEl.focus();
    } else {
      focusable[0].focus();
    }
  }
}

// --------------------------------------------------------------------------

_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal = new Modal({});

/***/ }),

/***/ "./src/js/utils/select.js":
/*!********************************!*\
  !*** ./src/js/utils/select.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var simplebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar */ "./node_modules/simplebar/dist/index.mjs");
/* harmony import */ var simplebar_dist_simplebar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar/dist/simplebar.css */ "./node_modules/simplebar/dist/simplebar.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");




// --------------------------------------------------------------------------

class Select {
  // setup ------------------------------------------------------------------

  constructor() {
    this._this = this;

    // custom select classes
    this.classes = {
      // html build classes
      SELECT: 'select',
      BODY: 'select__body',
      LABEL: 'select__label',
      TITLE: 'select__title',
      VALUE: 'select__value',
      CONTENT: 'select__content',
      OPTIONS: 'select__options',
      OPTION: 'select__option',
      SCROLL: 'select__scroll',
      GROUP: 'select__group',
      INPUT: 'select__input',
      ASSET: 'select__asset',
      TXT: 'select__text',
      // state classes
      IS_ACTIVE: '_is-active',
      IS_FOCUSED: '_is-focused',
      IS_OPENED: '_is-opened',
      IS_FILLED: '_is-filled',
      IS_SELECTED: '_is-selected',
      IS_DISABLED: '_is-disabled',
      // additional classes
      HAS_LIST: '_has-list',
      HAS_ERROR: '_has-error',
      HAS_MULTIPLE: '_has-multiple',
      HAS_CHECKBOX: '_has-checkbox',
      HAS_LABEL: '_has-label'
    };

    // all select items
    const selectList = document.querySelectorAll('select');
    if (selectList.length) {
      this.init(selectList);
    }
  }

  // select initialization & build ------------------------------------------

  // initialization
  init(selectList) {
    // init
    selectList.forEach((select, index) => {
      this.initSelItem(select, index + 1);
    });

    // events
    document.addEventListener('click', function (e) {
      this.setActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.setActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.setActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.setActions(e);
    }.bind(this));
  }
  // single select item initialization
  initSelItem(relativeSel, index) {
    const _this = this;
    const select = document.createElement('div');
    select.classList.add(this.classes.SELECT);
    relativeSel.parentNode.insertBefore(select, relativeSel);
    select.appendChild(relativeSel);
    relativeSel.hidden = true;
    index ? relativeSel.dataset.selId = index : null;
    if (this.getPlaceholder(relativeSel)) {
      relativeSel.dataset.optPlaceholder = this.getPlaceholder(relativeSel).value;
      if (this.getPlaceholder(relativeSel).label.show) {
        const selTitle = this.getSelect(select, this.classes.TITLE).twinSel;
        selTitle.insertAdjacentHTML('afterbegin', `<span class="${this.classes.LABEL}">${this.getPlaceholder(relativeSel).label.text ? this.getPlaceholder(relativeSel).label.text : this.getPlaceholder(relativeSel).value}</span>`);
      }
    }
    select.insertAdjacentHTML('beforeend', `<div class="${this.classes.BODY}">
                    <div ${!relativeSel.hasAttribute('data-no-slide') ? 'hidden' : ''}  class="${this.classes.OPTIONS}">

                    </div>
                </div>`);
    this.build(relativeSel);
    relativeSel.dataset.speed = relativeSel.dataset.speed ? relativeSel.dataset.speed : '150';
    relativeSel.addEventListener('change', function (e) {
      _this.initSelections(e);
    });
  }
  // select build
  build(relativeSel) {
    const select = relativeSel.parentElement;

    // set id
    select.dataset.selId = relativeSel.dataset.selId;
    // set value
    this.setValue(select, relativeSel);
    // set options
    this.setOptions(select, relativeSel);
    // set css modificator
    relativeSel.dataset.selAddonClass ? select.classList.add(`select_${relativeSel.dataset.selAddonClass}`) : null;
    // set class if select is multiple
    relativeSel.multiple ? select.classList.add(this.classes.HAS_MULTIPLE) : select.classList.remove(this.classes.HAS_MULTIPLE);
    // set class if select checkboxes are set
    relativeSel.hasAttribute('data-sel-checkboxes') && relativeSel.multiple ? select.classList.add(this.classes.HAS_CHECKBOX) : select.classList.remove(this.classes.HAS_CHECKBOX);
    // disable select
    this.disableSelect(select, relativeSel);
    // set search actions if data-sel-search is set
    relativeSel.hasAttribute('data-sel-search') ? this.setSearchActions(select) : null;
    // set select actions if it's initially opened
    relativeSel.hasAttribute('data-sel-opened') ? this.setAction(select) : null;

    // set select hint
    if (relativeSel.dataset.selHint) {
      relativeSel.parentElement.insertAdjacentHTML('beforeend', `<div class="select__hint">${relativeSel.dataset.selHint}</div>`);
    }

    // show / hide selection from select title
    if (relativeSel.hasAttribute('data-show-val')) {
      select.classList.add('_select-show-val');
    } else {
      select.classList.remove('_select-show-val');
    }
  }
  // set twin select title value
  setValue(select, relativeSel) {
    const selBody = this.getSelect(select, this.classes.BODY).twinSel;
    const selTitle = this.getSelect(select, this.classes.TITLE).twinSel;
    if (selTitle) selTitle.remove();
    selBody.insertAdjacentHTML('afterbegin', this.getValue(select, relativeSel));
  }
  // set twin select options
  setOptions(select, relativeSel) {
    const _this = this;
    const options = this.getSelect(select, this.classes.OPTIONS).twinSel;
    const relativeSelOptions = this.getSelect(select, this.classes.OPTIONS).relativeSel;
    options.innerHTML = this.getOptions(relativeSel);
    window.addEventListener('resize', function () {
      _this.getOptions(relativeSel);
    });
    if (relativeSelOptions.querySelector('[selected]')) {
      options.querySelector(`.${this.classes.OPTION}`).classList.add(this.classes.IS_SELECTED);
    }
  }
  // disable select
  disableSelect(select, relativeSel) {
    if (relativeSel.disabled) {
      select.classList.add(this.classes.IS_DISABLED);
      this.getSelect(select, this.classes.TITLE).twinSel.disabled = true;
    } else {
      select.classList.remove(this.classes.IS_DISABLED);
      this.getSelect(select, this.classes.TITLE).twinSel.disabled = false;
    }
  }

  // main actions -----------------------------------------------------------

  // set main actions
  setActions(e) {
    const target = e.target;
    const type = e.type;
    if (target.closest(this.getClass(this.classes.SELECT)) || target.closest(this.getClass(this.classes.HAS_LIST))) {
      const select = target.closest('.select') ? target.closest('.select') : document.querySelector(`.${this.classes.sel}[data-sel-id="${target.closest(this.getClass(this.classes.HAS_LIST)).dataset.selectId}"]`);
      const relativeSel = this.getSelect(select).relativeSel;
      if (type === 'click') {
        if (!relativeSel.disabled) {
          if (target.closest(this.getClass(this.classes.HAS_LIST))) {
            const selList = target.closest(this.getClass(this.classes.HAS_LIST));
            const selOption = document.querySelector(`.${this.classes.SELECT}[data-sel-id="${selList.dataset.selId}"] .select__option[data-opt-val="${selList.dataset.optVal}"]`);
            this.setOptionAction(select, relativeSel, selOption);
          } else if (target.closest(this.getClass(this.classes.TITLE))) {
            this.setAction(select);
          } else if (target.closest(this.getClass(this.classes.OPTION))) {
            const selOption = target.closest(this.getClass(this.classes.OPTION));
            this.setOptionAction(select, relativeSel, selOption);
          }
        }
      } else if (type === 'focusin' || type === 'focusout') {
        if (target.closest(this.getClass(this.classes.SELECT))) {
          if (type === 'focusin') {
            select.classList.add(this.classes.IS_FOCUSED);
          } else {
            select.classList.remove(this.classes.IS_FOCUSED);
            if (relativeSel.hasAttribute('data-validate')) {
              if (!select.classList.contains(this.classes.IS_FILLED)) {
                this.addErr(relativeSel, select);
              } else {
                this.removeErr(relativeSel, select);
              }
            }
          }
        }
      } else if (type === 'keydown' && e.code === 'Escape') {
        this.closeGroup();
      }
    } else {
      this.closeGroup();
    }
  }
  // set single select action
  setAction(select) {
    const relativeSel = this.getSelect(select).relativeSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel;
    if (relativeSel.closest('[data-select-single]')) {
      const selectOneGroup = relativeSel.closest('[data-select-single]');
      this.closeGroup(selectOneGroup, relativeSel);
    }
    if (!selOptions.classList.contains('_slide')) {
      select.classList.toggle(this.classes.IS_OPENED);
      if (!relativeSel.hasAttribute('data-no-slide')) (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__._slideToggle)(selOptions, relativeSel.dataset.speed);
      if (select.classList.contains(this.classes.IS_OPENED) && relativeSel.hasAttribute('data-validate') && select.classList.contains(this.classes.HAS_ERROR)) {
        this.removeErr(relativeSel, select);
      }
    }
  }
  // close single select group
  closeGroup(group, select) {
    const selGroup = group ? group : document;
    const selections = selGroup.querySelectorAll(`${this.getClass(this.classes.SELECT)}${this.getClass(this.classes.IS_OPENED)}`);
    if (selections.length) {
      selections.forEach(selection => {
        if (!select || select && selection.dataset.selId !== select.dataset.selId) {
          this.closeItem(selection);
        }
      });
    }
  }
  // close single select item
  closeItem(select) {
    const relativeSel = this.getSelect(select).relativeSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel;
    if (!selOptions.classList.contains('_slide')) {
      select.classList.remove(this.classes.IS_OPENED);
      if (!relativeSel.hasAttribute('data-no-slide')) (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__._slideUp)(selOptions, relativeSel.dataset.speed);
    }
  }
  // set single option actions
  setOptionAction(select, relativeSel, option) {
    if (relativeSel.multiple) {
      option.classList.toggle(this.classes.IS_SELECTED);
      const relativeSelections = this.getData(relativeSel).elements;
      relativeSelections.forEach(relativeSelection => {
        relativeSelection.removeAttribute('selected');
      });
      const twinSelections = select.querySelectorAll(this.getClass(this.classes.IS_SELECTED));
      twinSelections.forEach(twinSelection => {
        relativeSel.querySelector(`option[value="${twinSelection.dataset.optVal}"]`).setAttribute('selected', 'selected');
      });
      if (!option.classList.contains(this.classes.IS_SELECTED)) {
        console.log(relativeSel.querySelector(`option[value="${option.dataset.optVal}"]`));
        relativeSel.querySelector(`option[value="${option.dataset.optVal}"]`).removeAttribute('selected');
      }
    } else {
      select.querySelectorAll('.select__option').forEach(opt => opt.classList.remove(this.classes.IS_SELECTED));
      option.classList.add(this.classes.IS_SELECTED);
      if (!relativeSel.hasAttribute('data-show-selection')) {
        if (select.querySelector(`${this.getClass(this.classes.OPTION)}[hidden]`)) {
          select.querySelector(`${this.getClass(this.classes.OPTION)}[hidden]`).hidden = false;
        }
        option.hidden = true;
      }
      relativeSel.value = option.hasAttribute('data-opt-val') ? option.dataset.optVal : option.textContent;
      this.setAction(select);
    }
    this.setValue(select, relativeSel);
    this.setSelections(relativeSel);
  }
  // set search actions
  setSearchActions(select) {
    const _this = this;
    const selInput = this.getSelect(select, this.classes.INPUT).twinSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel.querySelectorAll(`.${this.classes.OPTION}`);
    selInput.addEventListener('input', function () {
      selOptions.forEach(selOption => {
        if (selOption.textContent.toUpperCase().indexOf(selInput.value.toUpperCase()) >= 0) {
          selOption.hidden = false;
        } else {
          selOption.hidden = true;
        }
      });
      selOptions.hidden === true ? _this.setAction(select) : null;
    });
  }
  // set select subtitle
  setSubtitle(relativeSel) {}

  // validation -------------------------------------------------------------

  // add an error to a select
  addErr(relativeSel, select) {
    select.classList.add(this.classes.HAS_ERROR);
    if (relativeSel.dataset.selError && !relativeSel.dataset.selHint) {
      relativeSel.parentElement.insertAdjacentHTML('beforeend', `<div class="select__hint">${relativeSel.dataset.selError}</div>`);
    }
  }
  // remove an error from a select
  removeErr(relativeSel, select) {
    if (select.classList.contains(this.classes.HAS_ERROR)) {
      select.classList.remove(this.classes.HAS_ERROR);
    }
    if (relativeSel.parentElement.querySelector('.select__hint') && !relativeSel.dataset.selHint) {
      relativeSel.parentElement.removeChild(relativeSel.parentElement.querySelector('.select__hint'));
    }
  }

  // utils ------------------------------------------------------------------

  // get custom class
  getClass(cssClass) {
    return `.${cssClass}`;
  }
  // get single select item
  getSelect(select, cssClass) {
    return {
      relativeSel: select.querySelector('select'),
      twinSel: select.querySelector(this.getClass(cssClass))
    };
  }
  // get selected item value
  getValue(select, relativeSel) {
    let attr,
      attrClass,
      titleVal = this.getData(relativeSel, 2).html;

    // set title value
    titleVal = titleVal.length ? titleVal : relativeSel.dataset.selLabel ? relativeSel.dataset.selLabel : '';

    // set active class to select if it contains any values
    if (this.getData(relativeSel).values.length) {
      select.classList.add(this.classes.IS_ACTIVE);
    } else {
      select.classList.remove(this.classes.IS_ACTIVE);
    }

    // set select label
    if (relativeSel.hasAttribute('data-sel-label')) {
      attr = relativeSel.dataset.selLabel ? ` data-sel-label="${relativeSel.dataset.selLabel}"` : ` data-sel-label="Выбор"`;
      attrClass = ` ${this.classes.HAS_LABEL}`;
    }

    // push selections to the list inside of select title
    if (relativeSel.multiple && relativeSel.hasAttribute('data-sel-list')) {
      titleVal = this.getData(relativeSel).elements.map(option => `<span data-opt-id="${select.dataset.selId}" data-opt-val="${option.value}" class="_list-item">${this.getContent(option)}</span>`).join('');
      if (relativeSel.dataset.list && document.querySelector(relativeSel.dataset.list)) {
        document.querySelector(relativeSel.dataset.list).innerHTML = titleVal;
        if (relativeSel.hasAttribute('data-sel-search')) titleVal = false;
      }
    }

    // init select search
    if (relativeSel.hasAttribute('data-sel-search')) {
      return `<div class="${this.classes.TITLE}"><span ${attr} class="${this.classes.VALUEUE}"><input autocomplete="off" type="search" placeholder="${titleVal}" data-placeholder="${titleVal}" class="${this.classes.INPUT}"></span></div>`;
    } else {
      const customClass = this.getData(relativeSel).elements.length && this.getData(relativeSel).elements[0].dataset.optClass ? ` ${this.getData(relativeSel).elements[0].dataset.optClass}` : '';
      return `<button type="button" class="${this.classes.TITLE}"><span ${attr ? attr : ''} class="${this.classes.VALUE} ${attrClass ? attrClass : ''}"><span class="${this.classes.CONTENT}${customClass}">${titleVal}</span></span></button>`;
    }
  }
  // get options
  getOptions(relativeSel) {
    const selScroll = relativeSel.hasAttribute('data-sel-scroll') ? `data-simplebar` : '';
    const data = selScroll ? relativeSel.dataset.selScroll.trim().split(',') : null;
    let selScrollHeight = relativeSel.dataset.selScroll && data ? `style="max-height:${window.innerWidth > 768 ? data[0] : data[1]}rem"` : '';
    let selOptions = Array.from(relativeSel.options);
    if (selOptions.length) {
      let selOptionsHTML = ``;
      if (this.getPlaceholder(relativeSel) && !this.getPlaceholder(relativeSel).show || relativeSel.multiple) {
        selOptions = selOptions.filter(option => option.value);
      }
      selOptionsHTML += selScroll ? `<div ${selScroll} ${selScrollHeight} data-sel-scroll="${relativeSel.dataset.selScroll}" class="${this.classes.SCROLL}">` : '';
      selOptions.forEach(option => {
        selOptionsHTML += this.getOption(option, relativeSel);
      });
      selOptionsHTML += selScroll ? `</div>` : '';
      return selOptionsHTML;
    }
  }
  // get option
  getOption(option, relativeSel) {
    const selections = option.selected && relativeSel.multiple ? ` ${this.classes.IS_SELECTED}` : '';
    const showSelection = option.selected && !relativeSel.hasAttribute('data-show-selection') && !relativeSel.multiple ? `hidden` : ``;
    const optionClass = option.dataset.optClass ? ` ${option.dataset.optClass}` : '';
    const optionLink = option.dataset.optionLink ? option.dataset.optionLink : false;
    const optionLinkTarget = option.hasAttribute('data-option-link-target') ? `target="_blank"` : '';
    let optionHTML = ``;
    optionHTML += optionLink ? `<a ${optionLinkTarget} ${showSelection} href="${optionLink}" data-opt-val="${option.value}" class="${this.classes.OPTION}${optionClass}${selections}">` : `<button ${showSelection} class="${this.classes.OPTION}${optionClass}${selections}" data-opt-val="${option.value}" type="button">`;
    optionHTML += this.getContent(option);
    optionHTML += optionLink ? `</a>` : `</button>`;
    return optionHTML;
  }
  // get select content
  getContent(option) {
    const optionData = option.dataset.optAsset ? `${option.dataset.optAsset}` : '';
    const optionDataHTML = optionData.indexOf('img') >= 0 ? `<img src="${optionData}" alt="">` : optionData;
    let optionContentHTML = ``;
    optionContentHTML += optionData ? `<span class="${this.classes.GROUP}">` : '';
    optionContentHTML += optionData ? `<span class="${this.classes.ASSET}">` : '';
    optionContentHTML += optionData ? optionDataHTML : '';
    optionContentHTML += optionData ? `</span>` : '';
    optionContentHTML += optionData ? `<span class="${this.classes.TXT}">` : '';
    optionContentHTML += option.textContent;
    optionContentHTML += optionData ? `</span>` : '';
    optionContentHTML += optionData ? `</span>` : '';
    return optionContentHTML;
  }
  // get select placeholder
  getPlaceholder(relativeSel) {
    const placeholder = Array.from(relativeSel.options).find(option => !option.value);
    if (placeholder) {
      placeholder.classList.add(this.classes.subtitle);
      return {
        value: placeholder.textContent,
        show: placeholder.hasAttribute('data-sel-ph-show'),
        label: {
          show: placeholder.hasAttribute('data-sel-ph'),
          text: placeholder.dataset.optPlaceholder
        }
      };
    }
  }
  // get selected options data
  getData(relativeSel) {
    let selections = [];
    if (relativeSel.multiple) {
      selections = Array.from(relativeSel.options).filter(option => option.value).filter(option => option.selected);
    } else {
      selections.push(relativeSel.options[relativeSel.selectedIndex]);
    }
    return {
      elements: selections.map(option => option),
      values: selections.filter(option => option.value).map(option => option.value),
      html: selections.map(option => this.getContent(option))
    };
  }

  // selections -------------------------------------------------------------

  // init selections
  initSelections(e) {
    const relativeSel = e.target;
    this.build(relativeSel);
    this.setSelections(relativeSel);
  }
  // set selections
  setSelections(relativeSel) {
    const select = relativeSel.parentElement;
    if (relativeSel.hasAttribute('data-submit') && relativeSel.value) {
      let tempButton = document.createElement('button');
      tempButton.type = 'submit';
      relativeSel.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    relativeSel.parentElement.classList.add(this.classes.IS_FILLED);
    this.selection(select, relativeSel);
  }
  // custom select event (listen to any selections / mutations)
  selection(select, relativeSel) {
    document.dispatchEvent(new CustomEvent('selection', {
      detail: {
        select: relativeSel
      }
    }));
  }
}
new Select({});

// --------------------------------------------------------------------------

if (document.querySelectorAll('[data-simplebar]').length) {
  document.querySelectorAll('[data-simplebar]').forEach(scrollBlock => {
    new simplebar__WEBPACK_IMPORTED_MODULE_0__["default"](scrollBlock, {
      autoHide: false
    });
  });
}

// --------------------------------------------------------------------------

/***/ }),

/***/ "./src/js/utils/tabs.js":
/*!******************************!*\
  !*** ./src/js/utils/tabs.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils/utils.js");


// --------------------------------------------------------------------------

class Tabs {
  constructor() {
    this.attrs = {
      TABS: 'data-tabs',
      INDEX: 'data-tabs-index',
      TITLES: 'data-tabs-titles',
      TITLE: 'data-tabs-title',
      TAB_ITEM: 'data-tabs-item',
      BODY: 'data-tabs-body',
      HASH: 'data-tabs-hash'
    };
    this.classes = {
      INIT: '_tabs-init',
      ACTIVE: '_is-active',
      MODAL: 'modal'
    };
    this.tabs = document.querySelectorAll(`[data-tabs]`);
    this.activeHash = [];
    if (this.tabs.length) {
      const hash = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getHash)();
      if (hash && hash.startsWith('tab-')) {
        activeHash = hash.replace('tab-', '').split('-');
      }
      this.tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add(this.classes.INIT);
        tabsBlock.setAttribute(this.attrs.INDEX, index);
        tabsBlock.addEventListener('click', this.setActions.bind(this));
        this.init(tabsBlock);
      });
    }
  }
  setStatus(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}]`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.TAB_ITEM}]`);
    const index = tabsBlock.dataset.tabsIndex;
    if (content.length) {
      const hasHash = tabsBlock.hasAttribute(this.attrs.HASH);
      content = Array.from(content).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      content.forEach((item, indx) => {
        if (titles[indx].classList.contains(this.classes.ACTIVE)) {
          item.hidden = false;
          if (hasHash && !item.closest(`.${this.classes.MODAL}`)) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setHash)(`tab-${index}-${indx}`);
          }
        } else {
          item.hidden = true;
        }
      });
    }
  }
  setActions(e) {
    const target = e.target;
    if (target.closest(`[${this.attrs.TITLE}]`)) {
      const title = target.closest(`[${this.attrs.TITLE}]`);
      const tabsBlock = title.closest(`[${this.attrs.TABS}]`);
      if (!title.classList.contains(this.classes.ACTIVE)) {
        let activeTitle = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}].${this.classes.ACTIVE}`);
        activeTitle.length ? activeTitle = Array.from(activeTitle).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock) : null;
        activeTitle.length ? activeTitle[0].classList.remove(this.classes.ACTIVE) : null;
        title.classList.add(this.classes.ACTIVE);
        this.setStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
  init(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLES}]>*`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.BODY}]>*`);
    const index = tabsBlock.dataset.tabsIndex;
    const activeHashBlock = this.activeHash[0] == index;
    if (activeHashBlock) {
      const activeTitle = tabsBlock.querySelector(`[${this.attrs.TITLES}]>.${this.classes.ACTIVE}`);
      activeTitle ? activeTitle.classList.remove(this.classes.ACTIVE) : null;
    }
    if (content.length) {
      content = Array.from(content).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      content.forEach((item, index) => {
        titles[index].setAttribute(this.attrs.TITLE, '');
        item.setAttribute(this.attrs.TAB_ITEM, '');
        if (activeHashBlock && index == this.activeHash[1]) {
          titles[index].classList.add(this.classes.ACTIVE);
        }
        item.hidden = !titles[index].classList.contains(this.classes.ACTIVE);
      });
    }
  }
}

// --------------------------------------------------------------------------

new Tabs();

/***/ }),

/***/ "./src/js/utils/utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _slideDown: () => (/* binding */ _slideDown),
/* harmony export */   _slideToggle: () => (/* binding */ _slideToggle),
/* harmony export */   _slideUp: () => (/* binding */ _slideUp),
/* harmony export */   bodyLock: () => (/* binding */ bodyLock),
/* harmony export */   bodyLockStatus: () => (/* binding */ bodyLockStatus),
/* harmony export */   bodyLockToggle: () => (/* binding */ bodyLockToggle),
/* harmony export */   bodyUnlock: () => (/* binding */ bodyUnlock),
/* harmony export */   dataMediaQueries: () => (/* binding */ dataMediaQueries),
/* harmony export */   getHash: () => (/* binding */ getHash),
/* harmony export */   menuClose: () => (/* binding */ menuClose),
/* harmony export */   menuInit: () => (/* binding */ menuInit),
/* harmony export */   menuOpen: () => (/* binding */ menuOpen),
/* harmony export */   remToPx: () => (/* binding */ remToPx),
/* harmony export */   removeClasses: () => (/* binding */ removeClasses),
/* harmony export */   setHash: () => (/* binding */ setHash),
/* harmony export */   uniqueArray: () => (/* binding */ uniqueArray)
/* harmony export */ });
/**
 * set hash to url
 * @param {string} hash
 */
const setHash = hash => {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
};

/**
 * get hash from url
 * @returns string
 */
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
};

/**
 * initializes hamburger menu
 */
const menuInit = () => {
  if (document.querySelector('.hamburger')) {
    document.addEventListener('click', function (e) {
      if (bodyLockStatus && e.target.closest('.hamburger')) {
        menuOpen();
      } else if (bodyLockStatus && document.documentElement.classList.contains('_menu-opened') && (e.target.closest('.menu__close-btn') || !e.target.closest('.menu'))) {
        menuClose();
      }
    });
  }
};
/**
 * opens hamburger menu
 */
const menuOpen = () => {
  bodyLock();
  document.documentElement.classList.add('_menu-opened');
};
/**
 * closes hamburger menu
 */
const menuClose = () => {
  bodyUnlock();
  document.documentElement.classList.remove('_menu-opened');
};

// body lock
let bodyLockStatus = true;
/**
 * toggles body lock
 * @param {number} delay
 */
const bodyLockToggle = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
/**
 * unlocks body
 * @param {number} delay
 */
const bodyUnlock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (bodyLockStatus) {
    setTimeout(() => {
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
/**
 * locks body
 * @param {number} delay
 */
const bodyLock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (bodyLockStatus) {
    document.documentElement.classList.add('lock');
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

/**
 * make the array unique
 * @param {array} array
 * @returns
 */
function uniqueArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

/**
 *
 * @param {array} array
 * @param {number} dataSetValue
 * process media requests from attributes
 */
const dataMediaQueries = (array, dataSetValue) => {
  // get objects with media queries
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0];
    }
  });
  // objects with media queries initialization
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // get unique breakpoints
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });
    mdQueries = uniqueArray(mdQueries);
    const mdQueriesArray = [];
    if (mdQueries.length) {
      // work with every breakpoint
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // objects with conditions
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        });
      });
      return mdQueriesArray;
    }
  }
};

/**
 * smoothly slides up
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
const _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}rem` : `0`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideUpDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};

/**
 * smoothly slides down
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
const _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}rem` : `0`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideDownDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};

/**
 * toggles smooth slide
 * @param {HTMLElement} target
 * @param {number} duration
 * @returns function
 */
const _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

/**
 * converts rem to pixels
 * @param {number} remValue
 * @returns string
 */
function remToPx(remValue) {
  const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const pxValue = remValue * htmlFontSize;
  return Math.round(pxValue) + 'px';
}

// remove class from all array elements
const removeClasses = (array, className) => {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
};

/***/ }),

/***/ "./node_modules/can-use-dom/index.js":
/*!*******************************************!*\
  !*** ./node_modules/can-use-dom/index.js ***!
  \*******************************************/
/***/ ((module) => {

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

module.exports = canUseDOM;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/simplebar/dist/simplebar.css":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/simplebar/dist/simplebar.css ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `[data-simplebar] {
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.simplebar-wrapper {
  overflow: hidden;
  width: inherit;
  height: inherit;
  max-width: inherit;
  max-height: inherit;
}

.simplebar-mask {
  direction: inherit;
  position: absolute;
  overflow: hidden;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: auto !important;
  height: auto !important;
  z-index: 0;
}

.simplebar-offset {
  direction: inherit !important;
  box-sizing: inherit !important;
  resize: none !important;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
}

.simplebar-content-wrapper {
  direction: inherit;
  box-sizing: border-box !important;
  position: relative;
  display: block;
  height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
  width: auto;
  max-width: 100%; /* Not required for horizontal scroll to trigger */
  max-height: 100%; /* Needed for vertical scroll to trigger */
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.simplebar-content-wrapper::-webkit-scrollbar,
.simplebar-hide-scrollbar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.simplebar-content:before,
.simplebar-content:after {
  content: " ";
  display: table;
}

.simplebar-placeholder {
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  pointer-events: none;
}

.simplebar-height-auto-observer-wrapper {
  box-sizing: inherit !important;
  height: 100%;
  width: 100%;
  max-width: 1px;
  position: relative;
  float: left;
  max-height: 1px;
  overflow: hidden;
  z-index: -1;
  padding: 0;
  margin: 0;
  pointer-events: none;
  flex-grow: inherit;
  flex-shrink: 0;
  flex-basis: 0;
}

.simplebar-height-auto-observer {
  box-sizing: inherit;
  display: block;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 1000%;
  width: 1000%;
  min-height: 1px;
  min-width: 1px;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.simplebar-track {
  z-index: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

[data-simplebar].simplebar-dragging {
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[data-simplebar].simplebar-dragging .simplebar-content {
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[data-simplebar].simplebar-dragging .simplebar-track {
  pointer-events: all;
}

.simplebar-scrollbar {
  position: absolute;
  left: 0;
  right: 0;
  min-height: 10px;
}

.simplebar-scrollbar:before {
  position: absolute;
  content: "";
  background: black;
  border-radius: 7px;
  left: 2px;
  right: 2px;
  opacity: 0;
  transition: opacity 0.2s 0.5s linear;
}

.simplebar-scrollbar.simplebar-visible:before {
  opacity: 0.5;
  transition-delay: 0s;
  transition-duration: 0s;
}

.simplebar-track.simplebar-vertical {
  top: 0;
  width: 11px;
}

.simplebar-scrollbar:before {
  top: 2px;
  bottom: 2px;
  left: 2px;
  right: 2px;
}

.simplebar-track.simplebar-horizontal {
  left: 0;
  height: 11px;
}

.simplebar-track.simplebar-horizontal .simplebar-scrollbar {
  right: auto;
  left: 0;
  top: 0;
  bottom: 0;
  min-height: 0;
  min-width: 10px;
  width: auto;
}

/* Rtl support */
[data-simplebar-direction=rtl] .simplebar-track.simplebar-vertical {
  right: auto;
  left: 0;
}

.simplebar-dummy-scrollbar-size {
  direction: rtl;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  height: 500px;
  width: 500px;
  overflow-y: hidden;
  overflow-x: scroll;
  -ms-overflow-style: scrollbar !important;
}

.simplebar-dummy-scrollbar-size > div {
  width: 200%;
  height: 200%;
  margin: 10px 0;
}

.simplebar-hide-scrollbar {
  position: fixed;
  left: 0;
  visibility: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}`, "",{"version":3,"sources":["webpack://./node_modules/simplebar/dist/simplebar.css"],"names":[],"mappings":"AAAA;EACE,kBAAA;EACA,sBAAA;EACA,eAAA;EACA,2BAAA;EACA,yBAAA;EACA,uBAAA;AACF;;AAEA;EACE,gBAAA;EACA,cAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;AACF;;AAEA;EACE,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,sBAAA;EACA,uBAAA;EACA,UAAA;AACF;;AAEA;EACE,6BAAA;EACA,8BAAA;EACA,uBAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,UAAA;EACA,SAAA;EACA,iCAAA;AACF;;AAEA;EACE,kBAAA;EACA,iCAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA,EAAA,mGAAA;EACA,WAAA;EACA,eAAA,EAAA,kDAAA;EACA,gBAAA,EAAA,0CAAA;EACA,cAAA;EACA,qBAAA;EACA,wBAAA;AACF;;AAEA;;EAEE,aAAA;EACA,QAAA;EACA,SAAA;AACF;;AAEA;;EAEE,YAAA;EACA,cAAA;AACF;;AAEA;EACE,gBAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;AACF;;AAEA;EACE,8BAAA;EACA,YAAA;EACA,WAAA;EACA,cAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;EACA,UAAA;EACA,SAAA;EACA,oBAAA;EACA,kBAAA;EACA,cAAA;EACA,aAAA;AACF;;AAEA;EACE,mBAAA;EACA,cAAA;EACA,UAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,oBAAA;EACA,WAAA;AACF;;AAEA;EACE,UAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,oBAAA;EACA,gBAAA;AACF;;AAEA;EACE,oBAAA;EACA,2BAAA;EACA,yBAAA;EACA,wBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;AACF;;AAEA;EACE,oBAAA;EACA,2BAAA;EACA,yBAAA;EACA,wBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA;EACE,kBAAA;EACA,OAAA;EACA,QAAA;EACA,gBAAA;AACF;;AAEA;EACE,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,UAAA;EACA,oCAAA;AACF;;AAEA;EACE,YAAA;EACA,oBAAA;EACA,uBAAA;AACF;;AAEA;EACE,MAAA;EACA,WAAA;AACF;;AAEA;EACE,QAAA;EACA,WAAA;EACA,SAAA;EACA,UAAA;AACF;;AAEA;EACE,OAAA;EACA,YAAA;AACF;;AAEA;EACE,WAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,aAAA;EACA,eAAA;EACA,WAAA;AACF;;AAEA,gBAAA;AACA;EACE,WAAA;EACA,OAAA;AACF;;AAEA;EACE,cAAA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,wCAAA;AACF;;AAEA;EACE,WAAA;EACA,YAAA;EACA,cAAA;AACF;;AAEA;EACE,eAAA;EACA,OAAA;EACA,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,wBAAA;AACF","sourcesContent":["[data-simplebar] {\n  position: relative;\n  flex-direction: column;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-content: flex-start;\n  align-items: flex-start;\n}\n\n.simplebar-wrapper {\n  overflow: hidden;\n  width: inherit;\n  height: inherit;\n  max-width: inherit;\n  max-height: inherit;\n}\n\n.simplebar-mask {\n  direction: inherit;\n  position: absolute;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: auto !important;\n  height: auto !important;\n  z-index: 0;\n}\n\n.simplebar-offset {\n  direction: inherit !important;\n  box-sizing: inherit !important;\n  resize: none !important;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  padding: 0;\n  margin: 0;\n  -webkit-overflow-scrolling: touch;\n}\n\n.simplebar-content-wrapper {\n  direction: inherit;\n  box-sizing: border-box !important;\n  position: relative;\n  display: block;\n  height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */\n  width: auto;\n  max-width: 100%; /* Not required for horizontal scroll to trigger */\n  max-height: 100%; /* Needed for vertical scroll to trigger */\n  overflow: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n\n.simplebar-content-wrapper::-webkit-scrollbar,\n.simplebar-hide-scrollbar::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n.simplebar-content:before,\n.simplebar-content:after {\n  content: ' ';\n  display: table;\n}\n\n.simplebar-placeholder {\n  max-height: 100%;\n  max-width: 100%;\n  width: 100%;\n  pointer-events: none;\n}\n\n.simplebar-height-auto-observer-wrapper {\n  box-sizing: inherit !important;\n  height: 100%;\n  width: 100%;\n  max-width: 1px;\n  position: relative;\n  float: left;\n  max-height: 1px;\n  overflow: hidden;\n  z-index: -1;\n  padding: 0;\n  margin: 0;\n  pointer-events: none;\n  flex-grow: inherit;\n  flex-shrink: 0;\n  flex-basis: 0;\n}\n\n.simplebar-height-auto-observer {\n  box-sizing: inherit;\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 1000%;\n  width: 1000%;\n  min-height: 1px;\n  min-width: 1px;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: -1;\n}\n\n.simplebar-track {\n  z-index: 1;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n\n[data-simplebar].simplebar-dragging {\n  pointer-events: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n[data-simplebar].simplebar-dragging .simplebar-content {\n  pointer-events: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n[data-simplebar].simplebar-dragging .simplebar-track {\n  pointer-events: all;\n}\n\n.simplebar-scrollbar {\n  position: absolute;\n  left: 0;\n  right: 0;\n  min-height: 10px;\n}\n\n.simplebar-scrollbar:before {\n  position: absolute;\n  content: '';\n  background: black;\n  border-radius: 7px;\n  left: 2px;\n  right: 2px;\n  opacity: 0;\n  transition: opacity 0.2s 0.5s linear;\n}\n\n.simplebar-scrollbar.simplebar-visible:before {\n  opacity: 0.5;\n  transition-delay: 0s;\n  transition-duration: 0s;\n}\n\n.simplebar-track.simplebar-vertical {\n  top: 0;\n  width: 11px;\n}\n\n.simplebar-scrollbar:before {\n  top: 2px;\n  bottom: 2px;\n  left: 2px;\n  right: 2px;\n}\n\n.simplebar-track.simplebar-horizontal {\n  left: 0;\n  height: 11px;\n}\n\n.simplebar-track.simplebar-horizontal .simplebar-scrollbar {\n  right: auto;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  min-height: 0;\n  min-width: 10px;\n  width: auto;\n}\n\n/* Rtl support */\n[data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical {\n  right: auto;\n  left: 0;\n}\n\n.simplebar-dummy-scrollbar-size {\n  direction: rtl;\n  position: fixed;\n  opacity: 0;\n  visibility: hidden;\n  height: 500px;\n  width: 500px;\n  overflow-y: hidden;\n  overflow-x: scroll;\n  -ms-overflow-style: scrollbar !important;\n}\n\n.simplebar-dummy-scrollbar-size > div {\n  width: 200%;\n  height: 200%;\n  margin: 10px 0;\n}\n\n.simplebar-hide-scrollbar {\n  position: fixed;\n  left: 0;\n  visibility: hidden;\n  overflow-y: scroll;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,200..1000&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: "Gilroy";
  src: url("../assets/fonts/Gilroy_regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Gilroy";
  src: url("../assets/fonts/Gilroy_medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Gilroy";
  src: url("../assets/fonts/Gilroy_bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: "Nunito Sans";
  font-size: 0.5208335vw;
  font-style: normal;
  font-weight: normal;
  -webkit-animation: bugfix infinite 1s;
  line-height: 1.2;
  margin: 0;
  height: 100%;
  padding: 0;
}

body {
  font-style: normal;
  font-weight: normal;
  -webkit-animation: bugfix infinite 1s;
  line-height: 2.5rem;
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 1.8rem;
  color: black;
  background-color: #ffffff;
}

input,
textarea {
  -webkit-animation: bugfix infinite 1s;
  line-height: inherit;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  color: inherit;
}

a {
  color: unset;
}

a,
a:hover {
  text-decoration: none;
}

button,
input,
a,
textarea {
  outline: none;
  cursor: pointer;
  font: inherit;
}
button:focus,
input:focus,
a:focus,
textarea:focus {
  outline: none;
}
button:active,
input:active,
a:active,
textarea:active {
  outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font: inherit;
  margin: 0;
  padding: 0;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

button {
  border: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  padding: 0;
  background-color: transparent;
}

ul {
  padding: 0;
  margin: 0;
}

ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.container {
  width: 172rem;
  margin: 0 auto;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

svg,
img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.lock body {
  overflow: hidden;
  touch-action: none;
}
main {
  position: relative;
  flex: 1 1 auto;
}

.wrapper {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  height: 100%;
}

.header {
  position: relative;
  display: flex;
  flex-direction: column;
}
.header__top-bar {
  padding: 1.4rem 0;
  background-color: #EFEFEF;
}
.header__top-bar .container {
  display: flex;
  align-items: center;
}
.header__contacts-list {
  margin-right: auto;
  display: flex;
  column-gap: 3rem;
}
.header__nav {
  padding-left: 2.5rem;
  display: flex;
  column-gap: 4.8rem;
}
.header__nav-link {
  position: relative;
}
.header__nav-link::before {
  content: "";
  position: absolute;
  top: 0.25rem;
  left: -2.4rem;
  height: 2rem;
  width: 1px;
  background-color: #A1A2A9;
  transform: translateX(-100%);
}
.header__inner {
  padding-top: 2rem;
  background-color: #ffffff;
}
.header__inner .container {
  display: flex;
  column-gap: 2rem;
}
.header__logo {
  flex: 0 0 11.2rem;
  width: 11.2rem;
}
.header__content {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  flex: 1 1 auto;
}
.header__row {
  display: flex;
}
.header__row_lower {
  column-gap: 2.1rem;
}
.header__catalog-btn {
  margin-right: 2.6rem;
}
._show-catalog .header__catalog-btn .catalog-btn__icon-img {
  display: none;
}
._show-catalog .header__catalog-btn .catalog-btn__icon-img_cross {
  display: inline-block;
}
.header__search {
  margin-right: 3.2rem;
  flex: 1 1 auto;
}
.header__actions-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  text-align: center;
}
.header__actions-item svg {
  width: 3.6rem;
  height: 3.6rem;
}
.header__catalog-chapters {
  display: flex;
  column-gap: 1.6rem;
  flex: 1 1 auto;
}
.header__catalog-chapter {
  padding: 1.9rem 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  background-color: #EFEFEF;
  flex: 1 1 auto;
}

.search-header {
  display: flex;
  height: 6rem;
  border: 1px solid #000000;
}
.search-header__input.input__field {
  border: none;
}
.search-header__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 6rem;
  width: 6rem;
  height: 6rem;
  background-color: #000000;
}
.search-header__btn svg {
  width: 4.4rem;
}

.catalog-menu-header {
  position: absolute;
  z-index: 5;
  top: 14rem;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-1rem);
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
}
._show-catalog .catalog-menu-header {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.catalog-menu-header__inner {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 48.2rem 133.8rem 1fr;
  max-width: 1920px;
}
.catalog-menu-header__nav {
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #A1A2A9;
}
.catalog-menu-header__nav-sublink {
  padding: 2.4rem;
  padding-left: 14rem;
  transition: background-color 0.3s ease;
}
.catalog-menu-header__nav-sublink .txt {
  transition: color 0.3s ease;
}
.catalog-menu-header__nav-sublink._is-active {
  background-color: #000000;
}
.catalog-menu-header__nav-sublink._is-active .txt {
  color: #ffffff;
}
.catalog-menu-header__subnav {
  padding-top: 10rem;
  padding-left: 5.6rem;
  display: flex;
  flex-direction: column;
}
.catalog-menu-header__subnav:not(.catalog-menu-header__subnav._is-active) {
  display: none;
}
.catalog-menu-header__brands {
  margin-bottom: 8rem;
  display: flex;
  column-gap: 8.4rem;
}
.catalog-menu-header__brand-logo {
  position: relative;
  height: 5.4rem;
}
.catalog-menu-header__brand-logo:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 0;
  right: -4.2rem;
  width: 2px;
  height: 5.4rem;
  background-color: #A1A2A9;
  transform: translateX(100%);
}
.catalog-menu-header__brand-logo-img {
  width: auto;
  height: 100%;
}

.footer {
  background-color: #EFEFEF;
}
.footer__container {
  display: flex;
  flex-direction: column;
}
.footer__content {
  padding: 5rem 0;
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
}
.footer__logo-wrap {
  display: flex;
  flex-direction: column;
}
.footer__logo {
  margin-bottom: 2.4rem;
  width: 10.8rem;
}
.footer__text {
  max-width: 29.3rem;
}
.footer__nav {
  justify-self: center;
}
.footer__nav-items {
  display: flex;
  column-gap: 8.8rem;
}
.footer__nav-item {
  display: flex;
  flex-direction: column;
}
.footer__nav-heading {
  margin-bottom: 2.8rem;
}
.footer__subnav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1.6rem;
}
.footer__contacts-list {
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
  justify-self: end;
  max-width: 26.2rem;
}
.footer__copyrights {
  padding: 5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #A1A2A9;
  color: #808080;
}
.footer__copyrights-txt {
  text-transform: uppercase;
}
.footer__copyrights-info {
  flex: 1 1 auto;
  text-align: center;
}
.footer__rd-logo {
  flex: 0 0 18.5rem;
  width: 18.5rem;
}

.h {
  font-weight: 700;
  text-transform: uppercase;
}
.h_h1 {
  font-size: 5rem;
  line-height: 5.6rem;
}
.h_h2 {
  font-size: 3.6rem;
  line-height: 120%;
}
.h_h3 {
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 3.3rem;
}

.txt_24 {
  font-size: 2.4rem;
  line-height: 2.8rem;
}
.txt_20 {
  font-size: 2rem;
  line-height: 2.8rem;
}
.txt_16 {
  font-size: 1.6rem;
  line-height: 2.2rem;
}
.txt_14 {
  font-size: 1.4rem;
  line-height: 1.9rem;
}
.txt_semibold {
  font-weight: 600;
}

input[type=text],
input[type=email],
input[type=tel],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

textarea:focus,
input:focus {
  outline: none;
}

.input {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  width: 100%;
  border-radius: 0 !important;
}
.input_pass .input__field {
  padding-right: 4.5rem;
}
.input__field, .input__field::placeholder {
  font-size: 1.6rem;
  line-height: 2.2rem;
}
.input__field {
  padding: 1.8rem 2rem;
  height: 6rem;
  background-color: #ffffff;
  color: #A1A2A9;
  transition: color 0.3s ease;
}
.input__pass-btn {
  position: absolute;
  top: 2.2rem;
  right: 2rem;
}
.input__pass-btn-i {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}
.input__pass-btn-i_hide {
  display: none;
}
._is-revealed .input__pass-btn-i {
  display: none;
}
._is-revealed .input__pass-btn-i_hide {
  display: inline-block;
}
.input._has-error::after {
  content: attr(data-hint);
  font-size: 1.2rem;
  color: #f40000;
}
.input._has-error .input__field {
  color: #f40000;
}
.input._has-focus .input__field, .input._is-filled .input__field {
  color: #000000;
}

textarea.input {
  padding: 0px 0px;
  resize: none;
}

.btn {
  display: inline-flex;
  align-items: center;
}
.btn_primary {
  padding: 1rem 3.2rem;
  justify-content: center;
  height: 6rem;
  border: 1.5px solid #000000;
  text-align: center;
  background-color: #000000;
  transition: background-color 0.3s ease;
}
.btn_primary .txt {
  color: #ffffff;
  transition: color 0.3s ease;
}
.btn_secondary {
  margin-right: 1.6rem;
}
.btn_secondary::after {
  content: "";
  flex: 0 0 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("./assets/images/icons/arr-sm.svg");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateX(0.6rem);
  transition: transform 0.3s ease;
}
.btn[disabled], .btn._is-disabled {
  border: 1.5px solid #A1A2A9;
  background-color: #A1A2A9;
}

.catalog-btn {
  padding: 0.8rem;
  padding-right: 1.2rem;
  display: inline-flex;
  align-items: center;
  column-gap: 1.2rem;
  height: 6rem;
  background-color: #000000;
}
.catalog-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 4.4rem;
  width: 4.4rem;
  height: 4.4rem;
  background-color: #ffffff;
}
.catalog-btn__icon-img {
  width: 2.4rem;
  height: 2.4rem;
}
.catalog-btn__icon-img_cross {
  display: none;
  flex: 0 0 4rem;
  width: 4rem;
  height: 4rem;
}
.catalog-btn__txt {
  font-weight: 700;
  color: #ffffff;
}

.option {
  position: relative;
  cursor: pointer;
}
.option__input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  appearance: none;
}
.option__input:checked + .option__txt::after {
  transform: scale(1);
}
.option__txt {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 0.8rem;
}
.option__txt::before {
  content: "";
  align-self: flex-start;
  flex: 0 0 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1.5px solid #000000;
}
.option__txt::after {
  content: "";
  position: absolute;
  left: 0.4rem;
  top: 0.4rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: #000000;
  transform: scale(0);
  transition: transform 0.3s ease;
}

.checkbox {
  position: relative;
  display: inline-flex;
}
.checkbox__input {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0;
  appearance: none;
}
.checkbox__input:checked + .checkbox__txt::before {
  border: 1.5px solid #000000;
}
.checkbox__input:checked + .checkbox__txt::after {
  transform: scale(1);
}
.checkbox__txt {
  position: relative;
  display: inline-flex;
  align-items: center;
  column-gap: 0.8rem;
  cursor: pointer;
}
.checkbox__txt::before {
  content: "";
  flex: 0 0 2.2rem;
  width: 2.2rem;
  height: 2.2rem;
  border: 1.5px solid #A1A2A9;
  background-color: #ffffff;
  transition: border 0.3s ease;
}
.checkbox__txt::after {
  content: "";
  position: absolute;
  top: 0.5rem;
  left: 0.3rem;
  width: 1.6rem;
  height: 1.6rem;
  background-color: #000000;
  transform: scale(0);
  transition: transform 0.3s ease;
}

.breadcrumbs {
  display: flex;
  column-gap: 2.4rem;
}
.breadcrumbs__link {
  position: relative;
  color: #A1A2A9;
}
.breadcrumbs__link_chapter {
  display: flex;
  align-items: center;
}
.breadcrumbs__link_chapter::after {
  content: "";
  flex: 0 0 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("./assets/images/icons/arr-gray.svg");
  background-size: contain;
  background-repeat: no-repeat;
}
.breadcrumbs__link::before {
  content: "";
  position: absolute;
  top: 0.2rem;
  right: -1.2rem;
  height: 2rem;
  width: 1.2px;
  background-color: #A1A2A9;
  transform: translateX(100%);
}
.pagination {
  display: flex;
  align-items: center;
  column-gap: 2.4rem;
}
.pagination__arr {
  flex: 0 0 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
}
.pagination__arr svg path {
  fill: #000000;
}
.pagination__arr._is-disabled {
  pointer-events: none;
}
.pagination__arr._is-disabled svg path {
  fill: #A1A2A9;
}
.pagination__arr_next {
  transform: rotate(180deg);
}
.pagination__nums {
  display: flex;
  column-gap: 0.4rem;
}
.pagination__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 5rem;
  width: 5rem;
  height: 5rem;
  color: #A1A2A9;
}
.pagination__num._is-active {
  background-color: #EFEFEF;
  color: #000000;
}

.arrow-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 5rem;
  width: 5rem;
  height: 5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}
.arrow-btn_next svg {
  transform: rotate(180deg);
}
.arrow-btn:active {
  background-color: #000000;
}
.arrow-btn:active svg path {
  fill: #ffffff;
}
.arrow-btn svg {
  width: 2.4rem;
  height: 2.4rem;
}
.arrow-btn svg path {
  fill: #000000;
  transition: fill 0.3s ease;
}

.i-link {
  display: inline-flex;
  column-gap: 0.9rem;
}
.i-link svg {
  flex: 0 0 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  transform: translateY(0.05rem);
}
@media (min-width: 1920px){
  html {
    font-size: 10px;
  }
}
@media (max-width: 48em){
  html {
    font-size: 5px;
    font-size: 1.5625vw;
    font-size: 1.3333333333vw;
    -webkit-text-size-adjust: none;
  }
  body {
    font-size: 3rem;
    -webkit-text-size-adjust: none;
  }
  .container {
    padding: 0 3.2rem;
    width: 100%;
  }
}
@media (any-hover: hover){
  .btn_primary:not(.btn_primary[disabled], .btn_primary._is-disabled):hover {
    background-color: #ffffff;
  }
  .btn_primary:not(.btn_primary[disabled], .btn_primary._is-disabled):hover .txt {
    color: #000000;
  }
  .btn_secondary:hover::after {
    transform: translateX(0);
  }
}`, "",{"version":3,"sources":["webpack://./src/scss/fonts.scss","webpack://./src/scss/style.scss","webpack://./src/scss/set.scss","webpack://./src/scss/sections/header.scss","webpack://./src/scss/sections/footer.scss","webpack://./src/ui/styles/_typo.scss","webpack://./src/ui/styles/_input.scss","webpack://./src/ui/styles/_buttons.scss","webpack://./src/ui/styles/_radio-button.scss","webpack://./src/ui/styles/_checkbox.scss","webpack://./src/ui/styles/_breadcrumbs.scss","webpack://./src/ui/styles/_pagination.scss","webpack://./src/ui/styles/_arrow-btn.scss","webpack://./src/ui/styles/_i-link.scss","<no source>"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_regular.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_medium.woff2') format('woff2');\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_bold.woff2') format('woff2');\n  font-weight: 700;\n  font-style: normal;\n}","// --------------------------------- mixins ---------------------------------\n\n@import './mixins';\n\n// -------------------------------- variables -------------------------------\n\n// colors\n$white: #ffffff;\n$black: #000000;\n$gray: #EFEFEF;\n$grayTxt: #A1A2A9;\n$red: #F40000FF;\n\n// ---------------------------------- fonts ---------------------------------\n\n@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,200..1000&display=swap');\n\n// local fonts\n @import './fonts';\n\n// ------------------------------- base styles ------------------------------\n\n// base scss file\n@import './set';\n\n// body\nbody {\n    .lock & {\n        overflow: hidden;\n        touch-action: none;\n    }\n    .loaded & {\n    }\n}\n\n// main\nmain {\n    position: relative;\n    flex: 1 1 auto;\n}\n\n// wrapper\n.wrapper {\n    margin: 0 auto;\n    display: flex;\n    flex-direction: column;\n    max-width: 1920px;\n    height: 100%;\n}\n\n// --------------------------------------------------------------------------\n\n// header / footer\n@import './sections/header';\n@import './sections/footer';\n\n// ui\n@import '../ui/styles/ui.scss';\n\n// --------------------------------------------------------------------------\n\n@import './dev/vzmsk1.scss';\n@import './dev/markusDM.scss';\n@import './dev/ukik0.scss';\n@import './dev/kie6er.scss';\n","*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\nhtml {\n    font-family: 'Nunito Sans'; // шрифт по умолчанию по сайту\n    font-size: 0.5208335vw; // на разрешении 1920 0.520835vw === 10px\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 1.2;\n    margin: 0;\n    height: 100%;\n    padding: 0;\n}\n\nbody {\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 2.5rem;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    font-size: 1.8rem;\n    color: black; // цвет по умолчанию текста по сайту\n    background-color: $white;\n}\n\ninput,\ntextarea {\n    -webkit-animation: bugfix infinite 1s;\n    line-height: inherit;\n    margin: 0;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: inherit;\n}\na {\n    color: unset;\n}\na,\na:hover {\n    text-decoration: none;\n}\n\nbutton,\ninput,\na,\ntextarea {\n    outline: none;\n    cursor: pointer;\n    font: inherit;\n    &:focus {\n        outline: none;\n    }\n    &:active {\n        outline: none;\n    }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font: inherit;\n    margin: 0;\n    padding: 0;\n}\np {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n\nimg {\n    width: 100%;\n    height: auto;\n    display: block;\n}\n\nbutton {\n    border: none;\n    color: inherit;\n    font: inherit;\n    text-align: inherit;\n    padding: 0;\n    background-color: transparent;\n}\nul {\n    padding: 0;\n    margin: 0;\n}\n\nul li {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.container {\n    width: 172rem;\n    margin: 0 auto;\n}\n\ninput[type='number']::-webkit-inner-spin-button,\ninput[type='number']::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\nsvg,\nimg {\n    width: 100%;\n    height: auto;\n    object-fit: contain;\n}\n\n@media (min-width: 1920px) {\n    html {\n        font-size: 10px;\n    }\n}\n\n@media (max-width: 48em) {\n    html {\n        font-size: 5px;\n        font-size: 1.5625vw;\n        font-size: calc((100 / 375) * 5vw); // где 375 это ширина моб версии макета\n        -webkit-text-size-adjust: none;\n    }\n\n    body {\n        font-size: 3rem;\n        -webkit-text-size-adjust: none;\n    }\n\n    .container {\n        padding: 0 3.2rem; // в моб версии отступ от края задаем для всех контейнеров, а там где не нужно можем точечно убрать\n        width: 100%;\n    }\n}\n",".header {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n\n  &__top-bar {\n    padding: 1.4rem 0;\n    background-color: $gray;\n\n    .container {\n      display: flex;\n      align-items: center;\n    }\n  }\n\n  &__contacts-list {\n    margin-right: auto;\n    display: flex;\n    column-gap: 3rem;\n  }\n\n  &__nav {\n    padding-left: 2.5rem;\n    display: flex;\n    column-gap: 4.8rem;\n  }\n\n  &__nav-link {\n    position: relative;\n    &::before {\n      content: '';\n      position: absolute;\n      top: 0.25rem;\n      left: -2.4rem;\n      height: 2rem;\n      width: 1px;\n      background-color: $grayTxt;\n      transform: translateX(-100%);\n    }\n  }\n\n  &__inner {\n    padding-top: 2rem;\n    background-color: $white;\n\n    .container {\n      display: flex;\n      column-gap: 2rem;\n    }\n  }\n\n  &__logo {\n    flex: 0 0 11.2rem;\n    width: 11.2rem;\n  }\n\n  &__content {\n    display: flex;\n    flex-direction: column;\n    row-gap: 2rem;\n    flex: 1 1 auto;\n  }\n\n  &__row {\n    display: flex;\n\n    &_upper {\n    }\n    &_lower {\n      column-gap: 2.1rem;\n    }\n  }\n\n  &__catalog-btn {\n    margin-right: 2.6rem;\n\n    ._show-catalog & {\n      .catalog-btn__icon-img {\n        display: none;\n\n        &_cross {\n          display: inline-block;\n        }\n      }\n    }\n  }\n\n  &__search {\n    margin-right: 3.2rem;\n    flex: 1 1 auto;\n  }\n\n  &__actions {\n\n  }\n\n  &__actions-item {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    row-gap: 0.5rem;\n    text-align: center;\n\n    svg {\n      width: 3.6rem;\n      height: 3.6rem;\n    }\n  }\n\n  &__actions-item-txt {\n\n  }\n\n  &__catalog-chapters {\n    display: flex;\n    column-gap: 1.6rem;\n    flex: 1 1 auto;\n  }\n\n  &__catalog-chapter {\n    padding: 1.9rem 2.5rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    height: 6rem;\n    background-color: $gray;\n    flex: 1 1 auto;\n  }\n}\n\n.search-header {\n  display: flex;\n  height: 6rem;\n  border: 1px solid $black;\n\n  &__input {\n    &.input {\n      &__field {\n        border: none;\n      }\n    }\n  }\n\n  &__btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 6rem;\n    width: 6rem;\n    height: 6rem;\n    background-color: $black;\n\n    svg {\n      width: 4.4rem;\n    }\n  }\n}\n\n.catalog-menu-header {\n  position: absolute;\n  z-index: 5;\n  top: 14rem;\n  left: 0;\n  width: 100%;\n  background-color: $white;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-1rem);\n  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;\n\n  ._show-catalog & {\n    opacity: 1;\n    visibility: visible;\n    transform: translateY(0);\n  }\n\n  &__inner {\n    margin: 0 auto;\n    display: grid;\n    grid-template-columns: 48.2rem 133.8rem 1fr;\n    max-width: 1920px;\n  }\n\n  &__nav {\n    padding: 10rem 0;\n    display: flex;\n    flex-direction: column;\n    border-right: 1px solid $grayTxt;\n  }\n\n  &__nav-sublink {\n    padding: 2.4rem;\n    padding-left: 14rem;\n    transition: background-color 0.3s ease;\n\n    .txt {\n      transition: color 0.3s ease;\n    }\n\n    &._is-active {\n      background-color: $black;\n\n      .txt {\n        color: $white;\n      }\n    }\n  }\n\n  &__subnav {\n    padding-top: 10rem;\n    padding-left: 5.6rem;\n    display: flex;\n    flex-direction: column;\n\n    &:not(&._is-active) {\n      display: none;\n    }\n  }\n\n  &__brands {\n    margin-bottom: 8rem;\n    display: flex;\n    column-gap: 8.4rem;\n  }\n\n  &__brand-logo {\n    position: relative;\n    height: 5.4rem;\n\n    &:not(:last-child) {\n\n      &::after {\n        content: '';\n        position: absolute;\n        top: 0;\n        right: -4.2rem;\n        width: 2px;\n        height: 5.4rem;\n        background-color: $grayTxt;\n        transform: translateX(100%);\n      }\n    }\n\n  }\n\n  &__brand-logo-img {\n    width: auto;\n    height: 100%;\n  }\n}",".footer {\n  background-color: $gray;\n\n  &__container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  &__content {\n    padding: 5rem 0;\n    display: grid;\n    grid-template-columns: 3fr 6fr 3fr;\n  }\n\n  &__logo-wrap {\n    display: flex;\n    flex-direction: column;\n  }\n\n  &__logo {\n    margin-bottom: 2.4rem;\n    width: 10.8rem;\n  }\n\n  &__text {\n    max-width: 29.3rem;\n  }\n\n  &__nav {\n    justify-self: center;\n  }\n\n  &__nav-items {\n    display: flex;\n    column-gap: 8.8rem;\n  }\n\n  &__nav-item {\n    display: flex;\n    flex-direction: column;\n  }\n\n  &__nav-heading {\n    margin-bottom: 2.8rem;\n  }\n\n  &__subnav {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    row-gap: 1.6rem;\n  }\n\n  &__contacts-list {\n    display: flex;\n    flex-direction: column;\n    row-gap: 2.4rem;\n    justify-self: end;\n    max-width: 26.2rem;\n  }\n\n  &__copyrights {\n    padding: 5rem 0;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-top: 1px solid $grayTxt;\n    color: #808080;\n  }\n\n  &__copyrights-txt {\n    text-transform: uppercase;\n  }\n\n  &__copyrights-info {\n    flex: 1 1 auto;\n    text-align: center;\n  }\n\n  &__rd-logo {\n    flex: 0 0 18.5rem;\n    width: 18.5rem;\n  }\n}",".h {\n    font-weight: 700;\n    text-transform: uppercase;\n\n    &_h1 {\n        font-size: 5rem;\n        line-height: 5.6rem;\n    }\n\n    &_h2 {\n        font-size: 3.6rem;\n        line-height: 120%;\n    }\n\n    &_h3 {\n        font-weight: 600;\n        font-size: 2.4rem;\n        line-height: 3.3rem;\n    }\n}\n\n.txt {\n    &_24 {\n        font-size: 2.4rem;\n        line-height: 2.8rem;\n    }\n\n    &_20 {\n        font-size: 2rem;\n        line-height: 2.8rem;\n    }\n\n    &_16 {\n        font-size: 1.6rem;\n        line-height: 2.2rem;\n    }\n\n    &_14 {\n        font-size: 1.4rem;\n        line-height: 1.9rem;\n    }\n\n    &_semibold {\n        font-weight: 600;\n    }\n}","input[type='text'],\ninput[type='email'],\ninput[type='tel'],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\ntextarea:focus,\ninput:focus {\n  outline: none;\n}\n\n.input {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.2rem;\n  width: 100%;\n  border-radius: 0 !important;\n\n  &_pass {\n    .input__field {\n      padding-right: 4.5rem;\n    }\n  }\n\n  &__field,\n  &__field::placeholder {\n    font-size: 1.6rem;\n    line-height: 2.2rem;\n  }\n\n  &__field {\n    padding: 1.8rem 2rem;\n    height: 6rem;\n    background-color: $white;\n    color: $grayTxt;\n    transition: color 0.3s ease;\n  }\n\n  &__pass-btn {\n    position: absolute;\n    top: 2.2rem;\n    right: 2rem;\n  }\n\n  &__pass-btn-i {\n    display: inline-block;\n    width: 2rem;\n    height: 2rem;\n    object-fit: contain;\n\n    &_hide {\n      display: none;\n    }\n\n    ._is-revealed & {\n      display: none;\n      &_hide {\n        display: inline-block;\n      }\n    }\n  }\n\n  &._has-error {\n\n    &::after {\n      content: attr(data-hint);\n      font-size: 1.2rem;\n      color: $red;\n    }\n\n    .input__field {\n      color: $red;\n    }\n  }\n\n  &._has-focus,\n  &._is-filled {\n    .input__field {\n      color: $black;\n    }\n  }\n}\n\ntextarea.input {\n  padding: 0px 0px;\n  resize: none;\n}\n",".btn {\n  display: inline-flex;\n  align-items: center;\n\n  &_primary {\n    padding: 1rem 3.2rem;\n    justify-content: center;\n    height: 6rem;\n    border: 1.5px solid $black;\n    text-align: center;\n    background-color: $black;\n    transition: background-color 0.3s ease;\n\n    .txt {\n      color: $white;\n      transition: color 0.3s ease;\n    }\n\n    @media (any-hover: hover) {\n      &:not(&[disabled], &._is-disabled) {\n        &:hover {\n          background-color: $white;\n\n          .txt {\n            color: $black;\n          }\n        }\n      }\n    }\n  }\n\n  &_secondary {\n    margin-right: 1.6rem;\n\n    &::after {\n      content: '';\n      flex: 0 0 2.4rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      background-image: url(\"./assets/images/icons/arr-sm.svg\");\n      background-size: contain;\n      background-repeat: no-repeat;\n      transform: translateX(0.6rem);\n      transition: transform 0.3s ease;\n    }\n\n    @media (any-hover: hover) {\n      &:hover {\n        &::after {\n          transform: translateX(0);\n        }\n      }\n    }\n  }\n\n  &[disabled],\n  &._is-disabled {\n    border: 1.5px solid $grayTxt;\n    background-color: $grayTxt;\n  }\n\n}\n\n.catalog-btn {\n  padding: 0.8rem;\n  padding-right: 1.2rem;\n  display: inline-flex;\n  align-items: center;\n  column-gap: 1.2rem;\n  height: 6rem;\n  background-color: $black;\n\n  &__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 4.4rem;\n    width: 4.4rem;\n    height: 4.4rem;\n    background-color: $white;\n  }\n\n  &__icon-img {\n    width: 2.4rem;\n    height: 2.4rem;\n\n    &_cross {\n      display: none;\n      flex: 0 0 4rem;\n      width: 4rem;\n      height: 4rem;\n    }\n  }\n\n  &__txt {\n    font-weight: 700;\n    color: $white;\n  }\n}",".option {\n    position: relative;\n    cursor: pointer;\n\n  &__input {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    appearance: none;\n\n    &:focus + .option__txt::before {\n    }\n    &:checked + .option__txt::before {\n    }\n    &:checked + .option__txt::after {\n      transform: scale(1);\n    }\n  }\n\n  &__txt {\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    gap: 0.8rem;\n\n    &::before {\n      content: '';\n      align-self: flex-start;\n      flex: 0 0 2.4rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      border-radius: 50%;\n      border: 1.5px solid $black;\n    }\n    &::after {\n      content: '';\n      position: absolute;\n      left: 0.4rem;\n      top: 0.4rem;\n      width: 1.6rem;\n      height: 1.6rem;\n      border-radius: 50%;\n      background-color: $black;\n      transform: scale(0);\n      transition: transform 0.3s ease;\n    }\n  }\n}\n",".checkbox {\n  position: relative;\n  display: inline-flex;\n\n  &__input {\n    position: absolute;\n    z-index: 2;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    appearance: none;\n\n    &:checked + .checkbox__txt {\n      &::before {\n        border: 1.5px solid $black;\n      }\n      &::after {\n        transform: scale(1);\n      }\n    }\n  }\n\n  &__txt {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    column-gap: 0.8rem;\n    cursor: pointer;\n\n    &::before {\n      content: '';\n      flex: 0 0 2.2rem;\n      width: 2.2rem;\n      height: 2.2rem;\n      border: 1.5px solid $grayTxt;\n      background-color: $white;\n      transition: border 0.3s ease;\n    }\n\n    &::after {\n      content: '';\n      position: absolute;\n      top: 0.5rem;\n      left: 0.3rem;\n      width: 1.6rem;\n      height: 1.6rem;\n      background-color: $black;\n      transform: scale(0);\n      transition: transform 0.3s ease;\n    }\n  }\n}\n",".breadcrumbs {\n  display: flex;\n  column-gap: 2.4rem;\n\n  &__link {\n    position: relative;\n    color: $grayTxt;\n\n    &_chapter {\n      display: flex;\n      align-items: center;\n\n      &::after {\n        content: '';\n        flex: 0 0 2.4rem;\n        width: 2.4rem;\n        height: 2.4rem;\n        background-image: url(\"./assets/images/icons/arr-gray.svg\");\n        background-size: contain;\n        background-repeat: no-repeat;\n      }\n    }\n\n    &::before {\n      content: '';\n      position: absolute;\n      top: 0.2rem;\n      right: -1.2rem;\n      height: 2rem;\n      width: 1.2px;\n      background-color: $grayTxt;\n      transform: translateX(100%);\n    }\n  }\n\n  &__txt {\n\n  }\n}",".pagination {\n  display: flex;\n  align-items: center;\n  column-gap: 2.4rem;\n\n  &__arr {\n    flex: 0 0 2.4rem;\n    width: 2.4rem;\n    height: 2.4rem;\n\n    svg path {\n      fill: $black;\n    }\n\n    &._is-disabled {\n      pointer-events: none;\n      svg path {\n        fill: $grayTxt;\n      }\n    }\n\n    &_next {\n      transform: rotate(180deg);\n    }\n  }\n\n  &__nums {\n    display: flex;\n    column-gap: 0.4rem;\n  }\n\n  &__num {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 5rem;\n    width: 5rem;\n    height: 5rem;\n    color: $grayTxt;\n\n    &._is-active {\n      background-color: $gray;\n      color: $black;\n    }\n  }\n}",".arrow-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 5rem;\n  width: 5rem;\n  height: 5rem;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background-color: $white;\n  transition: background-color 0.3s ease;\n\n  &_next {\n    svg {\n      transform: rotate(180deg);\n    }\n  }\n\n  &:active {\n    background-color: $black;\n\n    svg path {\n      fill: $white;\n    }\n  }\n\n  svg {\n    width: 2.4rem;\n    height: 2.4rem;\n\n    path {\n      fill: $black;\n      transition: fill 0.3s ease;\n    }\n  }\n}",".i-link {\n  display: inline-flex;\n  column-gap: 0.9rem;\n\n  svg {\n    flex: 0 0 2.4rem;\n    width: 2.4rem;\n    height: 2.4rem;\n    transform: translateY(0.05rem);\n  }\n}",null],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/simplebar/dist/simplebar.css":
/*!***************************************************!*\
  !*** ./node_modules/simplebar/dist/simplebar.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../group-css-media-queries-loader/lib/index.js!../../sass-loader/dist/cjs.js!./simplebar.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/simplebar/dist/simplebar.css");
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../node_modules/group-css-media-queries-loader/lib/index.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/lodash-es/_Symbol.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_Symbol.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/** Built-in value references. */
var Symbol = _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Symbol;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbol);


/***/ }),

/***/ "./node_modules/lodash-es/_baseGetTag.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseGetTag.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");
/* harmony import */ var _getRawTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getRawTag.js */ "./node_modules/lodash-es/_getRawTag.js");
/* harmony import */ var _objectToString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_objectToString.js */ "./node_modules/lodash-es/_objectToString.js");




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? (0,_getRawTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)
    : (0,_objectToString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGetTag);


/***/ }),

/***/ "./node_modules/lodash-es/_baseTrim.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_baseTrim.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trimmedEndIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_trimmedEndIndex.js */ "./node_modules/lodash-es/_trimmedEndIndex.js");


/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, (0,_trimmedEndIndex_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string) + 1).replace(reTrimStart, '')
    : string;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseTrim);


/***/ }),

/***/ "./node_modules/lodash-es/_freeGlobal.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_freeGlobal.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);


/***/ }),

/***/ "./node_modules/lodash-es/_getRawTag.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getRawTag.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRawTag);


/***/ }),

/***/ "./node_modules/lodash-es/_objectToString.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_objectToString.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (objectToString);


/***/ }),

/***/ "./node_modules/lodash-es/_root.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/_root.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_freeGlobal.js */ "./node_modules/lodash-es/_freeGlobal.js");


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__["default"] || freeSelf || Function('return this')();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);


/***/ }),

/***/ "./node_modules/lodash-es/_trimmedEndIndex.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_trimmedEndIndex.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimmedEndIndex);


/***/ }),

/***/ "./node_modules/lodash-es/debounce.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/debounce.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");
/* harmony import */ var _now_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./now.js */ "./node_modules/lodash-es/now.js");
/* harmony import */ var _toNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toNumber.js */ "./node_modules/lodash-es/toNumber.js");




/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = (0,_toNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(wait) || 0;
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax((0,_toNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = (0,_now_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge((0,_now_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  }

  function debounced() {
    var time = (0,_now_js__WEBPACK_IMPORTED_MODULE_2__["default"])(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debounce);


/***/ }),

/***/ "./node_modules/lodash-es/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isObject.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);


/***/ }),

/***/ "./node_modules/lodash-es/isObjectLike.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/isObjectLike.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjectLike);


/***/ }),

/***/ "./node_modules/lodash-es/isSymbol.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isSymbol.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");



/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    ((0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) == symbolTag);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSymbol);


/***/ }),

/***/ "./node_modules/lodash-es/now.js":
/*!***************************************!*\
  !*** ./node_modules/lodash-es/now.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Date.now();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (now);


/***/ }),

/***/ "./node_modules/lodash-es/throttle.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/throttle.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce.js */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");



/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return (0,_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);


/***/ }),

/***/ "./node_modules/lodash-es/toNumber.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/toNumber.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseTrim_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseTrim.js */ "./node_modules/lodash-es/_baseTrim.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSymbol.js */ "./node_modules/lodash-es/isSymbol.js");




/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if ((0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    return NAN;
  }
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = (0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = (0,_baseTrim_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toNumber);


/***/ }),

/***/ "./node_modules/simplebar-core/dist/index.mjs":
/*!****************************************************!*\
  !*** ./node_modules/simplebar-core/dist/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleBarCore)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/throttle.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var can_use_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! can-use-dom */ "./node_modules/can-use-dom/index.js");
/**
 * simplebar-core - v1.2.4
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */




/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var cachedScrollbarWidth = null;
var cachedDevicePixelRatio = null;
if (can_use_dom__WEBPACK_IMPORTED_MODULE_0__) {
    window.addEventListener('resize', function () {
        if (cachedDevicePixelRatio !== window.devicePixelRatio) {
            cachedDevicePixelRatio = window.devicePixelRatio;
            cachedScrollbarWidth = null;
        }
    });
}
function scrollbarWidth() {
    if (cachedScrollbarWidth === null) {
        if (typeof document === 'undefined') {
            cachedScrollbarWidth = 0;
            return cachedScrollbarWidth;
        }
        var body = document.body;
        var box = document.createElement('div');
        box.classList.add('simplebar-hide-scrollbar');
        body.appendChild(box);
        var width = box.getBoundingClientRect().right;
        body.removeChild(box);
        cachedScrollbarWidth = width;
    }
    return cachedScrollbarWidth;
}

function getElementWindow$1(element) {
    if (!element ||
        !element.ownerDocument ||
        !element.ownerDocument.defaultView) {
        return window;
    }
    return element.ownerDocument.defaultView;
}
function getElementDocument$1(element) {
    if (!element || !element.ownerDocument) {
        return document;
    }
    return element.ownerDocument;
}
// Helper function to retrieve options from element attributes
var getOptions$1 = function (obj) {
    var initialObj = {};
    var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
        var option = attribute.name.match(/data-simplebar-(.+)/);
        if (option) {
            var key = option[1].replace(/\W+(.)/g, function (_, chr) { return chr.toUpperCase(); });
            switch (attribute.value) {
                case 'true':
                    acc[key] = true;
                    break;
                case 'false':
                    acc[key] = false;
                    break;
                case undefined:
                    acc[key] = true;
                    break;
                default:
                    acc[key] = attribute.value;
            }
        }
        return acc;
    }, initialObj);
    return options;
};
function addClasses$1(el, classes) {
    var _a;
    if (!el)
        return;
    (_a = el.classList).add.apply(_a, classes.split(' '));
}
function removeClasses$1(el, classes) {
    if (!el)
        return;
    classes.split(' ').forEach(function (className) {
        el.classList.remove(className);
    });
}
function classNamesToQuery$1(classNames) {
    return ".".concat(classNames.split(' ').join('.'));
}

var helpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getElementWindow: getElementWindow$1,
    getElementDocument: getElementDocument$1,
    getOptions: getOptions$1,
    addClasses: addClasses$1,
    removeClasses: removeClasses$1,
    classNamesToQuery: classNamesToQuery$1
});

var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, addClasses = addClasses$1, removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1;
var SimpleBarCore = /** @class */ (function () {
    function SimpleBarCore(element, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.removePreventClickId = null;
        this.minScrollbarWidth = 20;
        this.stopScrollDelay = 175;
        this.isScrolling = false;
        this.isMouseEntering = false;
        this.scrollXTicking = false;
        this.scrollYTicking = false;
        this.wrapperEl = null;
        this.contentWrapperEl = null;
        this.contentEl = null;
        this.offsetEl = null;
        this.maskEl = null;
        this.placeholderEl = null;
        this.heightAutoObserverWrapperEl = null;
        this.heightAutoObserverEl = null;
        this.rtlHelpers = null;
        this.scrollbarWidth = 0;
        this.resizeObserver = null;
        this.mutationObserver = null;
        this.elStyles = null;
        this.isRtl = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.onMouseMove = function () { };
        this.onWindowResize = function () { };
        this.onStopScrolling = function () { };
        this.onMouseEntered = function () { };
        /**
         * On scroll event handling
         */
        this.onScroll = function () {
            var elWindow = getElementWindow(_this.el);
            if (!_this.scrollXTicking) {
                elWindow.requestAnimationFrame(_this.scrollX);
                _this.scrollXTicking = true;
            }
            if (!_this.scrollYTicking) {
                elWindow.requestAnimationFrame(_this.scrollY);
                _this.scrollYTicking = true;
            }
            if (!_this.isScrolling) {
                _this.isScrolling = true;
                addClasses(_this.el, _this.classNames.scrolling);
            }
            _this.showScrollbar('x');
            _this.showScrollbar('y');
            _this.onStopScrolling();
        };
        this.scrollX = function () {
            if (_this.axis.x.isOverflowing) {
                _this.positionScrollbar('x');
            }
            _this.scrollXTicking = false;
        };
        this.scrollY = function () {
            if (_this.axis.y.isOverflowing) {
                _this.positionScrollbar('y');
            }
            _this.scrollYTicking = false;
        };
        this._onStopScrolling = function () {
            removeClasses(_this.el, _this.classNames.scrolling);
            if (_this.options.autoHide) {
                _this.hideScrollbar('x');
                _this.hideScrollbar('y');
            }
            _this.isScrolling = false;
        };
        this.onMouseEnter = function () {
            if (!_this.isMouseEntering) {
                addClasses(_this.el, _this.classNames.mouseEntered);
                _this.showScrollbar('x');
                _this.showScrollbar('y');
                _this.isMouseEntering = true;
            }
            _this.onMouseEntered();
        };
        this._onMouseEntered = function () {
            removeClasses(_this.el, _this.classNames.mouseEntered);
            if (_this.options.autoHide) {
                _this.hideScrollbar('x');
                _this.hideScrollbar('y');
            }
            _this.isMouseEntering = false;
        };
        this._onMouseMove = function (e) {
            _this.mouseX = e.clientX;
            _this.mouseY = e.clientY;
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseMoveForAxis('x');
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseMoveForAxis('y');
            }
        };
        this.onMouseLeave = function () {
            _this.onMouseMove.cancel();
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseLeaveForAxis('x');
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseLeaveForAxis('y');
            }
            _this.mouseX = -1;
            _this.mouseY = -1;
        };
        this._onWindowResize = function () {
            // Recalculate scrollbarWidth in case it's a zoom
            _this.scrollbarWidth = _this.getScrollbarWidth();
            _this.hideNativeScrollbar();
        };
        this.onPointerEvent = function (e) {
            if (!_this.axis.x.track.el ||
                !_this.axis.y.track.el ||
                !_this.axis.x.scrollbar.el ||
                !_this.axis.y.scrollbar.el)
                return;
            var isWithinTrackXBounds, isWithinTrackYBounds;
            _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
            _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
            }
            // If any pointer event is called on the scrollbar
            if (isWithinTrackXBounds || isWithinTrackYBounds) {
                // Prevent event leaking
                e.stopPropagation();
                if (e.type === 'pointerdown' && e.pointerType !== 'touch') {
                    if (isWithinTrackXBounds) {
                        _this.axis.x.scrollbar.rect =
                            _this.axis.x.scrollbar.el.getBoundingClientRect();
                        if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
                            _this.onDragStart(e, 'x');
                        }
                        else {
                            _this.onTrackClick(e, 'x');
                        }
                    }
                    if (isWithinTrackYBounds) {
                        _this.axis.y.scrollbar.rect =
                            _this.axis.y.scrollbar.el.getBoundingClientRect();
                        if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
                            _this.onDragStart(e, 'y');
                        }
                        else {
                            _this.onTrackClick(e, 'y');
                        }
                    }
                }
            }
        };
        /**
         * Drag scrollbar handle
         */
        this.drag = function (e) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if (!_this.draggedAxis || !_this.contentWrapperEl)
                return;
            var eventOffset;
            var track = _this.axis[_this.draggedAxis].track;
            var trackSize = (_b = (_a = track.rect) === null || _a === void 0 ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _b !== void 0 ? _b : 0;
            var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
            var contentSize = (_d = (_c = _this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) !== null && _d !== void 0 ? _d : 0;
            var hostSize = parseInt((_f = (_e = _this.elStyles) === null || _e === void 0 ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _f !== void 0 ? _f : '0px', 10);
            e.preventDefault();
            e.stopPropagation();
            if (_this.draggedAxis === 'y') {
                eventOffset = e.pageY;
            }
            else {
                eventOffset = e.pageX;
            }
            // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
            var dragPos = eventOffset -
                ((_h = (_g = track.rect) === null || _g === void 0 ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) !== null && _h !== void 0 ? _h : 0) -
                _this.axis[_this.draggedAxis].dragOffset;
            dragPos = _this.draggedAxis === 'x' && _this.isRtl
                ? ((_k = (_j = track.rect) === null || _j === void 0 ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _k !== void 0 ? _k : 0) -
                    scrollbar.size -
                    dragPos
                : dragPos;
            // Convert the mouse position into a percentage of the scrollbar height/width.
            var dragPerc = dragPos / (trackSize - scrollbar.size);
            // Scroll the content by the same percentage.
            var scrollPos = dragPerc * (contentSize - hostSize);
            // Fix browsers inconsistency on RTL
            if (_this.draggedAxis === 'x' && _this.isRtl) {
                scrollPos = ((_l = SimpleBarCore.getRtlHelpers()) === null || _l === void 0 ? void 0 : _l.isScrollingToNegative)
                    ? -scrollPos
                    : scrollPos;
            }
            _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] =
                scrollPos;
        };
        /**
         * End scroll handle drag
         */
        this.onEndDrag = function (e) {
            var elDocument = getElementDocument(_this.el);
            var elWindow = getElementWindow(_this.el);
            e.preventDefault();
            e.stopPropagation();
            removeClasses(_this.el, _this.classNames.dragging);
            elDocument.removeEventListener('mousemove', _this.drag, true);
            elDocument.removeEventListener('mouseup', _this.onEndDrag, true);
            _this.removePreventClickId = elWindow.setTimeout(function () {
                // Remove these asynchronously so we still suppress click events
                // generated simultaneously with mouseup.
                elDocument.removeEventListener('click', _this.preventClick, true);
                elDocument.removeEventListener('dblclick', _this.preventClick, true);
                _this.removePreventClickId = null;
            });
        };
        /**
         * Handler to ignore click events during drag
         */
        this.preventClick = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        this.el = element;
        this.options = __assign(__assign({}, SimpleBarCore.defaultOptions), options);
        this.classNames = __assign(__assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames);
        this.axis = {
            x: {
                scrollOffsetAttr: 'scrollLeft',
                sizeAttr: 'width',
                scrollSizeAttr: 'scrollWidth',
                offsetSizeAttr: 'offsetWidth',
                offsetAttr: 'left',
                overflowAttr: 'overflowX',
                dragOffset: 0,
                isOverflowing: true,
                forceVisible: false,
                track: { size: null, el: null, rect: null, isVisible: false },
                scrollbar: { size: null, el: null, rect: null, isVisible: false }
            },
            y: {
                scrollOffsetAttr: 'scrollTop',
                sizeAttr: 'height',
                scrollSizeAttr: 'scrollHeight',
                offsetSizeAttr: 'offsetHeight',
                offsetAttr: 'top',
                overflowAttr: 'overflowY',
                dragOffset: 0,
                isOverflowing: true,
                forceVisible: false,
                track: { size: null, el: null, rect: null, isVisible: false },
                scrollbar: { size: null, el: null, rect: null, isVisible: false }
            }
        };
        if (typeof this.el !== 'object' || !this.el.nodeName) {
            throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
        }
        this.onMouseMove = (0,lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"])(this._onMouseMove, 64);
        this.onWindowResize = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__["default"])(this._onWindowResize, 64, { leading: true });
        this.onStopScrolling = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__["default"])(this._onStopScrolling, this.stopScrollDelay);
        this.onMouseEntered = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__["default"])(this._onMouseEntered, this.stopScrollDelay);
        this.init();
    }
    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */
    SimpleBarCore.getRtlHelpers = function () {
        if (SimpleBarCore.rtlHelpers) {
            return SimpleBarCore.rtlHelpers;
        }
        var dummyDiv = document.createElement('div');
        dummyDiv.innerHTML =
            '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
        var scrollbarDummyEl = dummyDiv.firstElementChild;
        var dummyChild = scrollbarDummyEl === null || scrollbarDummyEl === void 0 ? void 0 : scrollbarDummyEl.firstElementChild;
        if (!dummyChild)
            return null;
        document.body.appendChild(scrollbarDummyEl);
        scrollbarDummyEl.scrollLeft = 0;
        var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl);
        var dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
        scrollbarDummyEl.scrollLeft = -999;
        var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
        document.body.removeChild(scrollbarDummyEl);
        SimpleBarCore.rtlHelpers = {
            // determines if the scrolling is responding with negative values
            isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
            // determines if the origin scrollbar position is inverted or not (positioned on left or right)
            isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
        };
        return SimpleBarCore.rtlHelpers;
    };
    SimpleBarCore.prototype.getScrollbarWidth = function () {
        // Try/catch for FF 56 throwing on undefined computedStyles
        try {
            // Detect browsers supporting CSS scrollbar styling and do not calculate
            if ((this.contentWrapperEl &&
                getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar')
                    .display === 'none') ||
                'scrollbarWidth' in document.documentElement.style ||
                '-ms-overflow-style' in document.documentElement.style) {
                return 0;
            }
            else {
                return scrollbarWidth();
            }
        }
        catch (e) {
            return scrollbarWidth();
        }
    };
    SimpleBarCore.getOffset = function (el) {
        var rect = el.getBoundingClientRect();
        var elDocument = getElementDocument(el);
        var elWindow = getElementWindow(el);
        return {
            top: rect.top +
                (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
            left: rect.left +
                (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
        };
    };
    SimpleBarCore.prototype.init = function () {
        // We stop here on server-side
        if (can_use_dom__WEBPACK_IMPORTED_MODULE_0__) {
            this.initDOM();
            this.rtlHelpers = SimpleBarCore.getRtlHelpers();
            this.scrollbarWidth = this.getScrollbarWidth();
            this.recalculate();
            this.initListeners();
        }
    };
    SimpleBarCore.prototype.initDOM = function () {
        var _a, _b;
        // assume that element has his DOM already initiated
        this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper));
        this.contentWrapperEl =
            this.options.scrollableNode ||
                this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
        this.contentEl =
            this.options.contentNode ||
                this.el.querySelector(classNamesToQuery(this.classNames.contentEl));
        this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset));
        this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask));
        this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder));
        this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl));
        this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl));
        this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal)));
        this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical)));
        this.axis.x.scrollbar.el =
            ((_a = this.axis.x.track.el) === null || _a === void 0 ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
        this.axis.y.scrollbar.el =
            ((_b = this.axis.y.track.el) === null || _b === void 0 ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
        if (!this.options.autoHide) {
            addClasses(this.axis.x.scrollbar.el, this.classNames.visible);
            addClasses(this.axis.y.scrollbar.el, this.classNames.visible);
        }
    };
    SimpleBarCore.prototype.initListeners = function () {
        var _this = this;
        var _a;
        var elWindow = getElementWindow(this.el);
        // Event listeners
        this.el.addEventListener('mouseenter', this.onMouseEnter);
        this.el.addEventListener('pointerdown', this.onPointerEvent, true);
        this.el.addEventListener('mousemove', this.onMouseMove);
        this.el.addEventListener('mouseleave', this.onMouseLeave);
        (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.onScroll);
        // Browser zoom triggers a window resize
        elWindow.addEventListener('resize', this.onWindowResize);
        if (!this.contentEl)
            return;
        if (window.ResizeObserver) {
            // Hack for https://github.com/WICG/ResizeObserver/issues/38
            var resizeObserverStarted_1 = false;
            var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
            this.resizeObserver = new resizeObserver(function () {
                if (!resizeObserverStarted_1)
                    return;
                elWindow.requestAnimationFrame(function () {
                    _this.recalculate();
                });
            });
            this.resizeObserver.observe(this.el);
            this.resizeObserver.observe(this.contentEl);
            elWindow.requestAnimationFrame(function () {
                resizeObserverStarted_1 = true;
            });
        }
        // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.
        this.mutationObserver = new elWindow.MutationObserver(function () {
            elWindow.requestAnimationFrame(function () {
                _this.recalculate();
            });
        });
        this.mutationObserver.observe(this.contentEl, {
            childList: true,
            subtree: true,
            characterData: true
        });
    };
    SimpleBarCore.prototype.recalculate = function () {
        if (!this.heightAutoObserverEl ||
            !this.contentEl ||
            !this.contentWrapperEl ||
            !this.wrapperEl ||
            !this.placeholderEl)
            return;
        var elWindow = getElementWindow(this.el);
        this.elStyles = elWindow.getComputedStyle(this.el);
        this.isRtl = this.elStyles.direction === 'rtl';
        var contentElOffsetWidth = this.contentEl.offsetWidth;
        var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
        var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
        var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
        var elOverflowX = this.elStyles.overflowX;
        var elOverflowY = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
        this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var contentElScrollHeight = this.contentEl.scrollHeight;
        var contentElScrollWidth = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%';
        // Determine placeholder size
        this.placeholderEl.style.width = isWidthAuto
            ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px")
            : 'auto';
        this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
        var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing =
            contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
        this.axis.y.isOverflowing =
            contentElScrollHeight > contentWrapperElOffsetHeight;
        // Set isOverflowing to false if user explicitely set hidden overflow
        this.axis.x.isOverflowing =
            elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
        this.axis.y.isOverflowing =
            elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
        this.axis.x.forceVisible =
            this.options.forceVisible === 'x' || this.options.forceVisible === true;
        this.axis.y.forceVisible =
            this.options.forceVisible === 'y' || this.options.forceVisible === true;
        this.hideNativeScrollbar();
        // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)
        var offsetForXScrollbar = this.axis.x.isOverflowing
            ? this.scrollbarWidth
            : 0;
        var offsetForYScrollbar = this.axis.y.isOverflowing
            ? this.scrollbarWidth
            : 0;
        this.axis.x.isOverflowing =
            this.axis.x.isOverflowing &&
                contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
        this.axis.y.isOverflowing =
            this.axis.y.isOverflowing &&
                contentElScrollHeight >
                    contentWrapperElOffsetHeight - offsetForXScrollbar;
        this.axis.x.scrollbar.size = this.getScrollbarSize('x');
        this.axis.y.scrollbar.size = this.getScrollbarSize('y');
        if (this.axis.x.scrollbar.el)
            this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
        if (this.axis.y.scrollbar.el)
            this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
        this.positionScrollbar('x');
        this.positionScrollbar('y');
        this.toggleTrackVisibility('x');
        this.toggleTrackVisibility('y');
    };
    /**
     * Calculate scrollbar size
     */
    SimpleBarCore.prototype.getScrollbarSize = function (axis) {
        var _a, _b;
        if (axis === void 0) { axis = 'y'; }
        if (!this.axis[axis].isOverflowing || !this.contentEl) {
            return 0;
        }
        var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
        var trackSize = (_b = (_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) !== null && _b !== void 0 ? _b : 0;
        var scrollbarRatio = trackSize / contentSize;
        var scrollbarSize;
        // Calculate new height/position of drag handle.
        scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
        if (this.options.scrollbarMaxSize) {
            scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
        }
        return scrollbarSize;
    };
    SimpleBarCore.prototype.positionScrollbar = function (axis) {
        var _a, _b, _c;
        if (axis === void 0) { axis = 'y'; }
        var scrollbar = this.axis[axis].scrollbar;
        if (!this.axis[axis].isOverflowing ||
            !this.contentWrapperEl ||
            !scrollbar.el ||
            !this.elStyles) {
            return;
        }
        var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
        var trackSize = ((_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0;
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        scrollOffset =
            axis === 'x' &&
                this.isRtl &&
                ((_b = SimpleBarCore.getRtlHelpers()) === null || _b === void 0 ? void 0 : _b.isScrollOriginAtZero)
                ? -scrollOffset
                : scrollOffset;
        if (axis === 'x' && this.isRtl) {
            scrollOffset = ((_c = SimpleBarCore.getRtlHelpers()) === null || _c === void 0 ? void 0 : _c.isScrollingToNegative)
                ? scrollOffset
                : -scrollOffset;
        }
        var scrollPourcent = scrollOffset / (contentSize - hostSize);
        var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
        handleOffset =
            axis === 'x' && this.isRtl
                ? -handleOffset + (trackSize - scrollbar.size)
                : handleOffset;
        scrollbar.el.style.transform =
            axis === 'x'
                ? "translate3d(".concat(handleOffset, "px, 0, 0)")
                : "translate3d(0, ".concat(handleOffset, "px, 0)");
    };
    SimpleBarCore.prototype.toggleTrackVisibility = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        var track = this.axis[axis].track.el;
        var scrollbar = this.axis[axis].scrollbar.el;
        if (!track || !scrollbar || !this.contentWrapperEl)
            return;
        if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
            track.style.visibility = 'visible';
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
            this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
        }
        else {
            track.style.visibility = 'hidden';
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
            this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
        }
        // Even if forceVisible is enabled, scrollbar itself should be hidden
        if (this.axis[axis].isOverflowing) {
            scrollbar.style.display = 'block';
        }
        else {
            scrollbar.style.display = 'none';
        }
    };
    SimpleBarCore.prototype.showScrollbar = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
            addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
            this.axis[axis].scrollbar.isVisible = true;
        }
    };
    SimpleBarCore.prototype.hideScrollbar = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
            removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
            this.axis[axis].scrollbar.isVisible = false;
        }
    };
    SimpleBarCore.prototype.hideNativeScrollbar = function () {
        if (!this.offsetEl)
            return;
        this.offsetEl.style[this.isRtl ? 'left' : 'right'] =
            this.axis.y.isOverflowing || this.axis.y.forceVisible
                ? "-".concat(this.scrollbarWidth, "px")
                : '0px';
        this.offsetEl.style.bottom =
            this.axis.x.isOverflowing || this.axis.x.forceVisible
                ? "-".concat(this.scrollbarWidth, "px")
                : '0px';
    };
    SimpleBarCore.prototype.onMouseMoveForAxis = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        var currentAxis = this.axis[axis];
        if (!currentAxis.track.el || !currentAxis.scrollbar.el)
            return;
        currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
        currentAxis.scrollbar.rect =
            currentAxis.scrollbar.el.getBoundingClientRect();
        if (this.isWithinBounds(currentAxis.track.rect)) {
            this.showScrollbar(axis);
            addClasses(currentAxis.track.el, this.classNames.hover);
            if (this.isWithinBounds(currentAxis.scrollbar.rect)) {
                addClasses(currentAxis.scrollbar.el, this.classNames.hover);
            }
            else {
                removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
            }
        }
        else {
            removeClasses(currentAxis.track.el, this.classNames.hover);
            if (this.options.autoHide) {
                this.hideScrollbar(axis);
            }
        }
    };
    SimpleBarCore.prototype.onMouseLeaveForAxis = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        removeClasses(this.axis[axis].track.el, this.classNames.hover);
        removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
        if (this.options.autoHide) {
            this.hideScrollbar(axis);
        }
    };
    /**
     * on scrollbar handle drag movement starts
     */
    SimpleBarCore.prototype.onDragStart = function (e, axis) {
        var _a;
        if (axis === void 0) { axis = 'y'; }
        var elDocument = getElementDocument(this.el);
        var elWindow = getElementWindow(this.el);
        var scrollbar = this.axis[axis].scrollbar;
        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = axis === 'y' ? e.pageY : e.pageX;
        this.axis[axis].dragOffset =
            eventOffset - (((_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) || 0);
        this.draggedAxis = axis;
        addClasses(this.el, this.classNames.dragging);
        elDocument.addEventListener('mousemove', this.drag, true);
        elDocument.addEventListener('mouseup', this.onEndDrag, true);
        if (this.removePreventClickId === null) {
            elDocument.addEventListener('click', this.preventClick, true);
            elDocument.addEventListener('dblclick', this.preventClick, true);
        }
        else {
            elWindow.clearTimeout(this.removePreventClickId);
            this.removePreventClickId = null;
        }
    };
    SimpleBarCore.prototype.onTrackClick = function (e, axis) {
        var _this = this;
        var _a, _b, _c, _d;
        if (axis === void 0) { axis = 'y'; }
        var currentAxis = this.axis[axis];
        if (!this.options.clickOnTrack ||
            !currentAxis.scrollbar.el ||
            !this.contentWrapperEl)
            return;
        // Preventing the event's default to trigger click underneath
        e.preventDefault();
        var elWindow = getElementWindow(this.el);
        this.axis[axis].scrollbar.rect =
            currentAxis.scrollbar.el.getBoundingClientRect();
        var scrollbar = this.axis[axis].scrollbar;
        var scrollbarOffset = (_b = (_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) !== null && _b !== void 0 ? _b : 0;
        var hostSize = parseInt((_d = (_c = this.elStyles) === null || _c === void 0 ? void 0 : _c[this.axis[axis].sizeAttr]) !== null && _d !== void 0 ? _d : '0px', 10);
        var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        var t = axis === 'y'
            ? this.mouseY - scrollbarOffset
            : this.mouseX - scrollbarOffset;
        var dir = t < 0 ? -1 : 1;
        var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
        var speed = 40;
        var scrollTo = function () {
            if (!_this.contentWrapperEl)
                return;
            if (dir === -1) {
                if (scrolled > scrollSize) {
                    scrolled -= speed;
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                    elWindow.requestAnimationFrame(scrollTo);
                }
            }
            else {
                if (scrolled < scrollSize) {
                    scrolled += speed;
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                    elWindow.requestAnimationFrame(scrollTo);
                }
            }
        };
        scrollTo();
    };
    /**
     * Getter for content element
     */
    SimpleBarCore.prototype.getContentElement = function () {
        return this.contentEl;
    };
    /**
     * Getter for original scrolling element
     */
    SimpleBarCore.prototype.getScrollElement = function () {
        return this.contentWrapperEl;
    };
    SimpleBarCore.prototype.removeListeners = function () {
        var elWindow = getElementWindow(this.el);
        // Event listeners
        this.el.removeEventListener('mouseenter', this.onMouseEnter);
        this.el.removeEventListener('pointerdown', this.onPointerEvent, true);
        this.el.removeEventListener('mousemove', this.onMouseMove);
        this.el.removeEventListener('mouseleave', this.onMouseLeave);
        if (this.contentWrapperEl) {
            this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
        }
        elWindow.removeEventListener('resize', this.onWindowResize);
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        // Cancel all debounced functions
        this.onMouseMove.cancel();
        this.onWindowResize.cancel();
        this.onStopScrolling.cancel();
        this.onMouseEntered.cancel();
    };
    /**
     * Remove all listeners from DOM nodes
     */
    SimpleBarCore.prototype.unMount = function () {
        this.removeListeners();
    };
    /**
     * Check if mouse is within bounds
     */
    SimpleBarCore.prototype.isWithinBounds = function (bbox) {
        return (this.mouseX >= bbox.left &&
            this.mouseX <= bbox.left + bbox.width &&
            this.mouseY >= bbox.top &&
            this.mouseY <= bbox.top + bbox.height);
    };
    /**
     * Find element children matches query
     */
    SimpleBarCore.prototype.findChild = function (el, query) {
        var matches = el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;
        return Array.prototype.filter.call(el.children, function (child) {
            return matches.call(child, query);
        })[0];
    };
    SimpleBarCore.rtlHelpers = null;
    SimpleBarCore.defaultOptions = {
        forceVisible: false,
        clickOnTrack: true,
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        ariaLabel: 'scrollable content',
        classNames: {
            contentEl: 'simplebar-content',
            contentWrapper: 'simplebar-content-wrapper',
            offset: 'simplebar-offset',
            mask: 'simplebar-mask',
            wrapper: 'simplebar-wrapper',
            placeholder: 'simplebar-placeholder',
            scrollbar: 'simplebar-scrollbar',
            track: 'simplebar-track',
            heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
            heightAutoObserverEl: 'simplebar-height-auto-observer',
            visible: 'simplebar-visible',
            horizontal: 'simplebar-horizontal',
            vertical: 'simplebar-vertical',
            hover: 'simplebar-hover',
            dragging: 'simplebar-dragging',
            scrolling: 'simplebar-scrolling',
            scrollable: 'simplebar-scrollable',
            mouseEntered: 'simplebar-mouse-entered'
        },
        scrollableNode: null,
        contentNode: null,
        autoHide: true
    };
    /**
     * Static functions
     */
    SimpleBarCore.getOptions = getOptions;
    SimpleBarCore.helpers = helpers;
    return SimpleBarCore;
}());


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/simplebar/dist/index.mjs":
/*!***********************************************!*\
  !*** ./node_modules/simplebar/dist/index.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleBar)
/* harmony export */ });
/* harmony import */ var can_use_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! can-use-dom */ "./node_modules/can-use-dom/index.js");
/* harmony import */ var simplebar_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar-core */ "./node_modules/simplebar-core/dist/index.mjs");
/**
 * simplebar - v6.2.5
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */




/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _a = simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"].helpers, getOptions = _a.getOptions, addClasses = _a.addClasses;
var SimpleBar = /** @class */ (function (_super) {
    __extends(SimpleBar, _super);
    function SimpleBar() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        // // Save a reference to the instance, so we know this DOM node has already been instancied
        SimpleBar.instances.set(args[0], _this);
        return _this;
    }
    SimpleBar.initDOMLoadedElements = function () {
        document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
        window.removeEventListener('load', this.initDOMLoadedElements);
        Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
            if (el.getAttribute('data-simplebar') !== 'init' &&
                !SimpleBar.instances.has(el))
                new SimpleBar(el, getOptions(el.attributes));
        });
    };
    SimpleBar.removeObserver = function () {
        var _a;
        (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    };
    SimpleBar.prototype.initDOM = function () {
        var _this = this;
        var _a, _b, _c;
        // make sure this element doesn't have the elements yet
        if (!Array.prototype.filter.call(this.el.children, function (child) {
            return child.classList.contains(_this.classNames.wrapper);
        }).length) {
            // Prepare DOM
            this.wrapperEl = document.createElement('div');
            this.contentWrapperEl = document.createElement('div');
            this.offsetEl = document.createElement('div');
            this.maskEl = document.createElement('div');
            this.contentEl = document.createElement('div');
            this.placeholderEl = document.createElement('div');
            this.heightAutoObserverWrapperEl = document.createElement('div');
            this.heightAutoObserverEl = document.createElement('div');
            addClasses(this.wrapperEl, this.classNames.wrapper);
            addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
            addClasses(this.offsetEl, this.classNames.offset);
            addClasses(this.maskEl, this.classNames.mask);
            addClasses(this.contentEl, this.classNames.contentEl);
            addClasses(this.placeholderEl, this.classNames.placeholder);
            addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl);
            addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
            while (this.el.firstChild) {
                this.contentEl.appendChild(this.el.firstChild);
            }
            this.contentWrapperEl.appendChild(this.contentEl);
            this.offsetEl.appendChild(this.contentWrapperEl);
            this.maskEl.appendChild(this.offsetEl);
            this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
            this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
            this.wrapperEl.appendChild(this.maskEl);
            this.wrapperEl.appendChild(this.placeholderEl);
            this.el.appendChild(this.wrapperEl);
            (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute('tabindex', '0');
            (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute('role', 'region');
            (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-label', this.options.ariaLabel);
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
            var track = document.createElement('div');
            var scrollbar = document.createElement('div');
            addClasses(track, this.classNames.track);
            addClasses(scrollbar, this.classNames.scrollbar);
            track.appendChild(scrollbar);
            this.axis.x.track.el = track.cloneNode(true);
            addClasses(this.axis.x.track.el, this.classNames.horizontal);
            this.axis.y.track.el = track.cloneNode(true);
            addClasses(this.axis.y.track.el, this.classNames.vertical);
            this.el.appendChild(this.axis.x.track.el);
            this.el.appendChild(this.axis.y.track.el);
        }
        simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.initDOM.call(this);
        this.el.setAttribute('data-simplebar', 'init');
    };
    SimpleBar.prototype.unMount = function () {
        simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.unMount.call(this);
        SimpleBar.instances["delete"](this.el);
    };
    SimpleBar.initHtmlApi = function () {
        this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
        // MutationObserver is IE11+
        if (typeof MutationObserver !== 'undefined') {
            // Mutation observer to observe dynamically added elements
            this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
            this.globalObserver.observe(document, { childList: true, subtree: true });
        }
        // Taken from jQuery `ready` function
        // Instantiate elements already present on the page
        if (document.readyState === 'complete' || // @ts-ignore: IE specific
            (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
            // Handle it asynchronously to allow scripts the opportunity to delay init
            window.setTimeout(this.initDOMLoadedElements);
        }
        else {
            document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
            window.addEventListener('load', this.initDOMLoadedElements);
        }
    };
    SimpleBar.handleMutations = function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                if (addedNode.nodeType === 1) {
                    if (addedNode.hasAttribute('data-simplebar')) {
                        !SimpleBar.instances.has(addedNode) &&
                            document.documentElement.contains(addedNode) &&
                            new SimpleBar(addedNode, getOptions(addedNode.attributes));
                    }
                    else {
                        addedNode
                            .querySelectorAll('[data-simplebar]')
                            .forEach(function (el) {
                            if (el.getAttribute('data-simplebar') !== 'init' &&
                                !SimpleBar.instances.has(el) &&
                                document.documentElement.contains(el))
                                new SimpleBar(el, getOptions(el.attributes));
                        });
                    }
                }
            });
            mutation.removedNodes.forEach(function (removedNode) {
                if (removedNode.nodeType === 1) {
                    if (removedNode.getAttribute('data-simplebar') === 'init') {
                        SimpleBar.instances.has(removedNode) &&
                            !document.documentElement.contains(removedNode) &&
                            SimpleBar.instances.get(removedNode).unMount();
                    }
                    else {
                        Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
                            SimpleBar.instances.has(el) &&
                                !document.documentElement.contains(el) &&
                                SimpleBar.instances.get(el).unMount();
                        });
                    }
                }
            });
        });
    };
    SimpleBar.instances = new WeakMap();
    return SimpleBar;
}(simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"]));
/**
 * HTML API
 * Called only in a browser env.
 */
if (can_use_dom__WEBPACK_IMPORTED_MODULE_0__) {
    SimpleBar.initHtmlApi();
}


//# sourceMappingURL=index.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/forms */ "./src/js/utils/forms.js");
/* harmony import */ var _utils_tabs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/tabs.js */ "./src/js/utils/tabs.js");
/* harmony import */ var _utils_accordion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/accordion.js */ "./src/js/utils/accordion.js");
/* harmony import */ var _utils_select_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/select.js */ "./src/js/utils/select.js");
/* harmony import */ var _utils_modals_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/modals.js */ "./src/js/utils/modals.js");
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dev/vzmsk1.js */ "./src/js/dev/vzmsk1.js");
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dev/markusDM.js */ "./src/js/dev/markusDM.js");
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_dev_markusDM_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _dev_ukik0_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dev/ukik0.js */ "./src/js/dev/ukik0.js");
/* harmony import */ var _dev_ukik0_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_dev_ukik0_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _dev_kie6er_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dev/kie6er.js */ "./src/js/dev/kie6er.js");
/* harmony import */ var _dev_kie6er_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_dev_kie6er_js__WEBPACK_IMPORTED_MODULE_10__);


// ---------------------------------- utils ---------------------------------



// hamburger menu
_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.menuInit();

// ------------------------------- components -------------------------------

// forms


// tabs


// accordion


// select


// modals


// --------------------------------------------------------------------------





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxtQkFBbUI7QUFDbkIsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEdBQTRHLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUscUJBQXFCLFVBQVUscUJBQXFCLHNCQUFzQixVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8saW9CQUFpb0IsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLFFBQVEsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFlBQVksT0FBTyxPQUFPLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxPQUFPLFdBQVcsT0FBTyxTQUFTLFVBQVUsVUFBVSxVQUFVLE1BQU0sU0FBUyxVQUFVLE1BQU0sU0FBUyxVQUFVLE9BQU8sV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxPQUFPLE9BQU8sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sT0FBTyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksWUFBWSxNQUFNLE1BQU0sV0FBVyxZQUFZLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxZQUFZLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksWUFBWSxNQUFNLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sU0FBUyxXQUFXLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFlBQVksWUFBWSxZQUFZLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsUUFBUSxNQUFNLFdBQVcsVUFBVSxPQUFPLE9BQU8sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsT0FBTyxPQUFPLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFlBQVksUUFBUSxPQUFPLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFlBQVksT0FBTyxPQUFPLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxPQUFPLFVBQVUsVUFBVSxPQUFPLE9BQU8sVUFBVSxVQUFVLFVBQVUsVUFBVSxPQUFPLE9BQU8sV0FBVyxXQUFXLFFBQVEsT0FBTyxXQUFXLFVBQVUsT0FBTyxPQUFPLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFVBQVUsVUFBVSxPQUFPLE9BQU8sVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxZQUFZLFlBQVksV0FBVyxRQUFRLE9BQU8sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLE9BQU8sT0FBTyxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsWUFBWSxZQUFZLE9BQU8sT0FBTyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFlBQVksV0FBVyxRQUFRLE9BQU8sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsV0FBVyxPQUFPLE9B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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0UsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0UsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIscURBQVE7QUFDbkMsOEJBQThCLHFEQUFRLDZCQUE2QixlQUFlO0FBQ2xGLCtCQUErQixxREFBUTtBQUN2Qyw4QkFBOEIscURBQVE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3Q0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBNEI7O0FBRTVCOztBQUUwQzs7QUFFMUM7QUFDQUMscURBQWMsQ0FBQyxDQUFDOztBQUVoQjs7QUFFQTtBQUN1Qjs7QUFFdkI7QUFDeUI7O0FBRXpCO0FBQzhCOztBQUU5QjtBQUMyQjs7QUFFM0I7QUFDMkI7O0FBRTNCOztBQUV5QjtBQUNFO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvZGV2L3Z6bXNrMS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvbW9kdWxlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvbW9kYWxzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jYW4tdXNlLWRvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyL2Rpc3Qvc2ltcGxlYmFyLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3M/MWUwNSIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzPzZjMmQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVHJpbS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RyaW1tZWRFbmRJbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2RlYm91bmNlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25vdy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3Rocm90dGxlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci1jb3JlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3JlbW92ZUNsYXNzZXN9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cbiAgICBjb25zdCBzZXRDYXRhbG9nTWVudUNsYXNzZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1uYXYtc3VibGluay1pbmRleF0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmxpbmtOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmF2LXN1YmxpbmstaW5kZXhdJylcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJsaW5rTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN1Ym5hdi1pbmRleF0nKVtpXVxuXG4gICAgICAgICAgICAgICAgaWYgKHN1YmxpbmtOb2RlW2ldLmNsYXNzTGlzdC5jb250YWlucygnX2lzLWFjdGl2ZScpICYmIHN1Ym5hdikge1xuICAgICAgICAgICAgICAgICAgICBzdWJuYXYuY2xhc3NMaXN0LmFkZCgnX2lzLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldENhdGFsb2dNZW51Q2xhc3NlcygpXG5cbiAgICBjb25zdCBzZXRDdXJyZW50WWVhciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeWVhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50WWVhcicpXG5cbiAgICAgICAgaWYgKHllYXIpIHtcbiAgICAgICAgICAgIHllYXIuaW5uZXJIVE1MID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEN1cnJlbnRZZWFyKClcblxuICAgIC8vIGhhbmRsZXIgZnVuY3Rpb25zXG4gICAgY29uc3QgbW91c2VvdmVySGFuZGxlciA9IGUgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxuXG4gICAgICAgIC8vIGhlYWRlciBjYXRhbG9nIG1lbnVcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCcuaGVhZGVyX19jYXRhbG9nLWJ0bicpKSB7XG4gICAgICAgICAgICBkb2MuY2xhc3NMaXN0LmFkZCgnX3Nob3ctY2F0YWxvZycpXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jLmNsYXNzTGlzdC5jb250YWlucygnX3Nob3ctY2F0YWxvZycpICYmICF0YXJnZXQuY2xvc2VzdCgnLmhlYWRlcl9fY2F0YWxvZy1tZW51JykgJiYgIXRhcmdldC5jbG9zZXN0KCcuaGVhZGVyX19jYXRhbG9nLWJ0bicpKSB7XG4gICAgICAgICAgICBkb2MuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3ctY2F0YWxvZycpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdbZGF0YS1uYXYtc3VibGluay1pbmRleF0nKSkge1xuICAgICAgICAgICAgY29uc3QgZWwgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtbmF2LXN1YmxpbmstaW5kZXhdJylcbiAgICAgICAgICAgIGNvbnN0IHN1Ym5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXN1Ym5hdi1pbmRleD1cIiR7ZWwuZGF0YXNldC5uYXZTdWJsaW5rSW5kZXh9XCJdYClcblxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1uYXYtc3VibGluay1pbmRleF0nKSwgJ19pcy1hY3RpdmUnKVxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdWJuYXYtaW5kZXhdJyksICdfaXMtYWN0aXZlJylcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ19pcy1hY3RpdmUnKVxuICAgICAgICAgICAgaWYgKHN1Ym5hdikgc3VibmF2LmNsYXNzTGlzdC5hZGQoJ19pcy1hY3RpdmUnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZG9jdW1lbnQgZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgbW91c2VvdmVySGFuZGxlcilcbn0pIiwiZXhwb3J0IGNvbnN0IG1vZHVsZXMgPSB7fTtcbiIsImltcG9ydCB7XG4gIGRhdGFNZWRpYVF1ZXJpZXMsXG4gIF9zbGlkZVRvZ2dsZSxcbiAgX3NsaWRlVXAsXG4gIF9zbGlkZURvd24sXG59IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBBY2NvcmRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFjY29yZGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjb3JkaW9uXScpO1xuICAgIHRoaXMubWRRdWVyaWVzQXJyYXkgPSBkYXRhTWVkaWFRdWVyaWVzKHRoaXMuYWNjb3JkaW9uSXRlbXMsICdhY2NvcmRpb24nKTtcbiAgICB0aGlzLnJlZ0l0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLmFjY29yZGlvbkl0ZW1zKS5maWx0ZXIoZnVuY3Rpb24gKFxuICAgICAgaXRlbSxcbiAgICAgIGluZGV4LFxuICAgICAgc2VsZlxuICAgICkge1xuICAgICAgcmV0dXJuICFpdGVtLmRhdGFzZXQuYWNjb3JkaW9uLnNwbGl0KCcsJylbMF07XG4gICAgfSk7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIEFDQ09SRElPTjogJ2RhdGEtYWNjb3JkaW9uJyxcbiAgICAgIElURU06ICdkYXRhLWFjY29yZGlvbi1pdGVtJyxcbiAgICAgIFNJTkdMRTogJ2RhdGEtYWNjb3JkaW9uLXNpbmdsZScsXG4gICAgfTtcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICBJTklUOiAnX2FjY29yZGlvbi1pbml0JyxcbiAgICAgIEFDVElWRTogJ19pcy1hY3RpdmUnLFxuICAgIH07XG5cbiAgICAvLyBpbml0IHJlZ3VsYXIgYWNjb3JkaW9uIGl0ZW1zXG4gICAgaWYgKHRoaXMucmVnSXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmluaXQodGhpcy5yZWdJdGVtcyk7XG4gICAgfVxuICAgIC8vIGluaXQgYWNjb3JkaW9uIGl0ZW1zIHdpdGggbWVkaWEgcXVlcmllc1xuICAgIGlmICh0aGlzLm1kUXVlcmllc0FycmF5ICYmIHRoaXMubWRRdWVyaWVzQXJyYXkubGVuZ3RoKSB7XG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMubWRRdWVyaWVzQXJyYXkuZm9yRWFjaChtZFF1ZXJpZXNJdGVtID0+IHtcbiAgICAgICAgbWRRdWVyaWVzSXRlbS5tYXRjaE1lZGlhLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy5pbml0KG1kUXVlcmllc0l0ZW0uaXRlbXNBcnJheSwgbWRRdWVyaWVzSXRlbS5tYXRjaE1lZGlhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW5pdChtZFF1ZXJpZXNJdGVtLml0ZW1zQXJyYXksIG1kUXVlcmllc0l0ZW0ubWF0Y2hNZWRpYSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoaWRlQm9keShhY2NvcmRpb25Hcm91cCkge1xuICAgIGNvbnN0IGFjdGl2ZVRpdGxlID0gYWNjb3JkaW9uR3JvdXAucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbJHt0aGlzLmF0dHJzLklURU19XS4ke3RoaXMuY2xhc3Nlcy5BQ1RJVkV9YFxuICAgICk7XG4gICAgY29uc3Qgc3BlZWQgPSBhY2NvcmRpb25Hcm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkXG4gICAgICA/IHBhcnNlSW50KGFjY29yZGlvbkdyb3VwLmRhdGFzZXQuYWNjb3JkaW9uU3BlZWQpXG4gICAgICA6IDUwMDtcblxuICAgIGlmIChhY3RpdmVUaXRsZSAmJiAhYWNjb3JkaW9uR3JvdXAucXVlcnlTZWxlY3RvckFsbCgnLl9zbGlkZScpLmxlbmd0aCkge1xuICAgICAgYWN0aXZlVGl0bGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgIF9zbGlkZVVwKGFjdGl2ZVRpdGxlLm5leHRFbGVtZW50U2libGluZywgc3BlZWQpO1xuICAgIH1cbiAgfVxuXG4gIHNldEFjdGlvbnMoZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLklURU19XWApKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLklURU19XWApO1xuICAgICAgY29uc3QgZ3JvdXAgPSB0aXRsZS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLkFDQ09SRElPTn1dYCk7XG4gICAgICBjb25zdCBpc1NpbmdsZSA9IGdyb3VwLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLlNJTkdMRSk7XG4gICAgICBjb25zdCBzcGVlZCA9IGdyb3VwLmRhdGFzZXQuYWNjb3JkaW9uU3BlZWRcbiAgICAgICAgPyBwYXJzZUludChncm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkKVxuICAgICAgICA6IDUwMDtcblxuICAgICAgaWYgKCFncm91cC5xdWVyeVNlbGVjdG9yQWxsKCcuX3NsaWRlJykubGVuZ3RoKSB7XG4gICAgICAgIGlmIChpc1NpbmdsZSAmJiAhdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgdGhpcy5oaWRlQm9keShncm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHRpdGxlLm5leHRFbGVtZW50U2libGluZywgc3BlZWQpO1xuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRCb2R5KGFjY29yZGlvbkdyb3VwLCBoaWRlQm9keSA9IHRydWUpIHtcbiAgICBsZXQgdGl0bGVzID0gYWNjb3JkaW9uR3JvdXAucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5JVEVNfV1gKTtcblxuICAgIGlmICh0aXRsZXMubGVuZ3RoKSB7XG4gICAgICB0aXRsZXMgPSBBcnJheS5mcm9tKHRpdGxlcykuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5BQ0NPUkRJT059XWApID09PSBhY2NvcmRpb25Hcm91cFxuICAgICAgKTtcbiAgICAgIHRpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgICAgaWYgKGhpZGVCb2R5KSB7XG4gICAgICAgICAgdGl0bGUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgIGlmICghdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgICB0aXRsZS5uZXh0RWxlbWVudFNpYmxpbmcuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgIHRpdGxlLm5leHRFbGVtZW50U2libGluZy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdChhY2NvcmRpb25JdGVtcywgbWF0Y2hNZWRpYSA9IGZhbHNlKSB7XG4gICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaChhY2NvcmRpb25Hcm91cCA9PiB7XG4gICAgICBhY2NvcmRpb25Hcm91cCA9IG1hdGNoTWVkaWEgPyBhY2NvcmRpb25Hcm91cC5pdGVtIDogYWNjb3JkaW9uR3JvdXA7XG4gICAgICBpZiAobWF0Y2hNZWRpYS5tYXRjaGVzIHx8ICFtYXRjaE1lZGlhKSB7XG4gICAgICAgIGFjY29yZGlvbkdyb3VwLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklOSVQpO1xuICAgICAgICB0aGlzLmluaXRCb2R5KGFjY29yZGlvbkdyb3VwKTtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JTklUKTtcbiAgICAgICAgdGhpcy5pbml0Qm9keShhY2NvcmRpb25Hcm91cCwgZmFsc2UpO1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0QWN0aW9ucy5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgQWNjb3JkaW9uKCk7XG4iLCJpbXBvcnQgeyBtb2R1bGVzIH0gZnJvbSAnLi4vbW9kdWxlcy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIFZhbGlkYXRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmF0dHJzID0ge1xuICAgICAgUkVRVUlSRUQ6ICdkYXRhLXJlcXVpcmVkJyxcbiAgICAgIElHTk9SRV9WQUxJREFUSU9OOiAnZGF0YS1pZ25vcmUtdmFsaWRhdGlvbicsXG4gICAgICBBSkFYOiAnZGF0YS1hamF4JyxcbiAgICAgIERFVjogJ2RhdGEtZGV2JyxcbiAgICAgIElHTk9SRV9GT0NVUzogJ2RhdGEtaWdub3JlLWZvY3VzJyxcbiAgICAgIFNIT1dfUExBQ0VIT0xERVI6ICdkYXRhLXNob3ctcGxhY2Vob2xkZXInLFxuICAgICAgVkFMSURBVEU6ICdkYXRhLXZhbGlkYXRlJyxcbiAgICB9O1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgSEFTX0ZPQ1VTOiAnX2hhcy1mb2N1cycsXG4gICAgICBJU19GSUxMRUQ6ICdfaXMtZmlsbGVkJyxcbiAgICAgIElTX1JFVkVBTEVEOiAnX2lzLXJldmVhbGVkJ1xuICAgIH07XG4gIH1cblxuICBnZXRFcnJvcnMoZm9ybSkge1xuICAgIGxldCBlcnIgPSAwO1xuICAgIGxldCByZXF1aXJlZEZpZWxkcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChgKlske3RoaXMuYXR0cnMuUkVRVUlSRUR9XWApO1xuXG4gICAgaWYgKHJlcXVpcmVkRmllbGRzLmxlbmd0aCkge1xuICAgICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChyZXF1aXJlZEZpZWxkID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChyZXF1aXJlZEZpZWxkLm9mZnNldFBhcmVudCAhPT0gbnVsbCB8fFxuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJykgJiZcbiAgICAgICAgICAhcmVxdWlyZWRGaWVsZC5kaXNhYmxlZFxuICAgICAgICApIHtcbiAgICAgICAgICBlcnIgKz0gdGhpcy52YWxpZGF0ZUZpZWxkKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuXG4gIGFkZEVycm9yKHJlcXVpcmVkRmllbGQpIHtcbiAgICByZXF1aXJlZEZpZWxkLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gIH1cblxuICByZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKSB7XG4gICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICB9XG5cbiAgdmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKSB7XG4gICAgbGV0IGVyciA9IDA7XG5cbiAgICBpZiAocmVxdWlyZWRGaWVsZC5kYXRhc2V0LnJlcXVpcmVkID09PSAnZW1haWwnKSB7XG4gICAgICByZXF1aXJlZEZpZWxkLnZhbHVlID0gcmVxdWlyZWRGaWVsZC52YWx1ZS5yZXBsYWNlKCcgJywgJycpO1xuXG4gICAgICBpZiAodGhpcy50ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkpIHtcbiAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgZXJyKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVxdWlyZWRGaWVsZC50eXBlID09PSAnY2hlY2tib3gnICYmICFyZXF1aXJlZEZpZWxkLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuYWRkRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICBlcnIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFyZXF1aXJlZEZpZWxkLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICBlcnIrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH1cblxuICBjbGVhckZpZWxkcyhmb3JtKSB7XG4gICAgZm9ybS5yZXNldCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LHRleHRhcmVhJyk7XG4gICAgICBjb25zdCBjaGVja2JveGVzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcblxuICAgICAgaWYgKGlucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBpbnB1dCA9IGlucHV0c1tpbmRleF07XG5cbiAgICAgICAgICBpbnB1dC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoZWNrYm94ZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGVja2JveGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY2hlY2tib3hlc1tpbmRleF07XG4gICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICB0ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkge1xuICAgIHJldHVybiAhL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDh9KSskLy50ZXN0KFxuICAgICAgcmVxdWlyZWRGaWVsZC52YWx1ZVxuICAgICk7XG4gIH1cbn1cbmNsYXNzIEZvcm1TdWJtaXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3Ioc2hvdWxkVmFsaWRhdGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2hvdWxkVmFsaWRhdGUgPSBzaG91bGRWYWxpZGF0ZSA/IHNob3VsZFZhbGlkYXRlIDogdHJ1ZTtcbiAgICB0aGlzLmZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2VuZEZvcm0oZm9ybSwgcmVzcG9uc2VSZXN1bHQgPSBgYCkge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NlbmRGb3JtJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBmb3JtOiBmb3JtLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gc2hvdyBtb2RhbCwgaWYgcG9wdXAgbW9kdWxlIGlzIGNvbm5lY3RlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKG1vZHVsZXMucG9wdXApIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBmb3JtLmRhdGFzZXQubW9kYWxNZXNzYWdlO1xuICAgICAgICBtb2RhbCA/IG1vZHVsZXMubW9kYWwub3Blbihtb2RhbCkgOiBudWxsO1xuICAgICAgfVxuICAgIH0sIDApO1xuXG4gICAgdGhpcy5jbGVhckZpZWxkcyhmb3JtKTtcblxuICAgIGNvbnNvbGUubG9nKCdpcyBzZW50Jyk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVTdWJtaXRpb24oZm9ybSwgZSkge1xuICAgIGNvbnN0IGVyciA9ICFmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLklHTk9SRV9WQUxJREFUSU9OKVxuICAgICAgPyB0aGlzLmdldEVycm9ycyhmb3JtKVxuICAgICAgOiAwO1xuXG4gICAgaWYgKGVyciA9PT0gMCkge1xuICAgICAgY29uc3QgYWpheCA9IGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuQUpBWCk7XG5cbiAgICAgIGlmIChhamF4KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBhY3Rpb24gPSBmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJylcbiAgICAgICAgICA/IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKS50cmltKClcbiAgICAgICAgICA6ICcjJztcbiAgICAgICAgY29uc3QgbWV0aG9kID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpXG4gICAgICAgICAgPyBmb3JtLmdldEF0dHJpYnV0ZSgnbWV0aG9kJykudHJpbSgpXG4gICAgICAgICAgOiAnR0VUJztcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ19pcy1zZW5kaW5nJyk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhY3Rpb24sIHtcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICAgIHRoaXMuc2VuZEZvcm0oZm9ybSwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgnZXJyb3InKTtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ19pcy1zZW5kaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZm9ybS5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5ERVYpKSB7XG4gICAgICAgIC8vIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3QgcGFzc3dvcmRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXF1aXJlZD1cInBhc3NcIl0nKVxuXG4gICAgaWYgKHRoaXMuZm9ybXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBfdGhpcy5oYW5kbGVTdWJtaXRpb24oZS50YXJnZXQsIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgX3RoaXMuY2xlYXJGaWVsZHMoZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwYXNzd29yZEZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHBhc3N3b3JkRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBjb25zdCBidG4gPSBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgICAgICBpZiAoYnRuKSB7XG4gICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICBmaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhfdGhpcy5jbGFzc2VzLklTX1JFVkVBTEVEKVxuICAgICAgICAgICAgICAgID8gJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKVxuICAgICAgICAgICAgZmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKF90aGlzLmNsYXNzZXMuSVNfUkVWRUFMRUQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbmNsYXNzIEZvcm1GaWVsZHMgZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LHRleHRhcmVhJyk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBzYXZlUGxhY2Vob2xkZXIoKSB7XG4gICAgaWYgKHRoaXMuZmllbGRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIGlmICghZmllbGQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuU0hPV19QTEFDRUhPTERFUikpIHtcbiAgICAgICAgICBmaWVsZC5kYXRhc2V0LnBsYWNlaG9sZGVyID0gZmllbGQucGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzaW4oZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnIHx8IHRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICBpZiAodGFyZ2V0LmRhdGFzZXQucGxhY2Vob2xkZXIpIHRhcmdldC5wbGFjZWhvbGRlciA9ICcnO1xuXG4gICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnZmlsZScgJiYgdGFyZ2V0LnR5cGUgIT09ICdjaGVja2JveCcgJiYgdGFyZ2V0LnR5cGUgIT09ICdyYWRpbycpIHtcbiAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlbW92ZUVycm9yKHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNvdXQoZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5WQUxJREFURSkpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKHRhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2ZpbGUnICYmIHRhcmdldC50eXBlICE9PSAnY2hlY2tib3gnICYmIHRhcmdldC50eXBlICE9PSAncmFkaW8nKSB7XG4gICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKSAmJiB0YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIHNhdmUgcGxhY2Vob2xkZXIgaW4gZGF0YSBhdHRyaWJ1dGVcbiAgICB0aGlzLnNhdmVQbGFjZWhvbGRlcigpO1xuXG4gICAgLy8gaGFuZGxlIHN1Ym1pdGlvblxuICAgIG5ldyBGb3JtU3VibWl0aW9uKCk7XG5cbiAgICAvLyBldmVudHNcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmhhbmRsZUZvY3VzaW4uYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuaGFuZGxlRm9jdXNvdXQuYmluZCh0aGlzKSk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IEZvcm1GaWVsZHMoKTtcbiIsImltcG9ydCB7IG1vZHVsZXMgfSBmcm9tICcuLi9tb2R1bGVzLmpzJztcbmltcG9ydCB7IGJvZHlMb2NrU3RhdHVzLCBib2R5TG9jaywgYm9keVVubG9jayB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgIGxvZ2dpbmc6IHRydWUsXG4gICAgICBpbml0OiB0cnVlLFxuICAgICAgYXR0cmlidXRlT3BlbkJ1dHRvbjogJ2RhdGEtbW9kYWwnLFxuICAgICAgYXR0cmlidXRlQ2xvc2VCdXR0b246ICdkYXRhLWNsb3NlJyxcbiAgICAgIGZpeEVsZW1lbnRTZWxlY3RvcjogJ1tkYXRhLWxwXScsXG4gICAgICB5b3V0dWJlQXR0cmlidXRlOiAnZGF0YS1tb2RhbC15b3V0dWJlJyxcbiAgICAgIHlvdXR1YmVQbGFjZUF0dHJpYnV0ZTogJ2RhdGEtbW9kYWwteW91dHViZS1wbGFjZScsXG4gICAgICBzZXRBdXRvcGxheVlvdXR1YmU6IHRydWUsXG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgIG1vZGFsOiAnbW9kYWwnLFxuICAgICAgICAvLyBtb2RhbFdyYXBwZXI6ICdtb2RhbF9fd3JhcHBlcicsXG4gICAgICAgIG1vZGFsQ29udGVudDogJ21vZGFsX19jb250ZW50JyxcbiAgICAgICAgbW9kYWxBY3RpdmU6ICdtb2RhbF9zaG93JyxcbiAgICAgICAgYm9keUFjdGl2ZTogJ21vZGFsLXNob3cnLFxuICAgICAgfSxcbiAgICAgIGZvY3VzQ2F0Y2g6IHRydWUsXG4gICAgICBjbG9zZUVzYzogdHJ1ZSxcbiAgICAgIGJvZHlMb2NrOiB0cnVlLFxuICAgICAgaGFzaFNldHRpbmdzOiB7XG4gICAgICAgIGxvY2F0aW9uOiB0cnVlLFxuICAgICAgICBnb0hhc2g6IHRydWUsXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGFmdGVyT3BlbjogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24gKCkge30sXG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy55b3VUdWJlQ29kZTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMudGFyZ2V0T3BlbiA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5wcmV2aW91c09wZW4gPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMubGFzdENsb3NlZCA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5fZGF0YVZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5oYXNoID0gZmFsc2U7XG5cbiAgICB0aGlzLl9yZW9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSBmYWxzZTtcblxuICAgIHRoaXMubGFzdEZvY3VzRWwgPSBmYWxzZTtcbiAgICB0aGlzLl9mb2N1c0VsID0gW1xuICAgICAgJ2FbaHJlZl0nLFxuICAgICAgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdhcmVhW2hyZWZdJyxcbiAgICAgICdpZnJhbWUnLFxuICAgICAgJ29iamVjdCcsXG4gICAgICAnZW1iZWQnLFxuICAgICAgJ1tjb250ZW50ZWRpdGFibGVdJyxcbiAgICAgICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknLFxuICAgIF07XG4gICAgLy90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGNvbmZpZywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgLi4uY29uZmlnLmNsYXNzZXMsXG4gICAgICAgIC4uLm9wdGlvbnM/LmNsYXNzZXMsXG4gICAgICB9LFxuICAgICAgaGFzaFNldHRpbmdzOiB7XG4gICAgICAgIC4uLmNvbmZpZy5oYXNoU2V0dGluZ3MsXG4gICAgICAgIC4uLm9wdGlvbnM/Lmhhc2hTZXR0aW5ncyxcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICAuLi5jb25maWcub24sXG4gICAgICAgIC4uLm9wdGlvbnM/Lm9uLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMuYm9keUxvY2sgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMuaW5pdCA/IHRoaXMuaW5pdG1vZGFscygpIDogbnVsbDtcbiAgfVxuICBpbml0bW9kYWxzKCkge1xuICAgIHRoaXMuZXZlbnRzbW9kYWwoKTtcbiAgfVxuICBldmVudHNtb2RhbCgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk9wZW4gPSBlLnRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn1dYFxuICAgICAgICApO1xuICAgICAgICBpZiAoYnV0dG9uT3Blbikge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRhVmFsdWUgPSBidXR0b25PcGVuLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9uXG4gICAgICAgICAgKVxuICAgICAgICAgICAgPyBidXR0b25PcGVuLmdldEF0dHJpYnV0ZSh0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbilcbiAgICAgICAgICAgIDogJ2Vycm9yJztcbiAgICAgICAgICB0aGlzLnlvdVR1YmVDb2RlID0gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMueW91dHViZUF0dHJpYnV0ZVxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUodGhpcy5vcHRpb25zLnlvdXR1YmVBdHRyaWJ1dGUpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgaWYgKHRoaXMuX2RhdGFWYWx1ZSAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbikgdGhpcy5sYXN0Rm9jdXNFbCA9IGJ1dHRvbk9wZW47XG4gICAgICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSBgJHt0aGlzLl9kYXRhVmFsdWV9YDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2UgPSBlLnRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlQ2xvc2VCdXR0b259XWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFlLnRhcmdldC5jbG9zZXN0KCcjdW5jb25maXJtZWRBZ2VNb2RhbCcpICYmXG4gICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoJyNjb25maXJtQWdlTW9kYWwnKSAmJlxuICAgICAgICAgIChidXR0b25DbG9zZSB8fFxuICAgICAgICAgICAgKCFlLnRhcmdldC5jbG9zZXN0KGAuJHt0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbENvbnRlbnR9YCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW4pKVxuICAgICAgICApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2tleWRvd24nLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jbG9zZUVzYyAmJlxuICAgICAgICAgIGUud2hpY2ggPT0gMjcgJiZcbiAgICAgICAgICBlLmNvZGUgPT09ICdFc2NhcGUnICYmXG4gICAgICAgICAgdGhpcy5pc09wZW5cbiAgICAgICAgKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb2N1c0NhdGNoICYmIGUud2hpY2ggPT0gOSAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzQ2F0Y2goZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MuZ29IYXNoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2hhc2hjaGFuZ2UnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuVG9IYXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdsb2FkJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlblRvSGFzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBvcGVuKHNlbGVjdG9yVmFsdWUpIHtcbiAgICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcbiAgICAgIHRoaXMuYm9keUxvY2sgPVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykgJiYgIXRoaXMuaXNPcGVuXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RvclZhbHVlICYmXG4gICAgICAgIHR5cGVvZiBzZWxlY3RvclZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBzZWxlY3RvclZhbHVlLnRyaW0oKSAhPT0gJydcbiAgICAgICkge1xuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSBzZWxlY3RvclZhbHVlO1xuICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuX3Jlb3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fc2VsZWN0b3JPcGVuKVxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSB0aGlzLmxhc3RDbG9zZWQuc2VsZWN0b3I7XG4gICAgICBpZiAoIXRoaXMuX3Jlb3BlbikgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvclxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnlvdVR1YmVDb2RlKSB7XG4gICAgICAgICAgY29uc3QgY29kZVZpZGVvID0gdGhpcy55b3VUdWJlQ29kZTtcbiAgICAgICAgICBjb25zdCB1cmxWaWRlbyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2NvZGVWaWRlb30/cmVsPTAmc2hvd2luZm89MCZhdXRvcGxheT0xYDtcbiAgICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG5cbiAgICAgICAgICBjb25zdCBhdXRvcGxheSA9IHRoaXMub3B0aW9ucy5zZXRBdXRvcGxheVlvdXR1YmUgPyAnYXV0b3BsYXk7JyA6ICcnO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93JywgYCR7YXV0b3BsYXl9OyBlbmNyeXB0ZWQtbWVkaWFgKTtcblxuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybFZpZGVvKTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgeW91dHViZVBsYWNlID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fdGV4dCcpXG4gICAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGUoYCR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1gLCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYClcbiAgICAgICAgICAgIC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0SGFzaCgpO1xuICAgICAgICAgIHRoaXMuX3NldEhhc2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbi5iZWZvcmVPcGVuKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnYmVmb3JlbW9kYWxPcGVuJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxBY3RpdmUpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3Nlcy5ib2R5QWN0aXZlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Jlb3Blbikge1xuICAgICAgICAgIGNvbnN0IG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuaGFzaCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAoIXRoaXMuYm9keUxvY2sgJiYgIW0uaGFzQXR0cmlidXRlKCdkYXRhLWJsLW1vYmlsZScpKSB8fFxuICAgICAgICAgICAgKCF0aGlzLmJvZHlMb2NrICYmXG4gICAgICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCAmJlxuICAgICAgICAgICAgICBtLmhhc0F0dHJpYnV0ZSgnZGF0YS1ibC1tb2JpbGUnKSlcbiAgICAgICAgICAgICAgPyBib2R5TG9jaygpXG4gICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSBlbHNlIHRoaXMuX3Jlb3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvciA9IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvcjtcbiAgICAgICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudCA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9mb2N1c1RyYXAoKTtcbiAgICAgICAgfSwgNTApO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbi5hZnRlck9wZW4odGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdhZnRlcm1vZGFsT3BlbicsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2xvc2Uoc2VsZWN0b3JWYWx1ZSkge1xuICAgIGlmIChcbiAgICAgIHNlbGVjdG9yVmFsdWUgJiZcbiAgICAgIHR5cGVvZiBzZWxlY3RvclZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgc2VsZWN0b3JWYWx1ZS50cmltKCkgIT09ICcnXG4gICAgKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvciA9IHNlbGVjdG9yVmFsdWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc09wZW4gfHwgIWJvZHlMb2NrU3RhdHVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucy5vbi5iZWZvcmVDbG9zZSh0aGlzKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdiZWZvcmVtb2RhbENsb3NlJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnlvdVR1YmVDb2RlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgICkuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIHRoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQWN0aXZlXG4gICAgKTtcbiAgICAvLyBhcmlhLWhpZGRlblxuICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWYgKCF0aGlzLl9yZW9wZW4pIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5ib2R5QWN0aXZlXG4gICAgICApO1xuICAgICAgIXRoaXMuYm9keUxvY2sgPyBib2R5VW5sb2NrKCkgOiBudWxsO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlSGFzaCgpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rvck9wZW4pIHtcbiAgICAgIHRoaXMubGFzdENsb3NlZC5zZWxlY3RvciA9IHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yO1xuICAgICAgdGhpcy5sYXN0Q2xvc2VkLmVsZW1lbnQgPSB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50O1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMub24uYWZ0ZXJDbG9zZSh0aGlzKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdhZnRlcm1vZGFsQ2xvc2UnLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAoKTtcbiAgICB9LCA1MCk7XG4gIH1cbiAgX2dldEhhc2goKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MubG9jYXRpb24pIHtcbiAgICAgIHRoaXMuaGFzaCA9IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvci5pbmNsdWRlcygnIycpXG4gICAgICAgID8gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yXG4gICAgICAgIDogdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yLnJlcGxhY2UoJy4nLCAnIycpO1xuICAgIH1cbiAgfVxuICBfb3BlblRvSGFzaCgpIHtcbiAgICBsZXQgY2xhc3NJbkhhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3dpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyl9YFxuICAgIClcbiAgICAgID8gYC4ke3dpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyl9YFxuICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3dpbmRvdy5sb2NhdGlvbi5oYXNofWApXG4gICAgICA/IGAke3dpbmRvdy5sb2NhdGlvbi5oYXNofWBcbiAgICAgIDogbnVsbDtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaH1cIl1gXG4gICAgKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2h9XCJdYFxuICAgICAgICApXG4gICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaC5yZXBsYWNlKFxuICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgJyMnXG4gICAgICAgICAgKX1cIl1gXG4gICAgICAgICk7XG4gICAgaWYgKGJ1dHRvbnMgJiYgY2xhc3NJbkhhc2gpIHRoaXMub3BlbihjbGFzc0luSGFzaCk7XG4gIH1cbiAgX3NldEhhc2goKSB7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB0aGlzLmhhc2gpO1xuICB9XG4gIF9yZW1vdmVIYXNoKCkge1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXSk7XG4gIH1cbiAgX2ZvY3VzQ2F0Y2goZSkge1xuICAgIGNvbnN0IGZvY3VzYWJsZSA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbCk7XG4gICAgY29uc3QgZm9jdXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZSk7XG4gICAgY29uc3QgZm9jdXNlZEluZGV4ID0gZm9jdXNBcnJheS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICBmb2N1c0FycmF5W2ZvY3VzQXJyYXkubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKCFlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gZm9jdXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICBmb2N1c0FycmF5WzBdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIF9mb2N1c1RyYXAoKSB7XG4gICAgY29uc3QgZm9jdXNhYmxlID0gdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzRWwpO1xuICAgIGlmICghdGhpcy5pc09wZW4gJiYgdGhpcy5sYXN0Rm9jdXNFbCkge1xuICAgICAgdGhpcy5sYXN0Rm9jdXNFbC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb2N1c2FibGVbMF0uZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlcy5tb2RhbCA9IG5ldyBNb2RhbCh7fSk7XG4iLCJpbXBvcnQgU2ltcGxlQmFyIGZyb20gJ3NpbXBsZWJhcic7XG5pbXBvcnQgJ3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3MnO1xuaW1wb3J0IHsgX3NsaWRlVXAsIF9zbGlkZURvd24sIF9zbGlkZVRvZ2dsZSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgLy8gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBjdXN0b20gc2VsZWN0IGNsYXNzZXNcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICAvLyBodG1sIGJ1aWxkIGNsYXNzZXNcbiAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXG4gICAgICBCT0RZOiAnc2VsZWN0X19ib2R5JyxcbiAgICAgIExBQkVMOiAnc2VsZWN0X19sYWJlbCcsXG4gICAgICBUSVRMRTogJ3NlbGVjdF9fdGl0bGUnLFxuICAgICAgVkFMVUU6ICdzZWxlY3RfX3ZhbHVlJyxcbiAgICAgIENPTlRFTlQ6ICdzZWxlY3RfX2NvbnRlbnQnLFxuICAgICAgT1BUSU9OUzogJ3NlbGVjdF9fb3B0aW9ucycsXG4gICAgICBPUFRJT046ICdzZWxlY3RfX29wdGlvbicsXG4gICAgICBTQ1JPTEw6ICdzZWxlY3RfX3Njcm9sbCcsXG4gICAgICBHUk9VUDogJ3NlbGVjdF9fZ3JvdXAnLFxuICAgICAgSU5QVVQ6ICdzZWxlY3RfX2lucHV0JyxcbiAgICAgIEFTU0VUOiAnc2VsZWN0X19hc3NldCcsXG4gICAgICBUWFQ6ICdzZWxlY3RfX3RleHQnLFxuXG4gICAgICAvLyBzdGF0ZSBjbGFzc2VzXG4gICAgICBJU19BQ1RJVkU6ICdfaXMtYWN0aXZlJyxcbiAgICAgIElTX0ZPQ1VTRUQ6ICdfaXMtZm9jdXNlZCcsXG4gICAgICBJU19PUEVORUQ6ICdfaXMtb3BlbmVkJyxcbiAgICAgIElTX0ZJTExFRDogJ19pcy1maWxsZWQnLFxuICAgICAgSVNfU0VMRUNURUQ6ICdfaXMtc2VsZWN0ZWQnLFxuICAgICAgSVNfRElTQUJMRUQ6ICdfaXMtZGlzYWJsZWQnLFxuXG4gICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXNcbiAgICAgIEhBU19MSVNUOiAnX2hhcy1saXN0JyxcbiAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgSEFTX01VTFRJUExFOiAnX2hhcy1tdWx0aXBsZScsXG4gICAgICBIQVNfQ0hFQ0tCT1g6ICdfaGFzLWNoZWNrYm94JyxcbiAgICAgIEhBU19MQUJFTDogJ19oYXMtbGFiZWwnLFxuICAgIH07XG5cbiAgICAvLyBhbGwgc2VsZWN0IGl0ZW1zXG4gICAgY29uc3Qgc2VsZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpO1xuICAgIGlmIChzZWxlY3RMaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0KHNlbGVjdExpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNlbGVjdCBpbml0aWFsaXphdGlvbiAmIGJ1aWxkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXRpYWxpemF0aW9uXG4gIGluaXQoc2VsZWN0TGlzdCkge1xuICAgIC8vIGluaXRcbiAgICBzZWxlY3RMaXN0LmZvckVhY2goKHNlbGVjdCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5pdFNlbEl0ZW0oc2VsZWN0LCBpbmRleCArIDEpO1xuICAgIH0pO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAna2V5ZG93bicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNpbicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNvdXQnLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuICAvLyBzaW5nbGUgc2VsZWN0IGl0ZW0gaW5pdGlhbGl6YXRpb25cbiAgaW5pdFNlbEl0ZW0ocmVsYXRpdmVTZWwsIGluZGV4KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLlNFTEVDVCk7XG4gICAgcmVsYXRpdmVTZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKHJlbGF0aXZlU2VsKTtcbiAgICByZWxhdGl2ZVNlbC5oaWRkZW4gPSB0cnVlO1xuICAgIGluZGV4ID8gKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSWQgPSBpbmRleCkgOiBudWxsO1xuXG4gICAgaWYgKHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpKSB7XG4gICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lm9wdFBsYWNlaG9sZGVyID1cbiAgICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkudmFsdWU7XG4gICAgICBpZiAodGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwuc2hvdykge1xuICAgICAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuICAgICAgICBzZWxUaXRsZS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgJ2FmdGVyYmVnaW4nLFxuICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLkxBQkVMfVwiPiR7XG4gICAgICAgICAgICB0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5sYWJlbC50ZXh0XG4gICAgICAgICAgICAgID8gdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwudGV4dFxuICAgICAgICAgICAgICA6IHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLnZhbHVlXG4gICAgICAgICAgfTwvc3Bhbj5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGVjdC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQk9EWX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAke1xuICAgICAgICAgICAgICAgICAgICAgICFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSA/ICdoaWRkZW4nIDogJydcbiAgICAgICAgICAgICAgICAgICAgfSAgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT05TfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICApO1xuXG4gICAgdGhpcy5idWlsZChyZWxhdGl2ZVNlbCk7XG5cbiAgICByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zcGVlZFxuICAgICAgPyByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkXG4gICAgICA6ICcxNTAnO1xuICAgIHJlbGF0aXZlU2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBfdGhpcy5pbml0U2VsZWN0aW9ucyhlKTtcbiAgICB9KTtcbiAgfVxuICAvLyBzZWxlY3QgYnVpbGRcbiAgYnVpbGQocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3QgPSByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50O1xuXG4gICAgLy8gc2V0IGlkXG4gICAgc2VsZWN0LmRhdGFzZXQuc2VsSWQgPSByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbElkO1xuICAgIC8vIHNldCB2YWx1ZVxuICAgIHRoaXMuc2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IG9wdGlvbnNcbiAgICB0aGlzLnNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IGNzcyBtb2RpZmljYXRvclxuICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsQWRkb25DbGFzc1xuICAgICAgPyBzZWxlY3QuY2xhc3NMaXN0LmFkZChgc2VsZWN0XyR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxBZGRvbkNsYXNzfWApXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IGNsYXNzIGlmIHNlbGVjdCBpcyBtdWx0aXBsZVxuICAgIHJlbGF0aXZlU2VsLm11bHRpcGxlXG4gICAgICA/IHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpXG4gICAgICA6IHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpO1xuICAgIC8vIHNldCBjbGFzcyBpZiBzZWxlY3QgY2hlY2tib3hlcyBhcmUgc2V0XG4gICAgcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1jaGVja2JveGVzJykgJiYgcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgID8gc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWClcbiAgICAgIDogc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWCk7XG4gICAgLy8gZGlzYWJsZSBzZWxlY3RcbiAgICB0aGlzLmRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zIGlmIGRhdGEtc2VsLXNlYXJjaCBpcyBzZXRcbiAgICByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXNlYXJjaCcpXG4gICAgICA/IHRoaXMuc2V0U2VhcmNoQWN0aW9ucyhzZWxlY3QpXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IHNlbGVjdCBhY3Rpb25zIGlmIGl0J3MgaW5pdGlhbGx5IG9wZW5lZFxuICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtb3BlbmVkJykgPyB0aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcblxuICAgIC8vIHNldCBzZWxlY3QgaGludFxuICAgIGlmIChyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnQpIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzZWxlY3RfX2hpbnRcIj4ke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludH08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHNob3cgLyBoaWRlIHNlbGVjdGlvbiBmcm9tIHNlbGVjdCB0aXRsZVxuICAgIGlmIChyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2hvdy12YWwnKSkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHR3aW4gc2VsZWN0IHRpdGxlIHZhbHVlXG4gIHNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxCb2R5ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuQk9EWSkudHdpblNlbDtcbiAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuXG4gICAgaWYgKHNlbFRpdGxlKSBzZWxUaXRsZS5yZW1vdmUoKTtcbiAgICBzZWxCb2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdhZnRlcmJlZ2luJyxcbiAgICAgIHRoaXMuZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbClcbiAgICApO1xuICB9XG4gIC8vIHNldCB0d2luIHNlbGVjdCBvcHRpb25zXG4gIHNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcbiAgICBjb25zdCByZWxhdGl2ZVNlbE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdChcbiAgICAgIHNlbGVjdCxcbiAgICAgIHRoaXMuY2xhc3Nlcy5PUFRJT05TXG4gICAgKS5yZWxhdGl2ZVNlbDtcbiAgICBvcHRpb25zLmlubmVySFRNTCA9IHRoaXMuZ2V0T3B0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmdldE9wdGlvbnMocmVsYXRpdmVTZWwpO1xuICAgIH0pO1xuICAgIGlmIChyZWxhdGl2ZVNlbE9wdGlvbnMucXVlcnlTZWxlY3RvcignW3NlbGVjdGVkXScpKSB7XG4gICAgICBvcHRpb25zXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmNsYXNzZXMuT1BUSU9OfWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgfVxuICB9XG4gIC8vIGRpc2FibGUgc2VsZWN0XG4gIGRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGlmIChyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gbWFpbiBhY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gc2V0IG1haW4gYWN0aW9uc1xuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBjb25zdCB0eXBlID0gZS50eXBlO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuU0VMRUNUKSkgfHxcbiAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IHRhcmdldC5jbG9zZXN0KCcuc2VsZWN0JylcbiAgICAgICAgPyB0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdCcpXG4gICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuc2VsfVtkYXRhLXNlbC1pZD1cIiR7XG4gICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSkuZGF0YXNldFxuICAgICAgICAgICAgICAgIC5zZWxlY3RJZFxuICAgICAgICAgICAgfVwiXWBcbiAgICAgICAgICApO1xuICAgICAgY29uc3QgcmVsYXRpdmVTZWwgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QpLnJlbGF0aXZlU2VsO1xuICAgICAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVCkpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxMaXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbE9wdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuU0VMRUNUfVtkYXRhLXNlbC1pZD1cIiR7c2VsTGlzdC5kYXRhc2V0LnNlbElkfVwiXSAuc2VsZWN0X19vcHRpb25bZGF0YS1vcHQtdmFsPVwiJHtzZWxMaXN0LmRhdGFzZXQub3B0VmFsfVwiXWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBzZWxPcHRpb24pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuVElUTEUpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb24oc2VsZWN0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTikpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxPcHRpb24gPSB0YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuT1BUSU9OKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uQWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwsIHNlbE9wdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb2N1c2luJyB8fCB0eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5TRUxFQ1QpKSkge1xuICAgICAgICAgIGlmICh0eXBlID09PSAnZm9jdXNpbicpIHtcbiAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GT0NVU0VEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZPQ1VTRUQpO1xuICAgICAgICAgICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpKSB7XG4gICAgICAgICAgICAgIGlmICghc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdrZXlkb3duJyAmJiBlLmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHRoaXMuY2xvc2VHcm91cCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlR3JvdXAoKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHNpbmdsZSBzZWxlY3QgYWN0aW9uXG4gIHNldEFjdGlvbihzZWxlY3QpIHtcbiAgICBjb25zdCByZWxhdGl2ZVNlbCA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCkucmVsYXRpdmVTZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLk9QVElPTlMpLnR3aW5TZWw7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0LXNpbmdsZV0nKSkge1xuICAgICAgY29uc3Qgc2VsZWN0T25lR3JvdXAgPSByZWxhdGl2ZVNlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Qtc2luZ2xlXScpO1xuICAgICAgdGhpcy5jbG9zZUdyb3VwKHNlbGVjdE9uZUdyb3VwLCByZWxhdGl2ZVNlbCk7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxPcHRpb25zLmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpO1xuICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSlcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpICYmXG4gICAgICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpICYmXG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkhBU19FUlJPUilcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbW92ZUVycihyZWxhdGl2ZVNlbCwgc2VsZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2xvc2Ugc2luZ2xlIHNlbGVjdCBncm91cFxuICBjbG9zZUdyb3VwKGdyb3VwLCBzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxHcm91cCA9IGdyb3VwID8gZ3JvdXAgOiBkb2N1bWVudDtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gc2VsR3JvdXAucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLlNFTEVDVCl9JHt0aGlzLmdldENsYXNzKFxuICAgICAgICB0aGlzLmNsYXNzZXMuSVNfT1BFTkVEXG4gICAgICApfWBcbiAgICApO1xuICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhc2VsZWN0IHx8XG4gICAgICAgICAgKHNlbGVjdCAmJiBzZWxlY3Rpb24uZGF0YXNldC5zZWxJZCAhPT0gc2VsZWN0LmRhdGFzZXQuc2VsSWQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2xvc2VJdGVtKHNlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyBjbG9zZSBzaW5nbGUgc2VsZWN0IGl0ZW1cbiAgY2xvc2VJdGVtKHNlbGVjdCkge1xuICAgIGNvbnN0IHJlbGF0aXZlU2VsID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0KS5yZWxhdGl2ZVNlbDtcbiAgICBjb25zdCBzZWxPcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcblxuICAgIGlmICghc2VsT3B0aW9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfT1BFTkVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5vLXNsaWRlJykpXG4gICAgICAgIF9zbGlkZVVwKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgc2luZ2xlIG9wdGlvbiBhY3Rpb25zXG4gIHNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBvcHRpb24pIHtcbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgICBjb25zdCByZWxhdGl2ZVNlbGVjdGlvbnMgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzO1xuXG4gICAgICByZWxhdGl2ZVNlbGVjdGlvbnMuZm9yRWFjaChyZWxhdGl2ZVNlbGVjdGlvbiA9PiB7XG4gICAgICAgIHJlbGF0aXZlU2VsZWN0aW9uLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0d2luU2VsZWN0aW9ucyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICB0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRClcbiAgICAgICk7XG4gICAgICB0d2luU2VsZWN0aW9ucy5mb3JFYWNoKHR3aW5TZWxlY3Rpb24gPT4ge1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3R3aW5TZWxlY3Rpb24uZGF0YXNldC5vcHRWYWx9XCJdYClcbiAgICAgICAgICAuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIW9wdGlvbi5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICByZWxhdGl2ZVNlbC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICApO1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9fb3B0aW9uJylcbiAgICAgICAgLmZvckVhY2gob3B0ID0+IG9wdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCkpO1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdC5xdWVyeVNlbGVjdG9yKGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gXG4gICAgICAgICAgKS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlU2VsLnZhbHVlID0gb3B0aW9uLmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHQtdmFsJylcbiAgICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRWYWxcbiAgICAgICAgOiBvcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICB0aGlzLnNldEFjdGlvbihzZWxlY3QpO1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zXG4gIHNldFNlYXJjaEFjdGlvbnMoc2VsZWN0KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbElucHV0ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuSU5QVVQpLnR3aW5TZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KFxuICAgICAgc2VsZWN0LFxuICAgICAgdGhpcy5jbGFzc2VzLk9QVElPTlNcbiAgICApLnR3aW5TZWwucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jbGFzc2VzLk9QVElPTn1gKTtcblxuICAgIHNlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsT3B0aW9ucy5mb3JFYWNoKHNlbE9wdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxPcHRpb24udGV4dENvbnRlbnRcbiAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAuaW5kZXhPZihzZWxJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbE9wdGlvbi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxPcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZWxPcHRpb25zLmhpZGRlbiA9PT0gdHJ1ZSA/IF90aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuICAvLyBzZXQgc2VsZWN0IHN1YnRpdGxlXG4gIHNldFN1YnRpdGxlKHJlbGF0aXZlU2VsKSB7fVxuXG4gIC8vIHZhbGlkYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGFkZCBhbiBlcnJvciB0byBhIHNlbGVjdFxuICBhZGRFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsRXJyb3IgJiYgIXJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludCkge1xuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICBgPGRpdiBjbGFzcz1cInNlbGVjdF9faGludFwiPiR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxFcnJvcn08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvLyByZW1vdmUgYW4gZXJyb3IgZnJvbSBhIHNlbGVjdFxuICByZW1vdmVFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19oaW50JykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnRcbiAgICApIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faGludCcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGdldCBjdXN0b20gY2xhc3NcbiAgZ2V0Q2xhc3MoY3NzQ2xhc3MpIHtcbiAgICByZXR1cm4gYC4ke2Nzc0NsYXNzfWA7XG4gIH1cbiAgLy8gZ2V0IHNpbmdsZSBzZWxlY3QgaXRlbVxuICBnZXRTZWxlY3Qoc2VsZWN0LCBjc3NDbGFzcykge1xuICAgIHJldHVybiB7XG4gICAgICByZWxhdGl2ZVNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLFxuICAgICAgdHdpblNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRDbGFzcyhjc3NDbGFzcykpLFxuICAgIH07XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdGVkIGl0ZW0gdmFsdWVcbiAgZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGxldCBhdHRyLFxuICAgICAgYXR0ckNsYXNzLFxuICAgICAgdGl0bGVWYWwgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwsIDIpLmh0bWw7XG5cbiAgICAvLyBzZXQgdGl0bGUgdmFsdWVcbiAgICB0aXRsZVZhbCA9IHRpdGxlVmFsLmxlbmd0aFxuICAgICAgPyB0aXRsZVZhbFxuICAgICAgOiByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbExhYmVsXG4gICAgICA/IHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWxcbiAgICAgIDogJyc7XG5cbiAgICAvLyBzZXQgYWN0aXZlIGNsYXNzIHRvIHNlbGVjdCBpZiBpdCBjb250YWlucyBhbnkgdmFsdWVzXG4gICAgaWYgKHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbCkudmFsdWVzLmxlbmd0aCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0FDVElWRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19BQ1RJVkUpO1xuICAgIH1cblxuICAgIC8vIHNldCBzZWxlY3QgbGFiZWxcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1sYWJlbCcpKSB7XG4gICAgICBhdHRyID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxMYWJlbFxuICAgICAgICA/IGAgZGF0YS1zZWwtbGFiZWw9XCIke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWx9XCJgXG4gICAgICAgIDogYCBkYXRhLXNlbC1sYWJlbD1cItCS0YvQsdC+0YBcImA7XG4gICAgICBhdHRyQ2xhc3MgPSBgICR7dGhpcy5jbGFzc2VzLkhBU19MQUJFTH1gO1xuICAgIH1cblxuICAgIC8vIHB1c2ggc2VsZWN0aW9ucyB0byB0aGUgbGlzdCBpbnNpZGUgb2Ygc2VsZWN0IHRpdGxlXG4gICAgaWYgKHJlbGF0aXZlU2VsLm11bHRpcGxlICYmIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtbGlzdCcpKSB7XG4gICAgICB0aXRsZVZhbCA9IHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbClcbiAgICAgICAgLmVsZW1lbnRzLm1hcChcbiAgICAgICAgICBvcHRpb24gPT5cbiAgICAgICAgICAgIGA8c3BhbiBkYXRhLW9wdC1pZD1cIiR7c2VsZWN0LmRhdGFzZXQuc2VsSWR9XCIgZGF0YS1vcHQtdmFsPVwiJHtcbiAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlXG4gICAgICAgICAgICB9XCIgY2xhc3M9XCJfbGlzdC1pdGVtXCI+JHt0aGlzLmdldENvbnRlbnQob3B0aW9uKX08L3NwYW4+YFxuICAgICAgICApXG4gICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgaWYgKFxuICAgICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpXG4gICAgICApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpLmlubmVySFRNTCA9IHRpdGxlVmFsO1xuICAgICAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkgdGl0bGVWYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0IHNlbGVjdCBzZWFyY2hcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkge1xuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHthdHRyfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFVUV9XCI+PGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgZGF0YS1wbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5JTlBVVH1cIj48L3NwYW4+PC9kaXY+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3VzdG9tQ2xhc3MgPVxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3NcbiAgICAgICAgICA/IGAgJHt0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgICAgIDogJyc7XG4gICAgICByZXR1cm4gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHtcbiAgICAgICAgYXR0ciA/IGF0dHIgOiAnJ1xuICAgICAgfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFfSAke1xuICAgICAgICBhdHRyQ2xhc3MgPyBhdHRyQ2xhc3MgOiAnJ1xuICAgICAgfVwiPjxzcGFuIGNsYXNzPVwiJHtcbiAgICAgICAgdGhpcy5jbGFzc2VzLkNPTlRFTlRcbiAgICAgIH0ke2N1c3RvbUNsYXNzfVwiPiR7dGl0bGVWYWx9PC9zcGFuPjwvc3Bhbj48L2J1dHRvbj5gO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgb3B0aW9uc1xuICBnZXRPcHRpb25zKHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsU2Nyb2xsID0gcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zY3JvbGwnKVxuICAgICAgPyBgZGF0YS1zaW1wbGViYXJgXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IGRhdGEgPSBzZWxTY3JvbGxcbiAgICAgID8gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxTY3JvbGwudHJpbSgpLnNwbGl0KCcsJylcbiAgICAgIDogbnVsbDtcbiAgICBsZXQgc2VsU2Nyb2xsSGVpZ2h0ID1cbiAgICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsU2Nyb2xsICYmIGRhdGFcbiAgICAgICAgPyBgc3R5bGU9XCJtYXgtaGVpZ2h0OiR7d2luZG93LmlubmVyV2lkdGggPiA3NjggPyBkYXRhWzBdIDogZGF0YVsxXX1yZW1cImBcbiAgICAgICAgOiAnJztcbiAgICBsZXQgc2VsT3B0aW9ucyA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucyk7XG5cbiAgICBpZiAoc2VsT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGxldCBzZWxPcHRpb25zSFRNTCA9IGBgO1xuXG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKSAmJlxuICAgICAgICAgICF0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5zaG93KSB8fFxuICAgICAgICByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgKSB7XG4gICAgICAgIHNlbE9wdGlvbnMgPSBzZWxPcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbFxuICAgICAgICA/IGA8ZGl2ICR7c2VsU2Nyb2xsfSAke3NlbFNjcm9sbEhlaWdodH0gZGF0YS1zZWwtc2Nyb2xsPVwiJHtyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbFNjcm9sbH1cIiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlNDUk9MTH1cIj5gXG4gICAgICAgIDogJyc7XG4gICAgICBzZWxPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgc2VsT3B0aW9uc0hUTUwgKz0gdGhpcy5nZXRPcHRpb24ob3B0aW9uLCByZWxhdGl2ZVNlbCk7XG4gICAgICB9KTtcbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbCA/IGA8L2Rpdj5gIDogJyc7XG4gICAgICByZXR1cm4gc2VsT3B0aW9uc0hUTUw7XG4gICAgfVxuICB9XG4gIC8vIGdldCBvcHRpb25cbiAgZ2V0T3B0aW9uKG9wdGlvbiwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25zID1cbiAgICAgIG9wdGlvbi5zZWxlY3RlZCAmJiByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGAgJHt0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUR9YFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNob3dTZWxlY3Rpb24gPVxuICAgICAgb3B0aW9uLnNlbGVjdGVkICYmXG4gICAgICAhcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGBoaWRkZW5gXG4gICAgICAgIDogYGA7XG4gICAgY29uc3Qgb3B0aW9uQ2xhc3MgPSBvcHRpb24uZGF0YXNldC5vcHRDbGFzc1xuICAgICAgPyBgICR7b3B0aW9uLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgOiAnJztcbiAgICBjb25zdCBvcHRpb25MaW5rID0gb3B0aW9uLmRhdGFzZXQub3B0aW9uTGlua1xuICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRpb25MaW5rXG4gICAgICA6IGZhbHNlO1xuICAgIGNvbnN0IG9wdGlvbkxpbmtUYXJnZXQgPSBvcHRpb24uaGFzQXR0cmlidXRlKCdkYXRhLW9wdGlvbi1saW5rLXRhcmdldCcpXG4gICAgICA/IGB0YXJnZXQ9XCJfYmxhbmtcImBcbiAgICAgIDogJyc7XG4gICAgbGV0IG9wdGlvbkhUTUwgPSBgYDtcblxuICAgIG9wdGlvbkhUTUwgKz0gb3B0aW9uTGlua1xuICAgICAgPyBgPGEgJHtvcHRpb25MaW5rVGFyZ2V0fSAke3Nob3dTZWxlY3Rpb259IGhyZWY9XCIke29wdGlvbkxpbmt9XCIgZGF0YS1vcHQtdmFsPVwiJHtvcHRpb24udmFsdWV9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT059JHtvcHRpb25DbGFzc30ke3NlbGVjdGlvbnN9XCI+YFxuICAgICAgOiBgPGJ1dHRvbiAke3Nob3dTZWxlY3Rpb259IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuT1BUSU9OfSR7b3B0aW9uQ2xhc3N9JHtzZWxlY3Rpb25zfVwiIGRhdGEtb3B0LXZhbD1cIiR7b3B0aW9uLnZhbHVlfVwiIHR5cGU9XCJidXR0b25cIj5gO1xuICAgIG9wdGlvbkhUTUwgKz0gdGhpcy5nZXRDb250ZW50KG9wdGlvbik7XG4gICAgb3B0aW9uSFRNTCArPSBvcHRpb25MaW5rID8gYDwvYT5gIDogYDwvYnV0dG9uPmA7XG4gICAgcmV0dXJuIG9wdGlvbkhUTUw7XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdCBjb250ZW50XG4gIGdldENvbnRlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uRGF0YSA9IG9wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0XG4gICAgICA/IGAke29wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0fWBcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgb3B0aW9uRGF0YUhUTUwgPVxuICAgICAgb3B0aW9uRGF0YS5pbmRleE9mKCdpbWcnKSA+PSAwXG4gICAgICAgID8gYDxpbWcgc3JjPVwiJHtvcHRpb25EYXRhfVwiIGFsdD1cIlwiPmBcbiAgICAgICAgOiBvcHRpb25EYXRhO1xuICAgIGxldCBvcHRpb25Db250ZW50SFRNTCA9IGBgO1xuXG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YVxuICAgICAgPyBgPHNwYW4gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5HUk9VUH1cIj5gXG4gICAgICA6ICcnO1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGFcbiAgICAgID8gYDxzcGFuIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQVNTRVR9XCI+YFxuICAgICAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gb3B0aW9uRGF0YUhUTUwgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlRYVH1cIj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uLnRleHRDb250ZW50O1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGEgPyBgPC9zcGFuPmAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgcmV0dXJuIG9wdGlvbkNvbnRlbnRIVE1MO1xuICB9XG4gIC8vIGdldCBzZWxlY3QgcGxhY2Vob2xkZXJcbiAgZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucykuZmluZChcbiAgICAgIG9wdGlvbiA9PiAhb3B0aW9uLnZhbHVlXG4gICAgKTtcblxuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuc3VidGl0bGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHBsYWNlaG9sZGVyLnRleHRDb250ZW50LFxuICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoLXNob3cnKSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoJyksXG4gICAgICAgICAgdGV4dDogcGxhY2Vob2xkZXIuZGF0YXNldC5vcHRQbGFjZWhvbGRlcixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8vIGdldCBzZWxlY3RlZCBvcHRpb25zIGRhdGFcbiAgZ2V0RGF0YShyZWxhdGl2ZVNlbCkge1xuICAgIGxldCBzZWxlY3Rpb25zID0gW107XG5cbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIHNlbGVjdGlvbnMgPSBBcnJheS5mcm9tKHJlbGF0aXZlU2VsLm9wdGlvbnMpXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9ucy5wdXNoKHJlbGF0aXZlU2VsLm9wdGlvbnNbcmVsYXRpdmVTZWwuc2VsZWN0ZWRJbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudHM6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24pLFxuICAgICAgdmFsdWVzOiBzZWxlY3Rpb25zXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKSxcbiAgICAgIGh0bWw6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiB0aGlzLmdldENvbnRlbnQob3B0aW9uKSksXG4gICAgfTtcbiAgfVxuXG4gIC8vIHNlbGVjdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXQgc2VsZWN0aW9uc1xuICBpbml0U2VsZWN0aW9ucyhlKSB7XG4gICAgY29uc3QgcmVsYXRpdmVTZWwgPSBlLnRhcmdldDtcblxuICAgIHRoaXMuYnVpbGQocmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdGlvbnNcbiAgc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IHNlbGVjdCA9IHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXN1Ym1pdCcpICYmIHJlbGF0aXZlU2VsLnZhbHVlKSB7XG4gICAgICBsZXQgdGVtcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgdGVtcEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICByZWxhdGl2ZVNlbC5jbG9zZXN0KCdmb3JtJykuYXBwZW5kKHRlbXBCdXR0b24pO1xuICAgICAgdGVtcEJ1dHRvbi5jbGljaygpO1xuICAgICAgdGVtcEJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgIHRoaXMuc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICB9XG4gIC8vIGN1c3RvbSBzZWxlY3QgZXZlbnQgKGxpc3RlbiB0byBhbnkgc2VsZWN0aW9ucyAvIG11dGF0aW9ucylcbiAgc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3Rpb24nLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdDogcmVsYXRpdmVTZWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxubmV3IFNlbGVjdCh7fSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJykubGVuZ3RoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKS5mb3JFYWNoKHNjcm9sbEJsb2NrID0+IHtcbiAgICBuZXcgU2ltcGxlQmFyKHNjcm9sbEJsb2NrLCB7XG4gICAgICBhdXRvSGlkZTogZmFsc2UsXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIiwiaW1wb3J0IHsgc2V0SGFzaCwgZ2V0SGFzaCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBUYWJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIFRBQlM6ICdkYXRhLXRhYnMnLFxuICAgICAgSU5ERVg6ICdkYXRhLXRhYnMtaW5kZXgnLFxuICAgICAgVElUTEVTOiAnZGF0YS10YWJzLXRpdGxlcycsXG4gICAgICBUSVRMRTogJ2RhdGEtdGFicy10aXRsZScsXG4gICAgICBUQUJfSVRFTTogJ2RhdGEtdGFicy1pdGVtJyxcbiAgICAgIEJPRFk6ICdkYXRhLXRhYnMtYm9keScsXG4gICAgICBIQVNIOiAnZGF0YS10YWJzLWhhc2gnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSU5JVDogJ190YWJzLWluaXQnLFxuICAgICAgQUNUSVZFOiAnX2lzLWFjdGl2ZScsXG4gICAgICBNT0RBTDogJ21vZGFsJyxcbiAgICB9O1xuICAgIHRoaXMudGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhYnNdYCk7XG4gICAgdGhpcy5hY3RpdmVIYXNoID0gW107XG5cbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGFzaCA9IGdldEhhc2goKTtcblxuICAgICAgaWYgKGhhc2ggJiYgaGFzaC5zdGFydHNXaXRoKCd0YWItJykpIHtcbiAgICAgICAgYWN0aXZlSGFzaCA9IGhhc2gucmVwbGFjZSgndGFiLScsICcnKS5zcGxpdCgnLScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFic0Jsb2NrLCBpbmRleCkgPT4ge1xuICAgICAgICB0YWJzQmxvY2suY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRhYnNCbG9jay5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5JTkRFWCwgaW5kZXgpO1xuICAgICAgICB0YWJzQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaW5pdCh0YWJzQmxvY2spO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdHVzKHRhYnNCbG9jaykge1xuICAgIGxldCB0aXRsZXMgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCk7XG4gICAgbGV0IGNvbnRlbnQgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5UQUJfSVRFTX1dYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc0hhc2ggPSB0YWJzQmxvY2suaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSEFTSCk7XG5cbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmR4KSA9PiB7XG4gICAgICAgIGlmICh0aXRsZXNbaW5keF0uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChoYXNIYXNoICYmICFpdGVtLmNsb3Nlc3QoYC4ke3RoaXMuY2xhc3Nlcy5NT0RBTH1gKSkge1xuICAgICAgICAgICAgc2V0SGFzaChgdGFiLSR7aW5kZXh9LSR7aW5keH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCkpIHtcbiAgICAgIGNvbnN0IHRpdGxlID0gdGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgICAgY29uc3QgdGFic0Jsb2NrID0gdGl0bGUuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKTtcblxuICAgICAgaWYgKCF0aXRsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSkpIHtcbiAgICAgICAgbGV0IGFjdGl2ZVRpdGxlID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEV9XS4ke3RoaXMuY2xhc3Nlcy5BQ1RJVkV9YFxuICAgICAgICApO1xuXG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gKGFjdGl2ZVRpdGxlID0gQXJyYXkuZnJvbShhY3RpdmVUaXRsZSkuZmlsdGVyKFxuICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICAgICAgICApKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgYWN0aXZlVGl0bGUubGVuZ3RoXG4gICAgICAgICAgPyBhY3RpdmVUaXRsZVswXS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0YWJzQmxvY2spO1xuICAgICAgfVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEVTfV0+KmApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuQk9EWX1dPipgKTtcbiAgICBjb25zdCBpbmRleCA9IHRhYnNCbG9jay5kYXRhc2V0LnRhYnNJbmRleDtcbiAgICBjb25zdCBhY3RpdmVIYXNoQmxvY2sgPSB0aGlzLmFjdGl2ZUhhc2hbMF0gPT0gaW5kZXg7XG5cbiAgICBpZiAoYWN0aXZlSGFzaEJsb2NrKSB7XG4gICAgICBjb25zdCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgWyR7dGhpcy5hdHRycy5USVRMRVN9XT4uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICk7XG4gICAgICBhY3RpdmVUaXRsZSA/IGFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkFDVElWRSkgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50Lmxlbmd0aCkge1xuICAgICAgY29udGVudCA9IEFycmF5LmZyb20oY29udGVudCkuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICApO1xuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0aXRsZXNbaW5kZXhdLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRJVExFLCAnJyk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuVEFCX0lURU0sICcnKTtcblxuICAgICAgICBpZiAoYWN0aXZlSGFzaEJsb2NrICYmIGluZGV4ID09IHRoaXMuYWN0aXZlSGFzaFsxXSkge1xuICAgICAgICAgIHRpdGxlc1tpbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmhpZGRlbiA9ICF0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgVGFicygpO1xuIiwiLyoqXG4gKiBzZXQgaGFzaCB0byB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRIYXNoID0gaGFzaCA9PiB7XG4gIGhhc2ggPSBoYXNoID8gYCMke2hhc2h9YCA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF07XG4gIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgaGFzaCk7XG59O1xuXG4vKipcbiAqIGdldCBoYXNoIGZyb20gdXJsXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEhhc2ggPSAoKSA9PiB7XG4gIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUluaXQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJykpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoYm9keUxvY2tTdGF0dXMgJiYgZS50YXJnZXQuY2xvc2VzdCgnLmhhbWJ1cmdlcicpKSB7XG4gICAgICAgIG1lbnVPcGVuKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2R5TG9ja1N0YXR1cyAmJlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfbWVudS1vcGVuZWQnKSAmJlxuICAgICAgICAoZS50YXJnZXQuY2xvc2VzdCgnLm1lbnVfX2Nsb3NlLWJ0bicpIHx8ICFlLnRhcmdldC5jbG9zZXN0KCcubWVudScpKVxuICAgICAgKSB7XG4gICAgICAgIG1lbnVDbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuLyoqXG4gKiBvcGVucyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIGJvZHlMb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdfbWVudS1vcGVuZWQnKTtcbn07XG4vKipcbiAqIGNsb3NlcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUNsb3NlID0gKCkgPT4ge1xuICBib2R5VW5sb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdfbWVudS1vcGVuZWQnKTtcbn07XG5cbi8vIGJvZHkgbG9ja1xuZXhwb3J0IGxldCBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4vKipcbiAqIHRvZ2dsZXMgYm9keSBsb2NrXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrVG9nZ2xlID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykpIHtcbiAgICBib2R5VW5sb2NrKGRlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBib2R5TG9jayhkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIHVubG9ja3MgYm9keVxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBib2R5VW5sb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2snKTtcbiAgICB9LCBkZWxheSk7XG4gICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcbiAgICB9LCBkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIGxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keUxvY2sgPSAoZGVsYXkgPSA1MDApID0+IHtcbiAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcblxuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuXG4vKipcbiAqIG1ha2UgdGhlIGFycmF5IHVuaXF1ZVxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheShhcnJheSkge1xuICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhU2V0VmFsdWVcbiAqIHByb2Nlc3MgbWVkaWEgcmVxdWVzdHMgZnJvbSBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTWVkaWFRdWVyaWVzID0gKGFycmF5LCBkYXRhU2V0VmFsdWUpID0+IHtcbiAgLy8gZ2V0IG9iamVjdHMgd2l0aCBtZWRpYSBxdWVyaWVzXG4gIGNvbnN0IG1lZGlhID0gQXJyYXkuZnJvbShhcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIGlmIChpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXSkge1xuICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldFtkYXRhU2V0VmFsdWVdLnNwbGl0KCcsJylbMF07XG4gICAgfVxuICB9KTtcbiAgLy8gb2JqZWN0cyB3aXRoIG1lZGlhIHF1ZXJpZXMgaW5pdGlhbGl6YXRpb25cbiAgaWYgKG1lZGlhLmxlbmd0aCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzQXJyYXkgPSBbXTtcbiAgICBtZWRpYS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV07XG4gICAgICBjb25zdCBicmVha3BvaW50ID0ge307XG4gICAgICBjb25zdCBwYXJhbXNBcnJheSA9IHBhcmFtcy5zcGxpdCgnLCcpO1xuICAgICAgYnJlYWtwb2ludC52YWx1ZSA9IHBhcmFtc0FycmF5WzBdO1xuICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcbiAgICAgIGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XG4gICAgICBicmVha3BvaW50c0FycmF5LnB1c2goYnJlYWtwb2ludCk7XG4gICAgfSk7XG4gICAgLy8gZ2V0IHVuaXF1ZSBicmVha3BvaW50c1xuICAgIGxldCBtZFF1ZXJpZXMgPSBicmVha3BvaW50c0FycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJygnICtcbiAgICAgICAgaXRlbS50eXBlICtcbiAgICAgICAgJy13aWR0aDogJyArXG4gICAgICAgIGl0ZW0udmFsdWUgK1xuICAgICAgICAncHgpLCcgK1xuICAgICAgICBpdGVtLnZhbHVlICtcbiAgICAgICAgJywnICtcbiAgICAgICAgaXRlbS50eXBlXG4gICAgICApO1xuICAgIH0pO1xuICAgIG1kUXVlcmllcyA9IHVuaXF1ZUFycmF5KG1kUXVlcmllcyk7XG4gICAgY29uc3QgbWRRdWVyaWVzQXJyYXkgPSBbXTtcblxuICAgIGlmIChtZFF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgICAvLyB3b3JrIHdpdGggZXZlcnkgYnJlYWtwb2ludFxuICAgICAgbWRRdWVyaWVzLmZvckVhY2goYnJlYWtwb2ludCA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBtZWRpYUJyZWFrcG9pbnQgPSBwYXJhbXNBcnJheVsxXTtcbiAgICAgICAgY29uc3QgbWVkaWFUeXBlID0gcGFyYW1zQXJyYXlbMl07XG4gICAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShwYXJhbXNBcnJheVswXSk7XG4gICAgICAgIC8vIG9iamVjdHMgd2l0aCBjb25kaXRpb25zXG4gICAgICAgIGNvbnN0IGl0ZW1zQXJyYXkgPSBicmVha3BvaW50c0FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09PSBtZWRpYUJyZWFrcG9pbnQgJiYgaXRlbS50eXBlID09PSBtZWRpYVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1kUXVlcmllc0FycmF5LnB1c2goe1xuICAgICAgICAgIGl0ZW1zQXJyYXksXG4gICAgICAgICAgbWF0Y2hNZWRpYSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZFF1ZXJpZXNBcnJheTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogc21vb3RobHkgc2xpZGVzIHVwXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlVXAgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0Lm9mZnNldEhlaWdodH1weGA7XG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1yZW1gIDogYDBgO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LmhpZGRlbiA9ICFzaG93bW9yZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKSA6IG51bGw7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xuICAgICAgLy8gY3JlYXRlIGV2ZW50XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NsaWRlVXBEb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyBkb3duXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwLCBzaG93bW9yZSA9IDApID0+IHtcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcbiAgICB0YXJnZXQuaGlkZGVuID0gdGFyZ2V0LmhpZGRlbiA/IGZhbHNlIDogbnVsbDtcbiAgICBzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXJlbWAgOiBgMGA7XG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZURvd25Eb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHRvZ2dsZXMgc21vb3RoIHNsaWRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHJldHVybnMgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XG4gIGlmICh0YXJnZXQuaGlkZGVuKSB7XG4gICAgcmV0dXJuIF9zbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF9zbGlkZVVwKHRhcmdldCwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIHJlbSB0byBwaXhlbHNcbiAqIEBwYXJhbSB7bnVtYmVyfSByZW1WYWx1ZVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1Ub1B4KHJlbVZhbHVlKSB7XG4gIGNvbnN0IGh0bWxGb250U2l6ZSA9IHBhcnNlRmxvYXQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmZvbnRTaXplXG4gICk7XG5cbiAgY29uc3QgcHhWYWx1ZSA9IHJlbVZhbHVlICogaHRtbEZvbnRTaXplO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKHB4VmFsdWUpICsgJ3B4Jztcbn1cblxuLy8gcmVtb3ZlIGNsYXNzIGZyb20gYWxsIGFycmF5IGVsZW1lbnRzXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IChhcnJheSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJheVtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn07XG4iLCJ2YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYW5Vc2VET007IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBbZGF0YS1zaW1wbGViYXJdIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbi5zaW1wbGViYXItd3JhcHBlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdpZHRoOiBpbmhlcml0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIG1heC13aWR0aDogaW5oZXJpdDtcbiAgbWF4LWhlaWdodDogaW5oZXJpdDtcbn1cblxuLnNpbXBsZWJhci1tYXNrIHtcbiAgZGlyZWN0aW9uOiBpbmhlcml0O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgei1pbmRleDogMDtcbn1cblxuLnNpbXBsZWJhci1vZmZzZXQge1xuICBkaXJlY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICByZXNpemU6IG5vbmUgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XG4gIGRpcmVjdGlvbjogaW5oZXJpdDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7IC8qIFJlcXVpcmVkIGZvciBob3Jpem9udGFsIG5hdGl2ZSBzY3JvbGxiYXIgdG8gbm90IGFwcGVhciBpZiBwYXJlbnQgaXMgdGFsbGVyIHRoYW4gbmF0dXJhbCBoZWlnaHQgKi9cbiAgd2lkdGg6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTsgLyogTm90IHJlcXVpcmVkIGZvciBob3Jpem9udGFsIHNjcm9sbCB0byB0cmlnZ2VyICovXG4gIG1heC1oZWlnaHQ6IDEwMCU7IC8qIE5lZWRlZCBmb3IgdmVydGljYWwgc2Nyb2xsIHRvIHRyaWdnZXIgKi9cbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG59XG5cbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXG4uc2ltcGxlYmFyLWNvbnRlbnQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogdGFibGU7XG59XG5cbi5zaW1wbGViYXItcGxhY2Vob2xkZXIge1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDFweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbG9hdDogbGVmdDtcbiAgbWF4LWhlaWdodDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB6LWluZGV4OiAtMTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgZmxleC1ncm93OiBpbmhlcml0O1xuICBmbGV4LXNocmluazogMDtcbiAgZmxleC1iYXNpczogMDtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvcGFjaXR5OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAwJTtcbiAgd2lkdGg6IDEwMDAlO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIG1pbi13aWR0aDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogLTE7XG59XG5cbi5zaW1wbGViYXItdHJhY2sge1xuICB6LWluZGV4OiAxO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcgLnNpbXBsZWJhci1jb250ZW50IHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyAuc2ltcGxlYmFyLXRyYWNrIHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtaW4taGVpZ2h0OiAxMHB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIDAuNXMgbGluZWFyO1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhci5zaW1wbGViYXItdmlzaWJsZTpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjU7XG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcztcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMXB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICB0b3A6IDJweDtcbiAgYm90dG9tOiAycHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCB7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTFweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAxMHB4O1xuICB3aWR0aDogYXV0bztcbn1cblxuLyogUnRsIHN1cHBvcnQgKi9cbltkYXRhLXNpbXBsZWJhci1kaXJlY3Rpb249cnRsXSAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcbiAgZGlyZWN0aW9uOiBydGw7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBoZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogNTAwcHg7XG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcbiAgd2lkdGg6IDIwMCU7XG4gIGhlaWdodDogMjAwJTtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9zaW1wbGVi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Q0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIltkYXRhLXNpbXBsZWJhcl0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLnNpbXBsZWJhci13cmFwcGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aWR0aDogaW5oZXJpdDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIG1heC13aWR0aDogaW5oZXJpdDtcXG4gIG1heC1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcblxcbi5zaW1wbGViYXItbWFzayB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XFxuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG4gIHotaW5kZXg6IDA7XFxufVxcblxcbi5zaW1wbGViYXItb2Zmc2V0IHtcXG4gIGRpcmVjdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgcmVzaXplOiBub25lICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMTAwJTsgLyogUmVxdWlyZWQgZm9yIGhvcml6b250YWwgbmF0aXZlIHNjcm9sbGJhciB0byBub3QgYXBwZWFyIGlmIHBhcmVudCBpcyB0YWxsZXIgdGhhbiBuYXR1cmFsIGhlaWdodCAqL1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIE5vdCByZXF1aXJlZCBmb3IgaG9yaXpvbnRhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgbWF4LWhlaWdodDogMTAwJTsgLyogTmVlZGVkIGZvciB2ZXJ0aWNhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudC13cmFwcGVyOjotd2Via2l0LXNjcm9sbGJhcixcXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXFxuLnNpbXBsZWJhci1jb250ZW50OmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG5cXG4uc2ltcGxlYmFyLXBsYWNlaG9sZGVyIHtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyLXdyYXBwZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDFweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWF4LWhlaWdodDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IC0xO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgZmxleC1ncm93OiBpbmhlcml0O1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBmbGV4LWJhc2lzOiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG9wYWNpdHk6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAwJTtcXG4gIHdpZHRoOiAxMDAwJTtcXG4gIG1pbi1oZWlnaHQ6IDFweDtcXG4gIG1pbi13aWR0aDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgei1pbmRleDogLTE7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2sge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItY29udGVudCB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItdHJhY2sge1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgbWluLWhlaWdodDogMTBweDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICBsZWZ0OiAycHg7XFxuICByaWdodDogMnB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAwLjVzIGxpbmVhcjtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIuc2ltcGxlYmFyLXZpc2libGU6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLXZlcnRpY2FsIHtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMXB4O1xcbn1cXG5cXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xcbiAgdG9wOiAycHg7XFxuICBib3R0b206IDJweDtcXG4gIGxlZnQ6IDJweDtcXG4gIHJpZ2h0OiAycHg7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTFweDtcXG59XFxuXFxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XFxuICByaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBtaW4taGVpZ2h0OiAwO1xcbiAgbWluLXdpZHRoOiAxMHB4O1xcbiAgd2lkdGg6IGF1dG87XFxufVxcblxcbi8qIFJ0bCBzdXBwb3J0ICovXFxuW2RhdGEtc2ltcGxlYmFyLWRpcmVjdGlvbj0ncnRsJ10gLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xcbiAgcmlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcXG4gIGRpcmVjdGlvbjogcnRsO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGhlaWdodDogNTAwcHg7XFxuICB3aWR0aDogNTAwcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBvdmVyZmxvdy14OiBzY3JvbGw7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcXG4gIHdpZHRoOiAyMDAlO1xcbiAgaGVpZ2h0OiAyMDAlO1xcbiAgbWFyZ2luOiAxMHB4IDA7XFxufVxcblxcbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1OdW5pdG8rU2FuczpvcHN6LHdnaHRANi4uMTIsMjAwLi4xMDAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3lfcmVndWxhci53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3lfbWVkaXVtLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiR2lscm95XCI7XG4gIHNyYzogdXJsKFwiLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9ib2xkLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sIHtcbiAgZm9udC1mYW1pbHk6IFwiTnVuaXRvIFNhbnNcIjtcbiAgZm9udC1zaXplOiAwLjUyMDgzMzV2dztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xuICBsaW5lLWhlaWdodDogMS4yO1xuICBtYXJnaW46IDA7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbiAgbGluZS1oZWlnaHQ6IDIuNXJlbTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBjb2xvcjogYmxhY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbmlucHV0LFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuYSB7XG4gIGNvbG9yOiB1bnNldDtcbn1cblxuYSxcbmE6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmJ1dHRvbixcbmlucHV0LFxuYSxcbnRleHRhcmVhIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250OiBpbmhlcml0O1xufVxuYnV0dG9uOmZvY3VzLFxuaW5wdXQ6Zm9jdXMsXG5hOmZvY3VzLFxudGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuYnV0dG9uOmFjdGl2ZSxcbmlucHV0OmFjdGl2ZSxcbmE6YWN0aXZlLFxudGV4dGFyZWE6YWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgZm9udDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5wIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbmJ1dHRvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGluaGVyaXQ7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG51bCB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxudWwgbGkge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTcycmVtO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG5zdmcsXG5pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuLmxvY2sgYm9keSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cbm1haW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4ud3JhcHBlciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXgtd2lkdGg6IDE5MjBweDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmhlYWRlcl9fdG9wLWJhciB7XG4gIHBhZGRpbmc6IDEuNHJlbSAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZFRkVGO1xufVxuLmhlYWRlcl9fdG9wLWJhciAuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5oZWFkZXJfX2NvbnRhY3RzLWxpc3Qge1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDNyZW07XG59XG4uaGVhZGVyX19uYXYge1xuICBwYWRkaW5nLWxlZnQ6IDIuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogNC44cmVtO1xufVxuLmhlYWRlcl9fbmF2LWxpbmsge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uaGVhZGVyX19uYXYtbGluazo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDAuMjVyZW07XG4gIGxlZnQ6IC0yLjRyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgd2lkdGg6IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ExQTJBOTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbn1cbi5oZWFkZXJfX2lubmVyIHtcbiAgcGFkZGluZy10b3A6IDJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG4uaGVhZGVyX19pbm5lciAuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMnJlbTtcbn1cbi5oZWFkZXJfX2xvZ28ge1xuICBmbGV4OiAwIDAgMTEuMnJlbTtcbiAgd2lkdGg6IDExLjJyZW07XG59XG4uaGVhZGVyX19jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMnJlbTtcbiAgZmxleDogMSAxIGF1dG87XG59XG4uaGVhZGVyX19yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLmhlYWRlcl9fcm93X2xvd2VyIHtcbiAgY29sdW1uLWdhcDogMi4xcmVtO1xufVxuLmhlYWRlcl9fY2F0YWxvZy1idG4ge1xuICBtYXJnaW4tcmlnaHQ6IDIuNnJlbTtcbn1cbi5fc2hvdy1jYXRhbG9nIC5oZWFkZXJfX2NhdGFsb2ctYnRuIC5jYXRhbG9nLWJ0bl9faWNvbi1pbWcge1xuICBkaXNwbGF5OiBub25lO1xufVxuLl9zaG93LWNhdGFsb2cgLmhlYWRlcl9fY2F0YWxvZy1idG4gLmNhdGFsb2ctYnRuX19pY29uLWltZ19jcm9zcyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi5oZWFkZXJfX3NlYXJjaCB7XG4gIG1hcmdpbi1yaWdodDogMy4ycmVtO1xuICBmbGV4OiAxIDEgYXV0bztcbn1cbi5oZWFkZXJfX2FjdGlvbnMtaXRlbSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICByb3ctZ2FwOiAwLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5oZWFkZXJfX2FjdGlvbnMtaXRlbSBzdmcge1xuICB3aWR0aDogMy42cmVtO1xuICBoZWlnaHQ6IDMuNnJlbTtcbn1cbi5oZWFkZXJfX2NhdGFsb2ctY2hhcHRlcnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiAxLjZyZW07XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuLmhlYWRlcl9fY2F0YWxvZy1jaGFwdGVyIHtcbiAgcGFkZGluZzogMS45cmVtIDIuNXJlbTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRUY7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4uc2VhcmNoLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDtcbn1cbi5zZWFyY2gtaGVhZGVyX19pbnB1dC5pbnB1dF9fZmllbGQge1xuICBib3JkZXI6IG5vbmU7XG59XG4uc2VhcmNoLWhlYWRlcl9fYnRuIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4OiAwIDAgNnJlbTtcbiAgd2lkdGg6IDZyZW07XG4gIGhlaWdodDogNnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbn1cbi5zZWFyY2gtaGVhZGVyX19idG4gc3ZnIHtcbiAgd2lkdGg6IDQuNHJlbTtcbn1cblxuLmNhdGFsb2ctbWVudS1oZWFkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDU7XG4gIHRvcDogMTRyZW07XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBvcGFjaXR5OiAwO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXJlbSk7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLCB2aXNpYmlsaXR5IDAuM3MgZWFzZSwgdHJhbnNmb3JtIDAuM3MgZWFzZTtcbn1cbi5fc2hvdy1jYXRhbG9nIC5jYXRhbG9nLW1lbnUtaGVhZGVyIHtcbiAgb3BhY2l0eTogMTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX2lubmVyIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNDguMnJlbSAxMzMuOHJlbSAxZnI7XG4gIG1heC13aWR0aDogMTkyMHB4O1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX25hdiB7XG4gIHBhZGRpbmc6IDEwcmVtIDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNBMUEyQTk7XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fbmF2LXN1Ymxpbmsge1xuICBwYWRkaW5nOiAyLjRyZW07XG4gIHBhZGRpbmctbGVmdDogMTRyZW07XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX25hdi1zdWJsaW5rIC50eHQge1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fbmF2LXN1YmxpbmsuX2lzLWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fbmF2LXN1YmxpbmsuX2lzLWFjdGl2ZSAudHh0IHtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fc3VibmF2IHtcbiAgcGFkZGluZy10b3A6IDEwcmVtO1xuICBwYWRkaW5nLWxlZnQ6IDUuNnJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19zdWJuYXY6bm90KC5jYXRhbG9nLW1lbnUtaGVhZGVyX19zdWJuYXYuX2lzLWFjdGl2ZSkge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX2JyYW5kcyB7XG4gIG1hcmdpbi1ib3R0b206IDhyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDguNHJlbTtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19icmFuZC1sb2dvIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDUuNHJlbTtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19icmFuZC1sb2dvOm5vdCg6bGFzdC1jaGlsZCk6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAtNC4ycmVtO1xuICB3aWR0aDogMnB4O1xuICBoZWlnaHQ6IDUuNHJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ExQTJBOTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX2JyYW5kLWxvZ28taW1nIHtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRUY7XG59XG4uZm9vdGVyX19jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmZvb3Rlcl9fY29udGVudCB7XG4gIHBhZGRpbmc6IDVyZW0gMDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzZnIgNmZyIDNmcjtcbn1cbi5mb290ZXJfX2xvZ28td3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uZm9vdGVyX19sb2dvIHtcbiAgbWFyZ2luLWJvdHRvbTogMi40cmVtO1xuICB3aWR0aDogMTAuOHJlbTtcbn1cbi5mb290ZXJfX3RleHQge1xuICBtYXgtd2lkdGg6IDI5LjNyZW07XG59XG4uZm9vdGVyX19uYXYge1xuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcbn1cbi5mb290ZXJfX25hdi1pdGVtcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDguOHJlbTtcbn1cbi5mb290ZXJfX25hdi1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5mb290ZXJfX25hdi1oZWFkaW5nIHtcbiAgbWFyZ2luLWJvdHRvbTogMi44cmVtO1xufVxuLmZvb3Rlcl9fc3VibmF2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIHJvdy1nYXA6IDEuNnJlbTtcbn1cbi5mb290ZXJfX2NvbnRhY3RzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAyLjRyZW07XG4gIGp1c3RpZnktc2VsZjogZW5kO1xuICBtYXgtd2lkdGg6IDI2LjJyZW07XG59XG4uZm9vdGVyX19jb3B5cmlnaHRzIHtcbiAgcGFkZGluZzogNXJlbSAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQTFBMkE5O1xuICBjb2xvcjogIzgwODA4MDtcbn1cbi5mb290ZXJfX2NvcHlyaWdodHMtdHh0IHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5mb290ZXJfX2NvcHlyaWdodHMtaW5mbyB7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uZm9vdGVyX19yZC1sb2dvIHtcbiAgZmxleDogMCAwIDE4LjVyZW07XG4gIHdpZHRoOiAxOC41cmVtO1xufVxuXG4uaCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uaF9oMSB7XG4gIGZvbnQtc2l6ZTogNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDUuNnJlbTtcbn1cbi5oX2gyIHtcbiAgZm9udC1zaXplOiAzLjZyZW07XG4gIGxpbmUtaGVpZ2h0OiAxMjAlO1xufVxuLmhfaDMge1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDIuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDMuM3JlbTtcbn1cblxuLnR4dF8yNCB7XG4gIGZvbnQtc2l6ZTogMi40cmVtO1xuICBsaW5lLWhlaWdodDogMi44cmVtO1xufVxuLnR4dF8yMCB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcbn1cbi50eHRfMTYge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcbn1cbi50eHRfMTQge1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuOXJlbTtcbn1cbi50eHRfc2VtaWJvbGQge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5pbnB1dFt0eXBlPXRleHRdLFxuaW5wdXRbdHlwZT1lbWFpbF0sXG5pbnB1dFt0eXBlPXRlbF0sXG50ZXh0YXJlYSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG50ZXh0YXJlYTpmb2N1cyxcbmlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmlucHV0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAwLjJyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XG59XG4uaW5wdXRfcGFzcyAuaW5wdXRfX2ZpZWxkIHtcbiAgcGFkZGluZy1yaWdodDogNC41cmVtO1xufVxuLmlucHV0X19maWVsZCwgLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcbn1cbi5pbnB1dF9fZmllbGQge1xuICBwYWRkaW5nOiAxLjhyZW0gMnJlbTtcbiAgaGVpZ2h0OiA2cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogI0ExQTJBOTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xufVxuLmlucHV0X19wYXNzLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyLjJyZW07XG4gIHJpZ2h0OiAycmVtO1xufVxuLmlucHV0X19wYXNzLWJ0bi1pIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuLmlucHV0X19wYXNzLWJ0bi1pX2hpZGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuLl9pcy1yZXZlYWxlZCAuaW5wdXRfX3Bhc3MtYnRuLWkge1xuICBkaXNwbGF5OiBub25lO1xufVxuLl9pcy1yZXZlYWxlZCAuaW5wdXRfX3Bhc3MtYnRuLWlfaGlkZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi5pbnB1dC5faGFzLWVycm9yOjphZnRlciB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGNvbG9yOiAjZjQwMDAwO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZCB7XG4gIGNvbG9yOiAjZjQwMDAwO1xufVxuLmlucHV0Ll9oYXMtZm9jdXMgLmlucHV0X19maWVsZCwgLmlucHV0Ll9pcy1maWxsZWQgLmlucHV0X19maWVsZCB7XG4gIGNvbG9yOiAjMDAwMDAwO1xufVxuXG50ZXh0YXJlYS5pbnB1dCB7XG4gIHBhZGRpbmc6IDBweCAwcHg7XG4gIHJlc2l6ZTogbm9uZTtcbn1cblxuLmJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmJ0bl9wcmltYXJ5IHtcbiAgcGFkZGluZzogMXJlbSAzLjJyZW07XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJvcmRlcjogMS41cHggc29saWQgIzAwMDAwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcbn1cbi5idG5fcHJpbWFyeSAudHh0IHtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cbi5idG5fc2Vjb25kYXJ5IHtcbiAgbWFyZ2luLXJpZ2h0OiAxLjZyZW07XG59XG4uYnRuX3NlY29uZGFyeTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBmbGV4OiAwIDAgMi40cmVtO1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi9hc3NldHMvaW1hZ2VzL2ljb25zL2Fyci1zbS5zdmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuNnJlbSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG4uYnRuW2Rpc2FibGVkXSwgLmJ0bi5faXMtZGlzYWJsZWQge1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICNBMUEyQTk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNBMUEyQTk7XG59XG5cbi5jYXRhbG9nLWJ0biB7XG4gIHBhZGRpbmc6IDAuOHJlbTtcbiAgcGFkZGluZy1yaWdodDogMS4ycmVtO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMS4ycmVtO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG59XG4uY2F0YWxvZy1idG5fX2ljb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXg6IDAgMCA0LjRyZW07XG4gIHdpZHRoOiA0LjRyZW07XG4gIGhlaWdodDogNC40cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuLmNhdGFsb2ctYnRuX19pY29uLWltZyB7XG4gIHdpZHRoOiAyLjRyZW07XG4gIGhlaWdodDogMi40cmVtO1xufVxuLmNhdGFsb2ctYnRuX19pY29uLWltZ19jcm9zcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGZsZXg6IDAgMCA0cmVtO1xuICB3aWR0aDogNHJlbTtcbiAgaGVpZ2h0OiA0cmVtO1xufVxuLmNhdGFsb2ctYnRuX190eHQge1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLm9wdGlvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLm9wdGlvbl9faW5wdXQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDA7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG4ub3B0aW9uX19pbnB1dDpjaGVja2VkICsgLm9wdGlvbl9fdHh0OjphZnRlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG4ub3B0aW9uX190eHQge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBnYXA6IDAuOHJlbTtcbn1cbi5vcHRpb25fX3R4dDo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbiAgZmxleDogMCAwIDIuNHJlbTtcbiAgd2lkdGg6IDIuNHJlbTtcbiAgaGVpZ2h0OiAyLjRyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAjMDAwMDAwO1xufVxuLm9wdGlvbl9fdHh0OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMC40cmVtO1xuICB0b3A6IDAuNHJlbTtcbiAgd2lkdGg6IDEuNnJlbTtcbiAgaGVpZ2h0OiAxLjZyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbn1cblxuLmNoZWNrYm94IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cbi5jaGVja2JveF9faW5wdXQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDA7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG4uY2hlY2tib3hfX2lucHV0OmNoZWNrZWQgKyAuY2hlY2tib3hfX3R4dDo6YmVmb3JlIHtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAjMDAwMDAwO1xufVxuLmNoZWNrYm94X19pbnB1dDpjaGVja2VkICsgLmNoZWNrYm94X190eHQ6OmFmdGVyIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cbi5jaGVja2JveF9fdHh0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMC44cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY2hlY2tib3hfX3R4dDo6YmVmb3JlIHtcbiAgY29udGVudDogXCJcIjtcbiAgZmxleDogMCAwIDIuMnJlbTtcbiAgd2lkdGg6IDIuMnJlbTtcbiAgaGVpZ2h0OiAyLjJyZW07XG4gIGJvcmRlcjogMS41cHggc29saWQgI0ExQTJBOTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyIDAuM3MgZWFzZTtcbn1cbi5jaGVja2JveF9fdHh0OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjVyZW07XG4gIGxlZnQ6IDAuM3JlbTtcbiAgd2lkdGg6IDEuNnJlbTtcbiAgaGVpZ2h0OiAxLjZyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG5cbi5icmVhZGNydW1icyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDIuNHJlbTtcbn1cbi5icmVhZGNydW1ic19fbGluayB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6ICNBMUEyQTk7XG59XG4uYnJlYWRjcnVtYnNfX2xpbmtfY2hhcHRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYnJlYWRjcnVtYnNfX2xpbmtfY2hhcHRlcjo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBmbGV4OiAwIDAgMi40cmVtO1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi9hc3NldHMvaW1hZ2VzL2ljb25zL2Fyci1ncmF5LnN2Z1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuLmJyZWFkY3J1bWJzX19saW5rOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMC4ycmVtO1xuICByaWdodDogLTEuMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICB3aWR0aDogMS4ycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNBMUEyQTk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbn1cbi5wYWdpbmF0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMi40cmVtO1xufVxuLnBhZ2luYXRpb25fX2FyciB7XG4gIGZsZXg6IDAgMCAyLjRyZW07XG4gIHdpZHRoOiAyLjRyZW07XG4gIGhlaWdodDogMi40cmVtO1xufVxuLnBhZ2luYXRpb25fX2FyciBzdmcgcGF0aCB7XG4gIGZpbGw6ICMwMDAwMDA7XG59XG4ucGFnaW5hdGlvbl9fYXJyLl9pcy1kaXNhYmxlZCB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnBhZ2luYXRpb25fX2Fyci5faXMtZGlzYWJsZWQgc3ZnIHBhdGgge1xuICBmaWxsOiAjQTFBMkE5O1xufVxuLnBhZ2luYXRpb25fX2Fycl9uZXh0IHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbn1cbi5wYWdpbmF0aW9uX19udW1zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMC40cmVtO1xufVxuLnBhZ2luYXRpb25fX251bSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleDogMCAwIDVyZW07XG4gIHdpZHRoOiA1cmVtO1xuICBoZWlnaHQ6IDVyZW07XG4gIGNvbG9yOiAjQTFBMkE5O1xufVxuLnBhZ2luYXRpb25fX251bS5faXMtYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VGRUZFRjtcbiAgY29sb3I6ICMwMDAwMDA7XG59XG5cbi5hcnJvdy1idG4ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXg6IDAgMCA1cmVtO1xuICB3aWR0aDogNXJlbTtcbiAgaGVpZ2h0OiA1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xufVxuLmFycm93LWJ0bl9uZXh0IHN2ZyB7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG59XG4uYXJyb3ctYnRuOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG59XG4uYXJyb3ctYnRuOmFjdGl2ZSBzdmcgcGF0aCB7XG4gIGZpbGw6ICNmZmZmZmY7XG59XG4uYXJyb3ctYnRuIHN2ZyB7XG4gIHdpZHRoOiAyLjRyZW07XG4gIGhlaWdodDogMi40cmVtO1xufVxuLmFycm93LWJ0biBzdmcgcGF0aCB7XG4gIGZpbGw6ICMwMDAwMDA7XG4gIHRyYW5zaXRpb246IGZpbGwgMC4zcyBlYXNlO1xufVxuXG4uaS1saW5rIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGNvbHVtbi1nYXA6IDAuOXJlbTtcbn1cbi5pLWxpbmsgc3ZnIHtcbiAgZmxleDogMCAwIDIuNHJlbTtcbiAgd2lkdGg6IDIuNHJlbTtcbiAgaGVpZ2h0OiAyLjRyZW07XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjA1cmVtKTtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiAxOTIwcHgpe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKXtcbiAgaHRtbCB7XG4gICAgZm9udC1zaXplOiA1cHg7XG4gICAgZm9udC1zaXplOiAxLjU2MjV2dztcbiAgICBmb250LXNpemU6IDEuMzMzMzMzMzMzM3Z3O1xuICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogbm9uZTtcbiAgfVxuICBib2R5IHtcbiAgICBmb250LXNpemU6IDNyZW07XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDAgMy4ycmVtO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5AbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpe1xuICAuYnRuX3ByaW1hcnk6bm90KC5idG5fcHJpbWFyeVtkaXNhYmxlZF0sIC5idG5fcHJpbWFyeS5faXMtZGlzYWJsZWQpOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICB9XG4gIC5idG5fcHJpbWFyeTpub3QoLmJ0bl9wcmltYXJ5W2Rpc2FibGVkXSwgLmJ0bl9wcmltYXJ5Ll9pcy1kaXNhYmxlZCk6aG92ZXIgLnR4dCB7XG4gICAgY29sb3I6ICMwMDAwMDA7XG4gIH1cbiAgLmJ0bl9zZWNvbmRhcnk6aG92ZXI6OmFmdGVyIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2ZvbnRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3N0eWxlLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3NldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zZWN0aW9ucy9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc2VjdGlvbnMvZm9vdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX3R5cG8uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9faW5wdXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fYnV0dG9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19yYWRpby1idXR0b24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fY2hlY2tib3guc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fYnJlYWRjcnVtYnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fcGFnaW5hdGlvbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19hcnJvdy1idG4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9faS1saW5rLnNjc3NcIixcIjxubyBzb3VyY2U+XCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQUE7RUFDQSxnRUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNFRjtBREFBO0VBQ0UscUJBQUE7RUFDQSwrREFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNFRjtBREFBO0VBQ0UscUJBQUE7RUFDQSw2REFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNFRjtBQ2xCQTs7O0VBR0ksc0JBQUE7QURvQko7O0FDbEJBO0VBQ0ksMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0FEcUJKOztBQ2xCQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EseUJEcEJJO0FBeUNSOztBQ2xCQTs7RUFFSSxxQ0FBQTtFQUNBLG9CQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FEcUJKOztBQ25CQTtFQUNJLFlBQUE7QURzQko7O0FDcEJBOztFQUVJLHFCQUFBO0FEdUJKOztBQ3BCQTs7OztFQUlJLGFBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtBRHVCSjtBQ3RCSTs7OztFQUNJLGFBQUE7QUQyQlI7QUN6Qkk7Ozs7RUFDSSxhQUFBO0FEOEJSOztBQzFCQTs7Ozs7O0VBTUksYUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FENkJKOztBQzNCQTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtBRDhCSjs7QUMzQkE7RUFDSSxXQUFBO0VBQ0Es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QUEwT0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0dpbHJveSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0dpbHJveSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9tZWRpdW0ud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnR2lscm95JztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvR2lscm95X2JvbGQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cIixcIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtaXhpbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuQGltcG9ydCAnLi9taXhpbnMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHZhcmlhYmxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gY29sb3JzXFxuJHdoaXRlOiAjZmZmZmZmO1xcbiRibGFjazogIzAwMDAwMDtcXG4kZ3JheTogI0VGRUZFRjtcXG4kZ3JheVR4dDogI0ExQTJBOTtcXG4kcmVkOiAjRjQwMDAwRkY7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBmb250cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1OdW5pdG8rU2FuczpvcHN6LHdnaHRANi4uMTIsMjAwLi4xMDAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbi8vIGxvY2FsIGZvbnRzXFxuIEBpbXBvcnQgJy4vZm9udHMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYmFzZSBzdHlsZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gYmFzZSBzY3NzIGZpbGVcXG5AaW1wb3J0ICcuL3NldCc7XFxuXFxuLy8gYm9keVxcbmJvZHkge1xcbiAgICAubG9jayAmIHtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB0b3VjaC1hY3Rpb246IG5vbmU7XFxuICAgIH1cXG4gICAgLmxvYWRlZCAmIHtcXG4gICAgfVxcbn1cXG5cXG4vLyBtYWluXFxubWFpbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZmxleDogMSAxIGF1dG87XFxufVxcblxcbi8vIHdyYXBwZXJcXG4ud3JhcHBlciB7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBtYXgtd2lkdGg6IDE5MjBweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGhlYWRlciAvIGZvb3RlclxcbkBpbXBvcnQgJy4vc2VjdGlvbnMvaGVhZGVyJztcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2Zvb3Rlcic7XFxuXFxuLy8gdWlcXG5AaW1wb3J0ICcuLi91aS9zdHlsZXMvdWkuc2Nzcyc7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0ICcuL2Rldi92em1zazEuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvbWFya3VzRE0uc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvdWtpazAuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYva2llNmVyLnNjc3MnO1xcblwiLFwiKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5odG1sIHtcXG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7IC8vINGI0YDQuNGE0YIg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0L/QviDRgdCw0LnRgtGDXFxuICAgIGZvbnQtc2l6ZTogMC41MjA4MzM1dnc7IC8vINC90LAg0YDQsNC30YDQtdGI0LXQvdC40LggMTkyMCAwLjUyMDgzNXZ3ID09PSAxMHB4XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcXG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiAyLjVyZW07XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmb250LXNpemU6IDEuOHJlbTtcXG4gICAgY29sb3I6IGJsYWNrOyAvLyDRhtCy0LXRgiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgtC10LrRgdGC0LAg0L/QviDRgdCw0LnRgtGDXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG59XFxuXFxuaW5wdXQsXFxudGV4dGFyZWEge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuYSB7XFxuICAgIGNvbG9yOiB1bnNldDtcXG59XFxuYSxcXG5hOmhvdmVyIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxuYSxcXG50ZXh0YXJlYSB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgJjpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICB9XFxuICAgICY6YWN0aXZlIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIH1cXG59XFxuXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcbnAge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG5pbWcge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgdGV4dC1hbGlnbjogaW5oZXJpdDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbnVsIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG51bCBsaSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxNzJyZW07XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdudW1iZXInXSB7XFxuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbn1cXG5cXG5zdmcsXFxuaW1nIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxLjU2MjV2dztcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygoMTAwIC8gMzc1KSAqIDV2dyk7IC8vINCz0LTQtSAzNzUg0Y3RgtC+INGI0LjRgNC40L3QsCDQvNC+0LEg0LLQtdGA0YHQuNC4INC80LDQutC10YLQsFxcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuXFxuICAgIGJvZHkge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5jb250YWluZXIge1xcbiAgICAgICAgcGFkZGluZzogMCAzLjJyZW07IC8vINCyINC80L7QsSDQstC10YDRgdC40Lgg0L7RgtGB0YLRg9C/INC+0YIg0LrRgNCw0Y8g0LfQsNC00LDQtdC8INC00LvRjyDQstGB0LXRhSDQutC+0L3RgtC10LnQvdC10YDQvtCyLCDQsCDRgtCw0Lwg0LPQtNC1INC90LUg0L3Rg9C20L3QviDQvNC+0LbQtdC8INGC0L7Rh9C10YfQvdC+INGD0LHRgNCw0YLRjFxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXCIsXCIuaGVhZGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgJl9fdG9wLWJhciB7XFxuICAgIHBhZGRpbmc6IDEuNHJlbSAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheTtcXG5cXG4gICAgLmNvbnRhaW5lciB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX19jb250YWN0cy1saXN0IHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAzcmVtO1xcbiAgfVxcblxcbiAgJl9fbmF2IHtcXG4gICAgcGFkZGluZy1sZWZ0OiAyLjVyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IDQuOHJlbTtcXG4gIH1cXG5cXG4gICZfX25hdi1saW5rIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDAuMjVyZW07XFxuICAgICAgbGVmdDogLTIuNHJlbTtcXG4gICAgICBoZWlnaHQ6IDJyZW07XFxuICAgICAgd2lkdGg6IDFweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheVR4dDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX19pbm5lciB7XFxuICAgIHBhZGRpbmctdG9wOiAycmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuXFxuICAgIC5jb250YWluZXIge1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgY29sdW1uLWdhcDogMnJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fbG9nbyB7XFxuICAgIGZsZXg6IDAgMCAxMS4ycmVtO1xcbiAgICB3aWR0aDogMTEuMnJlbTtcXG4gIH1cXG5cXG4gICZfX2NvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAycmVtO1xcbiAgICBmbGV4OiAxIDEgYXV0bztcXG4gIH1cXG5cXG4gICZfX3JvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuXFxuICAgICZfdXBwZXIge1xcbiAgICB9XFxuICAgICZfbG93ZXIge1xcbiAgICAgIGNvbHVtbi1nYXA6IDIuMXJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fY2F0YWxvZy1idG4ge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIuNnJlbTtcXG5cXG4gICAgLl9zaG93LWNhdGFsb2cgJiB7XFxuICAgICAgLmNhdGFsb2ctYnRuX19pY29uLWltZyB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcblxcbiAgICAgICAgJl9jcm9zcyB7XFxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX3NlYXJjaCB7XFxuICAgIG1hcmdpbi1yaWdodDogMy4ycmVtO1xcbiAgICBmbGV4OiAxIDEgYXV0bztcXG4gIH1cXG5cXG4gICZfX2FjdGlvbnMge1xcblxcbiAgfVxcblxcbiAgJl9fYWN0aW9ucy1pdGVtIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHJvdy1nYXA6IDAuNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgICBzdmcge1xcbiAgICAgIHdpZHRoOiAzLjZyZW07XFxuICAgICAgaGVpZ2h0OiAzLjZyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX2FjdGlvbnMtaXRlbS10eHQge1xcblxcbiAgfVxcblxcbiAgJl9fY2F0YWxvZy1jaGFwdGVycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IDEuNnJlbTtcXG4gICAgZmxleDogMSAxIGF1dG87XFxuICB9XFxuXFxuICAmX19jYXRhbG9nLWNoYXB0ZXIge1xcbiAgICBwYWRkaW5nOiAxLjlyZW0gMi41cmVtO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGhlaWdodDogNnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGdyYXk7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgfVxcbn1cXG5cXG4uc2VhcmNoLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiA2cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgJGJsYWNrO1xcblxcbiAgJl9faW5wdXQge1xcbiAgICAmLmlucHV0IHtcXG4gICAgICAmX19maWVsZCB7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmX19idG4ge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZsZXg6IDAgMCA2cmVtO1xcbiAgICB3aWR0aDogNnJlbTtcXG4gICAgaGVpZ2h0OiA2cmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuXFxuICAgIHN2ZyB7XFxuICAgICAgd2lkdGg6IDQuNHJlbTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4uY2F0YWxvZy1tZW51LWhlYWRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiA1O1xcbiAgdG9wOiAxNHJlbTtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFyZW0pO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2UsIHZpc2liaWxpdHkgMC4zcyBlYXNlLCB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcblxcbiAgLl9zaG93LWNhdGFsb2cgJiB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gIH1cXG5cXG4gICZfX2lubmVyIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNDguMnJlbSAxMzMuOHJlbSAxZnI7XFxuICAgIG1heC13aWR0aDogMTkyMHB4O1xcbiAgfVxcblxcbiAgJl9fbmF2IHtcXG4gICAgcGFkZGluZzogMTByZW0gMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJGdyYXlUeHQ7XFxuICB9XFxuXFxuICAmX19uYXYtc3VibGluayB7XFxuICAgIHBhZGRpbmc6IDIuNHJlbTtcXG4gICAgcGFkZGluZy1sZWZ0OiAxNHJlbTtcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XFxuXFxuICAgIC50eHQge1xcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXG4gICAgfVxcblxcbiAgICAmLl9pcy1hY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG5cXG4gICAgICAudHh0IHtcXG4gICAgICAgIGNvbG9yOiAkd2hpdGU7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmX19zdWJuYXYge1xcbiAgICBwYWRkaW5nLXRvcDogMTByZW07XFxuICAgIHBhZGRpbmctbGVmdDogNS42cmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgICAmOm5vdCgmLl9pcy1hY3RpdmUpIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX19icmFuZHMge1xcbiAgICBtYXJnaW4tYm90dG9tOiA4cmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiA4LjRyZW07XFxuICB9XFxuXFxuICAmX19icmFuZC1sb2dvIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDUuNHJlbTtcXG5cXG4gICAgJjpub3QoOmxhc3QtY2hpbGQpIHtcXG5cXG4gICAgICAmOjphZnRlciB7XFxuICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIHJpZ2h0OiAtNC4ycmVtO1xcbiAgICAgICAgd2lkdGg6IDJweDtcXG4gICAgICAgIGhlaWdodDogNS40cmVtO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyYXlUeHQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICB9XFxuXFxuICAmX19icmFuZC1sb2dvLWltZyB7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICB9XFxufVwiLFwiLmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheTtcXG5cXG4gICZfX2NvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAmX19jb250ZW50IHtcXG4gICAgcGFkZGluZzogNXJlbSAwO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDNmciA2ZnIgM2ZyO1xcbiAgfVxcblxcbiAgJl9fbG9nby13cmFwIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG5cXG4gICZfX2xvZ28ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAyLjRyZW07XFxuICAgIHdpZHRoOiAxMC44cmVtO1xcbiAgfVxcblxcbiAgJl9fdGV4dCB7XFxuICAgIG1heC13aWR0aDogMjkuM3JlbTtcXG4gIH1cXG5cXG4gICZfX25hdiB7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgfVxcblxcbiAgJl9fbmF2LWl0ZW1zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgY29sdW1uLWdhcDogOC44cmVtO1xcbiAgfVxcblxcbiAgJl9fbmF2LWl0ZW0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgJl9fbmF2LWhlYWRpbmcge1xcbiAgICBtYXJnaW4tYm90dG9tOiAyLjhyZW07XFxuICB9XFxuXFxuICAmX19zdWJuYXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gICAgcm93LWdhcDogMS42cmVtO1xcbiAgfVxcblxcbiAgJl9fY29udGFjdHMtbGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHJvdy1nYXA6IDIuNHJlbTtcXG4gICAganVzdGlmeS1zZWxmOiBlbmQ7XFxuICAgIG1heC13aWR0aDogMjYuMnJlbTtcXG4gIH1cXG5cXG4gICZfX2NvcHlyaWdodHMge1xcbiAgICBwYWRkaW5nOiA1cmVtIDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICRncmF5VHh0O1xcbiAgICBjb2xvcjogIzgwODA4MDtcXG4gIH1cXG5cXG4gICZfX2NvcHlyaWdodHMtdHh0IHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIH1cXG5cXG4gICZfX2NvcHlyaWdodHMtaW5mbyB7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAmX19yZC1sb2dvIHtcXG4gICAgZmxleDogMCAwIDE4LjVyZW07XFxuICAgIHdpZHRoOiAxOC41cmVtO1xcbiAgfVxcbn1cIixcIi5oIHtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG5cXG4gICAgJl9oMSB7XFxuICAgICAgICBmb250LXNpemU6IDVyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogNS42cmVtO1xcbiAgICB9XFxuXFxuICAgICZfaDIge1xcbiAgICAgICAgZm9udC1zaXplOiAzLjZyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMTIwJTtcXG4gICAgfVxcblxcbiAgICAmX2gzIHtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgICAgICBmb250LXNpemU6IDIuNHJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzLjNyZW07XFxuICAgIH1cXG59XFxuXFxuLnR4dCB7XFxuICAgICZfMjQge1xcbiAgICAgICAgZm9udC1zaXplOiAyLjRyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMi44cmVtO1xcbiAgICB9XFxuXFxuICAgICZfMjAge1xcbiAgICAgICAgZm9udC1zaXplOiAycmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcXG4gICAgfVxcblxcbiAgICAmXzE2IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcXG4gICAgfVxcblxcbiAgICAmXzE0IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuOXJlbTtcXG4gICAgfVxcblxcbiAgICAmX3NlbWlib2xkIHtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIH1cXG59XCIsXCJpbnB1dFt0eXBlPSd0ZXh0J10sXFxuaW5wdXRbdHlwZT0nZW1haWwnXSxcXG5pbnB1dFt0eXBlPSd0ZWwnXSxcXG50ZXh0YXJlYSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbn1cXG50ZXh0YXJlYTpmb2N1cyxcXG5pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4uaW5wdXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICByb3ctZ2FwOiAwLjJyZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcXG5cXG4gICZfcGFzcyB7XFxuICAgIC5pbnB1dF9fZmllbGQge1xcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDQuNXJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fZmllbGQsXFxuICAmX19maWVsZDo6cGxhY2Vob2xkZXIge1xcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcXG4gIH1cXG5cXG4gICZfX2ZpZWxkIHtcXG4gICAgcGFkZGluZzogMS44cmVtIDJyZW07XFxuICAgIGhlaWdodDogNnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgICBjb2xvcjogJGdyYXlUeHQ7XFxuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXG4gIH1cXG5cXG4gICZfX3Bhc3MtYnRuIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDIuMnJlbTtcXG4gICAgcmlnaHQ6IDJyZW07XFxuICB9XFxuXFxuICAmX19wYXNzLWJ0bi1pIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMnJlbTtcXG4gICAgaGVpZ2h0OiAycmVtO1xcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xcblxcbiAgICAmX2hpZGUge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgLl9pcy1yZXZlYWxlZCAmIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICAgICZfaGlkZSB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmLl9oYXMtZXJyb3Ige1xcblxcbiAgICAmOjphZnRlciB7XFxuICAgICAgY29udGVudDogYXR0cihkYXRhLWhpbnQpO1xcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICAgIGNvbG9yOiAkcmVkO1xcbiAgICB9XFxuXFxuICAgIC5pbnB1dF9fZmllbGQge1xcbiAgICAgIGNvbG9yOiAkcmVkO1xcbiAgICB9XFxuICB9XFxuXFxuICAmLl9oYXMtZm9jdXMsXFxuICAmLl9pcy1maWxsZWQge1xcbiAgICAuaW5wdXRfX2ZpZWxkIHtcXG4gICAgICBjb2xvcjogJGJsYWNrO1xcbiAgICB9XFxuICB9XFxufVxcblxcbnRleHRhcmVhLmlucHV0IHtcXG4gIHBhZGRpbmc6IDBweCAwcHg7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblwiLFwiLmJ0biB7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAmX3ByaW1hcnkge1xcbiAgICBwYWRkaW5nOiAxcmVtIDMuMnJlbTtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGhlaWdodDogNnJlbTtcXG4gICAgYm9yZGVyOiAxLjVweCBzb2xpZCAkYmxhY2s7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcXG5cXG4gICAgLnR4dCB7XFxuICAgICAgY29sb3I6ICR3aGl0ZTtcXG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSB7XFxuICAgICAgJjpub3QoJltkaXNhYmxlZF0sICYuX2lzLWRpc2FibGVkKSB7XFxuICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcblxcbiAgICAgICAgICAudHh0IHtcXG4gICAgICAgICAgICBjb2xvcjogJGJsYWNrO1xcbiAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmX3NlY29uZGFyeSB7XFxuICAgIG1hcmdpbi1yaWdodDogMS42cmVtO1xcblxcbiAgICAmOjphZnRlciB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgZmxleDogMCAwIDIuNHJlbTtcXG4gICAgICB3aWR0aDogMi40cmVtO1xcbiAgICAgIGhlaWdodDogMi40cmVtO1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi9hc3NldHMvaW1hZ2VzL2ljb25zL2Fyci1zbS5zdmdcXFwiKTtcXG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMC42cmVtKTtcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcbiAgICB9XFxuXFxuICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICY6aG92ZXIge1xcbiAgICAgICAgJjo6YWZ0ZXIge1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmW2Rpc2FibGVkXSxcXG4gICYuX2lzLWRpc2FibGVkIHtcXG4gICAgYm9yZGVyOiAxLjVweCBzb2xpZCAkZ3JheVR4dDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGdyYXlUeHQ7XFxuICB9XFxuXFxufVxcblxcbi5jYXRhbG9nLWJ0biB7XFxuICBwYWRkaW5nOiAwLjhyZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAxLjJyZW07XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2x1bW4tZ2FwOiAxLjJyZW07XFxuICBoZWlnaHQ6IDZyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuXFxuICAmX19pY29uIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmbGV4OiAwIDAgNC40cmVtO1xcbiAgICB3aWR0aDogNC40cmVtO1xcbiAgICBoZWlnaHQ6IDQuNHJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgfVxcblxcbiAgJl9faWNvbi1pbWcge1xcbiAgICB3aWR0aDogMi40cmVtO1xcbiAgICBoZWlnaHQ6IDIuNHJlbTtcXG5cXG4gICAgJl9jcm9zcyB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBmbGV4OiAwIDAgNHJlbTtcXG4gICAgICB3aWR0aDogNHJlbTtcXG4gICAgICBoZWlnaHQ6IDRyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX3R4dCB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGNvbG9yOiAkd2hpdGU7XFxuICB9XFxufVwiLFwiLm9wdGlvbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcblxcbiAgJl9faW5wdXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XFxuXFxuICAgICY6Zm9jdXMgKyAub3B0aW9uX190eHQ6OmJlZm9yZSB7XFxuICAgIH1cXG4gICAgJjpjaGVja2VkICsgLm9wdGlvbl9fdHh0OjpiZWZvcmUge1xcbiAgICB9XFxuICAgICY6Y2hlY2tlZCArIC5vcHRpb25fX3R4dDo6YWZ0ZXIge1xcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX3R4dCB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGdhcDogMC44cmVtO1xcblxcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgICAgZmxleDogMCAwIDIuNHJlbTtcXG4gICAgICB3aWR0aDogMi40cmVtO1xcbiAgICAgIGhlaWdodDogMi40cmVtO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBib3JkZXI6IDEuNXB4IHNvbGlkICRibGFjaztcXG4gICAgfVxcbiAgICAmOjphZnRlciB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDAuNHJlbTtcXG4gICAgICB0b3A6IDAuNHJlbTtcXG4gICAgICB3aWR0aDogMS42cmVtO1xcbiAgICAgIGhlaWdodDogMS42cmVtO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcbiAgICB9XFxuICB9XFxufVxcblwiLFwiLmNoZWNrYm94IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcblxcbiAgJl9faW5wdXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHotaW5kZXg6IDI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XFxuXFxuICAgICY6Y2hlY2tlZCArIC5jaGVja2JveF9fdHh0IHtcXG4gICAgICAmOjpiZWZvcmUge1xcbiAgICAgICAgYm9yZGVyOiAxLjVweCBzb2xpZCAkYmxhY2s7XFxuICAgICAgfVxcbiAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmX190eHQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiAwLjhyZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG5cXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBmbGV4OiAwIDAgMi4ycmVtO1xcbiAgICAgIHdpZHRoOiAyLjJyZW07XFxuICAgICAgaGVpZ2h0OiAyLjJyZW07XFxuICAgICAgYm9yZGVyOiAxLjVweCBzb2xpZCAkZ3JheVR4dDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuICAgICAgdHJhbnNpdGlvbjogYm9yZGVyIDAuM3MgZWFzZTtcXG4gICAgfVxcblxcbiAgICAmOjphZnRlciB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHRvcDogMC41cmVtO1xcbiAgICAgIGxlZnQ6IDAuM3JlbTtcXG4gICAgICB3aWR0aDogMS42cmVtO1xcbiAgICAgIGhlaWdodDogMS42cmVtO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxuICAgIH1cXG4gIH1cXG59XFxuXCIsXCIuYnJlYWRjcnVtYnMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGNvbHVtbi1nYXA6IDIuNHJlbTtcXG5cXG4gICZfX2xpbmsge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGNvbG9yOiAkZ3JheVR4dDtcXG5cXG4gICAgJl9jaGFwdGVyIHtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAgICAgJjo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBmbGV4OiAwIDAgMi40cmVtO1xcbiAgICAgICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgICAgIGhlaWdodDogMi40cmVtO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYXJyLWdyYXkuc3ZnXFxcIik7XFxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDAuMnJlbTtcXG4gICAgICByaWdodDogLTEuMnJlbTtcXG4gICAgICBoZWlnaHQ6IDJyZW07XFxuICAgICAgd2lkdGg6IDEuMnB4O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5VHh0O1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fdHh0IHtcXG5cXG4gIH1cXG59XCIsXCIucGFnaW5hdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDIuNHJlbTtcXG5cXG4gICZfX2FyciB7XFxuICAgIGZsZXg6IDAgMCAyLjRyZW07XFxuICAgIHdpZHRoOiAyLjRyZW07XFxuICAgIGhlaWdodDogMi40cmVtO1xcblxcbiAgICBzdmcgcGF0aCB7XFxuICAgICAgZmlsbDogJGJsYWNrO1xcbiAgICB9XFxuXFxuICAgICYuX2lzLWRpc2FibGVkIHtcXG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgICBzdmcgcGF0aCB7XFxuICAgICAgICBmaWxsOiAkZ3JheVR4dDtcXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgJl9uZXh0IHtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX19udW1zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgY29sdW1uLWdhcDogMC40cmVtO1xcbiAgfVxcblxcbiAgJl9fbnVtIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBmbGV4OiAwIDAgNXJlbTtcXG4gICAgd2lkdGg6IDVyZW07XFxuICAgIGhlaWdodDogNXJlbTtcXG4gICAgY29sb3I6ICRncmF5VHh0O1xcblxcbiAgICAmLl9pcy1hY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5O1xcbiAgICAgIGNvbG9yOiAkYmxhY2s7XFxuICAgIH1cXG4gIH1cXG59XCIsXCIuYXJyb3ctYnRuIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleDogMCAwIDVyZW07XFxuICB3aWR0aDogNXJlbTtcXG4gIGhlaWdodDogNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xcblxcbiAgJl9uZXh0IHtcXG4gICAgc3ZnIHtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICB9XFxuICB9XFxuXFxuICAmOmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG5cXG4gICAgc3ZnIHBhdGgge1xcbiAgICAgIGZpbGw6ICR3aGl0ZTtcXG4gICAgfVxcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgaGVpZ2h0OiAyLjRyZW07XFxuXFxuICAgIHBhdGgge1xcbiAgICAgIGZpbGw6ICRibGFjaztcXG4gICAgICB0cmFuc2l0aW9uOiBmaWxsIDAuM3MgZWFzZTtcXG4gICAgfVxcbiAgfVxcbn1cIixcIi5pLWxpbmsge1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBjb2x1bW4tZ2FwOiAwLjlyZW07XFxuXFxuICBzdmcge1xcbiAgICBmbGV4OiAwIDAgMi40cmVtO1xcbiAgICB3aWR0aDogMi40cmVtO1xcbiAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAuMDVyZW0pO1xcbiAgfVxcbn1cIixudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaW1wbGViYXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpbXBsZWJhci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG4iLCJpbXBvcnQgdHJpbW1lZEVuZEluZGV4IGZyb20gJy4vX3RyaW1tZWRFbmRJbmRleC5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW1TdGFydCA9IC9eXFxzKy87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udHJpbWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byB0cmltLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgdHJpbW1lZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUcmltKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nXG4gICAgPyBzdHJpbmcuc2xpY2UoMCwgdHJpbW1lZEVuZEluZGV4KHN0cmluZykgKyAxKS5yZXBsYWNlKHJlVHJpbVN0YXJ0LCAnJylcbiAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRyaW07XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCIvKiogVXNlZCB0byBtYXRjaCBhIHNpbmdsZSB3aGl0ZXNwYWNlIGNoYXJhY3Rlci4gKi9cbnZhciByZVdoaXRlc3BhY2UgPSAvXFxzLztcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltRW5kYCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IG5vbi13aGl0ZXNwYWNlXG4gKiBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiB0cmltbWVkRW5kSW5kZXgoc3RyaW5nKSB7XG4gIHZhciBpbmRleCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0gJiYgcmVXaGl0ZXNwYWNlLnRlc3Qoc3RyaW5nLmNoYXJBdChpbmRleCkpKSB7fVxuICByZXR1cm4gaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyaW1tZWRFbmRJbmRleDtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBub3cgZnJvbSAnLi9ub3cuanMnO1xuaW1wb3J0IHRvTnVtYmVyIGZyb20gJy4vdG9OdW1iZXIuanMnO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVib3VuY2U7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N5bWJvbDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3c7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi9kZWJvdW5jZS5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiaW1wb3J0IGJhc2VUcmltIGZyb20gJy4vX2Jhc2VUcmltLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IGJhc2VUcmltKHZhbHVlKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvTnVtYmVyO1xuIiwiLyoqXG4gKiBzaW1wbGViYXItY29yZSAtIHYxLjIuNFxuICogU2Nyb2xsYmFycywgc2ltcGxlci5cbiAqIGh0dHBzOi8vZ3JzbXRvLmdpdGh1Yi5pby9zaW1wbGViYXIvXG4gKlxuICogTWFkZSBieSBBZHJpZW4gRGVuYXQgZnJvbSBhIGZvcmsgYnkgSm9uYXRoYW4gTmljb2xcbiAqIFVuZGVyIE1JVCBMaWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgdGhyb3R0bGUsIGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCBjYW5Vc2VET00gZnJvbSAnY2FuLXVzZS1kb20nO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XG5cbnZhciBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IG51bGw7XG52YXIgY2FjaGVkRGV2aWNlUGl4ZWxSYXRpbyA9IG51bGw7XG5pZiAoY2FuVXNlRE9NKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNhY2hlZERldmljZVBpeGVsUmF0aW8gIT09IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgICAgICBjYWNoZWREZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgICBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNjcm9sbGJhcldpZHRoKCkge1xuICAgIGlmIChjYWNoZWRTY3JvbGxiYXJXaWR0aCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY2FjaGVkU2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNjcm9sbGJhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdmFyIGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyJyk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYm94KTtcbiAgICAgICAgdmFyIHdpZHRoID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGJveCk7XG4gICAgICAgIGNhY2hlZFNjcm9sbGJhcldpZHRoID0gd2lkdGg7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRTY3JvbGxiYXJXaWR0aDtcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudFdpbmRvdyQxKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQgfHxcbiAgICAgICAgIWVsZW1lbnQub3duZXJEb2N1bWVudCB8fFxuICAgICAgICAhZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50RG9jdW1lbnQkMShlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5vd25lckRvY3VtZW50O1xufVxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHJldHJpZXZlIG9wdGlvbnMgZnJvbSBlbGVtZW50IGF0dHJpYnV0ZXNcbnZhciBnZXRPcHRpb25zJDEgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGluaXRpYWxPYmogPSB7fTtcbiAgICB2YXIgb3B0aW9ucyA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChvYmosIGZ1bmN0aW9uIChhY2MsIGF0dHJpYnV0ZSkge1xuICAgICAgICB2YXIgb3B0aW9uID0gYXR0cmlidXRlLm5hbWUubWF0Y2goL2RhdGEtc2ltcGxlYmFyLSguKykvKTtcbiAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IG9wdGlvblsxXS5yZXBsYWNlKC9cXFcrKC4pL2csIGZ1bmN0aW9uIChfLCBjaHIpIHsgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmFsc2UnOlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGluaXRpYWxPYmopO1xuICAgIHJldHVybiBvcHRpb25zO1xufTtcbmZ1bmN0aW9uIGFkZENsYXNzZXMkMShlbCwgY2xhc3Nlcykge1xuICAgIHZhciBfYTtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm47XG4gICAgKF9hID0gZWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIGNsYXNzZXMuc3BsaXQoJyAnKSk7XG59XG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzJDEoZWwsIGNsYXNzZXMpIHtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm47XG4gICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjbGFzc05hbWVzVG9RdWVyeSQxKGNsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gXCIuXCIuY29uY2F0KGNsYXNzTmFtZXMuc3BsaXQoJyAnKS5qb2luKCcuJykpO1xufVxuXG52YXIgaGVscGVycyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgZ2V0RWxlbWVudFdpbmRvdzogZ2V0RWxlbWVudFdpbmRvdyQxLFxuICAgIGdldEVsZW1lbnREb2N1bWVudDogZ2V0RWxlbWVudERvY3VtZW50JDEsXG4gICAgZ2V0T3B0aW9uczogZ2V0T3B0aW9ucyQxLFxuICAgIGFkZENsYXNzZXM6IGFkZENsYXNzZXMkMSxcbiAgICByZW1vdmVDbGFzc2VzOiByZW1vdmVDbGFzc2VzJDEsXG4gICAgY2xhc3NOYW1lc1RvUXVlcnk6IGNsYXNzTmFtZXNUb1F1ZXJ5JDFcbn0pO1xuXG52YXIgZ2V0RWxlbWVudFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3ckMSwgZ2V0RWxlbWVudERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50JDEsIGdldE9wdGlvbnMgPSBnZXRPcHRpb25zJDEsIGFkZENsYXNzZXMgPSBhZGRDbGFzc2VzJDEsIHJlbW92ZUNsYXNzZXMgPSByZW1vdmVDbGFzc2VzJDEsIGNsYXNzTmFtZXNUb1F1ZXJ5ID0gY2xhc3NOYW1lc1RvUXVlcnkkMTtcbnZhciBTaW1wbGVCYXJDb3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbXBsZUJhckNvcmUoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5taW5TY3JvbGxiYXJXaWR0aCA9IDIwO1xuICAgICAgICB0aGlzLnN0b3BTY3JvbGxEZWxheSA9IDE3NTtcbiAgICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW91c2VFbnRlcmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjcm9sbFhUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2Nyb2xsWVRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IG51bGw7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwgPSBudWxsO1xuICAgICAgICB0aGlzLm1hc2tFbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMucnRsSGVscGVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbFN0eWxlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNSdGwgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdXNlWCA9IDA7XG4gICAgICAgIHRoaXMubW91c2VZID0gMDtcbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vblN0b3BTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPbiBzY3JvbGwgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25TY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KF90aGlzLmVsKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuc2Nyb2xsWFRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuc2Nyb2xsWCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWFRpY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5zY3JvbGxZVGlja2luZykge1xuICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5zY3JvbGxZKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxZVGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuc2Nyb2xsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIF90aGlzLm9uU3RvcFNjcm9sbGluZygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjcm9sbFggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wb3NpdGlvblNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWFRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY3JvbGxZID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueS5pc092ZXJmbG93aW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNjcm9sbFlUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29uU3RvcFNjcm9sbGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuc2Nyb2xsaW5nKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc01vdXNlRW50ZXJpbmcpIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLm1vdXNlRW50ZXJlZCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvd1Njcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc01vdXNlRW50ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMub25Nb3VzZUVudGVyZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZUVudGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLm1vdXNlRW50ZXJlZCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlU2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pc01vdXNlRW50ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMubW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgX3RoaXMubW91c2VZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueC5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueC5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbk1vdXNlTW92ZUZvckF4aXMoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmVGb3JBeGlzKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTW91c2VMZWF2ZUZvckF4aXMoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZUxlYXZlRm9yQXhpcygneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMubW91c2VYID0gLTE7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZVkgPSAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSBzY3JvbGxiYXJXaWR0aCBpbiBjYXNlIGl0J3MgYSB6b29tXG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxiYXJXaWR0aCA9IF90aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICBfdGhpcy5oaWRlTmF0aXZlU2Nyb2xsYmFyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Qb2ludGVyRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5heGlzLngudHJhY2suZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy55LnRyYWNrLmVsIHx8XG4gICAgICAgICAgICAgICAgIV90aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy55LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgaXNXaXRoaW5UcmFja1hCb3VuZHMsIGlzV2l0aGluVHJhY2tZQm91bmRzO1xuICAgICAgICAgICAgX3RoaXMuYXhpcy54LnRyYWNrLnJlY3QgPSBfdGhpcy5heGlzLngudHJhY2suZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfdGhpcy5heGlzLnkudHJhY2sucmVjdCA9IF90aGlzLmF4aXMueS50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaXNXaXRoaW5UcmFja1hCb3VuZHMgPSBfdGhpcy5pc1dpdGhpbkJvdW5kcyhfdGhpcy5heGlzLngudHJhY2sucmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy55LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlzV2l0aGluVHJhY2tZQm91bmRzID0gX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy55LnRyYWNrLnJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgYW55IHBvaW50ZXIgZXZlbnQgaXMgY2FsbGVkIG9uIHRoZSBzY3JvbGxiYXJcbiAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWEJvdW5kcyB8fCBpc1dpdGhpblRyYWNrWUJvdW5kcykge1xuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZXZlbnQgbGVha2luZ1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJyAmJiBlLnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWEJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXhpcy54LnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzV2l0aGluQm91bmRzKF90aGlzLmF4aXMueC5zY3JvbGxiYXIucmVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkRyYWdTdGFydChlLCAneCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25UcmFja0NsaWNrKGUsICd4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2l0aGluVHJhY2tZQm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy55LnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uRHJhZ1N0YXJ0KGUsICd5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblRyYWNrQ2xpY2soZSwgJ3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYWcgc2Nyb2xsYmFyIGhhbmRsZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kcmFnID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmRyYWdnZWRBeGlzIHx8ICFfdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciBldmVudE9mZnNldDtcbiAgICAgICAgICAgIHZhciB0cmFjayA9IF90aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnRyYWNrO1xuICAgICAgICAgICAgdmFyIHRyYWNrU2l6ZSA9IChfYiA9IChfYSA9IHRyYWNrLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDA7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsYmFyID0gX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2Nyb2xsYmFyO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRTaXplID0gKF9kID0gKF9jID0gX3RoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbFNpemVBdHRyXSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMDtcbiAgICAgICAgICAgIHZhciBob3N0U2l6ZSA9IHBhcnNlSW50KChfZiA9IChfZSA9IF90aGlzLmVsU3R5bGVzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAnMHB4JywgMTApO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZzZXQgPSBlLnBhZ2VZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZzZXQgPSBlLnBhZ2VYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGhvdyBmYXIgdGhlIHVzZXIncyBtb3VzZSBpcyBmcm9tIHRoZSB0b3AvbGVmdCBvZiB0aGUgc2Nyb2xsYmFyIChtaW51cyB0aGUgZHJhZ09mZnNldCkuXG4gICAgICAgICAgICB2YXIgZHJhZ1BvcyA9IGV2ZW50T2Zmc2V0IC1cbiAgICAgICAgICAgICAgICAoKF9oID0gKF9nID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLm9mZnNldEF0dHJdKSAhPT0gbnVsbCAmJiBfaCAhPT0gdm9pZCAwID8gX2ggOiAwKSAtXG4gICAgICAgICAgICAgICAgX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uZHJhZ09mZnNldDtcbiAgICAgICAgICAgIGRyYWdQb3MgPSBfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3gnICYmIF90aGlzLmlzUnRsXG4gICAgICAgICAgICAgICAgPyAoKF9rID0gKF9qID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNpemVBdHRyXSkgIT09IG51bGwgJiYgX2sgIT09IHZvaWQgMCA/IF9rIDogMCkgLVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxiYXIuc2l6ZSAtXG4gICAgICAgICAgICAgICAgICAgIGRyYWdQb3NcbiAgICAgICAgICAgICAgICA6IGRyYWdQb3M7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBtb3VzZSBwb3NpdGlvbiBpbnRvIGEgcGVyY2VudGFnZSBvZiB0aGUgc2Nyb2xsYmFyIGhlaWdodC93aWR0aC5cbiAgICAgICAgICAgIHZhciBkcmFnUGVyYyA9IGRyYWdQb3MgLyAodHJhY2tTaXplIC0gc2Nyb2xsYmFyLnNpemUpO1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHRoZSBjb250ZW50IGJ5IHRoZSBzYW1lIHBlcmNlbnRhZ2UuXG4gICAgICAgICAgICB2YXIgc2Nyb2xsUG9zID0gZHJhZ1BlcmMgKiAoY29udGVudFNpemUgLSBob3N0U2l6ZSk7XG4gICAgICAgICAgICAvLyBGaXggYnJvd3NlcnMgaW5jb25zaXN0ZW5jeSBvbiBSVExcbiAgICAgICAgICAgIGlmIChfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3gnICYmIF90aGlzLmlzUnRsKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsUG9zID0gKChfbCA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wuaXNTY3JvbGxpbmdUb05lZ2F0aXZlKVxuICAgICAgICAgICAgICAgICAgICA/IC1zY3JvbGxQb3NcbiAgICAgICAgICAgICAgICAgICAgOiBzY3JvbGxQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jb250ZW50V3JhcHBlckVsW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbE9mZnNldEF0dHJdID1cbiAgICAgICAgICAgICAgICBzY3JvbGxQb3M7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmQgc2Nyb2xsIGhhbmRsZSBkcmFnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRW5kRHJhZyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgZWxEb2N1bWVudCA9IGdldEVsZW1lbnREb2N1bWVudChfdGhpcy5lbCk7XG4gICAgICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KF90aGlzLmVsKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLmRyYWdnaW5nKTtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX3RoaXMuZHJhZywgdHJ1ZSk7XG4gICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfdGhpcy5vbkVuZERyYWcsIHRydWUpO1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPSBlbFdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlc2UgYXN5bmNocm9ub3VzbHkgc28gd2Ugc3RpbGwgc3VwcHJlc3MgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGVkIHNpbXVsdGFuZW91c2x5IHdpdGggbW91c2V1cC5cbiAgICAgICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgX3RoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXIgdG8gaWdub3JlIGNsaWNrIGV2ZW50cyBkdXJpbmcgZHJhZ1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcmV2ZW50Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zLmNsYXNzTmFtZXMpLCBvcHRpb25zLmNsYXNzTmFtZXMpO1xuICAgICAgICB0aGlzLmF4aXMgPSB7XG4gICAgICAgICAgICB4OiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0QXR0cjogJ3Njcm9sbExlZnQnLFxuICAgICAgICAgICAgICAgIHNpemVBdHRyOiAnd2lkdGgnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFNpemVBdHRyOiAnc2Nyb2xsV2lkdGgnLFxuICAgICAgICAgICAgICAgIG9mZnNldFNpemVBdHRyOiAnb2Zmc2V0V2lkdGgnLFxuICAgICAgICAgICAgICAgIG9mZnNldEF0dHI6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvd0F0dHI6ICdvdmVyZmxvd1gnLFxuICAgICAgICAgICAgICAgIGRyYWdPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaXNPdmVyZmxvd2luZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb3JjZVZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRyYWNrOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsYmFyOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5OiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0QXR0cjogJ3Njcm9sbFRvcCcsXG4gICAgICAgICAgICAgICAgc2l6ZUF0dHI6ICdoZWlnaHQnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFNpemVBdHRyOiAnc2Nyb2xsSGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBvZmZzZXRTaXplQXR0cjogJ29mZnNldEhlaWdodCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0QXR0cjogJ3RvcCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dBdHRyOiAnb3ZlcmZsb3dZJyxcbiAgICAgICAgICAgICAgICBkcmFnT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGlzT3ZlcmZsb3dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cmFjazogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbGJhcjogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbCAhPT0gJ29iamVjdCcgfHwgIXRoaXMuZWwubm9kZU5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCB0byBTaW1wbGVCYXIgbXVzdCBiZSBhbiBIVE1MIGVsZW1lbnQgaW5zdGVhZCBvZiBcIi5jb25jYXQodGhpcy5lbCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aHJvdHRsZSh0aGlzLl9vbk1vdXNlTW92ZSwgNjQpO1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplID0gZGVib3VuY2UodGhpcy5fb25XaW5kb3dSZXNpemUsIDY0LCB7IGxlYWRpbmc6IHRydWUgfSk7XG4gICAgICAgIHRoaXMub25TdG9wU2Nyb2xsaW5nID0gZGVib3VuY2UodGhpcy5fb25TdG9wU2Nyb2xsaW5nLCB0aGlzLnN0b3BTY3JvbGxEZWxheSk7XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQgPSBkZWJvdW5jZSh0aGlzLl9vbk1vdXNlRW50ZXJlZCwgdGhpcy5zdG9wU2Nyb2xsRGVsYXkpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGVscGVyIHRvIGZpeCBicm93c2VycyBpbmNvbnNpc3RlbmN5IG9uIFJUTDpcbiAgICAgKiAgLSBGaXJlZm94IGludmVydHMgdGhlIHNjcm9sbGJhciBpbml0aWFsIHBvc2l0aW9uXG4gICAgICogIC0gSUUxMSBpbnZlcnRzIGJvdGggc2Nyb2xsYmFyIHBvc2l0aW9uIGFuZCBzY3JvbGxpbmcgb2Zmc2V0XG4gICAgICogRGlyZWN0bHkgaW5zcGlyZWQgYnkgQEtpbmdTb3JhJ3MgT3ZlcmxheVNjcm9sbGJhcnMgaHR0cHM6Ly9naXRodWIuY29tL0tpbmdTb3JhL092ZXJsYXlTY3JvbGxiYXJzL2Jsb2IvbWFzdGVyL2pzL092ZXJsYXlTY3JvbGxiYXJzLmpzI0wxNjM0XG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkdW1teURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkdW1teURpdi5pbm5lckhUTUwgPVxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaW1wbGViYXItZHVtbXktc2Nyb2xsYmFyLXNpemVcIj48ZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgICAgIHZhciBzY3JvbGxiYXJEdW1teUVsID0gZHVtbXlEaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIHZhciBkdW1teUNoaWxkID0gc2Nyb2xsYmFyRHVtbXlFbCA9PT0gbnVsbCB8fCBzY3JvbGxiYXJEdW1teUVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY3JvbGxiYXJEdW1teUVsLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAoIWR1bW15Q2hpbGQpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgc2Nyb2xsYmFyRHVtbXlFbC5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgICAgdmFyIGR1bW15Q29udGFpbmVyT2Zmc2V0ID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoc2Nyb2xsYmFyRHVtbXlFbCk7XG4gICAgICAgIHZhciBkdW1teUNoaWxkT2Zmc2V0ID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoZHVtbXlDaGlsZCk7XG4gICAgICAgIHNjcm9sbGJhckR1bW15RWwuc2Nyb2xsTGVmdCA9IC05OTk7XG4gICAgICAgIHZhciBkdW1teUNoaWxkT2Zmc2V0QWZ0ZXJTY3JvbGwgPSBTaW1wbGVCYXJDb3JlLmdldE9mZnNldChkdW1teUNoaWxkKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzID0ge1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lcyBpZiB0aGUgc2Nyb2xsaW5nIGlzIHJlc3BvbmRpbmcgd2l0aCBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgICAgIGlzU2Nyb2xsT3JpZ2luQXRaZXJvOiBkdW1teUNvbnRhaW5lck9mZnNldC5sZWZ0ICE9PSBkdW1teUNoaWxkT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmVzIGlmIHRoZSBvcmlnaW4gc2Nyb2xsYmFyIHBvc2l0aW9uIGlzIGludmVydGVkIG9yIG5vdCAocG9zaXRpb25lZCBvbiBsZWZ0IG9yIHJpZ2h0KVxuICAgICAgICAgICAgaXNTY3JvbGxpbmdUb05lZ2F0aXZlOiBkdW1teUNoaWxkT2Zmc2V0LmxlZnQgIT09IGR1bW15Q2hpbGRPZmZzZXRBZnRlclNjcm9sbC5sZWZ0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnM7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRTY3JvbGxiYXJXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVHJ5L2NhdGNoIGZvciBGRiA1NiB0aHJvd2luZyBvbiB1bmRlZmluZWQgY29tcHV0ZWRTdHlsZXNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIERldGVjdCBicm93c2VycyBzdXBwb3J0aW5nIENTUyBzY3JvbGxiYXIgc3R5bGluZyBhbmQgZG8gbm90IGNhbGN1bGF0ZVxuICAgICAgICAgICAgaWYgKCh0aGlzLmNvbnRlbnRXcmFwcGVyRWwgJiZcbiAgICAgICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuY29udGVudFdyYXBwZXJFbCwgJzo6LXdlYmtpdC1zY3JvbGxiYXInKVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGxheSA9PT0gJ25vbmUnKSB8fFxuICAgICAgICAgICAgICAgICdzY3JvbGxiYXJXaWR0aCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8XG4gICAgICAgICAgICAgICAgJy1tcy1vdmVyZmxvdy1zdHlsZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KGVsKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyhlbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICtcbiAgICAgICAgICAgICAgICAoZWxXaW5kb3cucGFnZVlPZmZzZXQgfHwgZWxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArXG4gICAgICAgICAgICAgICAgKGVsV2luZG93LnBhZ2VYT2Zmc2V0IHx8IGVsRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBXZSBzdG9wIGhlcmUgb24gc2VydmVyLXNpZGVcbiAgICAgICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RE9NKCk7XG4gICAgICAgICAgICB0aGlzLnJ0bEhlbHBlcnMgPSBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaW5pdERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gYXNzdW1lIHRoYXQgZWxlbWVudCBoYXMgaGlzIERPTSBhbHJlYWR5IGluaXRpYXRlZFxuICAgICAgICB0aGlzLndyYXBwZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMud3JhcHBlcikpO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNjcm9sbGFibGVOb2RlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5jb250ZW50V3JhcHBlcikpO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuY29udGVudE5vZGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmNvbnRlbnRFbCkpO1xuICAgICAgICB0aGlzLm9mZnNldEVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5vZmZzZXQpKTtcbiAgICAgICAgdGhpcy5tYXNrRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLm1hc2spKTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy53cmFwcGVyRWwsIGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcikpO1xuICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKSk7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlckVsKSk7XG4gICAgICAgIHRoaXMuYXhpcy54LnRyYWNrLmVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy5lbCwgXCJcIi5jb25jYXQoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnRyYWNrKSkuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5ob3Jpem9udGFsKSkpO1xuICAgICAgICB0aGlzLmF4aXMueS50cmFjay5lbCA9IHRoaXMuZmluZENoaWxkKHRoaXMuZWwsIFwiXCIuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy50cmFjaykpLmNvbmNhdChjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMudmVydGljYWwpKSk7XG4gICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbCA9XG4gICAgICAgICAgICAoKF9hID0gdGhpcy5heGlzLngudHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxiYXIpKSkgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsID1cbiAgICAgICAgICAgICgoX2IgPSB0aGlzLmF4aXMueS50cmFjay5lbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcikpKSB8fCBudWxsO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy52aXNpYmxlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25Nb3VzZUVudGVyKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMub25Qb2ludGVyRXZlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VMZWF2ZSk7XG4gICAgICAgIChfYSA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgICAgICAvLyBCcm93c2VyIHpvb20gdHJpZ2dlcnMgYSB3aW5kb3cgcmVzaXplXG4gICAgICAgIGVsV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudEVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAod2luZG93LlJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICAvLyBIYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9SZXNpemVPYnNlcnZlci9pc3N1ZXMvMzhcbiAgICAgICAgICAgIHZhciByZXNpemVPYnNlcnZlclN0YXJ0ZWRfMSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJlc2l6ZU9ic2VydmVyID0gZWxXaW5kb3cuUmVzaXplT2JzZXJ2ZXIgfHwgUmVzaXplT2JzZXJ2ZXI7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IHJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc2l6ZU9ic2VydmVyU3RhcnRlZF8xKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzaXplT2JzZXJ2ZXJTdGFydGVkXzEgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCB0byBkZXRlY3QgaG9yaXpvbnRhbCBzY3JvbGwuIFZlcnRpY2FsIHNjcm9sbCBvbmx5IG5lZWRzIHRoZSByZXNpemVPYnNlcnZlci5cbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbmV3IGVsV2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRlbnRFbCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5yZWNhbGN1bGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50RWwgfHxcbiAgICAgICAgICAgICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwgfHxcbiAgICAgICAgICAgICF0aGlzLndyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXRoaXMucGxhY2Vob2xkZXJFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5lbFN0eWxlcyA9IGVsV2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbCk7XG4gICAgICAgIHRoaXMuaXNSdGwgPSB0aGlzLmVsU3R5bGVzLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgICAgIHZhciBjb250ZW50RWxPZmZzZXRXaWR0aCA9IHRoaXMuY29udGVudEVsLm9mZnNldFdpZHRoO1xuICAgICAgICB2YXIgaXNIZWlnaHRBdXRvID0gdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbC5vZmZzZXRIZWlnaHQgPD0gMTtcbiAgICAgICAgdmFyIGlzV2lkdGhBdXRvID0gdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbC5vZmZzZXRXaWR0aCA8PSAxIHx8IGNvbnRlbnRFbE9mZnNldFdpZHRoID4gMDtcbiAgICAgICAgdmFyIGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRXaWR0aCA9IHRoaXMuY29udGVudFdyYXBwZXJFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgdmFyIGVsT3ZlcmZsb3dYID0gdGhpcy5lbFN0eWxlcy5vdmVyZmxvd1g7XG4gICAgICAgIHZhciBlbE92ZXJmbG93WSA9IHRoaXMuZWxTdHlsZXMub3ZlcmZsb3dZO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5wYWRkaW5nID0gXCJcIi5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nVG9wLCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1JpZ2h0LCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0JvdHRvbSwgXCIgXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdMZWZ0KTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwuc3R5bGUubWFyZ2luID0gXCItXCIuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1RvcCwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nUmlnaHQsIFwiIC1cIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0JvdHRvbSwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nTGVmdCk7XG4gICAgICAgIHZhciBjb250ZW50RWxTY3JvbGxIZWlnaHQgPSB0aGlzLmNvbnRlbnRFbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIHZhciBjb250ZW50RWxTY3JvbGxXaWR0aCA9IHRoaXMuY29udGVudEVsLnNjcm9sbFdpZHRoO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwuc3R5bGUuaGVpZ2h0ID0gaXNIZWlnaHRBdXRvID8gJ2F1dG8nIDogJzEwMCUnO1xuICAgICAgICAvLyBEZXRlcm1pbmUgcGxhY2Vob2xkZXIgc2l6ZVxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwuc3R5bGUud2lkdGggPSBpc1dpZHRoQXV0b1xuICAgICAgICAgICAgPyBcIlwiLmNvbmNhdChjb250ZW50RWxPZmZzZXRXaWR0aCB8fCBjb250ZW50RWxTY3JvbGxXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgOiAnYXV0byc7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbC5zdHlsZS5oZWlnaHQgPSBcIlwiLmNvbmNhdChjb250ZW50RWxTY3JvbGxIZWlnaHQsIFwicHhcIik7XG4gICAgICAgIHZhciBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlckVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBjb250ZW50RWxPZmZzZXRXaWR0aCAhPT0gMCAmJiBjb250ZW50RWxTY3JvbGxXaWR0aCA+IGNvbnRlbnRFbE9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGNvbnRlbnRFbFNjcm9sbEhlaWdodCA+IGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRIZWlnaHQ7XG4gICAgICAgIC8vIFNldCBpc092ZXJmbG93aW5nIHRvIGZhbHNlIGlmIHVzZXIgZXhwbGljaXRlbHkgc2V0IGhpZGRlbiBvdmVyZmxvd1xuICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGVsT3ZlcmZsb3dYID09PSAnaGlkZGVuJyA/IGZhbHNlIDogdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZztcbiAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBlbE92ZXJmbG93WSA9PT0gJ2hpZGRlbicgPyBmYWxzZSA6IHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmc7XG4gICAgICAgIHRoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSAneCcgfHwgdGhpcy5vcHRpb25zLmZvcmNlVmlzaWJsZSA9PT0gdHJ1ZTtcbiAgICAgICAgdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JjZVZpc2libGUgPT09ICd5JyB8fCB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGVOYXRpdmVTY3JvbGxiYXIoKTtcbiAgICAgICAgLy8gU2V0IGlzT3ZlcmZsb3dpbmcgdG8gZmFsc2UgaWYgc2Nyb2xsYmFyIGlzIG5vdCBuZWNlc3NhcnkgKGNvbnRlbnQgaXMgc2hvcnRlciB0aGFuIG9mZnNldClcbiAgICAgICAgdmFyIG9mZnNldEZvclhTY3JvbGxiYXIgPSB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nXG4gICAgICAgICAgICA/IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgdmFyIG9mZnNldEZvcllTY3JvbGxiYXIgPSB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nXG4gICAgICAgICAgICA/IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nICYmXG4gICAgICAgICAgICAgICAgY29udGVudEVsU2Nyb2xsV2lkdGggPiBjb250ZW50V3JhcHBlckVsT2Zmc2V0V2lkdGggLSBvZmZzZXRGb3JZU2Nyb2xsYmFyO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgJiZcbiAgICAgICAgICAgICAgICBjb250ZW50RWxTY3JvbGxIZWlnaHQgPlxuICAgICAgICAgICAgICAgICAgICBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0IC0gb2Zmc2V0Rm9yWFNjcm9sbGJhcjtcbiAgICAgICAgdGhpcy5heGlzLnguc2Nyb2xsYmFyLnNpemUgPSB0aGlzLmdldFNjcm9sbGJhclNpemUoJ3gnKTtcbiAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnNpemUgPSB0aGlzLmdldFNjcm9sbGJhclNpemUoJ3knKTtcbiAgICAgICAgaWYgKHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbC5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KHRoaXMuYXhpcy54LnNjcm9sbGJhci5zaXplLCBcInB4XCIpO1xuICAgICAgICBpZiAodGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsKVxuICAgICAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHRoaXMuYXhpcy55LnNjcm9sbGJhci5zaXplLCBcInB4XCIpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uU2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgdGhpcy50b2dnbGVUcmFja1Zpc2liaWxpdHkoJ3gnKTtcbiAgICAgICAgdGhpcy50b2dnbGVUcmFja1Zpc2liaWxpdHkoJ3knKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgc2l6ZVxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbGJhclNpemUgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgaWYgKCF0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fCAhdGhpcy5jb250ZW50RWwpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudEVsW3RoaXMuYXhpc1theGlzXS5zY3JvbGxTaXplQXR0cl07XG4gICAgICAgIHZhciB0cmFja1NpemUgPSAoX2IgPSAoX2EgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0U2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyUmF0aW8gPSB0cmFja1NpemUgLyBjb250ZW50U2l6ZTtcbiAgICAgICAgdmFyIHNjcm9sbGJhclNpemU7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgaGVpZ2h0L3Bvc2l0aW9uIG9mIGRyYWcgaGFuZGxlLlxuICAgICAgICBzY3JvbGxiYXJTaXplID0gTWF0aC5tYXgofn4oc2Nyb2xsYmFyUmF0aW8gKiB0cmFja1NpemUpLCB0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWluU2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWF4U2l6ZSkge1xuICAgICAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IE1hdGgubWluKHNjcm9sbGJhclNpemUsIHRoaXMub3B0aW9ucy5zY3JvbGxiYXJNYXhTaXplKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2Nyb2xsYmFyU2l6ZTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnBvc2l0aW9uU2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgaWYgKCF0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fFxuICAgICAgICAgICAgIXRoaXMuY29udGVudFdyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXNjcm9sbGJhci5lbCB8fFxuICAgICAgICAgICAgIXRoaXMuZWxTdHlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWxbdGhpcy5heGlzW2F4aXNdLnNjcm9sbFNpemVBdHRyXTtcbiAgICAgICAgdmFyIHRyYWNrU2l6ZSA9ICgoX2EgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0U2l6ZUF0dHJdKSB8fCAwO1xuICAgICAgICB2YXIgaG9zdFNpemUgPSBwYXJzZUludCh0aGlzLmVsU3R5bGVzW3RoaXMuYXhpc1theGlzXS5zaXplQXR0cl0sIDEwKTtcbiAgICAgICAgdmFyIHNjcm9sbE9mZnNldCA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl07XG4gICAgICAgIHNjcm9sbE9mZnNldCA9XG4gICAgICAgICAgICBheGlzID09PSAneCcgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzUnRsICYmXG4gICAgICAgICAgICAgICAgKChfYiA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaXNTY3JvbGxPcmlnaW5BdFplcm8pXG4gICAgICAgICAgICAgICAgPyAtc2Nyb2xsT2Zmc2V0XG4gICAgICAgICAgICAgICAgOiBzY3JvbGxPZmZzZXQ7XG4gICAgICAgIGlmIChheGlzID09PSAneCcgJiYgdGhpcy5pc1J0bCkge1xuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gKChfYyA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaXNTY3JvbGxpbmdUb05lZ2F0aXZlKVxuICAgICAgICAgICAgICAgID8gc2Nyb2xsT2Zmc2V0XG4gICAgICAgICAgICAgICAgOiAtc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY3JvbGxQb3VyY2VudCA9IHNjcm9sbE9mZnNldCAvIChjb250ZW50U2l6ZSAtIGhvc3RTaXplKTtcbiAgICAgICAgdmFyIGhhbmRsZU9mZnNldCA9IH5+KCh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSkgKiBzY3JvbGxQb3VyY2VudCk7XG4gICAgICAgIGhhbmRsZU9mZnNldCA9XG4gICAgICAgICAgICBheGlzID09PSAneCcgJiYgdGhpcy5pc1J0bFxuICAgICAgICAgICAgICAgID8gLWhhbmRsZU9mZnNldCArICh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSlcbiAgICAgICAgICAgICAgICA6IGhhbmRsZU9mZnNldDtcbiAgICAgICAgc2Nyb2xsYmFyLmVsLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICBheGlzID09PSAneCdcbiAgICAgICAgICAgICAgICA/IFwidHJhbnNsYXRlM2QoXCIuY29uY2F0KGhhbmRsZU9mZnNldCwgXCJweCwgMCwgMClcIilcbiAgICAgICAgICAgICAgICA6IFwidHJhbnNsYXRlM2QoMCwgXCIuY29uY2F0KGhhbmRsZU9mZnNldCwgXCJweCwgMClcIik7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS50b2dnbGVUcmFja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5heGlzW2F4aXNdLnRyYWNrLmVsO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbDtcbiAgICAgICAgaWYgKCF0cmFjayB8fCAhc2Nyb2xsYmFyIHx8ICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fCB0aGlzLmF4aXNbYXhpc10uZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICB0cmFjay5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlW3RoaXMuYXhpc1theGlzXS5vdmVyZmxvd0F0dHJdID0gJ3Njcm9sbCc7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJcIi5jb25jYXQodGhpcy5jbGFzc05hbWVzLnNjcm9sbGFibGUsIFwiLVwiKS5jb25jYXQoYXhpcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhY2suc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlW3RoaXMuYXhpc1theGlzXS5vdmVyZmxvd0F0dHJdID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJcIi5jb25jYXQodGhpcy5jbGFzc05hbWVzLnNjcm9sbGFibGUsIFwiLVwiKS5jb25jYXQoYXhpcykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV2ZW4gaWYgZm9yY2VWaXNpYmxlIGlzIGVuYWJsZWQsIHNjcm9sbGJhciBpdHNlbGYgc2hvdWxkIGJlIGhpZGRlblxuICAgICAgICBpZiAodGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgIHNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5zaG93U2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyAmJiAhdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLnZpc2libGUpO1xuICAgICAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5oaWRlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyAmJiB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgICAgICB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5oaWRlTmF0aXZlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMub2Zmc2V0RWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMub2Zmc2V0RWwuc3R5bGVbdGhpcy5pc1J0bCA/ICdsZWZ0JyA6ICdyaWdodCddID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBcIi1cIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgICAgIDogJzBweCc7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwuc3R5bGUuYm90dG9tID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBcIi1cIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgICAgIDogJzBweCc7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbk1vdXNlTW92ZUZvckF4aXMgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIGN1cnJlbnRBeGlzID0gdGhpcy5heGlzW2F4aXNdO1xuICAgICAgICBpZiAoIWN1cnJlbnRBeGlzLnRyYWNrLmVsIHx8ICFjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGN1cnJlbnRBeGlzLnRyYWNrLnJlY3QgPSBjdXJyZW50QXhpcy50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAodGhpcy5pc1dpdGhpbkJvdW5kcyhjdXJyZW50QXhpcy50cmFjay5yZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsYmFyKGF4aXMpO1xuICAgICAgICAgICAgYWRkQ2xhc3NlcyhjdXJyZW50QXhpcy50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzV2l0aGluQm91bmRzKGN1cnJlbnRBeGlzLnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKGN1cnJlbnRBeGlzLnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVNjcm9sbGJhcihheGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUub25Nb3VzZUxlYXZlRm9yQXhpcyA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICByZW1vdmVDbGFzc2VzKHRoaXMuYXhpc1theGlzXS50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVTY3JvbGxiYXIoYXhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9uIHNjcm9sbGJhciBoYW5kbGUgZHJhZyBtb3ZlbWVudCBzdGFydHNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbkRyYWdTdGFydCA9IGZ1bmN0aW9uIChlLCBheGlzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KHRoaXMuZWwpO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgLy8gTWVhc3VyZSBob3cgZmFyIHRoZSB1c2VyJ3MgbW91c2UgaXMgZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JvbGxiYXIgZHJhZyBoYW5kbGUuXG4gICAgICAgIHZhciBldmVudE9mZnNldCA9IGF4aXMgPT09ICd5JyA/IGUucGFnZVkgOiBlLnBhZ2VYO1xuICAgICAgICB0aGlzLmF4aXNbYXhpc10uZHJhZ09mZnNldCA9XG4gICAgICAgICAgICBldmVudE9mZnNldCAtICgoKF9hID0gc2Nyb2xsYmFyLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0QXR0cl0pIHx8IDApO1xuICAgICAgICB0aGlzLmRyYWdnZWRBeGlzID0gYXhpcztcbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLmNsYXNzTmFtZXMuZHJhZ2dpbmcpO1xuICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZHJhZywgdHJ1ZSk7XG4gICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25FbmREcmFnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByZXZlbnRDbGljaywgdHJ1ZSk7XG4gICAgICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5wcmV2ZW50Q2xpY2ssIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxXaW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLm9uVHJhY2tDbGljayA9IGZ1bmN0aW9uIChlLCBheGlzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBjdXJyZW50QXhpcyA9IHRoaXMuYXhpc1theGlzXTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY2xpY2tPblRyYWNrIHx8XG4gICAgICAgICAgICAhY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBQcmV2ZW50aW5nIHRoZSBldmVudCdzIGRlZmF1bHQgdG8gdHJpZ2dlciBjbGljayB1bmRlcm5lYXRoXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgIGN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHNjcm9sbGJhciA9IHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXI7XG4gICAgICAgIHZhciBzY3JvbGxiYXJPZmZzZXQgPSAoX2IgPSAoX2EgPSBzY3JvbGxiYXIucmVjdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RoaXMuYXhpc1theGlzXS5vZmZzZXRBdHRyXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMDtcbiAgICAgICAgdmFyIGhvc3RTaXplID0gcGFyc2VJbnQoKF9kID0gKF9jID0gdGhpcy5lbFN0eWxlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3RoaXMuYXhpc1theGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6ICcwcHgnLCAxMCk7XG4gICAgICAgIHZhciBzY3JvbGxlZCA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl07XG4gICAgICAgIHZhciB0ID0gYXhpcyA9PT0gJ3knXG4gICAgICAgICAgICA/IHRoaXMubW91c2VZIC0gc2Nyb2xsYmFyT2Zmc2V0XG4gICAgICAgICAgICA6IHRoaXMubW91c2VYIC0gc2Nyb2xsYmFyT2Zmc2V0O1xuICAgICAgICB2YXIgZGlyID0gdCA8IDAgPyAtMSA6IDE7XG4gICAgICAgIHZhciBzY3JvbGxTaXplID0gZGlyID09PSAtMSA/IHNjcm9sbGVkIC0gaG9zdFNpemUgOiBzY3JvbGxlZCArIGhvc3RTaXplO1xuICAgICAgICB2YXIgc3BlZWQgPSA0MDtcbiAgICAgICAgdmFyIHNjcm9sbFRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChkaXIgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gc2Nyb2xsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCAtPSBzcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdID0gc2Nyb2xsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxUbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbGVkIDwgc2Nyb2xsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCArPSBzcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdID0gc2Nyb2xsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxUbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY3JvbGxUbygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0dGVyIGZvciBjb250ZW50IGVsZW1lbnRcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRDb250ZW50RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudEVsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0dGVyIGZvciBvcmlnaW5hbCBzY3JvbGxpbmcgZWxlbWVudFxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRXcmFwcGVyRWw7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uTW91c2VFbnRlcik7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLm9uUG9pbnRlckV2ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbk1vdXNlTGVhdmUpO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50V3JhcHBlckVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbmNlbCBhbGwgZGVib3VuY2VkIGZ1bmN0aW9uc1xuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uU3RvcFNjcm9sbGluZy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXJlZC5jYW5jZWwoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gRE9NIG5vZGVzXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudW5Nb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIG1vdXNlIGlzIHdpdGhpbiBib3VuZHNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pc1dpdGhpbkJvdW5kcyA9IGZ1bmN0aW9uIChiYm94KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb3VzZVggPj0gYmJveC5sZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWCA8PSBiYm94LmxlZnQgKyBiYm94LndpZHRoICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWSA+PSBiYm94LnRvcCAmJlxuICAgICAgICAgICAgdGhpcy5tb3VzZVkgPD0gYmJveC50b3AgKyBiYm94LmhlaWdodCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGVsZW1lbnQgY2hpbGRyZW4gbWF0Y2hlcyBxdWVyeVxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmZpbmRDaGlsZCA9IGZ1bmN0aW9uIChlbCwgcXVlcnkpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBlbC5tYXRjaGVzIHx8XG4gICAgICAgICAgICBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZWwubXNNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWwuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChjaGlsZCwgcXVlcnkpO1xuICAgICAgICB9KVswXTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucnRsSGVscGVycyA9IG51bGw7XG4gICAgU2ltcGxlQmFyQ29yZS5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgY2xpY2tPblRyYWNrOiB0cnVlLFxuICAgICAgICBzY3JvbGxiYXJNaW5TaXplOiAyNSxcbiAgICAgICAgc2Nyb2xsYmFyTWF4U2l6ZTogMCxcbiAgICAgICAgYXJpYUxhYmVsOiAnc2Nyb2xsYWJsZSBjb250ZW50JyxcbiAgICAgICAgY2xhc3NOYW1lczoge1xuICAgICAgICAgICAgY29udGVudEVsOiAnc2ltcGxlYmFyLWNvbnRlbnQnLFxuICAgICAgICAgICAgY29udGVudFdyYXBwZXI6ICdzaW1wbGViYXItY29udGVudC13cmFwcGVyJyxcbiAgICAgICAgICAgIG9mZnNldDogJ3NpbXBsZWJhci1vZmZzZXQnLFxuICAgICAgICAgICAgbWFzazogJ3NpbXBsZWJhci1tYXNrJyxcbiAgICAgICAgICAgIHdyYXBwZXI6ICdzaW1wbGViYXItd3JhcHBlcicsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3NpbXBsZWJhci1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBzY3JvbGxiYXI6ICdzaW1wbGViYXItc2Nyb2xsYmFyJyxcbiAgICAgICAgICAgIHRyYWNrOiAnc2ltcGxlYmFyLXRyYWNrJyxcbiAgICAgICAgICAgIGhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbDogJ3NpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyJyxcbiAgICAgICAgICAgIGhlaWdodEF1dG9PYnNlcnZlckVsOiAnc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyJyxcbiAgICAgICAgICAgIHZpc2libGU6ICdzaW1wbGViYXItdmlzaWJsZScsXG4gICAgICAgICAgICBob3Jpem9udGFsOiAnc2ltcGxlYmFyLWhvcml6b250YWwnLFxuICAgICAgICAgICAgdmVydGljYWw6ICdzaW1wbGViYXItdmVydGljYWwnLFxuICAgICAgICAgICAgaG92ZXI6ICdzaW1wbGViYXItaG92ZXInLFxuICAgICAgICAgICAgZHJhZ2dpbmc6ICdzaW1wbGViYXItZHJhZ2dpbmcnLFxuICAgICAgICAgICAgc2Nyb2xsaW5nOiAnc2ltcGxlYmFyLXNjcm9sbGluZycsXG4gICAgICAgICAgICBzY3JvbGxhYmxlOiAnc2ltcGxlYmFyLXNjcm9sbGFibGUnLFxuICAgICAgICAgICAgbW91c2VFbnRlcmVkOiAnc2ltcGxlYmFyLW1vdXNlLWVudGVyZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbGFibGVOb2RlOiBudWxsLFxuICAgICAgICBjb250ZW50Tm9kZTogbnVsbCxcbiAgICAgICAgYXV0b0hpZGU6IHRydWVcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0YXRpYyBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLmdldE9wdGlvbnMgPSBnZXRPcHRpb25zO1xuICAgIFNpbXBsZUJhckNvcmUuaGVscGVycyA9IGhlbHBlcnM7XG4gICAgcmV0dXJuIFNpbXBsZUJhckNvcmU7XG59KCkpO1xuXG5leHBvcnQgeyBTaW1wbGVCYXJDb3JlIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8qKlxuICogc2ltcGxlYmFyIC0gdjYuMi41XG4gKiBTY3JvbGxiYXJzLCBzaW1wbGVyLlxuICogaHR0cHM6Ly9ncnNtdG8uZ2l0aHViLmlvL3NpbXBsZWJhci9cbiAqXG4gKiBNYWRlIGJ5IEFkcmllbiBEZW5hdCBmcm9tIGEgZm9yayBieSBKb25hdGhhbiBOaWNvbFxuICogVW5kZXIgTUlUIExpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgY2FuVXNlRE9NIGZyb20gJ2Nhbi11c2UtZG9tJztcbmltcG9ydCBTaW1wbGVCYXJDb3JlIGZyb20gJ3NpbXBsZWJhci1jb3JlJztcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XG5cbnZhciBfYSA9IFNpbXBsZUJhckNvcmUuaGVscGVycywgZ2V0T3B0aW9ucyA9IF9hLmdldE9wdGlvbnMsIGFkZENsYXNzZXMgPSBfYS5hZGRDbGFzc2VzO1xudmFyIFNpbXBsZUJhciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2ltcGxlQmFyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNpbXBsZUJhcigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuYXBwbHkodGhpcywgYXJncykgfHwgdGhpcztcbiAgICAgICAgLy8gLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UsIHNvIHdlIGtub3cgdGhpcyBET00gbm9kZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbmNpZWRcbiAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5zZXQoYXJnc1swXSwgX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNpbXBsZUJhci5pbml0RE9NTG9hZGVkRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpICE9PSAnaW5pdCcgJiZcbiAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpKVxuICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoZWwsIGdldE9wdGlvbnMoZWwuYXR0cmlidXRlcykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSBTaW1wbGVCYXIuZ2xvYmFsT2JzZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIucHJvdG90eXBlLmluaXRET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhpcyBlbGVtZW50IGRvZXNuJ3QgaGF2ZSB0aGUgZWxlbWVudHMgeWV0XG4gICAgICAgIGlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHRoaXMuZWwuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhfdGhpcy5jbGFzc05hbWVzLndyYXBwZXIpO1xuICAgICAgICB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFByZXBhcmUgRE9NXG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm9mZnNldEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm1hc2tFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy53cmFwcGVyRWwsIHRoaXMuY2xhc3NOYW1lcy53cmFwcGVyKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5jb250ZW50V3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMuY29udGVudFdyYXBwZXIpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9mZnNldEVsLCB0aGlzLmNsYXNzTmFtZXMub2Zmc2V0KTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5tYXNrRWwsIHRoaXMuY2xhc3NOYW1lcy5tYXNrKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5jb250ZW50RWwsIHRoaXMuY2xhc3NOYW1lcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLnBsYWNlaG9sZGVyRWwsIHRoaXMuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCwgdGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlckVsKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLmVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0RWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50V3JhcHBlckVsKTtcbiAgICAgICAgICAgIHRoaXMubWFza0VsLmFwcGVuZENoaWxkKHRoaXMub2Zmc2V0RWwpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLm1hc2tFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBsYWNlaG9sZGVyRWwpO1xuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXJFbCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICAgICAgICAgIChfYyA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRoaXMub3B0aW9ucy5hcmlhTGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5heGlzLngudHJhY2suZWwgfHwgIXRoaXMuYXhpcy55LnRyYWNrLmVsKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModHJhY2ssIHRoaXMuY2xhc3NOYW1lcy50cmFjayk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHNjcm9sbGJhciwgdGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcik7XG4gICAgICAgICAgICB0cmFjay5hcHBlbmRDaGlsZChzY3JvbGxiYXIpO1xuICAgICAgICAgICAgdGhpcy5heGlzLngudHJhY2suZWwgPSB0cmFjay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpcy54LnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG9yaXpvbnRhbCk7XG4gICAgICAgICAgICB0aGlzLmF4aXMueS50cmFjay5lbCA9IHRyYWNrLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnkudHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy52ZXJ0aWNhbCk7XG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuYXhpcy54LnRyYWNrLmVsKTtcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5heGlzLnkudHJhY2suZWwpO1xuICAgICAgICB9XG4gICAgICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRET00uY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJywgJ2luaXQnKTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5wcm90b3R5cGUudW5Nb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudW5Nb3VudC5jYWxsKHRoaXMpO1xuICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzW1wiZGVsZXRlXCJdKHRoaXMuZWwpO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLmluaXRIdG1sQXBpID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyA9IHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzLmJpbmQodGhpcyk7XG4gICAgICAgIC8vIE11dGF0aW9uT2JzZXJ2ZXIgaXMgSUUxMStcbiAgICAgICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gTXV0YXRpb24gb2JzZXJ2ZXIgdG8gb2JzZXJ2ZSBkeW5hbWljYWxseSBhZGRlZCBlbGVtZW50c1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFNpbXBsZUJhci5oYW5kbGVNdXRhdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUYWtlbiBmcm9tIGpRdWVyeSBgcmVhZHlgIGZ1bmN0aW9uXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGVsZW1lbnRzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgcGFnZVxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCAvLyBAdHMtaWdub3JlOiBJRSBzcGVjaWZpY1xuICAgICAgICAgICAgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJyAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IGluaXRcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyLmhhbmRsZU11dGF0aW9ucyA9IGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goZnVuY3Rpb24gKGFkZGVkTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICFTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhhZGRlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGFkZGVkTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgU2ltcGxlQmFyKGFkZGVkTm9kZSwgZ2V0T3B0aW9ucyhhZGRlZE5vZGUuYXR0cmlidXRlcykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykgIT09ICdpbml0JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoZWwsIGdldE9wdGlvbnMoZWwuYXR0cmlidXRlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG11dGF0aW9uLnJlbW92ZWROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmVkTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVkTm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpID09PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKHJlbW92ZWROb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMocmVtb3ZlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5nZXQocmVtb3ZlZE5vZGUpLnVuTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwocmVtb3ZlZE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlYmFyPVwiaW5pdFwiXScpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5nZXQoZWwpLnVuTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLmluc3RhbmNlcyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgcmV0dXJuIFNpbXBsZUJhcjtcbn0oU2ltcGxlQmFyQ29yZSkpO1xuLyoqXG4gKiBIVE1MIEFQSVxuICogQ2FsbGVkIG9ubHkgaW4gYSBicm93c2VyIGVudi5cbiAqL1xuaWYgKGNhblVzZURPTSkge1xuICAgIFNpbXBsZUJhci5pbml0SHRtbEFwaSgpO1xufVxuXG5leHBvcnQgeyBTaW1wbGVCYXIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zY3NzL3N0eWxlLnNjc3MnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gaGFtYnVyZ2VyIG1lbnVcbnV0aWxzLm1lbnVJbml0KCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29tcG9uZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGZvcm1zXG5pbXBvcnQgJy4vdXRpbHMvZm9ybXMnO1xuXG4vLyB0YWJzXG5pbXBvcnQgJy4vdXRpbHMvdGFicy5qcyc7XG5cbi8vIGFjY29yZGlvblxuaW1wb3J0ICcuL3V0aWxzL2FjY29yZGlvbi5qcyc7XG5cbi8vIHNlbGVjdFxuaW1wb3J0ICcuL3V0aWxzL3NlbGVjdC5qcyc7XG5cbi8vIG1vZGFsc1xuaW1wb3J0ICcuL3V0aWxzL21vZGFscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCAnLi9kZXYvdnptc2sxLmpzJztcbmltcG9ydCAnLi9kZXYvbWFya3VzRE0uanMnO1xuaW1wb3J0ICcuL2Rldi91a2lrMC5qcyc7XG5pbXBvcnQgJy4vZGV2L2tpZTZlci5qcyc7XG4iXSwibmFtZXMiOlsicmVtb3ZlQ2xhc3NlcyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRvYyIsImRvY3VtZW50RWxlbWVudCIsInNldENhdGFsb2dNZW51Q2xhc3NlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJzdWJsaW5rTm9kZSIsImkiLCJzdWJuYXYiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFkZCIsInNldEN1cnJlbnRZZWFyIiwieWVhciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwibW91c2VvdmVySGFuZGxlciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwicmVtb3ZlIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiZGF0YXNldCIsIm5hdlN1YmxpbmtJbmRleCIsIm1vZHVsZXMiLCJkYXRhTWVkaWFRdWVyaWVzIiwiX3NsaWRlVG9nZ2xlIiwiX3NsaWRlVXAiLCJfc2xpZGVEb3duIiwiQWNjb3JkaW9uIiwiY29uc3RydWN0b3IiLCJhY2NvcmRpb25JdGVtcyIsIm1kUXVlcmllc0FycmF5IiwicmVnSXRlbXMiLCJBcnJheSIsImZyb20iLCJmaWx0ZXIiLCJpdGVtIiwiaW5kZXgiLCJzZWxmIiwiYWNjb3JkaW9uIiwic3BsaXQiLCJhdHRycyIsIkFDQ09SRElPTiIsIklURU0iLCJTSU5HTEUiLCJjbGFzc2VzIiwiSU5JVCIsIkFDVElWRSIsImluaXQiLCJfdGhpcyIsImZvckVhY2giLCJtZFF1ZXJpZXNJdGVtIiwibWF0Y2hNZWRpYSIsIml0ZW1zQXJyYXkiLCJoaWRlQm9keSIsImFjY29yZGlvbkdyb3VwIiwiYWN0aXZlVGl0bGUiLCJzcGVlZCIsImFjY29yZGlvblNwZWVkIiwicGFyc2VJbnQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJzZXRBY3Rpb25zIiwidGl0bGUiLCJncm91cCIsImlzU2luZ2xlIiwiaGFzQXR0cmlidXRlIiwidG9nZ2xlIiwicHJldmVudERlZmF1bHQiLCJpbml0Qm9keSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInRpdGxlcyIsInJlbW92ZUF0dHJpYnV0ZSIsImhpZGRlbiIsInNldEF0dHJpYnV0ZSIsIm1hdGNoZXMiLCJiaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlZhbGlkYXRpb24iLCJSRVFVSVJFRCIsIklHTk9SRV9WQUxJREFUSU9OIiwiQUpBWCIsIkRFViIsIklHTk9SRV9GT0NVUyIsIlNIT1dfUExBQ0VIT0xERVIiLCJWQUxJREFURSIsIkhBU19FUlJPUiIsIkhBU19GT0NVUyIsIklTX0ZJTExFRCIsIklTX1JFVkVBTEVEIiwiZ2V0RXJyb3JzIiwiZm9ybSIsImVyciIsInJlcXVpcmVkRmllbGRzIiwicmVxdWlyZWRGaWVsZCIsIm9mZnNldFBhcmVudCIsInRhZ05hbWUiLCJkaXNhYmxlZCIsInZhbGlkYXRlRmllbGQiLCJhZGRFcnJvciIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVFcnJvciIsInJlcXVpcmVkIiwidmFsdWUiLCJyZXBsYWNlIiwidGVzdEVtYWlsIiwidHlwZSIsImNoZWNrZWQiLCJ0cmltIiwiY2xlYXJGaWVsZHMiLCJyZXNldCIsInNldFRpbWVvdXQiLCJpbnB1dHMiLCJjaGVja2JveGVzIiwiaW5wdXQiLCJjaGVja2JveCIsInRlc3QiLCJGb3JtU3VibWl0aW9uIiwic2hvdWxkVmFsaWRhdGUiLCJmb3JtcyIsInNlbmRGb3JtIiwicmVzcG9uc2VSZXN1bHQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJwb3B1cCIsIm1vZGFsIiwibW9kYWxNZXNzYWdlIiwib3BlbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTdWJtaXRpb24iLCJhamF4IiwiYWN0aW9uIiwiZ2V0QXR0cmlidXRlIiwibWV0aG9kIiwiZGF0YSIsIkZvcm1EYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsImJvZHkiLCJvayIsInJlc3VsdCIsImpzb24iLCJhbGVydCIsInBhc3N3b3JkRmllbGRzIiwiZmllbGQiLCJidG4iLCJGb3JtRmllbGRzIiwiZmllbGRzIiwic2F2ZVBsYWNlaG9sZGVyIiwicGxhY2Vob2xkZXIiLCJoYW5kbGVGb2N1c2luIiwiaGFuZGxlRm9jdXNvdXQiLCJib2R5TG9ja1N0YXR1cyIsImJvZHlMb2NrIiwiYm9keVVubG9jayIsIk1vZGFsIiwib3B0aW9ucyIsImNvbmZpZyIsImxvZ2dpbmciLCJhdHRyaWJ1dGVPcGVuQnV0dG9uIiwiYXR0cmlidXRlQ2xvc2VCdXR0b24iLCJmaXhFbGVtZW50U2VsZWN0b3IiLCJ5b3V0dWJlQXR0cmlidXRlIiwieW91dHViZVBsYWNlQXR0cmlidXRlIiwic2V0QXV0b3BsYXlZb3V0dWJlIiwibW9kYWxDb250ZW50IiwibW9kYWxBY3RpdmUiLCJib2R5QWN0aXZlIiwiZm9jdXNDYXRjaCIsImNsb3NlRXNjIiwiaGFzaFNldHRpbmdzIiwibG9jYXRpb24iLCJnb0hhc2giLCJvbiIsImJlZm9yZU9wZW4iLCJhZnRlck9wZW4iLCJiZWZvcmVDbG9zZSIsImFmdGVyQ2xvc2UiLCJ5b3VUdWJlQ29kZSIsImlzT3BlbiIsInRhcmdldE9wZW4iLCJzZWxlY3RvciIsImVsZW1lbnQiLCJwcmV2aW91c09wZW4iLCJsYXN0Q2xvc2VkIiwiX2RhdGFWYWx1ZSIsImhhc2giLCJfcmVvcGVuIiwiX3NlbGVjdG9yT3BlbiIsImxhc3RGb2N1c0VsIiwiX2ZvY3VzRWwiLCJpbml0bW9kYWxzIiwiZXZlbnRzbW9kYWwiLCJidXR0b25PcGVuIiwiYnV0dG9uQ2xvc2UiLCJjbG9zZSIsIndoaWNoIiwiY29kZSIsIl9mb2N1c0NhdGNoIiwid2luZG93IiwiX29wZW5Ub0hhc2giLCJzZWxlY3RvclZhbHVlIiwicHJldmlvdXNBY3RpdmVFbGVtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvZGVWaWRlbyIsInVybFZpZGVvIiwiaWZyYW1lIiwiY3JlYXRlRWxlbWVudCIsImF1dG9wbGF5IiwieW91dHViZVBsYWNlIiwiYXBwZW5kQ2hpbGQiLCJfZ2V0SGFzaCIsIl9zZXRIYXNoIiwibSIsImlubmVyV2lkdGgiLCJfZm9jdXNUcmFwIiwiX3JlbW92ZUhhc2giLCJpbmNsdWRlcyIsImNsYXNzSW5IYXNoIiwiYnV0dG9ucyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJocmVmIiwiZm9jdXNhYmxlIiwiZm9jdXNBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImZvY3VzZWRJbmRleCIsImluZGV4T2YiLCJzaGlmdEtleSIsImZvY3VzIiwiU2ltcGxlQmFyIiwiU2VsZWN0IiwiU0VMRUNUIiwiQk9EWSIsIkxBQkVMIiwiVElUTEUiLCJWQUxVRSIsIkNPTlRFTlQiLCJPUFRJT05TIiwiT1BUSU9OIiwiU0NST0xMIiwiR1JPVVAiLCJJTlBVVCIsIkFTU0VUIiwiVFhUIiwiSVNfQUNUSVZFIiwiSVNfRk9DVVNFRCIsIklTX09QRU5FRCIsIklTX1NFTEVDVEVEIiwiSVNfRElTQUJMRUQiLCJIQVNfTElTVCIsIkhBU19NVUxUSVBMRSIsIkhBU19DSEVDS0JPWCIsIkhBU19MQUJFTCIsInNlbGVjdExpc3QiLCJzZWxlY3QiLCJpbml0U2VsSXRlbSIsInJlbGF0aXZlU2VsIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsInNlbElkIiwiZ2V0UGxhY2Vob2xkZXIiLCJvcHRQbGFjZWhvbGRlciIsImxhYmVsIiwic2hvdyIsInNlbFRpdGxlIiwiZ2V0U2VsZWN0IiwidHdpblNlbCIsImluc2VydEFkamFjZW50SFRNTCIsInRleHQiLCJidWlsZCIsImluaXRTZWxlY3Rpb25zIiwic2V0VmFsdWUiLCJzZXRPcHRpb25zIiwic2VsQWRkb25DbGFzcyIsIm11bHRpcGxlIiwiZGlzYWJsZVNlbGVjdCIsInNldFNlYXJjaEFjdGlvbnMiLCJzZXRBY3Rpb24iLCJzZWxIaW50Iiwic2VsQm9keSIsImdldFZhbHVlIiwicmVsYXRpdmVTZWxPcHRpb25zIiwiZ2V0T3B0aW9ucyIsImdldENsYXNzIiwic2VsIiwic2VsZWN0SWQiLCJzZWxMaXN0Iiwic2VsT3B0aW9uIiwib3B0VmFsIiwic2V0T3B0aW9uQWN0aW9uIiwiYWRkRXJyIiwicmVtb3ZlRXJyIiwiY2xvc2VHcm91cCIsInNlbE9wdGlvbnMiLCJzZWxlY3RPbmVHcm91cCIsInNlbEdyb3VwIiwic2VsZWN0aW9ucyIsInNlbGVjdGlvbiIsImNsb3NlSXRlbSIsIm9wdGlvbiIsInJlbGF0aXZlU2VsZWN0aW9ucyIsImdldERhdGEiLCJlbGVtZW50cyIsInJlbGF0aXZlU2VsZWN0aW9uIiwidHdpblNlbGVjdGlvbnMiLCJ0d2luU2VsZWN0aW9uIiwib3B0IiwidGV4dENvbnRlbnQiLCJzZXRTZWxlY3Rpb25zIiwic2VsSW5wdXQiLCJ0b1VwcGVyQ2FzZSIsInNldFN1YnRpdGxlIiwic2VsRXJyb3IiLCJyZW1vdmVDaGlsZCIsImNzc0NsYXNzIiwiYXR0ciIsImF0dHJDbGFzcyIsInRpdGxlVmFsIiwiaHRtbCIsInNlbExhYmVsIiwidmFsdWVzIiwibWFwIiwiZ2V0Q29udGVudCIsImpvaW4iLCJsaXN0IiwiVkFMVUVVRSIsImN1c3RvbUNsYXNzIiwib3B0Q2xhc3MiLCJzZWxTY3JvbGwiLCJzZWxTY3JvbGxIZWlnaHQiLCJzZWxPcHRpb25zSFRNTCIsImdldE9wdGlvbiIsInNlbGVjdGVkIiwic2hvd1NlbGVjdGlvbiIsIm9wdGlvbkNsYXNzIiwib3B0aW9uTGluayIsIm9wdGlvbkxpbmtUYXJnZXQiLCJvcHRpb25IVE1MIiwib3B0aW9uRGF0YSIsIm9wdEFzc2V0Iiwib3B0aW9uRGF0YUhUTUwiLCJvcHRpb25Db250ZW50SFRNTCIsImZpbmQiLCJzdWJ0aXRsZSIsInB1c2giLCJzZWxlY3RlZEluZGV4IiwidGVtcEJ1dHRvbiIsImFwcGVuZCIsImNsaWNrIiwic2Nyb2xsQmxvY2siLCJhdXRvSGlkZSIsInNldEhhc2giLCJnZXRIYXNoIiwiVGFicyIsIlRBQlMiLCJJTkRFWCIsIlRJVExFUyIsIlRBQl9JVEVNIiwiSEFTSCIsIk1PREFMIiwidGFicyIsImFjdGl2ZUhhc2giLCJzdGFydHNXaXRoIiwidGFic0Jsb2NrIiwic2V0U3RhdHVzIiwiY29udGVudCIsInRhYnNJbmRleCIsImhhc0hhc2giLCJpbmR4IiwiYWN0aXZlSGFzaEJsb2NrIiwibWVudUluaXQiLCJtZW51T3BlbiIsIm1lbnVDbG9zZSIsImJvZHlMb2NrVG9nZ2xlIiwiZGVsYXkiLCJ1bmlxdWVBcnJheSIsImFycmF5IiwiZGF0YVNldFZhbHVlIiwibWVkaWEiLCJicmVha3BvaW50c0FycmF5IiwicGFyYW1zIiwiYnJlYWtwb2ludCIsInBhcmFtc0FycmF5IiwibWRRdWVyaWVzIiwibWVkaWFCcmVha3BvaW50IiwibWVkaWFUeXBlIiwiZHVyYXRpb24iLCJzaG93bW9yZSIsInN0eWxlIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwib3ZlcmZsb3ciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInJlbW92ZVByb3BlcnR5IiwicmVtVG9QeCIsInJlbVZhbHVlIiwiaHRtbEZvbnRTaXplIiwicGFyc2VGbG9hdCIsImdldENvbXB1dGVkU3R5bGUiLCJmb250U2l6ZSIsInB4VmFsdWUiLCJNYXRoIiwicm91bmQiLCJjbGFzc05hbWUiLCJ1dGlscyJdLCJzb3VyY2VSb290IjoiIn0=
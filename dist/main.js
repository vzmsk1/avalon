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

  // handler functions
  const mouseoverHandler = e => {
    const target = e.target;

    // header catalog menu
    if (target.closest('.header__catalog-btn')) {
      doc.classList.add('_show-catalog');
    } else if (doc.classList.contains('_show-catalog') && !target.closest('.header__catalog-menu')) {
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
}

.wrapper {
  margin: 0 auto;
  max-width: 1920px;
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
}`, "",{"version":3,"sources":["webpack://./src/scss/fonts.scss","webpack://./src/scss/style.scss","webpack://./src/scss/set.scss","webpack://./src/scss/sections/header.scss","webpack://./src/ui/styles/_typo.scss","webpack://./src/ui/styles/_input.scss","webpack://./src/ui/styles/_buttons.scss","webpack://./src/ui/styles/_radio-button.scss","webpack://./src/ui/styles/_checkbox.scss","webpack://./src/ui/styles/_breadcrumbs.scss","webpack://./src/ui/styles/_pagination.scss","webpack://./src/ui/styles/_arrow-btn.scss","webpack://./src/ui/styles/_i-link.scss","<no source>"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_regular.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_medium.woff2') format('woff2');\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_bold.woff2') format('woff2');\n  font-weight: 700;\n  font-style: normal;\n}","// --------------------------------- mixins ---------------------------------\n\n@import './mixins';\n\n// -------------------------------- variables -------------------------------\n\n// colors\n$white: #ffffff;\n$black: #000000;\n$gray: #EFEFEF;\n$grayTxt: #A1A2A9;\n$red: #F40000FF;\n\n// ---------------------------------- fonts ---------------------------------\n\n@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,200..1000&display=swap');\n\n// local fonts\n @import './fonts';\n\n// ------------------------------- base styles ------------------------------\n\n// base scss file\n@import './set';\n\n// body\nbody {\n    .lock & {\n        overflow: hidden;\n        touch-action: none;\n    }\n    .loaded & {\n    }\n}\n\n// main\nmain {\n    position: relative;\n}\n\n// wrapper\n.wrapper {\n    margin: 0 auto;\n    max-width: 1920px;\n}\n\n// --------------------------------------------------------------------------\n\n// header / footer\n@import './sections/header';\n@import './sections/footer';\n\n// ui\n@import '../ui/styles/ui.scss';\n\n// --------------------------------------------------------------------------\n\n@import './dev/vzmsk1.scss';\n@import './dev/markusDM.scss';\n@import './dev/ukik0.scss';\n@import './dev/kie6er.scss';\n","*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\nhtml {\n    font-family: 'Nunito Sans'; // шрифт по умолчанию по сайту\n    font-size: 0.5208335vw; // на разрешении 1920 0.520835vw === 10px\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 1.2;\n    margin: 0;\n    height: 100%;\n    padding: 0;\n}\n\nbody {\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 2.5rem;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    font-size: 1.8rem;\n    color: black; // цвет по умолчанию текста по сайту\n    background-color: $white;\n}\n\ninput,\ntextarea {\n    -webkit-animation: bugfix infinite 1s;\n    line-height: inherit;\n    margin: 0;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: inherit;\n}\na {\n    color: unset;\n}\na,\na:hover {\n    text-decoration: none;\n}\n\nbutton,\ninput,\na,\ntextarea {\n    outline: none;\n    cursor: pointer;\n    font: inherit;\n    &:focus {\n        outline: none;\n    }\n    &:active {\n        outline: none;\n    }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font: inherit;\n    margin: 0;\n    padding: 0;\n}\np {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n\nimg {\n    width: 100%;\n    height: auto;\n    display: block;\n}\n\nbutton {\n    border: none;\n    color: inherit;\n    font: inherit;\n    text-align: inherit;\n    padding: 0;\n    background-color: transparent;\n}\nul {\n    padding: 0;\n    margin: 0;\n}\n\nul li {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.container {\n    width: 172rem;\n    margin: 0 auto;\n}\n\ninput[type='number']::-webkit-inner-spin-button,\ninput[type='number']::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\nsvg,\nimg {\n    width: 100%;\n    height: auto;\n    object-fit: contain;\n}\n\n@media (min-width: 1920px) {\n    html {\n        font-size: 10px;\n    }\n}\n\n@media (max-width: 48em) {\n    html {\n        font-size: 5px;\n        font-size: 1.5625vw;\n        font-size: calc((100 / 375) * 5vw); // где 375 это ширина моб версии макета\n        -webkit-text-size-adjust: none;\n    }\n\n    body {\n        font-size: 3rem;\n        -webkit-text-size-adjust: none;\n    }\n\n    .container {\n        padding: 0 3.2rem; // в моб версии отступ от края задаем для всех контейнеров, а там где не нужно можем точечно убрать\n        width: 100%;\n    }\n}\n",".header {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n\n  &__top-bar {\n    padding: 1.4rem 0;\n    background-color: $gray;\n\n    .container {\n      display: flex;\n      align-items: center;\n    }\n  }\n\n  &__contacts-list {\n    margin-right: auto;\n    display: flex;\n    column-gap: 3rem;\n  }\n\n  &__nav {\n    padding-left: 2.5rem;\n    display: flex;\n    column-gap: 4.8rem;\n  }\n\n  &__nav-link {\n    position: relative;\n    &::before {\n      content: '';\n      position: absolute;\n      top: 0.25rem;\n      left: -2.4rem;\n      height: 2rem;\n      width: 1px;\n      background-color: $grayTxt;\n      transform: translateX(-100%);\n    }\n  }\n\n  &__inner {\n    padding-top: 2rem;\n    background-color: $white;\n\n    .container {\n      display: flex;\n      column-gap: 2rem;\n    }\n  }\n\n  &__logo {\n    flex: 0 0 11.2rem;\n    width: 11.2rem;\n  }\n\n  &__content {\n    display: flex;\n    flex-direction: column;\n    row-gap: 2rem;\n    flex: 1 1 auto;\n  }\n\n  &__row {\n    display: flex;\n\n    &_upper {\n    }\n    &_lower {\n      column-gap: 2.1rem;\n    }\n  }\n\n  &__catalog-btn {\n    margin-right: 2.6rem;\n\n    ._show-catalog & {\n      .catalog-btn__icon-img {\n        display: none;\n\n        &_cross {\n          display: inline-block;\n        }\n      }\n    }\n  }\n\n  &__search {\n    margin-right: 3.2rem;\n    flex: 1 1 auto;\n  }\n\n  &__actions {\n\n  }\n\n  &__actions-item {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    row-gap: 0.5rem;\n    text-align: center;\n\n    svg {\n      width: 3.6rem;\n      height: 3.6rem;\n    }\n  }\n\n  &__actions-item-txt {\n\n  }\n\n  &__catalog-chapters {\n    display: flex;\n    column-gap: 1.6rem;\n    flex: 1 1 auto;\n  }\n\n  &__catalog-chapter {\n    padding: 1.9rem 2.5rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    height: 6rem;\n    background-color: $gray;\n    flex: 1 1 auto;\n  }\n}\n\n.search-header {\n  display: flex;\n  height: 6rem;\n  border: 1px solid $black;\n\n  &__input {\n    &.input {\n      &__field {\n        border: none;\n      }\n    }\n  }\n\n  &__btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 6rem;\n    width: 6rem;\n    height: 6rem;\n    background-color: $black;\n\n    svg {\n      width: 4.4rem;\n    }\n  }\n}\n\n.catalog-menu-header {\n  position: absolute;\n  top: 14rem;\n  left: 0;\n  width: 100%;\n  background-color: $white;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-1rem);\n  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;\n\n  ._show-catalog & {\n    opacity: 1;\n    visibility: visible;\n    transform: translateY(0);\n  }\n\n  &__inner {\n    margin: 0 auto;\n    display: grid;\n    grid-template-columns: 48.2rem 133.8rem 1fr;\n    max-width: 1920px;\n  }\n\n  &__nav {\n    padding: 10rem 0;\n    display: flex;\n    flex-direction: column;\n    border-right: 1px solid $grayTxt;\n  }\n\n  &__nav-sublink {\n    padding: 2.4rem;\n    padding-left: 14rem;\n    transition: background-color 0.3s ease;\n\n    .txt {\n      transition: color 0.3s ease;\n    }\n\n    &._is-active {\n      background-color: $black;\n\n      .txt {\n        color: $white;\n      }\n    }\n  }\n\n  &__subnav {\n    padding-top: 10rem;\n    padding-left: 5.6rem;\n    display: flex;\n    flex-direction: column;\n\n    &:not(&._is-active) {\n      display: none;\n    }\n  }\n\n  &__brands {\n    margin-bottom: 8rem;\n    display: flex;\n    column-gap: 8.4rem;\n  }\n\n  &__brand-logo {\n    position: relative;\n    height: 5.4rem;\n\n    &:not(:last-child) {\n\n      &::after {\n        content: '';\n        position: absolute;\n        top: 0;\n        right: -4.2rem;\n        width: 2px;\n        height: 5.4rem;\n        background-color: $grayTxt;\n        transform: translateX(100%);\n      }\n    }\n\n  }\n\n  &__brand-logo-img {\n    width: auto;\n    height: 100%;\n  }\n}",".h {\n    font-weight: 700;\n    text-transform: uppercase;\n\n    &_h1 {\n        font-size: 5rem;\n        line-height: 5.6rem;\n    }\n\n    &_h2 {\n        font-size: 3.6rem;\n        line-height: 120%;\n    }\n\n    &_h3 {\n        font-weight: 600;\n        font-size: 2.4rem;\n        line-height: 3.3rem;\n    }\n}\n\n.txt {\n    &_24 {\n        font-size: 2.4rem;\n        line-height: 2.8rem;\n    }\n\n    &_20 {\n        font-size: 2rem;\n        line-height: 2.8rem;\n    }\n\n    &_16 {\n        font-size: 1.6rem;\n        line-height: 2.2rem;\n    }\n\n    &_14 {\n        font-size: 1.4rem;\n        line-height: 1.9rem;\n    }\n\n    &_semibold {\n        font-weight: 600;\n    }\n}","input[type='text'],\ninput[type='email'],\ninput[type='tel'],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\ntextarea:focus,\ninput:focus {\n  outline: none;\n}\n\n.input {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.2rem;\n  width: 100%;\n  border-radius: 0 !important;\n\n  &_pass {\n    .input__field {\n      padding-right: 4.5rem;\n    }\n  }\n\n  &__field,\n  &__field::placeholder {\n    font-size: 1.6rem;\n    line-height: 2.2rem;\n  }\n\n  &__field {\n    padding: 1.8rem 2rem;\n    height: 6rem;\n    background-color: $white;\n    color: $grayTxt;\n    transition: color 0.3s ease;\n  }\n\n  &__pass-btn {\n    position: absolute;\n    top: 2.2rem;\n    right: 2rem;\n  }\n\n  &__pass-btn-i {\n    display: inline-block;\n    width: 2rem;\n    height: 2rem;\n    object-fit: contain;\n\n    &_hide {\n      display: none;\n    }\n\n    ._is-revealed & {\n      display: none;\n      &_hide {\n        display: inline-block;\n      }\n    }\n  }\n\n  &._has-error {\n\n    &::after {\n      content: attr(data-hint);\n      font-size: 1.2rem;\n      color: $red;\n    }\n\n    .input__field {\n      color: $red;\n    }\n  }\n\n  &._has-focus,\n  &._is-filled {\n    .input__field {\n      color: $black;\n    }\n  }\n}\n\ntextarea.input {\n  padding: 0px 0px;\n  resize: none;\n}\n",".btn {\n  display: inline-flex;\n  align-items: center;\n\n  &_primary {\n    padding: 1rem 3.2rem;\n    justify-content: center;\n    height: 6rem;\n    border: 1.5px solid $black;\n    text-align: center;\n    background-color: $black;\n    transition: background-color 0.3s ease;\n\n    .txt {\n      color: $white;\n      transition: color 0.3s ease;\n    }\n\n    @media (any-hover: hover) {\n      &:not(&[disabled], &._is-disabled) {\n        &:hover {\n          background-color: $white;\n\n          .txt {\n            color: $black;\n          }\n        }\n      }\n    }\n  }\n\n  &_secondary {\n    margin-right: 1.6rem;\n\n    &::after {\n      content: '';\n      flex: 0 0 2.4rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      background-image: url(\"./assets/images/icons/arr-sm.svg\");\n      background-size: contain;\n      background-repeat: no-repeat;\n      transform: translateX(0.6rem);\n      transition: transform 0.3s ease;\n    }\n\n    @media (any-hover: hover) {\n      &:hover {\n        &::after {\n          transform: translateX(0);\n        }\n      }\n    }\n  }\n\n  &[disabled],\n  &._is-disabled {\n    border: 1.5px solid $grayTxt;\n    background-color: $grayTxt;\n  }\n\n}\n\n.catalog-btn {\n  padding: 0.8rem;\n  padding-right: 1.2rem;\n  display: inline-flex;\n  align-items: center;\n  column-gap: 1.2rem;\n  height: 6rem;\n  background-color: $black;\n\n  &__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 4.4rem;\n    width: 4.4rem;\n    height: 4.4rem;\n    background-color: $white;\n  }\n\n  &__icon-img {\n    width: 2.4rem;\n    height: 2.4rem;\n\n    &_cross {\n      display: none;\n      flex: 0 0 4rem;\n      width: 4rem;\n      height: 4rem;\n    }\n  }\n\n  &__txt {\n    font-weight: 700;\n    color: $white;\n  }\n}",".option {\n    position: relative;\n    cursor: pointer;\n\n  &__input {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    appearance: none;\n\n    &:focus + .option__txt::before {\n    }\n    &:checked + .option__txt::before {\n    }\n    &:checked + .option__txt::after {\n      transform: scale(1);\n    }\n  }\n\n  &__txt {\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    gap: 0.8rem;\n\n    &::before {\n      content: '';\n      align-self: flex-start;\n      flex: 0 0 2.4rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      border-radius: 50%;\n      border: 1.5px solid $black;\n    }\n    &::after {\n      content: '';\n      position: absolute;\n      left: 0.4rem;\n      top: 0.4rem;\n      width: 1.6rem;\n      height: 1.6rem;\n      border-radius: 50%;\n      background-color: $black;\n      transform: scale(0);\n      transition: transform 0.3s ease;\n    }\n  }\n}\n",".checkbox {\n  position: relative;\n  display: inline-flex;\n\n  &__input {\n    position: absolute;\n    z-index: 2;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    appearance: none;\n\n    &:checked + .checkbox__txt {\n      &::before {\n        border: 1.5px solid $black;\n      }\n      &::after {\n        transform: scale(1);\n      }\n    }\n  }\n\n  &__txt {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    column-gap: 0.8rem;\n    cursor: pointer;\n\n    &::before {\n      content: '';\n      flex: 0 0 2.2rem;\n      width: 2.2rem;\n      height: 2.2rem;\n      border: 1.5px solid $grayTxt;\n      background-color: $white;\n      transition: border 0.3s ease;\n    }\n\n    &::after {\n      content: '';\n      position: absolute;\n      top: 0.5rem;\n      left: 0.3rem;\n      width: 1.6rem;\n      height: 1.6rem;\n      background-color: $black;\n      transform: scale(0);\n      transition: transform 0.3s ease;\n    }\n  }\n}\n",".breadcrumbs {\n  display: flex;\n  column-gap: 2.4rem;\n\n  &__link {\n    position: relative;\n    color: $grayTxt;\n\n    &_chapter {\n      display: flex;\n      align-items: center;\n\n      &::after {\n        content: '';\n        flex: 0 0 2.4rem;\n        width: 2.4rem;\n        height: 2.4rem;\n        background-image: url(\"./assets/images/icons/arr-gray.svg\");\n        background-size: contain;\n        background-repeat: no-repeat;\n      }\n    }\n\n    &::before {\n      content: '';\n      position: absolute;\n      top: 0.2rem;\n      right: -1.2rem;\n      height: 2rem;\n      width: 1.2px;\n      background-color: $grayTxt;\n      transform: translateX(100%);\n    }\n  }\n\n  &__txt {\n\n  }\n}",".pagination {\n  display: flex;\n  align-items: center;\n  column-gap: 2.4rem;\n\n  &__arr {\n    flex: 0 0 2.4rem;\n    width: 2.4rem;\n    height: 2.4rem;\n\n    svg path {\n      fill: $black;\n    }\n\n    &._is-disabled {\n      pointer-events: none;\n      svg path {\n        fill: $grayTxt;\n      }\n    }\n\n    &_next {\n      transform: rotate(180deg);\n    }\n  }\n\n  &__nums {\n    display: flex;\n    column-gap: 0.4rem;\n  }\n\n  &__num {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 5rem;\n    width: 5rem;\n    height: 5rem;\n    color: $grayTxt;\n\n    &._is-active {\n      background-color: $gray;\n      color: $black;\n    }\n  }\n}",".arrow-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 5rem;\n  width: 5rem;\n  height: 5rem;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background-color: $white;\n  transition: background-color 0.3s ease;\n\n  &_next {\n    svg {\n      transform: rotate(180deg);\n    }\n  }\n\n  &:active {\n    background-color: $black;\n\n    svg path {\n      fill: $white;\n    }\n  }\n\n  svg {\n    width: 2.4rem;\n    height: 2.4rem;\n\n    path {\n      fill: $black;\n      transition: fill 0.3s ease;\n    }\n  }\n}",".i-link {\n  display: inline-flex;\n  column-gap: 0.9rem;\n\n  svg {\n    flex: 0 0 2.4rem;\n    width: 2.4rem;\n    height: 2.4rem;\n    transform: translateY(0.05rem);\n  }\n}",null],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEdBQTRHLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUscUJBQXFCLFVBQVUscUJBQXFCLHNCQUFzQixVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxNQUFNLFdBQVcsS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsMkNBQTJDLHVCQUF1QiwyQkFBMkIsb0JBQW9CLGdDQUFnQyw4QkFBOEIsNEJBQTRCLEdBQUcsd0JBQXdCLHFCQUFxQixtQkFBbUIsb0JBQW9CLHVCQUF1Qix3QkFBd0IsR0FBRyxxQkFBcUIsdUJBQXVCLHVCQUF1QixxQkFBcUIsZUFBZSxjQUFjLFlBQVksV0FBVyxjQUFjLGFBQWEsMkJBQTJCLDRCQUE0QixlQUFlLEdBQUcsdUJBQXVCLGtDQUFrQyxtQ0FBbUMsNEJBQTRCLHVCQUF1QixXQUFXLFlBQVksY0FBYyxhQUFhLGVBQWUsY0FBYyxzQ0FBc0MsR0FBRyxnQ0FBZ0MsdUJBQXVCLHNDQUFzQyx1QkFBdUIsbUJBQW1CLGtCQUFrQixvSEFBb0gscUJBQXFCLHlFQUF5RSw4REFBOEQsMEJBQTBCLDZCQUE2QixHQUFHLGtHQUFrRyxrQkFBa0IsYUFBYSxjQUFjLEdBQUcsMERBQTBELGlCQUFpQixtQkFBbUIsR0FBRyw0QkFBNEIscUJBQXFCLG9CQUFvQixnQkFBZ0IseUJBQXlCLEdBQUcsNkNBQTZDLG1DQUFtQyxpQkFBaUIsZ0JBQWdCLG1CQUFtQix1QkFBdUIsZ0JBQWdCLG9CQUFvQixxQkFBcUIsZ0JBQWdCLGVBQWUsY0FBYyx5QkFBeUIsdUJBQXVCLG1CQUFtQixrQkFBa0IsR0FBRyxxQ0FBcUMsd0JBQXdCLG1CQUFtQixlQUFlLHVCQUF1QixXQUFXLFlBQVksa0JBQWtCLGlCQUFpQixvQkFBb0IsbUJBQW1CLHFCQUFxQix5QkFBeUIsZ0JBQWdCLEdBQUcsc0JBQXNCLGVBQWUsdUJBQXVCLGFBQWEsY0FBYyx5QkFBeUIscUJBQXFCLEdBQUcseUNBQXlDLHlCQUF5QixnQ0FBZ0MsOEJBQThCLDZCQUE2QiwyQkFBMkIsMEJBQTBCLHNCQUFzQixHQUFHLDREQUE0RCx5QkFBeUIsZ0NBQWdDLDhCQUE4Qiw2QkFBNkIsMkJBQTJCLDBCQUEwQixzQkFBc0IsR0FBRywwREFBMEQsd0JBQXdCLEdBQUcsMEJBQTBCLHVCQUF1QixZQUFZLGFBQWEscUJBQXFCLEdBQUcsaUNBQWlDLHVCQUF1QixnQkFBZ0Isc0JBQXNCLHVCQUF1QixjQUFjLGVBQWUsZUFBZSx5Q0FBeUMsR0FBRyxtREFBbUQsaUJBQWlCLHlCQUF5Qiw0QkFBNEIsR0FBRyx5Q0FBeUMsV0FBVyxnQkFBZ0IsR0FBRyxpQ0FBaUMsYUFBYSxnQkFBZ0IsY0FBYyxlQUFlLEdBQUcsMkNBQTJDLFlBQVksaUJBQWlCLEdBQUcsZ0VBQWdFLGdCQUFnQixZQUFZLFdBQVcsY0FBYyxrQkFBa0Isb0JBQW9CLGdCQUFnQixHQUFHLDZGQUE2RixnQkFBZ0IsWUFBWSxHQUFHLHFDQUFxQyxtQkFBbUIsb0JBQW9CLGVBQWUsdUJBQXVCLGtCQUFrQixpQkFBaUIsdUJBQXVCLHVCQUF1Qiw2Q0FBNkMsR0FBRywyQ0FBMkMsZ0JBQWdCLGlCQUFpQixtQkFBbUIsR0FBRywrQkFBK0Isb0JBQW9CLFlBQVksdUJBQXVCLHVCQUF1QiwwQkFBMEIsNkJBQTZCLEdBQUcscUJBQXFCO0FBQ3g0TTtBQUNBOzs7Ozs7Ozs7OztBQzVPQTtBQUNBLDRDQUE0QyxtQkFBTyxDQUFDLHNIQUEwRDtBQUM5RyxrQ0FBa0MsbUJBQU8sQ0FBQyx3R0FBbUQ7QUFDN0Y7QUFDQSxtSkFBbUo7QUFDbko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHFsQkFBcWxCLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxRQUFRLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxZQUFZLE9BQU8sT0FBTyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLE9BQU8sTUFBTSxVQUFVLE9BQU8sT0FBTyxXQUFXLE9BQU8sU0FBUyxVQUFVLFVBQVUsVUFBVSxNQUFNLFNBQVMsVUFBVSxNQUFNLFNBQVMsVUFBVSxPQUFPLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsT0FBTyxPQUFPLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxPQUFPLE9BQU8sVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLE1BQU0sTUFBTSxXQUFXLFlBQVksTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFlBQVksV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksWUFBWSxNQUFNLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sU0FBUyxXQUFXLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFlBQVksWUFBWSxZQUFZLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksUUFBUSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFlBQVksT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxNQUFNLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFFBQVEsT0FBTyxXQUFXLFVBQVUsT0FBTyxPQUFPLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFVBQVUsVUFBVSxPQUFPLE9BQU8sVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxZQUFZLFlBQVksV0FBVyxRQUFRLE9BQU8sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLE9BQU8sT0FBTyxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsWUFBWSxZQUFZLE9BQU8sT0FBTyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFlBQVksV0FBVyxRQUFRLE9BQU8sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsV0FBVyxPQUFPLE9BQU8sVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLE9BQU8sT0FBTyxVQUFVLFdBQVcsV0FBVyxP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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQW9EO0FBQzdFLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQW9EO0FBQzdFLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFEQUFRO0FBQ25DLDhCQUE4QixxREFBUSw2QkFBNkIsZUFBZTtBQUNsRiwrQkFBK0IscURBQVE7QUFDdkMsOEJBQThCLHFEQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksd0NBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRW1DO0FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRW9DO0FBQ087O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCLHNDQUFzQyxrQkFBa0I7QUFDbkYsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7O0FBRUEsU0FBUyxzREFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGdDQUFnQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLHNEQUFhO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdDQUFTO0FBQ2I7QUFDQTs7QUFFZ0M7QUFDaEM7Ozs7Ozs7VUN2TUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTRCOztBQUU1Qjs7QUFFMEM7O0FBRTFDO0FBQ0FDLHFEQUFjLENBQUMsQ0FBQzs7QUFFaEI7O0FBRUE7QUFDdUI7O0FBRXZCO0FBQ3lCOztBQUV6QjtBQUM4Qjs7QUFFOUI7QUFDMkI7O0FBRTNCO0FBQzJCOztBQUUzQjs7QUFFeUI7QUFDRTtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL2Rldi92em1zazEuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL2FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvZm9ybXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL21vZGFscy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvc2VsZWN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy90YWJzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY2FuLXVzZS1kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL3Njc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzPzFlMDUiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL3Njc3Mvc3R5bGUuc2Nzcz82YzJkIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRyaW0uanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL190cmltbWVkRW5kSW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNTeW1ib2wuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9ub3cuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3RvTnVtYmVyLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXItY29yZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZW1vdmVDbGFzc2VzfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXG4gICAgY29uc3Qgc2V0Q2F0YWxvZ01lbnVDbGFzc2VzID0gKCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmF2LXN1YmxpbmstaW5kZXhdJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJsaW5rTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5hdi1zdWJsaW5rLWluZGV4XScpXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VibGlua05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdWJuYXYtaW5kZXhdJylbaV1cblxuICAgICAgICAgICAgICAgIGlmIChzdWJsaW5rTm9kZVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ19pcy1hY3RpdmUnKSAmJiBzdWJuYXYpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VibmF2LmNsYXNzTGlzdC5hZGQoJ19pcy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRDYXRhbG9nTWVudUNsYXNzZXMoKVxuXG4gICAgLy8gaGFuZGxlciBmdW5jdGlvbnNcbiAgICBjb25zdCBtb3VzZW92ZXJIYW5kbGVyID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XG5cbiAgICAgICAgLy8gaGVhZGVyIGNhdGFsb2cgbWVudVxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5oZWFkZXJfX2NhdGFsb2ctYnRuJykpIHtcbiAgICAgICAgICAgIGRvYy5jbGFzc0xpc3QuYWRkKCdfc2hvdy1jYXRhbG9nJylcbiAgICAgICAgfSBlbHNlIGlmIChkb2MuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2hvdy1jYXRhbG9nJykgJiYgIXRhcmdldC5jbG9zZXN0KCcuaGVhZGVyX19jYXRhbG9nLW1lbnUnKSkge1xuICAgICAgICAgICAgZG9jLmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93LWNhdGFsb2cnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnW2RhdGEtbmF2LXN1YmxpbmstaW5kZXhdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLW5hdi1zdWJsaW5rLWluZGV4XScpXG4gICAgICAgICAgICBjb25zdCBzdWJuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zdWJuYXYtaW5kZXg9XCIke2VsLmRhdGFzZXQubmF2U3VibGlua0luZGV4fVwiXWApXG5cbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmF2LXN1YmxpbmstaW5kZXhdJyksICdfaXMtYWN0aXZlJylcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3VibmF2LWluZGV4XScpLCAnX2lzLWFjdGl2ZScpXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdfaXMtYWN0aXZlJylcbiAgICAgICAgICAgIGlmIChzdWJuYXYpIHN1Ym5hdi5jbGFzc0xpc3QuYWRkKCdfaXMtYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRvY3VtZW50IGV2ZW50c1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIG1vdXNlb3ZlckhhbmRsZXIpXG59KSIsImV4cG9ydCBjb25zdCBtb2R1bGVzID0ge307XG4iLCJpbXBvcnQge1xuICBkYXRhTWVkaWFRdWVyaWVzLFxuICBfc2xpZGVUb2dnbGUsXG4gIF9zbGlkZVVwLFxuICBfc2xpZGVEb3duLFxufSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgQWNjb3JkaW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY29yZGlvbl0nKTtcbiAgICB0aGlzLm1kUXVlcmllc0FycmF5ID0gZGF0YU1lZGlhUXVlcmllcyh0aGlzLmFjY29yZGlvbkl0ZW1zLCAnYWNjb3JkaW9uJyk7XG4gICAgdGhpcy5yZWdJdGVtcyA9IEFycmF5LmZyb20odGhpcy5hY2NvcmRpb25JdGVtcykuZmlsdGVyKGZ1bmN0aW9uIChcbiAgICAgIGl0ZW0sXG4gICAgICBpbmRleCxcbiAgICAgIHNlbGZcbiAgICApIHtcbiAgICAgIHJldHVybiAhaXRlbS5kYXRhc2V0LmFjY29yZGlvbi5zcGxpdCgnLCcpWzBdO1xuICAgIH0pO1xuICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICBBQ0NPUkRJT046ICdkYXRhLWFjY29yZGlvbicsXG4gICAgICBJVEVNOiAnZGF0YS1hY2NvcmRpb24taXRlbScsXG4gICAgICBTSU5HTEU6ICdkYXRhLWFjY29yZGlvbi1zaW5nbGUnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSU5JVDogJ19hY2NvcmRpb24taW5pdCcsXG4gICAgICBBQ1RJVkU6ICdfaXMtYWN0aXZlJyxcbiAgICB9O1xuXG4gICAgLy8gaW5pdCByZWd1bGFyIGFjY29yZGlvbiBpdGVtc1xuICAgIGlmICh0aGlzLnJlZ0l0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0KHRoaXMucmVnSXRlbXMpO1xuICAgIH1cbiAgICAvLyBpbml0IGFjY29yZGlvbiBpdGVtcyB3aXRoIG1lZGlhIHF1ZXJpZXNcbiAgICBpZiAodGhpcy5tZFF1ZXJpZXNBcnJheSAmJiB0aGlzLm1kUXVlcmllc0FycmF5Lmxlbmd0aCkge1xuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLm1kUXVlcmllc0FycmF5LmZvckVhY2gobWRRdWVyaWVzSXRlbSA9PiB7XG4gICAgICAgIG1kUXVlcmllc0l0ZW0ubWF0Y2hNZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuaW5pdChtZFF1ZXJpZXNJdGVtLml0ZW1zQXJyYXksIG1kUXVlcmllc0l0ZW0ubWF0Y2hNZWRpYSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluaXQobWRRdWVyaWVzSXRlbS5pdGVtc0FycmF5LCBtZFF1ZXJpZXNJdGVtLm1hdGNoTWVkaWEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZUJvZHkoYWNjb3JkaW9uR3JvdXApIHtcbiAgICBjb25zdCBhY3RpdmVUaXRsZSA9IGFjY29yZGlvbkdyb3VwLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgWyR7dGhpcy5hdHRycy5JVEVNfV0uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICApO1xuICAgIGNvbnN0IHNwZWVkID0gYWNjb3JkaW9uR3JvdXAuZGF0YXNldC5hY2NvcmRpb25TcGVlZFxuICAgICAgPyBwYXJzZUludChhY2NvcmRpb25Hcm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkKVxuICAgICAgOiA1MDA7XG5cbiAgICBpZiAoYWN0aXZlVGl0bGUgJiYgIWFjY29yZGlvbkdyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5fc2xpZGUnKS5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICBfc2xpZGVVcChhY3RpdmVUaXRsZS5uZXh0RWxlbWVudFNpYmxpbmcsIHNwZWVkKTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5JVEVNfV1gKSkge1xuICAgICAgY29uc3QgdGl0bGUgPSB0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5JVEVNfV1gKTtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGl0bGUuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5BQ0NPUkRJT059XWApO1xuICAgICAgY29uc3QgaXNTaW5nbGUgPSBncm91cC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5TSU5HTEUpO1xuICAgICAgY29uc3Qgc3BlZWQgPSBncm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkXG4gICAgICAgID8gcGFyc2VJbnQoZ3JvdXAuZGF0YXNldC5hY2NvcmRpb25TcGVlZClcbiAgICAgICAgOiA1MDA7XG5cbiAgICAgIGlmICghZ3JvdXAucXVlcnlTZWxlY3RvckFsbCgnLl9zbGlkZScpLmxlbmd0aCkge1xuICAgICAgICBpZiAoaXNTaW5nbGUgJiYgIXRpdGxlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgIHRoaXMuaGlkZUJvZHkoZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC50b2dnbGUodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICAgIF9zbGlkZVRvZ2dsZSh0aXRsZS5uZXh0RWxlbWVudFNpYmxpbmcsIHNwZWVkKTtcbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBpbml0Qm9keShhY2NvcmRpb25Hcm91cCwgaGlkZUJvZHkgPSB0cnVlKSB7XG4gICAgbGV0IHRpdGxlcyA9IGFjY29yZGlvbkdyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuSVRFTX1dYCk7XG5cbiAgICBpZiAodGl0bGVzLmxlbmd0aCkge1xuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuQUNDT1JESU9OfV1gKSA9PT0gYWNjb3JkaW9uR3JvdXBcbiAgICAgICk7XG4gICAgICB0aXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB7XG4gICAgICAgIGlmIChoaWRlQm9keSkge1xuICAgICAgICAgIHRpdGxlLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgICBpZiAoIXRpdGxlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgICAgdGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICB0aXRsZS5uZXh0RWxlbWVudFNpYmxpbmcuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoYWNjb3JkaW9uSXRlbXMsIG1hdGNoTWVkaWEgPSBmYWxzZSkge1xuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goYWNjb3JkaW9uR3JvdXAgPT4ge1xuICAgICAgYWNjb3JkaW9uR3JvdXAgPSBtYXRjaE1lZGlhID8gYWNjb3JkaW9uR3JvdXAuaXRlbSA6IGFjY29yZGlvbkdyb3VwO1xuICAgICAgaWYgKG1hdGNoTWVkaWEubWF0Y2hlcyB8fCAhbWF0Y2hNZWRpYSkge1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JTklUKTtcbiAgICAgICAgdGhpcy5pbml0Qm9keShhY2NvcmRpb25Hcm91cCk7XG4gICAgICAgIGFjY29yZGlvbkdyb3VwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRBY3Rpb25zLmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRoaXMuaW5pdEJvZHkoYWNjb3JkaW9uR3JvdXAsIGZhbHNlKTtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IEFjY29yZGlvbigpO1xuIiwiaW1wb3J0IHsgbW9kdWxlcyB9IGZyb20gJy4uL21vZHVsZXMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIFJFUVVJUkVEOiAnZGF0YS1yZXF1aXJlZCcsXG4gICAgICBJR05PUkVfVkFMSURBVElPTjogJ2RhdGEtaWdub3JlLXZhbGlkYXRpb24nLFxuICAgICAgQUpBWDogJ2RhdGEtYWpheCcsXG4gICAgICBERVY6ICdkYXRhLWRldicsXG4gICAgICBJR05PUkVfRk9DVVM6ICdkYXRhLWlnbm9yZS1mb2N1cycsXG4gICAgICBTSE9XX1BMQUNFSE9MREVSOiAnZGF0YS1zaG93LXBsYWNlaG9sZGVyJyxcbiAgICAgIFZBTElEQVRFOiAnZGF0YS12YWxpZGF0ZScsXG4gICAgfTtcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICBIQVNfRVJST1I6ICdfaGFzLWVycm9yJyxcbiAgICAgIEhBU19GT0NVUzogJ19oYXMtZm9jdXMnLFxuICAgICAgSVNfRklMTEVEOiAnX2lzLWZpbGxlZCcsXG4gICAgICBJU19SRVZFQUxFRDogJ19pcy1yZXZlYWxlZCdcbiAgICB9O1xuICB9XG5cbiAgZ2V0RXJyb3JzKGZvcm0pIHtcbiAgICBsZXQgZXJyID0gMDtcbiAgICBsZXQgcmVxdWlyZWRGaWVsZHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoYCpbJHt0aGlzLmF0dHJzLlJFUVVJUkVEfV1gKTtcblxuICAgIGlmIChyZXF1aXJlZEZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2gocmVxdWlyZWRGaWVsZCA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAocmVxdWlyZWRGaWVsZC5vZmZzZXRQYXJlbnQgIT09IG51bGwgfHxcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGQudGFnTmFtZSA9PT0gJ1NFTEVDVCcpICYmXG4gICAgICAgICAgIXJlcXVpcmVkRmllbGQuZGlzYWJsZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgZXJyICs9IHRoaXMudmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH1cblxuICBhZGRFcnJvcihyZXF1aXJlZEZpZWxkKSB7XG4gICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICB9XG5cbiAgcmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCkge1xuICAgIHJlcXVpcmVkRmllbGQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICByZXF1aXJlZEZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgfVxuXG4gIHZhbGlkYXRlRmllbGQocmVxdWlyZWRGaWVsZCkge1xuICAgIGxldCBlcnIgPSAwO1xuXG4gICAgaWYgKHJlcXVpcmVkRmllbGQuZGF0YXNldC5yZXF1aXJlZCA9PT0gJ2VtYWlsJykge1xuICAgICAgcmVxdWlyZWRGaWVsZC52YWx1ZSA9IHJlcXVpcmVkRmllbGQudmFsdWUucmVwbGFjZSgnICcsICcnKTtcblxuICAgICAgaWYgKHRoaXMudGVzdEVtYWlsKHJlcXVpcmVkRmllbGQpKSB7XG4gICAgICAgIHRoaXMuYWRkRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICAgIGVycisrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlcXVpcmVkRmllbGQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiAhcmVxdWlyZWRGaWVsZC5jaGVja2VkKSB7XG4gICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgZXJyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghcmVxdWlyZWRGaWVsZC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgZXJyKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9XG5cbiAgY2xlYXJGaWVsZHMoZm9ybSkge1xuICAgIGZvcm0ucmVzZXQoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cbiAgICAgIGlmIChpbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpbnB1dHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3QgaW5wdXQgPSBpbnB1dHNbaW5kZXhdO1xuXG4gICAgICAgICAgaW5wdXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjaGVja2JveGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hlY2tib3hlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94ZXNbaW5kZXhdO1xuICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgdGVzdEVtYWlsKHJlcXVpcmVkRmllbGQpIHtcbiAgICByZXR1cm4gIS9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7Miw4fSkrJC8udGVzdChcbiAgICAgIHJlcXVpcmVkRmllbGQudmFsdWVcbiAgICApO1xuICB9XG59XG5jbGFzcyBGb3JtU3VibWl0aW9uIGV4dGVuZHMgVmFsaWRhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHNob3VsZFZhbGlkYXRlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNob3VsZFZhbGlkYXRlID0gc2hvdWxkVmFsaWRhdGUgPyBzaG91bGRWYWxpZGF0ZSA6IHRydWU7XG4gICAgdGhpcy5mb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHNlbmRGb3JtKGZvcm0sIHJlc3BvbnNlUmVzdWx0ID0gYGApIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZW5kRm9ybScsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgZm9ybTogZm9ybSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIHNob3cgbW9kYWwsIGlmIHBvcHVwIG1vZHVsZSBpcyBjb25uZWN0ZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChtb2R1bGVzLnBvcHVwKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZm9ybS5kYXRhc2V0Lm1vZGFsTWVzc2FnZTtcbiAgICAgICAgbW9kYWwgPyBtb2R1bGVzLm1vZGFsLm9wZW4obW9kYWwpIDogbnVsbDtcbiAgICAgIH1cbiAgICB9LCAwKTtcblxuICAgIHRoaXMuY2xlYXJGaWVsZHMoZm9ybSk7XG5cbiAgICBjb25zb2xlLmxvZygnaXMgc2VudCcpO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU3VibWl0aW9uKGZvcm0sIGUpIHtcbiAgICBjb25zdCBlcnIgPSAhZm9ybS5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfVkFMSURBVElPTilcbiAgICAgID8gdGhpcy5nZXRFcnJvcnMoZm9ybSlcbiAgICAgIDogMDtcblxuICAgIGlmIChlcnIgPT09IDApIHtcbiAgICAgIGNvbnN0IGFqYXggPSBmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkFKQVgpO1xuXG4gICAgICBpZiAoYWpheCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpXG4gICAgICAgICAgPyBmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJykudHJpbSgpXG4gICAgICAgICAgOiAnIyc7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdtZXRob2QnKVxuICAgICAgICAgID8gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpLnRyaW0oKVxuICAgICAgICAgIDogJ0dFVCc7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdfaXMtc2VuZGluZycpO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWN0aW9uLCB7XG4gICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnX2lzLXNlbmRpbmcnKTtcbiAgICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0sIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ2Vycm9yJyk7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuREVWKSkge1xuICAgICAgICAvLyBpbiBkZXZlbG9wbWVudCBtb2RlXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kRm9ybShmb3JtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHBhc3N3b3JkRmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVxdWlyZWQ9XCJwYXNzXCJdJylcblxuICAgIGlmICh0aGlzLmZvcm1zLmxlbmd0aCkge1xuICAgICAgdGhpcy5mb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgX3RoaXMuaGFuZGxlU3VibWl0aW9uKGUudGFyZ2V0LCBlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIF90aGlzLmNsZWFyRmllbGRzKGUudGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocGFzc3dvcmRGaWVsZHMubGVuZ3RoKSB7XG4gICAgICBwYXNzd29yZEZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgY29uc3QgYnRuID0gZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nXG5cbiAgICAgICAgaWYgKGJ0bikge1xuICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAgZmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoX3RoaXMuY2xhc3Nlcy5JU19SRVZFQUxFRClcbiAgICAgICAgICAgICAgICA/ICdwYXNzd29yZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0J1xuICAgICAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSlcbiAgICAgICAgICAgIGZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShfdGhpcy5jbGFzc2VzLklTX1JFVkVBTEVEKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5jbGFzcyBGb3JtRmllbGRzIGV4dGVuZHMgVmFsaWRhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2F2ZVBsYWNlaG9sZGVyKCkge1xuICAgIGlmICh0aGlzLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBpZiAoIWZpZWxkLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLlNIT1dfUExBQ0VIT0xERVIpKSB7XG4gICAgICAgICAgZmllbGQuZGF0YXNldC5wbGFjZWhvbGRlciA9IGZpZWxkLnBsYWNlaG9sZGVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1c2luKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB0YXJnZXQucGxhY2Vob2xkZXIgPSAnJztcblxuICAgICAgaWYgKCF0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX0ZPQ1VTKSkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2ZpbGUnICYmIHRhcmdldC50eXBlICE9PSAnY2hlY2tib3gnICYmIHRhcmdldC50eXBlICE9PSAncmFkaW8nKSB7XG4gICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW1vdmVFcnJvcih0YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3Vzb3V0KGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIGlmICh0YXJnZXQuZGF0YXNldC5wbGFjZWhvbGRlcikge1xuICAgICAgICB0YXJnZXQucGxhY2Vob2xkZXIgPSB0YXJnZXQuZGF0YXNldC5wbGFjZWhvbGRlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX0ZPQ1VTKSkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuVkFMSURBVEUpKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVGaWVsZCh0YXJnZXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdmaWxlJyAmJiB0YXJnZXQudHlwZSAhPT0gJ2NoZWNrYm94JyAmJiB0YXJnZXQudHlwZSAhPT0gJ3JhZGlvJykge1xuICAgICAgICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkhBU19FUlJPUikgJiYgdGFyZ2V0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuaW5wdXQnKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBzYXZlIHBsYWNlaG9sZGVyIGluIGRhdGEgYXR0cmlidXRlXG4gICAgdGhpcy5zYXZlUGxhY2Vob2xkZXIoKTtcblxuICAgIC8vIGhhbmRsZSBzdWJtaXRpb25cbiAgICBuZXcgRm9ybVN1Ym1pdGlvbigpO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5oYW5kbGVGb2N1c2luLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLmhhbmRsZUZvY3Vzb3V0LmJpbmQodGhpcykpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm5ldyBGb3JtRmllbGRzKCk7XG4iLCJpbXBvcnQgeyBtb2R1bGVzIH0gZnJvbSAnLi4vbW9kdWxlcy5qcyc7XG5pbXBvcnQgeyBib2R5TG9ja1N0YXR1cywgYm9keUxvY2ssIGJvZHlVbmxvY2sgfSBmcm9tICcuLi91dGlscy91dGlscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGxldCBjb25maWcgPSB7XG4gICAgICBsb2dnaW5nOiB0cnVlLFxuICAgICAgaW5pdDogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZU9wZW5CdXR0b246ICdkYXRhLW1vZGFsJyxcbiAgICAgIGF0dHJpYnV0ZUNsb3NlQnV0dG9uOiAnZGF0YS1jbG9zZScsXG4gICAgICBmaXhFbGVtZW50U2VsZWN0b3I6ICdbZGF0YS1scF0nLFxuICAgICAgeW91dHViZUF0dHJpYnV0ZTogJ2RhdGEtbW9kYWwteW91dHViZScsXG4gICAgICB5b3V0dWJlUGxhY2VBdHRyaWJ1dGU6ICdkYXRhLW1vZGFsLXlvdXR1YmUtcGxhY2UnLFxuICAgICAgc2V0QXV0b3BsYXlZb3V0dWJlOiB0cnVlLFxuICAgICAgY2xhc3Nlczoge1xuICAgICAgICBtb2RhbDogJ21vZGFsJyxcbiAgICAgICAgLy8gbW9kYWxXcmFwcGVyOiAnbW9kYWxfX3dyYXBwZXInLFxuICAgICAgICBtb2RhbENvbnRlbnQ6ICdtb2RhbF9fY29udGVudCcsXG4gICAgICAgIG1vZGFsQWN0aXZlOiAnbW9kYWxfc2hvdycsXG4gICAgICAgIGJvZHlBY3RpdmU6ICdtb2RhbC1zaG93JyxcbiAgICAgIH0sXG4gICAgICBmb2N1c0NhdGNoOiB0cnVlLFxuICAgICAgY2xvc2VFc2M6IHRydWUsXG4gICAgICBib2R5TG9jazogdHJ1ZSxcbiAgICAgIGhhc2hTZXR0aW5nczoge1xuICAgICAgICBsb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgZ29IYXNoOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBhZnRlck9wZW46IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGFmdGVyQ2xvc2U6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMueW91VHViZUNvZGU7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnRhcmdldE9wZW4gPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMucHJldmlvdXNPcGVuID0ge1xuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgZWxlbWVudDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmxhc3RDbG9zZWQgPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuX2RhdGFWYWx1ZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFzaCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcmVvcGVuID0gZmFsc2U7XG4gICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gZmFsc2U7XG5cbiAgICB0aGlzLmxhc3RGb2N1c0VsID0gZmFsc2U7XG4gICAgdGhpcy5fZm9jdXNFbCA9IFtcbiAgICAgICdhW2hyZWZdJyxcbiAgICAgICdpbnB1dDpub3QoW2Rpc2FibGVkXSk6bm90KFt0eXBlPVwiaGlkZGVuXCJdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnYXJlYVtocmVmXScsXG4gICAgICAnaWZyYW1lJyxcbiAgICAgICdvYmplY3QnLFxuICAgICAgJ2VtYmVkJyxcbiAgICAgICdbY29udGVudGVkaXRhYmxlXScsXG4gICAgICAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJyxcbiAgICBdO1xuICAgIC8vdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihjb25maWcsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgIC4uLmNvbmZpZy5jbGFzc2VzLFxuICAgICAgICAuLi5vcHRpb25zPy5jbGFzc2VzLFxuICAgICAgfSxcbiAgICAgIGhhc2hTZXR0aW5nczoge1xuICAgICAgICAuLi5jb25maWcuaGFzaFNldHRpbmdzLFxuICAgICAgICAuLi5vcHRpb25zPy5oYXNoU2V0dGluZ3MsXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgLi4uY29uZmlnLm9uLFxuICAgICAgICAuLi5vcHRpb25zPy5vbixcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLmJvZHlMb2NrID0gZmFsc2U7XG4gICAgdGhpcy5vcHRpb25zLmluaXQgPyB0aGlzLmluaXRtb2RhbHMoKSA6IG51bGw7XG4gIH1cbiAgaW5pdG1vZGFscygpIHtcbiAgICB0aGlzLmV2ZW50c21vZGFsKCk7XG4gIH1cbiAgZXZlbnRzbW9kYWwoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBidXR0b25PcGVuID0gZS50YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259XWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGJ1dHRvbk9wZW4pIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0YVZhbHVlID0gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvblxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUodGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b24pXG4gICAgICAgICAgICA6ICdlcnJvcic7XG4gICAgICAgICAgdGhpcy55b3VUdWJlQ29kZSA9IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnlvdXR1YmVBdHRyaWJ1dGVcbiAgICAgICAgICApXG4gICAgICAgICAgICA/IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKHRoaXMub3B0aW9ucy55b3V0dWJlQXR0cmlidXRlKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgIGlmICh0aGlzLl9kYXRhVmFsdWUgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc09wZW4pIHRoaXMubGFzdEZvY3VzRWwgPSBidXR0b25PcGVuO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yID0gYCR7dGhpcy5fZGF0YVZhbHVlfWA7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNsb3NlID0gZS50YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZUNsb3NlQnV0dG9ufV1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdCgnI3VuY29uZmlybWVkQWdlTW9kYWwnKSAmJlxuICAgICAgICAgICFlLnRhcmdldC5jbG9zZXN0KCcjY29uZmlybUFnZU1vZGFsJykgJiZcbiAgICAgICAgICAoYnV0dG9uQ2xvc2UgfHxcbiAgICAgICAgICAgICghZS50YXJnZXQuY2xvc2VzdChgLiR7dGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxDb250ZW50fWApICYmXG4gICAgICAgICAgICAgIHRoaXMuaXNPcGVuKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdrZXlkb3duJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuY2xvc2VFc2MgJiZcbiAgICAgICAgICBlLndoaWNoID09IDI3ICYmXG4gICAgICAgICAgZS5jb2RlID09PSAnRXNjYXBlJyAmJlxuICAgICAgICAgIHRoaXMuaXNPcGVuXG4gICAgICAgICkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9jdXNDYXRjaCAmJiBlLndoaWNoID09IDkgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICB0aGlzLl9mb2N1c0NhdGNoKGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmdvSGFzaCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdoYXNoY2hhbmdlJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlblRvSGFzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnbG9hZCcsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMuX29wZW5Ub0hhc2goKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgb3BlbihzZWxlY3RvclZhbHVlKSB7XG4gICAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgICB0aGlzLmJvZHlMb2NrID1cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9jaycpICYmICF0aGlzLmlzT3BlblxuICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0b3JWYWx1ZSAmJlxuICAgICAgICB0eXBlb2Ygc2VsZWN0b3JWYWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgc2VsZWN0b3JWYWx1ZS50cmltKCkgIT09ICcnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yID0gc2VsZWN0b3JWYWx1ZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICB0aGlzLl9yZW9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NlbGVjdG9yT3BlbilcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yID0gdGhpcy5sYXN0Q2xvc2VkLnNlbGVjdG9yO1xuICAgICAgaWYgKCF0aGlzLl9yZW9wZW4pIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3JcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLnRhcmdldE9wZW4uZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy55b3VUdWJlQ29kZSkge1xuICAgICAgICAgIGNvbnN0IGNvZGVWaWRlbyA9IHRoaXMueW91VHViZUNvZGU7XG4gICAgICAgICAgY29uc3QgdXJsVmlkZW8gPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHtjb2RlVmlkZW99P3JlbD0wJnNob3dpbmZvPTAmYXV0b3BsYXk9MWA7XG4gICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuXG4gICAgICAgICAgY29uc3QgYXV0b3BsYXkgPSB0aGlzLm9wdGlvbnMuc2V0QXV0b3BsYXlZb3V0dWJlID8gJ2F1dG9wbGF5OycgOiAnJztcbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvdycsIGAke2F1dG9wbGF5fTsgZW5jcnlwdGVkLW1lZGlhYCk7XG5cbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmxWaWRlbyk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdXR1YmVQbGFjZSA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX3RleHQnKVxuICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlKGAke3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9YCwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWApXG4gICAgICAgICAgICAuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhhc2hTZXR0aW5ncy5sb2NhdGlvbikge1xuICAgICAgICAgIHRoaXMuX2dldEhhc2goKTtcbiAgICAgICAgICB0aGlzLl9zZXRIYXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnMub24uYmVmb3JlT3Blbih0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2JlZm9yZW1vZGFsT3BlbicsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQWN0aXZlKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzZXMuYm9keUFjdGl2ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9yZW9wZW4pIHtcbiAgICAgICAgICBjb25zdCBtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmhhc2gpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgKCF0aGlzLmJvZHlMb2NrICYmICFtLmhhc0F0dHJpYnV0ZSgnZGF0YS1ibC1tb2JpbGUnKSkgfHxcbiAgICAgICAgICAgICghdGhpcy5ib2R5TG9jayAmJlxuICAgICAgICAgICAgICB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjggJiZcbiAgICAgICAgICAgICAgbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYmwtbW9iaWxlJykpXG4gICAgICAgICAgICAgID8gYm9keUxvY2soKVxuICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0gZWxzZSB0aGlzLl9yZW9wZW4gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c09wZW4uc2VsZWN0b3IgPSB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3I7XG4gICAgICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQgPSB0aGlzLnRhcmdldE9wZW4uZWxlbWVudDtcblxuICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZm9jdXNUcmFwKCk7XG4gICAgICAgIH0sIDUwKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMub24uYWZ0ZXJPcGVuKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnYWZ0ZXJtb2RhbE9wZW4nLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNsb3NlKHNlbGVjdG9yVmFsdWUpIHtcbiAgICBpZiAoXG4gICAgICBzZWxlY3RvclZhbHVlICYmXG4gICAgICB0eXBlb2Ygc2VsZWN0b3JWYWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgIHNlbGVjdG9yVmFsdWUudHJpbSgpICE9PSAnJ1xuICAgICkge1xuICAgICAgdGhpcy5wcmV2aW91c09wZW4uc2VsZWN0b3IgPSBzZWxlY3RvclZhbHVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNPcGVuIHx8ICFib2R5TG9ja1N0YXR1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMub24uYmVmb3JlQ2xvc2UodGhpcyk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnYmVmb3JlbW9kYWxDbG9zZScsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodGhpcy55b3VUdWJlQ29kZSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICApLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgICB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbEFjdGl2ZVxuICAgICk7XG4gICAgLy8gYXJpYS1oaWRkZW5cbiAgICB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmICghdGhpcy5fcmVvcGVuKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgdGhpcy5vcHRpb25zLmNsYXNzZXMuYm9keUFjdGl2ZVxuICAgICAgKTtcbiAgICAgICF0aGlzLmJvZHlMb2NrID8gYm9keVVubG9jaygpIDogbnVsbDtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZUhhc2goKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0b3JPcGVuKSB7XG4gICAgICB0aGlzLmxhc3RDbG9zZWQuc2VsZWN0b3IgPSB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvcjtcbiAgICAgIHRoaXMubGFzdENsb3NlZC5lbGVtZW50ID0gdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudDtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zLm9uLmFmdGVyQ2xvc2UodGhpcyk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnYWZ0ZXJtb2RhbENsb3NlJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZm9jdXNUcmFwKCk7XG4gICAgfSwgNTApO1xuICB9XG4gIF9nZXRIYXNoKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmxvY2F0aW9uKSB7XG4gICAgICB0aGlzLmhhc2ggPSB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IuaW5jbHVkZXMoJyMnKVxuICAgICAgICA/IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvclxuICAgICAgICA6IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvci5yZXBsYWNlKCcuJywgJyMnKTtcbiAgICB9XG4gIH1cbiAgX29wZW5Ub0hhc2goKSB7XG4gICAgbGV0IGNsYXNzSW5IYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpfWBcbiAgICApXG4gICAgICA/IGAuJHt3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpfWBcbiAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHt3aW5kb3cubG9jYXRpb24uaGFzaH1gKVxuICAgICAgPyBgJHt3aW5kb3cubG9jYXRpb24uaGFzaH1gXG4gICAgICA6IG51bGw7XG5cbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2h9XCJdYFxuICAgIClcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259ID0gXCIke2NsYXNzSW5IYXNofVwiXWBcbiAgICAgICAgKVxuICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2gucmVwbGFjZShcbiAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICcjJ1xuICAgICAgICAgICl9XCJdYFxuICAgICAgICApO1xuICAgIGlmIChidXR0b25zICYmIGNsYXNzSW5IYXNoKSB0aGlzLm9wZW4oY2xhc3NJbkhhc2gpO1xuICB9XG4gIF9zZXRIYXNoKCkge1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgdGhpcy5oYXNoKTtcbiAgfVxuICBfcmVtb3ZlSGFzaCgpIHtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF0pO1xuICB9XG4gIF9mb2N1c0NhdGNoKGUpIHtcbiAgICBjb25zdCBmb2N1c2FibGUgPSB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzRWwpO1xuICAgIGNvbnN0IGZvY3VzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmb2N1c2FibGUpO1xuICAgIGNvbnN0IGZvY3VzZWRJbmRleCA9IGZvY3VzQXJyYXkuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgIGlmIChlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gMCkge1xuICAgICAgZm9jdXNBcnJheVtmb2N1c0FycmF5Lmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IGZvY3VzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgZm9jdXNBcnJheVswXS5mb2N1cygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuICBfZm9jdXNUcmFwKCkge1xuICAgIGNvbnN0IGZvY3VzYWJsZSA9IHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c0VsKTtcbiAgICBpZiAoIXRoaXMuaXNPcGVuICYmIHRoaXMubGFzdEZvY3VzRWwpIHtcbiAgICAgIHRoaXMubGFzdEZvY3VzRWwuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9jdXNhYmxlWzBdLmZvY3VzKCk7XG4gICAgfVxuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZXMubW9kYWwgPSBuZXcgTW9kYWwoe30pO1xuIiwiaW1wb3J0IFNpbXBsZUJhciBmcm9tICdzaW1wbGViYXInO1xuaW1wb3J0ICdzaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzJztcbmltcG9ydCB7IF9zbGlkZVVwLCBfc2xpZGVEb3duLCBfc2xpZGVUb2dnbGUgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XG4gIC8vIHNldHVwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gY3VzdG9tIHNlbGVjdCBjbGFzc2VzXG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgLy8gaHRtbCBidWlsZCBjbGFzc2VzXG4gICAgICBTRUxFQ1Q6ICdzZWxlY3QnLFxuICAgICAgQk9EWTogJ3NlbGVjdF9fYm9keScsXG4gICAgICBMQUJFTDogJ3NlbGVjdF9fbGFiZWwnLFxuICAgICAgVElUTEU6ICdzZWxlY3RfX3RpdGxlJyxcbiAgICAgIFZBTFVFOiAnc2VsZWN0X192YWx1ZScsXG4gICAgICBDT05URU5UOiAnc2VsZWN0X19jb250ZW50JyxcbiAgICAgIE9QVElPTlM6ICdzZWxlY3RfX29wdGlvbnMnLFxuICAgICAgT1BUSU9OOiAnc2VsZWN0X19vcHRpb24nLFxuICAgICAgU0NST0xMOiAnc2VsZWN0X19zY3JvbGwnLFxuICAgICAgR1JPVVA6ICdzZWxlY3RfX2dyb3VwJyxcbiAgICAgIElOUFVUOiAnc2VsZWN0X19pbnB1dCcsXG4gICAgICBBU1NFVDogJ3NlbGVjdF9fYXNzZXQnLFxuICAgICAgVFhUOiAnc2VsZWN0X190ZXh0JyxcblxuICAgICAgLy8gc3RhdGUgY2xhc3Nlc1xuICAgICAgSVNfQUNUSVZFOiAnX2lzLWFjdGl2ZScsXG4gICAgICBJU19GT0NVU0VEOiAnX2lzLWZvY3VzZWQnLFxuICAgICAgSVNfT1BFTkVEOiAnX2lzLW9wZW5lZCcsXG4gICAgICBJU19GSUxMRUQ6ICdfaXMtZmlsbGVkJyxcbiAgICAgIElTX1NFTEVDVEVEOiAnX2lzLXNlbGVjdGVkJyxcbiAgICAgIElTX0RJU0FCTEVEOiAnX2lzLWRpc2FibGVkJyxcblxuICAgICAgLy8gYWRkaXRpb25hbCBjbGFzc2VzXG4gICAgICBIQVNfTElTVDogJ19oYXMtbGlzdCcsXG4gICAgICBIQVNfRVJST1I6ICdfaGFzLWVycm9yJyxcbiAgICAgIEhBU19NVUxUSVBMRTogJ19oYXMtbXVsdGlwbGUnLFxuICAgICAgSEFTX0NIRUNLQk9YOiAnX2hhcy1jaGVja2JveCcsXG4gICAgICBIQVNfTEFCRUw6ICdfaGFzLWxhYmVsJyxcbiAgICB9O1xuXG4gICAgLy8gYWxsIHNlbGVjdCBpdGVtc1xuICAgIGNvbnN0IHNlbGVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKTtcbiAgICBpZiAoc2VsZWN0TGlzdC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5pdChzZWxlY3RMaXN0KTtcbiAgICB9XG4gIH1cblxuICAvLyBzZWxlY3QgaW5pdGlhbGl6YXRpb24gJiBidWlsZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBpbml0aWFsaXphdGlvblxuICBpbml0KHNlbGVjdExpc3QpIHtcbiAgICAvLyBpbml0XG4gICAgc2VsZWN0TGlzdC5mb3JFYWNoKChzZWxlY3QsIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmluaXRTZWxJdGVtKHNlbGVjdCwgaW5kZXggKyAxKTtcbiAgICB9KTtcblxuICAgIC8vIGV2ZW50c1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2tleWRvd24nLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2ZvY3VzaW4nLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2ZvY3Vzb3V0JyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuc2V0QWN0aW9ucyhlKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gIH1cbiAgLy8gc2luZ2xlIHNlbGVjdCBpdGVtIGluaXRpYWxpemF0aW9uXG4gIGluaXRTZWxJdGVtKHJlbGF0aXZlU2VsLCBpbmRleCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5TRUxFQ1QpO1xuICAgIHJlbGF0aXZlU2VsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChyZWxhdGl2ZVNlbCk7XG4gICAgcmVsYXRpdmVTZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICBpbmRleCA/IChyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbElkID0gaW5kZXgpIDogbnVsbDtcblxuICAgIGlmICh0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKSkge1xuICAgICAgcmVsYXRpdmVTZWwuZGF0YXNldC5vcHRQbGFjZWhvbGRlciA9XG4gICAgICAgIHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLnZhbHVlO1xuICAgICAgaWYgKHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLmxhYmVsLnNob3cpIHtcbiAgICAgICAgY29uc3Qgc2VsVGl0bGUgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QsIHRoaXMuY2xhc3Nlcy5USVRMRSkudHdpblNlbDtcbiAgICAgICAgc2VsVGl0bGUuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICdhZnRlcmJlZ2luJyxcbiAgICAgICAgICBgPHNwYW4gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5MQUJFTH1cIj4ke1xuICAgICAgICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwudGV4dFxuICAgICAgICAgICAgICA/IHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLmxhYmVsLnRleHRcbiAgICAgICAgICAgICAgOiB0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS52YWx1ZVxuICAgICAgICAgIH08L3NwYW4+YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICBgPGRpdiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLkJPRFl9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgJHtcbiAgICAgICAgICAgICAgICAgICAgICAhcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5vLXNsaWRlJykgPyAnaGlkZGVuJyA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0gIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuT1BUSU9OU31cIj5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgKTtcblxuICAgIHRoaXMuYnVpbGQocmVsYXRpdmVTZWwpO1xuXG4gICAgcmVsYXRpdmVTZWwuZGF0YXNldC5zcGVlZCA9IHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWRcbiAgICAgID8gcmVsYXRpdmVTZWwuZGF0YXNldC5zcGVlZFxuICAgICAgOiAnMTUwJztcbiAgICByZWxhdGl2ZVNlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgX3RoaXMuaW5pdFNlbGVjdGlvbnMoZSk7XG4gICAgfSk7XG4gIH1cbiAgLy8gc2VsZWN0IGJ1aWxkXG4gIGJ1aWxkKHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsZWN0ID0gcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudDtcblxuICAgIC8vIHNldCBpZFxuICAgIHNlbGVjdC5kYXRhc2V0LnNlbElkID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxJZDtcbiAgICAvLyBzZXQgdmFsdWVcbiAgICB0aGlzLnNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIC8vIHNldCBvcHRpb25zXG4gICAgdGhpcy5zZXRPcHRpb25zKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIC8vIHNldCBjc3MgbW9kaWZpY2F0b3JcbiAgICByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEFkZG9uQ2xhc3NcbiAgICAgID8gc2VsZWN0LmNsYXNzTGlzdC5hZGQoYHNlbGVjdF8ke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsQWRkb25DbGFzc31gKVxuICAgICAgOiBudWxsO1xuICAgIC8vIHNldCBjbGFzcyBpZiBzZWxlY3QgaXMgbXVsdGlwbGVcbiAgICByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgPyBzZWxlY3QuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSEFTX01VTFRJUExFKVxuICAgICAgOiBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX01VTFRJUExFKTtcbiAgICAvLyBzZXQgY2xhc3MgaWYgc2VsZWN0IGNoZWNrYm94ZXMgYXJlIHNldFxuICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtY2hlY2tib3hlcycpICYmIHJlbGF0aXZlU2VsLm11bHRpcGxlXG4gICAgICA/IHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfQ0hFQ0tCT1gpXG4gICAgICA6IHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfQ0hFQ0tCT1gpO1xuICAgIC8vIGRpc2FibGUgc2VsZWN0XG4gICAgdGhpcy5kaXNhYmxlU2VsZWN0KHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIC8vIHNldCBzZWFyY2ggYWN0aW9ucyBpZiBkYXRhLXNlbC1zZWFyY2ggaXMgc2V0XG4gICAgcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKVxuICAgICAgPyB0aGlzLnNldFNlYXJjaEFjdGlvbnMoc2VsZWN0KVxuICAgICAgOiBudWxsO1xuICAgIC8vIHNldCBzZWxlY3QgYWN0aW9ucyBpZiBpdCdzIGluaXRpYWxseSBvcGVuZWRcbiAgICByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLW9wZW5lZCcpID8gdGhpcy5zZXRBY3Rpb24oc2VsZWN0KSA6IG51bGw7XG5cbiAgICAvLyBzZXQgc2VsZWN0IGhpbnRcbiAgICBpZiAocmVsYXRpdmVTZWwuZGF0YXNldC5zZWxIaW50KSB7XG4gICAgICByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwic2VsZWN0X19oaW50XCI+JHtyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnR9PC9kaXY+YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBzaG93IC8gaGlkZSBzZWxlY3Rpb24gZnJvbSBzZWxlY3QgdGl0bGVcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctdmFsJykpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKCdfc2VsZWN0LXNob3ctdmFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdfc2VsZWN0LXNob3ctdmFsJyk7XG4gICAgfVxuICB9XG4gIC8vIHNldCB0d2luIHNlbGVjdCB0aXRsZSB2YWx1ZVxuICBzZXRWYWx1ZShzZWxlY3QsIHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsQm9keSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLkJPRFkpLnR3aW5TZWw7XG4gICAgY29uc3Qgc2VsVGl0bGUgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QsIHRoaXMuY2xhc3Nlcy5USVRMRSkudHdpblNlbDtcblxuICAgIGlmIChzZWxUaXRsZSkgc2VsVGl0bGUucmVtb3ZlKCk7XG4gICAgc2VsQm9keS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYWZ0ZXJiZWdpbicsXG4gICAgICB0aGlzLmdldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpXG4gICAgKTtcbiAgfVxuICAvLyBzZXQgdHdpbiBzZWxlY3Qgb3B0aW9uc1xuICBzZXRPcHRpb25zKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLk9QVElPTlMpLnR3aW5TZWw7XG4gICAgY29uc3QgcmVsYXRpdmVTZWxPcHRpb25zID0gdGhpcy5nZXRTZWxlY3QoXG4gICAgICBzZWxlY3QsXG4gICAgICB0aGlzLmNsYXNzZXMuT1BUSU9OU1xuICAgICkucmVsYXRpdmVTZWw7XG4gICAgb3B0aW9ucy5pbm5lckhUTUwgPSB0aGlzLmdldE9wdGlvbnMocmVsYXRpdmVTZWwpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5nZXRPcHRpb25zKHJlbGF0aXZlU2VsKTtcbiAgICB9KTtcbiAgICBpZiAocmVsYXRpdmVTZWxPcHRpb25zLnF1ZXJ5U2VsZWN0b3IoJ1tzZWxlY3RlZF0nKSkge1xuICAgICAgb3B0aW9uc1xuICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5jbGFzc2VzLk9QVElPTn1gKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUQpO1xuICAgIH1cbiAgfVxuICAvLyBkaXNhYmxlIHNlbGVjdFxuICBkaXNhYmxlU2VsZWN0KHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBpZiAocmVsYXRpdmVTZWwuZGlzYWJsZWQpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19ESVNBQkxFRCk7XG4gICAgICB0aGlzLmdldFNlbGVjdChzZWxlY3QsIHRoaXMuY2xhc3Nlcy5USVRMRSkudHdpblNlbC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19ESVNBQkxFRCk7XG4gICAgICB0aGlzLmdldFNlbGVjdChzZWxlY3QsIHRoaXMuY2xhc3Nlcy5USVRMRSkudHdpblNlbC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIG1haW4gYWN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIHNldCBtYWluIGFjdGlvbnNcbiAgc2V0QWN0aW9ucyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgY29uc3QgdHlwZSA9IGUudHlwZTtcblxuICAgIGlmIChcbiAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLlNFTEVDVCkpIHx8XG4gICAgICB0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVCkpXG4gICAgKSB7XG4gICAgICBjb25zdCBzZWxlY3QgPSB0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdCcpXG4gICAgICAgID8gdGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3QnKVxuICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgLiR7dGhpcy5jbGFzc2VzLnNlbH1bZGF0YS1zZWwtaWQ9XCIke1xuICAgICAgICAgICAgICB0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVCkpLmRhdGFzZXRcbiAgICAgICAgICAgICAgICAuc2VsZWN0SWRcbiAgICAgICAgICAgIH1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlU2VsID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0KS5yZWxhdGl2ZVNlbDtcbiAgICAgIGlmICh0eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgIGlmICghcmVsYXRpdmVTZWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuSEFTX0xJU1QpKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsTGlzdCA9IHRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgICAgICB0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBzZWxPcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgLiR7dGhpcy5jbGFzc2VzLlNFTEVDVH1bZGF0YS1zZWwtaWQ9XCIke3NlbExpc3QuZGF0YXNldC5zZWxJZH1cIl0gLnNlbGVjdF9fb3B0aW9uW2RhdGEtb3B0LXZhbD1cIiR7c2VsTGlzdC5kYXRhc2V0Lm9wdFZhbH1cIl1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25BY3Rpb24oc2VsZWN0LCByZWxhdGl2ZVNlbCwgc2VsT3B0aW9uKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLlRJVExFKSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uKHNlbGVjdCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5PUFRJT04pKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsT3B0aW9uID0gdGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBzZWxPcHRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZm9jdXNpbicgfHwgdHlwZSA9PT0gJ2ZvY3Vzb3V0Jykge1xuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuU0VMRUNUKSkpIHtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ2ZvY3VzaW4nKSB7XG4gICAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSVNfRk9DVVNFRCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19GT0NVU0VEKTtcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmFsaWRhdGUnKSkge1xuICAgICAgICAgICAgICBpZiAoIXNlbGVjdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLklTX0ZJTExFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycihyZWxhdGl2ZVNlbCwgc2VsZWN0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVycihyZWxhdGl2ZVNlbCwgc2VsZWN0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAna2V5ZG93bicgJiYgZS5jb2RlID09PSAnRXNjYXBlJykge1xuICAgICAgICB0aGlzLmNsb3NlR3JvdXAoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZUdyb3VwKCk7XG4gICAgfVxuICB9XG4gIC8vIHNldCBzaW5nbGUgc2VsZWN0IGFjdGlvblxuICBzZXRBY3Rpb24oc2VsZWN0KSB7XG4gICAgY29uc3QgcmVsYXRpdmVTZWwgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QpLnJlbGF0aXZlU2VsO1xuICAgIGNvbnN0IHNlbE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QsIHRoaXMuY2xhc3Nlcy5PUFRJT05TKS50d2luU2VsO1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdC1zaW5nbGVdJykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdE9uZUdyb3VwID0gcmVsYXRpdmVTZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0LXNpbmdsZV0nKTtcbiAgICAgIHRoaXMuY2xvc2VHcm91cChzZWxlY3RPbmVHcm91cCwgcmVsYXRpdmVTZWwpO1xuICAgIH1cblxuICAgIGlmICghc2VsT3B0aW9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzZXMuSVNfT1BFTkVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5vLXNsaWRlJykpXG4gICAgICAgIF9zbGlkZVRvZ2dsZShzZWxPcHRpb25zLCByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkKTtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSVNfT1BFTkVEKSAmJlxuICAgICAgICByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmFsaWRhdGUnKSAmJlxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGNsb3NlIHNpbmdsZSBzZWxlY3QgZ3JvdXBcbiAgY2xvc2VHcm91cChncm91cCwgc2VsZWN0KSB7XG4gICAgY29uc3Qgc2VsR3JvdXAgPSBncm91cCA/IGdyb3VwIDogZG9jdW1lbnQ7XG4gICAgY29uc3Qgc2VsZWN0aW9ucyA9IHNlbEdyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgJHt0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5TRUxFQ1QpfSR7dGhpcy5nZXRDbGFzcyhcbiAgICAgICAgdGhpcy5jbGFzc2VzLklTX09QRU5FRFxuICAgICAgKX1gXG4gICAgKTtcbiAgICBpZiAoc2VsZWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXNlbGVjdCB8fFxuICAgICAgICAgIChzZWxlY3QgJiYgc2VsZWN0aW9uLmRhdGFzZXQuc2VsSWQgIT09IHNlbGVjdC5kYXRhc2V0LnNlbElkKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNsb3NlSXRlbShzZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8gY2xvc2Ugc2luZ2xlIHNlbGVjdCBpdGVtXG4gIGNsb3NlSXRlbShzZWxlY3QpIHtcbiAgICBjb25zdCByZWxhdGl2ZVNlbCA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCkucmVsYXRpdmVTZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLk9QVElPTlMpLnR3aW5TZWw7XG5cbiAgICBpZiAoIXNlbE9wdGlvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX09QRU5FRCk7XG4gICAgICBpZiAoIXJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1uby1zbGlkZScpKVxuICAgICAgICBfc2xpZGVVcChzZWxPcHRpb25zLCByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHNpbmdsZSBvcHRpb24gYWN0aW9uc1xuICBzZXRPcHRpb25BY3Rpb24oc2VsZWN0LCByZWxhdGl2ZVNlbCwgb3B0aW9uKSB7XG4gICAgaWYgKHJlbGF0aXZlU2VsLm11bHRpcGxlKSB7XG4gICAgICBvcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUQpO1xuICAgICAgY29uc3QgcmVsYXRpdmVTZWxlY3Rpb25zID0gdGhpcy5nZXREYXRhKHJlbGF0aXZlU2VsKS5lbGVtZW50cztcblxuICAgICAgcmVsYXRpdmVTZWxlY3Rpb25zLmZvckVhY2gocmVsYXRpdmVTZWxlY3Rpb24gPT4ge1xuICAgICAgICByZWxhdGl2ZVNlbGVjdGlvbi5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdHdpblNlbGVjdGlvbnMgPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgdGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUQpXG4gICAgICApO1xuICAgICAgdHdpblNlbGVjdGlvbnMuZm9yRWFjaCh0d2luU2VsZWN0aW9uID0+IHtcbiAgICAgICAgcmVsYXRpdmVTZWxcbiAgICAgICAgICAucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHt0d2luU2VsZWN0aW9uLmRhdGFzZXQub3B0VmFsfVwiXWApXG4gICAgICAgICAgLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCFvcHRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgcmVsYXRpdmVTZWwucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtvcHRpb24uZGF0YXNldC5vcHRWYWx9XCJdYClcbiAgICAgICAgKTtcbiAgICAgICAgcmVsYXRpdmVTZWxcbiAgICAgICAgICAucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtvcHRpb24uZGF0YXNldC5vcHRWYWx9XCJdYClcbiAgICAgICAgICAucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RfX29wdGlvbicpXG4gICAgICAgIC5mb3JFYWNoKG9wdCA9PiBvcHQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUQpKTtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgICBpZiAoIXJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zaG93LXNlbGVjdGlvbicpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3QucXVlcnlTZWxlY3RvcihgJHt0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5PUFRJT04pfVtoaWRkZW5dYClcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgJHt0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5PUFRJT04pfVtoaWRkZW5dYFxuICAgICAgICAgICkuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uLmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZWxhdGl2ZVNlbC52YWx1ZSA9IG9wdGlvbi5oYXNBdHRyaWJ1dGUoJ2RhdGEtb3B0LXZhbCcpXG4gICAgICAgID8gb3B0aW9uLmRhdGFzZXQub3B0VmFsXG4gICAgICAgIDogb3B0aW9uLnRleHRDb250ZW50O1xuICAgICAgdGhpcy5zZXRBY3Rpb24oc2VsZWN0KTtcbiAgICB9XG4gICAgdGhpcy5zZXRWYWx1ZShzZWxlY3QsIHJlbGF0aXZlU2VsKTtcbiAgICB0aGlzLnNldFNlbGVjdGlvbnMocmVsYXRpdmVTZWwpO1xuICB9XG4gIC8vIHNldCBzZWFyY2ggYWN0aW9uc1xuICBzZXRTZWFyY2hBY3Rpb25zKHNlbGVjdCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBzZWxJbnB1dCA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLklOUFVUKS50d2luU2VsO1xuICAgIGNvbnN0IHNlbE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdChcbiAgICAgIHNlbGVjdCxcbiAgICAgIHRoaXMuY2xhc3Nlcy5PUFRJT05TXG4gICAgKS50d2luU2VsLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMuY2xhc3Nlcy5PUFRJT059YCk7XG5cbiAgICBzZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbE9wdGlvbnMuZm9yRWFjaChzZWxPcHRpb24gPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsT3B0aW9uLnRleHRDb250ZW50XG4gICAgICAgICAgICAudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgLmluZGV4T2Yoc2VsSW5wdXQudmFsdWUudG9VcHBlckNhc2UoKSkgPj0gMFxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxPcHRpb24uaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsT3B0aW9uLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2VsT3B0aW9ucy5oaWRkZW4gPT09IHRydWUgPyBfdGhpcy5zZXRBY3Rpb24oc2VsZWN0KSA6IG51bGw7XG4gICAgfSk7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdCBzdWJ0aXRsZVxuICBzZXRTdWJ0aXRsZShyZWxhdGl2ZVNlbCkge31cblxuICAvLyB2YWxpZGF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBhZGQgYW4gZXJyb3IgdG8gYSBzZWxlY3RcbiAgYWRkRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpIHtcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcblxuICAgIGlmIChyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEVycm9yICYmICFyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnQpIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzZWxlY3RfX2hpbnRcIj4ke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsRXJyb3J9PC9kaXY+YFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLy8gcmVtb3ZlIGFuIGVycm9yIGZyb20gYSBzZWxlY3RcbiAgcmVtb3ZlRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpIHtcbiAgICBpZiAoc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKSkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faGludCcpICYmXG4gICAgICAhcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxIaW50XG4gICAgKSB7XG4gICAgICByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKFxuICAgICAgICByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2hpbnQnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyB1dGlscyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBnZXQgY3VzdG9tIGNsYXNzXG4gIGdldENsYXNzKGNzc0NsYXNzKSB7XG4gICAgcmV0dXJuIGAuJHtjc3NDbGFzc31gO1xuICB9XG4gIC8vIGdldCBzaW5nbGUgc2VsZWN0IGl0ZW1cbiAgZ2V0U2VsZWN0KHNlbGVjdCwgY3NzQ2xhc3MpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVsYXRpdmVTZWw6IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKSxcbiAgICAgIHR3aW5TZWw6IHNlbGVjdC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0Q2xhc3MoY3NzQ2xhc3MpKSxcbiAgICB9O1xuICB9XG4gIC8vIGdldCBzZWxlY3RlZCBpdGVtIHZhbHVlXG4gIGdldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBsZXQgYXR0cixcbiAgICAgIGF0dHJDbGFzcyxcbiAgICAgIHRpdGxlVmFsID0gdGhpcy5nZXREYXRhKHJlbGF0aXZlU2VsLCAyKS5odG1sO1xuXG4gICAgLy8gc2V0IHRpdGxlIHZhbHVlXG4gICAgdGl0bGVWYWwgPSB0aXRsZVZhbC5sZW5ndGhcbiAgICAgID8gdGl0bGVWYWxcbiAgICAgIDogcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxMYWJlbFxuICAgICAgPyByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbExhYmVsXG4gICAgICA6ICcnO1xuXG4gICAgLy8gc2V0IGFjdGl2ZSBjbGFzcyB0byBzZWxlY3QgaWYgaXQgY29udGFpbnMgYW55IHZhbHVlc1xuICAgIGlmICh0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19BQ1RJVkUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfQUNUSVZFKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgc2VsZWN0IGxhYmVsXG4gICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtbGFiZWwnKSkge1xuICAgICAgYXR0ciA9IHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWxcbiAgICAgICAgPyBgIGRhdGEtc2VsLWxhYmVsPVwiJHtyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbExhYmVsfVwiYFxuICAgICAgICA6IGAgZGF0YS1zZWwtbGFiZWw9XCLQktGL0LHQvtGAXCJgO1xuICAgICAgYXR0ckNsYXNzID0gYCAke3RoaXMuY2xhc3Nlcy5IQVNfTEFCRUx9YDtcbiAgICB9XG5cbiAgICAvLyBwdXNoIHNlbGVjdGlvbnMgdG8gdGhlIGxpc3QgaW5zaWRlIG9mIHNlbGVjdCB0aXRsZVxuICAgIGlmIChyZWxhdGl2ZVNlbC5tdWx0aXBsZSAmJiByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLWxpc3QnKSkge1xuICAgICAgdGl0bGVWYWwgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpXG4gICAgICAgIC5lbGVtZW50cy5tYXAoXG4gICAgICAgICAgb3B0aW9uID0+XG4gICAgICAgICAgICBgPHNwYW4gZGF0YS1vcHQtaWQ9XCIke3NlbGVjdC5kYXRhc2V0LnNlbElkfVwiIGRhdGEtb3B0LXZhbD1cIiR7XG4gICAgICAgICAgICAgIG9wdGlvbi52YWx1ZVxuICAgICAgICAgICAgfVwiIGNsYXNzPVwiX2xpc3QtaXRlbVwiPiR7dGhpcy5nZXRDb250ZW50KG9wdGlvbil9PC9zcGFuPmBcbiAgICAgICAgKVxuICAgICAgICAuam9pbignJyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgcmVsYXRpdmVTZWwuZGF0YXNldC5saXN0ICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmVsYXRpdmVTZWwuZGF0YXNldC5saXN0KVxuICAgICAgKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmVsYXRpdmVTZWwuZGF0YXNldC5saXN0KS5pbm5lckhUTUwgPSB0aXRsZVZhbDtcbiAgICAgICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtc2VhcmNoJykpIHRpdGxlVmFsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5pdCBzZWxlY3Qgc2VhcmNoXG4gICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtc2VhcmNoJykpIHtcbiAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlRJVExFfVwiPjxzcGFuICR7YXR0cn0gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5WQUxVRVVFfVwiPjxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCIke3RpdGxlVmFsfVwiIGRhdGEtcGxhY2Vob2xkZXI9XCIke3RpdGxlVmFsfVwiIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuSU5QVVR9XCI+PC9zcGFuPjwvZGl2PmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGN1c3RvbUNsYXNzID1cbiAgICAgICAgdGhpcy5nZXREYXRhKHJlbGF0aXZlU2VsKS5lbGVtZW50cy5sZW5ndGggJiZcbiAgICAgICAgdGhpcy5nZXREYXRhKHJlbGF0aXZlU2VsKS5lbGVtZW50c1swXS5kYXRhc2V0Lm9wdENsYXNzXG4gICAgICAgICAgPyBgICR7dGhpcy5nZXREYXRhKHJlbGF0aXZlU2VsKS5lbGVtZW50c1swXS5kYXRhc2V0Lm9wdENsYXNzfWBcbiAgICAgICAgICA6ICcnO1xuICAgICAgcmV0dXJuIGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlRJVExFfVwiPjxzcGFuICR7XG4gICAgICAgIGF0dHIgPyBhdHRyIDogJydcbiAgICAgIH0gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5WQUxVRX0gJHtcbiAgICAgICAgYXR0ckNsYXNzID8gYXR0ckNsYXNzIDogJydcbiAgICAgIH1cIj48c3BhbiBjbGFzcz1cIiR7XG4gICAgICAgIHRoaXMuY2xhc3Nlcy5DT05URU5UXG4gICAgICB9JHtjdXN0b21DbGFzc31cIj4ke3RpdGxlVmFsfTwvc3Bhbj48L3NwYW4+PC9idXR0b24+YDtcbiAgICB9XG4gIH1cbiAgLy8gZ2V0IG9wdGlvbnNcbiAgZ2V0T3B0aW9ucyhyZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IHNlbFNjcm9sbCA9IHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtc2Nyb2xsJylcbiAgICAgID8gYGRhdGEtc2ltcGxlYmFyYFxuICAgICAgOiAnJztcbiAgICBjb25zdCBkYXRhID0gc2VsU2Nyb2xsXG4gICAgICA/IHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsU2Nyb2xsLnRyaW0oKS5zcGxpdCgnLCcpXG4gICAgICA6IG51bGw7XG4gICAgbGV0IHNlbFNjcm9sbEhlaWdodCA9XG4gICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbFNjcm9sbCAmJiBkYXRhXG4gICAgICAgID8gYHN0eWxlPVwibWF4LWhlaWdodDoke3dpbmRvdy5pbm5lcldpZHRoID4gNzY4ID8gZGF0YVswXSA6IGRhdGFbMV19cmVtXCJgXG4gICAgICAgIDogJyc7XG4gICAgbGV0IHNlbE9wdGlvbnMgPSBBcnJheS5mcm9tKHJlbGF0aXZlU2VsLm9wdGlvbnMpO1xuXG4gICAgaWYgKHNlbE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICBsZXQgc2VsT3B0aW9uc0hUTUwgPSBgYDtcblxuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkgJiZcbiAgICAgICAgICAhdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkuc2hvdykgfHxcbiAgICAgICAgcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgICkge1xuICAgICAgICBzZWxPcHRpb25zID0gc2VsT3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgICBzZWxPcHRpb25zSFRNTCArPSBzZWxTY3JvbGxcbiAgICAgICAgPyBgPGRpdiAke3NlbFNjcm9sbH0gJHtzZWxTY3JvbGxIZWlnaHR9IGRhdGEtc2VsLXNjcm9sbD1cIiR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxTY3JvbGx9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5TQ1JPTEx9XCI+YFxuICAgICAgICA6ICcnO1xuICAgICAgc2VsT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHRoaXMuZ2V0T3B0aW9uKG9wdGlvbiwgcmVsYXRpdmVTZWwpO1xuICAgICAgfSk7XG4gICAgICBzZWxPcHRpb25zSFRNTCArPSBzZWxTY3JvbGwgPyBgPC9kaXY+YCA6ICcnO1xuICAgICAgcmV0dXJuIHNlbE9wdGlvbnNIVE1MO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgb3B0aW9uXG4gIGdldE9wdGlvbihvcHRpb24sIHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9ucyA9XG4gICAgICBvcHRpb24uc2VsZWN0ZWQgJiYgcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgICAgPyBgICR7dGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEfWBcbiAgICAgICAgOiAnJztcbiAgICBjb25zdCBzaG93U2VsZWN0aW9uID1cbiAgICAgIG9wdGlvbi5zZWxlY3RlZCAmJlxuICAgICAgIXJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zaG93LXNlbGVjdGlvbicpICYmXG4gICAgICAhcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgICAgPyBgaGlkZGVuYFxuICAgICAgICA6IGBgO1xuICAgIGNvbnN0IG9wdGlvbkNsYXNzID0gb3B0aW9uLmRhdGFzZXQub3B0Q2xhc3NcbiAgICAgID8gYCAke29wdGlvbi5kYXRhc2V0Lm9wdENsYXNzfWBcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgb3B0aW9uTGluayA9IG9wdGlvbi5kYXRhc2V0Lm9wdGlvbkxpbmtcbiAgICAgID8gb3B0aW9uLmRhdGFzZXQub3B0aW9uTGlua1xuICAgICAgOiBmYWxzZTtcbiAgICBjb25zdCBvcHRpb25MaW5rVGFyZ2V0ID0gb3B0aW9uLmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHRpb24tbGluay10YXJnZXQnKVxuICAgICAgPyBgdGFyZ2V0PVwiX2JsYW5rXCJgXG4gICAgICA6ICcnO1xuICAgIGxldCBvcHRpb25IVE1MID0gYGA7XG5cbiAgICBvcHRpb25IVE1MICs9IG9wdGlvbkxpbmtcbiAgICAgID8gYDxhICR7b3B0aW9uTGlua1RhcmdldH0gJHtzaG93U2VsZWN0aW9ufSBocmVmPVwiJHtvcHRpb25MaW5rfVwiIGRhdGEtb3B0LXZhbD1cIiR7b3B0aW9uLnZhbHVlfVwiIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuT1BUSU9OfSR7b3B0aW9uQ2xhc3N9JHtzZWxlY3Rpb25zfVwiPmBcbiAgICAgIDogYDxidXR0b24gJHtzaG93U2VsZWN0aW9ufSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLk9QVElPTn0ke29wdGlvbkNsYXNzfSR7c2VsZWN0aW9uc31cIiBkYXRhLW9wdC12YWw9XCIke29wdGlvbi52YWx1ZX1cIiB0eXBlPVwiYnV0dG9uXCI+YDtcbiAgICBvcHRpb25IVE1MICs9IHRoaXMuZ2V0Q29udGVudChvcHRpb24pO1xuICAgIG9wdGlvbkhUTUwgKz0gb3B0aW9uTGluayA/IGA8L2E+YCA6IGA8L2J1dHRvbj5gO1xuICAgIHJldHVybiBvcHRpb25IVE1MO1xuICB9XG4gIC8vIGdldCBzZWxlY3QgY29udGVudFxuICBnZXRDb250ZW50KG9wdGlvbikge1xuICAgIGNvbnN0IG9wdGlvbkRhdGEgPSBvcHRpb24uZGF0YXNldC5vcHRBc3NldFxuICAgICAgPyBgJHtvcHRpb24uZGF0YXNldC5vcHRBc3NldH1gXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IG9wdGlvbkRhdGFIVE1MID1cbiAgICAgIG9wdGlvbkRhdGEuaW5kZXhPZignaW1nJykgPj0gMFxuICAgICAgICA/IGA8aW1nIHNyYz1cIiR7b3B0aW9uRGF0YX1cIiBhbHQ9XCJcIj5gXG4gICAgICAgIDogb3B0aW9uRGF0YTtcbiAgICBsZXQgb3B0aW9uQ29udGVudEhUTUwgPSBgYDtcblxuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGFcbiAgICAgID8gYDxzcGFuIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuR1JPVVB9XCI+YFxuICAgICAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhXG4gICAgICA/IGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLkFTU0VUfVwiPmBcbiAgICAgIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IG9wdGlvbkRhdGFIVE1MIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IGA8L3NwYW4+YCA6ICcnO1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGEgPyBgPHNwYW4gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5UWFR9XCI+YCA6ICcnO1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbi50ZXh0Q29udGVudDtcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IGA8L3NwYW4+YCA6ICcnO1xuICAgIHJldHVybiBvcHRpb25Db250ZW50SFRNTDtcbiAgfVxuICAvLyBnZXQgc2VsZWN0IHBsYWNlaG9sZGVyXG4gIGdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSBBcnJheS5mcm9tKHJlbGF0aXZlU2VsLm9wdGlvbnMpLmZpbmQoXG4gICAgICBvcHRpb24gPT4gIW9wdGlvbi52YWx1ZVxuICAgICk7XG5cbiAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgIHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLnN1YnRpdGxlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBwbGFjZWhvbGRlci50ZXh0Q29udGVudCxcbiAgICAgICAgc2hvdzogcGxhY2Vob2xkZXIuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1waC1zaG93JyksXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgc2hvdzogcGxhY2Vob2xkZXIuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1waCcpLFxuICAgICAgICAgIHRleHQ6IHBsYWNlaG9sZGVyLmRhdGFzZXQub3B0UGxhY2Vob2xkZXIsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICAvLyBnZXQgc2VsZWN0ZWQgb3B0aW9ucyBkYXRhXG4gIGdldERhdGEocmVsYXRpdmVTZWwpIHtcbiAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLm11bHRpcGxlKSB7XG4gICAgICBzZWxlY3Rpb25zID0gQXJyYXkuZnJvbShyZWxhdGl2ZVNlbC5vcHRpb25zKVxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udmFsdWUpXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGlvbnMucHVzaChyZWxhdGl2ZVNlbC5vcHRpb25zW3JlbGF0aXZlU2VsLnNlbGVjdGVkSW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnRzOiBzZWxlY3Rpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uKSxcbiAgICAgIHZhbHVlczogc2VsZWN0aW9uc1xuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udmFsdWUpXG4gICAgICAgIC5tYXAob3B0aW9uID0+IG9wdGlvbi52YWx1ZSksXG4gICAgICBodG1sOiBzZWxlY3Rpb25zLm1hcChvcHRpb24gPT4gdGhpcy5nZXRDb250ZW50KG9wdGlvbikpLFxuICAgIH07XG4gIH1cblxuICAvLyBzZWxlY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBpbml0IHNlbGVjdGlvbnNcbiAgaW5pdFNlbGVjdGlvbnMoZSkge1xuICAgIGNvbnN0IHJlbGF0aXZlU2VsID0gZS50YXJnZXQ7XG5cbiAgICB0aGlzLmJ1aWxkKHJlbGF0aXZlU2VsKTtcbiAgICB0aGlzLnNldFNlbGVjdGlvbnMocmVsYXRpdmVTZWwpO1xuICB9XG4gIC8vIHNldCBzZWxlY3Rpb25zXG4gIHNldFNlbGVjdGlvbnMocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3QgPSByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50O1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zdWJtaXQnKSAmJiByZWxhdGl2ZVNlbC52YWx1ZSkge1xuICAgICAgbGV0IHRlbXBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIHRlbXBCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgICAgcmVsYXRpdmVTZWwuY2xvc2VzdCgnZm9ybScpLmFwcGVuZCh0ZW1wQnV0dG9uKTtcbiAgICAgIHRlbXBCdXR0b24uY2xpY2soKTtcbiAgICAgIHRlbXBCdXR0b24ucmVtb3ZlKCk7XG4gICAgfVxuICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKTtcbiAgICB0aGlzLnNlbGVjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsKTtcbiAgfVxuICAvLyBjdXN0b20gc2VsZWN0IGV2ZW50IChsaXN0ZW4gdG8gYW55IHNlbGVjdGlvbnMgLyBtdXRhdGlvbnMpXG4gIHNlbGVjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnc2VsZWN0aW9uJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBzZWxlY3Q6IHJlbGF0aXZlU2VsLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG5cbm5ldyBTZWxlY3Qoe30pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlYmFyXScpLmxlbmd0aCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJykuZm9yRWFjaChzY3JvbGxCbG9jayA9PiB7XG4gICAgbmV3IFNpbXBsZUJhcihzY3JvbGxCbG9jaywge1xuICAgICAgYXV0b0hpZGU6IGZhbHNlLFxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiIsImltcG9ydCB7IHNldEhhc2gsIGdldEhhc2ggfSBmcm9tICcuL3V0aWxzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgVGFicyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICBUQUJTOiAnZGF0YS10YWJzJyxcbiAgICAgIElOREVYOiAnZGF0YS10YWJzLWluZGV4JyxcbiAgICAgIFRJVExFUzogJ2RhdGEtdGFicy10aXRsZXMnLFxuICAgICAgVElUTEU6ICdkYXRhLXRhYnMtdGl0bGUnLFxuICAgICAgVEFCX0lURU06ICdkYXRhLXRhYnMtaXRlbScsXG4gICAgICBCT0RZOiAnZGF0YS10YWJzLWJvZHknLFxuICAgICAgSEFTSDogJ2RhdGEtdGFicy1oYXNoJyxcbiAgICB9O1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIElOSVQ6ICdfdGFicy1pbml0JyxcbiAgICAgIEFDVElWRTogJ19pcy1hY3RpdmUnLFxuICAgICAgTU9EQUw6ICdtb2RhbCcsXG4gICAgfTtcbiAgICB0aGlzLnRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS10YWJzXWApO1xuICAgIHRoaXMuYWN0aXZlSGFzaCA9IFtdO1xuXG4gICAgaWYgKHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc2ggPSBnZXRIYXNoKCk7XG5cbiAgICAgIGlmIChoYXNoICYmIGhhc2guc3RhcnRzV2l0aCgndGFiLScpKSB7XG4gICAgICAgIGFjdGl2ZUhhc2ggPSBoYXNoLnJlcGxhY2UoJ3RhYi0nLCAnJykuc3BsaXQoJy0nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYnNCbG9jaywgaW5kZXgpID0+IHtcbiAgICAgICAgdGFic0Jsb2NrLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklOSVQpO1xuICAgICAgICB0YWJzQmxvY2suc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuSU5ERVgsIGluZGV4KTtcbiAgICAgICAgdGFic0Jsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRBY3Rpb25zLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmluaXQodGFic0Jsb2NrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXR1cyh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVEFCX0lURU19XWApO1xuICAgIGNvbnN0IGluZGV4ID0gdGFic0Jsb2NrLmRhdGFzZXQudGFic0luZGV4O1xuXG4gICAgaWYgKGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICBjb25zdCBoYXNIYXNoID0gdGFic0Jsb2NrLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkhBU0gpO1xuXG4gICAgICBjb250ZW50ID0gQXJyYXkuZnJvbShjb250ZW50KS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIGNvbnRlbnQuZm9yRWFjaCgoaXRlbSwgaW5keCkgPT4ge1xuICAgICAgICBpZiAodGl0bGVzW2luZHhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoaGFzSGFzaCAmJiAhaXRlbS5jbG9zZXN0KGAuJHt0aGlzLmNsYXNzZXMuTU9EQUx9YCkpIHtcbiAgICAgICAgICAgIHNldEhhc2goYHRhYi0ke2luZGV4fS0ke2luZHh9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aW9ucyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRJVExFfV1gKTtcbiAgICAgIGNvbnN0IHRhYnNCbG9jayA9IHRpdGxlLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCk7XG5cbiAgICAgIGlmICghdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgIGxldCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIGBbJHt0aGlzLmF0dHJzLlRJVExFfV0uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICAgKTtcblxuICAgICAgICBhY3RpdmVUaXRsZS5sZW5ndGhcbiAgICAgICAgICA/IChhY3RpdmVUaXRsZSA9IEFycmF5LmZyb20oYWN0aXZlVGl0bGUpLmZpbHRlcihcbiAgICAgICAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgICAgICAgKSlcbiAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gYWN0aXZlVGl0bGVbMF0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuQUNUSVZFKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModGFic0Jsb2NrKTtcbiAgICAgIH1cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQodGFic0Jsb2NrKSB7XG4gICAgbGV0IHRpdGxlcyA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLlRJVExFU31dPipgKTtcbiAgICBsZXQgY29udGVudCA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLkJPRFl9XT4qYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG4gICAgY29uc3QgYWN0aXZlSGFzaEJsb2NrID0gdGhpcy5hY3RpdmVIYXNoWzBdID09IGluZGV4O1xuXG4gICAgaWYgKGFjdGl2ZUhhc2hCbG9jaykge1xuICAgICAgY29uc3QgYWN0aXZlVGl0bGUgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEVTfV0+LiR7dGhpcy5jbGFzc2VzLkFDVElWRX1gXG4gICAgICApO1xuICAgICAgYWN0aXZlVGl0bGUgPyBhY3RpdmVUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpIDogbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLlRBQlN9XWApID09PSB0YWJzQmxvY2tcbiAgICAgICk7XG5cbiAgICAgIGNvbnRlbnQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGl0bGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5USVRMRSwgJycpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRBQl9JVEVNLCAnJyk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZUhhc2hCbG9jayAmJiBpbmRleCA9PSB0aGlzLmFjdGl2ZUhhc2hbMV0pIHtcbiAgICAgICAgICB0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5oaWRkZW4gPSAhdGl0bGVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IFRhYnMoKTtcbiIsIi8qKlxuICogc2V0IGhhc2ggdG8gdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICovXG5leHBvcnQgY29uc3Qgc2V0SGFzaCA9IGhhc2ggPT4ge1xuICBoYXNoID0gaGFzaCA/IGAjJHtoYXNofWAgOiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdO1xuICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIGhhc2gpO1xufTtcblxuLyoqXG4gKiBnZXQgaGFzaCBmcm9tIHVybFxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRIYXNoID0gKCkgPT4ge1xuICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgIHJldHVybiBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW5pdGlhbGl6ZXMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVJbml0ID0gKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGJvZHlMb2NrU3RhdHVzICYmIGUudGFyZ2V0LmNsb3Nlc3QoJy5oYW1idXJnZXInKSkge1xuICAgICAgICBtZW51T3BlbigpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgYm9keUxvY2tTdGF0dXMgJiZcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnX21lbnUtb3BlbmVkJykgJiZcbiAgICAgICAgKGUudGFyZ2V0LmNsb3Nlc3QoJy5tZW51X19jbG9zZS1idG4nKSB8fCAhZS50YXJnZXQuY2xvc2VzdCgnLm1lbnUnKSlcbiAgICAgICkge1xuICAgICAgICBtZW51Q2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbi8qKlxuICogb3BlbnMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICBib2R5TG9jaygpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnX21lbnUtb3BlbmVkJyk7XG59O1xuLyoqXG4gKiBjbG9zZXMgaGFtYnVyZ2VyIG1lbnVcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbnVDbG9zZSA9ICgpID0+IHtcbiAgYm9keVVubG9jaygpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnX21lbnUtb3BlbmVkJyk7XG59O1xuXG4vLyBib2R5IGxvY2tcbmV4cG9ydCBsZXQgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xuLyoqXG4gKiB0b2dnbGVzIGJvZHkgbG9ja1xuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBib2R5TG9ja1RvZ2dsZSA9IChkZWxheSA9IDUwMCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9jaycpKSB7XG4gICAgYm9keVVubG9jayhkZWxheSk7XG4gIH0gZWxzZSB7XG4gICAgYm9keUxvY2soZGVsYXkpO1xuICB9XG59O1xuLyoqXG4gKiB1bmxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keVVubG9jayA9IChkZWxheSA9IDUwMCkgPT4ge1xuICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2NrJyk7XG4gICAgfSwgZGVsYXkpO1xuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuLyoqXG4gKiBsb2NrcyBib2R5XG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2NrJyk7XG5cbiAgICBib2R5TG9ja1N0YXR1cyA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xuICAgIH0sIGRlbGF5KTtcbiAgfVxufTtcblxuLyoqXG4gKiBtYWtlIHRoZSBhcnJheSB1bmlxdWVcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQXJyYXkoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICByZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcbiAgfSk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gZGF0YVNldFZhbHVlXG4gKiBwcm9jZXNzIG1lZGlhIHJlcXVlc3RzIGZyb20gYXR0cmlidXRlc1xuICovXG5leHBvcnQgY29uc3QgZGF0YU1lZGlhUXVlcmllcyA9IChhcnJheSwgZGF0YVNldFZhbHVlKSA9PiB7XG4gIC8vIGdldCBvYmplY3RzIHdpdGggbWVkaWEgcXVlcmllc1xuICBjb25zdCBtZWRpYSA9IEFycmF5LmZyb20oYXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICBpZiAoaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV0pIHtcbiAgICAgIHJldHVybiBpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXS5zcGxpdCgnLCcpWzBdO1xuICAgIH1cbiAgfSk7XG4gIC8vIG9iamVjdHMgd2l0aCBtZWRpYSBxdWVyaWVzIGluaXRpYWxpemF0aW9uXG4gIGlmIChtZWRpYS5sZW5ndGgpIHtcbiAgICBjb25zdCBicmVha3BvaW50c0FycmF5ID0gW107XG4gICAgbWVkaWEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGl0ZW0uZGF0YXNldFtkYXRhU2V0VmFsdWVdO1xuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHt9O1xuICAgICAgY29uc3QgcGFyYW1zQXJyYXkgPSBwYXJhbXMuc3BsaXQoJywnKTtcbiAgICAgIGJyZWFrcG9pbnQudmFsdWUgPSBwYXJhbXNBcnJheVswXTtcbiAgICAgIGJyZWFrcG9pbnQudHlwZSA9IHBhcmFtc0FycmF5WzFdID8gcGFyYW1zQXJyYXlbMV0udHJpbSgpIDogJ21heCc7XG4gICAgICBicmVha3BvaW50Lml0ZW0gPSBpdGVtO1xuICAgICAgYnJlYWtwb2ludHNBcnJheS5wdXNoKGJyZWFrcG9pbnQpO1xuICAgIH0pO1xuICAgIC8vIGdldCB1bmlxdWUgYnJlYWtwb2ludHNcbiAgICBsZXQgbWRRdWVyaWVzID0gYnJlYWtwb2ludHNBcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICcoJyArXG4gICAgICAgIGl0ZW0udHlwZSArXG4gICAgICAgICctd2lkdGg6ICcgK1xuICAgICAgICBpdGVtLnZhbHVlICtcbiAgICAgICAgJ3B4KSwnICtcbiAgICAgICAgaXRlbS52YWx1ZSArXG4gICAgICAgICcsJyArXG4gICAgICAgIGl0ZW0udHlwZVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBtZFF1ZXJpZXMgPSB1bmlxdWVBcnJheShtZFF1ZXJpZXMpO1xuICAgIGNvbnN0IG1kUXVlcmllc0FycmF5ID0gW107XG5cbiAgICBpZiAobWRRdWVyaWVzLmxlbmd0aCkge1xuICAgICAgLy8gd29yayB3aXRoIGV2ZXJ5IGJyZWFrcG9pbnRcbiAgICAgIG1kUXVlcmllcy5mb3JFYWNoKGJyZWFrcG9pbnQgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXNBcnJheSA9IGJyZWFrcG9pbnQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgbWVkaWFCcmVha3BvaW50ID0gcGFyYW1zQXJyYXlbMV07XG4gICAgICAgIGNvbnN0IG1lZGlhVHlwZSA9IHBhcmFtc0FycmF5WzJdO1xuICAgICAgICBjb25zdCBtYXRjaE1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEocGFyYW1zQXJyYXlbMF0pO1xuICAgICAgICAvLyBvYmplY3RzIHdpdGggY29uZGl0aW9uc1xuICAgICAgICBjb25zdCBpdGVtc0FycmF5ID0gYnJlYWtwb2ludHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gbWVkaWFCcmVha3BvaW50ICYmIGl0ZW0udHlwZSA9PT0gbWVkaWFUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtZFF1ZXJpZXNBcnJheS5wdXNoKHtcbiAgICAgICAgICBpdGVtc0FycmF5LFxuICAgICAgICAgIG1hdGNoTWVkaWEsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWRRdWVyaWVzQXJyYXk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyB1cFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd21vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVVwID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDAsIHNob3dtb3JlID0gMCkgPT4ge1xuICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHNob3dtb3JlID8gYCR7c2hvd21vcmV9cmVtYCA6IGAwYDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ1RvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRhcmdldC5oaWRkZW4gPSAhc2hvd21vcmUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAhc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpIDogbnVsbDtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XG4gICAgICAhc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93JykgOiBudWxsO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZVVwRG9uZScsIHtcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sIGR1cmF0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbW9vdGhseSBzbGlkZXMgZG93blxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd21vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZURvd24gPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgdGFyZ2V0LmhpZGRlbiA9IHRhcmdldC5oaWRkZW4gPyBmYWxzZSA6IG51bGw7XG4gICAgc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpIDogbnVsbDtcbiAgICBsZXQgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1yZW1gIDogYDBgO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XG4gICAgICAvLyBjcmVhdGUgZXZlbnRcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2xpZGVEb3duRG9uZScsIHtcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sIGR1cmF0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiB0b2dnbGVzIHNtb290aCBzbGlkZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAqIEByZXR1cm5zIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBfc2xpZGVUb2dnbGUgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xuICBpZiAodGFyZ2V0LmhpZGRlbikge1xuICAgIHJldHVybiBfc2xpZGVEb3duKHRhcmdldCwgZHVyYXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfc2xpZGVVcCh0YXJnZXQsIGR1cmF0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBjb252ZXJ0cyByZW0gdG8gcGl4ZWxzXG4gKiBAcGFyYW0ge251bWJlcn0gcmVtVmFsdWVcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtVG9QeChyZW1WYWx1ZSkge1xuICBjb25zdCBodG1sRm9udFNpemUgPSBwYXJzZUZsb2F0KFxuICAgIGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5mb250U2l6ZVxuICApO1xuXG4gIGNvbnN0IHB4VmFsdWUgPSByZW1WYWx1ZSAqIGh0bWxGb250U2l6ZTtcblxuICByZXR1cm4gTWF0aC5yb3VuZChweFZhbHVlKSArICdweCc7XG59XG5cbi8vIHJlbW92ZSBjbGFzcyBmcm9tIGFsbCBhcnJheSBlbGVtZW50c1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNsYXNzZXMgPSAoYXJyYXksIGNsYXNzTmFtZSkgPT4ge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXlbaV0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG59O1xuIiwidmFyIGNhblVzZURPTSA9ICEhKFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuVXNlRE9NOyIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgW2RhdGEtc2ltcGxlYmFyXSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xufVxuXG4uc2ltcGxlYmFyLXdyYXBwZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aWR0aDogaW5oZXJpdDtcbiAgaGVpZ2h0OiBpbmhlcml0O1xuICBtYXgtd2lkdGg6IGluaGVyaXQ7XG4gIG1heC1oZWlnaHQ6IGluaGVyaXQ7XG59XG5cbi5zaW1wbGViYXItbWFzayB7XG4gIGRpcmVjdGlvbjogaW5oZXJpdDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gIHotaW5kZXg6IDA7XG59XG5cbi5zaW1wbGViYXItb2Zmc2V0IHtcbiAgZGlyZWN0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XG4gIGJveC1zaXppbmc6IGluaGVyaXQgIWltcG9ydGFudDtcbiAgcmVzaXplOiBub25lICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cblxuLnNpbXBsZWJhci1jb250ZW50LXdyYXBwZXIge1xuICBkaXJlY3Rpb246IGluaGVyaXQ7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxMDAlOyAvKiBSZXF1aXJlZCBmb3IgaG9yaXpvbnRhbCBuYXRpdmUgc2Nyb2xsYmFyIHRvIG5vdCBhcHBlYXIgaWYgcGFyZW50IGlzIHRhbGxlciB0aGFuIG5hdHVyYWwgaGVpZ2h0ICovXG4gIHdpZHRoOiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7IC8qIE5vdCByZXF1aXJlZCBmb3IgaG9yaXpvbnRhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xuICBtYXgtaGVpZ2h0OiAxMDAlOyAvKiBOZWVkZWQgZm9yIHZlcnRpY2FsIHNjcm9sbCB0byB0cmlnZ2VyICovXG4gIG92ZXJmbG93OiBhdXRvO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbn1cblxuLnNpbXBsZWJhci1jb250ZW50LXdyYXBwZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLnNpbXBsZWJhci1oaWRlLXNjcm9sbGJhcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICBkaXNwbGF5OiBub25lO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQ6YmVmb3JlLFxuLnNpbXBsZWJhci1jb250ZW50OmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIGRpc3BsYXk6IHRhYmxlO1xufVxuXG4uc2ltcGxlYmFyLXBsYWNlaG9sZGVyIHtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5zaW1wbGViYXItaGVpZ2h0LWF1dG8tb2JzZXJ2ZXItd3JhcHBlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1heC1oZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgei1pbmRleDogLTE7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIGZsZXgtZ3JvdzogaW5oZXJpdDtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGZsZXgtYmFzaXM6IDA7XG59XG5cbi5zaW1wbGViYXItaGVpZ2h0LWF1dG8tb2JzZXJ2ZXIge1xuICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3BhY2l0eTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTAwMCU7XG4gIHdpZHRoOiAxMDAwJTtcbiAgbWluLWhlaWdodDogMXB4O1xuICBtaW4td2lkdGg6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHotaW5kZXg6IC0xO1xufVxuXG4uc2ltcGxlYmFyLXRyYWNrIHtcbiAgei1pbmRleDogMTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItY29udGVudCB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcgLnNpbXBsZWJhci10cmFjayB7XG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XG59XG5cbi5zaW1wbGViYXItc2Nyb2xsYmFyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgbWluLWhlaWdodDogMTBweDtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb250ZW50OiBcIlwiO1xuICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xuICBsZWZ0OiAycHg7XG4gIHJpZ2h0OiAycHg7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAwLjVzIGxpbmVhcjtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXIuc2ltcGxlYmFyLXZpc2libGU6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC41O1xuICB0cmFuc2l0aW9uLWRlbGF5OiAwcztcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XG59XG5cbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLXZlcnRpY2FsIHtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTFweDtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcbiAgdG9wOiAycHg7XG4gIGJvdHRvbTogMnB4O1xuICBsZWZ0OiAycHg7XG4gIHJpZ2h0OiAycHg7XG59XG5cbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwge1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDExcHg7XG59XG5cbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwgLnNpbXBsZWJhci1zY3JvbGxiYXIge1xuICByaWdodDogYXV0bztcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIG1pbi13aWR0aDogMTBweDtcbiAgd2lkdGg6IGF1dG87XG59XG5cbi8qIFJ0bCBzdXBwb3J0ICovXG5bZGF0YS1zaW1wbGViYXItZGlyZWN0aW9uPXJ0bF0gLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xuICByaWdodDogYXV0bztcbiAgbGVmdDogMDtcbn1cblxuLnNpbXBsZWJhci1kdW1teS1zY3JvbGxiYXItc2l6ZSB7XG4gIGRpcmVjdGlvbjogcnRsO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIG9wYWNpdHk6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDUwMHB4O1xuICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBzY3JvbGxiYXIgIWltcG9ydGFudDtcbn1cblxuLnNpbXBsZWJhci1kdW1teS1zY3JvbGxiYXItc2l6ZSA+IGRpdiB7XG4gIHdpZHRoOiAyMDAlO1xuICBoZWlnaHQ6IDIwMCU7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiAwO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyL2Rpc3Qvc2ltcGxlYmFyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7QUFDRjs7QUFFQTtFQUNFLDZCQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsaUNBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsaUNBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBLEVBQUEsbUdBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQSxFQUFBLGtEQUFBO0VBQ0EsZ0JBQUEsRUFBQSwwQ0FBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLHdCQUFBO0FBQ0Y7O0FBRUE7O0VBRUUsYUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0FBQ0Y7O0FBRUE7O0VBRUUsWUFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLDJCQUFBO0VBQ0EseUJBQUE7RUFDQSx3QkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLG9DQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSx1QkFBQTtBQUNGOztBQUVBO0VBQ0UsTUFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLFFBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFDRjs7QUFFQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUEsZ0JBQUE7QUFDQTtFQUNFLFdBQUE7RUFDQSxPQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHdDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esd0JBQUE7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJbZGF0YS1zaW1wbGViYXJdIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5zaW1wbGViYXItd3JhcHBlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2lkdGg6IGluaGVyaXQ7XFxuICBoZWlnaHQ6IGluaGVyaXQ7XFxuICBtYXgtd2lkdGg6IGluaGVyaXQ7XFxuICBtYXgtaGVpZ2h0OiBpbmhlcml0O1xcbn1cXG5cXG4uc2ltcGxlYmFyLW1hc2sge1xcbiAgZGlyZWN0aW9uOiBpbmhlcml0O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xcbiAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XFxuICB6LWluZGV4OiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLW9mZnNldCB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIHJlc2l6ZTogbm9uZSAhaW1wb3J0YW50O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcXG59XFxuXFxuLnNpbXBsZWJhci1jb250ZW50LXdyYXBwZXIge1xcbiAgZGlyZWN0aW9uOiBpbmhlcml0O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDEwMCU7IC8qIFJlcXVpcmVkIGZvciBob3Jpem9udGFsIG5hdGl2ZSBzY3JvbGxiYXIgdG8gbm90IGFwcGVhciBpZiBwYXJlbnQgaXMgdGFsbGVyIHRoYW4gbmF0dXJhbCBoZWlnaHQgKi9cXG4gIHdpZHRoOiBhdXRvO1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiBOb3QgcmVxdWlyZWQgZm9yIGhvcml6b250YWwgc2Nyb2xsIHRvIHRyaWdnZXIgKi9cXG4gIG1heC1oZWlnaHQ6IDEwMCU7IC8qIE5lZWRlZCBmb3IgdmVydGljYWwgc2Nyb2xsIHRvIHRyaWdnZXIgKi9cXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXFxuLnNpbXBsZWJhci1oaWRlLXNjcm9sbGJhcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWNvbnRlbnQ6YmVmb3JlLFxcbi5zaW1wbGViYXItY29udGVudDphZnRlciB7XFxuICBjb250ZW50OiAnICc7XFxuICBkaXNwbGF5OiB0YWJsZTtcXG59XFxuXFxuLnNpbXBsZWJhci1wbGFjZWhvbGRlciB7XFxuICBtYXgtaGVpZ2h0OiAxMDAlO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LXdpZHRoOiAxcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1heC1oZWlnaHQ6IDFweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB6LWluZGV4OiAtMTtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIGZsZXgtZ3JvdzogaW5oZXJpdDtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgZmxleC1iYXNpczogMDtcXG59XFxuXFxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwMCU7XFxuICB3aWR0aDogMTAwMCU7XFxuICBtaW4taGVpZ2h0OiAxcHg7XFxuICBtaW4td2lkdGg6IDFweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG5cXG4uc2ltcGxlYmFyLXRyYWNrIHtcXG4gIHotaW5kZXg6IDE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyAuc2ltcGxlYmFyLWNvbnRlbnQge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyAuc2ltcGxlYmFyLXRyYWNrIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxufVxcblxcbi5zaW1wbGViYXItc2Nyb2xsYmFyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIG1pbi1oZWlnaHQ6IDEwcHg7XFxufVxcblxcbi5zaW1wbGViYXItc2Nyb2xsYmFyOmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgbGVmdDogMnB4O1xcbiAgcmlnaHQ6IDJweDtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgMC41cyBsaW5lYXI7XFxufVxcblxcbi5zaW1wbGViYXItc2Nyb2xsYmFyLnNpbXBsZWJhci12aXNpYmxlOmJlZm9yZSB7XFxuICBvcGFjaXR5OiAwLjU7XFxuICB0cmFuc2l0aW9uLWRlbGF5OiAwcztcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDBzO1xcbn1cXG5cXG4uc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTFweDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcXG4gIHRvcDogMnB4O1xcbiAgYm90dG9tOiAycHg7XFxuICBsZWZ0OiAycHg7XFxuICByaWdodDogMnB4O1xcbn1cXG5cXG4uc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci1ob3Jpem9udGFsIHtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDExcHg7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwgLnNpbXBsZWJhci1zY3JvbGxiYXIge1xcbiAgcmlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbWluLWhlaWdodDogMDtcXG4gIG1pbi13aWR0aDogMTBweDtcXG4gIHdpZHRoOiBhdXRvO1xcbn1cXG5cXG4vKiBSdGwgc3VwcG9ydCAqL1xcbltkYXRhLXNpbXBsZWJhci1kaXJlY3Rpb249J3J0bCddIC5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLXZlcnRpY2FsIHtcXG4gIHJpZ2h0OiBhdXRvO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLnNpbXBsZWJhci1kdW1teS1zY3JvbGxiYXItc2l6ZSB7XFxuICBkaXJlY3Rpb246IHJ0bDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIG9wYWNpdHk6IDA7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBoZWlnaHQ6IDUwMHB4O1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBzY3JvbGxiYXIgIWltcG9ydGFudDtcXG59XFxuXFxuLnNpbXBsZWJhci1kdW1teS1zY3JvbGxiYXItc2l6ZSA+IGRpdiB7XFxuICB3aWR0aDogMjAwJTtcXG4gIGhlaWdodDogMjAwJTtcXG4gIG1hcmdpbjogMTBweCAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDA7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TnVuaXRvK1NhbnM6b3Bzeix3Z2h0QDYuLjEyLDIwMC4uMTAwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJHaWxyb3lcIjtcbiAgc3JjOiB1cmwoXCIuLi9hc3NldHMvZm9udHMvR2lscm95X3JlZ3VsYXIud29mZjJcIikgZm9ybWF0KFwid29mZjJcIik7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJHaWxyb3lcIjtcbiAgc3JjOiB1cmwoXCIuLi9hc3NldHMvZm9udHMvR2lscm95X21lZGl1bS53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3lfYm9sZC53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuKixcbio6OmJlZm9yZSxcbio6OmFmdGVyIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiBcIk51bml0byBTYW5zXCI7XG4gIGZvbnQtc2l6ZTogMC41MjA4MzM1dnc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgbWFyZ2luOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmJvZHkge1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XG4gIGxpbmUtaGVpZ2h0OiAyLjVyZW07XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuXG5pbnB1dCxcbnRleHRhcmVhIHtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5cbmEge1xuICBjb2xvcjogdW5zZXQ7XG59XG5cbmEsXG5hOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5idXR0b24sXG5pbnB1dCxcbmEsXG50ZXh0YXJlYSB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udDogaW5oZXJpdDtcbn1cbmJ1dHRvbjpmb2N1cyxcbmlucHV0OmZvY3VzLFxuYTpmb2N1cyxcbnRleHRhcmVhOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cbmJ1dHRvbjphY3RpdmUsXG5pbnB1dDphY3RpdmUsXG5hOmFjdGl2ZSxcbnRleHRhcmVhOmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbmgxLFxuaDIsXG5oMyxcbmg0LFxuaDUsXG5oNiB7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxucCB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbmltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5idXR0b24ge1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250OiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBpbmhlcml0O1xuICBwYWRkaW5nOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxudWwge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbnVsIGxpIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4uY29udGFpbmVyIHtcbiAgd2lkdGg6IDE3MnJlbTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbmlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xufVxuXG5pbnB1dFt0eXBlPW51bWJlcl0ge1xuICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcbn1cblxuc3ZnLFxuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cbi5sb2NrIGJvZHkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG59XG5tYWluIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ud3JhcHBlciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtd2lkdGg6IDE5MjBweDtcbn1cblxuLmhlYWRlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5oZWFkZXJfX3RvcC1iYXIge1xuICBwYWRkaW5nOiAxLjRyZW0gMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VGRUZFRjtcbn1cbi5oZWFkZXJfX3RvcC1iYXIgLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uaGVhZGVyX19jb250YWN0cy1saXN0IHtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiAzcmVtO1xufVxuLmhlYWRlcl9fbmF2IHtcbiAgcGFkZGluZy1sZWZ0OiAyLjVyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDQuOHJlbTtcbn1cbi5oZWFkZXJfX25hdi1saW5rIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmhlYWRlcl9fbmF2LWxpbms6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjI1cmVtO1xuICBsZWZ0OiAtMi40cmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIHdpZHRoOiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNBMUEyQTk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG59XG4uaGVhZGVyX19pbm5lciB7XG4gIHBhZGRpbmctdG9wOiAycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuLmhlYWRlcl9faW5uZXIgLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbHVtbi1nYXA6IDJyZW07XG59XG4uaGVhZGVyX19sb2dvIHtcbiAgZmxleDogMCAwIDExLjJyZW07XG4gIHdpZHRoOiAxMS4ycmVtO1xufVxuLmhlYWRlcl9fY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHJvdy1nYXA6IDJyZW07XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuLmhlYWRlcl9fcm93IHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5oZWFkZXJfX3Jvd19sb3dlciB7XG4gIGNvbHVtbi1nYXA6IDIuMXJlbTtcbn1cbi5oZWFkZXJfX2NhdGFsb2ctYnRuIHtcbiAgbWFyZ2luLXJpZ2h0OiAyLjZyZW07XG59XG4uX3Nob3ctY2F0YWxvZyAuaGVhZGVyX19jYXRhbG9nLWJ0biAuY2F0YWxvZy1idG5fX2ljb24taW1nIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5fc2hvdy1jYXRhbG9nIC5oZWFkZXJfX2NhdGFsb2ctYnRuIC5jYXRhbG9nLWJ0bl9faWNvbi1pbWdfY3Jvc3Mge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4uaGVhZGVyX19zZWFyY2gge1xuICBtYXJnaW4tcmlnaHQ6IDMuMnJlbTtcbiAgZmxleDogMSAxIGF1dG87XG59XG4uaGVhZGVyX19hY3Rpb25zLWl0ZW0ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcm93LWdhcDogMC41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaGVhZGVyX19hY3Rpb25zLWl0ZW0gc3ZnIHtcbiAgd2lkdGg6IDMuNnJlbTtcbiAgaGVpZ2h0OiAzLjZyZW07XG59XG4uaGVhZGVyX19jYXRhbG9nLWNoYXB0ZXJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMS42cmVtO1xuICBmbGV4OiAxIDEgYXV0bztcbn1cbi5oZWFkZXJfX2NhdGFsb2ctY2hhcHRlciB7XG4gIHBhZGRpbmc6IDEuOXJlbSAyLjVyZW07XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiA2cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZFRkVGO1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLnNlYXJjaC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDZyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDA7XG59XG4uc2VhcmNoLWhlYWRlcl9faW5wdXQuaW5wdXRfX2ZpZWxkIHtcbiAgYm9yZGVyOiBub25lO1xufVxuLnNlYXJjaC1oZWFkZXJfX2J0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleDogMCAwIDZyZW07XG4gIHdpZHRoOiA2cmVtO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG59XG4uc2VhcmNoLWhlYWRlcl9fYnRuIHN2ZyB7XG4gIHdpZHRoOiA0LjRyZW07XG59XG5cbi5jYXRhbG9nLW1lbnUtaGVhZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE0cmVtO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFyZW0pO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZSwgdmlzaWJpbGl0eSAwLjNzIGVhc2UsIHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG4uX3Nob3ctY2F0YWxvZyAuY2F0YWxvZy1tZW51LWhlYWRlciB7XG4gIG9wYWNpdHk6IDE7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19pbm5lciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDQ4LjJyZW0gMTMzLjhyZW0gMWZyO1xuICBtYXgtd2lkdGg6IDE5MjBweDtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19uYXYge1xuICBwYWRkaW5nOiAxMHJlbSAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQTFBMkE5O1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX25hdi1zdWJsaW5rIHtcbiAgcGFkZGluZzogMi40cmVtO1xuICBwYWRkaW5nLWxlZnQ6IDE0cmVtO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19uYXYtc3VibGluayAudHh0IHtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX25hdi1zdWJsaW5rLl9pcy1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX25hdi1zdWJsaW5rLl9pcy1hY3RpdmUgLnR4dCB7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuLmNhdGFsb2ctbWVudS1oZWFkZXJfX3N1Ym5hdiB7XG4gIHBhZGRpbmctdG9wOiAxMHJlbTtcbiAgcGFkZGluZy1sZWZ0OiA1LjZyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fc3VibmF2Om5vdCguY2F0YWxvZy1tZW51LWhlYWRlcl9fc3VibmF2Ll9pcy1hY3RpdmUpIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19icmFuZHMge1xuICBtYXJnaW4tYm90dG9tOiA4cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiA4LjRyZW07XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fYnJhbmQtbG9nbyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiA1LjRyZW07XG59XG4uY2F0YWxvZy1tZW51LWhlYWRlcl9fYnJhbmQtbG9nbzpub3QoOmxhc3QtY2hpbGQpOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogLTQuMnJlbTtcbiAgd2lkdGg6IDJweDtcbiAgaGVpZ2h0OiA1LjRyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNBMUEyQTk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbn1cbi5jYXRhbG9nLW1lbnUtaGVhZGVyX19icmFuZC1sb2dvLWltZyB7XG4gIHdpZHRoOiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5oIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5oX2gxIHtcbiAgZm9udC1zaXplOiA1cmVtO1xuICBsaW5lLWhlaWdodDogNS42cmVtO1xufVxuLmhfaDIge1xuICBmb250LXNpemU6IDMuNnJlbTtcbiAgbGluZS1oZWlnaHQ6IDEyMCU7XG59XG4uaF9oMyB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMi40cmVtO1xuICBsaW5lLWhlaWdodDogMy4zcmVtO1xufVxuXG4udHh0XzI0IHtcbiAgZm9udC1zaXplOiAyLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjhyZW07XG59XG4udHh0XzIwIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi44cmVtO1xufVxuLnR4dF8xNiB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBsaW5lLWhlaWdodDogMi4ycmVtO1xufVxuLnR4dF8xNCB7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICBsaW5lLWhlaWdodDogMS45cmVtO1xufVxuLnR4dF9zZW1pYm9sZCB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbmlucHV0W3R5cGU9dGV4dF0sXG5pbnB1dFt0eXBlPWVtYWlsXSxcbmlucHV0W3R5cGU9dGVsXSxcbnRleHRhcmVhIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbnRleHRhcmVhOmZvY3VzLFxuaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4uaW5wdXQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHJvdy1nYXA6IDAuMnJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcbn1cbi5pbnB1dF9wYXNzIC5pbnB1dF9fZmllbGQge1xuICBwYWRkaW5nLXJpZ2h0OiA0LjVyZW07XG59XG4uaW5wdXRfX2ZpZWxkLCAuaW5wdXRfX2ZpZWxkOjpwbGFjZWhvbGRlciB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBsaW5lLWhlaWdodDogMi4ycmVtO1xufVxuLmlucHV0X19maWVsZCB7XG4gIHBhZGRpbmc6IDEuOHJlbSAycmVtO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGNvbG9yOiAjQTFBMkE5O1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG59XG4uaW5wdXRfX3Bhc3MtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIuMnJlbTtcbiAgcmlnaHQ6IDJyZW07XG59XG4uaW5wdXRfX3Bhc3MtYnRuLWkge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG4uaW5wdXRfX3Bhc3MtYnRuLWlfaGlkZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uX2lzLXJldmVhbGVkIC5pbnB1dF9fcGFzcy1idG4taSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uX2lzLXJldmVhbGVkIC5pbnB1dF9fcGFzcy1idG4taV9oaWRlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuLmlucHV0Ll9oYXMtZXJyb3I6OmFmdGVyIHtcbiAgY29udGVudDogYXR0cihkYXRhLWhpbnQpO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgY29sb3I6ICNmNDAwMDA7XG59XG4uaW5wdXQuX2hhcy1lcnJvciAuaW5wdXRfX2ZpZWxkIHtcbiAgY29sb3I6ICNmNDAwMDA7XG59XG4uaW5wdXQuX2hhcy1mb2N1cyAuaW5wdXRfX2ZpZWxkLCAuaW5wdXQuX2lzLWZpbGxlZCAuaW5wdXRfX2ZpZWxkIHtcbiAgY29sb3I6ICMwMDAwMDA7XG59XG5cbnRleHRhcmVhLmlucHV0IHtcbiAgcGFkZGluZzogMHB4IDBweDtcbiAgcmVzaXplOiBub25lO1xufVxuXG4uYnRuIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYnRuX3ByaW1hcnkge1xuICBwYWRkaW5nOiAxcmVtIDMuMnJlbTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogNnJlbTtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAjMDAwMDAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xufVxuLmJ0bl9wcmltYXJ5IC50eHQge1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xufVxuLmJ0bl9zZWNvbmRhcnkge1xuICBtYXJnaW4tcmlnaHQ6IDEuNnJlbTtcbn1cbi5idG5fc2Vjb25kYXJ5OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGZsZXg6IDAgMCAyLjRyZW07XG4gIHdpZHRoOiAyLjRyZW07XG4gIGhlaWdodDogMi40cmVtO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYXJyLXNtLnN2Z1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMC42cmVtKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbn1cbi5idG5bZGlzYWJsZWRdLCAuYnRuLl9pcy1kaXNhYmxlZCB7XG4gIGJvcmRlcjogMS41cHggc29saWQgI0ExQTJBOTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ExQTJBOTtcbn1cblxuLmNhdGFsb2ctYnRuIHtcbiAgcGFkZGluZzogMC44cmVtO1xuICBwYWRkaW5nLXJpZ2h0OiAxLjJyZW07XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAxLjJyZW07XG4gIGhlaWdodDogNnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbn1cbi5jYXRhbG9nLWJ0bl9faWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleDogMCAwIDQuNHJlbTtcbiAgd2lkdGg6IDQuNHJlbTtcbiAgaGVpZ2h0OiA0LjRyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG4uY2F0YWxvZy1idG5fX2ljb24taW1nIHtcbiAgd2lkdGg6IDIuNHJlbTtcbiAgaGVpZ2h0OiAyLjRyZW07XG59XG4uY2F0YWxvZy1idG5fX2ljb24taW1nX2Nyb3NzIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgZmxleDogMCAwIDRyZW07XG4gIHdpZHRoOiA0cmVtO1xuICBoZWlnaHQ6IDRyZW07XG59XG4uY2F0YWxvZy1idG5fX3R4dCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4ub3B0aW9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4ub3B0aW9uX19pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cbi5vcHRpb25fX2lucHV0OmNoZWNrZWQgKyAub3B0aW9uX190eHQ6OmFmdGVyIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cbi5vcHRpb25fX3R4dCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGdhcDogMC44cmVtO1xufVxuLm9wdGlvbl9fdHh0OjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xuICBmbGV4OiAwIDAgMi40cmVtO1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICMwMDAwMDA7XG59XG4ub3B0aW9uX190eHQ6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwLjRyZW07XG4gIHRvcDogMC40cmVtO1xuICB3aWR0aDogMS42cmVtO1xuICBoZWlnaHQ6IDEuNnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuXG4uY2hlY2tib3gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuLmNoZWNrYm94X19pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cbi5jaGVja2JveF9faW5wdXQ6Y2hlY2tlZCArIC5jaGVja2JveF9fdHh0OjpiZWZvcmUge1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICMwMDAwMDA7XG59XG4uY2hlY2tib3hfX2lucHV0OmNoZWNrZWQgKyAuY2hlY2tib3hfX3R4dDo6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuLmNoZWNrYm94X190eHQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAwLjhyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jaGVja2JveF9fdHh0OjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBmbGV4OiAwIDAgMi4ycmVtO1xuICB3aWR0aDogMi4ycmVtO1xuICBoZWlnaHQ6IDIuMnJlbTtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAjQTFBMkE5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICB0cmFuc2l0aW9uOiBib3JkZXIgMC4zcyBlYXNlO1xufVxuLmNoZWNrYm94X190eHQ6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDAuNXJlbTtcbiAgbGVmdDogMC4zcmVtO1xuICB3aWR0aDogMS42cmVtO1xuICBoZWlnaHQ6IDEuNnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbn1cblxuLmJyZWFkY3J1bWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgY29sdW1uLWdhcDogMi40cmVtO1xufVxuLmJyZWFkY3J1bWJzX19saW5rIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjb2xvcjogI0ExQTJBOTtcbn1cbi5icmVhZGNydW1ic19fbGlua19jaGFwdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5icmVhZGNydW1ic19fbGlua19jaGFwdGVyOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGZsZXg6IDAgMCAyLjRyZW07XG4gIHdpZHRoOiAyLjRyZW07XG4gIGhlaWdodDogMi40cmVtO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYXJyLWdyYXkuc3ZnXCIpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG59XG4uYnJlYWRjcnVtYnNfX2xpbms6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjJyZW07XG4gIHJpZ2h0OiAtMS4ycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIHdpZHRoOiAxLjJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ExQTJBOTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xufVxuLnBhZ2luYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAyLjRyZW07XG59XG4ucGFnaW5hdGlvbl9fYXJyIHtcbiAgZmxleDogMCAwIDIuNHJlbTtcbiAgd2lkdGg6IDIuNHJlbTtcbiAgaGVpZ2h0OiAyLjRyZW07XG59XG4ucGFnaW5hdGlvbl9fYXJyIHN2ZyBwYXRoIHtcbiAgZmlsbDogIzAwMDAwMDtcbn1cbi5wYWdpbmF0aW9uX19hcnIuX2lzLWRpc2FibGVkIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4ucGFnaW5hdGlvbl9fYXJyLl9pcy1kaXNhYmxlZCBzdmcgcGF0aCB7XG4gIGZpbGw6ICNBMUEyQTk7XG59XG4ucGFnaW5hdGlvbl9fYXJyX25leHQge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xufVxuLnBhZ2luYXRpb25fX251bXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiAwLjRyZW07XG59XG4ucGFnaW5hdGlvbl9fbnVtIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4OiAwIDAgNXJlbTtcbiAgd2lkdGg6IDVyZW07XG4gIGhlaWdodDogNXJlbTtcbiAgY29sb3I6ICNBMUEyQTk7XG59XG4ucGFnaW5hdGlvbl9fbnVtLl9pcy1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZFRkVGO1xuICBjb2xvcjogIzAwMDAwMDtcbn1cblxuLmFycm93LWJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleDogMCAwIDVyZW07XG4gIHdpZHRoOiA1cmVtO1xuICBoZWlnaHQ6IDVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XG59XG4uYXJyb3ctYnRuX25leHQgc3ZnIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbn1cbi5hcnJvdy1idG46YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbn1cbi5hcnJvdy1idG46YWN0aXZlIHN2ZyBwYXRoIHtcbiAgZmlsbDogI2ZmZmZmZjtcbn1cbi5hcnJvdy1idG4gc3ZnIHtcbiAgd2lkdGg6IDIuNHJlbTtcbiAgaGVpZ2h0OiAyLjRyZW07XG59XG4uYXJyb3ctYnRuIHN2ZyBwYXRoIHtcbiAgZmlsbDogIzAwMDAwMDtcbiAgdHJhbnNpdGlvbjogZmlsbCAwLjNzIGVhc2U7XG59XG5cbi5pLWxpbmsge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgY29sdW1uLWdhcDogMC45cmVtO1xufVxuLmktbGluayBzdmcge1xuICBmbGV4OiAwIDAgMi40cmVtO1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAuMDVyZW0pO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCl7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDVweDtcbiAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xuICAgIGZvbnQtc2l6ZTogMS4zMzMzMzMzMzMzdnc7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMCAzLjJyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbkBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcil7XG4gIC5idG5fcHJpbWFyeTpub3QoLmJ0bl9wcmltYXJ5W2Rpc2FibGVkXSwgLmJ0bl9wcmltYXJ5Ll9pcy1kaXNhYmxlZCk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIH1cbiAgLmJ0bl9wcmltYXJ5Om5vdCguYnRuX3ByaW1hcnlbZGlzYWJsZWRdLCAuYnRuX3ByaW1hcnkuX2lzLWRpc2FibGVkKTpob3ZlciAudHh0IHtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgfVxuICAuYnRuX3NlY29uZGFyeTpob3Zlcjo6YWZ0ZXIge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvZm9udHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGUuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc2V0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3NlY3Rpb25zL2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL190eXBvLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX2lucHV0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX2J1dHRvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fcmFkaW8tYnV0dG9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX2NoZWNrYm94LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX2JyZWFkY3J1bWJzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX3BhZ2luYXRpb24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fYXJyb3ctYnRuLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX2ktbGluay5zY3NzXCIsXCI8bm8gc291cmNlPlwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHFCQUFBO0VBQ0EsZ0VBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDRUY7QURBQTtFQUNFLHFCQUFBO0VBQ0EsK0RBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDRUY7QURBQTtFQUNFLHFCQUFBO0VBQ0EsNkRBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDRUY7QUNsQkE7OztFQUdJLHNCQUFBO0FEb0JKOztBQ2xCQTtFQUNJLDBCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUNBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtBRHFCSjs7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RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNUNUJNO0FBZ3RCVjtBU2xyQkk7RUFDRSx5QlRoQ0M7RVNpQ0QsY1RsQ0U7QUFzdEJSOztBVTl0QkE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQ0FBQTtFQUNBLHlCVkRNO0VVRU4sc0NBQUE7QVZpdUJGO0FVOXRCSTtFQUNFLHlCQUFBO0FWZ3VCTjtBVTV0QkU7RUFDRSx5QlZWSTtBQXd1QlI7QVU1dEJJO0VBQ0UsYVZkRTtBQTR1QlI7QVUxdEJFO0VBQ0UsYUFBQTtFQUNBLGNBQUE7QVY0dEJKO0FVMXRCSTtFQUNFLGFWdEJFO0VVdUJGLDBCQUFBO0FWNHRCTjs7QVczdkJBO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtBWDh2QkY7QVc1dkJFO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLDhCQUFBO0FYOHZCSjtBWXR3QkE7RVg4SEk7SUFDSSxlQUFBO0VEK0JOO0FBMGtCRjtBWXh1QkE7RVhvSUk7SUFDSSxjQUFBO0lBQ0EsbUJBQUE7SUFDQSx5QkFBQTtJQUNBLDhCQUFBO0VEOEJOO0VDM0JFO0lBQ0ksZUFBQTtJQUNBLDhCQUFBO0VENkJOO0VDMUJFO0lBQ0ksaUJBQUE7SUFDQSxXQUFBO0VENEJOO0FBMGtCRjtBWXh2QkE7RVBvQlE7SUFDRSx5QkxkRjtFQTRmTjtFSzVlUTtJQUNFLGNMaEJKO0VBOGZOO0VLdGRNO0lBQ0Usd0JBQUE7RUx3ZVI7QUEwT0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0dpbHJveSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0dpbHJveSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9tZWRpdW0ud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnR2lscm95JztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvR2lscm95X2JvbGQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cIixcIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtaXhpbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuQGltcG9ydCAnLi9taXhpbnMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHZhcmlhYmxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gY29sb3JzXFxuJHdoaXRlOiAjZmZmZmZmO1xcbiRibGFjazogIzAwMDAwMDtcXG4kZ3JheTogI0VGRUZFRjtcXG4kZ3JheVR4dDogI0ExQTJBOTtcXG4kcmVkOiAjRjQwMDAwRkY7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBmb250cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1OdW5pdG8rU2FuczpvcHN6LHdnaHRANi4uMTIsMjAwLi4xMDAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbi8vIGxvY2FsIGZvbnRzXFxuIEBpbXBvcnQgJy4vZm9udHMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYmFzZSBzdHlsZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gYmFzZSBzY3NzIGZpbGVcXG5AaW1wb3J0ICcuL3NldCc7XFxuXFxuLy8gYm9keVxcbmJvZHkge1xcbiAgICAubG9jayAmIHtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB0b3VjaC1hY3Rpb246IG5vbmU7XFxuICAgIH1cXG4gICAgLmxvYWRlZCAmIHtcXG4gICAgfVxcbn1cXG5cXG4vLyBtYWluXFxubWFpbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLy8gd3JhcHBlclxcbi53cmFwcGVyIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG1heC13aWR0aDogMTkyMHB4O1xcbn1cXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGhlYWRlciAvIGZvb3RlclxcbkBpbXBvcnQgJy4vc2VjdGlvbnMvaGVhZGVyJztcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2Zvb3Rlcic7XFxuXFxuLy8gdWlcXG5AaW1wb3J0ICcuLi91aS9zdHlsZXMvdWkuc2Nzcyc7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0ICcuL2Rldi92em1zazEuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvbWFya3VzRE0uc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvdWtpazAuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYva2llNmVyLnNjc3MnO1xcblwiLFwiKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5odG1sIHtcXG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7IC8vINGI0YDQuNGE0YIg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0L/QviDRgdCw0LnRgtGDXFxuICAgIGZvbnQtc2l6ZTogMC41MjA4MzM1dnc7IC8vINC90LAg0YDQsNC30YDQtdGI0LXQvdC40LggMTkyMCAwLjUyMDgzNXZ3ID09PSAxMHB4XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcXG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiAyLjVyZW07XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmb250LXNpemU6IDEuOHJlbTtcXG4gICAgY29sb3I6IGJsYWNrOyAvLyDRhtCy0LXRgiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgtC10LrRgdGC0LAg0L/QviDRgdCw0LnRgtGDXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG59XFxuXFxuaW5wdXQsXFxudGV4dGFyZWEge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuYSB7XFxuICAgIGNvbG9yOiB1bnNldDtcXG59XFxuYSxcXG5hOmhvdmVyIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxuYSxcXG50ZXh0YXJlYSB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgJjpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICB9XFxuICAgICY6YWN0aXZlIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIH1cXG59XFxuXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcbnAge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG5pbWcge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgdGV4dC1hbGlnbjogaW5oZXJpdDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbnVsIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG51bCBsaSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxNzJyZW07XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdudW1iZXInXSB7XFxuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbn1cXG5cXG5zdmcsXFxuaW1nIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxLjU2MjV2dztcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygoMTAwIC8gMzc1KSAqIDV2dyk7IC8vINCz0LTQtSAzNzUg0Y3RgtC+INGI0LjRgNC40L3QsCDQvNC+0LEg0LLQtdGA0YHQuNC4INC80LDQutC10YLQsFxcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuXFxuICAgIGJvZHkge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5jb250YWluZXIge1xcbiAgICAgICAgcGFkZGluZzogMCAzLjJyZW07IC8vINCyINC80L7QsSDQstC10YDRgdC40Lgg0L7RgtGB0YLRg9C/INC+0YIg0LrRgNCw0Y8g0LfQsNC00LDQtdC8INC00LvRjyDQstGB0LXRhSDQutC+0L3RgtC10LnQvdC10YDQvtCyLCDQsCDRgtCw0Lwg0LPQtNC1INC90LUg0L3Rg9C20L3QviDQvNC+0LbQtdC8INGC0L7Rh9C10YfQvdC+INGD0LHRgNCw0YLRjFxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXCIsXCIuaGVhZGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgJl9fdG9wLWJhciB7XFxuICAgIHBhZGRpbmc6IDEuNHJlbSAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheTtcXG5cXG4gICAgLmNvbnRhaW5lciB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX19jb250YWN0cy1saXN0IHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAzcmVtO1xcbiAgfVxcblxcbiAgJl9fbmF2IHtcXG4gICAgcGFkZGluZy1sZWZ0OiAyLjVyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IDQuOHJlbTtcXG4gIH1cXG5cXG4gICZfX25hdi1saW5rIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDAuMjVyZW07XFxuICAgICAgbGVmdDogLTIuNHJlbTtcXG4gICAgICBoZWlnaHQ6IDJyZW07XFxuICAgICAgd2lkdGg6IDFweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheVR4dDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX19pbm5lciB7XFxuICAgIHBhZGRpbmctdG9wOiAycmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuXFxuICAgIC5jb250YWluZXIge1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgY29sdW1uLWdhcDogMnJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fbG9nbyB7XFxuICAgIGZsZXg6IDAgMCAxMS4ycmVtO1xcbiAgICB3aWR0aDogMTEuMnJlbTtcXG4gIH1cXG5cXG4gICZfX2NvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICByb3ctZ2FwOiAycmVtO1xcbiAgICBmbGV4OiAxIDEgYXV0bztcXG4gIH1cXG5cXG4gICZfX3JvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuXFxuICAgICZfdXBwZXIge1xcbiAgICB9XFxuICAgICZfbG93ZXIge1xcbiAgICAgIGNvbHVtbi1nYXA6IDIuMXJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fY2F0YWxvZy1idG4ge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIuNnJlbTtcXG5cXG4gICAgLl9zaG93LWNhdGFsb2cgJiB7XFxuICAgICAgLmNhdGFsb2ctYnRuX19pY29uLWltZyB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcblxcbiAgICAgICAgJl9jcm9zcyB7XFxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX3NlYXJjaCB7XFxuICAgIG1hcmdpbi1yaWdodDogMy4ycmVtO1xcbiAgICBmbGV4OiAxIDEgYXV0bztcXG4gIH1cXG5cXG4gICZfX2FjdGlvbnMge1xcblxcbiAgfVxcblxcbiAgJl9fYWN0aW9ucy1pdGVtIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHJvdy1nYXA6IDAuNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgICBzdmcge1xcbiAgICAgIHdpZHRoOiAzLjZyZW07XFxuICAgICAgaGVpZ2h0OiAzLjZyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX2FjdGlvbnMtaXRlbS10eHQge1xcblxcbiAgfVxcblxcbiAgJl9fY2F0YWxvZy1jaGFwdGVycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IDEuNnJlbTtcXG4gICAgZmxleDogMSAxIGF1dG87XFxuICB9XFxuXFxuICAmX19jYXRhbG9nLWNoYXB0ZXIge1xcbiAgICBwYWRkaW5nOiAxLjlyZW0gMi41cmVtO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGhlaWdodDogNnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGdyYXk7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgfVxcbn1cXG5cXG4uc2VhcmNoLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiA2cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgJGJsYWNrO1xcblxcbiAgJl9faW5wdXQge1xcbiAgICAmLmlucHV0IHtcXG4gICAgICAmX19maWVsZCB7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAmX19idG4ge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZsZXg6IDAgMCA2cmVtO1xcbiAgICB3aWR0aDogNnJlbTtcXG4gICAgaGVpZ2h0OiA2cmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuXFxuICAgIHN2ZyB7XFxuICAgICAgd2lkdGg6IDQuNHJlbTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4uY2F0YWxvZy1tZW51LWhlYWRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDE0cmVtO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgb3BhY2l0eTogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXJlbSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZSwgdmlzaWJpbGl0eSAwLjNzIGVhc2UsIHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxuXFxuICAuX3Nob3ctY2F0YWxvZyAmIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgfVxcblxcbiAgJl9faW5uZXIge1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0OC4ycmVtIDEzMy44cmVtIDFmcjtcXG4gICAgbWF4LXdpZHRoOiAxOTIwcHg7XFxuICB9XFxuXFxuICAmX19uYXYge1xcbiAgICBwYWRkaW5nOiAxMHJlbSAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAkZ3JheVR4dDtcXG4gIH1cXG5cXG4gICZfX25hdi1zdWJsaW5rIHtcXG4gICAgcGFkZGluZzogMi40cmVtO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDE0cmVtO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcXG5cXG4gICAgLnR4dCB7XFxuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xcbiAgICB9XFxuXFxuICAgICYuX2lzLWFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcblxcbiAgICAgIC50eHQge1xcbiAgICAgICAgY29sb3I6ICR3aGl0ZTtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX3N1Ym5hdiB7XFxuICAgIHBhZGRpbmctdG9wOiAxMHJlbTtcXG4gICAgcGFkZGluZy1sZWZ0OiA1LjZyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICAgICY6bm90KCYuX2lzLWFjdGl2ZSkge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX2JyYW5kcyB7XFxuICAgIG1hcmdpbi1ib3R0b206IDhyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IDguNHJlbTtcXG4gIH1cXG5cXG4gICZfX2JyYW5kLWxvZ28ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNS40cmVtO1xcblxcbiAgICAmOm5vdCg6bGFzdC1jaGlsZCkge1xcblxcbiAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgcmlnaHQ6IC00LjJyZW07XFxuICAgICAgICB3aWR0aDogMnB4O1xcbiAgICAgICAgaGVpZ2h0OiA1LjRyZW07XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheVR4dDtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcXG4gICAgICB9XFxuICAgIH1cXG5cXG4gIH1cXG5cXG4gICZfX2JyYW5kLWxvZ28taW1nIHtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGhlaWdodDogMTAwJTtcXG4gIH1cXG59XCIsXCIuaCB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuXFxuICAgICZfaDEge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUuNnJlbTtcXG4gICAgfVxcblxcbiAgICAmX2gyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMy42cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEyMCU7XFxuICAgIH1cXG5cXG4gICAgJl9oMyB7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgZm9udC1zaXplOiAyLjRyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMy4zcmVtO1xcbiAgICB9XFxufVxcblxcbi50eHQge1xcbiAgICAmXzI0IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMi40cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcXG4gICAgfVxcblxcbiAgICAmXzIwIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjhyZW07XFxuICAgIH1cXG5cXG4gICAgJl8xNiB7XFxuICAgICAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjJyZW07XFxuICAgIH1cXG5cXG4gICAgJl8xNCB7XFxuICAgICAgICBmb250LXNpemU6IDEuNHJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjlyZW07XFxuICAgIH1cXG5cXG4gICAgJl9zZW1pYm9sZCB7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB9XFxufVwiLFwiaW5wdXRbdHlwZT0ndGV4dCddLFxcbmlucHV0W3R5cGU9J2VtYWlsJ10sXFxuaW5wdXRbdHlwZT0ndGVsJ10sXFxudGV4dGFyZWEge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG59XFxudGV4dGFyZWE6Zm9jdXMsXFxuaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmlucHV0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMC4ycmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XFxuXFxuICAmX3Bhc3Mge1xcbiAgICAuaW5wdXRfX2ZpZWxkIHtcXG4gICAgICBwYWRkaW5nLXJpZ2h0OiA0LjVyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX2ZpZWxkLFxcbiAgJl9fZmllbGQ6OnBsYWNlaG9sZGVyIHtcXG4gICAgZm9udC1zaXplOiAxLjZyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAyLjJyZW07XFxuICB9XFxuXFxuICAmX19maWVsZCB7XFxuICAgIHBhZGRpbmc6IDEuOHJlbSAycmVtO1xcbiAgICBoZWlnaHQ6IDZyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gICAgY29sb3I6ICRncmF5VHh0O1xcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XFxuICB9XFxuXFxuICAmX19wYXNzLWJ0biB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyLjJyZW07XFxuICAgIHJpZ2h0OiAycmVtO1xcbiAgfVxcblxcbiAgJl9fcGFzcy1idG4taSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDJyZW07XFxuICAgIGhlaWdodDogMnJlbTtcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG5cXG4gICAgJl9oaWRlIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5faXMtcmV2ZWFsZWQgJiB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICAmX2hpZGUge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJi5faGFzLWVycm9yIHtcXG5cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcXG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgfVxcblxcbiAgICAuaW5wdXRfX2ZpZWxkIHtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgfVxcbiAgfVxcblxcbiAgJi5faGFzLWZvY3VzLFxcbiAgJi5faXMtZmlsbGVkIHtcXG4gICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG50ZXh0YXJlYS5pbnB1dCB7XFxuICBwYWRkaW5nOiAwcHggMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbn1cXG5cIixcIi5idG4ge1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgJl9wcmltYXJ5IHtcXG4gICAgcGFkZGluZzogMXJlbSAzLjJyZW07XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDZyZW07XFxuICAgIGJvcmRlcjogMS41cHggc29saWQgJGJsYWNrO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XFxuXFxuICAgIC50eHQge1xcbiAgICAgIGNvbG9yOiAkd2hpdGU7XFxuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xcbiAgICB9XFxuXFxuICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICY6bm90KCZbZGlzYWJsZWRdLCAmLl9pcy1kaXNhYmxlZCkge1xcbiAgICAgICAgJjpob3ZlciB7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG5cXG4gICAgICAgICAgLnR4dCB7XFxuICAgICAgICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJl9zZWNvbmRhcnkge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEuNnJlbTtcXG5cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIGZsZXg6IDAgMCAyLjRyZW07XFxuICAgICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4vYXNzZXRzL2ltYWdlcy9pY29ucy9hcnItc20uc3ZnXFxcIik7XFxuICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuNnJlbSk7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcblxcbiAgICBAbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpIHtcXG4gICAgICAmOmhvdmVyIHtcXG4gICAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJltkaXNhYmxlZF0sXFxuICAmLl9pcy1kaXNhYmxlZCB7XFxuICAgIGJvcmRlcjogMS41cHggc29saWQgJGdyYXlUeHQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5VHh0O1xcbiAgfVxcblxcbn1cXG5cXG4uY2F0YWxvZy1idG4ge1xcbiAgcGFkZGluZzogMC44cmVtO1xcbiAgcGFkZGluZy1yaWdodDogMS4ycmVtO1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sdW1uLWdhcDogMS4ycmVtO1xcbiAgaGVpZ2h0OiA2cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcblxcbiAgJl9faWNvbiB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZmxleDogMCAwIDQuNHJlbTtcXG4gICAgd2lkdGg6IDQuNHJlbTtcXG4gICAgaGVpZ2h0OiA0LjRyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gIH1cXG5cXG4gICZfX2ljb24taW1nIHtcXG4gICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgaGVpZ2h0OiAyLjRyZW07XFxuXFxuICAgICZfY3Jvc3Mge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgZmxleDogMCAwIDRyZW07XFxuICAgICAgd2lkdGg6IDRyZW07XFxuICAgICAgaGVpZ2h0OiA0cmVtO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX190eHQge1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBjb2xvcjogJHdoaXRlO1xcbiAgfVxcbn1cIixcIi5vcHRpb24ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG5cXG4gICZfX2lucHV0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcblxcbiAgICAmOmZvY3VzICsgLm9wdGlvbl9fdHh0OjpiZWZvcmUge1xcbiAgICB9XFxuICAgICY6Y2hlY2tlZCArIC5vcHRpb25fX3R4dDo6YmVmb3JlIHtcXG4gICAgfVxcbiAgICAmOmNoZWNrZWQgKyAub3B0aW9uX190eHQ6OmFmdGVyIHtcXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX190eHQge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBnYXA6IDAuOHJlbTtcXG5cXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgICAgIGZsZXg6IDAgMCAyLjRyZW07XFxuICAgICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgYm9yZGVyOiAxLjVweCBzb2xpZCAkYmxhY2s7XFxuICAgIH1cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBsZWZ0OiAwLjRyZW07XFxuICAgICAgdG9wOiAwLjRyZW07XFxuICAgICAgd2lkdGg6IDEuNnJlbTtcXG4gICAgICBoZWlnaHQ6IDEuNnJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cIixcIi5jaGVja2JveCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG5cXG4gICZfX2lucHV0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcblxcbiAgICAmOmNoZWNrZWQgKyAuY2hlY2tib3hfX3R4dCB7XFxuICAgICAgJjo6YmVmb3JlIHtcXG4gICAgICAgIGJvcmRlcjogMS41cHggc29saWQgJGJsYWNrO1xcbiAgICAgIH1cXG4gICAgICAmOjphZnRlciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fdHh0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sdW1uLWdhcDogMC44cmVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuXFxuICAgICY6OmJlZm9yZSB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgZmxleDogMCAwIDIuMnJlbTtcXG4gICAgICB3aWR0aDogMi4ycmVtO1xcbiAgICAgIGhlaWdodDogMi4ycmVtO1xcbiAgICAgIGJvcmRlcjogMS41cHggc29saWQgJGdyYXlUeHQ7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjNzIGVhc2U7XFxuICAgIH1cXG5cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDAuNXJlbTtcXG4gICAgICBsZWZ0OiAwLjNyZW07XFxuICAgICAgd2lkdGg6IDEuNnJlbTtcXG4gICAgICBoZWlnaHQ6IDEuNnJlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcbiAgICB9XFxuICB9XFxufVxcblwiLFwiLmJyZWFkY3J1bWJzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBjb2x1bW4tZ2FwOiAyLjRyZW07XFxuXFxuICAmX19saW5rIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjb2xvcjogJGdyYXlUeHQ7XFxuXFxuICAgICZfY2hhcHRlciB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgICAgZmxleDogMCAwIDIuNHJlbTtcXG4gICAgICAgIHdpZHRoOiAyLjRyZW07XFxuICAgICAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi9hc3NldHMvaW1hZ2VzL2ljb25zL2Fyci1ncmF5LnN2Z1xcXCIpO1xcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAwLjJyZW07XFxuICAgICAgcmlnaHQ6IC0xLjJyZW07XFxuICAgICAgaGVpZ2h0OiAycmVtO1xcbiAgICAgIHdpZHRoOiAxLjJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheVR4dDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX3R4dCB7XFxuXFxuICB9XFxufVwiLFwiLnBhZ2luYXRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2x1bW4tZ2FwOiAyLjRyZW07XFxuXFxuICAmX19hcnIge1xcbiAgICBmbGV4OiAwIDAgMi40cmVtO1xcbiAgICB3aWR0aDogMi40cmVtO1xcbiAgICBoZWlnaHQ6IDIuNHJlbTtcXG5cXG4gICAgc3ZnIHBhdGgge1xcbiAgICAgIGZpbGw6ICRibGFjaztcXG4gICAgfVxcblxcbiAgICAmLl9pcy1kaXNhYmxlZCB7XFxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgICAgc3ZnIHBhdGgge1xcbiAgICAgICAgZmlsbDogJGdyYXlUeHQ7XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICAgICZfbmV4dCB7XFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fbnVtcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGNvbHVtbi1nYXA6IDAuNHJlbTtcXG4gIH1cXG5cXG4gICZfX251bSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZmxleDogMCAwIDVyZW07XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBoZWlnaHQ6IDVyZW07XFxuICAgIGNvbG9yOiAkZ3JheVR4dDtcXG5cXG4gICAgJi5faXMtYWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheTtcXG4gICAgICBjb2xvcjogJGJsYWNrO1xcbiAgICB9XFxuICB9XFxufVwiLFwiLmFycm93LWJ0biB7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXg6IDAgMCA1cmVtO1xcbiAgd2lkdGg6IDVyZW07XFxuICBoZWlnaHQ6IDVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcXG5cXG4gICZfbmV4dCB7XFxuICAgIHN2ZyB7XFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgfVxcbiAgfVxcblxcbiAgJjphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuXFxuICAgIHN2ZyBwYXRoIHtcXG4gICAgICBmaWxsOiAkd2hpdGU7XFxuICAgIH1cXG4gIH1cXG5cXG4gIHN2ZyB7XFxuICAgIHdpZHRoOiAyLjRyZW07XFxuICAgIGhlaWdodDogMi40cmVtO1xcblxcbiAgICBwYXRoIHtcXG4gICAgICBmaWxsOiAkYmxhY2s7XFxuICAgICAgdHJhbnNpdGlvbjogZmlsbCAwLjNzIGVhc2U7XFxuICAgIH1cXG4gIH1cXG59XCIsXCIuaS1saW5rIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgY29sdW1uLWdhcDogMC45cmVtO1xcblxcbiAgc3ZnIHtcXG4gICAgZmxleDogMCAwIDIuNHJlbTtcXG4gICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgaGVpZ2h0OiAyLjRyZW07XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjA1cmVtKTtcXG4gIH1cXG59XCIsbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2ltcGxlYmFyLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaW1wbGViYXIuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiaW1wb3J0IHRyaW1tZWRFbmRJbmRleCBmcm9tICcuL190cmltbWVkRW5kSW5kZXguanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltU3RhcnQgPSAvXlxccysvO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRyaW1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gdHJpbS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHRyaW1tZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVHJpbShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZ1xuICAgID8gc3RyaW5nLnNsaWNlKDAsIHRyaW1tZWRFbmRJbmRleChzdHJpbmcpICsgMSkucmVwbGFjZShyZVRyaW1TdGFydCwgJycpXG4gICAgOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUcmltO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggYSBzaW5nbGUgd2hpdGVzcGFjZSBjaGFyYWN0ZXIuICovXG52YXIgcmVXaGl0ZXNwYWNlID0gL1xccy87XG5cbi8qKlxuICogVXNlZCBieSBgXy50cmltYCBhbmQgYF8udHJpbUVuZGAgdG8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgbGFzdCBub24td2hpdGVzcGFjZVxuICogY2hhcmFjdGVyIG9mIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3Rlci5cbiAqL1xuZnVuY3Rpb24gdHJpbW1lZEVuZEluZGV4KHN0cmluZykge1xuICB2YXIgaW5kZXggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChpbmRleC0tICYmIHJlV2hpdGVzcGFjZS50ZXN0KHN0cmluZy5jaGFyQXQoaW5kZXgpKSkge31cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0cmltbWVkRW5kSW5kZXg7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgbm93IGZyb20gJy4vbm93LmpzJztcbmltcG9ydCB0b051bWJlciBmcm9tICcuL3RvTnVtYmVyLmpzJztcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHRpbWVXYWl0aW5nID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZ1xuICAgICAgPyBuYXRpdmVNaW4odGltZVdhaXRpbmcsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKVxuICAgICAgOiB0aW1lV2FpdGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTeW1ib2w7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbm93O1xuIiwiaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vZGVib3VuY2UuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB0aHJvdHRsZWQgZnVuY3Rpb24gdGhhdCBvbmx5IGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXJcbiAqIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIFRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgXG4gKiBtZXRob2QgdG8gY2FuY2VsIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvXG4gKiBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS4gUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2BcbiAqIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGBcbiAqIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGVcbiAqIHRocm90dGxlZCBmdW5jdGlvbi4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHJldHVybiB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRocm90dGxlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy50aHJvdHRsZWAgYW5kIGBfLmRlYm91bmNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRocm90dGxlIGludm9jYXRpb25zIHRvLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHRocm90dGxlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgZXhjZXNzaXZlbHkgdXBkYXRpbmcgdGhlIHBvc2l0aW9uIHdoaWxlIHNjcm9sbGluZy5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlcy5cbiAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwgeyAndHJhaWxpbmcnOiBmYWxzZSB9KTtcbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgdGhyb3R0bGVkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCB0aHJvdHRsZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGVhZGluZyA9IHRydWUsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICdsZWFkaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmxlYWRpbmcgOiBsZWFkaW5nO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgcmV0dXJuIGRlYm91bmNlKGZ1bmMsIHdhaXQsIHtcbiAgICAnbGVhZGluZyc6IGxlYWRpbmcsXG4gICAgJ21heFdhaXQnOiB3YWl0LFxuICAgICd0cmFpbGluZyc6IHRyYWlsaW5nXG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsImltcG9ydCBiYXNlVHJpbSBmcm9tICcuL19iYXNlVHJpbS5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSBiYXNlVHJpbSh2YWx1ZSk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b051bWJlcjtcbiIsIi8qKlxuICogc2ltcGxlYmFyLWNvcmUgLSB2MS4yLjRcbiAqIFNjcm9sbGJhcnMsIHNpbXBsZXIuXG4gKiBodHRwczovL2dyc210by5naXRodWIuaW8vc2ltcGxlYmFyL1xuICpcbiAqIE1hZGUgYnkgQWRyaWVuIERlbmF0IGZyb20gYSBmb3JrIGJ5IEpvbmF0aGFuIE5pY29sXG4gKiBVbmRlciBNSVQgTGljZW5zZVxuICovXG5cbmltcG9ydCB7IHRocm90dGxlLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgY2FuVXNlRE9NIGZyb20gJ2Nhbi11c2UtZG9tJztcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xuXG52YXIgY2FjaGVkU2Nyb2xsYmFyV2lkdGggPSBudWxsO1xudmFyIGNhY2hlZERldmljZVBpeGVsUmF0aW8gPSBudWxsO1xuaWYgKGNhblVzZURPTSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjYWNoZWREZXZpY2VQaXhlbFJhdGlvICE9PSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbykge1xuICAgICAgICAgICAgY2FjaGVkRGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgY2FjaGVkU2Nyb2xsYmFyV2lkdGggPSBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzY3JvbGxiYXJXaWR0aCgpIHtcbiAgICBpZiAoY2FjaGVkU2Nyb2xsYmFyV2lkdGggPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNhY2hlZFNjcm9sbGJhcldpZHRoID0gMDtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTY3JvbGxiYXJXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHZhciBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ3NpbXBsZWJhci1oaWRlLXNjcm9sbGJhcicpO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGJveCk7XG4gICAgICAgIHZhciB3aWR0aCA9IGJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodDtcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChib3gpO1xuICAgICAgICBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IHdpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkU2Nyb2xsYmFyV2lkdGg7XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRXaW5kb3ckMShlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50IHx8XG4gICAgICAgICFlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHxcbiAgICAgICAgIWVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldykge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudERvY3VtZW50JDEoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudDtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbiB0byByZXRyaWV2ZSBvcHRpb25zIGZyb20gZWxlbWVudCBhdHRyaWJ1dGVzXG52YXIgZ2V0T3B0aW9ucyQxID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBpbml0aWFsT2JqID0ge307XG4gICAgdmFyIG9wdGlvbnMgPSBBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwob2JqLCBmdW5jdGlvbiAoYWNjLCBhdHRyaWJ1dGUpIHtcbiAgICAgICAgdmFyIG9wdGlvbiA9IGF0dHJpYnV0ZS5uYW1lLm1hdGNoKC9kYXRhLXNpbXBsZWJhci0oLispLyk7XG4gICAgICAgIGlmIChvcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBvcHRpb25bMV0ucmVwbGFjZSgvXFxXKyguKS9nLCBmdW5jdGlvbiAoXywgY2hyKSB7IHJldHVybiBjaHIudG9VcHBlckNhc2UoKTsgfSk7XG4gICAgICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RydWUnOlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBpbml0aWFsT2JqKTtcbiAgICByZXR1cm4gb3B0aW9ucztcbn07XG5mdW5jdGlvbiBhZGRDbGFzc2VzJDEoZWwsIGNsYXNzZXMpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCFlbClcbiAgICAgICAgcmV0dXJuO1xuICAgIChfYSA9IGVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCBjbGFzc2VzLnNwbGl0KCcgJykpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NlcyQxKGVsLCBjbGFzc2VzKSB7XG4gICAgaWYgKCFlbClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY2xhc3NOYW1lc1RvUXVlcnkkMShjbGFzc05hbWVzKSB7XG4gICAgcmV0dXJuIFwiLlwiLmNvbmNhdChjbGFzc05hbWVzLnNwbGl0KCcgJykuam9pbignLicpKTtcbn1cblxudmFyIGhlbHBlcnMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGdldEVsZW1lbnRXaW5kb3c6IGdldEVsZW1lbnRXaW5kb3ckMSxcbiAgICBnZXRFbGVtZW50RG9jdW1lbnQ6IGdldEVsZW1lbnREb2N1bWVudCQxLFxuICAgIGdldE9wdGlvbnM6IGdldE9wdGlvbnMkMSxcbiAgICBhZGRDbGFzc2VzOiBhZGRDbGFzc2VzJDEsXG4gICAgcmVtb3ZlQ2xhc3NlczogcmVtb3ZlQ2xhc3NlcyQxLFxuICAgIGNsYXNzTmFtZXNUb1F1ZXJ5OiBjbGFzc05hbWVzVG9RdWVyeSQxXG59KTtcblxudmFyIGdldEVsZW1lbnRXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93JDEsIGdldEVsZW1lbnREb2N1bWVudCA9IGdldEVsZW1lbnREb2N1bWVudCQxLCBnZXRPcHRpb25zID0gZ2V0T3B0aW9ucyQxLCBhZGRDbGFzc2VzID0gYWRkQ2xhc3NlcyQxLCByZW1vdmVDbGFzc2VzID0gcmVtb3ZlQ2xhc3NlcyQxLCBjbGFzc05hbWVzVG9RdWVyeSA9IGNsYXNzTmFtZXNUb1F1ZXJ5JDE7XG52YXIgU2ltcGxlQmFyQ29yZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaW1wbGVCYXJDb3JlKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgIHRoaXMubWluU2Nyb2xsYmFyV2lkdGggPSAyMDtcbiAgICAgICAgdGhpcy5zdG9wU2Nyb2xsRGVsYXkgPSAxNzU7XG4gICAgICAgIHRoaXMuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vdXNlRW50ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY3JvbGxYVGlja2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjcm9sbFlUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMud3JhcHBlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZW50RWwgPSBudWxsO1xuICAgICAgICB0aGlzLm9mZnNldEVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXNrRWwgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLnJ0bEhlbHBlcnMgPSBudWxsO1xuICAgICAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gMDtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZWxTdHlsZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmlzUnRsID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3VzZVggPSAwO1xuICAgICAgICB0aGlzLm1vdXNlWSA9IDA7XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHRoaXMub25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHRoaXMub25TdG9wU2Nyb2xsaW5nID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICB0aGlzLm9uTW91c2VFbnRlcmVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogT24gc2Nyb2xsIGV2ZW50IGhhbmRsaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uU2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyhfdGhpcy5lbCk7XG4gICAgICAgICAgICBpZiAoIV90aGlzLnNjcm9sbFhUaWNraW5nKSB7XG4gICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLnNjcm9sbFgpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbFhUaWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghX3RoaXMuc2Nyb2xsWVRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuc2Nyb2xsWSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWVRpY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1Njcm9sbGluZykge1xuICAgICAgICAgICAgICAgIF90aGlzLmlzU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLnNjcm9sbGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5zaG93U2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgICAgICBfdGhpcy5zaG93U2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICBfdGhpcy5vblN0b3BTY3JvbGxpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY3JvbGxYID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueC5pc092ZXJmbG93aW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNjcm9sbFhUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2Nyb2xsWSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZykge1xuICAgICAgICAgICAgICAgIF90aGlzLnBvc2l0aW9uU2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxZVGlja2luZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vblN0b3BTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLnNjcm9sbGluZyk7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlU2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uTW91c2VFbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNNb3VzZUVudGVyaW5nKSB7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NlcyhfdGhpcy5lbCwgX3RoaXMuY2xhc3NOYW1lcy5tb3VzZUVudGVyZWQpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93U2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNNb3VzZUVudGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLm9uTW91c2VFbnRlcmVkKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29uTW91c2VFbnRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhfdGhpcy5lbCwgX3RoaXMuY2xhc3NOYW1lcy5tb3VzZUVudGVyZWQpO1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuYXV0b0hpZGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlU2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVNjcm9sbGJhcigneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaXNNb3VzZUVudGVyaW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29uTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIF90aGlzLm1vdXNlWCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIF90aGlzLm1vdXNlWSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmVGb3JBeGlzKCd4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy55LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTW91c2VNb3ZlRm9yQXhpcygneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uTW91c2VMZWF2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLm9uTW91c2VNb3ZlLmNhbmNlbCgpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueC5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueC5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbk1vdXNlTGVhdmVGb3JBeGlzKCd4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy55LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTW91c2VMZWF2ZUZvckF4aXMoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLm1vdXNlWCA9IC0xO1xuICAgICAgICAgICAgX3RoaXMubW91c2VZID0gLTE7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29uV2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVjYWxjdWxhdGUgc2Nyb2xsYmFyV2lkdGggaW4gY2FzZSBpdCdzIGEgem9vbVxuICAgICAgICAgICAgX3RoaXMuc2Nyb2xsYmFyV2lkdGggPSBfdGhpcy5nZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICAgICAgX3RoaXMuaGlkZU5hdGl2ZVNjcm9sbGJhcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uUG9pbnRlckV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuYXhpcy54LnRyYWNrLmVsIHx8XG4gICAgICAgICAgICAgICAgIV90aGlzLmF4aXMueS50cmFjay5lbCB8fFxuICAgICAgICAgICAgICAgICFfdGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsIHx8XG4gICAgICAgICAgICAgICAgIV90aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGlzV2l0aGluVHJhY2tYQm91bmRzLCBpc1dpdGhpblRyYWNrWUJvdW5kcztcbiAgICAgICAgICAgIF90aGlzLmF4aXMueC50cmFjay5yZWN0ID0gX3RoaXMuYXhpcy54LnRyYWNrLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgX3RoaXMuYXhpcy55LnRyYWNrLnJlY3QgPSBfdGhpcy5heGlzLnkudHJhY2suZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlzV2l0aGluVHJhY2tYQm91bmRzID0gX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy54LnRyYWNrLnJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueS5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueS5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBpc1dpdGhpblRyYWNrWUJvdW5kcyA9IF90aGlzLmlzV2l0aGluQm91bmRzKF90aGlzLmF4aXMueS50cmFjay5yZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGFueSBwb2ludGVyIGV2ZW50IGlzIGNhbGxlZCBvbiB0aGUgc2Nyb2xsYmFyXG4gICAgICAgICAgICBpZiAoaXNXaXRoaW5UcmFja1hCb3VuZHMgfHwgaXNXaXRoaW5UcmFja1lCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGV2ZW50IGxlYWtpbmdcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdwb2ludGVyZG93bicgJiYgZS5wb2ludGVyVHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNXaXRoaW5UcmFja1hCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmF4aXMueC5zY3JvbGxiYXIucmVjdCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXhpcy54LnNjcm9sbGJhci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1dpdGhpbkJvdW5kcyhfdGhpcy5heGlzLnguc2Nyb2xsYmFyLnJlY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25EcmFnU3RhcnQoZSwgJ3gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uVHJhY2tDbGljayhlLCAneCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWUJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXhpcy55LnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzV2l0aGluQm91bmRzKF90aGlzLmF4aXMueS5zY3JvbGxiYXIucmVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkRyYWdTdGFydChlLCAneScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25UcmFja0NsaWNrKGUsICd5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmFnIHNjcm9sbGJhciBoYW5kbGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHJhZyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5kcmFnZ2VkQXhpcyB8fCAhX3RoaXMuY29udGVudFdyYXBwZXJFbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgZXZlbnRPZmZzZXQ7XG4gICAgICAgICAgICB2YXIgdHJhY2sgPSBfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS50cmFjaztcbiAgICAgICAgICAgIHZhciB0cmFja1NpemUgPSAoX2IgPSAoX2EgPSB0cmFjay5yZWN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICAgICAgdmFyIHNjcm9sbGJhciA9IF90aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgICAgIHZhciBjb250ZW50U2l6ZSA9IChfZCA9IChfYyA9IF90aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1tfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zY3JvbGxTaXplQXR0cl0pICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IDA7XG4gICAgICAgICAgICB2YXIgaG9zdFNpemUgPSBwYXJzZUludCgoX2YgPSAoX2UgPSBfdGhpcy5lbFN0eWxlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNpemVBdHRyXSkgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogJzBweCcsIDEwKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuZHJhZ2dlZEF4aXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgIGV2ZW50T2Zmc2V0ID0gZS5wYWdlWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50T2Zmc2V0ID0gZS5wYWdlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBob3cgZmFyIHRoZSB1c2VyJ3MgbW91c2UgaXMgZnJvbSB0aGUgdG9wL2xlZnQgb2YgdGhlIHNjcm9sbGJhciAobWludXMgdGhlIGRyYWdPZmZzZXQpLlxuICAgICAgICAgICAgdmFyIGRyYWdQb3MgPSBldmVudE9mZnNldCAtXG4gICAgICAgICAgICAgICAgKChfaCA9IChfZyA9IHRyYWNrLnJlY3QpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1tfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5vZmZzZXRBdHRyXSkgIT09IG51bGwgJiYgX2ggIT09IHZvaWQgMCA/IF9oIDogMCkgLVxuICAgICAgICAgICAgICAgIF90aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLmRyYWdPZmZzZXQ7XG4gICAgICAgICAgICBkcmFnUG9zID0gX3RoaXMuZHJhZ2dlZEF4aXMgPT09ICd4JyAmJiBfdGhpcy5pc1J0bFxuICAgICAgICAgICAgICAgID8gKChfayA9IChfaiA9IHRyYWNrLnJlY3QpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaltfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9rICE9PSB2b2lkIDAgPyBfayA6IDApIC1cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsYmFyLnNpemUgLVxuICAgICAgICAgICAgICAgICAgICBkcmFnUG9zXG4gICAgICAgICAgICAgICAgOiBkcmFnUG9zO1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gaW50byBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHNjcm9sbGJhciBoZWlnaHQvd2lkdGguXG4gICAgICAgICAgICB2YXIgZHJhZ1BlcmMgPSBkcmFnUG9zIC8gKHRyYWNrU2l6ZSAtIHNjcm9sbGJhci5zaXplKTtcbiAgICAgICAgICAgIC8vIFNjcm9sbCB0aGUgY29udGVudCBieSB0aGUgc2FtZSBwZXJjZW50YWdlLlxuICAgICAgICAgICAgdmFyIHNjcm9sbFBvcyA9IGRyYWdQZXJjICogKGNvbnRlbnRTaXplIC0gaG9zdFNpemUpO1xuICAgICAgICAgICAgLy8gRml4IGJyb3dzZXJzIGluY29uc2lzdGVuY3kgb24gUlRMXG4gICAgICAgICAgICBpZiAoX3RoaXMuZHJhZ2dlZEF4aXMgPT09ICd4JyAmJiBfdGhpcy5pc1J0bCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFBvcyA9ICgoX2wgPSBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMoKSkgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sLmlzU2Nyb2xsaW5nVG9OZWdhdGl2ZSlcbiAgICAgICAgICAgICAgICAgICAgPyAtc2Nyb2xsUG9zXG4gICAgICAgICAgICAgICAgICAgIDogc2Nyb2xsUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zY3JvbGxPZmZzZXRBdHRyXSA9XG4gICAgICAgICAgICAgICAgc2Nyb2xsUG9zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRW5kIHNjcm9sbCBoYW5kbGUgZHJhZ1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbkVuZERyYWcgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGVsRG9jdW1lbnQgPSBnZXRFbGVtZW50RG9jdW1lbnQoX3RoaXMuZWwpO1xuICAgICAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyhfdGhpcy5lbCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhfdGhpcy5lbCwgX3RoaXMuY2xhc3NOYW1lcy5kcmFnZ2luZyk7XG4gICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIF90aGlzLmRyYWcsIHRydWUpO1xuICAgICAgICAgICAgZWxEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgX3RoaXMub25FbmREcmFnLCB0cnVlKTtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID0gZWxXaW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZXNlIGFzeW5jaHJvbm91c2x5IHNvIHdlIHN0aWxsIHN1cHByZXNzIGNsaWNrIGV2ZW50c1xuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlZCBzaW11bHRhbmVvdXNseSB3aXRoIG1vdXNldXAuXG4gICAgICAgICAgICAgICAgZWxEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF90aGlzLnByZXZlbnRDbGljaywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZWxEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIF90aGlzLnByZXZlbnRDbGljaywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGVyIHRvIGlnbm9yZSBjbGljayBldmVudHMgZHVyaW5nIGRyYWdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucHJldmVudENsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZWwgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgU2ltcGxlQmFyQ29yZS5kZWZhdWx0T3B0aW9ucyksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgU2ltcGxlQmFyQ29yZS5kZWZhdWx0T3B0aW9ucy5jbGFzc05hbWVzKSwgb3B0aW9ucy5jbGFzc05hbWVzKTtcbiAgICAgICAgdGhpcy5heGlzID0ge1xuICAgICAgICAgICAgeDoge1xuICAgICAgICAgICAgICAgIHNjcm9sbE9mZnNldEF0dHI6ICdzY3JvbGxMZWZ0JyxcbiAgICAgICAgICAgICAgICBzaXplQXR0cjogJ3dpZHRoJyxcbiAgICAgICAgICAgICAgICBzY3JvbGxTaXplQXR0cjogJ3Njcm9sbFdpZHRoJyxcbiAgICAgICAgICAgICAgICBvZmZzZXRTaXplQXR0cjogJ29mZnNldFdpZHRoJyxcbiAgICAgICAgICAgICAgICBvZmZzZXRBdHRyOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dBdHRyOiAnb3ZlcmZsb3dYJyxcbiAgICAgICAgICAgICAgICBkcmFnT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGlzT3ZlcmZsb3dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cmFjazogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbGJhcjogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeToge1xuICAgICAgICAgICAgICAgIHNjcm9sbE9mZnNldEF0dHI6ICdzY3JvbGxUb3AnLFxuICAgICAgICAgICAgICAgIHNpemVBdHRyOiAnaGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBzY3JvbGxTaXplQXR0cjogJ3Njcm9sbEhlaWdodCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0U2l6ZUF0dHI6ICdvZmZzZXRIZWlnaHQnLFxuICAgICAgICAgICAgICAgIG9mZnNldEF0dHI6ICd0b3AnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93QXR0cjogJ292ZXJmbG93WScsXG4gICAgICAgICAgICAgICAgZHJhZ09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBpc092ZXJmbG93aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZvcmNlVmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJhY2s6IHsgc2l6ZTogbnVsbCwgZWw6IG51bGwsIHJlY3Q6IG51bGwsIGlzVmlzaWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGxiYXI6IHsgc2l6ZTogbnVsbCwgZWw6IG51bGwsIHJlY3Q6IG51bGwsIGlzVmlzaWJsZTogZmFsc2UgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZWwgIT09ICdvYmplY3QnIHx8ICF0aGlzLmVsLm5vZGVOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgdG8gU2ltcGxlQmFyIG11c3QgYmUgYW4gSFRNTCBlbGVtZW50IGluc3RlYWQgb2YgXCIuY29uY2F0KHRoaXMuZWwpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhyb3R0bGUodGhpcy5fb25Nb3VzZU1vdmUsIDY0KTtcbiAgICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZSA9IGRlYm91bmNlKHRoaXMuX29uV2luZG93UmVzaXplLCA2NCwgeyBsZWFkaW5nOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLm9uU3RvcFNjcm9sbGluZyA9IGRlYm91bmNlKHRoaXMuX29uU3RvcFNjcm9sbGluZywgdGhpcy5zdG9wU2Nyb2xsRGVsYXkpO1xuICAgICAgICB0aGlzLm9uTW91c2VFbnRlcmVkID0gZGVib3VuY2UodGhpcy5fb25Nb3VzZUVudGVyZWQsIHRoaXMuc3RvcFNjcm9sbERlbGF5KTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhlbHBlciB0byBmaXggYnJvd3NlcnMgaW5jb25zaXN0ZW5jeSBvbiBSVEw6XG4gICAgICogIC0gRmlyZWZveCBpbnZlcnRzIHRoZSBzY3JvbGxiYXIgaW5pdGlhbCBwb3NpdGlvblxuICAgICAqICAtIElFMTEgaW52ZXJ0cyBib3RoIHNjcm9sbGJhciBwb3NpdGlvbiBhbmQgc2Nyb2xsaW5nIG9mZnNldFxuICAgICAqIERpcmVjdGx5IGluc3BpcmVkIGJ5IEBLaW5nU29yYSdzIE92ZXJsYXlTY3JvbGxiYXJzIGh0dHBzOi8vZ2l0aHViLmNvbS9LaW5nU29yYS9PdmVybGF5U2Nyb2xsYmFycy9ibG9iL21hc3Rlci9qcy9PdmVybGF5U2Nyb2xsYmFycy5qcyNMMTYzNFxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKFNpbXBsZUJhckNvcmUucnRsSGVscGVycykge1xuICAgICAgICAgICAgcmV0dXJuIFNpbXBsZUJhckNvcmUucnRsSGVscGVycztcbiAgICAgICAgfVxuICAgICAgICB2YXIgZHVtbXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZHVtbXlEaXYuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplXCI+PGRpdj48L2Rpdj48L2Rpdj4nO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyRHVtbXlFbCA9IGR1bW15RGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICB2YXIgZHVtbXlDaGlsZCA9IHNjcm9sbGJhckR1bW15RWwgPT09IG51bGwgfHwgc2Nyb2xsYmFyRHVtbXlFbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Nyb2xsYmFyRHVtbXlFbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgaWYgKCFkdW1teUNoaWxkKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsYmFyRHVtbXlFbCk7XG4gICAgICAgIHNjcm9sbGJhckR1bW15RWwuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgIHZhciBkdW1teUNvbnRhaW5lck9mZnNldCA9IFNpbXBsZUJhckNvcmUuZ2V0T2Zmc2V0KHNjcm9sbGJhckR1bW15RWwpO1xuICAgICAgICB2YXIgZHVtbXlDaGlsZE9mZnNldCA9IFNpbXBsZUJhckNvcmUuZ2V0T2Zmc2V0KGR1bW15Q2hpbGQpO1xuICAgICAgICBzY3JvbGxiYXJEdW1teUVsLnNjcm9sbExlZnQgPSAtOTk5O1xuICAgICAgICB2YXIgZHVtbXlDaGlsZE9mZnNldEFmdGVyU2Nyb2xsID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoZHVtbXlDaGlsZCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsYmFyRHVtbXlFbCk7XG4gICAgICAgIFNpbXBsZUJhckNvcmUucnRsSGVscGVycyA9IHtcbiAgICAgICAgICAgIC8vIGRldGVybWluZXMgaWYgdGhlIHNjcm9sbGluZyBpcyByZXNwb25kaW5nIHdpdGggbmVnYXRpdmUgdmFsdWVzXG4gICAgICAgICAgICBpc1Njcm9sbE9yaWdpbkF0WmVybzogZHVtbXlDb250YWluZXJPZmZzZXQubGVmdCAhPT0gZHVtbXlDaGlsZE9mZnNldC5sZWZ0LFxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lcyBpZiB0aGUgb3JpZ2luIHNjcm9sbGJhciBwb3NpdGlvbiBpcyBpbnZlcnRlZCBvciBub3QgKHBvc2l0aW9uZWQgb24gbGVmdCBvciByaWdodClcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nVG9OZWdhdGl2ZTogZHVtbXlDaGlsZE9mZnNldC5sZWZ0ICE9PSBkdW1teUNoaWxkT2Zmc2V0QWZ0ZXJTY3JvbGwubGVmdFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuZ2V0U2Nyb2xsYmFyV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFRyeS9jYXRjaCBmb3IgRkYgNTYgdGhyb3dpbmcgb24gdW5kZWZpbmVkIGNvbXB1dGVkU3R5bGVzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBEZXRlY3QgYnJvd3NlcnMgc3VwcG9ydGluZyBDU1Mgc2Nyb2xsYmFyIHN0eWxpbmcgYW5kIGRvIG5vdCBjYWxjdWxhdGVcbiAgICAgICAgICAgIGlmICgodGhpcy5jb250ZW50V3JhcHBlckVsICYmXG4gICAgICAgICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRlbnRXcmFwcGVyRWwsICc6Oi13ZWJraXQtc2Nyb2xsYmFyJylcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BsYXkgPT09ICdub25lJykgfHxcbiAgICAgICAgICAgICAgICAnc2Nyb2xsYmFyV2lkdGgnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSB8fFxuICAgICAgICAgICAgICAgICctbXMtb3ZlcmZsb3ctc3R5bGUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLmdldE9mZnNldCA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgZWxEb2N1bWVudCA9IGdldEVsZW1lbnREb2N1bWVudChlbCk7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3coZWwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArXG4gICAgICAgICAgICAgICAgKGVsV2luZG93LnBhZ2VZT2Zmc2V0IHx8IGVsRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCksXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgK1xuICAgICAgICAgICAgICAgIChlbFdpbmRvdy5wYWdlWE9mZnNldCB8fCBlbERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KVxuICAgICAgICB9O1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gV2Ugc3RvcCBoZXJlIG9uIHNlcnZlci1zaWRlXG4gICAgICAgIGlmIChjYW5Vc2VET00pIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERPTSgpO1xuICAgICAgICAgICAgdGhpcy5ydGxIZWxwZXJzID0gU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5nZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIC8vIGFzc3VtZSB0aGF0IGVsZW1lbnQgaGFzIGhpcyBET00gYWxyZWFkeSBpbml0aWF0ZWRcbiAgICAgICAgdGhpcy53cmFwcGVyRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLndyYXBwZXIpKTtcbiAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zY3JvbGxhYmxlTm9kZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuY29udGVudFdyYXBwZXIpKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNvbnRlbnROb2RlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5jb250ZW50RWwpKTtcbiAgICAgICAgdGhpcy5vZmZzZXRFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMub2Zmc2V0KSk7XG4gICAgICAgIHRoaXMubWFza0VsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5tYXNrKSk7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IHRoaXMuZmluZENoaWxkKHRoaXMud3JhcHBlckVsLCBjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMucGxhY2Vob2xkZXIpKTtcbiAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCkpO1xuICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCkpO1xuICAgICAgICB0aGlzLmF4aXMueC50cmFjay5lbCA9IHRoaXMuZmluZENoaWxkKHRoaXMuZWwsIFwiXCIuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy50cmFjaykpLmNvbmNhdChjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuaG9yaXpvbnRhbCkpKTtcbiAgICAgICAgdGhpcy5heGlzLnkudHJhY2suZWwgPSB0aGlzLmZpbmRDaGlsZCh0aGlzLmVsLCBcIlwiLmNvbmNhdChjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMudHJhY2spKS5jb25jYXQoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnZlcnRpY2FsKSkpO1xuICAgICAgICB0aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwgPVxuICAgICAgICAgICAgKChfYSA9IHRoaXMuYXhpcy54LnRyYWNrLmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuc2Nyb2xsYmFyKSkpIHx8IG51bGw7XG4gICAgICAgIHRoaXMuYXhpcy55LnNjcm9sbGJhci5lbCA9XG4gICAgICAgICAgICAoKF9iID0gdGhpcy5heGlzLnkudHJhY2suZWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxiYXIpKSkgfHwgbnVsbDtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXV0b0hpZGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpcy55LnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLnZpc2libGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pbml0TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uTW91c2VFbnRlcik7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLm9uUG9pbnRlckV2ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbk1vdXNlTGVhdmUpO1xuICAgICAgICAoX2EgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgICAgLy8gQnJvd3NlciB6b29tIHRyaWdnZXJzIGEgd2luZG93IHJlc2l6ZVxuICAgICAgICBlbFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplKTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHdpbmRvdy5SZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgICAgLy8gSGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvUmVzaXplT2JzZXJ2ZXIvaXNzdWVzLzM4XG4gICAgICAgICAgICB2YXIgcmVzaXplT2JzZXJ2ZXJTdGFydGVkXzEgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciByZXNpemVPYnNlcnZlciA9IGVsV2luZG93LlJlc2l6ZU9ic2VydmVyIHx8IFJlc2l6ZU9ic2VydmVyO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyByZXNpemVPYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNpemVPYnNlcnZlclN0YXJ0ZWRfMSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc2l6ZU9ic2VydmVyU3RhcnRlZF8xID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgcmVxdWlyZWQgdG8gZGV0ZWN0IGhvcml6b250YWwgc2Nyb2xsLiBWZXJ0aWNhbCBzY3JvbGwgb25seSBuZWVkcyB0aGUgcmVzaXplT2JzZXJ2ZXIuXG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG5ldyBlbFdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5jb250ZW50RWwsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUucmVjYWxjdWxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCB8fFxuICAgICAgICAgICAgIXRoaXMuY29udGVudEVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50V3JhcHBlckVsIHx8XG4gICAgICAgICAgICAhdGhpcy53cmFwcGVyRWwgfHxcbiAgICAgICAgICAgICF0aGlzLnBsYWNlaG9sZGVyRWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIHRoaXMuZWxTdHlsZXMgPSBlbFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpO1xuICAgICAgICB0aGlzLmlzUnRsID0gdGhpcy5lbFN0eWxlcy5kaXJlY3Rpb24gPT09ICdydGwnO1xuICAgICAgICB2YXIgY29udGVudEVsT2Zmc2V0V2lkdGggPSB0aGlzLmNvbnRlbnRFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgdmFyIGlzSGVpZ2h0QXV0byA9IHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwub2Zmc2V0SGVpZ2h0IDw9IDE7XG4gICAgICAgIHZhciBpc1dpZHRoQXV0byA9IHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwub2Zmc2V0V2lkdGggPD0gMSB8fCBjb250ZW50RWxPZmZzZXRXaWR0aCA+IDA7XG4gICAgICAgIHZhciBjb250ZW50V3JhcHBlckVsT2Zmc2V0V2lkdGggPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIHZhciBlbE92ZXJmbG93WCA9IHRoaXMuZWxTdHlsZXMub3ZlcmZsb3dYO1xuICAgICAgICB2YXIgZWxPdmVyZmxvd1kgPSB0aGlzLmVsU3R5bGVzLm92ZXJmbG93WTtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuc3R5bGUucGFkZGluZyA9IFwiXCIuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1RvcCwgXCIgXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdSaWdodCwgXCIgXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdCb3R0b20sIFwiIFwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nTGVmdCk7XG4gICAgICAgIHRoaXMud3JhcHBlckVsLnN0eWxlLm1hcmdpbiA9IFwiLVwiLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdUb3AsIFwiIC1cIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1JpZ2h0LCBcIiAtXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdCb3R0b20sIFwiIC1cIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0xlZnQpO1xuICAgICAgICB2YXIgY29udGVudEVsU2Nyb2xsSGVpZ2h0ID0gdGhpcy5jb250ZW50RWwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB2YXIgY29udGVudEVsU2Nyb2xsV2lkdGggPSB0aGlzLmNvbnRlbnRFbC5zY3JvbGxXaWR0aDtcbiAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlLmhlaWdodCA9IGlzSGVpZ2h0QXV0byA/ICdhdXRvJyA6ICcxMDAlJztcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHBsYWNlaG9sZGVyIHNpemVcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsLnN0eWxlLndpZHRoID0gaXNXaWR0aEF1dG9cbiAgICAgICAgICAgID8gXCJcIi5jb25jYXQoY29udGVudEVsT2Zmc2V0V2lkdGggfHwgY29udGVudEVsU2Nyb2xsV2lkdGgsIFwicHhcIilcbiAgICAgICAgICAgIDogJ2F1dG8nO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwuc3R5bGUuaGVpZ2h0ID0gXCJcIi5jb25jYXQoY29udGVudEVsU2Nyb2xsSGVpZ2h0LCBcInB4XCIpO1xuICAgICAgICB2YXIgY29udGVudFdyYXBwZXJFbE9mZnNldEhlaWdodCA9IHRoaXMuY29udGVudFdyYXBwZXJFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgPVxuICAgICAgICAgICAgY29udGVudEVsT2Zmc2V0V2lkdGggIT09IDAgJiYgY29udGVudEVsU2Nyb2xsV2lkdGggPiBjb250ZW50RWxPZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBjb250ZW50RWxTY3JvbGxIZWlnaHQgPiBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0O1xuICAgICAgICAvLyBTZXQgaXNPdmVyZmxvd2luZyB0byBmYWxzZSBpZiB1c2VyIGV4cGxpY2l0ZWx5IHNldCBoaWRkZW4gb3ZlcmZsb3dcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBlbE92ZXJmbG93WCA9PT0gJ2hpZGRlbicgPyBmYWxzZSA6IHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmc7XG4gICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgPVxuICAgICAgICAgICAgZWxPdmVyZmxvd1kgPT09ICdoaWRkZW4nID8gZmFsc2UgOiB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nO1xuICAgICAgICB0aGlzLmF4aXMueC5mb3JjZVZpc2libGUgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvcmNlVmlzaWJsZSA9PT0gJ3gnIHx8IHRoaXMub3B0aW9ucy5mb3JjZVZpc2libGUgPT09IHRydWU7XG4gICAgICAgIHRoaXMuYXhpcy55LmZvcmNlVmlzaWJsZSA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSAneScgfHwgdGhpcy5vcHRpb25zLmZvcmNlVmlzaWJsZSA9PT0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oaWRlTmF0aXZlU2Nyb2xsYmFyKCk7XG4gICAgICAgIC8vIFNldCBpc092ZXJmbG93aW5nIHRvIGZhbHNlIGlmIHNjcm9sbGJhciBpcyBub3QgbmVjZXNzYXJ5IChjb250ZW50IGlzIHNob3J0ZXIgdGhhbiBvZmZzZXQpXG4gICAgICAgIHZhciBvZmZzZXRGb3JYU2Nyb2xsYmFyID0gdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZ1xuICAgICAgICAgICAgPyB0aGlzLnNjcm9sbGJhcldpZHRoXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIHZhciBvZmZzZXRGb3JZU2Nyb2xsYmFyID0gdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZ1xuICAgICAgICAgICAgPyB0aGlzLnNjcm9sbGJhcldpZHRoXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgPVxuICAgICAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyAmJlxuICAgICAgICAgICAgICAgIGNvbnRlbnRFbFNjcm9sbFdpZHRoID4gY29udGVudFdyYXBwZXJFbE9mZnNldFdpZHRoIC0gb2Zmc2V0Rm9yWVNjcm9sbGJhcjtcbiAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nICYmXG4gICAgICAgICAgICAgICAgY29udGVudEVsU2Nyb2xsSGVpZ2h0ID5cbiAgICAgICAgICAgICAgICAgICAgY29udGVudFdyYXBwZXJFbE9mZnNldEhlaWdodCAtIG9mZnNldEZvclhTY3JvbGxiYXI7XG4gICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5zaXplID0gdGhpcy5nZXRTY3JvbGxiYXJTaXplKCd4Jyk7XG4gICAgICAgIHRoaXMuYXhpcy55LnNjcm9sbGJhci5zaXplID0gdGhpcy5nZXRTY3JvbGxiYXJTaXplKCd5Jyk7XG4gICAgICAgIGlmICh0aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwpXG4gICAgICAgICAgICB0aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdCh0aGlzLmF4aXMueC5zY3JvbGxiYXIuc2l6ZSwgXCJweFwiKTtcbiAgICAgICAgaWYgKHRoaXMuYXhpcy55LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgIHRoaXMuYXhpcy55LnNjcm9sbGJhci5lbC5zdHlsZS5oZWlnaHQgPSBcIlwiLmNvbmNhdCh0aGlzLmF4aXMueS5zY3JvbGxiYXIuc2l6ZSwgXCJweFwiKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblNjcm9sbGJhcigneCcpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uU2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgIHRoaXMudG9nZ2xlVHJhY2tWaXNpYmlsaXR5KCd4Jyk7XG4gICAgICAgIHRoaXMudG9nZ2xlVHJhY2tWaXNpYmlsaXR5KCd5Jyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgc2Nyb2xsYmFyIHNpemVcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRTY3JvbGxiYXJTaXplID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICghdGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcgfHwgIXRoaXMuY29udGVudEVsKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnRFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsU2l6ZUF0dHJdO1xuICAgICAgICB2YXIgdHJhY2tTaXplID0gKF9iID0gKF9hID0gdGhpcy5heGlzW2F4aXNdLnRyYWNrLmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGhpcy5heGlzW2F4aXNdLm9mZnNldFNpemVBdHRyXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMDtcbiAgICAgICAgdmFyIHNjcm9sbGJhclJhdGlvID0gdHJhY2tTaXplIC8gY29udGVudFNpemU7XG4gICAgICAgIHZhciBzY3JvbGxiYXJTaXplO1xuICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IGhlaWdodC9wb3NpdGlvbiBvZiBkcmFnIGhhbmRsZS5cbiAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IE1hdGgubWF4KH5+KHNjcm9sbGJhclJhdGlvICogdHJhY2tTaXplKSwgdGhpcy5vcHRpb25zLnNjcm9sbGJhck1pblNpemUpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNjcm9sbGJhck1heFNpemUpIHtcbiAgICAgICAgICAgIHNjcm9sbGJhclNpemUgPSBNYXRoLm1pbihzY3JvbGxiYXJTaXplLCB0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWF4U2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNjcm9sbGJhclNpemU7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5wb3NpdGlvblNjcm9sbGJhciA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIHNjcm9sbGJhciA9IHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXI7XG4gICAgICAgIGlmICghdGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcgfHxcbiAgICAgICAgICAgICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwgfHxcbiAgICAgICAgICAgICFzY3JvbGxiYXIuZWwgfHxcbiAgICAgICAgICAgICF0aGlzLmVsU3R5bGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRlbnRTaXplID0gdGhpcy5jb250ZW50V3JhcHBlckVsW3RoaXMuYXhpc1theGlzXS5zY3JvbGxTaXplQXR0cl07XG4gICAgICAgIHZhciB0cmFja1NpemUgPSAoKF9hID0gdGhpcy5heGlzW2F4aXNdLnRyYWNrLmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGhpcy5heGlzW2F4aXNdLm9mZnNldFNpemVBdHRyXSkgfHwgMDtcbiAgICAgICAgdmFyIGhvc3RTaXplID0gcGFyc2VJbnQodGhpcy5lbFN0eWxlc1t0aGlzLmF4aXNbYXhpc10uc2l6ZUF0dHJdLCAxMCk7XG4gICAgICAgIHZhciBzY3JvbGxPZmZzZXQgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWxbdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdO1xuICAgICAgICBzY3JvbGxPZmZzZXQgPVxuICAgICAgICAgICAgYXhpcyA9PT0gJ3gnICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc1J0bCAmJlxuICAgICAgICAgICAgICAgICgoX2IgPSBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmlzU2Nyb2xsT3JpZ2luQXRaZXJvKVxuICAgICAgICAgICAgICAgID8gLXNjcm9sbE9mZnNldFxuICAgICAgICAgICAgICAgIDogc2Nyb2xsT2Zmc2V0O1xuICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnICYmIHRoaXMuaXNSdGwpIHtcbiAgICAgICAgICAgIHNjcm9sbE9mZnNldCA9ICgoX2MgPSBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMoKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmlzU2Nyb2xsaW5nVG9OZWdhdGl2ZSlcbiAgICAgICAgICAgICAgICA/IHNjcm9sbE9mZnNldFxuICAgICAgICAgICAgICAgIDogLXNjcm9sbE9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2Nyb2xsUG91cmNlbnQgPSBzY3JvbGxPZmZzZXQgLyAoY29udGVudFNpemUgLSBob3N0U2l6ZSk7XG4gICAgICAgIHZhciBoYW5kbGVPZmZzZXQgPSB+figodHJhY2tTaXplIC0gc2Nyb2xsYmFyLnNpemUpICogc2Nyb2xsUG91cmNlbnQpO1xuICAgICAgICBoYW5kbGVPZmZzZXQgPVxuICAgICAgICAgICAgYXhpcyA9PT0gJ3gnICYmIHRoaXMuaXNSdGxcbiAgICAgICAgICAgICAgICA/IC1oYW5kbGVPZmZzZXQgKyAodHJhY2tTaXplIC0gc2Nyb2xsYmFyLnNpemUpXG4gICAgICAgICAgICAgICAgOiBoYW5kbGVPZmZzZXQ7XG4gICAgICAgIHNjcm9sbGJhci5lbC5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgYXhpcyA9PT0gJ3gnXG4gICAgICAgICAgICAgICAgPyBcInRyYW5zbGF0ZTNkKFwiLmNvbmNhdChoYW5kbGVPZmZzZXQsIFwicHgsIDAsIDApXCIpXG4gICAgICAgICAgICAgICAgOiBcInRyYW5zbGF0ZTNkKDAsIFwiLmNvbmNhdChoYW5kbGVPZmZzZXQsIFwicHgsIDApXCIpO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudG9nZ2xlVHJhY2tWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciB0cmFjayA9IHRoaXMuYXhpc1theGlzXS50cmFjay5lbDtcbiAgICAgICAgdmFyIHNjcm9sbGJhciA9IHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuZWw7XG4gICAgICAgIGlmICghdHJhY2sgfHwgIXNjcm9sbGJhciB8fCAhdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzW2F4aXNdLmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgdHJhY2suc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbC5zdHlsZVt0aGlzLmF4aXNbYXhpc10ub3ZlcmZsb3dBdHRyXSA9ICdzY3JvbGwnO1xuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKFwiXCIuY29uY2F0KHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxhYmxlLCBcIi1cIikuY29uY2F0KGF4aXMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYWNrLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbC5zdHlsZVt0aGlzLmF4aXNbYXhpc10ub3ZlcmZsb3dBdHRyXSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiXCIuY29uY2F0KHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxhYmxlLCBcIi1cIikuY29uY2F0KGF4aXMpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFdmVuIGlmIGZvcmNlVmlzaWJsZSBpcyBlbmFibGVkLCBzY3JvbGxiYXIgaXRzZWxmIHNob3VsZCBiZSBoaWRkZW5cbiAgICAgICAgaWYgKHRoaXMuYXhpc1theGlzXS5pc092ZXJmbG93aW5nKSB7XG4gICAgICAgICAgICBzY3JvbGxiYXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGxiYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuc2hvd1Njcm9sbGJhciA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICBpZiAodGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcgJiYgIXRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy52aXNpYmxlKTtcbiAgICAgICAgICAgIHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaGlkZVNjcm9sbGJhciA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICBpZiAodGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcgJiYgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXModGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLnZpc2libGUpO1xuICAgICAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaGlkZU5hdGl2ZVNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9mZnNldEVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLm9mZnNldEVsLnN0eWxlW3RoaXMuaXNSdGwgPyAnbGVmdCcgOiAncmlnaHQnXSA9XG4gICAgICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nIHx8IHRoaXMuYXhpcy55LmZvcmNlVmlzaWJsZVxuICAgICAgICAgICAgICAgID8gXCItXCIuY29uY2F0KHRoaXMuc2Nyb2xsYmFyV2lkdGgsIFwicHhcIilcbiAgICAgICAgICAgICAgICA6ICcwcHgnO1xuICAgICAgICB0aGlzLm9mZnNldEVsLnN0eWxlLmJvdHRvbSA9XG4gICAgICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nIHx8IHRoaXMuYXhpcy54LmZvcmNlVmlzaWJsZVxuICAgICAgICAgICAgICAgID8gXCItXCIuY29uY2F0KHRoaXMuc2Nyb2xsYmFyV2lkdGgsIFwicHhcIilcbiAgICAgICAgICAgICAgICA6ICcwcHgnO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUub25Nb3VzZU1vdmVGb3JBeGlzID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBjdXJyZW50QXhpcyA9IHRoaXMuYXhpc1theGlzXTtcbiAgICAgICAgaWYgKCFjdXJyZW50QXhpcy50cmFjay5lbCB8fCAhY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjdXJyZW50QXhpcy50cmFjay5yZWN0ID0gY3VycmVudEF4aXMudHJhY2suZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGN1cnJlbnRBeGlzLnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgIGN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNXaXRoaW5Cb3VuZHMoY3VycmVudEF4aXMudHJhY2sucmVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Njcm9sbGJhcihheGlzKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXMoY3VycmVudEF4aXMudHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1dpdGhpbkJvdW5kcyhjdXJyZW50QXhpcy5zY3JvbGxiYXIucmVjdCkpIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzKGN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhjdXJyZW50QXhpcy50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0hpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVTY3JvbGxiYXIoYXhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLm9uTW91c2VMZWF2ZUZvckF4aXMgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10udHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgIHJlbW92ZUNsYXNzZXModGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlU2Nyb2xsYmFyKGF4aXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBvbiBzY3JvbGxiYXIgaGFuZGxlIGRyYWcgbW92ZW1lbnQgc3RhcnRzXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUub25EcmFnU3RhcnQgPSBmdW5jdGlvbiAoZSwgYXhpcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgZWxEb2N1bWVudCA9IGdldEVsZW1lbnREb2N1bWVudCh0aGlzLmVsKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdmFyIHNjcm9sbGJhciA9IHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXI7XG4gICAgICAgIC8vIE1lYXN1cmUgaG93IGZhciB0aGUgdXNlcidzIG1vdXNlIGlzIGZyb20gdGhlIHRvcCBvZiB0aGUgc2Nyb2xsYmFyIGRyYWcgaGFuZGxlLlxuICAgICAgICB2YXIgZXZlbnRPZmZzZXQgPSBheGlzID09PSAneScgPyBlLnBhZ2VZIDogZS5wYWdlWDtcbiAgICAgICAgdGhpcy5heGlzW2F4aXNdLmRyYWdPZmZzZXQgPVxuICAgICAgICAgICAgZXZlbnRPZmZzZXQgLSAoKChfYSA9IHNjcm9sbGJhci5yZWN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGhpcy5heGlzW2F4aXNdLm9mZnNldEF0dHJdKSB8fCAwKTtcbiAgICAgICAgdGhpcy5kcmFnZ2VkQXhpcyA9IGF4aXM7XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5lbCwgdGhpcy5jbGFzc05hbWVzLmRyYWdnaW5nKTtcbiAgICAgICAgZWxEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRyYWcsIHRydWUpO1xuICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRW5kRHJhZywgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID09PSBudWxsKSB7XG4gICAgICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcmV2ZW50Q2xpY2ssIHRydWUpO1xuICAgICAgICAgICAgZWxEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsV2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vblRyYWNrQ2xpY2sgPSBmdW5jdGlvbiAoZSwgYXhpcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgY3VycmVudEF4aXMgPSB0aGlzLmF4aXNbYXhpc107XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmNsaWNrT25UcmFjayB8fFxuICAgICAgICAgICAgIWN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbCB8fFxuICAgICAgICAgICAgIXRoaXMuY29udGVudFdyYXBwZXJFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gUHJldmVudGluZyB0aGUgZXZlbnQncyBkZWZhdWx0IHRvIHRyaWdnZXIgY2xpY2sgdW5kZXJuZWF0aFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIucmVjdCA9XG4gICAgICAgICAgICBjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBzY3JvbGxiYXIgPSB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyT2Zmc2V0ID0gKF9iID0gKF9hID0gc2Nyb2xsYmFyLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0QXR0cl0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDA7XG4gICAgICAgIHZhciBob3N0U2l6ZSA9IHBhcnNlSW50KChfZCA9IChfYyA9IHRoaXMuZWxTdHlsZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1t0aGlzLmF4aXNbYXhpc10uc2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnMHB4JywgMTApO1xuICAgICAgICB2YXIgc2Nyb2xsZWQgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWxbdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdO1xuICAgICAgICB2YXIgdCA9IGF4aXMgPT09ICd5J1xuICAgICAgICAgICAgPyB0aGlzLm1vdXNlWSAtIHNjcm9sbGJhck9mZnNldFxuICAgICAgICAgICAgOiB0aGlzLm1vdXNlWCAtIHNjcm9sbGJhck9mZnNldDtcbiAgICAgICAgdmFyIGRpciA9IHQgPCAwID8gLTEgOiAxO1xuICAgICAgICB2YXIgc2Nyb2xsU2l6ZSA9IGRpciA9PT0gLTEgPyBzY3JvbGxlZCAtIGhvc3RTaXplIDogc2Nyb2xsZWQgKyBob3N0U2l6ZTtcbiAgICAgICAgdmFyIHNwZWVkID0gNDA7XG4gICAgICAgIHZhciBzY3JvbGxUbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMuY29udGVudFdyYXBwZXJFbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoZGlyID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+IHNjcm9sbFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWQgLT0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvbnRlbnRXcmFwcGVyRWxbX3RoaXMuYXhpc1theGlzXS5zY3JvbGxPZmZzZXRBdHRyXSA9IHNjcm9sbGVkO1xuICAgICAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsVG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxlZCA8IHNjcm9sbFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWQgKz0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvbnRlbnRXcmFwcGVyRWxbX3RoaXMuYXhpc1theGlzXS5zY3JvbGxPZmZzZXRBdHRyXSA9IHNjcm9sbGVkO1xuICAgICAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsVG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2Nyb2xsVG8oKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHRlciBmb3IgY29udGVudCBlbGVtZW50XG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuZ2V0Q29udGVudEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHRlciBmb3Igb3JpZ2luYWwgc2Nyb2xsaW5nIGVsZW1lbnRcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRTY3JvbGxFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50V3JhcHBlckVsO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vbk1vdXNlRW50ZXIpO1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5vblBvaW50ZXJFdmVudCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub25Nb3VzZUxlYXZlKTtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudFdyYXBwZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsV2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5jZWwgYWxsIGRlYm91bmNlZCBmdW5jdGlvbnNcbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZS5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZS5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5vblN0b3BTY3JvbGxpbmcuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQuY2FuY2VsKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBmcm9tIERPTSBub2Rlc1xuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnVuTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBtb3VzZSBpcyB3aXRoaW4gYm91bmRzXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaXNXaXRoaW5Cb3VuZHMgPSBmdW5jdGlvbiAoYmJveCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubW91c2VYID49IGJib3gubGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5tb3VzZVggPD0gYmJveC5sZWZ0ICsgYmJveC53aWR0aCAmJlxuICAgICAgICAgICAgdGhpcy5tb3VzZVkgPj0gYmJveC50b3AgJiZcbiAgICAgICAgICAgIHRoaXMubW91c2VZIDw9IGJib3gudG9wICsgYmJveC5oZWlnaHQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmluZCBlbGVtZW50IGNoaWxkcmVuIG1hdGNoZXMgcXVlcnlcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5maW5kQ2hpbGQgPSBmdW5jdGlvbiAoZWwsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gZWwubWF0Y2hlcyB8fFxuICAgICAgICAgICAgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzLmNhbGwoY2hpbGQsIHF1ZXJ5KTtcbiAgICAgICAgfSlbMF07XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnMgPSBudWxsO1xuICAgIFNpbXBsZUJhckNvcmUuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIGZvcmNlVmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGNsaWNrT25UcmFjazogdHJ1ZSxcbiAgICAgICAgc2Nyb2xsYmFyTWluU2l6ZTogMjUsXG4gICAgICAgIHNjcm9sbGJhck1heFNpemU6IDAsXG4gICAgICAgIGFyaWFMYWJlbDogJ3Njcm9sbGFibGUgY29udGVudCcsXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcbiAgICAgICAgICAgIGNvbnRlbnRFbDogJ3NpbXBsZWJhci1jb250ZW50JyxcbiAgICAgICAgICAgIGNvbnRlbnRXcmFwcGVyOiAnc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlcicsXG4gICAgICAgICAgICBvZmZzZXQ6ICdzaW1wbGViYXItb2Zmc2V0JyxcbiAgICAgICAgICAgIG1hc2s6ICdzaW1wbGViYXItbWFzaycsXG4gICAgICAgICAgICB3cmFwcGVyOiAnc2ltcGxlYmFyLXdyYXBwZXInLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdzaW1wbGViYXItcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgc2Nyb2xsYmFyOiAnc2ltcGxlYmFyLXNjcm9sbGJhcicsXG4gICAgICAgICAgICB0cmFjazogJ3NpbXBsZWJhci10cmFjaycsXG4gICAgICAgICAgICBoZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWw6ICdzaW1wbGViYXItaGVpZ2h0LWF1dG8tb2JzZXJ2ZXItd3JhcHBlcicsXG4gICAgICAgICAgICBoZWlnaHRBdXRvT2JzZXJ2ZXJFbDogJ3NpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlcicsXG4gICAgICAgICAgICB2aXNpYmxlOiAnc2ltcGxlYmFyLXZpc2libGUnLFxuICAgICAgICAgICAgaG9yaXpvbnRhbDogJ3NpbXBsZWJhci1ob3Jpem9udGFsJyxcbiAgICAgICAgICAgIHZlcnRpY2FsOiAnc2ltcGxlYmFyLXZlcnRpY2FsJyxcbiAgICAgICAgICAgIGhvdmVyOiAnc2ltcGxlYmFyLWhvdmVyJyxcbiAgICAgICAgICAgIGRyYWdnaW5nOiAnc2ltcGxlYmFyLWRyYWdnaW5nJyxcbiAgICAgICAgICAgIHNjcm9sbGluZzogJ3NpbXBsZWJhci1zY3JvbGxpbmcnLFxuICAgICAgICAgICAgc2Nyb2xsYWJsZTogJ3NpbXBsZWJhci1zY3JvbGxhYmxlJyxcbiAgICAgICAgICAgIG1vdXNlRW50ZXJlZDogJ3NpbXBsZWJhci1tb3VzZS1lbnRlcmVkJ1xuICAgICAgICB9LFxuICAgICAgICBzY3JvbGxhYmxlTm9kZTogbnVsbCxcbiAgICAgICAgY29udGVudE5vZGU6IG51bGwsXG4gICAgICAgIGF1dG9IaWRlOiB0cnVlXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTdGF0aWMgZnVuY3Rpb25zXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5nZXRPcHRpb25zID0gZ2V0T3B0aW9ucztcbiAgICBTaW1wbGVCYXJDb3JlLmhlbHBlcnMgPSBoZWxwZXJzO1xuICAgIHJldHVybiBTaW1wbGVCYXJDb3JlO1xufSgpKTtcblxuZXhwb3J0IHsgU2ltcGxlQmFyQ29yZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvKipcbiAqIHNpbXBsZWJhciAtIHY2LjIuNVxuICogU2Nyb2xsYmFycywgc2ltcGxlci5cbiAqIGh0dHBzOi8vZ3JzbXRvLmdpdGh1Yi5pby9zaW1wbGViYXIvXG4gKlxuICogTWFkZSBieSBBZHJpZW4gRGVuYXQgZnJvbSBhIGZvcmsgYnkgSm9uYXRoYW4gTmljb2xcbiAqIFVuZGVyIE1JVCBMaWNlbnNlXG4gKi9cblxuaW1wb3J0IGNhblVzZURPTSBmcm9tICdjYW4tdXNlLWRvbSc7XG5pbXBvcnQgU2ltcGxlQmFyQ29yZSBmcm9tICdzaW1wbGViYXItY29yZSc7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxuXG52YXIgX2EgPSBTaW1wbGVCYXJDb3JlLmhlbHBlcnMsIGdldE9wdGlvbnMgPSBfYS5nZXRPcHRpb25zLCBhZGRDbGFzc2VzID0gX2EuYWRkQ2xhc3NlcztcbnZhciBTaW1wbGVCYXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNpbXBsZUJhciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaW1wbGVCYXIoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3MpIHx8IHRoaXM7XG4gICAgICAgIC8vIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlLCBzbyB3ZSBrbm93IHRoaXMgRE9NIG5vZGUgaGFzIGFscmVhZHkgYmVlbiBpbnN0YW5jaWVkXG4gICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuc2V0KGFyZ3NbMF0sIF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTaW1wbGVCYXIuaW5pdERPTUxvYWRlZEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJyksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaW1wbGViYXInKSAhPT0gJ2luaXQnICYmXG4gICAgICAgICAgICAgICAgIVNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKGVsKSlcbiAgICAgICAgICAgICAgICBuZXcgU2ltcGxlQmFyKGVsLCBnZXRPcHRpb25zKGVsLmF0dHJpYnV0ZXMpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gU2ltcGxlQmFyLmdsb2JhbE9ic2VydmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzY29ubmVjdCgpO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLnByb3RvdHlwZS5pbml0RE9NID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoaXMgZWxlbWVudCBkb2Vzbid0IGhhdmUgdGhlIGVsZW1lbnRzIHlldFxuICAgICAgICBpZiAoIUFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCh0aGlzLmVsLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoX3RoaXMuY2xhc3NOYW1lcy53cmFwcGVyKTtcbiAgICAgICAgfSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBQcmVwYXJlIERPTVxuICAgICAgICAgICAgdGhpcy53cmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5tYXNrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMud3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMud3JhcHBlcik7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuY29udGVudFdyYXBwZXJFbCwgdGhpcy5jbGFzc05hbWVzLmNvbnRlbnRXcmFwcGVyKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vZmZzZXRFbCwgdGhpcy5jbGFzc05hbWVzLm9mZnNldCk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMubWFza0VsLCB0aGlzLmNsYXNzTmFtZXMubWFzayk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuY29udGVudEVsLCB0aGlzLmNsYXNzTmFtZXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5wbGFjZWhvbGRlckVsLCB0aGlzLmNsYXNzTmFtZXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCwgdGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwsIHRoaXMuY2xhc3NOYW1lcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5lbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5lbC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICB0aGlzLm9mZnNldEVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudFdyYXBwZXJFbCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tFbC5hcHBlbmRDaGlsZCh0aGlzLm9mZnNldEVsKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5tYXNrRWwpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5wbGFjZWhvbGRlckVsKTtcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyRWwpO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5jb250ZW50V3JhcHBlckVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmVnaW9uJyk7XG4gICAgICAgICAgICAoX2MgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0aGlzLm9wdGlvbnMuYXJpYUxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYXhpcy54LnRyYWNrLmVsIHx8ICF0aGlzLmF4aXMueS50cmFjay5lbCkge1xuICAgICAgICAgICAgdmFyIHRyYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRyYWNrLCB0aGlzLmNsYXNzTmFtZXMudHJhY2spO1xuICAgICAgICAgICAgYWRkQ2xhc3NlcyhzY3JvbGxiYXIsIHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxiYXIpO1xuICAgICAgICAgICAgdHJhY2suYXBwZW5kQ2hpbGQoc2Nyb2xsYmFyKTtcbiAgICAgICAgICAgIHRoaXMuYXhpcy54LnRyYWNrLmVsID0gdHJhY2suY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXMueC50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvcml6b250YWwpO1xuICAgICAgICAgICAgdGhpcy5heGlzLnkudHJhY2suZWwgPSB0cmFjay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpcy55LnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMudmVydGljYWwpO1xuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmF4aXMueC50cmFjay5lbCk7XG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuYXhpcy55LnRyYWNrLmVsKTtcbiAgICAgICAgfVxuICAgICAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pbml0RE9NLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicsICdpbml0Jyk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIucHJvdG90eXBlLnVuTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnVuTW91bnQuY2FsbCh0aGlzKTtcbiAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlc1tcImRlbGV0ZVwiXSh0aGlzLmVsKTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5pbml0SHRtbEFwaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMgPSB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cy5iaW5kKHRoaXMpO1xuICAgICAgICAvLyBNdXRhdGlvbk9ic2VydmVyIGlzIElFMTErXG4gICAgICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIE11dGF0aW9uIG9ic2VydmVyIHRvIG9ic2VydmUgZHluYW1pY2FsbHkgYWRkZWQgZWxlbWVudHNcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihTaW1wbGVCYXIuaGFuZGxlTXV0YXRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGFrZW4gZnJvbSBqUXVlcnkgYHJlYWR5YCBmdW5jdGlvblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBlbGVtZW50cyBhbHJlYWR5IHByZXNlbnQgb24gdGhlIHBhZ2VcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgfHwgLy8gQHRzLWlnbm9yZTogSUUgc3BlY2lmaWNcbiAgICAgICAgICAgIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSBpbml0XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhci5oYW5kbGVNdXRhdGlvbnMgPSBmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChhZGRlZE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoYWRkZWROb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhhZGRlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFNpbXBsZUJhcihhZGRlZE5vZGUsIGdldE9wdGlvbnMoYWRkZWROb2RlLmF0dHJpYnV0ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpICE9PSAnaW5pdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIVNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKGVsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWwpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgU2ltcGxlQmFyKGVsLCBnZXRPcHRpb25zKGVsLmF0dHJpYnV0ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtdXRhdGlvbi5yZW1vdmVkTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlZE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZE5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZWROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1zaW1wbGViYXInKSA9PT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhyZW1vdmVkTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKHJlbW92ZWROb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuZ2V0KHJlbW92ZWROb2RlKS51bk1vdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHJlbW92ZWROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcj1cImluaXRcIl0nKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuZ2V0KGVsKS51bk1vdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5pbnN0YW5jZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgIHJldHVybiBTaW1wbGVCYXI7XG59KFNpbXBsZUJhckNvcmUpKTtcbi8qKlxuICogSFRNTCBBUElcbiAqIENhbGxlZCBvbmx5IGluIGEgYnJvd3NlciBlbnYuXG4gKi9cbmlmIChjYW5Vc2VET00pIHtcbiAgICBTaW1wbGVCYXIuaW5pdEh0bWxBcGkoKTtcbn1cblxuZXhwb3J0IHsgU2ltcGxlQmFyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi4vc2Nzcy9zdHlsZS5zY3NzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB1dGlscyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy91dGlscy5qcyc7XG5cbi8vIGhhbWJ1cmdlciBtZW51XG51dGlscy5tZW51SW5pdCgpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNvbXBvbmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBmb3Jtc1xuaW1wb3J0ICcuL3V0aWxzL2Zvcm1zJztcblxuLy8gdGFic1xuaW1wb3J0ICcuL3V0aWxzL3RhYnMuanMnO1xuXG4vLyBhY2NvcmRpb25cbmltcG9ydCAnLi91dGlscy9hY2NvcmRpb24uanMnO1xuXG4vLyBzZWxlY3RcbmltcG9ydCAnLi91dGlscy9zZWxlY3QuanMnO1xuXG4vLyBtb2RhbHNcbmltcG9ydCAnLi91dGlscy9tb2RhbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgJy4vZGV2L3Z6bXNrMS5qcyc7XG5pbXBvcnQgJy4vZGV2L21hcmt1c0RNLmpzJztcbmltcG9ydCAnLi9kZXYvdWtpazAuanMnO1xuaW1wb3J0ICcuL2Rldi9raWU2ZXIuanMnO1xuIl0sIm5hbWVzIjpbInJlbW92ZUNsYXNzZXMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2MiLCJkb2N1bWVudEVsZW1lbnQiLCJzZXRDYXRhbG9nTWVudUNsYXNzZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwic3VibGlua05vZGUiLCJpIiwic3VibmF2IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJtb3VzZW92ZXJIYW5kbGVyIiwiZSIsInRhcmdldCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJlbCIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhc2V0IiwibmF2U3VibGlua0luZGV4IiwibW9kdWxlcyIsImRhdGFNZWRpYVF1ZXJpZXMiLCJfc2xpZGVUb2dnbGUiLCJfc2xpZGVVcCIsIl9zbGlkZURvd24iLCJBY2NvcmRpb24iLCJjb25zdHJ1Y3RvciIsImFjY29yZGlvbkl0ZW1zIiwibWRRdWVyaWVzQXJyYXkiLCJyZWdJdGVtcyIsIkFycmF5IiwiZnJvbSIsImZpbHRlciIsIml0ZW0iLCJpbmRleCIsInNlbGYiLCJhY2NvcmRpb24iLCJzcGxpdCIsImF0dHJzIiwiQUNDT1JESU9OIiwiSVRFTSIsIlNJTkdMRSIsImNsYXNzZXMiLCJJTklUIiwiQUNUSVZFIiwiaW5pdCIsIl90aGlzIiwiZm9yRWFjaCIsIm1kUXVlcmllc0l0ZW0iLCJtYXRjaE1lZGlhIiwiaXRlbXNBcnJheSIsImhpZGVCb2R5IiwiYWNjb3JkaW9uR3JvdXAiLCJhY3RpdmVUaXRsZSIsInNwZWVkIiwiYWNjb3JkaW9uU3BlZWQiLCJwYXJzZUludCIsIm5leHRFbGVtZW50U2libGluZyIsInNldEFjdGlvbnMiLCJ0aXRsZSIsImdyb3VwIiwiaXNTaW5nbGUiLCJoYXNBdHRyaWJ1dGUiLCJ0b2dnbGUiLCJwcmV2ZW50RGVmYXVsdCIsImluaXRCb2R5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwidGl0bGVzIiwicmVtb3ZlQXR0cmlidXRlIiwiaGlkZGVuIiwic2V0QXR0cmlidXRlIiwibWF0Y2hlcyIsImJpbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiVmFsaWRhdGlvbiIsIlJFUVVJUkVEIiwiSUdOT1JFX1ZBTElEQVRJT04iLCJBSkFYIiwiREVWIiwiSUdOT1JFX0ZPQ1VTIiwiU0hPV19QTEFDRUhPTERFUiIsIlZBTElEQVRFIiwiSEFTX0VSUk9SIiwiSEFTX0ZPQ1VTIiwiSVNfRklMTEVEIiwiSVNfUkVWRUFMRUQiLCJnZXRFcnJvcnMiLCJmb3JtIiwiZXJyIiwicmVxdWlyZWRGaWVsZHMiLCJyZXF1aXJlZEZpZWxkIiwib2Zmc2V0UGFyZW50IiwidGFnTmFtZSIsImRpc2FibGVkIiwidmFsaWRhdGVGaWVsZCIsImFkZEVycm9yIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUVycm9yIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0ZXN0RW1haWwiLCJ0eXBlIiwiY2hlY2tlZCIsInRyaW0iLCJjbGVhckZpZWxkcyIsInJlc2V0Iiwic2V0VGltZW91dCIsImlucHV0cyIsImNoZWNrYm94ZXMiLCJpbnB1dCIsImNoZWNrYm94IiwidGVzdCIsIkZvcm1TdWJtaXRpb24iLCJzaG91bGRWYWxpZGF0ZSIsImZvcm1zIiwic2VuZEZvcm0iLCJyZXNwb25zZVJlc3VsdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsInBvcHVwIiwibW9kYWwiLCJtb2RhbE1lc3NhZ2UiLCJvcGVuIiwiY29uc29sZSIsImxvZyIsImhhbmRsZVN1Ym1pdGlvbiIsImFqYXgiLCJhY3Rpb24iLCJnZXRBdHRyaWJ1dGUiLCJtZXRob2QiLCJkYXRhIiwiRm9ybURhdGEiLCJyZXNwb25zZSIsImZldGNoIiwiYm9keSIsIm9rIiwicmVzdWx0IiwianNvbiIsImFsZXJ0IiwicGFzc3dvcmRGaWVsZHMiLCJmaWVsZCIsImJ0biIsIkZvcm1GaWVsZHMiLCJmaWVsZHMiLCJzYXZlUGxhY2Vob2xkZXIiLCJwbGFjZWhvbGRlciIsImhhbmRsZUZvY3VzaW4iLCJoYW5kbGVGb2N1c291dCIsImJvZHlMb2NrU3RhdHVzIiwiYm9keUxvY2siLCJib2R5VW5sb2NrIiwiTW9kYWwiLCJvcHRpb25zIiwiY29uZmlnIiwibG9nZ2luZyIsImF0dHJpYnV0ZU9wZW5CdXR0b24iLCJhdHRyaWJ1dGVDbG9zZUJ1dHRvbiIsImZpeEVsZW1lbnRTZWxlY3RvciIsInlvdXR1YmVBdHRyaWJ1dGUiLCJ5b3V0dWJlUGxhY2VBdHRyaWJ1dGUiLCJzZXRBdXRvcGxheVlvdXR1YmUiLCJtb2RhbENvbnRlbnQiLCJtb2RhbEFjdGl2ZSIsImJvZHlBY3RpdmUiLCJmb2N1c0NhdGNoIiwiY2xvc2VFc2MiLCJoYXNoU2V0dGluZ3MiLCJsb2NhdGlvbiIsImdvSGFzaCIsIm9uIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInlvdVR1YmVDb2RlIiwiaXNPcGVuIiwidGFyZ2V0T3BlbiIsInNlbGVjdG9yIiwiZWxlbWVudCIsInByZXZpb3VzT3BlbiIsImxhc3RDbG9zZWQiLCJfZGF0YVZhbHVlIiwiaGFzaCIsIl9yZW9wZW4iLCJfc2VsZWN0b3JPcGVuIiwibGFzdEZvY3VzRWwiLCJfZm9jdXNFbCIsImluaXRtb2RhbHMiLCJldmVudHNtb2RhbCIsImJ1dHRvbk9wZW4iLCJidXR0b25DbG9zZSIsImNsb3NlIiwid2hpY2giLCJjb2RlIiwiX2ZvY3VzQ2F0Y2giLCJ3aW5kb3ciLCJfb3BlblRvSGFzaCIsInNlbGVjdG9yVmFsdWUiLCJwcmV2aW91c0FjdGl2ZUVsZW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29kZVZpZGVvIiwidXJsVmlkZW8iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiYXV0b3BsYXkiLCJ5b3V0dWJlUGxhY2UiLCJhcHBlbmRDaGlsZCIsIl9nZXRIYXNoIiwiX3NldEhhc2giLCJtIiwiaW5uZXJXaWR0aCIsIl9mb2N1c1RyYXAiLCJpbm5lckhUTUwiLCJfcmVtb3ZlSGFzaCIsImluY2x1ZGVzIiwiY2xhc3NJbkhhc2giLCJidXR0b25zIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhyZWYiLCJmb2N1c2FibGUiLCJmb2N1c0FycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9jdXNlZEluZGV4IiwiaW5kZXhPZiIsInNoaWZ0S2V5IiwiZm9jdXMiLCJTaW1wbGVCYXIiLCJTZWxlY3QiLCJTRUxFQ1QiLCJCT0RZIiwiTEFCRUwiLCJUSVRMRSIsIlZBTFVFIiwiQ09OVEVOVCIsIk9QVElPTlMiLCJPUFRJT04iLCJTQ1JPTEwiLCJHUk9VUCIsIklOUFVUIiwiQVNTRVQiLCJUWFQiLCJJU19BQ1RJVkUiLCJJU19GT0NVU0VEIiwiSVNfT1BFTkVEIiwiSVNfU0VMRUNURUQiLCJJU19ESVNBQkxFRCIsIkhBU19MSVNUIiwiSEFTX01VTFRJUExFIiwiSEFTX0NIRUNLQk9YIiwiSEFTX0xBQkVMIiwic2VsZWN0TGlzdCIsInNlbGVjdCIsImluaXRTZWxJdGVtIiwicmVsYXRpdmVTZWwiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwic2VsSWQiLCJnZXRQbGFjZWhvbGRlciIsIm9wdFBsYWNlaG9sZGVyIiwibGFiZWwiLCJzaG93Iiwic2VsVGl0bGUiLCJnZXRTZWxlY3QiLCJ0d2luU2VsIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGV4dCIsImJ1aWxkIiwiaW5pdFNlbGVjdGlvbnMiLCJzZXRWYWx1ZSIsInNldE9wdGlvbnMiLCJzZWxBZGRvbkNsYXNzIiwibXVsdGlwbGUiLCJkaXNhYmxlU2VsZWN0Iiwic2V0U2VhcmNoQWN0aW9ucyIsInNldEFjdGlvbiIsInNlbEhpbnQiLCJzZWxCb2R5IiwiZ2V0VmFsdWUiLCJyZWxhdGl2ZVNlbE9wdGlvbnMiLCJnZXRPcHRpb25zIiwiZ2V0Q2xhc3MiLCJzZWwiLCJzZWxlY3RJZCIsInNlbExpc3QiLCJzZWxPcHRpb24iLCJvcHRWYWwiLCJzZXRPcHRpb25BY3Rpb24iLCJhZGRFcnIiLCJyZW1vdmVFcnIiLCJjbG9zZUdyb3VwIiwic2VsT3B0aW9ucyIsInNlbGVjdE9uZUdyb3VwIiwic2VsR3JvdXAiLCJzZWxlY3Rpb25zIiwic2VsZWN0aW9uIiwiY2xvc2VJdGVtIiwib3B0aW9uIiwicmVsYXRpdmVTZWxlY3Rpb25zIiwiZ2V0RGF0YSIsImVsZW1lbnRzIiwicmVsYXRpdmVTZWxlY3Rpb24iLCJ0d2luU2VsZWN0aW9ucyIsInR3aW5TZWxlY3Rpb24iLCJvcHQiLCJ0ZXh0Q29udGVudCIsInNldFNlbGVjdGlvbnMiLCJzZWxJbnB1dCIsInRvVXBwZXJDYXNlIiwic2V0U3VidGl0bGUiLCJzZWxFcnJvciIsInJlbW92ZUNoaWxkIiwiY3NzQ2xhc3MiLCJhdHRyIiwiYXR0ckNsYXNzIiwidGl0bGVWYWwiLCJodG1sIiwic2VsTGFiZWwiLCJ2YWx1ZXMiLCJtYXAiLCJnZXRDb250ZW50Iiwiam9pbiIsImxpc3QiLCJWQUxVRVVFIiwiY3VzdG9tQ2xhc3MiLCJvcHRDbGFzcyIsInNlbFNjcm9sbCIsInNlbFNjcm9sbEhlaWdodCIsInNlbE9wdGlvbnNIVE1MIiwiZ2V0T3B0aW9uIiwic2VsZWN0ZWQiLCJzaG93U2VsZWN0aW9uIiwib3B0aW9uQ2xhc3MiLCJvcHRpb25MaW5rIiwib3B0aW9uTGlua1RhcmdldCIsIm9wdGlvbkhUTUwiLCJvcHRpb25EYXRhIiwib3B0QXNzZXQiLCJvcHRpb25EYXRhSFRNTCIsIm9wdGlvbkNvbnRlbnRIVE1MIiwiZmluZCIsInN1YnRpdGxlIiwicHVzaCIsInNlbGVjdGVkSW5kZXgiLCJ0ZW1wQnV0dG9uIiwiYXBwZW5kIiwiY2xpY2siLCJzY3JvbGxCbG9jayIsImF1dG9IaWRlIiwic2V0SGFzaCIsImdldEhhc2giLCJUYWJzIiwiVEFCUyIsIklOREVYIiwiVElUTEVTIiwiVEFCX0lURU0iLCJIQVNIIiwiTU9EQUwiLCJ0YWJzIiwiYWN0aXZlSGFzaCIsInN0YXJ0c1dpdGgiLCJ0YWJzQmxvY2siLCJzZXRTdGF0dXMiLCJjb250ZW50IiwidGFic0luZGV4IiwiaGFzSGFzaCIsImluZHgiLCJhY3RpdmVIYXNoQmxvY2siLCJtZW51SW5pdCIsIm1lbnVPcGVuIiwibWVudUNsb3NlIiwiYm9keUxvY2tUb2dnbGUiLCJkZWxheSIsInVuaXF1ZUFycmF5IiwiYXJyYXkiLCJkYXRhU2V0VmFsdWUiLCJtZWRpYSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJicmVha3BvaW50IiwicGFyYW1zQXJyYXkiLCJtZFF1ZXJpZXMiLCJtZWRpYUJyZWFrcG9pbnQiLCJtZWRpYVR5cGUiLCJkdXJhdGlvbiIsInNob3dtb3JlIiwic3R5bGUiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwicmVtb3ZlUHJvcGVydHkiLCJyZW1Ub1B4IiwicmVtVmFsdWUiLCJodG1sRm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwicHhWYWx1ZSIsIk1hdGgiLCJyb3VuZCIsImNsYXNzTmFtZSIsInV0aWxzIl0sInNvdXJjZVJvb3QiOiIifQ==
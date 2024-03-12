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
/***/ (() => {



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
}`, "",{"version":3,"sources":["webpack://./src/scss/fonts.scss","webpack://./src/scss/style.scss","webpack://./src/scss/set.scss","webpack://./src/ui/styles/_typo.scss","webpack://./src/ui/styles/_input.scss","webpack://./src/ui/styles/_buttons.scss","webpack://./src/ui/styles/_radio-button.scss","webpack://./src/ui/styles/_checkbox.scss","<no source>"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_regular.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_medium.woff2') format('woff2');\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: 'Gilroy';\n  src: url('../assets/fonts/Gilroy_bold.woff2') format('woff2');\n  font-weight: 700;\n  font-style: normal;\n}","// --------------------------------- mixins ---------------------------------\n\n@import './mixins';\n\n// -------------------------------- variables -------------------------------\n\n// colors\n$white: #ffffff;\n$black: #000000;\n$gray: #EFEFEF;\n$grayTxt: #A1A2A9;\n$red: #F40000FF;\n\n// ---------------------------------- fonts ---------------------------------\n\n@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,200..1000&display=swap');\n\n// local fonts\n @import './fonts';\n\n// ------------------------------- base styles ------------------------------\n\n// base scss file\n@import './set';\n\n// body\nbody {\n    .lock & {\n        overflow: hidden;\n        touch-action: none;\n    }\n    .loaded & {\n    }\n}\n\n// main\nmain {\n    position: relative;\n}\n\n// wrapper\n.wrapper {\n    margin: 0 auto;\n    max-width: 1920px;\n}\n\n// --------------------------------------------------------------------------\n\n// header / footer\n@import './sections/header';\n@import './sections/footer';\n\n// ui\n@import '../ui/styles/ui.scss';\n\n// --------------------------------------------------------------------------\n\n@import './dev/vzmsk1.scss';\n@import './dev/markusDM.scss';\n@import './dev/ukik0.scss';\n@import './dev/kie6er.scss';\n","*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\nhtml {\n    font-family: 'Nunito Sans'; // шрифт по умолчанию по сайту\n    font-size: 0.5208335vw; // на разрешении 1920 0.520835vw === 10px\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 1.2;\n    margin: 0;\n    height: 100%;\n    padding: 0;\n}\n\nbody {\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 2.5rem;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    font-size: 1.8rem;\n    color: black; // цвет по умолчанию текста по сайту\n    background-color: $white;\n}\n\ninput,\ntextarea {\n    -webkit-animation: bugfix infinite 1s;\n    line-height: inherit;\n    margin: 0;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: inherit;\n}\na {\n    color: unset;\n}\na,\na:hover {\n    text-decoration: none;\n}\n\nbutton,\ninput,\na,\ntextarea {\n    outline: none;\n    cursor: pointer;\n    font: inherit;\n    &:focus {\n        outline: none;\n    }\n    &:active {\n        outline: none;\n    }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font: inherit;\n    margin: 0;\n    padding: 0;\n}\np {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n\nimg {\n    width: 100%;\n    height: auto;\n    display: block;\n}\n\nbutton {\n    border: none;\n    color: inherit;\n    font: inherit;\n    text-align: inherit;\n    padding: 0;\n    background-color: transparent;\n}\nul {\n    padding: 0;\n    margin: 0;\n}\n\nul li {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.container {\n    width: 172rem;\n    margin: 0 auto;\n}\n\ninput[type='number']::-webkit-inner-spin-button,\ninput[type='number']::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\nsvg,\nimg {\n    width: 100%;\n    height: auto;\n    object-fit: contain;\n}\n\n@media (min-width: 1920px) {\n    html {\n        font-size: 10px;\n    }\n}\n\n@media (max-width: 48em) {\n    html {\n        font-size: 5px;\n        font-size: 1.5625vw;\n        font-size: calc((100 / 375) * 5vw); // где 375 это ширина моб версии макета\n        -webkit-text-size-adjust: none;\n    }\n\n    body {\n        font-size: 3rem;\n        -webkit-text-size-adjust: none;\n    }\n\n    .container {\n        padding: 0 3.2rem; // в моб версии отступ от края задаем для всех контейнеров, а там где не нужно можем точечно убрать\n        width: 100%;\n    }\n}\n",".h {\n    font-weight: 700;\n    text-transform: uppercase;\n\n    &_h1 {\n        font-size: 5rem;\n        line-height: 5.6rem;\n    }\n\n    &_h2 {\n        font-size: 3.6rem;\n        line-height: 120%;\n    }\n\n    &_h3 {\n        font-weight: 600;\n        font-size: 2.4rem;\n        line-height: 3.3rem;\n    }\n}\n\n.txt {\n    &_24 {\n        font-size: 2.4rem;\n        line-height: 2.8rem;\n    }\n\n    &_20 {\n        font-size: 2rem;\n        line-height: 2.8rem;\n    }\n\n    &_16 {\n        font-size: 1.6rem;\n        line-height: 2.2rem;\n    }\n\n    &_14 {\n        font-size: 1.4rem;\n        line-height: 1.9rem;\n    }\n\n    &_semibold {\n        font-weight: 600;\n    }\n}","input[type='text'],\ninput[type='email'],\ninput[type='tel'],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\ntextarea:focus,\ninput:focus {\n  outline: none;\n}\n\n.input {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.2rem;\n  width: 100%;\n  border-radius: 0 !important;\n\n  &_pass {\n    .input__field {\n      padding-right: 4.5rem;\n    }\n  }\n\n  &__field,\n  &__field::placeholder {\n    font-size: 1.6rem;\n    line-height: 2.2rem;\n  }\n\n  &__field {\n    padding: 1.8rem 2rem;\n    height: 6rem;\n    background-color: $white;\n    color: $grayTxt;\n    transition: color 0.3s ease;\n  }\n\n  &__pass-btn {\n    position: absolute;\n    top: 2.2rem;\n    right: 2rem;\n  }\n\n  &__pass-btn-i {\n    display: inline-block;\n    width: 2rem;\n    height: 2rem;\n    object-fit: contain;\n\n    &_hide {\n      display: none;\n    }\n\n    ._is-revealed & {\n      display: none;\n      &_hide {\n        display: inline-block;\n      }\n    }\n  }\n\n  &._has-error {\n\n    &::after {\n      content: attr(data-hint);\n      font-size: 1.2rem;\n      color: $red;\n    }\n\n    .input__field {\n      color: $red;\n    }\n  }\n\n  &._has-focus,\n  &._is-filled {\n    .input__field {\n      color: $black;\n    }\n  }\n}\n\ntextarea.input {\n  padding: 0px 0px;\n  resize: none;\n}\n",".btn {\n  display: inline-flex;\n  align-items: center;\n\n  &_primary {\n    padding: 1rem 3.2rem;\n    justify-content: center;\n    height: 6rem;\n    border: 1.5px solid $black;\n    text-align: center;\n    background-color: $black;\n    transition: background-color 0.3s ease;\n\n    .txt {\n      color: $white;\n      transition: color 0.3s ease;\n    }\n\n    @media (any-hover: hover) {\n      &:not(&[disabled], &._is-disabled) {\n        &:hover {\n          background-color: $white;\n\n          .txt {\n            color: $black;\n          }\n        }\n      }\n    }\n  }\n\n  &_secondary {\n    margin-right: 1.6rem;\n\n    &::after {\n      content: '';\n      flex: 0 0 2.4rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      background-image: url(\"./assets/images/icons/arr-sm.svg\");\n      background-size: contain;\n      background-repeat: no-repeat;\n      transform: translateX(0.6rem);\n      transition: transform 0.3s ease;\n    }\n\n    @media (any-hover: hover) {\n      &:hover {\n        &::after {\n          transform: translateX(0);\n        }\n      }\n    }\n  }\n\n  &[disabled],\n  &._is-disabled {\n    border: 1.5px solid $grayTxt;\n    background-color: $grayTxt;\n  }\n\n}",".option {\n    position: relative;\n    cursor: pointer;\n\n  &__input {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    appearance: none;\n\n    &:focus + .option__txt::before {\n    }\n    &:checked + .option__txt::before {\n    }\n    &:checked + .option__txt::after {\n      transform: scale(1);\n    }\n  }\n\n  &__txt {\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    gap: 0.8rem;\n\n    &::before {\n      content: '';\n      align-self: flex-start;\n      flex: 0 0 2.4rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      border-radius: 50%;\n      border: 1.5px solid $black;\n    }\n    &::after {\n      content: '';\n      position: absolute;\n      left: 0.4rem;\n      top: 0.4rem;\n      width: 1.6rem;\n      height: 1.6rem;\n      border-radius: 50%;\n      background-color: $black;\n      transform: scale(0);\n      transition: transform 0.3s ease;\n    }\n  }\n}\n",".checkbox {\n  position: relative;\n  display: inline-flex;\n\n  &__input {\n    position: absolute;\n    z-index: 2;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    appearance: none;\n\n    &:checked + .checkbox__txt {\n      &::before {\n        border: 1.5px solid $black;\n      }\n      &::after {\n        transform: scale(1);\n      }\n    }\n  }\n\n  &__txt {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    column-gap: 0.8rem;\n    cursor: pointer;\n\n    &::before {\n      content: '';\n      flex: 0 0 2.2rem;\n      width: 2.2rem;\n      height: 2.2rem;\n      border: 1.5px solid $grayTxt;\n      background-color: $white;\n      transition: border 0.3s ease;\n    }\n\n    &::after {\n      content: '';\n      position: absolute;\n      top: 0.5rem;\n      left: 0.3rem;\n      width: 1.6rem;\n      height: 1.6rem;\n      background-color: $black;\n      transform: scale(0);\n      transition: transform 0.3s ease;\n    }\n  }\n}\n",null],"sourceRoot":""}]);
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
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_7__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxtQkFBbUI7QUFDbkIsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEdBQTRHLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFVBQVUscUJBQXFCLFVBQVUscUJBQXFCLHNCQUFzQixVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyx5WEFBeVgsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLFFBQVEsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFlBQVksT0FBTyxPQUFPLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxPQUFPLFdBQVcsT0FBTyxTQUFTLFVBQVUsVUFBVSxVQUFVLE1BQU0sU0FBUyxVQUFVLE1BQU0sU0FBUyxVQUFVLE9BQU8sV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxPQUFPLE9BQU8sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sT0FBTyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxTQUFTLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsWUFBWSxZQUFZLFlBQVksTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxPQUFPLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFlBQVksWUFBWSxNQUFNLE1B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QUNBLHVFQUF1RSwyQkFBMkI7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0UsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0UsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIscURBQVE7QUFDbkMsOEJBQThCLHFEQUFRLDZCQUE2QixlQUFlO0FBQ2xGLCtCQUErQixxREFBUTtBQUN2Qyw4QkFBOEIscURBQVE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3Q0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFbUM7QUFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3I1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7QUFDTzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUNuRiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQSxTQUFTLHNEQUFhO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVCQUF1QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFhO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZ0NBQWdDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsc0RBQWE7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0NBQVM7QUFDYjtBQUNBOztBQUVnQztBQUNoQzs7Ozs7OztVQ3ZNQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTRCOztBQUU1Qjs7QUFFMEM7O0FBRTFDO0FBQ0FFLHFEQUFjLENBQUMsQ0FBQzs7QUFFaEI7O0FBRUE7QUFDdUI7O0FBRXZCO0FBQ3lCOztBQUV6QjtBQUM4Qjs7QUFFOUI7QUFDMkI7O0FBRTNCO0FBQzJCOztBQUUzQjs7QUFFeUI7QUFDRTtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL2FjY29yZGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvZm9ybXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL21vZGFscy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvc2VsZWN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy90YWJzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY2FuLXVzZS1kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL3Njc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzPzFlMDUiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL3Njc3Mvc3R5bGUuc2Nzcz82YzJkIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRyaW0uanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL190cmltbWVkRW5kSW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNTeW1ib2wuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9ub3cuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3RvTnVtYmVyLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXItY29yZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IG1vZHVsZXMgPSB7fTtcbiIsImltcG9ydCB7XG4gIGRhdGFNZWRpYVF1ZXJpZXMsXG4gIF9zbGlkZVRvZ2dsZSxcbiAgX3NsaWRlVXAsXG4gIF9zbGlkZURvd24sXG59IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBBY2NvcmRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFjY29yZGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjb3JkaW9uXScpO1xuICAgIHRoaXMubWRRdWVyaWVzQXJyYXkgPSBkYXRhTWVkaWFRdWVyaWVzKHRoaXMuYWNjb3JkaW9uSXRlbXMsICdhY2NvcmRpb24nKTtcbiAgICB0aGlzLnJlZ0l0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLmFjY29yZGlvbkl0ZW1zKS5maWx0ZXIoZnVuY3Rpb24gKFxuICAgICAgaXRlbSxcbiAgICAgIGluZGV4LFxuICAgICAgc2VsZlxuICAgICkge1xuICAgICAgcmV0dXJuICFpdGVtLmRhdGFzZXQuYWNjb3JkaW9uLnNwbGl0KCcsJylbMF07XG4gICAgfSk7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIEFDQ09SRElPTjogJ2RhdGEtYWNjb3JkaW9uJyxcbiAgICAgIElURU06ICdkYXRhLWFjY29yZGlvbi1pdGVtJyxcbiAgICAgIFNJTkdMRTogJ2RhdGEtYWNjb3JkaW9uLXNpbmdsZScsXG4gICAgfTtcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICBJTklUOiAnX2FjY29yZGlvbi1pbml0JyxcbiAgICAgIEFDVElWRTogJ19pcy1hY3RpdmUnLFxuICAgIH07XG5cbiAgICAvLyBpbml0IHJlZ3VsYXIgYWNjb3JkaW9uIGl0ZW1zXG4gICAgaWYgKHRoaXMucmVnSXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmluaXQodGhpcy5yZWdJdGVtcyk7XG4gICAgfVxuICAgIC8vIGluaXQgYWNjb3JkaW9uIGl0ZW1zIHdpdGggbWVkaWEgcXVlcmllc1xuICAgIGlmICh0aGlzLm1kUXVlcmllc0FycmF5ICYmIHRoaXMubWRRdWVyaWVzQXJyYXkubGVuZ3RoKSB7XG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMubWRRdWVyaWVzQXJyYXkuZm9yRWFjaChtZFF1ZXJpZXNJdGVtID0+IHtcbiAgICAgICAgbWRRdWVyaWVzSXRlbS5tYXRjaE1lZGlhLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy5pbml0KG1kUXVlcmllc0l0ZW0uaXRlbXNBcnJheSwgbWRRdWVyaWVzSXRlbS5tYXRjaE1lZGlhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW5pdChtZFF1ZXJpZXNJdGVtLml0ZW1zQXJyYXksIG1kUXVlcmllc0l0ZW0ubWF0Y2hNZWRpYSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoaWRlQm9keShhY2NvcmRpb25Hcm91cCkge1xuICAgIGNvbnN0IGFjdGl2ZVRpdGxlID0gYWNjb3JkaW9uR3JvdXAucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbJHt0aGlzLmF0dHJzLklURU19XS4ke3RoaXMuY2xhc3Nlcy5BQ1RJVkV9YFxuICAgICk7XG4gICAgY29uc3Qgc3BlZWQgPSBhY2NvcmRpb25Hcm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkXG4gICAgICA/IHBhcnNlSW50KGFjY29yZGlvbkdyb3VwLmRhdGFzZXQuYWNjb3JkaW9uU3BlZWQpXG4gICAgICA6IDUwMDtcblxuICAgIGlmIChhY3RpdmVUaXRsZSAmJiAhYWNjb3JkaW9uR3JvdXAucXVlcnlTZWxlY3RvckFsbCgnLl9zbGlkZScpLmxlbmd0aCkge1xuICAgICAgYWN0aXZlVGl0bGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgIF9zbGlkZVVwKGFjdGl2ZVRpdGxlLm5leHRFbGVtZW50U2libGluZywgc3BlZWQpO1xuICAgIH1cbiAgfVxuXG4gIHNldEFjdGlvbnMoZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLklURU19XWApKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRhcmdldC5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLklURU19XWApO1xuICAgICAgY29uc3QgZ3JvdXAgPSB0aXRsZS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLkFDQ09SRElPTn1dYCk7XG4gICAgICBjb25zdCBpc1NpbmdsZSA9IGdyb3VwLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLlNJTkdMRSk7XG4gICAgICBjb25zdCBzcGVlZCA9IGdyb3VwLmRhdGFzZXQuYWNjb3JkaW9uU3BlZWRcbiAgICAgICAgPyBwYXJzZUludChncm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkKVxuICAgICAgICA6IDUwMDtcblxuICAgICAgaWYgKCFncm91cC5xdWVyeVNlbGVjdG9yQWxsKCcuX3NsaWRlJykubGVuZ3RoKSB7XG4gICAgICAgIGlmIChpc1NpbmdsZSAmJiAhdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgdGhpcy5oaWRlQm9keShncm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHRpdGxlLm5leHRFbGVtZW50U2libGluZywgc3BlZWQpO1xuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRCb2R5KGFjY29yZGlvbkdyb3VwLCBoaWRlQm9keSA9IHRydWUpIHtcbiAgICBsZXQgdGl0bGVzID0gYWNjb3JkaW9uR3JvdXAucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5JVEVNfV1gKTtcblxuICAgIGlmICh0aXRsZXMubGVuZ3RoKSB7XG4gICAgICB0aXRsZXMgPSBBcnJheS5mcm9tKHRpdGxlcykuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5BQ0NPUkRJT059XWApID09PSBhY2NvcmRpb25Hcm91cFxuICAgICAgKTtcbiAgICAgIHRpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgICAgaWYgKGhpZGVCb2R5KSB7XG4gICAgICAgICAgdGl0bGUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgIGlmICghdGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgICB0aXRsZS5uZXh0RWxlbWVudFNpYmxpbmcuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgIHRpdGxlLm5leHRFbGVtZW50U2libGluZy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdChhY2NvcmRpb25JdGVtcywgbWF0Y2hNZWRpYSA9IGZhbHNlKSB7XG4gICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaChhY2NvcmRpb25Hcm91cCA9PiB7XG4gICAgICBhY2NvcmRpb25Hcm91cCA9IG1hdGNoTWVkaWEgPyBhY2NvcmRpb25Hcm91cC5pdGVtIDogYWNjb3JkaW9uR3JvdXA7XG4gICAgICBpZiAobWF0Y2hNZWRpYS5tYXRjaGVzIHx8ICFtYXRjaE1lZGlhKSB7XG4gICAgICAgIGFjY29yZGlvbkdyb3VwLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklOSVQpO1xuICAgICAgICB0aGlzLmluaXRCb2R5KGFjY29yZGlvbkdyb3VwKTtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JTklUKTtcbiAgICAgICAgdGhpcy5pbml0Qm9keShhY2NvcmRpb25Hcm91cCwgZmFsc2UpO1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0QWN0aW9ucy5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgQWNjb3JkaW9uKCk7XG4iLCJpbXBvcnQgeyBtb2R1bGVzIH0gZnJvbSAnLi4vbW9kdWxlcy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIFZhbGlkYXRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmF0dHJzID0ge1xuICAgICAgUkVRVUlSRUQ6ICdkYXRhLXJlcXVpcmVkJyxcbiAgICAgIElHTk9SRV9WQUxJREFUSU9OOiAnZGF0YS1pZ25vcmUtdmFsaWRhdGlvbicsXG4gICAgICBBSkFYOiAnZGF0YS1hamF4JyxcbiAgICAgIERFVjogJ2RhdGEtZGV2JyxcbiAgICAgIElHTk9SRV9GT0NVUzogJ2RhdGEtaWdub3JlLWZvY3VzJyxcbiAgICAgIFNIT1dfUExBQ0VIT0xERVI6ICdkYXRhLXNob3ctcGxhY2Vob2xkZXInLFxuICAgICAgVkFMSURBVEU6ICdkYXRhLXZhbGlkYXRlJyxcbiAgICB9O1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgSEFTX0ZPQ1VTOiAnX2hhcy1mb2N1cycsXG4gICAgICBJU19GSUxMRUQ6ICdfaXMtZmlsbGVkJyxcbiAgICAgIElTX1JFVkVBTEVEOiAnX2lzLXJldmVhbGVkJ1xuICAgIH07XG4gIH1cblxuICBnZXRFcnJvcnMoZm9ybSkge1xuICAgIGxldCBlcnIgPSAwO1xuICAgIGxldCByZXF1aXJlZEZpZWxkcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChgKlske3RoaXMuYXR0cnMuUkVRVUlSRUR9XWApO1xuXG4gICAgaWYgKHJlcXVpcmVkRmllbGRzLmxlbmd0aCkge1xuICAgICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChyZXF1aXJlZEZpZWxkID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChyZXF1aXJlZEZpZWxkLm9mZnNldFBhcmVudCAhPT0gbnVsbCB8fFxuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJykgJiZcbiAgICAgICAgICAhcmVxdWlyZWRGaWVsZC5kaXNhYmxlZFxuICAgICAgICApIHtcbiAgICAgICAgICBlcnIgKz0gdGhpcy52YWxpZGF0ZUZpZWxkKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuXG4gIGFkZEVycm9yKHJlcXVpcmVkRmllbGQpIHtcbiAgICByZXF1aXJlZEZpZWxkLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gIH1cblxuICByZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKSB7XG4gICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICB9XG5cbiAgdmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKSB7XG4gICAgbGV0IGVyciA9IDA7XG5cbiAgICBpZiAocmVxdWlyZWRGaWVsZC5kYXRhc2V0LnJlcXVpcmVkID09PSAnZW1haWwnKSB7XG4gICAgICByZXF1aXJlZEZpZWxkLnZhbHVlID0gcmVxdWlyZWRGaWVsZC52YWx1ZS5yZXBsYWNlKCcgJywgJycpO1xuXG4gICAgICBpZiAodGhpcy50ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkpIHtcbiAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgZXJyKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVxdWlyZWRGaWVsZC50eXBlID09PSAnY2hlY2tib3gnICYmICFyZXF1aXJlZEZpZWxkLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuYWRkRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICBlcnIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFyZXF1aXJlZEZpZWxkLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICBlcnIrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH1cblxuICBjbGVhckZpZWxkcyhmb3JtKSB7XG4gICAgZm9ybS5yZXNldCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LHRleHRhcmVhJyk7XG4gICAgICBjb25zdCBjaGVja2JveGVzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcblxuICAgICAgaWYgKGlucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBpbnB1dCA9IGlucHV0c1tpbmRleF07XG5cbiAgICAgICAgICBpbnB1dC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoZWNrYm94ZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGVja2JveGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY2hlY2tib3hlc1tpbmRleF07XG4gICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICB0ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkge1xuICAgIHJldHVybiAhL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDh9KSskLy50ZXN0KFxuICAgICAgcmVxdWlyZWRGaWVsZC52YWx1ZVxuICAgICk7XG4gIH1cbn1cbmNsYXNzIEZvcm1TdWJtaXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3Ioc2hvdWxkVmFsaWRhdGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2hvdWxkVmFsaWRhdGUgPSBzaG91bGRWYWxpZGF0ZSA/IHNob3VsZFZhbGlkYXRlIDogdHJ1ZTtcbiAgICB0aGlzLmZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2VuZEZvcm0oZm9ybSwgcmVzcG9uc2VSZXN1bHQgPSBgYCkge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NlbmRGb3JtJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBmb3JtOiBmb3JtLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gc2hvdyBtb2RhbCwgaWYgcG9wdXAgbW9kdWxlIGlzIGNvbm5lY3RlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKG1vZHVsZXMucG9wdXApIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBmb3JtLmRhdGFzZXQubW9kYWxNZXNzYWdlO1xuICAgICAgICBtb2RhbCA/IG1vZHVsZXMubW9kYWwub3Blbihtb2RhbCkgOiBudWxsO1xuICAgICAgfVxuICAgIH0sIDApO1xuXG4gICAgdGhpcy5jbGVhckZpZWxkcyhmb3JtKTtcblxuICAgIGNvbnNvbGUubG9nKCdpcyBzZW50Jyk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVTdWJtaXRpb24oZm9ybSwgZSkge1xuICAgIGNvbnN0IGVyciA9ICFmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLklHTk9SRV9WQUxJREFUSU9OKVxuICAgICAgPyB0aGlzLmdldEVycm9ycyhmb3JtKVxuICAgICAgOiAwO1xuXG4gICAgaWYgKGVyciA9PT0gMCkge1xuICAgICAgY29uc3QgYWpheCA9IGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuQUpBWCk7XG5cbiAgICAgIGlmIChhamF4KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBhY3Rpb24gPSBmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJylcbiAgICAgICAgICA/IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKS50cmltKClcbiAgICAgICAgICA6ICcjJztcbiAgICAgICAgY29uc3QgbWV0aG9kID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpXG4gICAgICAgICAgPyBmb3JtLmdldEF0dHJpYnV0ZSgnbWV0aG9kJykudHJpbSgpXG4gICAgICAgICAgOiAnR0VUJztcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ19pcy1zZW5kaW5nJyk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhY3Rpb24sIHtcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICAgIHRoaXMuc2VuZEZvcm0oZm9ybSwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgnZXJyb3InKTtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ19pcy1zZW5kaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZm9ybS5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5ERVYpKSB7XG4gICAgICAgIC8vIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3QgcGFzc3dvcmRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXF1aXJlZD1cInBhc3NcIl0nKVxuXG4gICAgaWYgKHRoaXMuZm9ybXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBfdGhpcy5oYW5kbGVTdWJtaXRpb24oZS50YXJnZXQsIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgX3RoaXMuY2xlYXJGaWVsZHMoZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwYXNzd29yZEZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHBhc3N3b3JkRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBjb25zdCBidG4gPSBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgICAgICBpZiAoYnRuKSB7XG4gICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICBmaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhfdGhpcy5jbGFzc2VzLklTX1JFVkVBTEVEKVxuICAgICAgICAgICAgICAgID8gJ3Bhc3N3b3JkJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQnXG4gICAgICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKVxuICAgICAgICAgICAgZmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKF90aGlzLmNsYXNzZXMuSVNfUkVWRUFMRUQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbmNsYXNzIEZvcm1GaWVsZHMgZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LHRleHRhcmVhJyk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBzYXZlUGxhY2Vob2xkZXIoKSB7XG4gICAgaWYgKHRoaXMuZmllbGRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIGlmICghZmllbGQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuU0hPV19QTEFDRUhPTERFUikpIHtcbiAgICAgICAgICBmaWVsZC5kYXRhc2V0LnBsYWNlaG9sZGVyID0gZmllbGQucGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzaW4oZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnIHx8IHRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICBpZiAodGFyZ2V0LmRhdGFzZXQucGxhY2Vob2xkZXIpIHRhcmdldC5wbGFjZWhvbGRlciA9ICcnO1xuXG4gICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnZmlsZScgJiYgdGFyZ2V0LnR5cGUgIT09ICdjaGVja2JveCcgJiYgdGFyZ2V0LnR5cGUgIT09ICdyYWRpbycpIHtcbiAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlbW92ZUVycm9yKHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNvdXQoZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5WQUxJREFURSkpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKHRhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2ZpbGUnICYmIHRhcmdldC50eXBlICE9PSAnY2hlY2tib3gnICYmIHRhcmdldC50eXBlICE9PSAncmFkaW8nKSB7XG4gICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKSAmJiB0YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5pbnB1dCcpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZJTExFRCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIHNhdmUgcGxhY2Vob2xkZXIgaW4gZGF0YSBhdHRyaWJ1dGVcbiAgICB0aGlzLnNhdmVQbGFjZWhvbGRlcigpO1xuXG4gICAgLy8gaGFuZGxlIHN1Ym1pdGlvblxuICAgIG5ldyBGb3JtU3VibWl0aW9uKCk7XG5cbiAgICAvLyBldmVudHNcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmhhbmRsZUZvY3VzaW4uYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuaGFuZGxlRm9jdXNvdXQuYmluZCh0aGlzKSk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IEZvcm1GaWVsZHMoKTtcbiIsImltcG9ydCB7IG1vZHVsZXMgfSBmcm9tICcuLi9tb2R1bGVzLmpzJztcbmltcG9ydCB7IGJvZHlMb2NrU3RhdHVzLCBib2R5TG9jaywgYm9keVVubG9jayB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgIGxvZ2dpbmc6IHRydWUsXG4gICAgICBpbml0OiB0cnVlLFxuICAgICAgYXR0cmlidXRlT3BlbkJ1dHRvbjogJ2RhdGEtbW9kYWwnLFxuICAgICAgYXR0cmlidXRlQ2xvc2VCdXR0b246ICdkYXRhLWNsb3NlJyxcbiAgICAgIGZpeEVsZW1lbnRTZWxlY3RvcjogJ1tkYXRhLWxwXScsXG4gICAgICB5b3V0dWJlQXR0cmlidXRlOiAnZGF0YS1tb2RhbC15b3V0dWJlJyxcbiAgICAgIHlvdXR1YmVQbGFjZUF0dHJpYnV0ZTogJ2RhdGEtbW9kYWwteW91dHViZS1wbGFjZScsXG4gICAgICBzZXRBdXRvcGxheVlvdXR1YmU6IHRydWUsXG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgIG1vZGFsOiAnbW9kYWwnLFxuICAgICAgICAvLyBtb2RhbFdyYXBwZXI6ICdtb2RhbF9fd3JhcHBlcicsXG4gICAgICAgIG1vZGFsQ29udGVudDogJ21vZGFsX19jb250ZW50JyxcbiAgICAgICAgbW9kYWxBY3RpdmU6ICdtb2RhbF9zaG93JyxcbiAgICAgICAgYm9keUFjdGl2ZTogJ21vZGFsLXNob3cnLFxuICAgICAgfSxcbiAgICAgIGZvY3VzQ2F0Y2g6IHRydWUsXG4gICAgICBjbG9zZUVzYzogdHJ1ZSxcbiAgICAgIGJvZHlMb2NrOiB0cnVlLFxuICAgICAgaGFzaFNldHRpbmdzOiB7XG4gICAgICAgIGxvY2F0aW9uOiB0cnVlLFxuICAgICAgICBnb0hhc2g6IHRydWUsXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGFmdGVyT3BlbjogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24gKCkge30sXG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy55b3VUdWJlQ29kZTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMudGFyZ2V0T3BlbiA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5wcmV2aW91c09wZW4gPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMubGFzdENsb3NlZCA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5fZGF0YVZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5oYXNoID0gZmFsc2U7XG5cbiAgICB0aGlzLl9yZW9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSBmYWxzZTtcblxuICAgIHRoaXMubGFzdEZvY3VzRWwgPSBmYWxzZTtcbiAgICB0aGlzLl9mb2N1c0VsID0gW1xuICAgICAgJ2FbaHJlZl0nLFxuICAgICAgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdhcmVhW2hyZWZdJyxcbiAgICAgICdpZnJhbWUnLFxuICAgICAgJ29iamVjdCcsXG4gICAgICAnZW1iZWQnLFxuICAgICAgJ1tjb250ZW50ZWRpdGFibGVdJyxcbiAgICAgICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknLFxuICAgIF07XG4gICAgLy90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGNvbmZpZywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgLi4uY29uZmlnLmNsYXNzZXMsXG4gICAgICAgIC4uLm9wdGlvbnM/LmNsYXNzZXMsXG4gICAgICB9LFxuICAgICAgaGFzaFNldHRpbmdzOiB7XG4gICAgICAgIC4uLmNvbmZpZy5oYXNoU2V0dGluZ3MsXG4gICAgICAgIC4uLm9wdGlvbnM/Lmhhc2hTZXR0aW5ncyxcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICAuLi5jb25maWcub24sXG4gICAgICAgIC4uLm9wdGlvbnM/Lm9uLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMuYm9keUxvY2sgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMuaW5pdCA/IHRoaXMuaW5pdG1vZGFscygpIDogbnVsbDtcbiAgfVxuICBpbml0bW9kYWxzKCkge1xuICAgIHRoaXMuZXZlbnRzbW9kYWwoKTtcbiAgfVxuICBldmVudHNtb2RhbCgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk9wZW4gPSBlLnRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn1dYFxuICAgICAgICApO1xuICAgICAgICBpZiAoYnV0dG9uT3Blbikge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRhVmFsdWUgPSBidXR0b25PcGVuLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9uXG4gICAgICAgICAgKVxuICAgICAgICAgICAgPyBidXR0b25PcGVuLmdldEF0dHJpYnV0ZSh0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbilcbiAgICAgICAgICAgIDogJ2Vycm9yJztcbiAgICAgICAgICB0aGlzLnlvdVR1YmVDb2RlID0gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMueW91dHViZUF0dHJpYnV0ZVxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUodGhpcy5vcHRpb25zLnlvdXR1YmVBdHRyaWJ1dGUpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgaWYgKHRoaXMuX2RhdGFWYWx1ZSAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbikgdGhpcy5sYXN0Rm9jdXNFbCA9IGJ1dHRvbk9wZW47XG4gICAgICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSBgJHt0aGlzLl9kYXRhVmFsdWV9YDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2UgPSBlLnRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlQ2xvc2VCdXR0b259XWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFlLnRhcmdldC5jbG9zZXN0KCcjdW5jb25maXJtZWRBZ2VNb2RhbCcpICYmXG4gICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoJyNjb25maXJtQWdlTW9kYWwnKSAmJlxuICAgICAgICAgIChidXR0b25DbG9zZSB8fFxuICAgICAgICAgICAgKCFlLnRhcmdldC5jbG9zZXN0KGAuJHt0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbENvbnRlbnR9YCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW4pKVxuICAgICAgICApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2tleWRvd24nLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jbG9zZUVzYyAmJlxuICAgICAgICAgIGUud2hpY2ggPT0gMjcgJiZcbiAgICAgICAgICBlLmNvZGUgPT09ICdFc2NhcGUnICYmXG4gICAgICAgICAgdGhpcy5pc09wZW5cbiAgICAgICAgKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb2N1c0NhdGNoICYmIGUud2hpY2ggPT0gOSAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzQ2F0Y2goZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MuZ29IYXNoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2hhc2hjaGFuZ2UnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuVG9IYXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdsb2FkJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlblRvSGFzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBvcGVuKHNlbGVjdG9yVmFsdWUpIHtcbiAgICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcbiAgICAgIHRoaXMuYm9keUxvY2sgPVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykgJiYgIXRoaXMuaXNPcGVuXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RvclZhbHVlICYmXG4gICAgICAgIHR5cGVvZiBzZWxlY3RvclZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBzZWxlY3RvclZhbHVlLnRyaW0oKSAhPT0gJydcbiAgICAgICkge1xuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSBzZWxlY3RvclZhbHVlO1xuICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuX3Jlb3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fc2VsZWN0b3JPcGVuKVxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSB0aGlzLmxhc3RDbG9zZWQuc2VsZWN0b3I7XG4gICAgICBpZiAoIXRoaXMuX3Jlb3BlbikgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvclxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnlvdVR1YmVDb2RlKSB7XG4gICAgICAgICAgY29uc3QgY29kZVZpZGVvID0gdGhpcy55b3VUdWJlQ29kZTtcbiAgICAgICAgICBjb25zdCB1cmxWaWRlbyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2NvZGVWaWRlb30/cmVsPTAmc2hvd2luZm89MCZhdXRvcGxheT0xYDtcbiAgICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG5cbiAgICAgICAgICBjb25zdCBhdXRvcGxheSA9IHRoaXMub3B0aW9ucy5zZXRBdXRvcGxheVlvdXR1YmUgPyAnYXV0b3BsYXk7JyA6ICcnO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93JywgYCR7YXV0b3BsYXl9OyBlbmNyeXB0ZWQtbWVkaWFgKTtcblxuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybFZpZGVvKTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgeW91dHViZVBsYWNlID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fdGV4dCcpXG4gICAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGUoYCR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1gLCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYClcbiAgICAgICAgICAgIC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0SGFzaCgpO1xuICAgICAgICAgIHRoaXMuX3NldEhhc2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbi5iZWZvcmVPcGVuKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnYmVmb3JlbW9kYWxPcGVuJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxBY3RpdmUpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3Nlcy5ib2R5QWN0aXZlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Jlb3Blbikge1xuICAgICAgICAgIGNvbnN0IG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuaGFzaCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAoIXRoaXMuYm9keUxvY2sgJiYgIW0uaGFzQXR0cmlidXRlKCdkYXRhLWJsLW1vYmlsZScpKSB8fFxuICAgICAgICAgICAgKCF0aGlzLmJvZHlMb2NrICYmXG4gICAgICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCAmJlxuICAgICAgICAgICAgICBtLmhhc0F0dHJpYnV0ZSgnZGF0YS1ibC1tb2JpbGUnKSlcbiAgICAgICAgICAgICAgPyBib2R5TG9jaygpXG4gICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSBlbHNlIHRoaXMuX3Jlb3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvciA9IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvcjtcbiAgICAgICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudCA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9mb2N1c1RyYXAoKTtcbiAgICAgICAgfSwgNTApO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbi5hZnRlck9wZW4odGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdhZnRlcm1vZGFsT3BlbicsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2xvc2Uoc2VsZWN0b3JWYWx1ZSkge1xuICAgIGlmIChcbiAgICAgIHNlbGVjdG9yVmFsdWUgJiZcbiAgICAgIHR5cGVvZiBzZWxlY3RvclZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgc2VsZWN0b3JWYWx1ZS50cmltKCkgIT09ICcnXG4gICAgKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvciA9IHNlbGVjdG9yVmFsdWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc09wZW4gfHwgIWJvZHlMb2NrU3RhdHVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucy5vbi5iZWZvcmVDbG9zZSh0aGlzKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdiZWZvcmVtb2RhbENsb3NlJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnlvdVR1YmVDb2RlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgICkuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIHRoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQWN0aXZlXG4gICAgKTtcbiAgICAvLyBhcmlhLWhpZGRlblxuICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWYgKCF0aGlzLl9yZW9wZW4pIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5ib2R5QWN0aXZlXG4gICAgICApO1xuICAgICAgIXRoaXMuYm9keUxvY2sgPyBib2R5VW5sb2NrKCkgOiBudWxsO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlSGFzaCgpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rvck9wZW4pIHtcbiAgICAgIHRoaXMubGFzdENsb3NlZC5zZWxlY3RvciA9IHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yO1xuICAgICAgdGhpcy5sYXN0Q2xvc2VkLmVsZW1lbnQgPSB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50O1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMub24uYWZ0ZXJDbG9zZSh0aGlzKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdhZnRlcm1vZGFsQ2xvc2UnLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAoKTtcbiAgICB9LCA1MCk7XG4gIH1cbiAgX2dldEhhc2goKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MubG9jYXRpb24pIHtcbiAgICAgIHRoaXMuaGFzaCA9IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvci5pbmNsdWRlcygnIycpXG4gICAgICAgID8gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yXG4gICAgICAgIDogdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yLnJlcGxhY2UoJy4nLCAnIycpO1xuICAgIH1cbiAgfVxuICBfb3BlblRvSGFzaCgpIHtcbiAgICBsZXQgY2xhc3NJbkhhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3dpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyl9YFxuICAgIClcbiAgICAgID8gYC4ke3dpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyl9YFxuICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3dpbmRvdy5sb2NhdGlvbi5oYXNofWApXG4gICAgICA/IGAke3dpbmRvdy5sb2NhdGlvbi5oYXNofWBcbiAgICAgIDogbnVsbDtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaH1cIl1gXG4gICAgKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2h9XCJdYFxuICAgICAgICApXG4gICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaC5yZXBsYWNlKFxuICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgJyMnXG4gICAgICAgICAgKX1cIl1gXG4gICAgICAgICk7XG4gICAgaWYgKGJ1dHRvbnMgJiYgY2xhc3NJbkhhc2gpIHRoaXMub3BlbihjbGFzc0luSGFzaCk7XG4gIH1cbiAgX3NldEhhc2goKSB7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB0aGlzLmhhc2gpO1xuICB9XG4gIF9yZW1vdmVIYXNoKCkge1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXSk7XG4gIH1cbiAgX2ZvY3VzQ2F0Y2goZSkge1xuICAgIGNvbnN0IGZvY3VzYWJsZSA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbCk7XG4gICAgY29uc3QgZm9jdXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZSk7XG4gICAgY29uc3QgZm9jdXNlZEluZGV4ID0gZm9jdXNBcnJheS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICBmb2N1c0FycmF5W2ZvY3VzQXJyYXkubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKCFlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gZm9jdXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICBmb2N1c0FycmF5WzBdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIF9mb2N1c1RyYXAoKSB7XG4gICAgY29uc3QgZm9jdXNhYmxlID0gdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzRWwpO1xuICAgIGlmICghdGhpcy5pc09wZW4gJiYgdGhpcy5sYXN0Rm9jdXNFbCkge1xuICAgICAgdGhpcy5sYXN0Rm9jdXNFbC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb2N1c2FibGVbMF0uZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlcy5tb2RhbCA9IG5ldyBNb2RhbCh7fSk7XG4iLCJpbXBvcnQgU2ltcGxlQmFyIGZyb20gJ3NpbXBsZWJhcic7XG5pbXBvcnQgJ3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3MnO1xuaW1wb3J0IHsgX3NsaWRlVXAsIF9zbGlkZURvd24sIF9zbGlkZVRvZ2dsZSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgLy8gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBjdXN0b20gc2VsZWN0IGNsYXNzZXNcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICAvLyBodG1sIGJ1aWxkIGNsYXNzZXNcbiAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXG4gICAgICBCT0RZOiAnc2VsZWN0X19ib2R5JyxcbiAgICAgIExBQkVMOiAnc2VsZWN0X19sYWJlbCcsXG4gICAgICBUSVRMRTogJ3NlbGVjdF9fdGl0bGUnLFxuICAgICAgVkFMVUU6ICdzZWxlY3RfX3ZhbHVlJyxcbiAgICAgIENPTlRFTlQ6ICdzZWxlY3RfX2NvbnRlbnQnLFxuICAgICAgT1BUSU9OUzogJ3NlbGVjdF9fb3B0aW9ucycsXG4gICAgICBPUFRJT046ICdzZWxlY3RfX29wdGlvbicsXG4gICAgICBTQ1JPTEw6ICdzZWxlY3RfX3Njcm9sbCcsXG4gICAgICBHUk9VUDogJ3NlbGVjdF9fZ3JvdXAnLFxuICAgICAgSU5QVVQ6ICdzZWxlY3RfX2lucHV0JyxcbiAgICAgIEFTU0VUOiAnc2VsZWN0X19hc3NldCcsXG4gICAgICBUWFQ6ICdzZWxlY3RfX3RleHQnLFxuXG4gICAgICAvLyBzdGF0ZSBjbGFzc2VzXG4gICAgICBJU19BQ1RJVkU6ICdfaXMtYWN0aXZlJyxcbiAgICAgIElTX0ZPQ1VTRUQ6ICdfaXMtZm9jdXNlZCcsXG4gICAgICBJU19PUEVORUQ6ICdfaXMtb3BlbmVkJyxcbiAgICAgIElTX0ZJTExFRDogJ19pcy1maWxsZWQnLFxuICAgICAgSVNfU0VMRUNURUQ6ICdfaXMtc2VsZWN0ZWQnLFxuICAgICAgSVNfRElTQUJMRUQ6ICdfaXMtZGlzYWJsZWQnLFxuXG4gICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXNcbiAgICAgIEhBU19MSVNUOiAnX2hhcy1saXN0JyxcbiAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgSEFTX01VTFRJUExFOiAnX2hhcy1tdWx0aXBsZScsXG4gICAgICBIQVNfQ0hFQ0tCT1g6ICdfaGFzLWNoZWNrYm94JyxcbiAgICAgIEhBU19MQUJFTDogJ19oYXMtbGFiZWwnLFxuICAgIH07XG5cbiAgICAvLyBhbGwgc2VsZWN0IGl0ZW1zXG4gICAgY29uc3Qgc2VsZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpO1xuICAgIGlmIChzZWxlY3RMaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0KHNlbGVjdExpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNlbGVjdCBpbml0aWFsaXphdGlvbiAmIGJ1aWxkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXRpYWxpemF0aW9uXG4gIGluaXQoc2VsZWN0TGlzdCkge1xuICAgIC8vIGluaXRcbiAgICBzZWxlY3RMaXN0LmZvckVhY2goKHNlbGVjdCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5pdFNlbEl0ZW0oc2VsZWN0LCBpbmRleCArIDEpO1xuICAgIH0pO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAna2V5ZG93bicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNpbicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNvdXQnLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuICAvLyBzaW5nbGUgc2VsZWN0IGl0ZW0gaW5pdGlhbGl6YXRpb25cbiAgaW5pdFNlbEl0ZW0ocmVsYXRpdmVTZWwsIGluZGV4KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLlNFTEVDVCk7XG4gICAgcmVsYXRpdmVTZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKHJlbGF0aXZlU2VsKTtcbiAgICByZWxhdGl2ZVNlbC5oaWRkZW4gPSB0cnVlO1xuICAgIGluZGV4ID8gKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSWQgPSBpbmRleCkgOiBudWxsO1xuXG4gICAgaWYgKHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpKSB7XG4gICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lm9wdFBsYWNlaG9sZGVyID1cbiAgICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkudmFsdWU7XG4gICAgICBpZiAodGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwuc2hvdykge1xuICAgICAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuICAgICAgICBzZWxUaXRsZS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgJ2FmdGVyYmVnaW4nLFxuICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLkxBQkVMfVwiPiR7XG4gICAgICAgICAgICB0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5sYWJlbC50ZXh0XG4gICAgICAgICAgICAgID8gdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwudGV4dFxuICAgICAgICAgICAgICA6IHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLnZhbHVlXG4gICAgICAgICAgfTwvc3Bhbj5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGVjdC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQk9EWX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAke1xuICAgICAgICAgICAgICAgICAgICAgICFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSA/ICdoaWRkZW4nIDogJydcbiAgICAgICAgICAgICAgICAgICAgfSAgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT05TfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICApO1xuXG4gICAgdGhpcy5idWlsZChyZWxhdGl2ZVNlbCk7XG5cbiAgICByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zcGVlZFxuICAgICAgPyByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkXG4gICAgICA6ICcxNTAnO1xuICAgIHJlbGF0aXZlU2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBfdGhpcy5pbml0U2VsZWN0aW9ucyhlKTtcbiAgICB9KTtcbiAgfVxuICAvLyBzZWxlY3QgYnVpbGRcbiAgYnVpbGQocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3QgPSByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50O1xuXG4gICAgLy8gc2V0IGlkXG4gICAgc2VsZWN0LmRhdGFzZXQuc2VsSWQgPSByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbElkO1xuICAgIC8vIHNldCB2YWx1ZVxuICAgIHRoaXMuc2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IG9wdGlvbnNcbiAgICB0aGlzLnNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IGNzcyBtb2RpZmljYXRvclxuICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsQWRkb25DbGFzc1xuICAgICAgPyBzZWxlY3QuY2xhc3NMaXN0LmFkZChgc2VsZWN0XyR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxBZGRvbkNsYXNzfWApXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IGNsYXNzIGlmIHNlbGVjdCBpcyBtdWx0aXBsZVxuICAgIHJlbGF0aXZlU2VsLm11bHRpcGxlXG4gICAgICA/IHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpXG4gICAgICA6IHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpO1xuICAgIC8vIHNldCBjbGFzcyBpZiBzZWxlY3QgY2hlY2tib3hlcyBhcmUgc2V0XG4gICAgcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1jaGVja2JveGVzJykgJiYgcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgID8gc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWClcbiAgICAgIDogc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWCk7XG4gICAgLy8gZGlzYWJsZSBzZWxlY3RcbiAgICB0aGlzLmRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zIGlmIGRhdGEtc2VsLXNlYXJjaCBpcyBzZXRcbiAgICByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXNlYXJjaCcpXG4gICAgICA/IHRoaXMuc2V0U2VhcmNoQWN0aW9ucyhzZWxlY3QpXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IHNlbGVjdCBhY3Rpb25zIGlmIGl0J3MgaW5pdGlhbGx5IG9wZW5lZFxuICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtb3BlbmVkJykgPyB0aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcblxuICAgIC8vIHNldCBzZWxlY3QgaGludFxuICAgIGlmIChyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnQpIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzZWxlY3RfX2hpbnRcIj4ke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludH08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHNob3cgLyBoaWRlIHNlbGVjdGlvbiBmcm9tIHNlbGVjdCB0aXRsZVxuICAgIGlmIChyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2hvdy12YWwnKSkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHR3aW4gc2VsZWN0IHRpdGxlIHZhbHVlXG4gIHNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxCb2R5ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuQk9EWSkudHdpblNlbDtcbiAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuXG4gICAgaWYgKHNlbFRpdGxlKSBzZWxUaXRsZS5yZW1vdmUoKTtcbiAgICBzZWxCb2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdhZnRlcmJlZ2luJyxcbiAgICAgIHRoaXMuZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbClcbiAgICApO1xuICB9XG4gIC8vIHNldCB0d2luIHNlbGVjdCBvcHRpb25zXG4gIHNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcbiAgICBjb25zdCByZWxhdGl2ZVNlbE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdChcbiAgICAgIHNlbGVjdCxcbiAgICAgIHRoaXMuY2xhc3Nlcy5PUFRJT05TXG4gICAgKS5yZWxhdGl2ZVNlbDtcbiAgICBvcHRpb25zLmlubmVySFRNTCA9IHRoaXMuZ2V0T3B0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmdldE9wdGlvbnMocmVsYXRpdmVTZWwpO1xuICAgIH0pO1xuICAgIGlmIChyZWxhdGl2ZVNlbE9wdGlvbnMucXVlcnlTZWxlY3RvcignW3NlbGVjdGVkXScpKSB7XG4gICAgICBvcHRpb25zXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmNsYXNzZXMuT1BUSU9OfWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgfVxuICB9XG4gIC8vIGRpc2FibGUgc2VsZWN0XG4gIGRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGlmIChyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gbWFpbiBhY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gc2V0IG1haW4gYWN0aW9uc1xuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBjb25zdCB0eXBlID0gZS50eXBlO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuU0VMRUNUKSkgfHxcbiAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IHRhcmdldC5jbG9zZXN0KCcuc2VsZWN0JylcbiAgICAgICAgPyB0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdCcpXG4gICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuc2VsfVtkYXRhLXNlbC1pZD1cIiR7XG4gICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSkuZGF0YXNldFxuICAgICAgICAgICAgICAgIC5zZWxlY3RJZFxuICAgICAgICAgICAgfVwiXWBcbiAgICAgICAgICApO1xuICAgICAgY29uc3QgcmVsYXRpdmVTZWwgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QpLnJlbGF0aXZlU2VsO1xuICAgICAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVCkpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxMaXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbE9wdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuU0VMRUNUfVtkYXRhLXNlbC1pZD1cIiR7c2VsTGlzdC5kYXRhc2V0LnNlbElkfVwiXSAuc2VsZWN0X19vcHRpb25bZGF0YS1vcHQtdmFsPVwiJHtzZWxMaXN0LmRhdGFzZXQub3B0VmFsfVwiXWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBzZWxPcHRpb24pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuVElUTEUpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb24oc2VsZWN0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTikpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxPcHRpb24gPSB0YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuT1BUSU9OKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uQWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwsIHNlbE9wdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb2N1c2luJyB8fCB0eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5TRUxFQ1QpKSkge1xuICAgICAgICAgIGlmICh0eXBlID09PSAnZm9jdXNpbicpIHtcbiAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GT0NVU0VEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZPQ1VTRUQpO1xuICAgICAgICAgICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpKSB7XG4gICAgICAgICAgICAgIGlmICghc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdrZXlkb3duJyAmJiBlLmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHRoaXMuY2xvc2VHcm91cCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlR3JvdXAoKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHNpbmdsZSBzZWxlY3QgYWN0aW9uXG4gIHNldEFjdGlvbihzZWxlY3QpIHtcbiAgICBjb25zdCByZWxhdGl2ZVNlbCA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCkucmVsYXRpdmVTZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLk9QVElPTlMpLnR3aW5TZWw7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0LXNpbmdsZV0nKSkge1xuICAgICAgY29uc3Qgc2VsZWN0T25lR3JvdXAgPSByZWxhdGl2ZVNlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Qtc2luZ2xlXScpO1xuICAgICAgdGhpcy5jbG9zZUdyb3VwKHNlbGVjdE9uZUdyb3VwLCByZWxhdGl2ZVNlbCk7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxPcHRpb25zLmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpO1xuICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSlcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpICYmXG4gICAgICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpICYmXG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkhBU19FUlJPUilcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbW92ZUVycihyZWxhdGl2ZVNlbCwgc2VsZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2xvc2Ugc2luZ2xlIHNlbGVjdCBncm91cFxuICBjbG9zZUdyb3VwKGdyb3VwLCBzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxHcm91cCA9IGdyb3VwID8gZ3JvdXAgOiBkb2N1bWVudDtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gc2VsR3JvdXAucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLlNFTEVDVCl9JHt0aGlzLmdldENsYXNzKFxuICAgICAgICB0aGlzLmNsYXNzZXMuSVNfT1BFTkVEXG4gICAgICApfWBcbiAgICApO1xuICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhc2VsZWN0IHx8XG4gICAgICAgICAgKHNlbGVjdCAmJiBzZWxlY3Rpb24uZGF0YXNldC5zZWxJZCAhPT0gc2VsZWN0LmRhdGFzZXQuc2VsSWQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2xvc2VJdGVtKHNlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyBjbG9zZSBzaW5nbGUgc2VsZWN0IGl0ZW1cbiAgY2xvc2VJdGVtKHNlbGVjdCkge1xuICAgIGNvbnN0IHJlbGF0aXZlU2VsID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0KS5yZWxhdGl2ZVNlbDtcbiAgICBjb25zdCBzZWxPcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcblxuICAgIGlmICghc2VsT3B0aW9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfT1BFTkVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5vLXNsaWRlJykpXG4gICAgICAgIF9zbGlkZVVwKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgc2luZ2xlIG9wdGlvbiBhY3Rpb25zXG4gIHNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBvcHRpb24pIHtcbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgICBjb25zdCByZWxhdGl2ZVNlbGVjdGlvbnMgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzO1xuXG4gICAgICByZWxhdGl2ZVNlbGVjdGlvbnMuZm9yRWFjaChyZWxhdGl2ZVNlbGVjdGlvbiA9PiB7XG4gICAgICAgIHJlbGF0aXZlU2VsZWN0aW9uLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0d2luU2VsZWN0aW9ucyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICB0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRClcbiAgICAgICk7XG4gICAgICB0d2luU2VsZWN0aW9ucy5mb3JFYWNoKHR3aW5TZWxlY3Rpb24gPT4ge1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3R3aW5TZWxlY3Rpb24uZGF0YXNldC5vcHRWYWx9XCJdYClcbiAgICAgICAgICAuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIW9wdGlvbi5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICByZWxhdGl2ZVNlbC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICApO1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9fb3B0aW9uJylcbiAgICAgICAgLmZvckVhY2gob3B0ID0+IG9wdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCkpO1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdC5xdWVyeVNlbGVjdG9yKGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gXG4gICAgICAgICAgKS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlU2VsLnZhbHVlID0gb3B0aW9uLmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHQtdmFsJylcbiAgICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRWYWxcbiAgICAgICAgOiBvcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICB0aGlzLnNldEFjdGlvbihzZWxlY3QpO1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zXG4gIHNldFNlYXJjaEFjdGlvbnMoc2VsZWN0KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbElucHV0ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuSU5QVVQpLnR3aW5TZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KFxuICAgICAgc2VsZWN0LFxuICAgICAgdGhpcy5jbGFzc2VzLk9QVElPTlNcbiAgICApLnR3aW5TZWwucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jbGFzc2VzLk9QVElPTn1gKTtcblxuICAgIHNlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsT3B0aW9ucy5mb3JFYWNoKHNlbE9wdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxPcHRpb24udGV4dENvbnRlbnRcbiAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAuaW5kZXhPZihzZWxJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbE9wdGlvbi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxPcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZWxPcHRpb25zLmhpZGRlbiA9PT0gdHJ1ZSA/IF90aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuICAvLyBzZXQgc2VsZWN0IHN1YnRpdGxlXG4gIHNldFN1YnRpdGxlKHJlbGF0aXZlU2VsKSB7fVxuXG4gIC8vIHZhbGlkYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGFkZCBhbiBlcnJvciB0byBhIHNlbGVjdFxuICBhZGRFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsRXJyb3IgJiYgIXJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludCkge1xuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICBgPGRpdiBjbGFzcz1cInNlbGVjdF9faGludFwiPiR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxFcnJvcn08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvLyByZW1vdmUgYW4gZXJyb3IgZnJvbSBhIHNlbGVjdFxuICByZW1vdmVFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19oaW50JykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnRcbiAgICApIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faGludCcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGdldCBjdXN0b20gY2xhc3NcbiAgZ2V0Q2xhc3MoY3NzQ2xhc3MpIHtcbiAgICByZXR1cm4gYC4ke2Nzc0NsYXNzfWA7XG4gIH1cbiAgLy8gZ2V0IHNpbmdsZSBzZWxlY3QgaXRlbVxuICBnZXRTZWxlY3Qoc2VsZWN0LCBjc3NDbGFzcykge1xuICAgIHJldHVybiB7XG4gICAgICByZWxhdGl2ZVNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLFxuICAgICAgdHdpblNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRDbGFzcyhjc3NDbGFzcykpLFxuICAgIH07XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdGVkIGl0ZW0gdmFsdWVcbiAgZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGxldCBhdHRyLFxuICAgICAgYXR0ckNsYXNzLFxuICAgICAgdGl0bGVWYWwgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwsIDIpLmh0bWw7XG5cbiAgICAvLyBzZXQgdGl0bGUgdmFsdWVcbiAgICB0aXRsZVZhbCA9IHRpdGxlVmFsLmxlbmd0aFxuICAgICAgPyB0aXRsZVZhbFxuICAgICAgOiByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbExhYmVsXG4gICAgICA/IHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWxcbiAgICAgIDogJyc7XG5cbiAgICAvLyBzZXQgYWN0aXZlIGNsYXNzIHRvIHNlbGVjdCBpZiBpdCBjb250YWlucyBhbnkgdmFsdWVzXG4gICAgaWYgKHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbCkudmFsdWVzLmxlbmd0aCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0FDVElWRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19BQ1RJVkUpO1xuICAgIH1cblxuICAgIC8vIHNldCBzZWxlY3QgbGFiZWxcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1sYWJlbCcpKSB7XG4gICAgICBhdHRyID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxMYWJlbFxuICAgICAgICA/IGAgZGF0YS1zZWwtbGFiZWw9XCIke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWx9XCJgXG4gICAgICAgIDogYCBkYXRhLXNlbC1sYWJlbD1cItCS0YvQsdC+0YBcImA7XG4gICAgICBhdHRyQ2xhc3MgPSBgICR7dGhpcy5jbGFzc2VzLkhBU19MQUJFTH1gO1xuICAgIH1cblxuICAgIC8vIHB1c2ggc2VsZWN0aW9ucyB0byB0aGUgbGlzdCBpbnNpZGUgb2Ygc2VsZWN0IHRpdGxlXG4gICAgaWYgKHJlbGF0aXZlU2VsLm11bHRpcGxlICYmIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtbGlzdCcpKSB7XG4gICAgICB0aXRsZVZhbCA9IHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbClcbiAgICAgICAgLmVsZW1lbnRzLm1hcChcbiAgICAgICAgICBvcHRpb24gPT5cbiAgICAgICAgICAgIGA8c3BhbiBkYXRhLW9wdC1pZD1cIiR7c2VsZWN0LmRhdGFzZXQuc2VsSWR9XCIgZGF0YS1vcHQtdmFsPVwiJHtcbiAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlXG4gICAgICAgICAgICB9XCIgY2xhc3M9XCJfbGlzdC1pdGVtXCI+JHt0aGlzLmdldENvbnRlbnQob3B0aW9uKX08L3NwYW4+YFxuICAgICAgICApXG4gICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgaWYgKFxuICAgICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpXG4gICAgICApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpLmlubmVySFRNTCA9IHRpdGxlVmFsO1xuICAgICAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkgdGl0bGVWYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0IHNlbGVjdCBzZWFyY2hcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkge1xuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHthdHRyfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFVUV9XCI+PGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgZGF0YS1wbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5JTlBVVH1cIj48L3NwYW4+PC9kaXY+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3VzdG9tQ2xhc3MgPVxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3NcbiAgICAgICAgICA/IGAgJHt0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgICAgIDogJyc7XG4gICAgICByZXR1cm4gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHtcbiAgICAgICAgYXR0ciA/IGF0dHIgOiAnJ1xuICAgICAgfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFfSAke1xuICAgICAgICBhdHRyQ2xhc3MgPyBhdHRyQ2xhc3MgOiAnJ1xuICAgICAgfVwiPjxzcGFuIGNsYXNzPVwiJHtcbiAgICAgICAgdGhpcy5jbGFzc2VzLkNPTlRFTlRcbiAgICAgIH0ke2N1c3RvbUNsYXNzfVwiPiR7dGl0bGVWYWx9PC9zcGFuPjwvc3Bhbj48L2J1dHRvbj5gO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgb3B0aW9uc1xuICBnZXRPcHRpb25zKHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsU2Nyb2xsID0gcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zY3JvbGwnKVxuICAgICAgPyBgZGF0YS1zaW1wbGViYXJgXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IGRhdGEgPSBzZWxTY3JvbGxcbiAgICAgID8gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxTY3JvbGwudHJpbSgpLnNwbGl0KCcsJylcbiAgICAgIDogbnVsbDtcbiAgICBsZXQgc2VsU2Nyb2xsSGVpZ2h0ID1cbiAgICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsU2Nyb2xsICYmIGRhdGFcbiAgICAgICAgPyBgc3R5bGU9XCJtYXgtaGVpZ2h0OiR7d2luZG93LmlubmVyV2lkdGggPiA3NjggPyBkYXRhWzBdIDogZGF0YVsxXX1yZW1cImBcbiAgICAgICAgOiAnJztcbiAgICBsZXQgc2VsT3B0aW9ucyA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucyk7XG5cbiAgICBpZiAoc2VsT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGxldCBzZWxPcHRpb25zSFRNTCA9IGBgO1xuXG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKSAmJlxuICAgICAgICAgICF0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5zaG93KSB8fFxuICAgICAgICByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgKSB7XG4gICAgICAgIHNlbE9wdGlvbnMgPSBzZWxPcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbFxuICAgICAgICA/IGA8ZGl2ICR7c2VsU2Nyb2xsfSAke3NlbFNjcm9sbEhlaWdodH0gZGF0YS1zZWwtc2Nyb2xsPVwiJHtyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbFNjcm9sbH1cIiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlNDUk9MTH1cIj5gXG4gICAgICAgIDogJyc7XG4gICAgICBzZWxPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgc2VsT3B0aW9uc0hUTUwgKz0gdGhpcy5nZXRPcHRpb24ob3B0aW9uLCByZWxhdGl2ZVNlbCk7XG4gICAgICB9KTtcbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbCA/IGA8L2Rpdj5gIDogJyc7XG4gICAgICByZXR1cm4gc2VsT3B0aW9uc0hUTUw7XG4gICAgfVxuICB9XG4gIC8vIGdldCBvcHRpb25cbiAgZ2V0T3B0aW9uKG9wdGlvbiwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25zID1cbiAgICAgIG9wdGlvbi5zZWxlY3RlZCAmJiByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGAgJHt0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUR9YFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNob3dTZWxlY3Rpb24gPVxuICAgICAgb3B0aW9uLnNlbGVjdGVkICYmXG4gICAgICAhcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGBoaWRkZW5gXG4gICAgICAgIDogYGA7XG4gICAgY29uc3Qgb3B0aW9uQ2xhc3MgPSBvcHRpb24uZGF0YXNldC5vcHRDbGFzc1xuICAgICAgPyBgICR7b3B0aW9uLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgOiAnJztcbiAgICBjb25zdCBvcHRpb25MaW5rID0gb3B0aW9uLmRhdGFzZXQub3B0aW9uTGlua1xuICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRpb25MaW5rXG4gICAgICA6IGZhbHNlO1xuICAgIGNvbnN0IG9wdGlvbkxpbmtUYXJnZXQgPSBvcHRpb24uaGFzQXR0cmlidXRlKCdkYXRhLW9wdGlvbi1saW5rLXRhcmdldCcpXG4gICAgICA/IGB0YXJnZXQ9XCJfYmxhbmtcImBcbiAgICAgIDogJyc7XG4gICAgbGV0IG9wdGlvbkhUTUwgPSBgYDtcblxuICAgIG9wdGlvbkhUTUwgKz0gb3B0aW9uTGlua1xuICAgICAgPyBgPGEgJHtvcHRpb25MaW5rVGFyZ2V0fSAke3Nob3dTZWxlY3Rpb259IGhyZWY9XCIke29wdGlvbkxpbmt9XCIgZGF0YS1vcHQtdmFsPVwiJHtvcHRpb24udmFsdWV9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT059JHtvcHRpb25DbGFzc30ke3NlbGVjdGlvbnN9XCI+YFxuICAgICAgOiBgPGJ1dHRvbiAke3Nob3dTZWxlY3Rpb259IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuT1BUSU9OfSR7b3B0aW9uQ2xhc3N9JHtzZWxlY3Rpb25zfVwiIGRhdGEtb3B0LXZhbD1cIiR7b3B0aW9uLnZhbHVlfVwiIHR5cGU9XCJidXR0b25cIj5gO1xuICAgIG9wdGlvbkhUTUwgKz0gdGhpcy5nZXRDb250ZW50KG9wdGlvbik7XG4gICAgb3B0aW9uSFRNTCArPSBvcHRpb25MaW5rID8gYDwvYT5gIDogYDwvYnV0dG9uPmA7XG4gICAgcmV0dXJuIG9wdGlvbkhUTUw7XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdCBjb250ZW50XG4gIGdldENvbnRlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uRGF0YSA9IG9wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0XG4gICAgICA/IGAke29wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0fWBcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgb3B0aW9uRGF0YUhUTUwgPVxuICAgICAgb3B0aW9uRGF0YS5pbmRleE9mKCdpbWcnKSA+PSAwXG4gICAgICAgID8gYDxpbWcgc3JjPVwiJHtvcHRpb25EYXRhfVwiIGFsdD1cIlwiPmBcbiAgICAgICAgOiBvcHRpb25EYXRhO1xuICAgIGxldCBvcHRpb25Db250ZW50SFRNTCA9IGBgO1xuXG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YVxuICAgICAgPyBgPHNwYW4gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5HUk9VUH1cIj5gXG4gICAgICA6ICcnO1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGFcbiAgICAgID8gYDxzcGFuIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQVNTRVR9XCI+YFxuICAgICAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gb3B0aW9uRGF0YUhUTUwgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlRYVH1cIj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uLnRleHRDb250ZW50O1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGEgPyBgPC9zcGFuPmAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgcmV0dXJuIG9wdGlvbkNvbnRlbnRIVE1MO1xuICB9XG4gIC8vIGdldCBzZWxlY3QgcGxhY2Vob2xkZXJcbiAgZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucykuZmluZChcbiAgICAgIG9wdGlvbiA9PiAhb3B0aW9uLnZhbHVlXG4gICAgKTtcblxuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuc3VidGl0bGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHBsYWNlaG9sZGVyLnRleHRDb250ZW50LFxuICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoLXNob3cnKSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoJyksXG4gICAgICAgICAgdGV4dDogcGxhY2Vob2xkZXIuZGF0YXNldC5vcHRQbGFjZWhvbGRlcixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8vIGdldCBzZWxlY3RlZCBvcHRpb25zIGRhdGFcbiAgZ2V0RGF0YShyZWxhdGl2ZVNlbCkge1xuICAgIGxldCBzZWxlY3Rpb25zID0gW107XG5cbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIHNlbGVjdGlvbnMgPSBBcnJheS5mcm9tKHJlbGF0aXZlU2VsLm9wdGlvbnMpXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9ucy5wdXNoKHJlbGF0aXZlU2VsLm9wdGlvbnNbcmVsYXRpdmVTZWwuc2VsZWN0ZWRJbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudHM6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24pLFxuICAgICAgdmFsdWVzOiBzZWxlY3Rpb25zXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKSxcbiAgICAgIGh0bWw6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiB0aGlzLmdldENvbnRlbnQob3B0aW9uKSksXG4gICAgfTtcbiAgfVxuXG4gIC8vIHNlbGVjdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXQgc2VsZWN0aW9uc1xuICBpbml0U2VsZWN0aW9ucyhlKSB7XG4gICAgY29uc3QgcmVsYXRpdmVTZWwgPSBlLnRhcmdldDtcblxuICAgIHRoaXMuYnVpbGQocmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdGlvbnNcbiAgc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IHNlbGVjdCA9IHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXN1Ym1pdCcpICYmIHJlbGF0aXZlU2VsLnZhbHVlKSB7XG4gICAgICBsZXQgdGVtcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgdGVtcEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICByZWxhdGl2ZVNlbC5jbG9zZXN0KCdmb3JtJykuYXBwZW5kKHRlbXBCdXR0b24pO1xuICAgICAgdGVtcEJ1dHRvbi5jbGljaygpO1xuICAgICAgdGVtcEJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgIHRoaXMuc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICB9XG4gIC8vIGN1c3RvbSBzZWxlY3QgZXZlbnQgKGxpc3RlbiB0byBhbnkgc2VsZWN0aW9ucyAvIG11dGF0aW9ucylcbiAgc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3Rpb24nLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdDogcmVsYXRpdmVTZWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxubmV3IFNlbGVjdCh7fSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJykubGVuZ3RoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKS5mb3JFYWNoKHNjcm9sbEJsb2NrID0+IHtcbiAgICBuZXcgU2ltcGxlQmFyKHNjcm9sbEJsb2NrLCB7XG4gICAgICBhdXRvSGlkZTogZmFsc2UsXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIiwiaW1wb3J0IHsgc2V0SGFzaCwgZ2V0SGFzaCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBUYWJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIFRBQlM6ICdkYXRhLXRhYnMnLFxuICAgICAgSU5ERVg6ICdkYXRhLXRhYnMtaW5kZXgnLFxuICAgICAgVElUTEVTOiAnZGF0YS10YWJzLXRpdGxlcycsXG4gICAgICBUSVRMRTogJ2RhdGEtdGFicy10aXRsZScsXG4gICAgICBUQUJfSVRFTTogJ2RhdGEtdGFicy1pdGVtJyxcbiAgICAgIEJPRFk6ICdkYXRhLXRhYnMtYm9keScsXG4gICAgICBIQVNIOiAnZGF0YS10YWJzLWhhc2gnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSU5JVDogJ190YWJzLWluaXQnLFxuICAgICAgQUNUSVZFOiAnX2lzLWFjdGl2ZScsXG4gICAgICBNT0RBTDogJ21vZGFsJyxcbiAgICB9O1xuICAgIHRoaXMudGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhYnNdYCk7XG4gICAgdGhpcy5hY3RpdmVIYXNoID0gW107XG5cbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGFzaCA9IGdldEhhc2goKTtcblxuICAgICAgaWYgKGhhc2ggJiYgaGFzaC5zdGFydHNXaXRoKCd0YWItJykpIHtcbiAgICAgICAgYWN0aXZlSGFzaCA9IGhhc2gucmVwbGFjZSgndGFiLScsICcnKS5zcGxpdCgnLScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFic0Jsb2NrLCBpbmRleCkgPT4ge1xuICAgICAgICB0YWJzQmxvY2suY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRhYnNCbG9jay5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5JTkRFWCwgaW5kZXgpO1xuICAgICAgICB0YWJzQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaW5pdCh0YWJzQmxvY2spO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdHVzKHRhYnNCbG9jaykge1xuICAgIGxldCB0aXRsZXMgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCk7XG4gICAgbGV0IGNvbnRlbnQgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5UQUJfSVRFTX1dYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc0hhc2ggPSB0YWJzQmxvY2suaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSEFTSCk7XG5cbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmR4KSA9PiB7XG4gICAgICAgIGlmICh0aXRsZXNbaW5keF0uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChoYXNIYXNoICYmICFpdGVtLmNsb3Nlc3QoYC4ke3RoaXMuY2xhc3Nlcy5NT0RBTH1gKSkge1xuICAgICAgICAgICAgc2V0SGFzaChgdGFiLSR7aW5kZXh9LSR7aW5keH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCkpIHtcbiAgICAgIGNvbnN0IHRpdGxlID0gdGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgICAgY29uc3QgdGFic0Jsb2NrID0gdGl0bGUuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKTtcblxuICAgICAgaWYgKCF0aXRsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSkpIHtcbiAgICAgICAgbGV0IGFjdGl2ZVRpdGxlID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEV9XS4ke3RoaXMuY2xhc3Nlcy5BQ1RJVkV9YFxuICAgICAgICApO1xuXG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gKGFjdGl2ZVRpdGxlID0gQXJyYXkuZnJvbShhY3RpdmVUaXRsZSkuZmlsdGVyKFxuICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICAgICAgICApKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgYWN0aXZlVGl0bGUubGVuZ3RoXG4gICAgICAgICAgPyBhY3RpdmVUaXRsZVswXS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0YWJzQmxvY2spO1xuICAgICAgfVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEVTfV0+KmApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuQk9EWX1dPipgKTtcbiAgICBjb25zdCBpbmRleCA9IHRhYnNCbG9jay5kYXRhc2V0LnRhYnNJbmRleDtcbiAgICBjb25zdCBhY3RpdmVIYXNoQmxvY2sgPSB0aGlzLmFjdGl2ZUhhc2hbMF0gPT0gaW5kZXg7XG5cbiAgICBpZiAoYWN0aXZlSGFzaEJsb2NrKSB7XG4gICAgICBjb25zdCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgWyR7dGhpcy5hdHRycy5USVRMRVN9XT4uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICk7XG4gICAgICBhY3RpdmVUaXRsZSA/IGFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkFDVElWRSkgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50Lmxlbmd0aCkge1xuICAgICAgY29udGVudCA9IEFycmF5LmZyb20oY29udGVudCkuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICApO1xuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0aXRsZXNbaW5kZXhdLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRJVExFLCAnJyk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuVEFCX0lURU0sICcnKTtcblxuICAgICAgICBpZiAoYWN0aXZlSGFzaEJsb2NrICYmIGluZGV4ID09IHRoaXMuYWN0aXZlSGFzaFsxXSkge1xuICAgICAgICAgIHRpdGxlc1tpbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmhpZGRlbiA9ICF0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgVGFicygpO1xuIiwiLyoqXG4gKiBzZXQgaGFzaCB0byB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRIYXNoID0gaGFzaCA9PiB7XG4gIGhhc2ggPSBoYXNoID8gYCMke2hhc2h9YCA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF07XG4gIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgaGFzaCk7XG59O1xuXG4vKipcbiAqIGdldCBoYXNoIGZyb20gdXJsXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEhhc2ggPSAoKSA9PiB7XG4gIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUluaXQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJykpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoYm9keUxvY2tTdGF0dXMgJiYgZS50YXJnZXQuY2xvc2VzdCgnLmhhbWJ1cmdlcicpKSB7XG4gICAgICAgIG1lbnVPcGVuKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2R5TG9ja1N0YXR1cyAmJlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfbWVudS1vcGVuZWQnKSAmJlxuICAgICAgICAoZS50YXJnZXQuY2xvc2VzdCgnLm1lbnVfX2Nsb3NlLWJ0bicpIHx8ICFlLnRhcmdldC5jbG9zZXN0KCcubWVudScpKVxuICAgICAgKSB7XG4gICAgICAgIG1lbnVDbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuLyoqXG4gKiBvcGVucyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIGJvZHlMb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdfbWVudS1vcGVuZWQnKTtcbn07XG4vKipcbiAqIGNsb3NlcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUNsb3NlID0gKCkgPT4ge1xuICBib2R5VW5sb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdfbWVudS1vcGVuZWQnKTtcbn07XG5cbi8vIGJvZHkgbG9ja1xuZXhwb3J0IGxldCBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4vKipcbiAqIHRvZ2dsZXMgYm9keSBsb2NrXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrVG9nZ2xlID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykpIHtcbiAgICBib2R5VW5sb2NrKGRlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBib2R5TG9jayhkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIHVubG9ja3MgYm9keVxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBib2R5VW5sb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2snKTtcbiAgICB9LCBkZWxheSk7XG4gICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcbiAgICB9LCBkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIGxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keUxvY2sgPSAoZGVsYXkgPSA1MDApID0+IHtcbiAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcblxuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuXG4vKipcbiAqIG1ha2UgdGhlIGFycmF5IHVuaXF1ZVxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheShhcnJheSkge1xuICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhU2V0VmFsdWVcbiAqIHByb2Nlc3MgbWVkaWEgcmVxdWVzdHMgZnJvbSBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTWVkaWFRdWVyaWVzID0gKGFycmF5LCBkYXRhU2V0VmFsdWUpID0+IHtcbiAgLy8gZ2V0IG9iamVjdHMgd2l0aCBtZWRpYSBxdWVyaWVzXG4gIGNvbnN0IG1lZGlhID0gQXJyYXkuZnJvbShhcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIGlmIChpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXSkge1xuICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldFtkYXRhU2V0VmFsdWVdLnNwbGl0KCcsJylbMF07XG4gICAgfVxuICB9KTtcbiAgLy8gb2JqZWN0cyB3aXRoIG1lZGlhIHF1ZXJpZXMgaW5pdGlhbGl6YXRpb25cbiAgaWYgKG1lZGlhLmxlbmd0aCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzQXJyYXkgPSBbXTtcbiAgICBtZWRpYS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV07XG4gICAgICBjb25zdCBicmVha3BvaW50ID0ge307XG4gICAgICBjb25zdCBwYXJhbXNBcnJheSA9IHBhcmFtcy5zcGxpdCgnLCcpO1xuICAgICAgYnJlYWtwb2ludC52YWx1ZSA9IHBhcmFtc0FycmF5WzBdO1xuICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcbiAgICAgIGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XG4gICAgICBicmVha3BvaW50c0FycmF5LnB1c2goYnJlYWtwb2ludCk7XG4gICAgfSk7XG4gICAgLy8gZ2V0IHVuaXF1ZSBicmVha3BvaW50c1xuICAgIGxldCBtZFF1ZXJpZXMgPSBicmVha3BvaW50c0FycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJygnICtcbiAgICAgICAgaXRlbS50eXBlICtcbiAgICAgICAgJy13aWR0aDogJyArXG4gICAgICAgIGl0ZW0udmFsdWUgK1xuICAgICAgICAncHgpLCcgK1xuICAgICAgICBpdGVtLnZhbHVlICtcbiAgICAgICAgJywnICtcbiAgICAgICAgaXRlbS50eXBlXG4gICAgICApO1xuICAgIH0pO1xuICAgIG1kUXVlcmllcyA9IHVuaXF1ZUFycmF5KG1kUXVlcmllcyk7XG4gICAgY29uc3QgbWRRdWVyaWVzQXJyYXkgPSBbXTtcblxuICAgIGlmIChtZFF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgICAvLyB3b3JrIHdpdGggZXZlcnkgYnJlYWtwb2ludFxuICAgICAgbWRRdWVyaWVzLmZvckVhY2goYnJlYWtwb2ludCA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBtZWRpYUJyZWFrcG9pbnQgPSBwYXJhbXNBcnJheVsxXTtcbiAgICAgICAgY29uc3QgbWVkaWFUeXBlID0gcGFyYW1zQXJyYXlbMl07XG4gICAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShwYXJhbXNBcnJheVswXSk7XG4gICAgICAgIC8vIG9iamVjdHMgd2l0aCBjb25kaXRpb25zXG4gICAgICAgIGNvbnN0IGl0ZW1zQXJyYXkgPSBicmVha3BvaW50c0FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09PSBtZWRpYUJyZWFrcG9pbnQgJiYgaXRlbS50eXBlID09PSBtZWRpYVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1kUXVlcmllc0FycmF5LnB1c2goe1xuICAgICAgICAgIGl0ZW1zQXJyYXksXG4gICAgICAgICAgbWF0Y2hNZWRpYSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZFF1ZXJpZXNBcnJheTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogc21vb3RobHkgc2xpZGVzIHVwXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlVXAgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0Lm9mZnNldEhlaWdodH1weGA7XG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1yZW1gIDogYDBgO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LmhpZGRlbiA9ICFzaG93bW9yZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKSA6IG51bGw7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xuICAgICAgLy8gY3JlYXRlIGV2ZW50XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NsaWRlVXBEb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyBkb3duXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwLCBzaG93bW9yZSA9IDApID0+IHtcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcbiAgICB0YXJnZXQuaGlkZGVuID0gdGFyZ2V0LmhpZGRlbiA/IGZhbHNlIDogbnVsbDtcbiAgICBzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXJlbWAgOiBgMGA7XG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZURvd25Eb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHRvZ2dsZXMgc21vb3RoIHNsaWRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHJldHVybnMgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XG4gIGlmICh0YXJnZXQuaGlkZGVuKSB7XG4gICAgcmV0dXJuIF9zbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF9zbGlkZVVwKHRhcmdldCwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIHJlbSB0byBwaXhlbHNcbiAqIEBwYXJhbSB7bnVtYmVyfSByZW1WYWx1ZVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1Ub1B4KHJlbVZhbHVlKSB7XG4gIGNvbnN0IGh0bWxGb250U2l6ZSA9IHBhcnNlRmxvYXQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmZvbnRTaXplXG4gICk7XG5cbiAgY29uc3QgcHhWYWx1ZSA9IHJlbVZhbHVlICogaHRtbEZvbnRTaXplO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKHB4VmFsdWUpICsgJ3B4Jztcbn1cblxuLy8gcmVtb3ZlIGNsYXNzIGZyb20gYWxsIGFycmF5IGVsZW1lbnRzXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IChhcnJheSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJheVtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn07XG4iLCJ2YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYW5Vc2VET007IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBbZGF0YS1zaW1wbGViYXJdIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbi5zaW1wbGViYXItd3JhcHBlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdpZHRoOiBpbmhlcml0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIG1heC13aWR0aDogaW5oZXJpdDtcbiAgbWF4LWhlaWdodDogaW5oZXJpdDtcbn1cblxuLnNpbXBsZWJhci1tYXNrIHtcbiAgZGlyZWN0aW9uOiBpbmhlcml0O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgei1pbmRleDogMDtcbn1cblxuLnNpbXBsZWJhci1vZmZzZXQge1xuICBkaXJlY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICByZXNpemU6IG5vbmUgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XG4gIGRpcmVjdGlvbjogaW5oZXJpdDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7IC8qIFJlcXVpcmVkIGZvciBob3Jpem9udGFsIG5hdGl2ZSBzY3JvbGxiYXIgdG8gbm90IGFwcGVhciBpZiBwYXJlbnQgaXMgdGFsbGVyIHRoYW4gbmF0dXJhbCBoZWlnaHQgKi9cbiAgd2lkdGg6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTsgLyogTm90IHJlcXVpcmVkIGZvciBob3Jpem9udGFsIHNjcm9sbCB0byB0cmlnZ2VyICovXG4gIG1heC1oZWlnaHQ6IDEwMCU7IC8qIE5lZWRlZCBmb3IgdmVydGljYWwgc2Nyb2xsIHRvIHRyaWdnZXIgKi9cbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG59XG5cbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXG4uc2ltcGxlYmFyLWNvbnRlbnQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogdGFibGU7XG59XG5cbi5zaW1wbGViYXItcGxhY2Vob2xkZXIge1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDFweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbG9hdDogbGVmdDtcbiAgbWF4LWhlaWdodDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB6LWluZGV4OiAtMTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgZmxleC1ncm93OiBpbmhlcml0O1xuICBmbGV4LXNocmluazogMDtcbiAgZmxleC1iYXNpczogMDtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvcGFjaXR5OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAwJTtcbiAgd2lkdGg6IDEwMDAlO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIG1pbi13aWR0aDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogLTE7XG59XG5cbi5zaW1wbGViYXItdHJhY2sge1xuICB6LWluZGV4OiAxO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcgLnNpbXBsZWJhci1jb250ZW50IHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyAuc2ltcGxlYmFyLXRyYWNrIHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtaW4taGVpZ2h0OiAxMHB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIDAuNXMgbGluZWFyO1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhci5zaW1wbGViYXItdmlzaWJsZTpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjU7XG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcztcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMXB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICB0b3A6IDJweDtcbiAgYm90dG9tOiAycHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCB7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTFweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAxMHB4O1xuICB3aWR0aDogYXV0bztcbn1cblxuLyogUnRsIHN1cHBvcnQgKi9cbltkYXRhLXNpbXBsZWJhci1kaXJlY3Rpb249cnRsXSAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcbiAgZGlyZWN0aW9uOiBydGw7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBoZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogNTAwcHg7XG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcbiAgd2lkdGg6IDIwMCU7XG4gIGhlaWdodDogMjAwJTtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUEsRUFBQSxtR0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBLEVBQUEsa0RBQUE7RUFDQSxnQkFBQSxFQUFBLDBDQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0Esd0JBQUE7QUFDRjs7QUFFQTs7RUFFRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUFDRjs7QUFFQTs7RUFFRSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0Esb0NBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxNQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsUUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQSxnQkFBQTtBQUNBO0VBQ0UsV0FBQTtFQUNBLE9BQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIltkYXRhLXNpbXBsZWJhcl0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLnNpbXBsZWJhci13cmFwcGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aWR0aDogaW5oZXJpdDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIG1heC13aWR0aDogaW5oZXJpdDtcXG4gIG1heC1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcblxcbi5zaW1wbGViYXItbWFzayB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XFxuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG4gIHotaW5kZXg6IDA7XFxufVxcblxcbi5zaW1wbGViYXItb2Zmc2V0IHtcXG4gIGRpcmVjdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgcmVzaXplOiBub25lICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMTAwJTsgLyogUmVxdWlyZWQgZm9yIGhvcml6b250YWwgbmF0aXZlIHNjcm9sbGJhciB0byBub3QgYXBwZWFyIGlmIHBhcmVudCBpcyB0YWxsZXIgdGhhbiBuYXR1cmFsIGhlaWdodCAqL1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIE5vdCByZXF1aXJlZCBmb3IgaG9yaXpvbnRhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgbWF4LWhlaWdodDogMTAwJTsgLyogTmVlZGVkIGZvciB2ZXJ0aWNhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudC13cmFwcGVyOjotd2Via2l0LXNjcm9sbGJhcixcXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXFxuLnNpbXBsZWJhci1jb250ZW50OmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG5cXG4uc2ltcGxlYmFyLXBsYWNlaG9sZGVyIHtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyLXdyYXBwZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDFweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWF4LWhlaWdodDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IC0xO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgZmxleC1ncm93OiBpbmhlcml0O1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBmbGV4LWJhc2lzOiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG9wYWNpdHk6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAwJTtcXG4gIHdpZHRoOiAxMDAwJTtcXG4gIG1pbi1oZWlnaHQ6IDFweDtcXG4gIG1pbi13aWR0aDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgei1pbmRleDogLTE7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2sge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItY29udGVudCB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItdHJhY2sge1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgbWluLWhlaWdodDogMTBweDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICBsZWZ0OiAycHg7XFxuICByaWdodDogMnB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAwLjVzIGxpbmVhcjtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIuc2ltcGxlYmFyLXZpc2libGU6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLXZlcnRpY2FsIHtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMXB4O1xcbn1cXG5cXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xcbiAgdG9wOiAycHg7XFxuICBib3R0b206IDJweDtcXG4gIGxlZnQ6IDJweDtcXG4gIHJpZ2h0OiAycHg7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTFweDtcXG59XFxuXFxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XFxuICByaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBtaW4taGVpZ2h0OiAwO1xcbiAgbWluLXdpZHRoOiAxMHB4O1xcbiAgd2lkdGg6IGF1dG87XFxufVxcblxcbi8qIFJ0bCBzdXBwb3J0ICovXFxuW2RhdGEtc2ltcGxlYmFyLWRpcmVjdGlvbj0ncnRsJ10gLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xcbiAgcmlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcXG4gIGRpcmVjdGlvbjogcnRsO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGhlaWdodDogNTAwcHg7XFxuICB3aWR0aDogNTAwcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBvdmVyZmxvdy14OiBzY3JvbGw7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcXG4gIHdpZHRoOiAyMDAlO1xcbiAgaGVpZ2h0OiAyMDAlO1xcbiAgbWFyZ2luOiAxMHB4IDA7XFxufVxcblxcbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1OdW5pdG8rU2FuczpvcHN6LHdnaHRANi4uMTIsMjAwLi4xMDAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3lfcmVndWxhci53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkdpbHJveVwiO1xuICBzcmM6IHVybChcIi4uL2Fzc2V0cy9mb250cy9HaWxyb3lfbWVkaXVtLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiR2lscm95XCI7XG4gIHNyYzogdXJsKFwiLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9ib2xkLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sIHtcbiAgZm9udC1mYW1pbHk6IFwiTnVuaXRvIFNhbnNcIjtcbiAgZm9udC1zaXplOiAwLjUyMDgzMzV2dztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xuICBsaW5lLWhlaWdodDogMS4yO1xuICBtYXJnaW46IDA7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbiAgbGluZS1oZWlnaHQ6IDIuNXJlbTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBjb2xvcjogYmxhY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbmlucHV0LFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuYSB7XG4gIGNvbG9yOiB1bnNldDtcbn1cblxuYSxcbmE6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmJ1dHRvbixcbmlucHV0LFxuYSxcbnRleHRhcmVhIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250OiBpbmhlcml0O1xufVxuYnV0dG9uOmZvY3VzLFxuaW5wdXQ6Zm9jdXMsXG5hOmZvY3VzLFxudGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuYnV0dG9uOmFjdGl2ZSxcbmlucHV0OmFjdGl2ZSxcbmE6YWN0aXZlLFxudGV4dGFyZWE6YWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgZm9udDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5wIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbmJ1dHRvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGluaGVyaXQ7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG51bCB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxudWwgbGkge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTcycmVtO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG5zdmcsXG5pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuLmxvY2sgYm9keSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cbm1haW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi53cmFwcGVyIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIG1heC13aWR0aDogMTkyMHB4O1xufVxuXG4uaCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uaF9oMSB7XG4gIGZvbnQtc2l6ZTogNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDUuNnJlbTtcbn1cbi5oX2gyIHtcbiAgZm9udC1zaXplOiAzLjZyZW07XG4gIGxpbmUtaGVpZ2h0OiAxMjAlO1xufVxuLmhfaDMge1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDIuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDMuM3JlbTtcbn1cblxuLnR4dF8yNCB7XG4gIGZvbnQtc2l6ZTogMi40cmVtO1xuICBsaW5lLWhlaWdodDogMi44cmVtO1xufVxuLnR4dF8yMCB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcbn1cbi50eHRfMTYge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcbn1cbi50eHRfMTQge1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuOXJlbTtcbn1cbi50eHRfc2VtaWJvbGQge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5pbnB1dFt0eXBlPXRleHRdLFxuaW5wdXRbdHlwZT1lbWFpbF0sXG5pbnB1dFt0eXBlPXRlbF0sXG50ZXh0YXJlYSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG50ZXh0YXJlYTpmb2N1cyxcbmlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmlucHV0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAwLjJyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XG59XG4uaW5wdXRfcGFzcyAuaW5wdXRfX2ZpZWxkIHtcbiAgcGFkZGluZy1yaWdodDogNC41cmVtO1xufVxuLmlucHV0X19maWVsZCwgLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcbn1cbi5pbnB1dF9fZmllbGQge1xuICBwYWRkaW5nOiAxLjhyZW0gMnJlbTtcbiAgaGVpZ2h0OiA2cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogI0ExQTJBOTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xufVxuLmlucHV0X19wYXNzLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyLjJyZW07XG4gIHJpZ2h0OiAycmVtO1xufVxuLmlucHV0X19wYXNzLWJ0bi1pIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuLmlucHV0X19wYXNzLWJ0bi1pX2hpZGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuLl9pcy1yZXZlYWxlZCAuaW5wdXRfX3Bhc3MtYnRuLWkge1xuICBkaXNwbGF5OiBub25lO1xufVxuLl9pcy1yZXZlYWxlZCAuaW5wdXRfX3Bhc3MtYnRuLWlfaGlkZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi5pbnB1dC5faGFzLWVycm9yOjphZnRlciB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGNvbG9yOiAjZjQwMDAwO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZCB7XG4gIGNvbG9yOiAjZjQwMDAwO1xufVxuLmlucHV0Ll9oYXMtZm9jdXMgLmlucHV0X19maWVsZCwgLmlucHV0Ll9pcy1maWxsZWQgLmlucHV0X19maWVsZCB7XG4gIGNvbG9yOiAjMDAwMDAwO1xufVxuXG50ZXh0YXJlYS5pbnB1dCB7XG4gIHBhZGRpbmc6IDBweCAwcHg7XG4gIHJlc2l6ZTogbm9uZTtcbn1cblxuLmJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmJ0bl9wcmltYXJ5IHtcbiAgcGFkZGluZzogMXJlbSAzLjJyZW07XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDZyZW07XG4gIGJvcmRlcjogMS41cHggc29saWQgIzAwMDAwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcbn1cbi5idG5fcHJpbWFyeSAudHh0IHtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cbi5idG5fc2Vjb25kYXJ5IHtcbiAgbWFyZ2luLXJpZ2h0OiAxLjZyZW07XG59XG4uYnRuX3NlY29uZGFyeTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBmbGV4OiAwIDAgMi40cmVtO1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi9hc3NldHMvaW1hZ2VzL2ljb25zL2Fyci1zbS5zdmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuNnJlbSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG4uYnRuW2Rpc2FibGVkXSwgLmJ0bi5faXMtZGlzYWJsZWQge1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICNBMUEyQTk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNBMUEyQTk7XG59XG5cbi5vcHRpb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5vcHRpb25fX2lucHV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwO1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuLm9wdGlvbl9faW5wdXQ6Y2hlY2tlZCArIC5vcHRpb25fX3R4dDo6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuLm9wdGlvbl9fdHh0IHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZ2FwOiAwLjhyZW07XG59XG4ub3B0aW9uX190eHQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gIGZsZXg6IDAgMCAyLjRyZW07XG4gIHdpZHRoOiAyLjRyZW07XG4gIGhlaWdodDogMi40cmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogMS41cHggc29saWQgIzAwMDAwMDtcbn1cbi5vcHRpb25fX3R4dDo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDAuNHJlbTtcbiAgdG9wOiAwLjRyZW07XG4gIHdpZHRoOiAxLjZyZW07XG4gIGhlaWdodDogMS42cmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG5cbi5jaGVja2JveCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG4uY2hlY2tib3hfX2lucHV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwO1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuLmNoZWNrYm94X19pbnB1dDpjaGVja2VkICsgLmNoZWNrYm94X190eHQ6OmJlZm9yZSB7XG4gIGJvcmRlcjogMS41cHggc29saWQgIzAwMDAwMDtcbn1cbi5jaGVja2JveF9faW5wdXQ6Y2hlY2tlZCArIC5jaGVja2JveF9fdHh0OjphZnRlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG4uY2hlY2tib3hfX3R4dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbHVtbi1nYXA6IDAuOHJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNoZWNrYm94X190eHQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGZsZXg6IDAgMCAyLjJyZW07XG4gIHdpZHRoOiAyLjJyZW07XG4gIGhlaWdodDogMi4ycmVtO1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICNBMUEyQTk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zaXRpb246IGJvcmRlciAwLjNzIGVhc2U7XG59XG4uY2hlY2tib3hfX3R4dDo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMC41cmVtO1xuICBsZWZ0OiAwLjNyZW07XG4gIHdpZHRoOiAxLjZyZW07XG4gIGhlaWdodDogMS42cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCl7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDVweDtcbiAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xuICAgIGZvbnQtc2l6ZTogMS4zMzMzMzMzMzMzdnc7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMCAzLjJyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbkBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcil7XG4gIC5idG5fcHJpbWFyeTpub3QoLmJ0bl9wcmltYXJ5W2Rpc2FibGVkXSwgLmJ0bl9wcmltYXJ5Ll9pcy1kaXNhYmxlZCk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIH1cbiAgLmJ0bl9wcmltYXJ5Om5vdCguYnRuX3ByaW1hcnlbZGlzYWJsZWRdLCAuYnRuX3ByaW1hcnkuX2lzLWRpc2FibGVkKTpob3ZlciAudHh0IHtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgfVxuICAuYnRuX3NlY29uZGFyeTpob3Zlcjo6YWZ0ZXIge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvZm9udHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGUuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc2V0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvX3R5cG8uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9faW5wdXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fYnV0dG9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19yYWRpby1idXR0b24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fY2hlY2tib3guc2Nzc1wiLFwiPG5vIHNvdXJjZT5cIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBQTtFQUNBLGdFQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0VGO0FEQUE7RUFDRSxxQkFBQTtFQUNBLCtEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0VGO0FEQUE7RUFDRSxxQkFBQTtFQUNBLDZEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0VGO0FDbEJBOzs7RUFHSSxzQkFBQTtBRG9CSjs7QUNsQkE7RUFDSSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7QURxQko7O0FDbEJBO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkRwQkk7QUF5Q1I7O0FDbEJBOztFQUVJLHFDQUFBO0VBQ0Esb0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QURxQko7O0FDbkJBO0VBQ0ksWUFBQTtBRHNCSjs7QUNwQkE7O0VBRUkscUJBQUE7QUR1Qko7O0FDcEJBOzs7O0VBSUksYUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FEdUJKO0FDdEJJOzs7O0VBQ0ksYUFBQTtBRDJCUjtBQ3pCSTs7OztFQUNJLGFBQUE7QUQ4QlI7O0FDMUJBOzs7Ozs7RUFNSSxhQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUQ2Qko7O0FDM0JBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0FEOEJKOztBQzNCQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBRDhCSjs7QUMzQkE7RUFDSSxZQUFBO0VB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QSwyQkFBQTtBTHdWTjtBS3RWSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLHlCTG5DRTtFS29DRixtQkFBQTtFQUNBLCtCQUFBO0FMd1ZOOztBTXJZQTtFQUNFLGtCQUFBO0VBQ0Esb0JBQUE7QU53WUY7QU10WUU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBTndZSjtBTXJZTTtFQUNFLDJCQUFBO0FOdVlSO0FNcllNO0VBQ0UsbUJBQUE7QU51WVI7QU1sWUU7RUFDRSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QU5vWUo7QU1sWUk7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLDJCQUFBO0VBQ0EseUJONUJFO0VNNkJGLDRCQUFBO0FOb1lOO0FNallJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLHlCTnRDRTtFTXVDRixtQkFBQTtFQUNBLCtCQUFBO0FObVlOO0FPbmJBO0VOOEhJO0lBQ0ksZUFBQTtFRCtCTjtBQXVQRjtBT3JaQTtFTm9JSTtJQUNJLGNBQUE7SUFDQSxtQkFBQTtJQUNBLHlCQUFBO0lBQ0EsOEJBQUE7RUQ4Qk47RUMzQkU7SUFDSSxlQUFBO0lBQ0EsOEJBQUE7RUQ2Qk47RUMxQkU7SUFDSSxpQkFBQTtJQUNBLFdBQUE7RUQ0Qk47QUF1UEY7QU9yYUE7RUhvQlE7SUFDRSx5QkpkRjtFQXlUTjtFSXpTUTtJQUNFLGNKaEJKO0VBMlROO0VJblJNO0lBQ0Usd0JBQUE7RUpxU1I7QUEwRkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0dpbHJveSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0dpbHJveSc7XFxuICBzcmM6IHVybCgnLi4vYXNzZXRzL2ZvbnRzL0dpbHJveV9tZWRpdW0ud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnR2lscm95JztcXG4gIHNyYzogdXJsKCcuLi9hc3NldHMvZm9udHMvR2lscm95X2JvbGQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cIixcIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtaXhpbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuQGltcG9ydCAnLi9taXhpbnMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHZhcmlhYmxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gY29sb3JzXFxuJHdoaXRlOiAjZmZmZmZmO1xcbiRibGFjazogIzAwMDAwMDtcXG4kZ3JheTogI0VGRUZFRjtcXG4kZ3JheVR4dDogI0ExQTJBOTtcXG4kcmVkOiAjRjQwMDAwRkY7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBmb250cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1OdW5pdG8rU2FuczpvcHN6LHdnaHRANi4uMTIsMjAwLi4xMDAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbi8vIGxvY2FsIGZvbnRzXFxuIEBpbXBvcnQgJy4vZm9udHMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYmFzZSBzdHlsZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gYmFzZSBzY3NzIGZpbGVcXG5AaW1wb3J0ICcuL3NldCc7XFxuXFxuLy8gYm9keVxcbmJvZHkge1xcbiAgICAubG9jayAmIHtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB0b3VjaC1hY3Rpb246IG5vbmU7XFxuICAgIH1cXG4gICAgLmxvYWRlZCAmIHtcXG4gICAgfVxcbn1cXG5cXG4vLyBtYWluXFxubWFpbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLy8gd3JhcHBlclxcbi53cmFwcGVyIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG1heC13aWR0aDogMTkyMHB4O1xcbn1cXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGhlYWRlciAvIGZvb3RlclxcbkBpbXBvcnQgJy4vc2VjdGlvbnMvaGVhZGVyJztcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2Zvb3Rlcic7XFxuXFxuLy8gdWlcXG5AaW1wb3J0ICcuLi91aS9zdHlsZXMvdWkuc2Nzcyc7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0ICcuL2Rldi92em1zazEuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvbWFya3VzRE0uc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvdWtpazAuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYva2llNmVyLnNjc3MnO1xcblwiLFwiKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5odG1sIHtcXG4gICAgZm9udC1mYW1pbHk6ICdOdW5pdG8gU2Fucyc7IC8vINGI0YDQuNGE0YIg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0L/QviDRgdCw0LnRgtGDXFxuICAgIGZvbnQtc2l6ZTogMC41MjA4MzM1dnc7IC8vINC90LAg0YDQsNC30YDQtdGI0LXQvdC40LggMTkyMCAwLjUyMDgzNXZ3ID09PSAxMHB4XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcXG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiAyLjVyZW07XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmb250LXNpemU6IDEuOHJlbTtcXG4gICAgY29sb3I6IGJsYWNrOyAvLyDRhtCy0LXRgiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgtC10LrRgdGC0LAg0L/QviDRgdCw0LnRgtGDXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG59XFxuXFxuaW5wdXQsXFxudGV4dGFyZWEge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG59XFxuYSB7XFxuICAgIGNvbG9yOiB1bnNldDtcXG59XFxuYSxcXG5hOmhvdmVyIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxuYSxcXG50ZXh0YXJlYSB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgJjpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICB9XFxuICAgICY6YWN0aXZlIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIH1cXG59XFxuXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcbnAge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG5pbWcge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjb2xvcjogaW5oZXJpdDtcXG4gICAgZm9udDogaW5oZXJpdDtcXG4gICAgdGV4dC1hbGlnbjogaW5oZXJpdDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbnVsIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG51bCBsaSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxNzJyZW07XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5pbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdudW1iZXInXSB7XFxuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xcbn1cXG5cXG5zdmcsXFxuaW1nIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDE5MjBweCkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICBodG1sIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxLjU2MjV2dztcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygoMTAwIC8gMzc1KSAqIDV2dyk7IC8vINCz0LTQtSAzNzUg0Y3RgtC+INGI0LjRgNC40L3QsCDQvNC+0LEg0LLQtdGA0YHQuNC4INC80LDQutC10YLQsFxcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuXFxuICAgIGJvZHkge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5jb250YWluZXIge1xcbiAgICAgICAgcGFkZGluZzogMCAzLjJyZW07IC8vINCyINC80L7QsSDQstC10YDRgdC40Lgg0L7RgtGB0YLRg9C/INC+0YIg0LrRgNCw0Y8g0LfQsNC00LDQtdC8INC00LvRjyDQstGB0LXRhSDQutC+0L3RgtC10LnQvdC10YDQvtCyLCDQsCDRgtCw0Lwg0LPQtNC1INC90LUg0L3Rg9C20L3QviDQvNC+0LbQtdC8INGC0L7Rh9C10YfQvdC+INGD0LHRgNCw0YLRjFxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXCIsXCIuaCB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuXFxuICAgICZfaDEge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUuNnJlbTtcXG4gICAgfVxcblxcbiAgICAmX2gyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMy42cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEyMCU7XFxuICAgIH1cXG5cXG4gICAgJl9oMyB7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgZm9udC1zaXplOiAyLjRyZW07XFxuICAgICAgICBsaW5lLWhlaWdodDogMy4zcmVtO1xcbiAgICB9XFxufVxcblxcbi50eHQge1xcbiAgICAmXzI0IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMi40cmVtO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIuOHJlbTtcXG4gICAgfVxcblxcbiAgICAmXzIwIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjhyZW07XFxuICAgIH1cXG5cXG4gICAgJl8xNiB7XFxuICAgICAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjJyZW07XFxuICAgIH1cXG5cXG4gICAgJl8xNCB7XFxuICAgICAgICBmb250LXNpemU6IDEuNHJlbTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjlyZW07XFxuICAgIH1cXG5cXG4gICAgJl9zZW1pYm9sZCB7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB9XFxufVwiLFwiaW5wdXRbdHlwZT0ndGV4dCddLFxcbmlucHV0W3R5cGU9J2VtYWlsJ10sXFxuaW5wdXRbdHlwZT0ndGVsJ10sXFxudGV4dGFyZWEge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG59XFxudGV4dGFyZWE6Zm9jdXMsXFxuaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmlucHV0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMC4ycmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XFxuXFxuICAmX3Bhc3Mge1xcbiAgICAuaW5wdXRfX2ZpZWxkIHtcXG4gICAgICBwYWRkaW5nLXJpZ2h0OiA0LjVyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gICZfX2ZpZWxkLFxcbiAgJl9fZmllbGQ6OnBsYWNlaG9sZGVyIHtcXG4gICAgZm9udC1zaXplOiAxLjZyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAyLjJyZW07XFxuICB9XFxuXFxuICAmX19maWVsZCB7XFxuICAgIHBhZGRpbmc6IDEuOHJlbSAycmVtO1xcbiAgICBoZWlnaHQ6IDZyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gICAgY29sb3I6ICRncmF5VHh0O1xcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XFxuICB9XFxuXFxuICAmX19wYXNzLWJ0biB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyLjJyZW07XFxuICAgIHJpZ2h0OiAycmVtO1xcbiAgfVxcblxcbiAgJl9fcGFzcy1idG4taSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDJyZW07XFxuICAgIGhlaWdodDogMnJlbTtcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG5cXG4gICAgJl9oaWRlIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5faXMtcmV2ZWFsZWQgJiB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICAmX2hpZGUge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJi5faGFzLWVycm9yIHtcXG5cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcXG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgfVxcblxcbiAgICAuaW5wdXRfX2ZpZWxkIHtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgfVxcbiAgfVxcblxcbiAgJi5faGFzLWZvY3VzLFxcbiAgJi5faXMtZmlsbGVkIHtcXG4gICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG50ZXh0YXJlYS5pbnB1dCB7XFxuICBwYWRkaW5nOiAwcHggMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbn1cXG5cIixcIi5idG4ge1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgJl9wcmltYXJ5IHtcXG4gICAgcGFkZGluZzogMXJlbSAzLjJyZW07XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDZyZW07XFxuICAgIGJvcmRlcjogMS41cHggc29saWQgJGJsYWNrO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibGFjaztcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XFxuXFxuICAgIC50eHQge1xcbiAgICAgIGNvbG9yOiAkd2hpdGU7XFxuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xcbiAgICB9XFxuXFxuICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICY6bm90KCZbZGlzYWJsZWRdLCAmLl9pcy1kaXNhYmxlZCkge1xcbiAgICAgICAgJjpob3ZlciB7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG5cXG4gICAgICAgICAgLnR4dCB7XFxuICAgICAgICAgICAgY29sb3I6ICRibGFjaztcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJl9zZWNvbmRhcnkge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEuNnJlbTtcXG5cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIGZsZXg6IDAgMCAyLjRyZW07XFxuICAgICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4vYXNzZXRzL2ltYWdlcy9pY29ucy9hcnItc20uc3ZnXFxcIik7XFxuICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuNnJlbSk7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcblxcbiAgICBAbWVkaWEgKGFueS1ob3ZlcjogaG92ZXIpIHtcXG4gICAgICAmOmhvdmVyIHtcXG4gICAgICAgICY6OmFmdGVyIHtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJltkaXNhYmxlZF0sXFxuICAmLl9pcy1kaXNhYmxlZCB7XFxuICAgIGJvcmRlcjogMS41cHggc29saWQgJGdyYXlUeHQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5VHh0O1xcbiAgfVxcblxcbn1cIixcIi5vcHRpb24ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG5cXG4gICZfX2lucHV0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcblxcbiAgICAmOmZvY3VzICsgLm9wdGlvbl9fdHh0OjpiZWZvcmUge1xcbiAgICB9XFxuICAgICY6Y2hlY2tlZCArIC5vcHRpb25fX3R4dDo6YmVmb3JlIHtcXG4gICAgfVxcbiAgICAmOmNoZWNrZWQgKyAub3B0aW9uX190eHQ6OmFmdGVyIHtcXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB9XFxuICB9XFxuXFxuICAmX190eHQge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBnYXA6IDAuOHJlbTtcXG5cXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgICAgIGZsZXg6IDAgMCAyLjRyZW07XFxuICAgICAgd2lkdGg6IDIuNHJlbTtcXG4gICAgICBoZWlnaHQ6IDIuNHJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgYm9yZGVyOiAxLjVweCBzb2xpZCAkYmxhY2s7XFxuICAgIH1cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBsZWZ0OiAwLjRyZW07XFxuICAgICAgdG9wOiAwLjRyZW07XFxuICAgICAgd2lkdGg6IDEuNnJlbTtcXG4gICAgICBoZWlnaHQ6IDEuNnJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcbiAgfVxcbn1cXG5cIixcIi5jaGVja2JveCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG5cXG4gICZfX2lucHV0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBhcHBlYXJhbmNlOiBub25lO1xcblxcbiAgICAmOmNoZWNrZWQgKyAuY2hlY2tib3hfX3R4dCB7XFxuICAgICAgJjo6YmVmb3JlIHtcXG4gICAgICAgIGJvcmRlcjogMS41cHggc29saWQgJGJsYWNrO1xcbiAgICAgIH1cXG4gICAgICAmOjphZnRlciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgJl9fdHh0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sdW1uLWdhcDogMC44cmVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuXFxuICAgICY6OmJlZm9yZSB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgZmxleDogMCAwIDIuMnJlbTtcXG4gICAgICB3aWR0aDogMi4ycmVtO1xcbiAgICAgIGhlaWdodDogMi4ycmVtO1xcbiAgICAgIGJvcmRlcjogMS41cHggc29saWQgJGdyYXlUeHQ7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjNzIGVhc2U7XFxuICAgIH1cXG5cXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDAuNXJlbTtcXG4gICAgICBsZWZ0OiAwLjNyZW07XFxuICAgICAgd2lkdGg6IDEuNnJlbTtcXG4gICAgICBoZWlnaHQ6IDEuNnJlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcbiAgICB9XFxuICB9XFxufVxcblwiLG51bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpbXBsZWJhci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2ltcGxlYmFyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsImltcG9ydCB0cmltbWVkRW5kSW5kZXggZnJvbSAnLi9fdHJpbW1lZEVuZEluZGV4LmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbVN0YXJ0ID0gL15cXHMrLztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50cmltYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHRyaW0uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB0cmltbWVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRyaW0oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmdcbiAgICA/IHN0cmluZy5zbGljZSgwLCB0cmltbWVkRW5kSW5kZXgoc3RyaW5nKSArIDEpLnJlcGxhY2UocmVUcmltU3RhcnQsICcnKVxuICAgIDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVHJpbTtcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbmV4cG9ydCBkZWZhdWx0IGZyZWVHbG9iYWw7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFRvU3RyaW5nO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIGEgc2luZ2xlIHdoaXRlc3BhY2UgY2hhcmFjdGVyLiAqL1xudmFyIHJlV2hpdGVzcGFjZSA9IC9cXHMvO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8udHJpbWAgYW5kIGBfLnRyaW1FbmRgIHRvIGdldCB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgbm9uLXdoaXRlc3BhY2VcbiAqIGNoYXJhY3RlciBvZiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXIuXG4gKi9cbmZ1bmN0aW9uIHRyaW1tZWRFbmRJbmRleChzdHJpbmcpIHtcbiAgdmFyIGluZGV4ID0gc3RyaW5nLmxlbmd0aDtcblxuICB3aGlsZSAoaW5kZXgtLSAmJiByZVdoaXRlc3BhY2UudGVzdChzdHJpbmcuY2hhckF0KGluZGV4KSkpIHt9XG4gIHJldHVybiBpbmRleDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJpbW1lZEVuZEluZGV4O1xuIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IG5vdyBmcm9tICcuL25vdy5qcyc7XG5pbXBvcnQgdG9OdW1iZXIgZnJvbSAnLi90b051bWJlci5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICB0aW1lV2FpdGluZyA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmdcbiAgICAgID8gbmF0aXZlTWluKHRpbWVXYWl0aW5nLCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSlcbiAgICAgIDogdGltZVdhaXRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWJvdW5jZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3ltYm9sO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdztcbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICcuL2RlYm91bmNlLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgYmFzZVRyaW0gZnJvbSAnLi9fYmFzZVRyaW0uanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gYmFzZVRyaW0odmFsdWUpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9OdW1iZXI7XG4iLCIvKipcbiAqIHNpbXBsZWJhci1jb3JlIC0gdjEuMi40XG4gKiBTY3JvbGxiYXJzLCBzaW1wbGVyLlxuICogaHR0cHM6Ly9ncnNtdG8uZ2l0aHViLmlvL3NpbXBsZWJhci9cbiAqXG4gKiBNYWRlIGJ5IEFkcmllbiBEZW5hdCBmcm9tIGEgZm9yayBieSBKb25hdGhhbiBOaWNvbFxuICogVW5kZXIgTUlUIExpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyB0aHJvdHRsZSwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IGNhblVzZURPTSBmcm9tICdjYW4tdXNlLWRvbSc7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxudmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcblxudmFyIGNhY2hlZFNjcm9sbGJhcldpZHRoID0gbnVsbDtcbnZhciBjYWNoZWREZXZpY2VQaXhlbFJhdGlvID0gbnVsbDtcbmlmIChjYW5Vc2VET00pIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY2FjaGVkRGV2aWNlUGl4ZWxSYXRpbyAhPT0gd2luZG93LmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgICAgICAgIGNhY2hlZERldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICAgIGNhY2hlZFNjcm9sbGJhcldpZHRoID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gc2Nyb2xsYmFyV2lkdGgoKSB7XG4gICAgaWYgKGNhY2hlZFNjcm9sbGJhcldpZHRoID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2Nyb2xsYmFyV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB2YXIgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdzaW1wbGViYXItaGlkZS1zY3JvbGxiYXInKTtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChib3gpO1xuICAgICAgICB2YXIgd2lkdGggPSBib3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG4gICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoYm94KTtcbiAgICAgICAgY2FjaGVkU2Nyb2xsYmFyV2lkdGggPSB3aWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZFNjcm9sbGJhcldpZHRoO1xufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50V2luZG93JDEoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudCB8fFxuICAgICAgICAhZWxlbWVudC5vd25lckRvY3VtZW50IHx8XG4gICAgICAgICFlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldztcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnREb2N1bWVudCQxKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgb3B0aW9ucyBmcm9tIGVsZW1lbnQgYXR0cmlidXRlc1xudmFyIGdldE9wdGlvbnMkMSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgaW5pdGlhbE9iaiA9IHt9O1xuICAgIHZhciBvcHRpb25zID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKG9iaiwgZnVuY3Rpb24gKGFjYywgYXR0cmlidXRlKSB7XG4gICAgICAgIHZhciBvcHRpb24gPSBhdHRyaWJ1dGUubmFtZS5tYXRjaCgvZGF0YS1zaW1wbGViYXItKC4rKS8pO1xuICAgICAgICBpZiAob3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gb3B0aW9uWzFdLnJlcGxhY2UoL1xcVysoLikvZywgZnVuY3Rpb24gKF8sIGNocikgeyByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7IH0pO1xuICAgICAgICAgICAgc3dpdGNoIChhdHRyaWJ1dGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0cnVlJzpcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmYWxzZSc6XG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgaW5pdGlhbE9iaik7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59O1xuZnVuY3Rpb24gYWRkQ2xhc3NlcyQxKGVsLCBjbGFzc2VzKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghZWwpXG4gICAgICAgIHJldHVybjtcbiAgICAoX2EgPSBlbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgY2xhc3Nlcy5zcGxpdCgnICcpKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMkMShlbCwgY2xhc3Nlcykge1xuICAgIGlmICghZWwpXG4gICAgICAgIHJldHVybjtcbiAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNsYXNzTmFtZXNUb1F1ZXJ5JDEoY2xhc3NOYW1lcykge1xuICAgIHJldHVybiBcIi5cIi5jb25jYXQoY2xhc3NOYW1lcy5zcGxpdCgnICcpLmpvaW4oJy4nKSk7XG59XG5cbnZhciBoZWxwZXJzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBnZXRFbGVtZW50V2luZG93OiBnZXRFbGVtZW50V2luZG93JDEsXG4gICAgZ2V0RWxlbWVudERvY3VtZW50OiBnZXRFbGVtZW50RG9jdW1lbnQkMSxcbiAgICBnZXRPcHRpb25zOiBnZXRPcHRpb25zJDEsXG4gICAgYWRkQ2xhc3NlczogYWRkQ2xhc3NlcyQxLFxuICAgIHJlbW92ZUNsYXNzZXM6IHJlbW92ZUNsYXNzZXMkMSxcbiAgICBjbGFzc05hbWVzVG9RdWVyeTogY2xhc3NOYW1lc1RvUXVlcnkkMVxufSk7XG5cbnZhciBnZXRFbGVtZW50V2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyQxLCBnZXRFbGVtZW50RG9jdW1lbnQgPSBnZXRFbGVtZW50RG9jdW1lbnQkMSwgZ2V0T3B0aW9ucyA9IGdldE9wdGlvbnMkMSwgYWRkQ2xhc3NlcyA9IGFkZENsYXNzZXMkMSwgcmVtb3ZlQ2xhc3NlcyA9IHJlbW92ZUNsYXNzZXMkMSwgY2xhc3NOYW1lc1RvUXVlcnkgPSBjbGFzc05hbWVzVG9RdWVyeSQxO1xudmFyIFNpbXBsZUJhckNvcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2ltcGxlQmFyQ29yZShlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPSBudWxsO1xuICAgICAgICB0aGlzLm1pblNjcm9sbGJhcldpZHRoID0gMjA7XG4gICAgICAgIHRoaXMuc3RvcFNjcm9sbERlbGF5ID0gMTc1O1xuICAgICAgICB0aGlzLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb3VzZUVudGVyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2Nyb2xsWFRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY3JvbGxZVGlja2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLndyYXBwZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudEVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5vZmZzZXRFbCA9IG51bGw7XG4gICAgICAgIHRoaXMubWFza0VsID0gbnVsbDtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5ydGxIZWxwZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmVsU3R5bGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc1J0bCA9IG51bGw7XG4gICAgICAgIHRoaXMubW91c2VYID0gMDtcbiAgICAgICAgdGhpcy5tb3VzZVkgPSAwO1xuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICB0aGlzLm9uU3RvcFNjcm9sbGluZyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXJlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9uIHNjcm9sbCBldmVudCBoYW5kbGluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vblNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3coX3RoaXMuZWwpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5zY3JvbGxYVGlja2luZykge1xuICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5zY3JvbGxYKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxYVGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV90aGlzLnNjcm9sbFlUaWNraW5nKSB7XG4gICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLnNjcm9sbFkpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbFlUaWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc1Njcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NlcyhfdGhpcy5lbCwgX3RoaXMuY2xhc3NOYW1lcy5zY3JvbGxpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuc2hvd1Njcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgX3RoaXMuc2hvd1Njcm9sbGJhcigneScpO1xuICAgICAgICAgICAgX3RoaXMub25TdG9wU2Nyb2xsaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2Nyb2xsWCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZykge1xuICAgICAgICAgICAgICAgIF90aGlzLnBvc2l0aW9uU2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxYVGlja2luZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjcm9sbFkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wb3NpdGlvblNjcm9sbGJhcigneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWVRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25TdG9wU2Nyb2xsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhfdGhpcy5lbCwgX3RoaXMuY2xhc3NOYW1lcy5zY3JvbGxpbmcpO1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuYXV0b0hpZGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlU2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVNjcm9sbGJhcigneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzTW91c2VFbnRlcmluZykge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMubW91c2VFbnRlcmVkKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93U2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvd1Njcm9sbGJhcigneScpO1xuICAgICAgICAgICAgICAgIF90aGlzLmlzTW91c2VFbnRlcmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5vbk1vdXNlRW50ZXJlZCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vbk1vdXNlRW50ZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMubW91c2VFbnRlcmVkKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmlzTW91c2VFbnRlcmluZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZVggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZVkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTW91c2VNb3ZlRm9yQXhpcygneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueS5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueS5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbk1vdXNlTW92ZUZvckF4aXMoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbk1vdXNlTGVhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5vbk1vdXNlTW92ZS5jYW5jZWwoKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZUxlYXZlRm9yQXhpcygneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueS5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueS5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbk1vdXNlTGVhdmVGb3JBeGlzKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5tb3VzZVggPSAtMTtcbiAgICAgICAgICAgIF90aGlzLm1vdXNlWSA9IC0xO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlY2FsY3VsYXRlIHNjcm9sbGJhcldpZHRoIGluIGNhc2UgaXQncyBhIHpvb21cbiAgICAgICAgICAgIF90aGlzLnNjcm9sbGJhcldpZHRoID0gX3RoaXMuZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgICAgIF90aGlzLmhpZGVOYXRpdmVTY3JvbGxiYXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vblBvaW50ZXJFdmVudCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmF4aXMueC50cmFjay5lbCB8fFxuICAgICAgICAgICAgICAgICFfdGhpcy5heGlzLnkudHJhY2suZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy54LnNjcm9sbGJhci5lbCB8fFxuICAgICAgICAgICAgICAgICFfdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciBpc1dpdGhpblRyYWNrWEJvdW5kcywgaXNXaXRoaW5UcmFja1lCb3VuZHM7XG4gICAgICAgICAgICBfdGhpcy5heGlzLngudHJhY2sucmVjdCA9IF90aGlzLmF4aXMueC50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIF90aGlzLmF4aXMueS50cmFjay5yZWN0ID0gX3RoaXMuYXhpcy55LnRyYWNrLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueC5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueC5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBpc1dpdGhpblRyYWNrWEJvdW5kcyA9IF90aGlzLmlzV2l0aGluQm91bmRzKF90aGlzLmF4aXMueC50cmFjay5yZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaXNXaXRoaW5UcmFja1lCb3VuZHMgPSBfdGhpcy5pc1dpdGhpbkJvdW5kcyhfdGhpcy5heGlzLnkudHJhY2sucmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBhbnkgcG9pbnRlciBldmVudCBpcyBjYWxsZWQgb24gdGhlIHNjcm9sbGJhclxuICAgICAgICAgICAgaWYgKGlzV2l0aGluVHJhY2tYQm91bmRzIHx8IGlzV2l0aGluVHJhY2tZQm91bmRzKSB7XG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBldmVudCBsZWFraW5nXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09PSAncG9pbnRlcmRvd24nICYmIGUucG9pbnRlclR5cGUgIT09ICd0b3VjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2l0aGluVHJhY2tYQm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnguc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy54LnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uRHJhZ1N0YXJ0KGUsICd4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblRyYWNrQ2xpY2soZSwgJ3gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNXaXRoaW5UcmFja1lCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmF4aXMueS5zY3JvbGxiYXIucmVjdCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXhpcy55LnNjcm9sbGJhci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1dpdGhpbkJvdW5kcyhfdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnJlY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25EcmFnU3RhcnQoZSwgJ3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uVHJhY2tDbGljayhlLCAneScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRHJhZyBzY3JvbGxiYXIgaGFuZGxlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWcgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rLCBfbDtcbiAgICAgICAgICAgIGlmICghX3RoaXMuZHJhZ2dlZEF4aXMgfHwgIV90aGlzLmNvbnRlbnRXcmFwcGVyRWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGV2ZW50T2Zmc2V0O1xuICAgICAgICAgICAgdmFyIHRyYWNrID0gX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10udHJhY2s7XG4gICAgICAgICAgICB2YXIgdHJhY2tTaXplID0gKF9iID0gKF9hID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNpemVBdHRyXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMDtcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zY3JvbGxiYXI7XG4gICAgICAgICAgICB2YXIgY29udGVudFNpemUgPSAoX2QgPSAoX2MgPSBfdGhpcy5jb250ZW50V3JhcHBlckVsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2Nyb2xsU2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAwO1xuICAgICAgICAgICAgdmFyIGhvc3RTaXplID0gcGFyc2VJbnQoKF9mID0gKF9lID0gX3RoaXMuZWxTdHlsZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6ICcwcHgnLCAxMCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmRyYWdnZWRBeGlzID09PSAneScpIHtcbiAgICAgICAgICAgICAgICBldmVudE9mZnNldCA9IGUucGFnZVk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudE9mZnNldCA9IGUucGFnZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgaG93IGZhciB0aGUgdXNlcidzIG1vdXNlIGlzIGZyb20gdGhlIHRvcC9sZWZ0IG9mIHRoZSBzY3JvbGxiYXIgKG1pbnVzIHRoZSBkcmFnT2Zmc2V0KS5cbiAgICAgICAgICAgIHZhciBkcmFnUG9zID0gZXZlbnRPZmZzZXQgLVxuICAgICAgICAgICAgICAgICgoX2ggPSAoX2cgPSB0cmFjay5yZWN0KSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2dbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10ub2Zmc2V0QXR0cl0pICE9PSBudWxsICYmIF9oICE9PSB2b2lkIDAgPyBfaCA6IDApIC1cbiAgICAgICAgICAgICAgICBfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5kcmFnT2Zmc2V0O1xuICAgICAgICAgICAgZHJhZ1BvcyA9IF90aGlzLmRyYWdnZWRBeGlzID09PSAneCcgJiYgX3RoaXMuaXNSdGxcbiAgICAgICAgICAgICAgICA/ICgoX2sgPSAoX2ogPSB0cmFjay5yZWN0KSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2pbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfayAhPT0gdm9pZCAwID8gX2sgOiAwKSAtXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGJhci5zaXplIC1cbiAgICAgICAgICAgICAgICAgICAgZHJhZ1Bvc1xuICAgICAgICAgICAgICAgIDogZHJhZ1BvcztcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIG1vdXNlIHBvc2l0aW9uIGludG8gYSBwZXJjZW50YWdlIG9mIHRoZSBzY3JvbGxiYXIgaGVpZ2h0L3dpZHRoLlxuICAgICAgICAgICAgdmFyIGRyYWdQZXJjID0gZHJhZ1BvcyAvICh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSk7XG4gICAgICAgICAgICAvLyBTY3JvbGwgdGhlIGNvbnRlbnQgYnkgdGhlIHNhbWUgcGVyY2VudGFnZS5cbiAgICAgICAgICAgIHZhciBzY3JvbGxQb3MgPSBkcmFnUGVyYyAqIChjb250ZW50U2l6ZSAtIGhvc3RTaXplKTtcbiAgICAgICAgICAgIC8vIEZpeCBicm93c2VycyBpbmNvbnNpc3RlbmN5IG9uIFJUTFxuICAgICAgICAgICAgaWYgKF90aGlzLmRyYWdnZWRBeGlzID09PSAneCcgJiYgX3RoaXMuaXNSdGwpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxQb3MgPSAoKF9sID0gU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzKCkpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5pc1Njcm9sbGluZ1RvTmVnYXRpdmUpXG4gICAgICAgICAgICAgICAgICAgID8gLXNjcm9sbFBvc1xuICAgICAgICAgICAgICAgICAgICA6IHNjcm9sbFBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNvbnRlbnRXcmFwcGVyRWxbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl0gPVxuICAgICAgICAgICAgICAgIHNjcm9sbFBvcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuZCBzY3JvbGwgaGFuZGxlIGRyYWdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25FbmREcmFnID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KF90aGlzLmVsKTtcbiAgICAgICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3coX3RoaXMuZWwpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuZHJhZ2dpbmcpO1xuICAgICAgICAgICAgZWxEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBfdGhpcy5kcmFnLCB0cnVlKTtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF90aGlzLm9uRW5kRHJhZywgdHJ1ZSk7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IGVsV2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGVzZSBhc3luY2hyb25vdXNseSBzbyB3ZSBzdGlsbCBzdXBwcmVzcyBjbGljayBldmVudHNcbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZWQgc2ltdWx0YW5lb3VzbHkgd2l0aCBtb3VzZXVwLlxuICAgICAgICAgICAgICAgIGVsRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfdGhpcy5wcmV2ZW50Q2xpY2ssIHRydWUpO1xuICAgICAgICAgICAgICAgIGVsRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCBfdGhpcy5wcmV2ZW50Q2xpY2ssIHRydWUpO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlciB0byBpZ25vcmUgY2xpY2sgZXZlbnRzIGR1cmluZyBkcmFnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnByZXZlbnRDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIFNpbXBsZUJhckNvcmUuZGVmYXVsdE9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWVzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIFNpbXBsZUJhckNvcmUuZGVmYXVsdE9wdGlvbnMuY2xhc3NOYW1lcyksIG9wdGlvbnMuY2xhc3NOYW1lcyk7XG4gICAgICAgIHRoaXMuYXhpcyA9IHtcbiAgICAgICAgICAgIHg6IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxPZmZzZXRBdHRyOiAnc2Nyb2xsTGVmdCcsXG4gICAgICAgICAgICAgICAgc2l6ZUF0dHI6ICd3aWR0aCcsXG4gICAgICAgICAgICAgICAgc2Nyb2xsU2l6ZUF0dHI6ICdzY3JvbGxXaWR0aCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0U2l6ZUF0dHI6ICdvZmZzZXRXaWR0aCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0QXR0cjogJ2xlZnQnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93QXR0cjogJ292ZXJmbG93WCcsXG4gICAgICAgICAgICAgICAgZHJhZ09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBpc092ZXJmbG93aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZvcmNlVmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdHJhY2s6IHsgc2l6ZTogbnVsbCwgZWw6IG51bGwsIHJlY3Q6IG51bGwsIGlzVmlzaWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGxiYXI6IHsgc2l6ZTogbnVsbCwgZWw6IG51bGwsIHJlY3Q6IG51bGwsIGlzVmlzaWJsZTogZmFsc2UgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHk6IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxPZmZzZXRBdHRyOiAnc2Nyb2xsVG9wJyxcbiAgICAgICAgICAgICAgICBzaXplQXR0cjogJ2hlaWdodCcsXG4gICAgICAgICAgICAgICAgc2Nyb2xsU2l6ZUF0dHI6ICdzY3JvbGxIZWlnaHQnLFxuICAgICAgICAgICAgICAgIG9mZnNldFNpemVBdHRyOiAnb2Zmc2V0SGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBvZmZzZXRBdHRyOiAndG9wJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvd0F0dHI6ICdvdmVyZmxvd1knLFxuICAgICAgICAgICAgICAgIGRyYWdPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaXNPdmVyZmxvd2luZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb3JjZVZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRyYWNrOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsYmFyOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVsICE9PSAnb2JqZWN0JyB8fCAhdGhpcy5lbC5ub2RlTmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIHRvIFNpbXBsZUJhciBtdXN0IGJlIGFuIEhUTUwgZWxlbWVudCBpbnN0ZWFkIG9mIFwiLmNvbmNhdCh0aGlzLmVsKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZSA9IHRocm90dGxlKHRoaXMuX29uTW91c2VNb3ZlLCA2NCk7XG4gICAgICAgIHRoaXMub25XaW5kb3dSZXNpemUgPSBkZWJvdW5jZSh0aGlzLl9vbldpbmRvd1Jlc2l6ZSwgNjQsIHsgbGVhZGluZzogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5vblN0b3BTY3JvbGxpbmcgPSBkZWJvdW5jZSh0aGlzLl9vblN0b3BTY3JvbGxpbmcsIHRoaXMuc3RvcFNjcm9sbERlbGF5KTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXJlZCA9IGRlYm91bmNlKHRoaXMuX29uTW91c2VFbnRlcmVkLCB0aGlzLnN0b3BTY3JvbGxEZWxheSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgdG8gZml4IGJyb3dzZXJzIGluY29uc2lzdGVuY3kgb24gUlRMOlxuICAgICAqICAtIEZpcmVmb3ggaW52ZXJ0cyB0aGUgc2Nyb2xsYmFyIGluaXRpYWwgcG9zaXRpb25cbiAgICAgKiAgLSBJRTExIGludmVydHMgYm90aCBzY3JvbGxiYXIgcG9zaXRpb24gYW5kIHNjcm9sbGluZyBvZmZzZXRcbiAgICAgKiBEaXJlY3RseSBpbnNwaXJlZCBieSBAS2luZ1NvcmEncyBPdmVybGF5U2Nyb2xsYmFycyBodHRwczovL2dpdGh1Yi5jb20vS2luZ1NvcmEvT3ZlcmxheVNjcm9sbGJhcnMvYmxvYi9tYXN0ZXIvanMvT3ZlcmxheVNjcm9sbGJhcnMuanMjTDE2MzRcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR1bW15RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGR1bW15RGl2LmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNpbXBsZWJhci1kdW1teS1zY3JvbGxiYXItc2l6ZVwiPjxkaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgdmFyIHNjcm9sbGJhckR1bW15RWwgPSBkdW1teURpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgdmFyIGR1bW15Q2hpbGQgPSBzY3JvbGxiYXJEdW1teUVsID09PSBudWxsIHx8IHNjcm9sbGJhckR1bW15RWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjcm9sbGJhckR1bW15RWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmICghZHVtbXlDaGlsZClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbGJhckR1bW15RWwpO1xuICAgICAgICBzY3JvbGxiYXJEdW1teUVsLnNjcm9sbExlZnQgPSAwO1xuICAgICAgICB2YXIgZHVtbXlDb250YWluZXJPZmZzZXQgPSBTaW1wbGVCYXJDb3JlLmdldE9mZnNldChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgdmFyIGR1bW15Q2hpbGRPZmZzZXQgPSBTaW1wbGVCYXJDb3JlLmdldE9mZnNldChkdW1teUNoaWxkKTtcbiAgICAgICAgc2Nyb2xsYmFyRHVtbXlFbC5zY3JvbGxMZWZ0ID0gLTk5OTtcbiAgICAgICAgdmFyIGR1bW15Q2hpbGRPZmZzZXRBZnRlclNjcm9sbCA9IFNpbXBsZUJhckNvcmUuZ2V0T2Zmc2V0KGR1bW15Q2hpbGQpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbGJhckR1bW15RWwpO1xuICAgICAgICBTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnMgPSB7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmVzIGlmIHRoZSBzY3JvbGxpbmcgaXMgcmVzcG9uZGluZyB3aXRoIG5lZ2F0aXZlIHZhbHVlc1xuICAgICAgICAgICAgaXNTY3JvbGxPcmlnaW5BdFplcm86IGR1bW15Q29udGFpbmVyT2Zmc2V0LmxlZnQgIT09IGR1bW15Q2hpbGRPZmZzZXQubGVmdCxcbiAgICAgICAgICAgIC8vIGRldGVybWluZXMgaWYgdGhlIG9yaWdpbiBzY3JvbGxiYXIgcG9zaXRpb24gaXMgaW52ZXJ0ZWQgb3Igbm90IChwb3NpdGlvbmVkIG9uIGxlZnQgb3IgcmlnaHQpXG4gICAgICAgICAgICBpc1Njcm9sbGluZ1RvTmVnYXRpdmU6IGR1bW15Q2hpbGRPZmZzZXQubGVmdCAhPT0gZHVtbXlDaGlsZE9mZnNldEFmdGVyU2Nyb2xsLmxlZnRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFNpbXBsZUJhckNvcmUucnRsSGVscGVycztcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbGJhcldpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBUcnkvY2F0Y2ggZm9yIEZGIDU2IHRocm93aW5nIG9uIHVuZGVmaW5lZCBjb21wdXRlZFN0eWxlc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRGV0ZWN0IGJyb3dzZXJzIHN1cHBvcnRpbmcgQ1NTIHNjcm9sbGJhciBzdHlsaW5nIGFuZCBkbyBub3QgY2FsY3VsYXRlXG4gICAgICAgICAgICBpZiAoKHRoaXMuY29udGVudFdyYXBwZXJFbCAmJlxuICAgICAgICAgICAgICAgIGdldENvbXB1dGVkU3R5bGUodGhpcy5jb250ZW50V3JhcHBlckVsLCAnOjotd2Via2l0LXNjcm9sbGJhcicpXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwbGF5ID09PSAnbm9uZScpIHx8XG4gICAgICAgICAgICAgICAgJ3Njcm9sbGJhcldpZHRoJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgfHxcbiAgICAgICAgICAgICAgICAnLW1zLW92ZXJmbG93LXN0eWxlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGVsRG9jdW1lbnQgPSBnZXRFbGVtZW50RG9jdW1lbnQoZWwpO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KGVsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgK1xuICAgICAgICAgICAgICAgIChlbFdpbmRvdy5wYWdlWU9mZnNldCB8fCBlbERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICtcbiAgICAgICAgICAgICAgICAoZWxXaW5kb3cucGFnZVhPZmZzZXQgfHwgZWxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFdlIHN0b3AgaGVyZSBvbiBzZXJ2ZXItc2lkZVxuICAgICAgICBpZiAoY2FuVXNlRE9NKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRET00oKTtcbiAgICAgICAgICAgIHRoaXMucnRsSGVscGVycyA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMuZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pbml0RE9NID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAvLyBhc3N1bWUgdGhhdCBlbGVtZW50IGhhcyBoaXMgRE9NIGFscmVhZHkgaW5pdGlhdGVkXG4gICAgICAgIHRoaXMud3JhcHBlckVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy53cmFwcGVyKSk7XG4gICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbCA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2Nyb2xsYWJsZU5vZGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmNvbnRlbnRXcmFwcGVyKSk7XG4gICAgICAgIHRoaXMuY29udGVudEVsID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jb250ZW50Tm9kZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuY29udGVudEVsKSk7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLm9mZnNldCkpO1xuICAgICAgICB0aGlzLm1hc2tFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMubWFzaykpO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwgPSB0aGlzLmZpbmRDaGlsZCh0aGlzLndyYXBwZXJFbCwgY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnBsYWNlaG9sZGVyKSk7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwpKTtcbiAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyRWwpKTtcbiAgICAgICAgdGhpcy5heGlzLngudHJhY2suZWwgPSB0aGlzLmZpbmRDaGlsZCh0aGlzLmVsLCBcIlwiLmNvbmNhdChjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMudHJhY2spKS5jb25jYXQoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmhvcml6b250YWwpKSk7XG4gICAgICAgIHRoaXMuYXhpcy55LnRyYWNrLmVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy5lbCwgXCJcIi5jb25jYXQoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnRyYWNrKSkuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy52ZXJ0aWNhbCkpKTtcbiAgICAgICAgdGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsID1cbiAgICAgICAgICAgICgoX2EgPSB0aGlzLmF4aXMueC50cmFjay5lbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcikpKSB8fCBudWxsO1xuICAgICAgICB0aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwgPVxuICAgICAgICAgICAgKChfYiA9IHRoaXMuYXhpcy55LnRyYWNrLmVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuc2Nyb2xsYmFyKSkpIHx8IG51bGw7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLnZpc2libGUpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy52aXNpYmxlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaW5pdExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vbk1vdXNlRW50ZXIpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5vblBvaW50ZXJFdmVudCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub25Nb3VzZUxlYXZlKTtcbiAgICAgICAgKF9hID0gdGhpcy5jb250ZW50V3JhcHBlckVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgIC8vIEJyb3dzZXIgem9vbSB0cmlnZ2VycyBhIHdpbmRvdyByZXNpemVcbiAgICAgICAgZWxXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIGlmICghdGhpcy5jb250ZW50RWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh3aW5kb3cuUmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIC8vIEhhY2sgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL1Jlc2l6ZU9ic2VydmVyL2lzc3Vlcy8zOFxuICAgICAgICAgICAgdmFyIHJlc2l6ZU9ic2VydmVyU3RhcnRlZF8xID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcmVzaXplT2JzZXJ2ZXIgPSBlbFdpbmRvdy5SZXNpemVPYnNlcnZlciB8fCBSZXNpemVPYnNlcnZlcjtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgcmVzaXplT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzaXplT2JzZXJ2ZXJTdGFydGVkXzEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbCk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNpemVPYnNlcnZlclN0YXJ0ZWRfMSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIHRvIGRldGVjdCBob3Jpem9udGFsIHNjcm9sbC4gVmVydGljYWwgc2Nyb2xsIG9ubHkgbmVlZHMgdGhlIHJlc2l6ZU9ic2VydmVyLlxuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgZWxXaW5kb3cuTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGVudEVsLCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnJlY2FsY3VsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgfHxcbiAgICAgICAgICAgICF0aGlzLmNvbnRlbnRFbCB8fFxuICAgICAgICAgICAgIXRoaXMuY29udGVudFdyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXRoaXMud3JhcHBlckVsIHx8XG4gICAgICAgICAgICAhdGhpcy5wbGFjZWhvbGRlckVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICB0aGlzLmVsU3R5bGVzID0gZWxXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5pc1J0bCA9IHRoaXMuZWxTdHlsZXMuZGlyZWN0aW9uID09PSAncnRsJztcbiAgICAgICAgdmFyIGNvbnRlbnRFbE9mZnNldFdpZHRoID0gdGhpcy5jb250ZW50RWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIHZhciBpc0hlaWdodEF1dG8gPSB0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsLm9mZnNldEhlaWdodCA8PSAxO1xuICAgICAgICB2YXIgaXNXaWR0aEF1dG8gPSB0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsLm9mZnNldFdpZHRoIDw9IDEgfHwgY29udGVudEVsT2Zmc2V0V2lkdGggPiAwO1xuICAgICAgICB2YXIgY29udGVudFdyYXBwZXJFbE9mZnNldFdpZHRoID0gdGhpcy5jb250ZW50V3JhcHBlckVsLm9mZnNldFdpZHRoO1xuICAgICAgICB2YXIgZWxPdmVyZmxvd1ggPSB0aGlzLmVsU3R5bGVzLm92ZXJmbG93WDtcbiAgICAgICAgdmFyIGVsT3ZlcmZsb3dZID0gdGhpcy5lbFN0eWxlcy5vdmVyZmxvd1k7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnBhZGRpbmcgPSBcIlwiLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdUb3AsIFwiIFwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nUmlnaHQsIFwiIFwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nQm90dG9tLCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0xlZnQpO1xuICAgICAgICB0aGlzLndyYXBwZXJFbC5zdHlsZS5tYXJnaW4gPSBcIi1cIi5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nVG9wLCBcIiAtXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdSaWdodCwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nQm90dG9tLCBcIiAtXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdMZWZ0KTtcbiAgICAgICAgdmFyIGNvbnRlbnRFbFNjcm9sbEhlaWdodCA9IHRoaXMuY29udGVudEVsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgdmFyIGNvbnRlbnRFbFNjcm9sbFdpZHRoID0gdGhpcy5jb250ZW50RWwuc2Nyb2xsV2lkdGg7XG4gICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBpc0hlaWdodEF1dG8gPyAnYXV0bycgOiAnMTAwJSc7XG4gICAgICAgIC8vIERldGVybWluZSBwbGFjZWhvbGRlciBzaXplXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbC5zdHlsZS53aWR0aCA9IGlzV2lkdGhBdXRvXG4gICAgICAgICAgICA/IFwiXCIuY29uY2F0KGNvbnRlbnRFbE9mZnNldFdpZHRoIHx8IGNvbnRlbnRFbFNjcm9sbFdpZHRoLCBcInB4XCIpXG4gICAgICAgICAgICA6ICdhdXRvJztcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KGNvbnRlbnRFbFNjcm9sbEhlaWdodCwgXCJweFwiKTtcbiAgICAgICAgdmFyIGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRIZWlnaHQgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGNvbnRlbnRFbE9mZnNldFdpZHRoICE9PSAwICYmIGNvbnRlbnRFbFNjcm9sbFdpZHRoID4gY29udGVudEVsT2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgPVxuICAgICAgICAgICAgY29udGVudEVsU2Nyb2xsSGVpZ2h0ID4gY29udGVudFdyYXBwZXJFbE9mZnNldEhlaWdodDtcbiAgICAgICAgLy8gU2V0IGlzT3ZlcmZsb3dpbmcgdG8gZmFsc2UgaWYgdXNlciBleHBsaWNpdGVseSBzZXQgaGlkZGVuIG92ZXJmbG93XG4gICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgPVxuICAgICAgICAgICAgZWxPdmVyZmxvd1ggPT09ICdoaWRkZW4nID8gZmFsc2UgOiB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGVsT3ZlcmZsb3dZID09PSAnaGlkZGVuJyA/IGZhbHNlIDogdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZztcbiAgICAgICAgdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JjZVZpc2libGUgPT09ICd4JyB8fCB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSB0cnVlO1xuICAgICAgICB0aGlzLmF4aXMueS5mb3JjZVZpc2libGUgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvcmNlVmlzaWJsZSA9PT0gJ3knIHx8IHRoaXMub3B0aW9ucy5mb3JjZVZpc2libGUgPT09IHRydWU7XG4gICAgICAgIHRoaXMuaGlkZU5hdGl2ZVNjcm9sbGJhcigpO1xuICAgICAgICAvLyBTZXQgaXNPdmVyZmxvd2luZyB0byBmYWxzZSBpZiBzY3JvbGxiYXIgaXMgbm90IG5lY2Vzc2FyeSAoY29udGVudCBpcyBzaG9ydGVyIHRoYW4gb2Zmc2V0KVxuICAgICAgICB2YXIgb2Zmc2V0Rm9yWFNjcm9sbGJhciA9IHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmdcbiAgICAgICAgICAgID8gdGhpcy5zY3JvbGxiYXJXaWR0aFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICB2YXIgb2Zmc2V0Rm9yWVNjcm9sbGJhciA9IHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmdcbiAgICAgICAgICAgID8gdGhpcy5zY3JvbGxiYXJXaWR0aFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgJiZcbiAgICAgICAgICAgICAgICBjb250ZW50RWxTY3JvbGxXaWR0aCA+IGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRXaWR0aCAtIG9mZnNldEZvcllTY3JvbGxiYXI7XG4gICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgPVxuICAgICAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyAmJlxuICAgICAgICAgICAgICAgIGNvbnRlbnRFbFNjcm9sbEhlaWdodCA+XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRIZWlnaHQgLSBvZmZzZXRGb3JYU2Nyb2xsYmFyO1xuICAgICAgICB0aGlzLmF4aXMueC5zY3JvbGxiYXIuc2l6ZSA9IHRoaXMuZ2V0U2Nyb2xsYmFyU2l6ZSgneCcpO1xuICAgICAgICB0aGlzLmF4aXMueS5zY3JvbGxiYXIuc2l6ZSA9IHRoaXMuZ2V0U2Nyb2xsYmFyU2l6ZSgneScpO1xuICAgICAgICBpZiAodGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsKVxuICAgICAgICAgICAgdGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsLnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQodGhpcy5heGlzLnguc2Nyb2xsYmFyLnNpemUsIFwicHhcIik7XG4gICAgICAgIGlmICh0aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwpXG4gICAgICAgICAgICB0aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwuc3R5bGUuaGVpZ2h0ID0gXCJcIi5jb25jYXQodGhpcy5heGlzLnkuc2Nyb2xsYmFyLnNpemUsIFwicHhcIik7XG4gICAgICAgIHRoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblNjcm9sbGJhcigneScpO1xuICAgICAgICB0aGlzLnRvZ2dsZVRyYWNrVmlzaWJpbGl0eSgneCcpO1xuICAgICAgICB0aGlzLnRvZ2dsZVRyYWNrVmlzaWJpbGl0eSgneScpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHNjcm9sbGJhciBzaXplXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuZ2V0U2Nyb2xsYmFyU2l6ZSA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICBpZiAoIXRoaXMuYXhpc1theGlzXS5pc092ZXJmbG93aW5nIHx8ICF0aGlzLmNvbnRlbnRFbCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRlbnRTaXplID0gdGhpcy5jb250ZW50RWxbdGhpcy5heGlzW2F4aXNdLnNjcm9sbFNpemVBdHRyXTtcbiAgICAgICAgdmFyIHRyYWNrU2l6ZSA9IChfYiA9IChfYSA9IHRoaXMuYXhpc1theGlzXS50cmFjay5lbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RoaXMuYXhpc1theGlzXS5vZmZzZXRTaXplQXR0cl0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDA7XG4gICAgICAgIHZhciBzY3JvbGxiYXJSYXRpbyA9IHRyYWNrU2l6ZSAvIGNvbnRlbnRTaXplO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyU2l6ZTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBoZWlnaHQvcG9zaXRpb24gb2YgZHJhZyBoYW5kbGUuXG4gICAgICAgIHNjcm9sbGJhclNpemUgPSBNYXRoLm1heCh+fihzY3JvbGxiYXJSYXRpbyAqIHRyYWNrU2l6ZSksIHRoaXMub3B0aW9ucy5zY3JvbGxiYXJNaW5TaXplKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zY3JvbGxiYXJNYXhTaXplKSB7XG4gICAgICAgICAgICBzY3JvbGxiYXJTaXplID0gTWF0aC5taW4oc2Nyb2xsYmFyU2l6ZSwgdGhpcy5vcHRpb25zLnNjcm9sbGJhck1heFNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzY3JvbGxiYXJTaXplO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUucG9zaXRpb25TY3JvbGxiYXIgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBzY3JvbGxiYXIgPSB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyO1xuICAgICAgICBpZiAoIXRoaXMuYXhpc1theGlzXS5pc092ZXJmbG93aW5nIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50V3JhcHBlckVsIHx8XG4gICAgICAgICAgICAhc2Nyb2xsYmFyLmVsIHx8XG4gICAgICAgICAgICAhdGhpcy5lbFN0eWxlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsU2l6ZUF0dHJdO1xuICAgICAgICB2YXIgdHJhY2tTaXplID0gKChfYSA9IHRoaXMuYXhpc1theGlzXS50cmFjay5lbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RoaXMuYXhpc1theGlzXS5vZmZzZXRTaXplQXR0cl0pIHx8IDA7XG4gICAgICAgIHZhciBob3N0U2l6ZSA9IHBhcnNlSW50KHRoaXMuZWxTdHlsZXNbdGhpcy5heGlzW2F4aXNdLnNpemVBdHRyXSwgMTApO1xuICAgICAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5jb250ZW50V3JhcHBlckVsW3RoaXMuYXhpc1theGlzXS5zY3JvbGxPZmZzZXRBdHRyXTtcbiAgICAgICAgc2Nyb2xsT2Zmc2V0ID1cbiAgICAgICAgICAgIGF4aXMgPT09ICd4JyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNSdGwgJiZcbiAgICAgICAgICAgICAgICAoKF9iID0gU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pc1Njcm9sbE9yaWdpbkF0WmVybylcbiAgICAgICAgICAgICAgICA/IC1zY3JvbGxPZmZzZXRcbiAgICAgICAgICAgICAgICA6IHNjcm9sbE9mZnNldDtcbiAgICAgICAgaWYgKGF4aXMgPT09ICd4JyAmJiB0aGlzLmlzUnRsKSB7XG4gICAgICAgICAgICBzY3JvbGxPZmZzZXQgPSAoKF9jID0gU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzKCkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pc1Njcm9sbGluZ1RvTmVnYXRpdmUpXG4gICAgICAgICAgICAgICAgPyBzY3JvbGxPZmZzZXRcbiAgICAgICAgICAgICAgICA6IC1zY3JvbGxPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjcm9sbFBvdXJjZW50ID0gc2Nyb2xsT2Zmc2V0IC8gKGNvbnRlbnRTaXplIC0gaG9zdFNpemUpO1xuICAgICAgICB2YXIgaGFuZGxlT2Zmc2V0ID0gfn4oKHRyYWNrU2l6ZSAtIHNjcm9sbGJhci5zaXplKSAqIHNjcm9sbFBvdXJjZW50KTtcbiAgICAgICAgaGFuZGxlT2Zmc2V0ID1cbiAgICAgICAgICAgIGF4aXMgPT09ICd4JyAmJiB0aGlzLmlzUnRsXG4gICAgICAgICAgICAgICAgPyAtaGFuZGxlT2Zmc2V0ICsgKHRyYWNrU2l6ZSAtIHNjcm9sbGJhci5zaXplKVxuICAgICAgICAgICAgICAgIDogaGFuZGxlT2Zmc2V0O1xuICAgICAgICBzY3JvbGxiYXIuZWwuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgICAgIGF4aXMgPT09ICd4J1xuICAgICAgICAgICAgICAgID8gXCJ0cmFuc2xhdGUzZChcIi5jb25jYXQoaGFuZGxlT2Zmc2V0LCBcInB4LCAwLCAwKVwiKVxuICAgICAgICAgICAgICAgIDogXCJ0cmFuc2xhdGUzZCgwLCBcIi5jb25jYXQoaGFuZGxlT2Zmc2V0LCBcInB4LCAwKVwiKTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnRvZ2dsZVRyYWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgdHJhY2sgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWw7XG4gICAgICAgIHZhciBzY3JvbGxiYXIgPSB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsO1xuICAgICAgICBpZiAoIXRyYWNrIHx8ICFzY3JvbGxiYXIgfHwgIXRoaXMuY29udGVudFdyYXBwZXJFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuYXhpc1theGlzXS5pc092ZXJmbG93aW5nIHx8IHRoaXMuYXhpc1theGlzXS5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgIHRyYWNrLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwuc3R5bGVbdGhpcy5heGlzW2F4aXNdLm92ZXJmbG93QXR0cl0gPSAnc2Nyb2xsJztcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdCh0aGlzLmNsYXNzTmFtZXMuc2Nyb2xsYWJsZSwgXCItXCIpLmNvbmNhdChheGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFjay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwuc3R5bGVbdGhpcy5heGlzW2F4aXNdLm92ZXJmbG93QXR0cl0gPSAnaGlkZGVuJztcbiAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcIlwiLmNvbmNhdCh0aGlzLmNsYXNzTmFtZXMuc2Nyb2xsYWJsZSwgXCItXCIpLmNvbmNhdChheGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXZlbiBpZiBmb3JjZVZpc2libGUgaXMgZW5hYmxlZCwgc2Nyb2xsYmFyIGl0c2VsZiBzaG91bGQgYmUgaGlkZGVuXG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZykge1xuICAgICAgICAgICAgc2Nyb2xsYmFyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2Nyb2xsYmFyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnNob3dTY3JvbGxiYXIgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgaWYgKHRoaXMuYXhpc1theGlzXS5pc092ZXJmbG93aW5nICYmICF0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgICAgICB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmhpZGVTY3JvbGxiYXIgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgaWYgKHRoaXMuYXhpc1theGlzXS5pc092ZXJmbG93aW5nICYmIHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy52aXNpYmxlKTtcbiAgICAgICAgICAgIHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmhpZGVOYXRpdmVTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5vZmZzZXRFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5vZmZzZXRFbC5zdHlsZVt0aGlzLmlzUnRsID8gJ2xlZnQnIDogJ3JpZ2h0J10gPVxuICAgICAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCB0aGlzLmF4aXMueS5mb3JjZVZpc2libGVcbiAgICAgICAgICAgICAgICA/IFwiLVwiLmNvbmNhdCh0aGlzLnNjcm9sbGJhcldpZHRoLCBcInB4XCIpXG4gICAgICAgICAgICAgICAgOiAnMHB4JztcbiAgICAgICAgdGhpcy5vZmZzZXRFbC5zdHlsZS5ib3R0b20gPVxuICAgICAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyB8fCB0aGlzLmF4aXMueC5mb3JjZVZpc2libGVcbiAgICAgICAgICAgICAgICA/IFwiLVwiLmNvbmNhdCh0aGlzLnNjcm9sbGJhcldpZHRoLCBcInB4XCIpXG4gICAgICAgICAgICAgICAgOiAnMHB4JztcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLm9uTW91c2VNb3ZlRm9yQXhpcyA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgY3VycmVudEF4aXMgPSB0aGlzLmF4aXNbYXhpc107XG4gICAgICAgIGlmICghY3VycmVudEF4aXMudHJhY2suZWwgfHwgIWN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY3VycmVudEF4aXMudHJhY2sucmVjdCA9IGN1cnJlbnRBeGlzLnRyYWNrLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjdXJyZW50QXhpcy5zY3JvbGxiYXIucmVjdCA9XG4gICAgICAgICAgICBjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmlzV2l0aGluQm91bmRzKGN1cnJlbnRBeGlzLnRyYWNrLnJlY3QpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTY3JvbGxiYXIoYXhpcyk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKGN1cnJlbnRBeGlzLnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNXaXRoaW5Cb3VuZHMoY3VycmVudEF4aXMuc2Nyb2xsYmFyLnJlY3QpKSB7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NlcyhjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKGN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoY3VycmVudEF4aXMudHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlU2Nyb2xsYmFyKGF4aXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbk1vdXNlTGVhdmVGb3JBeGlzID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHJlbW92ZUNsYXNzZXModGhpcy5heGlzW2F4aXNdLnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICByZW1vdmVDbGFzc2VzKHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0hpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVNjcm9sbGJhcihheGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogb24gc2Nyb2xsYmFyIGhhbmRsZSBkcmFnIG1vdmVtZW50IHN0YXJ0c1xuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLm9uRHJhZ1N0YXJ0ID0gZnVuY3Rpb24gKGUsIGF4aXMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIGVsRG9jdW1lbnQgPSBnZXRFbGVtZW50RG9jdW1lbnQodGhpcy5lbCk7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIHZhciBzY3JvbGxiYXIgPSB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyO1xuICAgICAgICAvLyBNZWFzdXJlIGhvdyBmYXIgdGhlIHVzZXIncyBtb3VzZSBpcyBmcm9tIHRoZSB0b3Agb2YgdGhlIHNjcm9sbGJhciBkcmFnIGhhbmRsZS5cbiAgICAgICAgdmFyIGV2ZW50T2Zmc2V0ID0gYXhpcyA9PT0gJ3knID8gZS5wYWdlWSA6IGUucGFnZVg7XG4gICAgICAgIHRoaXMuYXhpc1theGlzXS5kcmFnT2Zmc2V0ID1cbiAgICAgICAgICAgIGV2ZW50T2Zmc2V0IC0gKCgoX2EgPSBzY3JvbGxiYXIucmVjdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RoaXMuYXhpc1theGlzXS5vZmZzZXRBdHRyXSkgfHwgMCk7XG4gICAgICAgIHRoaXMuZHJhZ2dlZEF4aXMgPSBheGlzO1xuICAgICAgICBhZGRDbGFzc2VzKHRoaXMuZWwsIHRoaXMuY2xhc3NOYW1lcy5kcmFnZ2luZyk7XG4gICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kcmFnLCB0cnVlKTtcbiAgICAgICAgZWxEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkVuZERyYWcsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZWxEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLnByZXZlbnRDbGljaywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbFdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUub25UcmFja0NsaWNrID0gZnVuY3Rpb24gKGUsIGF4aXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIGN1cnJlbnRBeGlzID0gdGhpcy5heGlzW2F4aXNdO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5jbGlja09uVHJhY2sgfHxcbiAgICAgICAgICAgICFjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwgfHxcbiAgICAgICAgICAgICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIFByZXZlbnRpbmcgdGhlIGV2ZW50J3MgZGVmYXVsdCB0byB0cmlnZ2VyIGNsaWNrIHVuZGVybmVhdGhcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgdmFyIHNjcm9sbGJhck9mZnNldCA9IChfYiA9IChfYSA9IHNjcm9sbGJhci5yZWN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGhpcy5heGlzW2F4aXNdLm9mZnNldEF0dHJdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICB2YXIgaG9zdFNpemUgPSBwYXJzZUludCgoX2QgPSAoX2MgPSB0aGlzLmVsU3R5bGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbdGhpcy5heGlzW2F4aXNdLnNpemVBdHRyXSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogJzBweCcsIDEwKTtcbiAgICAgICAgdmFyIHNjcm9sbGVkID0gdGhpcy5jb250ZW50V3JhcHBlckVsW3RoaXMuYXhpc1theGlzXS5zY3JvbGxPZmZzZXRBdHRyXTtcbiAgICAgICAgdmFyIHQgPSBheGlzID09PSAneSdcbiAgICAgICAgICAgID8gdGhpcy5tb3VzZVkgLSBzY3JvbGxiYXJPZmZzZXRcbiAgICAgICAgICAgIDogdGhpcy5tb3VzZVggLSBzY3JvbGxiYXJPZmZzZXQ7XG4gICAgICAgIHZhciBkaXIgPSB0IDwgMCA/IC0xIDogMTtcbiAgICAgICAgdmFyIHNjcm9sbFNpemUgPSBkaXIgPT09IC0xID8gc2Nyb2xsZWQgLSBob3N0U2l6ZSA6IHNjcm9sbGVkICsgaG9zdFNpemU7XG4gICAgICAgIHZhciBzcGVlZCA9IDQwO1xuICAgICAgICB2YXIgc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmNvbnRlbnRXcmFwcGVyRWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGRpciA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBzY3JvbGxTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGVkIC09IHNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb250ZW50V3JhcHBlckVsW190aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl0gPSBzY3JvbGxlZDtcbiAgICAgICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbFRvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBzY3JvbGxTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGVkICs9IHNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb250ZW50V3JhcHBlckVsW190aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl0gPSBzY3JvbGxlZDtcbiAgICAgICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbFRvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjcm9sbFRvKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgZm9yIGNvbnRlbnQgZWxlbWVudFxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldENvbnRlbnRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50RWw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgZm9yIG9yaWdpbmFsIHNjcm9sbGluZyBlbGVtZW50XG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuZ2V0U2Nyb2xsRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFdyYXBwZXJFbDtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25Nb3VzZUVudGVyKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMub25Qb2ludGVyRXZlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VMZWF2ZSk7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRXcmFwcGVyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFdyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgICAgICBlbFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplKTtcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FuY2VsIGFsbCBkZWJvdW5jZWQgZnVuY3Rpb25zXG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMub25XaW5kb3dSZXNpemUuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMub25TdG9wU2Nyb2xsaW5nLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uTW91c2VFbnRlcmVkLmNhbmNlbCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZnJvbSBET00gbm9kZXNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS51bk1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgbW91c2UgaXMgd2l0aGluIGJvdW5kc1xuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmlzV2l0aGluQm91bmRzID0gZnVuY3Rpb24gKGJib3gpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vdXNlWCA+PSBiYm94LmxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMubW91c2VYIDw9IGJib3gubGVmdCArIGJib3gud2lkdGggJiZcbiAgICAgICAgICAgIHRoaXMubW91c2VZID49IGJib3gudG9wICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWSA8PSBiYm94LnRvcCArIGJib3guaGVpZ2h0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZpbmQgZWxlbWVudCBjaGlsZHJlbiBtYXRjaGVzIHF1ZXJ5XG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuZmluZENoaWxkID0gZnVuY3Rpb24gKGVsLCBxdWVyeSkge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IGVsLm1hdGNoZXMgfHxcbiAgICAgICAgICAgIGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBlbC5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbC5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcy5jYWxsKGNoaWxkLCBxdWVyeSk7XG4gICAgICAgIH0pWzBdO1xuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzID0gbnVsbDtcbiAgICBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBmb3JjZVZpc2libGU6IGZhbHNlLFxuICAgICAgICBjbGlja09uVHJhY2s6IHRydWUsXG4gICAgICAgIHNjcm9sbGJhck1pblNpemU6IDI1LFxuICAgICAgICBzY3JvbGxiYXJNYXhTaXplOiAwLFxuICAgICAgICBhcmlhTGFiZWw6ICdzY3JvbGxhYmxlIGNvbnRlbnQnLFxuICAgICAgICBjbGFzc05hbWVzOiB7XG4gICAgICAgICAgICBjb250ZW50RWw6ICdzaW1wbGViYXItY29udGVudCcsXG4gICAgICAgICAgICBjb250ZW50V3JhcHBlcjogJ3NpbXBsZWJhci1jb250ZW50LXdyYXBwZXInLFxuICAgICAgICAgICAgb2Zmc2V0OiAnc2ltcGxlYmFyLW9mZnNldCcsXG4gICAgICAgICAgICBtYXNrOiAnc2ltcGxlYmFyLW1hc2snLFxuICAgICAgICAgICAgd3JhcHBlcjogJ3NpbXBsZWJhci13cmFwcGVyJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnc2ltcGxlYmFyLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIHNjcm9sbGJhcjogJ3NpbXBsZWJhci1zY3JvbGxiYXInLFxuICAgICAgICAgICAgdHJhY2s6ICdzaW1wbGViYXItdHJhY2snLFxuICAgICAgICAgICAgaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsOiAnc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyLXdyYXBwZXInLFxuICAgICAgICAgICAgaGVpZ2h0QXV0b09ic2VydmVyRWw6ICdzaW1wbGViYXItaGVpZ2h0LWF1dG8tb2JzZXJ2ZXInLFxuICAgICAgICAgICAgdmlzaWJsZTogJ3NpbXBsZWJhci12aXNpYmxlJyxcbiAgICAgICAgICAgIGhvcml6b250YWw6ICdzaW1wbGViYXItaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogJ3NpbXBsZWJhci12ZXJ0aWNhbCcsXG4gICAgICAgICAgICBob3ZlcjogJ3NpbXBsZWJhci1ob3ZlcicsXG4gICAgICAgICAgICBkcmFnZ2luZzogJ3NpbXBsZWJhci1kcmFnZ2luZycsXG4gICAgICAgICAgICBzY3JvbGxpbmc6ICdzaW1wbGViYXItc2Nyb2xsaW5nJyxcbiAgICAgICAgICAgIHNjcm9sbGFibGU6ICdzaW1wbGViYXItc2Nyb2xsYWJsZScsXG4gICAgICAgICAgICBtb3VzZUVudGVyZWQ6ICdzaW1wbGViYXItbW91c2UtZW50ZXJlZCdcbiAgICAgICAgfSxcbiAgICAgICAgc2Nyb2xsYWJsZU5vZGU6IG51bGwsXG4gICAgICAgIGNvbnRlbnROb2RlOiBudWxsLFxuICAgICAgICBhdXRvSGlkZTogdHJ1ZVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU3RhdGljIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUuZ2V0T3B0aW9ucyA9IGdldE9wdGlvbnM7XG4gICAgU2ltcGxlQmFyQ29yZS5oZWxwZXJzID0gaGVscGVycztcbiAgICByZXR1cm4gU2ltcGxlQmFyQ29yZTtcbn0oKSk7XG5cbmV4cG9ydCB7IFNpbXBsZUJhckNvcmUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLyoqXG4gKiBzaW1wbGViYXIgLSB2Ni4yLjVcbiAqIFNjcm9sbGJhcnMsIHNpbXBsZXIuXG4gKiBodHRwczovL2dyc210by5naXRodWIuaW8vc2ltcGxlYmFyL1xuICpcbiAqIE1hZGUgYnkgQWRyaWVuIERlbmF0IGZyb20gYSBmb3JrIGJ5IEpvbmF0aGFuIE5pY29sXG4gKiBVbmRlciBNSVQgTGljZW5zZVxuICovXG5cbmltcG9ydCBjYW5Vc2VET00gZnJvbSAnY2FuLXVzZS1kb20nO1xuaW1wb3J0IFNpbXBsZUJhckNvcmUgZnJvbSAnc2ltcGxlYmFyLWNvcmUnO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cblxudmFyIF9hID0gU2ltcGxlQmFyQ29yZS5oZWxwZXJzLCBnZXRPcHRpb25zID0gX2EuZ2V0T3B0aW9ucywgYWRkQ2xhc3NlcyA9IF9hLmFkZENsYXNzZXM7XG52YXIgU2ltcGxlQmFyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaW1wbGVCYXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2ltcGxlQmFyKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5hcHBseSh0aGlzLCBhcmdzKSB8fCB0aGlzO1xuICAgICAgICAvLyAvLyBTYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSwgc28gd2Uga25vdyB0aGlzIERPTSBub2RlIGhhcyBhbHJlYWR5IGJlZW4gaW5zdGFuY2llZFxuICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLnNldChhcmdzWzBdLCBfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2ltcGxlQmFyLmluaXRET01Mb2FkZWRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlYmFyXScpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykgIT09ICdpbml0JyAmJlxuICAgICAgICAgICAgICAgICFTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhlbCkpXG4gICAgICAgICAgICAgICAgbmV3IFNpbXBsZUJhcihlbCwgZ2V0T3B0aW9ucyhlbC5hdHRyaWJ1dGVzKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IFNpbXBsZUJhci5nbG9iYWxPYnNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc2Nvbm5lY3QoKTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5wcm90b3R5cGUuaW5pdERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGlzIGVsZW1lbnQgZG9lc24ndCBoYXZlIHRoZSBlbGVtZW50cyB5ZXRcbiAgICAgICAgaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwodGhpcy5lbC5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKF90aGlzLmNsYXNzTmFtZXMud3JhcHBlcik7XG4gICAgICAgIH0pLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gUHJlcGFyZSBET01cbiAgICAgICAgICAgIHRoaXMud3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMubWFza0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLndyYXBwZXJFbCwgdGhpcy5jbGFzc05hbWVzLndyYXBwZXIpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmNvbnRlbnRXcmFwcGVyRWwsIHRoaXMuY2xhc3NOYW1lcy5jb250ZW50V3JhcHBlcik7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub2Zmc2V0RWwsIHRoaXMuY2xhc3NOYW1lcy5vZmZzZXQpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm1hc2tFbCwgdGhpcy5jbGFzc05hbWVzLm1hc2spO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmNvbnRlbnRFbCwgdGhpcy5jbGFzc05hbWVzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMucGxhY2Vob2xkZXJFbCwgdGhpcy5jbGFzc05hbWVzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwsIHRoaXMuY2xhc3NOYW1lcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsLCB0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyRWwpO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLmFwcGVuZENoaWxkKHRoaXMuZWwuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRFbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRXcmFwcGVyRWwpO1xuICAgICAgICAgICAgdGhpcy5tYXNrRWwuYXBwZW5kQ2hpbGQodGhpcy5vZmZzZXRFbCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMubWFza0VsKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMucGxhY2Vob2xkZXJFbCk7XG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlckVsKTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICAgICAgKF9iID0gdGhpcy5jb250ZW50V3JhcHBlckVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JlZ2lvbicpO1xuICAgICAgICAgICAgKF9jID0gdGhpcy5jb250ZW50V3JhcHBlckVsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGhpcy5vcHRpb25zLmFyaWFMYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmF4aXMueC50cmFjay5lbCB8fCAhdGhpcy5heGlzLnkudHJhY2suZWwpIHtcbiAgICAgICAgICAgIHZhciB0cmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdmFyIHNjcm9sbGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0cmFjaywgdGhpcy5jbGFzc05hbWVzLnRyYWNrKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXMoc2Nyb2xsYmFyLCB0aGlzLmNsYXNzTmFtZXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgICAgIHRyYWNrLmFwcGVuZENoaWxkKHNjcm9sbGJhcik7XG4gICAgICAgICAgICB0aGlzLmF4aXMueC50cmFjay5lbCA9IHRyYWNrLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLngudHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Jpem9udGFsKTtcbiAgICAgICAgICAgIHRoaXMuYXhpcy55LnRyYWNrLmVsID0gdHJhY2suY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXMueS50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLnZlcnRpY2FsKTtcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5heGlzLngudHJhY2suZWwpO1xuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmF4aXMueS50cmFjay5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaW5pdERPTS5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaW1wbGViYXInLCAnaW5pdCcpO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLnByb3RvdHlwZS51bk1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS51bk1vdW50LmNhbGwodGhpcyk7XG4gICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXNbXCJkZWxldGVcIl0odGhpcy5lbCk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIuaW5pdEh0bWxBcGkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzID0gdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMuYmluZCh0aGlzKTtcbiAgICAgICAgLy8gTXV0YXRpb25PYnNlcnZlciBpcyBJRTExK1xuICAgICAgICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBNdXRhdGlvbiBvYnNlcnZlciB0byBvYnNlcnZlIGR5bmFtaWNhbGx5IGFkZGVkIGVsZW1lbnRzXG4gICAgICAgICAgICB0aGlzLmdsb2JhbE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoU2ltcGxlQmFyLmhhbmRsZU11dGF0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbE9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRha2VuIGZyb20galF1ZXJ5IGByZWFkeWAgZnVuY3Rpb25cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgZWxlbWVudHMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBwYWdlXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IC8vIEB0cy1pZ25vcmU6IElFIHNwZWNpZmljXG4gICAgICAgICAgICAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnICYmICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgaW5pdFxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXIuaGFuZGxlTXV0YXRpb25zID0gZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcbiAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoYWRkZWROb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS1zaW1wbGViYXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIVNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKGFkZGVkTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoYWRkZWROb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoYWRkZWROb2RlLCBnZXRPcHRpb25zKGFkZGVkTm9kZS5hdHRyaWJ1dGVzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlYmFyXScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaW1wbGViYXInKSAhPT0gJ2luaXQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGVsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFNpbXBsZUJhcihlbCwgZ2V0T3B0aW9ucyhlbC5hdHRyaWJ1dGVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbW92ZWROb2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmVkTm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykgPT09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMocmVtb3ZlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhyZW1vdmVkTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLmdldChyZW1vdmVkTm9kZSkudW5Nb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChyZW1vdmVkTm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXI9XCJpbml0XCJdJyksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKGVsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGVsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLmdldChlbCkudW5Nb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIuaW5zdGFuY2VzID0gbmV3IFdlYWtNYXAoKTtcbiAgICByZXR1cm4gU2ltcGxlQmFyO1xufShTaW1wbGVCYXJDb3JlKSk7XG4vKipcbiAqIEhUTUwgQVBJXG4gKiBDYWxsZWQgb25seSBpbiBhIGJyb3dzZXIgZW52LlxuICovXG5pZiAoY2FuVXNlRE9NKSB7XG4gICAgU2ltcGxlQmFyLmluaXRIdG1sQXBpKCk7XG59XG5cbmV4cG9ydCB7IFNpbXBsZUJhciBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4uL3Njc3Mvc3R5bGUuc2Nzcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdXRpbHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMuanMnO1xuXG4vLyBoYW1idXJnZXIgbWVudVxudXRpbHMubWVudUluaXQoKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjb21wb25lbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gZm9ybXNcbmltcG9ydCAnLi91dGlscy9mb3Jtcyc7XG5cbi8vIHRhYnNcbmltcG9ydCAnLi91dGlscy90YWJzLmpzJztcblxuLy8gYWNjb3JkaW9uXG5pbXBvcnQgJy4vdXRpbHMvYWNjb3JkaW9uLmpzJztcblxuLy8gc2VsZWN0XG5pbXBvcnQgJy4vdXRpbHMvc2VsZWN0LmpzJztcblxuLy8gbW9kYWxzXG5pbXBvcnQgJy4vdXRpbHMvbW9kYWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0ICcuL2Rldi92em1zazEuanMnO1xuaW1wb3J0ICcuL2Rldi9tYXJrdXNETS5qcyc7XG5pbXBvcnQgJy4vZGV2L3VraWswLmpzJztcbmltcG9ydCAnLi9kZXYva2llNmVyLmpzJztcbiJdLCJuYW1lcyI6WyJtb2R1bGVzIiwiZGF0YU1lZGlhUXVlcmllcyIsIl9zbGlkZVRvZ2dsZSIsIl9zbGlkZVVwIiwiX3NsaWRlRG93biIsIkFjY29yZGlvbiIsImNvbnN0cnVjdG9yIiwiYWNjb3JkaW9uSXRlbXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtZFF1ZXJpZXNBcnJheSIsInJlZ0l0ZW1zIiwiQXJyYXkiLCJmcm9tIiwiZmlsdGVyIiwiaXRlbSIsImluZGV4Iiwic2VsZiIsImRhdGFzZXQiLCJhY2NvcmRpb24iLCJzcGxpdCIsImF0dHJzIiwiQUNDT1JESU9OIiwiSVRFTSIsIlNJTkdMRSIsImNsYXNzZXMiLCJJTklUIiwiQUNUSVZFIiwibGVuZ3RoIiwiaW5pdCIsIl90aGlzIiwiZm9yRWFjaCIsIm1kUXVlcmllc0l0ZW0iLCJtYXRjaE1lZGlhIiwiYWRkRXZlbnRMaXN0ZW5lciIsIml0ZW1zQXJyYXkiLCJoaWRlQm9keSIsImFjY29yZGlvbkdyb3VwIiwiYWN0aXZlVGl0bGUiLCJxdWVyeVNlbGVjdG9yIiwic3BlZWQiLCJhY2NvcmRpb25TcGVlZCIsInBhcnNlSW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic2V0QWN0aW9ucyIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGl0bGUiLCJncm91cCIsImlzU2luZ2xlIiwiaGFzQXR0cmlidXRlIiwiY29udGFpbnMiLCJ0b2dnbGUiLCJwcmV2ZW50RGVmYXVsdCIsImluaXRCb2R5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwidGl0bGVzIiwicmVtb3ZlQXR0cmlidXRlIiwiaGlkZGVuIiwic2V0QXR0cmlidXRlIiwibWF0Y2hlcyIsImFkZCIsImJpbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiVmFsaWRhdGlvbiIsIlJFUVVJUkVEIiwiSUdOT1JFX1ZBTElEQVRJT04iLCJBSkFYIiwiREVWIiwiSUdOT1JFX0ZPQ1VTIiwiU0hPV19QTEFDRUhPTERFUiIsIlZBTElEQVRFIiwiSEFTX0VSUk9SIiwiSEFTX0ZPQ1VTIiwiSVNfRklMTEVEIiwiSVNfUkVWRUFMRUQiLCJnZXRFcnJvcnMiLCJmb3JtIiwiZXJyIiwicmVxdWlyZWRGaWVsZHMiLCJyZXF1aXJlZEZpZWxkIiwib2Zmc2V0UGFyZW50IiwidGFnTmFtZSIsImRpc2FibGVkIiwidmFsaWRhdGVGaWVsZCIsImFkZEVycm9yIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUVycm9yIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0ZXN0RW1haWwiLCJ0eXBlIiwiY2hlY2tlZCIsInRyaW0iLCJjbGVhckZpZWxkcyIsInJlc2V0Iiwic2V0VGltZW91dCIsImlucHV0cyIsImNoZWNrYm94ZXMiLCJpbnB1dCIsImNoZWNrYm94IiwidGVzdCIsIkZvcm1TdWJtaXRpb24iLCJzaG91bGRWYWxpZGF0ZSIsImZvcm1zIiwic2VuZEZvcm0iLCJyZXNwb25zZVJlc3VsdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsInBvcHVwIiwibW9kYWwiLCJtb2RhbE1lc3NhZ2UiLCJvcGVuIiwiY29uc29sZSIsImxvZyIsImhhbmRsZVN1Ym1pdGlvbiIsImFqYXgiLCJhY3Rpb24iLCJnZXRBdHRyaWJ1dGUiLCJtZXRob2QiLCJkYXRhIiwiRm9ybURhdGEiLCJyZXNwb25zZSIsImZldGNoIiwiYm9keSIsIm9rIiwicmVzdWx0IiwianNvbiIsImFsZXJ0IiwicGFzc3dvcmRGaWVsZHMiLCJmaWVsZCIsImJ0biIsIkZvcm1GaWVsZHMiLCJmaWVsZHMiLCJzYXZlUGxhY2Vob2xkZXIiLCJwbGFjZWhvbGRlciIsImhhbmRsZUZvY3VzaW4iLCJoYW5kbGVGb2N1c291dCIsImJvZHlMb2NrU3RhdHVzIiwiYm9keUxvY2siLCJib2R5VW5sb2NrIiwiTW9kYWwiLCJvcHRpb25zIiwiY29uZmlnIiwibG9nZ2luZyIsImF0dHJpYnV0ZU9wZW5CdXR0b24iLCJhdHRyaWJ1dGVDbG9zZUJ1dHRvbiIsImZpeEVsZW1lbnRTZWxlY3RvciIsInlvdXR1YmVBdHRyaWJ1dGUiLCJ5b3V0dWJlUGxhY2VBdHRyaWJ1dGUiLCJzZXRBdXRvcGxheVlvdXR1YmUiLCJtb2RhbENvbnRlbnQiLCJtb2RhbEFjdGl2ZSIsImJvZHlBY3RpdmUiLCJmb2N1c0NhdGNoIiwiY2xvc2VFc2MiLCJoYXNoU2V0dGluZ3MiLCJsb2NhdGlvbiIsImdvSGFzaCIsIm9uIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInlvdVR1YmVDb2RlIiwiaXNPcGVuIiwidGFyZ2V0T3BlbiIsInNlbGVjdG9yIiwiZWxlbWVudCIsInByZXZpb3VzT3BlbiIsImxhc3RDbG9zZWQiLCJfZGF0YVZhbHVlIiwiaGFzaCIsIl9yZW9wZW4iLCJfc2VsZWN0b3JPcGVuIiwibGFzdEZvY3VzRWwiLCJfZm9jdXNFbCIsImluaXRtb2RhbHMiLCJldmVudHNtb2RhbCIsImJ1dHRvbk9wZW4iLCJidXR0b25DbG9zZSIsImNsb3NlIiwid2hpY2giLCJjb2RlIiwiX2ZvY3VzQ2F0Y2giLCJ3aW5kb3ciLCJfb3BlblRvSGFzaCIsInNlbGVjdG9yVmFsdWUiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmV2aW91c0FjdGl2ZUVsZW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29kZVZpZGVvIiwidXJsVmlkZW8iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiYXV0b3BsYXkiLCJ5b3V0dWJlUGxhY2UiLCJhcHBlbmRDaGlsZCIsIl9nZXRIYXNoIiwiX3NldEhhc2giLCJtIiwiaW5uZXJXaWR0aCIsIl9mb2N1c1RyYXAiLCJpbm5lckhUTUwiLCJfcmVtb3ZlSGFzaCIsImluY2x1ZGVzIiwiY2xhc3NJbkhhc2giLCJidXR0b25zIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhyZWYiLCJmb2N1c2FibGUiLCJmb2N1c0FycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9jdXNlZEluZGV4IiwiaW5kZXhPZiIsInNoaWZ0S2V5IiwiZm9jdXMiLCJTaW1wbGVCYXIiLCJTZWxlY3QiLCJTRUxFQ1QiLCJCT0RZIiwiTEFCRUwiLCJUSVRMRSIsIlZBTFVFIiwiQ09OVEVOVCIsIk9QVElPTlMiLCJPUFRJT04iLCJTQ1JPTEwiLCJHUk9VUCIsIklOUFVUIiwiQVNTRVQiLCJUWFQiLCJJU19BQ1RJVkUiLCJJU19GT0NVU0VEIiwiSVNfT1BFTkVEIiwiSVNfU0VMRUNURUQiLCJJU19ESVNBQkxFRCIsIkhBU19MSVNUIiwiSEFTX01VTFRJUExFIiwiSEFTX0NIRUNLQk9YIiwiSEFTX0xBQkVMIiwic2VsZWN0TGlzdCIsInNlbGVjdCIsImluaXRTZWxJdGVtIiwicmVsYXRpdmVTZWwiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwic2VsSWQiLCJnZXRQbGFjZWhvbGRlciIsIm9wdFBsYWNlaG9sZGVyIiwibGFiZWwiLCJzaG93Iiwic2VsVGl0bGUiLCJnZXRTZWxlY3QiLCJ0d2luU2VsIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGV4dCIsImJ1aWxkIiwiaW5pdFNlbGVjdGlvbnMiLCJzZXRWYWx1ZSIsInNldE9wdGlvbnMiLCJzZWxBZGRvbkNsYXNzIiwibXVsdGlwbGUiLCJkaXNhYmxlU2VsZWN0Iiwic2V0U2VhcmNoQWN0aW9ucyIsInNldEFjdGlvbiIsInNlbEhpbnQiLCJzZWxCb2R5IiwiZ2V0VmFsdWUiLCJyZWxhdGl2ZVNlbE9wdGlvbnMiLCJnZXRPcHRpb25zIiwiZ2V0Q2xhc3MiLCJzZWwiLCJzZWxlY3RJZCIsInNlbExpc3QiLCJzZWxPcHRpb24iLCJvcHRWYWwiLCJzZXRPcHRpb25BY3Rpb24iLCJhZGRFcnIiLCJyZW1vdmVFcnIiLCJjbG9zZUdyb3VwIiwic2VsT3B0aW9ucyIsInNlbGVjdE9uZUdyb3VwIiwic2VsR3JvdXAiLCJzZWxlY3Rpb25zIiwic2VsZWN0aW9uIiwiY2xvc2VJdGVtIiwib3B0aW9uIiwicmVsYXRpdmVTZWxlY3Rpb25zIiwiZ2V0RGF0YSIsImVsZW1lbnRzIiwicmVsYXRpdmVTZWxlY3Rpb24iLCJ0d2luU2VsZWN0aW9ucyIsInR3aW5TZWxlY3Rpb24iLCJvcHQiLCJ0ZXh0Q29udGVudCIsInNldFNlbGVjdGlvbnMiLCJzZWxJbnB1dCIsInRvVXBwZXJDYXNlIiwic2V0U3VidGl0bGUiLCJzZWxFcnJvciIsInJlbW92ZUNoaWxkIiwiY3NzQ2xhc3MiLCJhdHRyIiwiYXR0ckNsYXNzIiwidGl0bGVWYWwiLCJodG1sIiwic2VsTGFiZWwiLCJ2YWx1ZXMiLCJtYXAiLCJnZXRDb250ZW50Iiwiam9pbiIsImxpc3QiLCJWQUxVRVVFIiwiY3VzdG9tQ2xhc3MiLCJvcHRDbGFzcyIsInNlbFNjcm9sbCIsInNlbFNjcm9sbEhlaWdodCIsInNlbE9wdGlvbnNIVE1MIiwiZ2V0T3B0aW9uIiwic2VsZWN0ZWQiLCJzaG93U2VsZWN0aW9uIiwib3B0aW9uQ2xhc3MiLCJvcHRpb25MaW5rIiwib3B0aW9uTGlua1RhcmdldCIsIm9wdGlvbkhUTUwiLCJvcHRpb25EYXRhIiwib3B0QXNzZXQiLCJvcHRpb25EYXRhSFRNTCIsIm9wdGlvbkNvbnRlbnRIVE1MIiwiZmluZCIsInN1YnRpdGxlIiwicHVzaCIsInNlbGVjdGVkSW5kZXgiLCJ0ZW1wQnV0dG9uIiwiYXBwZW5kIiwiY2xpY2siLCJzY3JvbGxCbG9jayIsImF1dG9IaWRlIiwic2V0SGFzaCIsImdldEhhc2giLCJUYWJzIiwiVEFCUyIsIklOREVYIiwiVElUTEVTIiwiVEFCX0lURU0iLCJIQVNIIiwiTU9EQUwiLCJ0YWJzIiwiYWN0aXZlSGFzaCIsInN0YXJ0c1dpdGgiLCJ0YWJzQmxvY2siLCJzZXRTdGF0dXMiLCJjb250ZW50IiwidGFic0luZGV4IiwiaGFzSGFzaCIsImluZHgiLCJhY3RpdmVIYXNoQmxvY2siLCJtZW51SW5pdCIsIm1lbnVPcGVuIiwibWVudUNsb3NlIiwiYm9keUxvY2tUb2dnbGUiLCJkZWxheSIsInVuaXF1ZUFycmF5IiwiYXJyYXkiLCJkYXRhU2V0VmFsdWUiLCJtZWRpYSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJicmVha3BvaW50IiwicGFyYW1zQXJyYXkiLCJtZFF1ZXJpZXMiLCJtZWRpYUJyZWFrcG9pbnQiLCJtZWRpYVR5cGUiLCJkdXJhdGlvbiIsInNob3dtb3JlIiwic3R5bGUiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwicmVtb3ZlUHJvcGVydHkiLCJyZW1Ub1B4IiwicmVtVmFsdWUiLCJodG1sRm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwicHhWYWx1ZSIsIk1hdGgiLCJyb3VuZCIsInJlbW92ZUNsYXNzZXMiLCJjbGFzc05hbWUiLCJpIiwidXRpbHMiXSwic291cmNlUm9vdCI6IiJ9
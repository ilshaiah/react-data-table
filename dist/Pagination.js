"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Pagination = /*#__PURE__*/function (_React$Component) {
  _inherits(Pagination, _React$Component);

  var _super = _createSuper(Pagination);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _super.apply(this, arguments);
  }

  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      if (this.props.total > 0) {
        var from = (this.props.currentPage - 1) * this.props.perPage + 1;
        var to = from + this.props.recordsCount - 1;
        var pages = Math.ceil(this.props.total / this.props.perPage);
        var previous, next;
        var items = [];
        var details = this.props.messages.showing + ' ' + from + ' ' + this.props.messages.to + ' ' + to + ' ' + this.props.messages.of + ' ' + this.props.total;
        var itemsArray = [{
          number: this.props.currentPage,
          text: this.props.currentPage
        }];

        if (this.props.currentPage > 1) {
          itemsArray.unshift({
            number: this.props.currentPage - 1,
            text: this.props.currentPage - 1
          });

          if (this.props.currentPage - 3 >= 1) {
            itemsArray.unshift({
              number: this.props.currentPage - 3,
              text: '...'
            });
          } else if (this.props.currentPage - 2 == 1) {
            itemsArray.unshift({
              number: this.props.currentPage - 2,
              text: this.props.currentPage - 2
            });
          }
        }

        if (this.props.currentPage < pages) {
          itemsArray.push({
            number: this.props.currentPage + 1,
            text: this.props.currentPage + 1
          });

          if (pages >= this.props.currentPage + 3) {
            itemsArray.push({
              number: this.props.currentPage + 3,
              text: '...'
            });
          } else if (this.props.currentPage + 2 == pages) {
            itemsArray.push({
              number: this.props.currentPage + 2,
              text: this.props.currentPage + 2
            });
          }
        }

        if (this.props.currentPage > 1) {
          var pageNum = this.props.currentPage - 1;
          var key = 'item-previous-' + pageNum;
          previous = /*#__PURE__*/_react["default"].createElement("li", {
            className: "page-item",
            key: key
          }, /*#__PURE__*/_react["default"].createElement("a", {
            className: "page-link",
            href: "javascript:void(0)",
            onClick: this.changeCurrentPage.bind(this, pageNum),
            "aria-label": this.props.messages.previous
          }, "<", /*#__PURE__*/_react["default"].createElement("span", {
            className: "sr-only"
          }, this.props.messages.previous)));
        } else {
          var _key = 'item-previous-disabled';
          previous = /*#__PURE__*/_react["default"].createElement("li", {
            className: "page-item disabled",
            key: _key,
            tabIndex: "-1",
            "aria-disabled": "true"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            className: "page-link",
            href: "javascript:void(0)",
            tabIndex: "-1",
            "aria-label": this.props.messages.previous,
            "aria-disabled": "true"
          }, "<"));
        }

        for (var i = 0; i < itemsArray.length; i++) {
          if (this.props.currentPage == itemsArray[i].number) {
            var _key2 = 'item-current-' + itemsArray[i].number;

            items[items.length] = /*#__PURE__*/_react["default"].createElement("li", {
              className: "page-item active",
              "aria-current": "page",
              key: itemsArray[i].number
            }, /*#__PURE__*/_react["default"].createElement("span", {
              className: "page-link"
            }, itemsArray[i].text, /*#__PURE__*/_react["default"].createElement("span", {
              className: "sr-only"
            }, "(", this.props.messages.current, ")")));
          } else {
            var _key3 = 'item-' + itemsArray[i].number;

            items[items.length] = /*#__PURE__*/_react["default"].createElement("li", {
              className: "page-item",
              key: itemsArray[i].number
            }, /*#__PURE__*/_react["default"].createElement("a", {
              className: "page-link",
              href: "javascript:void(0)",
              onClick: this.changeCurrentPage.bind(this, itemsArray[i].number)
            }, itemsArray[i].text));
          }
        }

        if (this.props.currentPage < pages) {
          var _pageNum = this.props.currentPage + 1;

          var _key4 = 'item-next-' + _pageNum;

          next = /*#__PURE__*/_react["default"].createElement("li", {
            className: "page-item",
            key: _key4
          }, /*#__PURE__*/_react["default"].createElement("a", {
            className: "page-link",
            href: "javascript:void(0)",
            onClick: this.changeCurrentPage.bind(this, _pageNum),
            "aria-label": this.props.messages.next
          }, ">", /*#__PURE__*/_react["default"].createElement("span", {
            className: "sr-only"
          }, this.props.messages.next)));
        } else {
          var _key5 = 'item-next-disabled';
          next = /*#__PURE__*/_react["default"].createElement("li", {
            className: "page-item disabled",
            key: _key5,
            tabIndex: "-1",
            "aria-disabled": "true"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            className: "page-link",
            href: "javascript:void(0)",
            tabIndex: "-1",
            "aria-label": this.props.messages.next,
            "aria-disabled": "true"
          }, ">"));
        }

        return /*#__PURE__*/_react["default"].createElement("nav", {
          className: "table-pagination-wrapper",
          "aria-label": "Pagination"
        }, /*#__PURE__*/_react["default"].createElement("ul", {
          className: "table-pagination"
        }, previous, items, next), /*#__PURE__*/_react["default"].createElement("div", {
          className: "pages-details-wrapper"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "pages-details"
        }, details)));
      } else {
        return '';
      }
    }
  }, {
    key: "changeCurrentPage",
    value: function changeCurrentPage(page) {
      this.props.onPageRequest(page);
    }
  }]);

  return Pagination;
}(_react["default"].Component);

var _default = Pagination;
exports["default"] = _default;
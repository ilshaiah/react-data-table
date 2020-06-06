"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _reactRouterDom = require("react-router-dom");

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

var BodyRow = /*#__PURE__*/function (_React$Component) {
  _inherits(BodyRow, _React$Component);

  var _super = _createSuper(BodyRow);

  function BodyRow(props) {
    var _this;

    _classCallCheck(this, BodyRow);

    _this = _super.call(this, props);
    _this.state = {
      data: props.data
    };
    return _this;
  }

  _createClass(BodyRow, [{
    key: "renderRowActions",
    value: function renderRowActions(actions) {
      var _this2 = this;

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, actions.map(function (act) {
        var text = act.icon != '' ? /*#__PURE__*/_react["default"].createElement("i", {
          className: act.icon
        }) : act.title;

        if (act.link !== undefined && act.link != '') {
          return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
            key: act.slug,
            to: act.link,
            title: act.title
          }, text);
        } else {
          return /*#__PURE__*/_react["default"].createElement("a", {
            key: act.slug,
            href: "javascript:void(0)",
            onClick: _this2.callAction.bind(_this2, act.slug),
            title: act.title
          }, text);
        }
      }));
    }
  }, {
    key: "callAction",
    value: function callAction(slug) {
      this.props.callActionMethod(slug, this.state.data[this.props.dataModel.idProperty]);
    }
  }, {
    key: "render",
    value: function render() {
      var tds = [];

      for (var i = 0; i < this.props.dataModel.fields.length; i++) {
        var label = this.props.headings[i] !== undefined ? this.props.headings[i] : '';

        if ('actions' == this.props.dataModel.fields[i]) {
          tds[tds.length] = /*#__PURE__*/_react["default"].createElement("td", {
            key: this.props.dataModel.fields[i],
            "data-label": translations.front.actions,
            className: "actions"
          }, this.renderRowActions(this.state.data[this.props.dataModel.fields[i]]));
        } else {
          if (this.props.clickableField !== false && this.props.clickableField.field == this.props.dataModel.fields[i]) {
            tds[tds.length] = /*#__PURE__*/_react["default"].createElement("td", {
              key: this.props.dataModel.fields[i],
              "data-label": label
            }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
              to: this.state.data.actions[this.props.clickableField.actionIndex].link,
              title: this.state.data.actions[this.props.clickableField.actionIndex].title
            }, this.state.data[this.props.dataModel.fields[i]]));
          } else {
            tds[tds.length] = /*#__PURE__*/_react["default"].createElement("td", {
              key: this.props.dataModel.fields[i],
              "data-label": label,
              dangerouslySetInnerHTML: {
                __html: this.state.data[this.props.dataModel.fields[i]]
              }
            });
          }
        }
      }

      return /*#__PURE__*/_react["default"].createElement("tr", null, tds);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _jquery["default"])('.no-padding-for-parent').parent('td').css('padding-top', '0').css('padding-bottom', '0');
    }
  }]);

  return BodyRow;
}(_react["default"].Component);

var _default = BodyRow;
exports["default"] = _default;
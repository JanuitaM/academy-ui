import { bindable, bindingMode, noView, inject, computedFrom, customElement, containerless } from "aurelia-framework";

@inject(Element)
@containerless()
@customElement("layout")
export class _Layout {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    this.element = element;
  }

  @computedFrom("label")
  get hasLabel() {
    return (this.label || "").toString().length > 0;
  }

  @computedFrom("error")
  get hasError() {
    return (this.error || "").toString().length > 0;
  }

  @computedFrom("options.label")
  get _label() {
    var _options = !this.options || !this.options.label ? {} : this.options.label;
    _options.length = _options.length || 3;
    _options.align = (_options.align || "right").toLowerCase() === "right" ? "right" : "left";
    return _options;
  }

  @computedFrom("options.control")
  get _control() {
    var _options = !this.options || !this.options.control ? {} : this.options.control;
    _options.length = _options.length || 4;
    return _options;
  }

  @computedFrom("hasLabel", "hasError", "_label")
  get _style() {
    var style = {
      group: "form-group",
      label: "",
      control: "col-sm-12"
    };

    if (this.hasError)
      style.group += ` has-error`;

    if (this.hasLabel) {
      style.label = `col-sm-${this._label.length} control-label text-${this._label.align}`;
      style.control = `col-sm-${this._control.length}`;
    }
    return style;
  }
}

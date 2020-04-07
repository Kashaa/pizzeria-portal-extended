export class BaseWidget {
  constructor(wrapperElement, initialValue) {
    const thisWidget = this;
    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;
    thisWidget.correctValue = initialValue;
  }

  get value() {
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  set value(assignedValue) {
    const thisWidget = this;

    const newValue = thisWidget.parseValue(assignedValue);

    if (newValue != thisWidget.correctValue && thisWidget.isValid(newValue)) {
      thisWidget.correctValue = newValue;
      thisWidget.announce();
    }

    thisWidget.renderValue();
  }
  /* Parsowanie (zmiana) argumentu na liczbę */
  parseValue(newValue) {
    return parseInt(newValue);
  }
  /* Sprawdzenie czy wartość jest poprawna */
  isValid(newValue) {
    return !isNaN(newValue);
  }
  /* Renderowanie wartości widgetu */
  renderValue() {
    const thisWidget = this;

    console.log('widget value', thisWidget.value);
  }
  /* Wywołanie eventu informującego o zmianie wartości */
  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });

    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}
# Specific Use Cases

## XHR / File Upload

## Choice

Choice is when you want to build a set out of a known quantity of
options. This is the state that drives the <select> element for
example.

Choices come in two flavors, single and multiple. Single choices, only
allow one option to be selected at a given time. Which means, that
when you toggle one of the options, it untoggles any other options.



``` javascript

export default @microstate class SingleChoice {
  get selection() {
    let selectedOption = this.options.find(o => o.isSelected);

    return selectedOption ? selectedOption.value : null;
  }

  options: [],

  transitions: {
    toggle(current, option) {
       return {
         options: current.options.map(o => o === option ? o.deselect() : o.toggle());
       }
    }
    /* optional */
    options: {
      toggle(current, option) {
        return current.toggle(option);
      }
    }
  }
}

let choice = new SingleChoice(['cow', 'horse']);

let [ cow, horse ] = choice.options;

choice.toggle(cow);
choice.toggle(horse);

cow.toggle();
horse.toggle();

class Option {
  isSelected: false,
  value: null,

  transitions: {
    toggle(current) {
      return { isSelected: !current.isSelected };
      return current.isSelected.toggle();
    }
  }
}
```



## Table Structure

``` javascript
class Table {
    rows: [],
    selection:
}
```



## List

Lists of polymorphic data.

## Area has x / y

``` javascript
get measure() {
    return this.x.length * this.y.length;
}
transitions: {
  changeUnit(current, unit) {
    return {
      x: { unit },
      y: { unit }
    }
    return current.assign({
      x: { unit },
      y: { unit }
    })
    return current.assign({
      x: current.x.assign({unit}),
      y: current.y.assign({unit})
    })
    return current.assign({
       x: current.x.unit.replace(unit),
       y: current.y.unit.replace(unit)
    })
  }
}
```

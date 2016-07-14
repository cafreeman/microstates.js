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



## List and other parametric types

This is the case where you have some sort of "container" object. Like
a list or a map, and you want to provide information about what types
live in it.

So for example, let's take the `Option` class. In reality, the option
class is really a container for a value. The value could be a boolean,
it could be a string, it could really be anything.

When we are merging data into an option, then how does it know which
constructor to invoke?

``` javascript
class Option {
  static parameterize(Type) {
    return {value: Type};
  },
  constructor(value) {
    if (this instanceof Option) {
      //instance constructor
    } else {
      return class extends arguments.callee {
        constructor() {
          super(...arguments);
          Object.keys(Option.parameterize(value).forEach(key => {
            Object.assign(this, [key]: new Type(this[key].valueOf()));
          });
        }
      }
    }
  }
}
let UserOption = Option(User);
new UserOption({isSelected: false, value: 'cowboyd'})

let UserOptionList = List(UserOption);
let users = new UserOptionList([{}])

let data = [ { isSelected: false, value: 'cowboyd'}, ...]

let microstate = new List(Option)(data);

let options = new
List([new Option({isSelected: true, 'cowboyd'}), new Option({})]);

```

This is highly experimental and we'll just punt on it for now.



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

## Merging

When extending a microstate, if there are any attributes that are
microstates, then those attributes will

a) get treated as a microstate on a merge
b) be able to be interacted with and have a return value of the parent
microstate. So, for example, to indicated that `description` of a
TodoItem can be interacted with directly, provide a default microstate
instance in the normal class attributes. E.g.

``` javascript
const TodoItem = Microstate.extend({
  description: new StringState('no description given')
});
```

Now, when we instantiate the TodoItem, it will use that as the
default value for description field:

``` javascript
let item = new TodoItem();
item.description.valueOf() //=> 'no description given'

let next = item.description.replace('get milk');
next.constructor //=> TodoItem
next.description.valueOf() //=> 'get milk'
```

Now, when we merge, let's say we're merging the description. We can
merge a simple string, because we know that the `description` property
is a MS.

``` javascript
{
  transitions: {
    reset() {
      return { isCompleted: false, description: 'no description provided'};
    }
  }
}

// this['description'] is  microstate so assign({description: current.description.replace(description)})

next.reset()
```

So the merge strategy is to always merge over only the provided
attributes, *but* we want to look up the value of the property to
check if it is a microstate before and replacing that MS before merging.

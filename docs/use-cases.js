// Table Structure

class Table {

  rows: list({
    isSelected: false,
    name: '',
    value: {}
  })

  get selection() {
    this.rows.find(r => r.isSelected);
  }

  transtions: {
    select(current, row) {
      return current.selection.select(row);
    }
  }
}

let t = new Table({
  columns: [{name: 'Animal', key: 'animal'}, { name: 'Name', key: 'name'}],
  rows: [{animal: 'dog', name: 'Barky'}, {animal: 'cat', name: 'Kitty'}],
  selection: ['cat']
});


const Option = Microstate.extend({
  transitions: {
    toggle(current) {
      return { isSelected: !current.isSelected };
    },
    select() {
      return { isSelected: true };
    },
    deselect() {
      return { isSelected: false };
    }
  }
});

const TodoList =  Microstate.extend({
  items: new List(),

  transitions: {
    addItem(current, description) {
      return current.items.push(new TodoItem());
    }
  }
});

const TodoItem = Microstate.extend({
  description: new StringState('no description given')
});

// Merging?

export default Microstate(class Foo {
  // varOne = BooleanState;
  // varTwo = ListState;
  // rightValue= BooleanState;

  transitions: {
    veryWeird(current) {
      current.weird = true;
    },
    doTheRight() {
      return {
        righValue: true
      };
    }
  }
});

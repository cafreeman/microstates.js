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
})

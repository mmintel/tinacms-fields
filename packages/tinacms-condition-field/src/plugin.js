import Condition from './components/condition'

export default class {
  constructor(tinacms) {
    this.tinacms = tinacms
  }

  install() {
    this.tinacms.fields.add({
      name: 'condition',
      Component: Condition
    })
  }
}

export {
  Condition
}

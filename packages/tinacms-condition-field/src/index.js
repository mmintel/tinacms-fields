import Condition from './components/condition'

export default class TinaCMSConditionField {
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

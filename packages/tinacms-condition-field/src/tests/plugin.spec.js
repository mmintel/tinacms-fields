import TinaCMSConditionField from '..'

const tinacms = {
  fields: {
    add: jest.fn()
  }
}

describe('TinaCMSConditionField', () => {
  describe('# constructor', () => {
    it('sets tinacms correctly', () => {
      const conditionField = new TinaCMSConditionField(tinacms)
      expect(conditionField.tinacms).toEqual(tinacms)
    })
  })
  describe('# install', () => {
    it('adds the condition field on install', () => {
      const conditionField = new TinaCMSConditionField(tinacms)
      conditionField.install()
      expect(tinacms.fields.add).toHaveBeenCalledTimes(1)
      expect(tinacms.fields.add).toHaveBeenCalledWith(expect.objectContaining({
        name: 'condition'
      }))
    })
  })
})

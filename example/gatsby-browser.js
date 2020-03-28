import TinaCMSConditionField from 'tinacms-condition-field'

export const onClientEntry = () => {
  const conditionField = new TinaCMSConditionField(window.tinacms)
  conditionField.install()
}

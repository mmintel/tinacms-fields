# tinacms-condition-field

> Adds a condition field to TinaCMS

[![NPM](https://img.shields.io/npm/v/tinacms-condition-field.svg)](https://www.npmjs.com/package/tinacms-condition-field) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Article
If you want to read more in depth walk through to how this condition field works, checkout my article here:
https://mintel.me/lets-create-a-conditional-field-for-tinacms/

## Install

```bash
npm install --save tinacms-condition-field
```

or

```bash
yarn add tinacms-condition-field
```

### Manual
```jsx
import TinaCMSConditionField from 'tinacms-condition-field'

const conditionField = new TinaCMSConditionField(tinacms);

conditionField.install();
```

### with Gatsby
add to `gatsby-browser.js`
```jsx
import TinaCMSConditionField from 'tinacms-condition-field'

export const onClientEntry = () => {
  const conditionField = new TinaCMSConditionField(window.tinacms);
  conditionField.install();
}
```

## Usage


## License

MIT © [mmintel](https://github.com/mmintel)

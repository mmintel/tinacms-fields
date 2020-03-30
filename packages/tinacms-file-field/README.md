# tinacms-file-field [![Known Vulnerabilities](https://snyk.io/test/github/mmintel/tinacms-file-field/badge.svg?targetFile=packages/tinacms-file-field/package.json)](https://snyk.io/test/github/mmintel/tinacms-file-field?targetFile=packages/tinacms-file-field/package.json)

> Adds a file field to TinaCMS

## Preview
![Example](https://raw.githubusercontent.com/mmintel/tinacms-fields/master/packages/tinacms-condition-field/docs/assets/example.gif)

## Install

```bash
npm install --save tinacms-file-field
```

or

```bash
yarn add tinacms-file-field
```

### Manual
```jsx
import TinaCMSFileField from 'tinacms-file-field'

const fileField = new TinaCMSFileField(tinacms);

fileField.install();
```

### with Gatsby
add to `gatsby-browser.js`
```jsx
import TinaCMSFileField from 'tinacms-file-field'

export const onClientEntry = () => {
  const fileField = new TinaCMSFileField(window.tinacms);
  fileField.install();
}
```

## Usage
The file component is applied when specifying `component: 'file'` in your field.

### Examples
```js
{
  name: 'frontmatter.file',
  component: 'file',
  description: 'This is a pdf upload field',
  label: 'PDF',
},
```

You can also specify to accept only specific MIME types, change the default upload dir or disallow clearing.

```js
{
  name: 'frontmatter.file',
  component: 'file',
  description: 'This is a pdf upload field',
  label: 'PDF',
  accept: 'application/pdf',
  clearable: true,
  uploadDir: () => 'src/uploads',
},
```
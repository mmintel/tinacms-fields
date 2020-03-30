import File from './components/file';

export default class {
  constructor(tinacms) {
    this.tinacms = tinacms;
  }

  install() {
    this.tinacms.fields.add({
      name: 'file',
      Component: File,
      parse: (value) => value || '',
    });
  }
}

export {
  File,
};

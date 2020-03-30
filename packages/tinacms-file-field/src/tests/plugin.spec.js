import TinaCMSFileField from '..';

const tinacms = {
  fields: {
    add: jest.fn(),
  },
};

describe('TinaCMSFileField', () => {
  describe('# constructor', () => {
    it('sets tinacms correctly', () => {
      const filefield = new TinaCMSFileField(tinacms);
      expect(filefield.tinacms).toEqual(tinacms);
    });
  });
  describe('# install', () => {
    it('adds the condition field on install', () => {
      const filefield = new TinaCMSFileField(tinacms);
      filefield.install();
      expect(tinacms.fields.add).toHaveBeenCalledTimes(1);
      expect(tinacms.fields.add).toHaveBeenCalledWith(expect.objectContaining({
        name: 'file',
      }));
    });
  });
});

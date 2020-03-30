import TinaCMSRelationField from '../plugin';

jest.mock('../components/relation', () => jest.fn());

describe('TinaCMSRelationField', () => {
  const tinacms = {
    fields: {
      add: jest.fn(),
    },
  };

  afterEach(() => {
    tinacms.fields.add.mockClear();
  });

  describe('# constructor', () => {
    it('sets tinacms correctly', () => {
      const relationField = new TinaCMSRelationField(tinacms);
      expect(relationField.tinacms).toEqual(tinacms);
    });
  });

  describe('# install', () => {
    it('adds the relation field on install', () => {
      const relationField = new TinaCMSRelationField(tinacms);

      relationField.install();

      expect(tinacms.fields.add).toHaveBeenCalledTimes(1);
      expect(tinacms.fields.add).toHaveBeenCalledWith(expect.objectContaining({
        name: 'relation',
      }));
    });

    it('installs all fields passed', () => {
      const relationField = new TinaCMSRelationField(tinacms);
      jest.spyOn(relationField, 'add');

      const fields = [
        {
          name: 'test-1',
        },
        {
          name: 'test-2',
        },
      ];

      relationField.install(fields);

      expect(relationField.add).toHaveBeenCalledTimes(fields.length);
    });
  });

  describe('# add', () => {
    it('adds a field to tinacms', () => {
      const relationField = new TinaCMSRelationField(tinacms);

      relationField.add({
        name: 'page',
        hook: () => {},
        itemProps: () => {},
        noDataText: 'No pages created',
      });

      expect(tinacms.fields.add).toHaveBeenCalledTimes(1);
    });
  });
});

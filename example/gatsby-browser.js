import TinaCMSConditionField from 'tinacms-condition-field';
import TinaCMSRelationField from 'tinacms-relation-field';
import TinaCMSFileField from 'tinacms-file-field';
import usePages from './src/hooks/use-pages';

export const onClientEntry = () => {
  const conditionField = new TinaCMSConditionField(window.tinacms);

  conditionField.install();

  const relationField = new TinaCMSRelationField(window.tinacms);

  relationField.install([{
    name: 'page',
    hook: usePages,
    itemProps: (page) => ({
      key: page.id,
      label: page.frontmatter.title,
    }),
    noDataText: 'No pages created',
  }]);

  relationField.install([{
    name: 'local-page',
    hook: usePages,
    itemProps: (page) => ({
      key: page.id,
      label: page.frontmatter.title,
    }),
    filter: (item, values) => item.frontmatter.language === values.rawFrontmatter.language,
    noDataText: 'No pages created',
  }]);

  relationField.install([{
    name: 'pages',
    hook: usePages,
    itemProps: (page) => ({
      key: page.id,
      label: page.frontmatter.title,
    }),
    sortable: true,
    multiple: true,
    noDataText: 'No pages created',
  }]);

  const fileField = new TinaCMSFileField(window.tinacms);
  fileField.install();
};

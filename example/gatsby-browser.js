import TinaCMSConditionField from 'tinacms-condition-field';
import TinaCMSRelationField from 'tinacms-relation-field';
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
    sortable: true,
    noDataText: 'No pages created',
  }]);
};

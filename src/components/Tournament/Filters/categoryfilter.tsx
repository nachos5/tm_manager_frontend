import React, { Dispatch } from 'react';
// @ts-ignore
import Select from 'react-select';

import { SelectOptionsObject } from '../../../config/types';

interface Props {
  setCategoryFilter: Dispatch<string>;
  categoryOptions: Object[];
}

export default function CategoryFilter(props: Props) {
  const { setCategoryFilter, categoryOptions } = props;

  function change(options: SelectOptionsObject[]) {
    if (!options) {
      setCategoryFilter('');
    } else {
      let statuses: string[] = [];
      options.map((option: SelectOptionsObject) => statuses.push(option.value));
      setCategoryFilter(statuses.join(','));
    }
  }

  // undirbúum options objectinn fyrir react-select, er listi af json objectum
  const options: SelectOptionsObject[] = [];
  categoryOptions.map((category: any) =>
    options.push({ value: category.node.name, label: category.node.name })
  );

  return (
    <div>
      <Select
        onChange={change}
        options={options}
        isMulti={true}
        placeholder='filter by categories'
      />
    </div>
  );
}

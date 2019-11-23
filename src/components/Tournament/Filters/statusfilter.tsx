import React, { Dispatch } from 'react';
// @ts-ignore
import Select from 'react-select';
import { useQuery } from '@apollo/react-hooks';

import { SelectOptionsObject } from '../../../config/types';
import { TOURNAMENT_STATUSES_QUERY } from '../queries';

import Loader from '../../Utils/Loader';
import QueryError from '../../Utils/QueryError';

interface Props {
  setStatusFilter: Dispatch<string>;
}

export default function StatusFilter(props: Props) {
  const { setStatusFilter } = props;
  // fetchum alla statusana
  const { loading, error, data } = useQuery(TOURNAMENT_STATUSES_QUERY);

  function change(options: SelectOptionsObject[]) {
    if (!options) {
      setStatusFilter('');
    } else {
      let statuses: string[] = [];
      options.map((option: SelectOptionsObject) => statuses.push(option.value));
      setStatusFilter(statuses.join(','));
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  const statuses = data.tournamentStatuses;
  // undirbúum options objectinn fyrir react-select, er listi af json objectum
  const options: SelectOptionsObject[] = [];
  statuses.map((status: string) =>
    options.push({ value: status[0], label: status[1] })
  );

  return (
    <div>
      <Select
        onChange={change}
        options={options}
        isMulti={true}
        placeholder='filter by statuses'
      />
    </div>
  );
}

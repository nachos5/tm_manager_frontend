import React from 'react';
// @ts-ignore
import { DelayInput } from 'react-delay-input';

interface Props {
  setNameFilter: any;
}

export default function NameFilter(props: Props) {
  const { setNameFilter } = props;

  return (
    <div>
      <DelayInput
        className='form-control w-100 my-2'
        delayTimeout={500}
        placeholder='filter by name'
        onChange={(e: any) => setNameFilter(e.target.value)}
      />
    </div>
  );
}

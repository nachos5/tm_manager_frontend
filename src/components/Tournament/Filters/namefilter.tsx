import React, { Dispatch } from 'react';
// @ts-ignore
import { DelayInput } from 'react-delay-input';

interface Props {
  setNameFilter: Dispatch<string>;
}

export default function NameFilter(props: Props) {
  const { setNameFilter } = props;

  return (
    <div>
      <DelayInput
        className='form-control w-100'
        delayTimeout={500}
        placeholder='filter by name'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNameFilter(e.target.value)
        }
      />
    </div>
  );
}

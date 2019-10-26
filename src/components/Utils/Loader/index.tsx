import React from 'react';

import './styles.scss';

// bootstrap blár spinner með bakgrunnsdiv
// skoða hérna https://getbootstrap.com/docs/4.3/components/spinners/
export default function Loader(props: any) {
  return (
    <div className="loader__bg">
      <div className="loader__spinner__container">
        <div className="spinner-border text-primary loader__spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}
import React from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const {
    activeFilterButton,
    visibleList,
  } = props;

  return (
    <>
      <li>
        <a
          href="#/"
          className={activeFilterButton === 'all'
            ? 'selected'
            : ''}
          onClick={() => visibleList('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={activeFilterButton === 'active'
            ? 'selected'
            : ''}
          onClick={() => visibleList('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={activeFilterButton === 'completed'
            ? 'selected'
            : ''}
          onClick={() => visibleList('completed')}
        >
          Completed
        </a>
      </li>
    </>
  );
}

Filter.propTypes = {
  activeFilterButton: PropTypes.string.isRequired,
  visibleList: PropTypes.func.isRequired,
};

export default Filter;

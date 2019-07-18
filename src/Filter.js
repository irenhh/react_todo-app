import React from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const {
    activeFilterButton,
    handleFilter,
  } = props;

  return (
    <>
      <li>
        <a
          href="#/"
          className={activeFilterButton === 'all'
            ? 'selected'
            : ''}
          onClick={() => handleFilter('all')}
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
          onClick={() => handleFilter('active')}
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
          onClick={() => handleFilter('completed')}
        >
          Completed
        </a>
      </li>
    </>
  );
}

Filter.propTypes = {
  activeFilterButton: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default Filter;

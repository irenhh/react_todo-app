import React from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const {
    activeFilterButton,
    showAllItems,
    showChecked,
    showUnchecked,
  } = props;

  return (
    <>
      <li>
        <a
          href="#/"
          className={activeFilterButton === 'all'
            ? 'selected'
            : null}
          onClick={showAllItems}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={activeFilterButton === 'active'
            ? 'selected'
            : null}
          onClick={showUnchecked}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={activeFilterButton === 'completed'
            ? 'selected'
            : null}
          onClick={showChecked}
        >
          Completed
        </a>
      </li>
    </>
  );
}

Filter.propTypes = {
  activeFilterButton: PropTypes.string.isRequired,
  showAllItems: PropTypes.func.isRequired,
  showChecked: PropTypes.func.isRequired,
  showUnchecked: PropTypes.func.isRequired,
};

export default Filter;

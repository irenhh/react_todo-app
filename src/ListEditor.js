import React from 'react';
import PropTypes from 'prop-types';

function ListEditor(props) {
  const {
    todo,
    changeItemBody,
    editingText,
    getInputText,
    exitEditing,
  } = props;

  return (
    <form onSubmit={event => changeItemBody(todo.id, event)}>
      <input
        type="text"
        className="edit"
        value={editingText}
        onChange={getInputText}
        onBlur={() => exitEditing(todo.id)}
        autoFocus
      />
    </form>
  );
}

ListEditor.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

  changeItemBody: PropTypes.func.isRequired,
  editingText: PropTypes.string.isRequired,
  getInputText: PropTypes.func.isRequired,
  exitEditing: PropTypes.func.isRequired,
};

export default ListEditor;

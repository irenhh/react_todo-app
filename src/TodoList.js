import React from 'react';
import PropTypes from 'prop-types';
import ListEditor from './ListEditor';

function TodoList(props) {
  const {
    listOfTodos,
    changeItemBody,
    editingText,
    getInputText,
    exitEditing,
    onChange,
    makeEditable,
    deleteItem,
  } = props;

  return (
    listOfTodos.map((todo, index) => (
      <li
        className={`editing ${todo.isChecked ? 'completed' : ''}`}
        key={todo.id}
      >
        {todo.isInEditMode && (
          <ListEditor
            todo={todo}
            changeItemBody={changeItemBody}
            editingText={editingText}
            getInputText={getInputText}
            exitEditing={exitEditing}
          />
        )}

        <div className={todo.isInEditMode ? 'view' : ''}>
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${index + 1}`}
            checked={todo.isChecked}
            onChange={() => onChange(todo.id)}
          />

          <label
            onDoubleClick={() => makeEditable(todo.id)}
            onClick={event => event.stopPropagation()}
          >
            {todo.body}
          </label>

          <button
            type="button"
            className="destroy"
            onClick={() => deleteItem(todo.id)}
          />
        </div>
      </li>
    ))
  );
}

TodoList.propTypes = {
  listOfTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeItemBody: PropTypes.func.isRequired,
  editingText: PropTypes.string.isRequired,
  getInputText: PropTypes.func.isRequired,
  exitEditing: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  makeEditable: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoList;

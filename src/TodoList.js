import React from 'react';

function TodoList(props) {
  return (
    props.listOfTodos.map((todo, index) => (
      <li
        className={`editing ${todo.isChecked ? 'completed' : ''}`}
        key={todo.id}
      >
        <form onSubmit={event => props.changeItemBody(todo.id, event)}>
          <input
            type="text"
            className={todo.isInEditMode ? 'edit' : 'view'}
            value={props.editingText}
            onChange={props.getInputText}
            onBlur={() => props.exitEditing(todo.id)}
          />
        </form>

        <div className={todo.isInEditMode ? 'view' : ''}>
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${index + 1}`}
            checked={todo.isChecked}
            onChange={() => props.onChange(todo.id)}
          />

          <label
            onDoubleClick={() => props.makeEditable(todo.id)}
            onClick={props.stopPropagation}
          >
            {todo.body}
          </label>

          <button
            type="button"
            className="destroy"
            onClick={() => props.deleteItem(todo.id)}
          />
        </div>
      </li>
    ))
  );
}

export default TodoList;

import React from 'react';
import TodoList from './TodoList';
import Filter from './Filter';
import { hydrateStateWithLocalStorage, saveStateToLocalStorage } from './localStorageHelper';
import { visibleList } from './filterMemoize';

class App extends React.Component {
  state = {
    todoItems: [],
    inputText: '',
    activeFilterButton: 'all',
    editingText: '',
  }

  componentDidMount = () => {
    this.setState((prevState) => {
      const preparedState = hydrateStateWithLocalStorage(prevState);

      return {
        ...prevState,
        ...preparedState,
      };
    });

    window.addEventListener(
      'beforeunload',
      () => saveStateToLocalStorage(this.state)
    );
  }

  componentWillUnmount = () => {
    window.removeEventListener(
      'beforeunload',
      () => saveStateToLocalStorage(this.state)
    );

    saveStateToLocalStorage(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputText.replace(/\s/g, '').length < 1) {
      return;
    }

    const newTodo = {
      body: this.state.inputText,
      id: Date.now(),
      isChecked: false,
      isInEditMode: false,
    };

    this.setState(prevState => ({
      todoItems: prevState.todoItems.concat(newTodo),
      inputText: '',
    }));
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleCheckAll = (event) => {
    const isTodoChecked = event.target.checked;

    this.setState((prevState) => {
      const allCheckedTodos = [...prevState.todoItems];
      allCheckedTodos.forEach(todo => (todo.isChecked = isTodoChecked));

      return {
        todoItems: allCheckedTodos,
      };
    });
  }

  handleItemChanged = (id) => {
    this.setState((prevState) => {
      const checkedTodos = prevState.todoItems.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      });

      return {
        todoItems: checkedTodos,
      };
    });
  }

  deleteItem = (id) => {
    this.setState((prevState) => {
      const modifiedTodos = prevState.todoItems.filter(todo => todo.id !== id);

      return { todoItems: modifiedTodos };
    });
  }

  deleteAllItems = () => {
    this.setState((prevState) => {
      const modifiedTodos = prevState.todoItems
        .filter(todo => !todo.isChecked);

      return { todoItems: modifiedTodos };
    });
  }

  makeEditable = (id) => {
    this.setState((prevState) => {
      const editableItems = prevState.todoItems.map((todo) => {
        if (todo.id === id) {
          todo.isInEditMode = true;
        }

        return todo;
      });

      const editingText = prevState.todoItems
        .find(todo => todo.id === id).body;

      return {
        todoItems: editableItems,
        editingText,
      };
    });
  }

  changeItemBody = (id, event) => {
    event.preventDefault();
    this.setState((prevState) => {
      const itemToEdit = prevState.todoItems.find(todo => todo.id === id);

      if (prevState.editingText.length < 1) {
        return this.deleteItem(id);
      }

      itemToEdit.body = prevState.editingText;
      itemToEdit.isInEditMode = false;

      return {
        editingText: '',
      };
    });
  }

  exitEditing = (id) => {
    this.setState((prevState) => {
      const itemToEdit = prevState.todoItems.find(todo => todo.id === id);
      itemToEdit.isInEditMode = false;

      return {
        editingText: '',
      };
    });
  }

  getInputText = (event) => {
    this.setState({ editingText: event.target.value });
  }

  handleFilter = (status) => {
    this.setState({ activeFilterButton: status });
  }

  render() {
    const uncheckedItems = [...this.state.todoItems]
      .filter(todo => !todo.isChecked).length;

    const todoItemsToShow = visibleList(this.state.todoItems, this.state.activeFilterButton);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleChange}
              value={this.state.inputText}
            />
          </form>
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={!(this.state.todoItems
              .some(todo => !todo.isChecked))}
            onChange={this.handleCheckAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoList
              listOfTodos={todoItemsToShow}
              onChange={this.handleItemChanged}
              deleteItem={this.deleteItem}
              makeEditable={this.makeEditable}
              changeItemBody={this.changeItemBody}
              getInputText={this.getInputText}
              exitEditing={this.exitEditing}
              editingText={this.state.editingText}
            />
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${uncheckedItems} items left`}
          </span>

          <ul className="filters">
            <Filter
              activeFilterButton={this.state.activeFilterButton}
              handleFilter={this.handleFilter}
            />
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={this.state.todoItems
              .some(todo => todo.isChecked === true)
              ? { display: 'block' }
              : { display: 'none' }}
            onClick={this.deleteAllItems}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;

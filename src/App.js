import React from 'react';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    todoItems: [],
    todoItemsToShow: [],
    inputText: '',
    activeFilterButton: {
      all: true,
      active: false,
      completed: false,
    },
    editingText: '',
  }

  componentDidMount = () => {
    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage
    );
  }

  componentWillUnmount = () => {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage
    );

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage = () => {
    Object.keys(this.state).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    });
  }

  saveStateToLocalStorage = () => {
    Object.keys(this.state).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.inputText) {
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
      todoItemsToShow: prevState.todoItems.concat(newTodo),
      inputText: '',
    }));
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleCheckAll = (event) => {
    const allCheckedTodos = this.state.todoItems;
    allCheckedTodos.forEach(todo => (todo.isChecked = event.target.checked));
    this.setState({
      todoItems: allCheckedTodos,
      todoItemsToShow: allCheckedTodos,
    });
  }

  handleItemChanged = (id) => {
    this.setState((prevState) => {
      const checkedTodos = prevState.todoItemsToShow.map((todo) => {
        if (todo.id === id) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      });

      return {
        todoItems: checkedTodos,
        todoItemsToShow: checkedTodos,
      };
    });
  }

  deleteItem = (id) => {
    this.setState((prevState) => {
      const modifiedTodos = prevState.todoItems;
      modifiedTodos
        .splice(modifiedTodos
          .indexOf(modifiedTodos
            .find(todo => todo.id === id)), 1);

      return { todoItems: modifiedTodos, todoItemsToShow: modifiedTodos };
    });
  }

  deleteAllItems = () => {
    this.setState((prevState) => {
      const modifiedTodos = prevState.todoItems
        .filter(todo => todo.isChecked === false);

      return { todoItems: modifiedTodos, todoItemsToShow: modifiedTodos };
    });
  }

  showAllItems = () => {
    this.setState((prevState) => {
      const selectedButton = {
        all: true,
        active: false,
        completed: false,
      };

      return {
        todoItemsToShow: prevState.todoItems,
        activeFilterButton: selectedButton,
      };
    });
  }

  showUnchecked = () => {
    this.setState((prevState) => {
      const selectedButton = {
        all: false,
        active: true,
        completed: false,
      };

      return {
        todoItemsToShow: prevState.todoItems
          .filter(todo => todo.isChecked === false),

        activeFilterButton: selectedButton,
      };
    });
  }

  showChecked = () => {
    this.setState((prevState) => {
      const selectedButton = {
        all: false,
        active: false,
        completed: true,
      };

      return {
        todoItemsToShow: prevState.todoItems
          .filter(todo => todo.isChecked === true),

        activeFilterButton: selectedButton,
      };
    });
  }

  makeEditable = (id) => {
    this.setState((prevState) => {
      const editableItems = prevState.todoItemsToShow.map((todo) => {
        if (todo.id === id) {
          todo.isInEditMode = true;
        }
        return todo;
      });
      return {
        todoItemsToShow: editableItems,
        editingText: prevState.todoItemsToShow
          .find(todo => todo.id === id).body,
      };
    });
  }

  changeItemBody = (id, event) => {
    event.preventDefault();
    this.setState((prevState) => {
      const itemToEdit = prevState.todoItemsToShow.find(todo => todo.id === id);
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
      const itemToEdit = prevState.todoItemsToShow.find(todo => todo.id === id);
      itemToEdit.isInEditMode = false;

      return {
        editingText: '',
      };
    });
  }

  getInputText = (event) => {
    this.setState({ editingText: event.target.value });
  }

  stopPropagation = (event) => {
    event.stopPropagation();
  }

  render() {
    console.log(this.state.todoItemsToShow.map(todo => todo.isInEditMode));
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
              .some(todo => todo.isChecked === false))}
            onChange={this.handleCheckAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoList
              listOfTodos={this.state.todoItemsToShow}
              onChange={this.handleItemChanged}
              deleteItem={this.deleteItem}
              makeEditable={this.makeEditable}
              changeItemBody={this.changeItemBody}
              getInputText={this.getInputText}
              exitEditing={this.exitEditing}
              stopPropagation={this.stopPropagation}
              editingText={this.state.editingText}
            />
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${[...this.state.todoItems]
              .filter(todo => todo.isChecked === false).length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={this.state.activeFilterButton.all
                  ? 'selected'
                  : null}
                onClick={this.showAllItems}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={this.state.activeFilterButton.active
                  ? 'selected'
                  : null}
                onClick={this.showUnchecked}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={this.state.activeFilterButton.completed
                  ? 'selected'
                  : null}
                onClick={this.showChecked}
              >
                Completed
              </a>
            </li>
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

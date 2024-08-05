class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      todos: [],
      editId: null
    };
  }

  addTask = () => {
    const { input, todos, editId } = this.state;

    if (input.trim() !== '') {
      if (editId !== null) {
        const updatedTodos = todos.map(todo =>
          todo.id === editId ? { ...todo, title: input } : todo
        );
        this.setState({ todos: updatedTodos, input: '', editId: null });
      } else {
        const newTask = { id: Date.now(), title: input };
        this.setState({ todos: [...todos, newTask], input: '' });
      }
    }
  };

  deleteTask = (todoId) => {
    const filteredTodos = this.state.todos.filter(todo => todo.id !== todoId);
    this.setState({ todos: filteredTodos });
  };

  editTask = (todoId) => {
    const taskToEdit = this.state.todos.find(todo => todo.id === todoId);
    this.setState({ input: taskToEdit.title, editId: todoId });
  };

  render() {
    return (
      <div className="container mt-4">
        <h1>To-Do List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={this.state.input}
            onChange={(e) => this.setState({ input: e.target.value })}
            className="form-control"
            placeholder="Ajoutez une tâche"
          />
          <button 
            className={`btn ${this.state.editId !== null ? 'btn-info' : 'btn-primary'}`} 
            onClick={this.addTask} 
            disabled={this.state.input.trim() === ''}
          >
            {this.state.editId !== null ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
        <ul className="list-group">
          {this.state.todos.map((todo) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
              {todo.title}
              <div>
                <button className="btn btn-outline-info btn-sm me-2" onClick={() => this.editTask(todo.id)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteTask(todo.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Todos />, document.getElementById("root"));
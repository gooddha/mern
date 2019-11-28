import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          todo_description: res.data.todo_description,
          todo_responsible: res.data.todo_responsible,
          todo_priority: res.data.todo_priority,
          todo_completed: res.data.todo_completed
        }); 
      }).catch(function(err) {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input type="text"
                    className="form-control"
                    value={this.state.todo_description}
                    name="todo_description"
                    onChange={this.onChange}
                    />
          </div>
          <div className="form-group">
            <label>Responsible:</label>
            <input type="text"
                    className="form-control"
                    value={this.state.todo_responsible}
                    name = "todo_responsible"
                    onChange={this.onChange}
                    />
          </div>
          <div className="form-group">
            <label>Piority:</label>
            <input type="text"
                    className="form-control"
                    value={this.state.todo_responsible}
                    name = "todo_responsible"
                    onChange={this.onChange}
                    />
          </div>
        </form>
      </div>
    )
  }
}
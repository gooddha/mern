import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_proirity,
      todo_completed: this.state.todo_completed
    }

    axios.post('http://127.0.0.1:4000/todos/add', newTodo)
        .then(res => console.log(res.data));

    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsible: ${this.state.todo_responsible}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`);
    console.log(`Todo Completed: ${this.state.todo_completed}`);

    this.setState({
      todo_description: '',
      todo_responsible: '',
      todo_proirity: '',
      todo_completed: false
    })
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          
          <div className="form-group">
            <label>Description:</label>
            <input  type="text" 
                    name="todo_description"
                    className="form-control" 
                    value={this.state.todo_description}
                    onChange={this.onChange} 
            />
          </div>

          <div className="form-group">
            <label>Responsible: </label>
            <input  type="text" 
                    className="form-control" 
                    name = "todo_responsible"
                    value={this.state.todo_responsible}
                    onChange={this.onChange} 
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                     type="radio"
                     name = "todo_priority"
                     value="Low"
                     checked={this.state.todo_priority==='Low'}
                     onChange={this.onChange}
                     />
              <label className="form-check-label">Low</label>
            </div>            
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                     type="radio"
                     name = "todo_priority"
                     value="Medium"
                     checked={this.state.todo_priority==='Medium'}
                     onChange={this.onChange}
                     />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                     type="radio"
                     name="todo_priority"
                     value="High"
                     checked={this.state.todo_priority==='High'}
                     onChange={this.onChange}
                     />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Todo" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}
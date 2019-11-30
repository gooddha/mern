import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

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

  onChange(e) {
    if (e.target.id === 'completedCheckbox') {
      this.setState({
        todo_completed: !this.state.todo_completed
      });
      return
    }

    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();

    const obj ={
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };

    axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
    .then(res => {
      console.log(res.data)
      this.props.history.push('/');
    });


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
            <div className="form-check">
              <input  type="checkbox"
                      className="form-check-input"
                      id="completedCheckbox"
                      name="todo_completed"
                      onChange={this.onChange}
                      checked={this.state.todo_completed}
                      value={this.state.todo_completed}
                      />
              <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
            </div>
            <br />
            <div className="form-group">
              <input type="submit" value="Update todo" className="btn btn-primary" />
            </div>  
          </div>
        </form>
      </div>
    )
  }
}
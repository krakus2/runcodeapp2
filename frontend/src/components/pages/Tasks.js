import React, { Component } from 'react';
import axios from 'axios';

import withContext from '../../context/Context_HOC';
import { Line, Wrapper } from '../../styles/Tasks';

class Tasks extends Component {
   state = {
      tasks: []
   };
   async componentDidMount() {
      const res = await axios.get('/api/tasks/tests');
      console.log(res.data);
      this.setState({ tasks: res.data });
   }

   onTaskClick = (task, task_id) => async () => {
      //const res = await axios.get(`/api/tasks/tests/${id}`);
      console.log(task, task_id);
      this.props.context.addTask(task);
      this.props.history.push(`/task?task_id=${task_id}`);
   };
   render() {
      const { tasks } = this.state;
      const { context } = this.props;
      return (
         <Wrapper isMobile={context.isMobile}>
            <h3>Lista dodanych zadań</h3>
            <ul>
               {Object.keys(tasks).map(task_id => (
                  <Line key={task_id} onClick={this.onTaskClick(tasks[task_id], task_id)}>
                     ID Zadania - {task_id}
                  </Line>
               ))}
            </ul>
         </Wrapper>
      );
   }
}

export default withContext(Tasks);

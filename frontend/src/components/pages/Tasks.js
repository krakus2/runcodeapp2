import React, { Component } from 'react';
import axios from 'axios';
/* import { createBrowserHistory } from 'history'; */

import withContext from '../../context/Context_HOC';
//import { Wrapper } from '../../styles/Tasks';
import { Line, Wrapper } from '../../styles/Tasks';

/* const history = createBrowserHistory(); */

class Tasks extends Component {
   state = {
      tasks: []
   };
   async componentDidMount() {
      const res = await axios.get('/api/tasks/tests');
      this.setState({ tasks: res.data });
   }

   onTaskClick = (task, id_task) => async () => {
      //const res = await axios.get(`/api/tasks/tests/${id}`);
      console.log(task, id_task);
      this.props.context.addTask(task);
      this.props.history.push(`/task?id_task=${id_task}`);
   };
   render() {
      const { tasks } = this.state;
      const { context } = this.props;
      return (
         <Wrapper isMobile={context.isMobile}>
            <h3>Lista dodanych zadań</h3>
            <ul>
               {Object.keys(tasks).map(id_task => (
                  <Line key={id_task} onClick={this.onTaskClick(tasks[id_task], id_task)}>
                     ID Zadania - {id_task}
                  </Line>
               ))}
            </ul>
         </Wrapper>
      );
   }
}

export default withContext(Tasks);

import React from 'react';
import api from './utils/api';
import './App.css';
import {
  List,
  Avatar
} from 'antd';

const data = [{
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        name: null,
        avatar: null,
        email: null
      };
    }

    render() {
      const {
        isLoading,
        name,
        avatar,
        email
      } = this.state;

      return ( <
        List itemLayout = "horizontal"
        dataSource = {
          data
        }
        renderItem = {
          item => ( <
            List.Item >
            <
            List.Item.Meta avatar = {
              <
              Avatar src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" / >
            }
            title = {
              <
              a href = "https://ant.design" > {
                item.title
              } < /a>}
              description = "Ant Design, a design language for background applications, is refined by Ant UED Team" /
              >
              <
              /List.Item>
            )
          }
          />
        );
      }

      async componentDidMount() {
        // Load async data.
        // Update state with new data.
        // Re-render our component.
      }
    }

    export default App;
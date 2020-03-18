import React from 'react';
import api from './utils/api';
import './App.scss';
import {
  List,
  Avatar,
  Layout,
  Row,
  Col,
  Spin,
  Card
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import md5 from 'md5';

const {
  Header,
  Footer,
  Content
} = Layout;

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        offset: 0,
        data: [],
        card: null
      };
    }
    openCharacter(card) {
      this.setState({
        card
      });
    }

    fetchData = (callback, opts, page) => {
      const publicKey = `${process.env.REACT_APP_PUBLIC_KEY}`;
      const privateKey = `${process.env.REACT_APP_PRIVATE_KEY}`;
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey);
      const url = `${opts}?apikey=${publicKey}&hash=${hash}&ts=${ts}&offset=${20 * page}`;
      api.get(url).then(res => {
        const data = res.data.data;
        callback(data);
      });
    };

    handleInfiniteOnLoad = page => {
      let {
        data
      } = this.state;
      this.setState({
        isLoading: true
      });
      this.fetchData(
        res => {
          data = data.concat(res.results);
          this.setState({
            data,
            isLoading: false,
            hasMore: res.offset < res.total,
            page: page
          });
        },
        'characters',
        page
      );
    };

    render() {
        const {
          isLoading,
          data,
          hasMore,
          card
        } = this.state;
        return ( <
          Layout >
          <
          Header style = {
            {
              position: 'fixed',
              zIndex: 1,
              width: '100%'
            }
          } >
          <
          h1 > Marvel < /h1> < /
          Header > <
          Content >
          <
          Row >
          <
          Col span = {
            8
          } >
          <
          InfiniteScroll initialLoad = {
            false
          }
          pageStart = {
            0
          }
          loadMore = {
            this.handleInfiniteOnLoad
          }
          hasMore = {
            !isLoading && hasMore
          }
          useWindow = {
            true
          } >
          <
          List itemLayout = "horizontal"
          dataSource = {
            data
          }
          renderItem = {
            item => ( <
              div onClick = {
                () => {
                  this.openCharacter(item);
                }
              } >
              <
              List.Item >
              <
              List.Item.Meta avatar = {
                <
                Avatar src = {
                  `${item.thumbnail.path}.${item.thumbnail.extension}`
                }
                />}
                title = {
                  <
                  div > {
                    item.name
                  } < /div>} > < /
                  List.Item.Meta > <
                  span > {
                    item.comics.available !== 0 && 'comic'
                  } < /span> <
                  span > {
                    item.series.available !== 0 && 'series'
                  } < /span> <
                  span > {
                    item.stories.available !== 0 && 'stories'
                  } < /span> <
                  span > {
                    item.events.available !== 0 && 'events'
                  } < /span> < /
                  List.Item > <
                  /div>
                )
              } > {
                isLoading && hasMore && ( <
                  div >
                  <
                  Spin / >
                  <
                  /div>
                )
              } <
              /List> < /
              InfiniteScroll > <
              /Col> <
              Col className = "card-content"
              span = {
                16
              } > {
                card ? ( <
                  Card cover = {
                    <
                    img
                    height = "100%"
                    width = "auto"
                    alt = {
                      card.name
                    }
                    src = {
                      `${card.thumbnail.path}.${card.thumbnail.extension}`
                    }
                    />
                  } >
                  <
                  Card.Meta title = {
                    card.name
                  }
                  description = {
                    card.description
                  }
                  /> <
                  ul > {
                    card.urls.map(link => ( <
                      li key = {
                        link.type + link.url
                      } >
                      <
                      a href = {
                        link.url
                      } > {
                        link.type
                      } < /a> < /
                      li >
                    ))
                  } <
                  /ul> < /
                  Card >
                ) : ( <
                  div > No character selected < /div>
                )
              } <
              /Col> < /
              Row > <
              /Content> <
              Footer >
              <
              div >
              Icons made by <
              a href = "https://www.flaticon.com/authors/freepik"
              title = "Freepik" >
              Freepik <
              /a>
              from <
              a href = "https://www.flaticon.com/"
              title = "Flaticon" >
              www.flaticon.com <
              /a> < /
              div > <
              /Footer> < /
              Layout >
            );
          }

          async componentDidMount() {
            this.fetchData(
              res => {
                this.setState({
                  data: res.results,
                  isLoading: false,
                  hasMore: res.offset < res.total,
                  offset: res.offset
                });
              },
              'characters',
              0
            );
          }
        }

        export default App;
import React, { Component } from 'react';
import '../assets/stylesheets/post.css';

import TimeAgo from 'react-timeago';
import LoadingScreen from '../views/util/LoadingScreen';

import Axios from 'axios';
import config from '../config';
import BaseView from '../components/util/BaseView';

class Post extends Component {
  componentDidMount() {
    let postId = this.props.match.params.id;

    Axios.get(config.apiURL + '/api/posts?postId=' + postId)
    .then( response => {
      this.setState({
        post: response.data
      })
    })
    .catch( error => {
      this.setState({
        post: false
      })
    })
  }
  constructor(props){
    super(props);

    this.state = {
      space: 'pending',
      post: 'pending'
    };
  };
  render(){
    let { post } = this.state;

    if (post === 'pending') return (
      <LoadingScreen />
    )
    if (post === false) return (
      <div>
        <BaseView>
        <div className="container content">
          <a href={this.props.match.spaceId ? '/spaces/' + this.props.match.spaceId : '/landing' /* if the post fails to load */} className="rounded btn-link">
            <i className="fa fa-chevron-left" /> Back
          </a>
          <h1>Sorry! This post could not be loaded!</h1>
        </div>
        </BaseView>
      </div>
    )
    return(
      <div>
        <BaseView>
          <div className="container content">
            <a href={'/space?id=' + post.space._id} className="rounded btn-link"><i className="fa fa-chevron-left" /> Back</a>

            <div className="post">
              <div className="container-fluid">
                <h3>{post.title}</h3>
                <small className="text-muted">Posted <TimeAgo date={new Date(post.creationTime)} /> by <a href={'/user/' + post.author._id}>{post.author.username}</a></small>
              </div>
              <hr />
              <div className="container">
                {post.body}
              </div>
            </div>
          </div>
        </BaseView>
      </div>
    );
  }
};

export default Post;

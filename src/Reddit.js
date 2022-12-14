import React from 'react';
import {connect} from 'react-redux';

const Reddit = (props) => {
    const {posts} = props;

    if(props.isLoading) {
        return <div>Loading...</div>
    }
    if(props.error) {
        return <div>{props.error.message}</div>
    }
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <span>{post.score}</span>
                    <div>
                        <h2>{post.title}</h2>
                        <div>{post.num_comments} comments</div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

const mapState = state => ({
    posts: state.posts,
    isLoading: state.isLoading,
    error: state.error
})

export default connect(mapState)(Reddit)
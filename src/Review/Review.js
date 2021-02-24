import React from 'react';
import BookContext from '../BookContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class Review extends React.Component {

    static contextType = BookContext;

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: '',
            content: ''
        }
    }


    /*
    //tried this to fix refresh not working (didn't fix it)
    goToBook = (bookId) => {
        this.props.history.push({
        pathname: `/book/${bookId}`,
        state: { bookId: `${bookId}` }
    });
    }
    //add to an element:
    onClick={() => this.goToBook(this.props.id)}

    */

    editOn(e) {
        e.preventDefault();
        this.setState({edit:true});
        
    }

    editOff() {
        this.setState({edit:false});
    }

    editReviewHideInput(e, reviewId, title, content) {
        e.preventDefault();
        this.setState({edit:false});

        this.context.editReview(e, reviewId, title, content);
    }

    updateContent(content) {
        this.setState({content: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    render() {

        let resultContents = (
            <div className="result">
                <h2>{this.props.title}</h2>
                <div>
                    <div>
                        <p>{this.props.contents}</p>
                        <p>{this.props.helpCount} people found this helpful</p>
                        <button type="submit" onClick={(e) => this.context.helpCountIncrease(e, this.props.reviewId)}>This review was helpful </button>
                    </div>
                </div>
            </div>

        );

        if (this.context.currentUser == this.props.user) {
            resultContents = (
                <div className="result">
                    <h2>{this.props.title}</h2>
                    <div>
                        <div>
                            <p>{this.props.contents}</p>
                            <p>{this.props.helpCount} people found this helpful</p>
                            <button type="submit" onClick={(e) => this.editOn(e)}>Edit</button>
                        </div>
                    </div>
                </div>
            );

        }

        if (this.state.edit == true) {
            resultContents = (
                <form onSubmit={(e) => this.editReviewHideInput(e, this.props.reviewId, this.state.title, this.state.content)}>
                    <section className="form-section overview-section">
                        <h2>{this.props.title}</h2>
                        <label htmlFor="title">Title</label>
                        <input onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" required />

                        <label htmlFor="content">Review:</label>
                        <textarea type="text" name="content" placeholder="Write your review here" required onChange={e => this.updateContent(e.target.value)}>
                        
                        </textarea>

                        <button  type="submit">Submit</button>
                        <button  type="button" onClick={() => this.editOff()}>Cancel</button>
                    </section>
                </form>
            );
        }
        

        return (
            <>
            <p>{this.state.edit.toString()}</p>
            <p>User:{this.context.currentUser}</p>
            <p>Review author user:{this.props.user}</p>
            {resultContents}
            </>
        )
    }
}

export default withRouter(Review);
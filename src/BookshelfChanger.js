import React, {Component} from 'react';

class BookshelfChanger extends Component {

    state = {
        value: this.props.shelf
    };


    handleChange = e => {
        const shelfName = e.target.value;

        this.setState({
            value: shelfName
        });
        this.props.onMove(this.props.book, shelfName)
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="move" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookshelfChanger;
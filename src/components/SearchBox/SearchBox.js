// props: { onSearch: function, label, onValueChange }
import * as React from "react";
import './SearchBox.css';

export class SearchBox extends React.Component {
    constructor() {
        super();
        this.state = { query: '' }
    }
    onValueChange = e => {
        this.setState({query: e.target.value});
        if (this.props.onValueChange) this.props.onValueChange(e.target.value);
    };
    onSearch = e => {
        this.props.onSearch(this.state.query);
        e.preventDefault();
        return false;
    }

    render = () => {
        return (
            <form role={"search"} onSubmit={this.onSearch} className={"search"}>
                <input type={"search"} role={"search"} name={"query"} placeholder={this.props.label} value={this.state.query||''}
                       aria-label={this.props.label} className={"search-box"} onChange={this.onValueChange}
                       autoFocus={true} spellCheck="false"/>
                <button type={"submit"} className={"search-submit"}>Search</button>
            </form>
        );
    }
}
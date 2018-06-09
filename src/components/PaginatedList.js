import * as React from "react";
import {Paginator} from "./Paginator";
import {List} from "./List";

// props: {
// perPage: number,
// getItems: (page) => Promise<{ items: any[], totalResults: number }>,
// itemComponent: any,
// getHeader(totalResults) => string,
// getItemProps?: any => any
// }
export class PaginatedList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.state.offset = 0;
        this.state.totalCount = 0;
        this.state.items = [];
    }

    render = () => {
        let header = this.props.getHeader ? this.props.getHeader(this.state.totalResults) : "";
        return (
            <div className={"paginated-list"}>
                {header ? <h2>{header}</h2> : ""}
                <Paginator pageCount={this.state.pageCount} handlePageClick={this.handlePageClick}/>
                <List items={this.state.items} itemComponent={this.props.itemComponent} getItemProps={this.props.getItemProps} />
            </div>
        );
    };

    loadItems = (page, perPage) => {
        this.props.getItems({page, perPage}).then(results =>
            this.setState({
                ...results,
                pageCount: Math.ceil(results.totalResults / perPage)
            })
        );
    };

    handlePageClick = (data) => {
        let perPage = this.props.perPage, selected = data.selected;
        this.loadItems(selected+1, perPage);
    };

    static getDerivedStateFromProps = (props, state) => {
        let itemSourceChanged = state.getItems !== props.getItems;
        return { ...state, getItems: props.getItems, itemSourceChanged };
    };

    componentDidMount = () => {
        if (this.state.itemSourceChanged) this.loadItems(0, this.props.perPage);
    }

    componentDidUpdate = this.componentDidMount;
}
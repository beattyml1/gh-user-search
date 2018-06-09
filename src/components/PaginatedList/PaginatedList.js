import * as React from "react";
import {Paginator} from "../Paginator/Paginator";
import {List} from "../List/List";

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
        this.state.visible = false;
    }

    render = () => {
        let header = this.props.getHeader ? this.props.getHeader(this.state.totalResults) : "";
        return (
            <div className={"paginated-list"} hidden={!this.state.visible}>
                {header ? <h2>{header}</h2> : ""}
                <Paginator pageCount={this.state.pageCount} handlePageClick={this.handlePageClick}/>
                <List items={this.state.items} {...this.props} />
            </div>
        );
    };

    loadItems = (page, perPage) => {
        this.props.getItems({page, perPage}).then(results => {
            if (!results || results.totalResults === null)
                this.setState({visible: false});
            else
                this.setState({
                    ...results,
                    visible: true,
                    pageCount: Math.ceil(results.totalResults / perPage)
                });
        });
    };

    handlePageClick = (data) => {
        let perPage = this.props.perPage, selected = data.selected;
        this.loadItems(selected+1, perPage);
    };

    // From here down it feels like their should be a better way of doing this
    // I would probably ask coworkers if they knew or would be willing to pair on a better way
    static getDerivedStateFromProps = (props, state) => {
        let itemSourceChanged = state.getItems !== props.getItems;
        return { ...state, getItems: props.getItems, itemSourceChanged };
    };

    componentDidMount = () => {
        if (this.state.itemSourceChanged) this.loadItems(0, this.props.perPage);
    }

    componentDidUpdate = this.componentDidMount;
}
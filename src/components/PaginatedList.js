import * as React from "react";
import ReactPaginate from 'react-paginate';
import './PaginatedList.css'

// props: {
// perPage: number,
// getItems: Promise<{ items: any[], totalResults: number }>,
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
        let ItemComponent = this.props.itemComponent, items = this.state.items;
        let getItemProps = this.props.getItemProps || (x => x);
        let header = this.props.getHeader ? this.props.getHeader(this.state.totalResults) : "";

        return (
            <div className={"paginated-search-results"}>
                {header ? <h2>{header}</h2> : ""}
                <ReactPaginate previousLabel={"Previous"}
                               nextLabel={"Next"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
                <ul className={"search-results-list"} role={"list"}>
                    {items.map(item =>
                        <div className={"search-result"} role={"listitem"}>
                            <ItemComponent {...getItemProps(item)} />
                        </div>
                    )}
                </ul>
            </div>)
    };

    loadItems = (offset, perPage) => {
        this.props.getItems({offset, perPage}).then(results =>
            this.setState({
                ...results,
                pageCount: Math.ceil(results.totalResults / perPage)
            })
        );
    };

    handlePageClick = (data) => {
        let perPage = this.props.perPage, selected = data.selected;
        let offset = Math.ceil(selected * perPage);

        this.loadItems(offset, perPage);
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
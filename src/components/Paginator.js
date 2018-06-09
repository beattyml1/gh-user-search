import * as React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginator.css'

export const Paginator = ({pageCount, handlePageClick}) => {
    return (
        <ReactPaginate previousLabel={"Previous"}
                       nextLabel={"Next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break"}
                       pageCount={pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
    );
}

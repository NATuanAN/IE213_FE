import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const TableUserPaginate = (props) => {
    let { listUser, pageCount } = props;
    const navigate = useNavigate();
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(event.selected + 1);
        props.setCurrentPage(event.selected + 1);

    };
    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={"table-users-" + index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => navigate(`/manage-users/${item.id}`)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => {
                                                props.handleClickBtnUpdate(
                                                    item
                                                );
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                props.handleClickBtnDelete(
                                                    item
                                                );
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan="4">No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />
        </div>
    );
};

export default TableUserPaginate;

import React from "react";

const Paginate = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination=container">
            <ul className="pagination text-center my-9">
                {pageNumbers.map((number) => (
                    <li key={number}
                        onClick={() => paginate(number)}
                        className="page-number inline-flex mx-3 text-white cursor-pointer">
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Paginate;
import React from "react";

const Friends = (props) => {

    let moviesElements = props.movies.map(
        (moviesData) => {
            return (
                <div>{moviesData.name} ({moviesData.year})</div>
        )}
    );

    return (
        <div>
        {moviesElements}
        </div>
    )
};

export default Friends;
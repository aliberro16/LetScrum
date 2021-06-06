import React from 'react'

function SearchBar({handleSearch}) {
    const onChange = (e)=>{
        handleSearch(e.target.value);
    }
    return (
        <div>
            <input type="text" onChange={onChange} />
        </div>
    )
}

export default SearchBar;

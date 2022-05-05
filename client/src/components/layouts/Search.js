import React from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div>
            {searchParams.get('search')}
        </div>
    )
}

export default Search
import React from 'react';
import {Link} from 'react-router-dom';

// unused
function SearchCard(props) {
    const seed = props['data'];
    return (
        <div className="SearchCard">
            <img src={seed.photo} alt={'seed picture'}/>
            <Link to=
                      {{
                          pathname: `/detail/${seed._id}`,
                          state: {post: seed}
                      }}>
                <div className="details">
                    <h3>{seed.title}</h3>
                </div>
            </Link>
            <h4>{seed.category}</h4>

            <p>Price: {seed.price}</p>
        </div>
    );
}

export default SearchCard;

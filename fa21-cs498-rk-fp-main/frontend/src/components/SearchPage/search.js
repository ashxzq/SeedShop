import * as React from 'react';
import {useState} from 'react';
import {useParams} from "react-router-dom";
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {getAllPosts, searchPosts} from "../../utils/post_api";
import PostDetailCard from "../Card/PostDetailCard";
import './search.css'


export default function Search() {
    const {query} = useParams();
    let [seedList, setSeedList] = useState([])
    let [seedFiltered, setSeedFiltered] = useState([])
    let [sortingOrder, setSortingOrder] = useState('as')
    let [filteringCategory, setFilteringCategory] = useState('')

    React.useEffect(() => {
        if (query) {
            searchPosts(query).then(res => {
                const posts = res.data.data
                setSeedList(posts)
                setSeedFiltered(posts)
            })
        } else {
            getAllPosts().then(res => {
                const posts = res.data.data
                setSeedList(posts)
                setSeedFiltered(posts)
            })
        }
    }, [])

    function filter(category_id) {
        if (category_id === '') {
            setSeedFiltered(seedList)
        } else {
            let filtered = []
            for (let i in seedList)
                if (category_id.toLowerCase() === seedList[i]['category'].toString().toLowerCase())
                    filtered.push(seedList[i])
            setSeedFiltered(filtered)
        }
    }

    function sort(order) {
        let sorted = [];
        for (let i = 0; i < seedFiltered.length; i++) {
            sorted.push(seedFiltered[i])
        }
        if (order === 'as') {
            sorted.sort(
                (a, b) => {
                    return b.price - a.price;
                }
            )
        } else {
            sorted.sort(
                (a, b) => {
                    return a.price - b.price;
                }
            )
        }
        setSeedFiltered(sorted)
    }

    return (
        <div className='gallery-view'>
            <div className="button-group">
                <div className={'options'}>
                    <a>
                        Price
                    </a>
                    <ToggleButtonGroup
                        aria-label='outlined primary button group'
                        color={'primary'}
                        value={sortingOrder}
                        exclusive
                        onChange={(e, newVal) => {
                            setSortingOrder(newVal)
                            sort(newVal)
                        }}
                    >
                        <ToggleButton value={'as'}>Ascending</ToggleButton>
                        <ToggleButton value={'ds'}>Descending</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className={'options'}>
                    <a>
                        Category
                    </a>
                    <ToggleButtonGroup
                        aria-label='outlined primary button group'
                        color={'primary'}
                        value={filteringCategory}
                        exclusive
                        onChange={(e, newVal) => {
                            setFilteringCategory(newVal)
                            filter(newVal)
                        }}
                    >
                        <ToggleButton value={''}>All</ToggleButton>
                        <ToggleButton value={'vegetables'}>Vegetables</ToggleButton>
                        <ToggleButton value={'flowers'}>Flowers</ToggleButton>
                        <ToggleButton value={'herbs'}>Herbs</ToggleButton>
                        <ToggleButton value={'edibles'}>Edibles</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className="gallery-view-home">
                {seedFiltered.map(post => <PostDetailCard key={post._id} data={post}/>)}
            </div>
        </div>
    );

}

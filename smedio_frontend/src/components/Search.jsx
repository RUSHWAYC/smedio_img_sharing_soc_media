import React, { useState, useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'



const Search = ({ searchTerm }) => {

  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(searchTerm) {
      setLoading(true);
      //Set query to searchQuery that is equal to searchTerm.
      //Or rather what is being typed out in the search field.
      const query = searchQuery(searchTerm.toLowerCase())

      //Get the pins with name or description that includes query.
      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false);
        })
    } else {
      //If SearchTerm is empty just show all the pins.
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false);
        })
    }
    //On every searchTerm change load the useEffect.
  }, [searchTerm])
  

  return (
    <div>
      {/* If loading, show the loading spinner */}
      {loading && <Spinner message='Searching for pins...'/>}
      {/* If pins length is not 0 (pins found), show pins. */}
      {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
      {/* If pins length is 0 (no pins found), searchTerm is not empty, and loading is false
          show that there were no pins found. */}
      {pins?.length === 0 && searchTerm !== '' && !loading &&
      <div className='mt-10 text-center text-xl'>No pins found!</div>}
    </div>
  )
}

export default Search
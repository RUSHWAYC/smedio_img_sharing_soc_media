import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner';

const Feed = () => {

  //Set the state as not loading.
  const [loading, setLoading] = useState(false);

  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if(categoryId) {
      //Load categery as the search term from searchQuery in utils/data.
      const query = searchQuery(categoryId);
      //If categoryId is true, get the category from utils and set the posts to it.
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
      });
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    }
  }, [categoryId])

  //If loading, display the message from <Spinner />
  if(loading) return <Spinner message='We are adding new ideas to your feed!'/>

  if(!pins?.length) return <h2>No pins available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
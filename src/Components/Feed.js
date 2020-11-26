import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function Feed() {
  
  const [lastPostNumber, setLastPostNumber] = useState(0);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [endInfo, setEndInfo] = useState(true);

  const getPosts = () => {
    const newLastPostNumber = lastPostNumber + 5;
    fetch(`http://localhost:4000/posts?_start=${lastPostNumber}&_end=${newLastPostNumber}`) 
    .then(e => e.json())
    .then(posts => {
      if(posts.length === 0){
        setEndInfo(false)
      }
      setFetchedPosts([...fetchedPosts, ...posts])
    })
    .then(setLastPostNumber(newLastPostNumber))
  }

  return (
    <InfiniteScroll className="feed" dataLength={fetchedPosts.length} next={getPosts} hasMore={endInfo} scrollThreshold="2000px">
      <div className="feed_container">
        {fetchedPosts.length > 0 ?
          <>
            <h1 className="feed_title">ARTYKUŁY:</h1>
            {fetchedPosts.map(item => (
              <a href={item.url} key={item.title} target="blank" className="post_container">
                <img src={item.thumb} alt="thumb" className="post_thumb"/>
                <h1 className="post_title">{item.title}</h1>
                <p className="post_excerpt">{item.excerpt}</p>
                <p className="post_date">{item.date}</p>
              </a>
            ))}
            {!endInfo && <h2 className="endInfo">Koniec zawartości.</h2>}
          </>
        :
          <h1 className="feed_title">Ładowanie zawartości...</h1>
        }
      </div>
    </InfiniteScroll>
  );
}

export default Feed;

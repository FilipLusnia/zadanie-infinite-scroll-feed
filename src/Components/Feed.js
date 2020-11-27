import React, { useState, useEffect, useRef, useCallback } from 'react';

function Feed() {
  
  const [ lastPostNumber, setLastPostNumber ] = useState(0);
  const [ page, setPage ] = useState(1);
  const [ fetchedPosts, setFetchedPosts ] = useState([]);
  const [ endInfo, setEndInfo] = useState(false);
  const [ loadingInfo, setLoadingInfo] = useState(false);
  
  const loader = useRef();
  const lastElement = useCallback(e => {
    if(loadingInfo) return
    if(loader.current) loader.current.disconnect()
    loader.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && !endInfo){
        getPosts()
      }
    });
    if(e) loader.current.observe(e)
  }, [loadingInfo, endInfo])

  const getPosts = () => {
    setLoadingInfo(true)
    const newLastPostNumber = lastPostNumber + 5;
    fetch(`http://localhost:4000/posts?_start=${lastPostNumber}&_end=${newLastPostNumber}`) 
    .then(e => e.json())
    .then(posts => {
      if(posts.length === 0){
        setEndInfo(true)
      }
      setFetchedPosts([...fetchedPosts, ...posts])
      console.log(lastPostNumber)
      setLoadingInfo(false)
    })
    setLastPostNumber(newLastPostNumber)
  }

  useEffect(() => {
    getPosts()
  }, [page])

  return (
      <div className="feed_container">
        {fetchedPosts.length > 0 ?
          <>
            <h1 className="feed_title">ARTYKUŁY:</h1>
            {fetchedPosts.map((item, index) => (
              (fetchedPosts.length === index + 1) ?
                <a href={item.url} key={item.title} target="blank" ref={lastElement} className="post_container">
                  <img src={item.thumb} alt="thumb" className="post_thumb"/>
                  <h1 className="post_title">{item.title}</h1>
                  <p className="post_excerpt">{item.excerpt}</p>
                  <p className="post_date">{item.date}</p>
                </a>
              :
                <a href={item.url} key={item.title} target="blank" className="post_container">
                  <img src={item.thumb} alt="thumb" className="post_thumb"/>
                  <h1 className="post_title">{item.title}</h1>
                  <p className="post_excerpt">{item.excerpt}</p>
                  <p className="post_date">{item.date}</p>
                </a>
            ))}
            {loadingInfo && <h2 className="endInfo">Ładowanie...</h2>}
            {endInfo && <h2 className="endInfo">Koniec zawartości.</h2>}
          </>
        :
          <h1 className="feed_title">Ładowanie zawartości...</h1>
        }
      </div>
  );
}

export default Feed;

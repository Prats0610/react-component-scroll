import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {

  const [items, setItems] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setpage] = useState(2);
  
  
  useEffect(()=> {
    
    const getComments = async ()=>{
       const res = await fetch(
        'http://localhost:3004/comments?_page=1&_limit=20'
       );
       const data = await res.json();
       setItems(data);
    };
    getComments();
  }, []);

  const fetchComments = async ()=>{
    const res = await fetch(
      `http://localhost:3004/comments?_page=${page}&_limit=20`
     );
     const data = await res.json();
     return data;
  };
  
  const fetchData =async ()=>{
    const commentsFormServer = await fetchComments();
    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length <20){
      setnoMore(false);
      console.log("end");
    }
    
    setpage(page + 1);
  }

  return (
  <InfiniteScroll
  dataLength={items.length} 
  next={fetchData}
  hasMore={noMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
  {items.map((item)=>{
    return <div key={item.id}>
    <div>id: {item.id}</div>
    <div>email: {item.email}</div>
    <div>comment: {item.body}</div>
    </div>
  })}
</InfiniteScroll>
  )
}

export default App;
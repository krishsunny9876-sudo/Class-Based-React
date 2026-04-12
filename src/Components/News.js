import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './loading'
import InfiniteScroll from "react-infinite-scroll-component";

function News({ pageSize = 15, countryName = 'us', category = 'general', setProgress, apiKey }) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // document.title = `${this.capitalize( category)}-NewsBobsun`;

  const capitalize = (value) => {
    return (value[0].toUpperCase() + value.replace(value[0], ""));
  }

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${countryName}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    setArticles(data_object.articles);
    setTotalResults(data_object.totalResults);
    setLoading(false);

    setProgress(100);
  }

  const fetchMoreData = async () => {
    setPage(page + 1);

    const url = `https://newsapi.org/v2/top-headlines?country=${countryName}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    setArticles(articles.concat(data_object.articles));
    setTotalResults(data_object.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    updateNews();
  })

  return (
    <>
      <div className='container my-3'>
        <h1 className='text-center'>NewsBobsun-Top Headlines on {capitalize(category)}</h1>

        {loading && <Loading over={true} />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading over={articles.length < totalResults} />}
        >
          <div className="container">
            {<div className='row'>
              {articles.map((element) => {
                return (
                  <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""}
                      imgUrl={element.urlToImage ? element.urlToImage : "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"}
                      newsUrl={element.url} author={element.author} date={element.publishedAt} />
                  </div>
                )
              })}
            </div>}
          </div>

        </InfiniteScroll>

      </div>
    </>
  )
}

export default News
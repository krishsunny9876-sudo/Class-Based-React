import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=081588361a054a0f930185b82927f00c"
    let data = await fetch(url);
    let data_object = await data.json();

    console.log(data_object);

    this.setState({ articles: data_object.articles })
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>News Bobsun-Top Headlines</h2>

          <div className='row'>
            {this.state.articles.map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imgUrl={element.urlToImage ? element.urlToImage : "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"}
                    newsUrl={element.url} />
                </div>
              )
            })}
          </div>

          <div className="container d-flex justify-content-between">
            <button type="button" class="btn btn-dark">Prev</button>
            <button type="button" class="btn btn-dark">Next</button>
          </div>
        </div>
      </>
    )
  }
}

export default News
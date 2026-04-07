import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './loading'

export class News extends Component {

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
      loading: true
    })

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=081588361a054a0f930185b82927f00c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    this.setState({
      articles: data_object.articles,
      loading: false
    })
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
      loading: true
    })

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=081588361a054a0f930185b82927f00c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    this.setState({
      articles: data_object.articles,
      loading: false
    })
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=081588361a054a0f930185b82927f00c&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    this.setState({ articles: data_object.articles, totalResults: data_object.totalResults, loading: false })
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h1 className='text-center'>News Bobsun-Top Headlines</h1>

          {this.state.loading && <Loading />}

          {!this.state.loading && <div className='row'>
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
          </div>}

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default News
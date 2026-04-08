import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './loading'
import PropTypes from "prop-types";

export class News extends Component {

  static defaultProps = {
    pageSize: 15,
    countryName: 'us',
    category: 'general'
  };

  static propTypes = {
    countryName: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  async updateNews() {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.countryName}&category=${this.props.category}&apiKey=ad38da3716dc44eda8ba970297cb6409&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    this.setState({
      articles: data_object.articles,
      totalResults: data_object.totalResults,
      loading: false
    })
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
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
    this.updateNews();
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
                    newsUrl={element.url} author={element.author} date={element.publishedAt} />
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
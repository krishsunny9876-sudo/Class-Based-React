import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './loading'
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  capitalize(value) {
    return (value[0].toUpperCase() + value.replace(value[0], ""));
  }

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
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.countryName}&category=${this.props.category}&apiKey=ad38da3716dc44eda8ba970297cb6409&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    this.setState({
      articles: data_object.articles,
      totalResults: data_object.totalResults,
      loading: false
    })
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.countryName}&category=${this.props.category}&apiKey=ad38da3716dc44eda8ba970297cb6409&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let data_object = await data.json();

    this.setState({
      articles: this.state.articles.concat(data_object.articles),
      totalResults: data_object.totalResults,
      loading: false
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)}-NewsBobsun`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h1 className='text-center'>NewsBobsun-Top Headlines on {this.capitalize(this.props.category)}</h1>

          {this.state.loading && <Loading over={true} />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading over={this.state.articles.length < this.state.totalResults} />}
          >
            <div className="container">
              {<div className='row'>
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
            </div>

          </InfiniteScroll>

        </div>
      </>
    )
  }
}

export default News
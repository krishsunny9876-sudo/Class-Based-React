import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>News Bobsun-Top Headlines</h2>
          <div className='row'>
            <div className='col-md-4'>
              <NewsItem title="my title" description="my description" imgurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg" />
            </div>
            <div className='col-md-4'>
              <NewsItem title="my title" description="my description" />
            </div>
            <div className='col-md-4'>
              <NewsItem title="my title" description="my description" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default News
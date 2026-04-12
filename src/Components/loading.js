import React, { Component } from 'react'
import loadings from './loadingss.gif'

export default class loading extends Component {
    render() {
        return (
            this.props.over && <div className='text-center my-3'>
                <img src={loadings} alt="loading" style={{ width: '50px' }} />
            </div>
        )
    }
}
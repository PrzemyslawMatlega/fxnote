import React, { Component } from 'react'
import Layout from '../../components/Layout/Layout'
import {Route} from 'react-router-dom'
export default class Secure extends Component {
    render() {
        return (
            <Route path="/" component={Layout}/>
        
        )
    }
}

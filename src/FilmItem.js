"use strict";

import React, { Component } from 'react'

class FilmItem extends Component {
    render() {
        return (
            <div className="col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-header">
                        <img style={{ maxWidth: '100%' }} src={this.props.img} alt={"No image found!"} />
                    </div>
                    <div className="card-body">
                        <h3>Title: {this.props.title}</h3>
                        <div>Type: {this.props.type}</div>
                        <div>Year: {this.props.year}</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default FilmItem
"use strict";

import React, { Component } from 'react'
import axios from 'axios'
import FilmItem from './FilmItem'

class App extends Component {
    constructor() {
        super();
        this.state = {
            films: [],
            filmsyoutube: [],
            title: "",
            year: "",
            grade: "",
        };
        this.titleRef = React.createRef();
        this.searchFilmOrMusic = this.searchFilmOrMusic.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(search) {
        const key = "AIzaSyC1udTFnckF2adJKPpU7m_-Fp4i7PQb1Pg";
        const youtubeAPI = "https://www.googleapis.com/youtube/v3/search?q=" + search +
            "&videoType=movie&part=snippet&maxResults=10&type=video&order=date&key=" + key;
        const getYoutubeFilms = axios.get(youtubeAPI);

        const omdbapi = "https://omdbapi.com/?s=" + search + "&page=1&apikey=6ab8345c"
        const getOmdbapiFilms = axios.get(omdbapi);

        axios.all([getYoutubeFilms, getOmdbapiFilms]).then(
            axios.spread((...allData) => {
                this.setState(function (prevState) {
                    return { counter: prevState.counter + 1 }
                });

                // console.log(allData[0])
                // console.log(allData[1])

                this.state.filmsyoutube = allData[0].data.items.map(function (film) {
                    return film
                })

                if (allData[1].data.Response === "True") {
                    this.state.films = allData[1].data.Search.map(function (film) {
                        return film
                    })
                }
                else {
                    this.state.films = [{ Title: "Movie not found!", Year: "0" }]
                }
            })
        )
    }


    searchFilmOrMusic(event) {
        event.preventDefault();
        if (this.titleRef.current.value !== "") {
            this.state.films = []
            this.state.filmsyoutube = []
            this.fetchData(this.titleRef.current.value);

            this.titleRef.current.value = "";
        }
        else {
            alert("You must write the film or music title!");
        }
    }

    render() {
        //  console.log("state", this.state);
        return (
            <div className="container">
                <div className="navbar bg-dark rounded text-white">
                    <h2>Search films from OmdbAPI and YoutubeAPI:</h2>
                </div>
                <div >
                    <form action=''>
                        <ul className='list-group'>
                            <li className="list-group-item">
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" maxLength={20}
                                    placeholder="Film or Music title"
                                    ref={this.titleRef} required></input>
                                <button onClick={this.searchFilmOrMusic} >Search</button>
                            </li>
                        </ul>

                    </form>
                </div>
                <div className="row">
                    {this.state.films.map(filmItem => <FilmItem
                        title={filmItem.Title}
                        year={filmItem.Year}
                        img={filmItem.Poster}
                        type={"Omdbapi"}
                    />)}
                    {this.state.filmsyoutube.map(filmItem => <FilmItem
                        title={filmItem.snippet.title}
                        year={filmItem.snippet.publishedAt}
                        img={filmItem.snippet.thumbnails.high.url}
                        type={"Youtube"}
                    />)}
                </div>
            </div>
        )
    }
}
export default App
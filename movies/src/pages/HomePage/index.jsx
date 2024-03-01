import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from "./styles.module.css"
import axios from 'axios'
import Movie from '../../components/Movie'
import PageNumber from '../../components/PageNumber'

export default function HomePage() {

    const [searchTerm, setSearchTerm] = useState("")
    const [movies, setMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [selectedRating, setSelectedRating] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    async function fetchData(search=searchTerm, genre=selectedGenre, language=selectedLanguage, rating=selectedRating, page=currentPage) {
        let queryUrl = `http://localhost:8000/api/movies/search/?page=${page}&s=${search}`;
            if (genre) queryUrl += `&genre=${genre}`;
            if (language) queryUrl += `&language=${language}`;
            if (rating) queryUrl += `&rating=${rating}`;
        try {
            const response = await axios.get(queryUrl)
            
            const data = response.data
            setMovies(data.data)
            setTotalPages(data.total_pages)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchData();
    }, [searchTerm, selectedGenre, selectedLanguage, selectedRating]);

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
        setCurrentPage(1)
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        setCurrentPage(1)
    };

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
        setCurrentPage(1)
    };


    return (
        <div className={styles.main}>
            <Navbar />
            <div className={`${styles.top}`}>
                <h1 className={`text-center ${styles.text} ${styles.text1}`}>GET <span className={`text-center ${styles.text11}`}>MOVIE</span> TICKETS</h1>
                <h2 className={`text-center ${styles.text} ${styles.text2}`}>Buy movie tickets in advance, find movie times, watch trailers,</h2>
                <h2 className={`text-center ${styles.text} ${styles.text3}`}>read movie reviews and much more</h2>
            </div>
            <div className={`container ${styles.top2}`}>
                <h6 className={`${styles.text} ${styles.text4}`}>WELCOME TO BOLETO</h6>
                <h4 className={`${styles.text} ${styles.text5}`}>WHAT ARE YOU LOOKING FOR</h4>
                <div className={styles.subContainer}>
                    <div>
                        <input className={`${styles.input} ${styles.input1}`} type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} name='movies-search' id='movies-search' placeholder='Search for Movies' />
                    </div>

                    <div>
                        <label className={`${styles.label}`} htmlFor='city'>Genre</label>
                        <select className={styles.input} value={selectedGenre} onChange={handleGenreChange} name='city' id='city'>
                            <option value="">Choose a Genre</option>
                            <option value="drama">Drama</option>
                            <option value="action">Action</option>
                            <option value="crime">Crime</option>
                        </select>
                    </div>

                    <div>
                        <label className={`${styles.label}`} htmlFor='rating'>Rating</label>
                        <select className={styles.input} value={selectedRating} onChange={handleRatingChange} name='rating' id='rating'>
                            <option value="">Select Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div>
                        <label className={`${styles.label}`} htmlFor='language'>Language</label>
                        <select className={styles.input} value={selectedLanguage} onChange={handleLanguageChange} name='language' id='language'>
                            <option value="" >Select</option>
                            <option value="english">English</option>
                            <option value="italian">Italian</option>
                            <option value="french">French</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className={`${styles.moviesSection}`}>
                <div className={`row ${styles.moviecards} text-center`}>
                    {
                        movies.length === 0 ? (
                            <h2 className={`${styles.text}`}>No movies available</h2>
                        ) : (
                            movies.map(movie => (
                                <Movie key={movie.id} title={movie.title} description={movie.description} rating={movie.rating} imgurl={movie.image} id={movie.id} />
                            ))
                        )
                    }
                </div>
            </div>

            <PageNumber total_pages={totalPages} searchTerm={searchTerm} selectedGenre={selectedGenre} selectedLanguage={selectedLanguage} selectedRating={selectedRating} currentPage={currentPage} fetchData={fetchData} current_page={currentPage} setMovies={setMovies} setCurrentPage={setCurrentPage} setTotalPages={setTotalPages} />

        </div>

    )
}

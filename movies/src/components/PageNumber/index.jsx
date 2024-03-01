import React from 'react'
import styles from "./styles.module.css"

export default function PageNumber(props) {
    const handlePrevClick = () => {
        let page_num = props.currentPage
        if(page_num>1){
            page_num = page_num - 1
            props.setCurrentPage(page_num)
        }
        else{
            page_num = 1
        }
        props.fetchData(props.searchTerm, props.selectedGenre, props.selectedLanguage, props.selectedRating, page_num)
    }

    const handleNextClick = () => {
        let page_num = props.currentPage
        if(page_num<props.total_pages){
            page_num = page_num + 1
            props.setCurrentPage(page_num)
        }
        else{
            page_num = props.total_pages
        }
        props.fetchData(props.searchTerm, props.selectedGenre, props.selectedLanguage, props.selectedRating, page_num)
    }

  return (
    <div className={`d-flex justify-content-center ${styles.btnDiv}`}>
        <button type="button" disabled={props.currentPage===1} onClick={handlePrevClick} className={`btn btn-primary ${styles.prevBtn}`}>Previous</button>
        <button type="button" disabled={props.currentPage===props.total_pages} onClick={handleNextClick} className={`btn btn-primary ${styles.nextBtn}`}>Next</button>
    </div>
  )
}

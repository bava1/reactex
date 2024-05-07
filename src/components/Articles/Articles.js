import React from 'react'
import './Articles.css'
import articlesList from './articleList.js';
import AccordionPanel from '../../material/AccordionPanel/AccordionPanel'

const Articles = () => {
  return (
    <section className="articles">
        <h1>Articles</h1>
        <div className="articles-main">
            {articlesList?.map((article) => (

            <div key={article.id} className="articles-main_block">
                <AccordionPanel title={article.title} text={article.text} />
            </div>
            ))}
        </div>
    </section>
  )
}

export default Articles

import React from 'react'
import './Homepage.css'
import cardContent from './homepageCard.js';
import blockContent from './homepageBlockContent.js';
import brain from '../../assets/img/brain2.png' // relative path to image 
import Cards from '../../material/Cards/Cards';


function Homepage() {
    return (
        <section className="homepage">
            <h1>React: the harmony of performance and coding satisfaction.</h1>
            <div className="homepage-main">
                {cardContent.map((el) => (
                    <div key={el.id} className="homepage-main_card">
                        <Cards                                 
                            avatar={el.avatar} 
                            title={el.title} 
                            subheader={el.subheader} 
                            image={el.image} 
                            paragraph1={el.paragraph1} 
                            paragraph2={el.paragraph2} 
                            paragraph3={el.paragraph3}                      
                        />
                    </div>
                    ))
                }  
            </div>   
            <div className="homepage-block">
                <div className="homepage-block_img">
                    <img src={brain}  alt={brain}/>
                </div>
                <div className="homepage-block_text">
                    {blockContent.map(function(el){
                        return (
                            <div key={el.id}>{el.title}</div>
                        )
                    })}  
                </div>
            </div>   
        </section>
    )
}

export default Homepage;

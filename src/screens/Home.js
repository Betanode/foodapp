import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
const Home = () => {
    const [cat, setcat] = useState([])
    const [items, setitems] = useState([])
    const [search, setsearch] = useState('')
    const loadData = async () => {
        let response = await fetch("http://localhost:3500/api/displaydata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
        response = await response.json()
        setcat(response[1]);
        setitems(response[0])
        console.log(response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Type your food here" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                            </div>

                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?chicken" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='m-5'>
                {
                    cat !== [] ?
                        cat.map((data) => {
                            return (<div className='row m-3'>
                                <div className='fs-1 mb-3' key={data._id}>{data.CategoryName}</div>
                                <hr />
                                {
                                    items.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map((i) => {
                                            return (
                                                <div key={i._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem = {i}
                                                        option={i.options[0]}
                                                    />
                                                </div>
                                            )
                                        })
                                }
                            </div>)
                        })
                        :
                        <div>"""""""""""""""</div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home
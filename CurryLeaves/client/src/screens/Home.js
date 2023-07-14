import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { Card } from '../components/Card'

export const Home = () => {
    const [Starter, setStarter] = useState([])
    const [Biryani, setBiryani] = useState([])
    const [Dessert, setDessert] = useState([])
    let name = localStorage.getItem('userName')
    const loadMenu = async () => {
        let response = await fetch('http://localhost:5000/api/menu/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let res = await response.json()
        await setStarter(res.StarterMenu)
        await setBiryani(res.BiryaniMenu)
        await setDessert(res.DessertMenu)
    }
    useEffect(() => {
        loadMenu()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='bg-light bg-gradient'>
                <Navbar />
                <hr />
                <h3 className='text-info' >Welcome, {name}. Here is the Today's Menu</h3>
                <hr className="bg-danger border-2 border-top border-danger"></hr>
                <div className="container">
                    <h3 className="text-info">Starters</h3>
                    <div className="container">
                        <div className="row g-3">
                            {Starter.map((data) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                                        <Card name={data.name} fooditem={data} desc={data.description} price={data.price} img={data.img} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="bg-danger border-2 border-top border-info"></hr>
                    <h3 className='text-info'>Biryani/Rice</h3>
                    <div className="container">
                        <div className="row g-3">
                            {Biryani.map((data) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                                        <Card name={data.name} fooditem={data} desc={data.description} price={data.price} img={data.img} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="bg-danger border-2 border-top border-info"></hr>
                    <h3 className='text-info'>Desserts</h3>
                    <div className="container">
                        <div className="row g-3">
                            {Dessert.map((data) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                                        <Card name={data.name} fooditem={data} desc={data.description} price={data.price} img={data.img} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

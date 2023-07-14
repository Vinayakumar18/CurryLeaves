import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'

export const MyOrders = () => {
  const [orderData, setorderData] = useState({})

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/order/myOrder", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (res) => {
      let response = await res.json()
      console.log(response)
      await setorderData(response)
    })
  }
  useEffect(() => {
    fetchMyOrder()
  }, [])
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='container'>
          {orderData !== {} ? Array(orderData).map(data => {
            return (
              data.orderData ?
                data.orderData.order_data.slice(0).reverse().map((item) => {
                  return (
                    item.map((arrayData) => {
                      return (
                        <div className='row'>
                          {arrayData.Order_date ? <div className='m-auto mt-5'>
                            Date: {arrayData.Order_date}   Total: ₹{arrayData.Total_price}/-
                            <hr />
                          </div> :
                              <div className='col-12 col-md-6 col-lg-4 mb-3' >
                                <div className="card mt-3" style={{ width: "21rem", maxHeight: "450px" }}>
                                  <div className="card-body">
                                    <h5 className="card-title">{arrayData.name}</h5>
                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                      <span className='m-1'>{arrayData.qty}</span>
                                      <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                        | ₹{arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          }

                        </div>
                      )
                    })
                  )
                }) : ""
            )
          }) : ""}
      </div>
      <Footer />
    </div>
  )
}

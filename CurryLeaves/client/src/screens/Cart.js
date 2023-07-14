import React from "react";
import { Navbar } from "../components/Navbar";
import { useCart, useDispatchCart } from "../state_management/ContextReducer";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  let myCart = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate()
  if (myCart.length === 0) {
    return (
      <>
        <Navbar />
        <div>
          <div className='m-5 w-90 text-center fs-3'>The Cart is Empty!</div>
        </div>
      </>
    )
  }
  const handleCheckout = async () => {
    let userEmail = localStorage.getItem('userEmail')
    let date = new Date();
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
    let response = await fetch('http://localhost:5000/api/order/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: myCart,
        email: userEmail,
        order_date: new Date().toDateString(),
        order_time: time,
        total_price:totalPrice
      })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      navigate('/home')
      let newTime = new Date()
      newTime.setMinutes(newTime.getMinutes()+30)
      let estmTime = newTime.toLocaleTimeString()
      alert('Your Order is placed and Estimated Delivery Time:' + estmTime)
    }
  }
  let totalPrice = myCart.reduce((total, data) => total + data.price, 0)
  return (
    <>
      <Navbar />
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success text-center fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {myCart.map((data, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.qty}</td>
                <td>{data.price}</td>
                <td><button type="button" className="btn btn-danger p-0" onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3 className='fs-2'>Total Price: {totalPrice} /-</h3>
        </div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckout} > Check Out </button>
        </div>
      </div>
    </>
  );
};

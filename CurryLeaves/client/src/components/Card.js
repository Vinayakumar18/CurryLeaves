// import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatchCart } from '../state_management/ContextReducer';
import { useNavigate } from 'react-router-dom';

export const Card = (props) => {
    const navigate = useNavigate()
    let foodName = props.name;
    let foodDesc = props.desc;
    let foodPrice = props.price;
    let foodimg = props.img;
    const dispatch = useDispatchCart()
    let foodItem = props.fooditem;
    const [Qty, setQty] = useState(1)
    let finalprice = Qty * foodPrice;
    const handleCart = async () => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login")
        }
        else {
            await dispatch({ type: 'ADD', id: foodItem._id, name: foodName, qty: Qty, price: finalprice, })
        }
    }
    return (
        <>
            <div className="card" style={{ width: '24rem', maxHeight: '48rem' }}>
                <img src={foodimg} className="card-img-top" alt="..." style={{ height: "240px", objectFit: "fill" }} />
                <div className="card-body" style={{ height: "18rem" }}>
                    <h5 className="card-title">{foodName}</h5>
                    <div className='card-text' style={{ maxHeight: "9rem" }}>
                        <p >{foodDesc}</p>
                    </div>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <h6>Quantity:
                            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={(e) => { setQty(e.target.value) }} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                            price: {finalprice}
                        </h6>
                    </div>
                    <button type='button' className="btn btn-success" onClick={handleCart}>Add</button>
                </div>
            </div>
        </>
    )
}

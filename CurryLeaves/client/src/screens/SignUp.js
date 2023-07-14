import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const SignUp = () => {
    const navigate = useNavigate()
    const [User, setUser] = useState({ name: "", email: "", password: "", street: "", city: "", state: "" })
    const onChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify({ name: User.name, email: User.email, password: User.password, street: User.street, city: User.city, state: User.state })
    })
    let response = await res.json()
    console.log(response)
    if(!response.isNewUser){
        alert("email already registered")
    }
    else if(!response.success){
        alert("password should be atleast 5 character")
    }
    else{
        alert('You Are Registered!!!')
        navigate('/')
    }
}
return (
    <>
        <hr />
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" name='name' value={User.name} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={User.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" min={5} className="form-control" id="exampleInputPassword1" name='password' value={User.password} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Address" className="form-label">Address</label>
                    <div className="row">
                        <div className="col-4">
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, street, or floor" name='street' value={User.street} onChange={onChange} required/>
                        </div>
                        <div className="col-4">
                            <input type="text" className="form-control" id="inputAddress3" placeholder="City" name='city' value={User.city} onChange={onChange} required/>
                        </div>
                        <div className="col-4">
                            <input type="text" className="form-control" id="inputAddress4" placeholder="State" name='state' value={User.state} onChange={onChange} required/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Register</button>
                <Link to="/" className='m-3 btn btn-danger'>Already User</Link>
            </form>
        </div>
    </>
)
}
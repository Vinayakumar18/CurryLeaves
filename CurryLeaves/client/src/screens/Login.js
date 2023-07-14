import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
    const [User, setUser] = useState({email:"",password:""})
    const navigate = useNavigate()
    const onChange = (e)=>{
        setUser({...User,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:User.email,password:User.password})
        })
        let res = await response.json()
        console.log(res)
        if(!res.success){
            alert("Enter valid credentails")
        }
        else{
            localStorage.setItem('authToken',res.authToken)
            localStorage.setItem('userEmail',res.userEmail)
            localStorage.setItem('userName',res.userName)
            navigate('/home')
        }
    }
    return (
        <>
            <hr />
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={User.email} onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={User.password} onChange={onChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/signup" className='m-3 btn btn-danger'>New User</Link>
                </form>
            </div>
        </>
    )
}

import React , {useState} from 'react'
import { Link } from 'react-router-dom'
const Signup = () => {
    const [usera, setusera] = useState({name:"",email:"",location:"",password:""})
    const handleSubmit = async (e) =>{
        console.log("hello")
        e.preventDefault();
        const response = await fetch("http://localhost:3500/api/createuser",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:usera.name , location:usera.location , email:usera.email , password:usera.password})
        });
        const json  = await response.json()
        console.log(json)
        if(!json.success){
            alert("Enter Valid Credentials")
        }
    }
    const handleChange = (event)=>{
        setusera({...usera,[event.target.name]:event.target.value})
    }
    return (
        <div className='container p-4'>
            <form onSubmit={handleSubmit}>
                <div className="form-group p-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="Enter Your Name" name='name' value={usera.name} onChange={handleChange} />
                </div>
                <div className="form-group p-4">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" placeholder="Enter Your Location" name='location' value={usera.location} onChange={handleChange}/>
                </div>
                <div className="form-group p-4">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={usera.email} onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group p-4">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={usera.password} onChange={handleChange}/>
                </div>
                
                <div className='p-2'>
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
                <div className='p-2'>
                    <Link to="/login" className="btn btn-danger" >Already a user</Link>
                </div>

            </form>
        </div>
    )
}

export default Signup
import React , {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
const Login = () => {
  const [usera, setusera] = useState({  email: "", password: "" })
  let nevigate = useNavigate()
  const handleSubmit = async (e) => {
    console.log("hello")
    e.preventDefault();
    const response = await fetch("http://localhost:3500/api/loginuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({  email: usera.email, password: usera.password })
    });
    const json = await response.json()
    console.log(json)
    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      nevigate("/");
    }
  }
  const handleChange = (event) => {
    setusera({ ...usera, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className='container p-4'>
        <form onSubmit={handleSubmit}>
          
          
          <div className="form-group p-4">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={usera.email} onChange={handleChange} />
            
          </div>
          <div className="form-group p-4">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={usera.password} onChange={handleChange} />
          </div>

          <div className='p-2'>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
          <div className='p-2'>
                    <Link to="/createuser" className="btn btn-danger" >New User!!</Link>
                </div>
          

        </form>
      </div>
    </div>
  )
}

export default Login
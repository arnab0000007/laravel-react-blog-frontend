import React,{useContext} from 'react'
import { RegisterContext } from './Register'
function RegisterForm() {
    const {signUp,username,password,setUsername,email,setEmail,name,setName,website,setWebsite,setPassword} = useContext(RegisterContext)
    return (
        <div className="col-sm-6 offset-sm-3">
        <h1>Register</h1>
        <form onSubmit={signUp}>
            <div className="form-group">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Full Name"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="form-control"
                    placeholder="website"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
        </form>
    </div>
    )
}
export default RegisterForm
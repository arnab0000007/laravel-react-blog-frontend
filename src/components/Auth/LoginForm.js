import React,{useContext} from 'react'
import { LoginContext } from './Login'
function LoginForm(){
    const {logIn,emailOrUsername,password,setemailOrUsername,setPassword} = useContext(LoginContext)
    return (
                <div className="col-sm-6 offset-sm-3">
            <h1>Login</h1>
            <form onSubmit={logIn}>
                <div className="form-group">
                    <input
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setemailOrUsername(e.target.value)}
                        className="form-control"
                        placeholder="Enter your email or Username"
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
                        Log In
                    </button>
                </div>
            </form>
        </div>
      
    )
}
export default LoginForm
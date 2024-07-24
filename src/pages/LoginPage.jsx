import { signInWithPopup } from "firebase/auth"
import {auth, provider} from "../firebase/index"

const LoginPage = ({setIsAuth}) => {
//? Butona tıklanınca çalışır
    const handleClick = () => {
      signInWithPopup(auth, provider)
      .then((data) => {

        //* state'i güncelle
        setIsAuth(data.user.refreshToken)

        //* local storage'ı güncelle
        localStorage.setItem("token", data.user.refreshToken)
      })
      .catch((err) => console.log(err))
    }

  return (
    <div className="container">
        <div className="login">
            <h1>Chat Room</h1>

            <p>Sign in to continue</p>

            <button onClick={handleClick}>
                <img src="g-logo.png" alt="google-logo" />
                <span>Sign in with Google</span>
            </button>         
        </div>
    </div>
  )
}

export default LoginPage
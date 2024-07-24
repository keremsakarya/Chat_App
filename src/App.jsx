import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import RoomPage from "./pages/RoomPage"
import ChatPage from "./pages/ChatPage"

function App() {
 //? Kullanıcı giriş yaptı mı state'i
 const [isAuth, setIsAuth] = useState(localStorage.getItem("token"))

 //? Kullanıcının girdiği oda state'i
 const [room, setRoom] = useState(null)

 console.log(room);

 //? Kullancının yetkisi yoksa: login sayfası
 if (!isAuth) {
  return <LoginPage setIsAuth={setIsAuth} />
 }

 //? Kullanıcının yetkisi varsa: oda seçme sayfası
 return (
    <div className="container">
      {room ? (
        // oda seçiliyse: sohbet sayfası
        <ChatPage room={room} setRoom={setRoom}/>
      ) : (
        // oda seçilmediyse: oda seçme sayfası
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom}/>
      )}
    </div>
  )
}

export default App

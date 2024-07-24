
const RoomPage = ({setIsAuth, setRoom}) => {

    //* çıkış
    const logout = () => {
        //? yetki state'ini false a çek
        setIsAuth(false)

        //? local'daki token'i kaldır
        localStorage.removeItem("token")
    }

    //* form gönderilince
    const handleSubmit = (e) => {
      e.preventDefault()

      // inputtaki girdiyi al ve küçük harflere çevir
      // büyük küçük harf duyarlılığını ortadan kaldırır
      const room = e.target[0].value.toLocaleLowerCase()

      // state'i güncelle
      setRoom(room)

    }

  return (
    <form onSubmit={handleSubmit} className="room-page">
        <h1>Chat Room</h1>
        <p>Which room will you enter?</p>

        <input placeholder="write a room name" type="text" required/>

        <button type="submit">Enter Room</button>
        <button onClick={logout} type="button">Log Out</button>
    </form>
  )
}

export default RoomPage
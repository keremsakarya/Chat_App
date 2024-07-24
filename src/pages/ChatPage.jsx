import { addDoc, collection, getDocs, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Message from "../components/Message";
import EmojiPicker from 'emoji-picker-react';

const ChatPage = ({ room, setRoom }) => {
    const [text, setText] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])

    const lastMsg = useRef(null)

    //? form gönderilince mesajı veritabanına kaydet
    const handleSubmit = async (e) => {
        e.preventDefault()

        //* mesaj document'inin kaydedileceği koleksiyonon referansını al
        const messagesCol = collection(db, "messages")

        //* referansı alınan koleksiyonu document'a ekle
        await addDoc(messagesCol, {
            text: e.target[0].value,
            room,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
            },
            createdAt: serverTimestamp(),
        })

        //* formu temizle
        setText("")


    }
    
    //? mevcut odada gönderilen mesajları anlık olarak al
    useEffect(() => {
        //* 1) abone olunacak koleksiyonun referansını al
        const messagesCol = collection(db, "messages")

        //* 2) sorgu ayarlarını yap
        const q = query(messagesCol,where("room", "==", room), orderBy("createdAt", "asc"))

        //* 3) onSnapshot: anlık olarak koleksiyondaki değişimleri izler
        //* her değiştiğinde callback function tetiklenir ve güncellemeleri alır
        const unsub = onSnapshot(q, (snapshot) => {
            let temp = []

            // data() yöntemi ile dökümanların içerisindeki veriye erişip geçici diziye aktardık
            snapshot.docs.forEach(doc => {
                temp.push(doc.data())
            })

                //* son mesaja odakla
                lastMsg.current.scrollIntoView({behavior: "smooth"})

            setMessages(temp)
        })

        //* 4) kullanıcı sayfadan ayrıldığı anda dinlemeyi durdur
        return () => {
            unsub()
        }
    }, [])

    return (
        <div className="chat-page">
            <header>
                <p>{auth.currentUser?.displayName}</p>
                <p>{room}</p>
                <button onClick={() => setRoom(null)}>Another Room</button>
            </header>

            <main>
               {!messages ? ( <div className="warn"><p>Send the first message to Chat!</p></div> ) : ( messages.map((data,key) => <Message data={data} key={key} />))}

               <div ref={lastMsg} />
            </main>

            <form className="send-form" onSubmit={handleSubmit}>
                <input value={text} onChange={(e) => {setText(e.target.value); setIsOpen(false)}} placeholder="write your message..." type="text" />
                <div>
                    <EmojiPicker onEmojiClick={(e) => setText(text + e.emoji)} open={isOpen} skinTonesDisabled />
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>😁</button>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatPage
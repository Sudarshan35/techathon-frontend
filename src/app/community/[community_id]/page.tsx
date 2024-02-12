import data from "./data.json";
import Chat from "@/components/chat";

export default function page() {
    const data=[
        {
          "username": "Alice",
          "chat": "Hey, how's it going?",
          "time": "2024-02-11T14:15:00"
        },
        {
          "username": "Bob",
          "chat": "Not bad! Just working on some projects.",
          "time": "2024-02-11T14:20:00"
        },
        {
          "username": "Alice",
          "chat": "Nice! Anything exciting?",
          "time": "2024-02-11T14:25:00"
        },
        {
          "username": "Bob",
          "chat": "Yeah, I'm developing a new app. It's challenging but fun!",
          "time": "2024-02-11T14:30:00"
        },
        {
          "username": "Alice",
          "chat": "That sounds awesome! What's it about?",
          "time": "2024-02-11T14:35:00"
        },
        {
          "username": "Bob",
          "chat": "It's a productivity app to help people manage their tasks efficiently.",
          "time": "2024-02-11T14:40:00"
        },
        {
          "username": "Alice",
          "chat": "I'd love to hear more about it sometime!",
          "time": "2024-02-11T14:45:00"
        }
      ]
      

    console.log(data);
    console.log("surprise motherfucker")
  return (
    <div>
      {data.map((chat) => (
        <Chat data={chat}></Chat>
      ))}
    </div>
  );
}

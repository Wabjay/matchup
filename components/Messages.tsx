// "use client"
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// // Define message type
// type Message = {
//   id: string;
//   content: string;
//   sender: string;
// };

// const Messages = () => {
//   const [messages, setMessages] = useState<Message[]>([]); // ✅ TypeScript now knows messages is an array of Message objects
//   const socket = io();

//   useEffect(() => {
//     socket.on('newMessage', (message: Message) => {
//       setMessages((prev) => [...prev, message]); // ✅ No more TypeScript error
//     });

//     return () => {
//       socket.off('newMessage');
//     };
//   }, []);

//   return (
//     <section className="p-4 bg-white shadow-md rounded-lg">
//       <h3 className="text-xl font-semibold">Messages</h3>
//       {messages.length > 0 ? (
//         messages.map((msg) => <p key={msg.id}>{msg.sender}: {msg.content}</p>)
//       ) : (
//         <p>No new messages</p>
//       )}
//     </section>
//   );
// };

// export default Messages;

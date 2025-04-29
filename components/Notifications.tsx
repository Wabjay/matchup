// "use client"
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// // Define notification type
// type Notification = {
//   id: string;
//   message: string;
// };

// const Notifications = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const socket = io();

//   useEffect(() => {
//     socket.on('newNotification', (notification: Notification) => {
//       setNotifications((prev) => [...prev, notification]);
//     });

//     return () => {
//       socket.off('newNotification');
//     };
//   }, []);

//   return (
//     <section className="p-4 bg-white shadow-md rounded-lg">
//       <h3 className="text-xl font-semibold">Notifications</h3>
//       {notifications.length > 0 ? (
//         notifications.map((note) => <p key={note.id}>{note.message}</p>)
//       ) : (
//         <p>No new notifications</p>
//       )}
//     </section>
//   );
// };

// export default Notifications;

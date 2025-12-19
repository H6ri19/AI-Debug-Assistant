export default function initSockets(io) {
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join-file", (room) => {
      socket.join(room);
      console.log(`Joined room: ${room}`);
    });

    socket.on("editor-change", ({ room, text }) => {
      socket.to(room).emit("editor-change", { text });
    });
  });
}

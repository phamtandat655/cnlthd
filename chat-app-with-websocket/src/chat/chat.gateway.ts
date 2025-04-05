import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép mọi nguồn truy cập
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server; // Biến này dùng để phát tin nhắn đến tất cả client

  @SubscribeMessage('message') // Lắng nghe sự kiện 'message'
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message); // Gửi tin nhắn đến tất cả client
  }
}

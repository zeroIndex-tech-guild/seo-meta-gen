import { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

type SocketContext = Socket

const socketInstance = io('http://localhost:3333')

export const socketContext = createContext<SocketContext>(socketInstance)

export const useSocket = () => {
  const socket = useContext(socketContext)

  return socket
}

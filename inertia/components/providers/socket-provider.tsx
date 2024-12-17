import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { socketContext } from '../../store/context/socket'

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket>(null)

  useEffect(() => {
    const socketInstance = io('http://localhost:3333')
    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return <socketContext.Provider value={socket}>{children}</socketContext.Provider>
}

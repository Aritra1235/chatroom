'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import '@/components/css/chat.css'

type Message = {
  id: number
  text: string
  sender: string
  avatar: string
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey there! How's it going?", sender: "John", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, text: "Hi! I'm doing great, thanks for asking. How about you?", sender: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, text: "I'm doing well too. Did you finish that project you were working on?", sender: "John", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, text: "Yes, I did! It was challenging but I learned a lot.", sender: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
        avatar: "/placeholder.svg?height=32&width=32"
      }])
      setNewMessage("")
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full max-w-md mx-auto border rounded-lg bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 p-2 rounded-lg ${
                message.sender === "You" ? 'bg-primary/10 ml-auto' : 'bg-muted/50'
              }`}
            >
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{message.sender}</p>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button variant="outline" onClick={handleSendMessage}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  )
}
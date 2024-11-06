import React from 'react'
import { Card } from "@/components/ui/card"
import { Clock, Triangle } from "lucide-react"

const EventCard = ({ 
  eventName = "Nombre del Evento",
  timeRemaining = "2 días",
  collaboratorName = "Colaborador",
  collaboratorImage = "/placeholder.svg?height=40&width=40"
}) => {
  return (
    <Card className="relative w-full max-w-2xl overflow-hidden border-2">
      <div className="p-6">
        {/* Tiempo Restante */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 shadow-sm">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">{timeRemaining}</span>
        </div>

        {/* Nombre Evento y Triángulo */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <h2 className="mb-6 text-center text-2xl font-bold">{eventName}</h2>
          <Triangle className="h-24 w-24" />
        </div>

        {/* Colaboración */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 shadow-sm">
          <span className="text-sm font-medium">{collaboratorName}</span>
          <img
            src={collaboratorImage}
            alt={collaboratorName}
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
    </Card>
  )
}

export default EventCard
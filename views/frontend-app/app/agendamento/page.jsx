import React from 'react'
import CalendarComponent from "../../components/layout/Calendar/Calendar"
import ProtectRoute from '../../components/ProtectRoute'
export default function page() {
  return (
    <ProtectRoute>
    <div>
        <h1>Agendamento de tarefas e lembretes para os vendedores</h1>
        <CalendarComponent></CalendarComponent>
    </div>
    </ProtectRoute>
  )
}

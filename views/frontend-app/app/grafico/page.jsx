import React from 'react'
import GraficoComponent from "../../components/layout/Grafico/Grafico"
import ProtectRoute from '../../components/ProtectRoute'

export default function page() {
  return (
    <ProtectRoute>
    <div>
        <GraficoComponent></GraficoComponent>
    </div>
    </ProtectRoute>
  )
}

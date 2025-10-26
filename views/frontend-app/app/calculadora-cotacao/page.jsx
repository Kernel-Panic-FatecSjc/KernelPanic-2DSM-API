import React from 'react'
import CalculadoraCotacao from "../../components/layout/CalculadoraCotacao/CalculadoraCotacao"
import ProtectRoute from '../../components/ProtectRoute'
export default function page() {
  return (
    <ProtectRoute>
    <div>
        <CalculadoraCotacao></CalculadoraCotacao>
    </div>
    </ProtectRoute>
  )
}

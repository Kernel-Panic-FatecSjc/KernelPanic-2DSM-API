import React from 'react'
import Kanban from "../../components/layout/Kanban/Kanban"
import Funil from "../../components/layout/FunilVendas/FunilVendas"
import styles from './App.module.css';
import ProtectRoute from '../../components/ProtectRoute';

export default function page() {
  return (
    <ProtectRoute perfisPermitidos={["master","gestor","vendedor"]}>
    <div>
        <Kanban>
        </Kanban>
    </div>
    </ProtectRoute>
  )
}

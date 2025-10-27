import CalendarComponent from "../../components/layout/Calendar/Calendar"
import ProtectRoute from '../../components/ProtectRoute'


export default function page() {
  return (
    <ProtectRoute>
    <div style={{ paddingTop: "15px" }}>
      <h1 style={{
        fontSize: "50px",
        fontWeight: "600",
        color: "#1F4AF4",
        marginBottom: "25px",
        marginTop: "15px",
        fontFamily: "Arial, sans-serif",
        textAlign: "left",
      }}>Agendamento comercial</h1>
      <CalendarComponent></CalendarComponent>
    </div>
    </ProtectRoute>
  )
}
import ProtectRoute from "../components/ProtectRoute";

export default function Home() {
  return (
    <ProtectRoute>
    <div>
      <h1>Main Page</h1>
    </div>
    </ProtectRoute>
  );
}

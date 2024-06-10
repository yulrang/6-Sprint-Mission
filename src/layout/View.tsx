import { Outlet } from "react-router-dom";

export function View() {
  return (
    <div className="view">
      <Outlet/>
    </div>
  );
}
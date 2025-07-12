import { House, UserCircle, Gear, Airplane } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

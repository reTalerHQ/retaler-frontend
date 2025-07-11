import { House, UserCircle, Gear, Airplane } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  return (
    <>
      <Airplane size={32} />
      <Button />
      <Input />
      <House size={32} />
      <UserCircle size={32} />
      <Gear size={32} />
    </>
  );
}

export default App;

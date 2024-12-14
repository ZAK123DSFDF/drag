import Image from "next/image";
import DraggableCircle from "./components/DraggableCircle";

export default function Home() {
  return (
    <div className="relative h-screen">
      <DraggableCircle />
    </div>
  );
}

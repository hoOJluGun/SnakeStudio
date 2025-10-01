import { useState } from "react";
import ActivityBar from "../ActivityBar";

export default function ActivityBarExample() {
  const [activeView, setActiveView] = useState("editor");

  return <ActivityBar activeView={activeView} onViewChange={setActiveView} />;
}

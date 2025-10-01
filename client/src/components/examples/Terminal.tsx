import Terminal from "../Terminal";

export default function TerminalExample() {
  return (
    <div className="h-64">
      <Terminal 
        onCommand={(cmd) => console.log("Command:", cmd)} 
        onMinimize={() => console.log("Minimize terminal")}
      />
    </div>
  );
}

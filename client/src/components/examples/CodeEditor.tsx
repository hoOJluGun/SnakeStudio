import CodeEditor from "../CodeEditor";

export default function CodeEditorExample() {
  return (
    <div className="h-96">
      <CodeEditor onCodeChange={(code) => console.log("Code changed:", code.substring(0, 50))} />
    </div>
  );
}

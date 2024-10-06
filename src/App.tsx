import { Palettes } from "./Palettes";
import { Header } from "./Header";
import { WorkSpace } from "./WorkSpace";
import { Control } from "./Control";

function App() {
  return (
    <div className="size-full flex flex-col gap-2 pt-2">
      <Header />
      <div className="flex flex-row px-4">
        <div className="flex pr-4 flex-row flex-1 gap-4">
          <Control />
          <WorkSpace />
        </div>
        <Palettes />
      </div>
    </div>
  );
}

export default App;

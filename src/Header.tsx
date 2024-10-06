import { Card, CardHeader, CardTitle } from "./components/ui/card";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between w-full h-16 px-4 items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Non-Linear Color Gradient Generator</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

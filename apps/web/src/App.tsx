import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { debounce } from '@repo/utils';

function App() {
  const [count, setCount] = useState(0);

  const handleDebouncedClick = debounce(() => {
    setCount((prev) => prev + 1);
  }, 300);

  return (
    <div className="container">
      <Card className="max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Monorepo with pnpm</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground text-red-500 ">
            This example demonstrates a monorepo setup with shared UI components
            and utilities.
          </p>
          <div className="flex items-center gap-4">
            <Button onClick={handleDebouncedClick} variant="primary">
              Click me (debounced)
            </Button>
            <span className="text-lg">Count: {count}</span>
          </div>
          <div className="mt-6">
            <Button variant="outline" size="sm">
              Outline Button
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

import { useReducer } from "react";

function reducer(count: number, newValue: number) {
  return newValue;
}

export function ReducerExample() {
  const [count, setCount] = useReducer(reducer, 0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </div>
  );
}

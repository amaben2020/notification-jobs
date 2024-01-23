"use client";
import { ChangeEvent, FormEvent, useId, useState } from "react";
export default function Home() {
  const initialState = {
    id: 1,
    title: "Get the dog food",
    isComplete: false,
  };

  const [todos, setTodos] = useState([initialState]);
  const [title, setTitle] = useState("");
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const handleCheck = (id: number) => {
    setSelectedId((p) => (p! === undefined ? id : undefined));
  };
  const id = useId();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos((p) => [
      ...p,
      { id: Math.random() * 2, title: title, isComplete: false },
    ]);
  };
  return (
    <main className="flex flex-col border justify-between p-3">
      <div className="p-4">
        <h2> TODOS: {selectedId}</h2>

        <div className="flex gap-10">
          <div className="p-2 border flex-3">
            {todos.map((todo) => (
              <div key={todo.id} className="flex gap-4 py-3">
                <input
                  type="checkbox"
                  className="p-2"
                  onChange={() => handleCheck(todo.id)}
                  checked={selectedId === todo.id ? true : false}
                />{" "}
                <p
                  className={`${selectedId === todo.id ? "line-through" : ""}`}
                >
                  {todo.title}
                </p>
              </div>
            ))}
          </div>

          <div className="p-2 border">
            <h2> Create: </h2>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={handleChange}
                className="p-2 border rounded-lg mt-3 text-black"
              />

              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

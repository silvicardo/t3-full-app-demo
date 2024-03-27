"use client";

import { api } from "~/trpc/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateTodo() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ title: inputRef.current?.value ?? "" });
      }}
    >
      <input ref={inputRef} type="text" name="title" placeholder="Title" />
      <button type="submit" disabled={isPending}>
        Create
      </button>
    </form>
  );
}

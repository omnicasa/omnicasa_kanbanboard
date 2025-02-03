"use client";

import { Button } from "@/components/ui/button";
import { DndContext } from "@dnd-kit/core";
import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";
import { useFetchData } from "../hooks/useFetchData";

export default function Home() {
  const containers = ["A", "B", "C"];
  const parent = useStore((state) => state.parent);
  const setParent = useStore((state) => state.setParent);
  const [hydrated, setHydrated] = useState(false);
  const { data, error, isLoading } = useFetchData();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const draggableMarkup = (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <Draggable id="draggable">Drag me</Draggable>
    </motion.div>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }

  if (!hydrated) {
    return null; // or a loading spinner
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading data</div>;
  // }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button>Click me</Button>
        </motion.div>
        <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : null}

          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : "Drop here"}
            </Droppable>
          ))}
        </DndContext>
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
}

import { Tool } from "@/type";
import { useEffect, useState } from "react";

export const useTools = (): {
  tools: Tool[];
} => {
  const [tools, setTools] = useState<Tool[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.aicenter.tw/tool");
      const tools = await res.json();
      console.debug({ tools });
      setTools(tools);
    })();
  }, []);

  return {
    tools,
  };
};

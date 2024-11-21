import { Tool } from "@/type";
import { useEffect, useState } from "react";

interface UseToolsProps {
  filteredCategoryId: string;
}

export const useTools = (
  props: UseToolsProps
): {
  tools: Tool[];
} => {
  const { filteredCategoryId } = props;
  const [tools, setTools] = useState<Tool[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.aicenter.tw/tool");
      const tools = await res.json();
      console.debug({ tools });
      if (filteredCategoryId) {
        setTools(
          tools.filter((tool: Tool) =>
            tool.categoryIds.includes(filteredCategoryId)
          )
        );
      } else {
        setTools(tools);
      }
    })();
  }, [filteredCategoryId]);

  console.debug("useTools", { tools });
  return {
    tools,
  };
};

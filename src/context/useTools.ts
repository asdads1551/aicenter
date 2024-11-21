import { ApiStatus } from "@/enum";
import { Tool } from "@/type";
import { useEffect, useState } from "react";

interface UseToolsProps {
  filteredCategoryId?: string;
}

export const useTools = (
  props: UseToolsProps
): {
  state: ApiStatus;
  tools: Tool[];
} => {
  const { filteredCategoryId } = props;
  const [state, setState] = useState<ApiStatus>(ApiStatus.loading);
  const [tools, setTools] = useState<Tool[]>([]);
  useEffect(() => {
    (async () => {
      setState(ApiStatus.loading);
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
      setState(ApiStatus.done);
    })();
  }, [filteredCategoryId]);

  console.debug("useTools", { tools });
  return {
    state,
    tools,
  };
};

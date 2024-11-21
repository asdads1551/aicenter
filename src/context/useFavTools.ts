import { Tool, ToolFav } from "@/type";
import { useEffect, useState } from "react";
import { useTools } from "./useTools";
import { ApiStatus, FavoritesSort } from "@/enum";

interface UseFavToolsProps {
  filteredCategoryId?: string;
  sort: FavoritesSort;
}
const FAKE_USER_ID = "673e0d25574ab4d42a37c1c0";
export const useFavTools = (
  props: UseFavToolsProps
): {
  state: ApiStatus,
  tools: Tool[];
} => {
  const { tools } = useTools(props);
  const [state, setState] = useState<ApiStatus>(ApiStatus.loading);
  const [favTools, setFavTools] = useState<Tool[]>([]);

  useEffect(() => {
    (async () => {
      setState(ApiStatus.loading);
      const res = await fetch(
        `https://api.aicenter.tw/user/${FAKE_USER_ID}/tool-fav`
      );
      const favToolRecords: ToolFav[] = await res.json();
      console.debug({ favToolRecords });
      if (tools.length > 0 && favToolRecords.length > 0) {
        const toolMap = new Map<string, Tool>();
        tools.forEach((tool: Tool) => {
          toolMap.set(tool._id, tool);
        });
        if (props.sort === FavoritesSort.savedDateDesc) {
          setFavTools(
            favToolRecords
              .sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
              .map((r) => toolMap.get(r.toolId))
              .filter((r) => r !== undefined)
          );
        } else {
          setFavTools(
            favToolRecords
              .sort((a, b) => {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              })
              .map((r) => toolMap.get(r.toolId))
              .filter((r) => r !== undefined)
          );
        }
      } else {
        setFavTools([]);
      }
      setState(ApiStatus.done);
    })();
  }, [tools, props.sort, props.filteredCategoryId]);

  console.debug("useFavTools", { favTools });
  return {
    state,
    tools: favTools,
  };
};

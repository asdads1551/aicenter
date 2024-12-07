import { Tool, ToolSave } from "@/type";
import { useEffect, useState } from "react";
import { useTools } from "./useTools";
import { ApiStatus, SavesSort } from "@/enum";
import { API_HOST } from "@/constant";
import { useAuth } from "./useAuth";

interface UseSavedToolsProps {
  filteredCategoryId?: string;
  sort: SavesSort;
}
const FAKE_USER_ID = "673e0d25574ab4d42a37c1c0";
export const useSavedTools = (
  props: UseSavedToolsProps
): {
  state: ApiStatus;
  tools: Tool[];
} => {
  const { tools } = useTools(props);
  const { token, user, showLoginPopup } = useAuth();
  const [state, setState] = useState<ApiStatus>(ApiStatus.loading);
  const [savedTools, setSavedTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchSavedTools = async () => {
      if (user) {
        setState(ApiStatus.loading);
        const res = await fetch(`${API_HOST}/user/${user._id}/tool-save`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const savedToolRecords: ToolSave[] = await res.json();
        console.debug({ savedToolRecords });
        if (tools.length > 0 && savedToolRecords.length > 0) {
          const toolMap = new Map<string, Tool>();
          tools.forEach((tool: Tool) => {
            toolMap.set(tool._id, tool);
          });
          if (props.sort === SavesSort.savedDateDesc) {
            setSavedTools(
              savedToolRecords
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
            setSavedTools(
              savedToolRecords
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
          setSavedTools([]);
        }
        setState(ApiStatus.done);
      }
    };
    fetchSavedTools();
  }, [tools, user, props.sort, props.filteredCategoryId]);

  console.debug("useSavedTools", { savedTools });
  return {
    state,
    tools: savedTools,
  };
};

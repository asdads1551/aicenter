import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { API_HOST } from '@/constant';
import { ApiStatus } from '@/enum';

interface UserActions {
  savedTools: string[];
  likedTools: string[];
}

export const useUserActions = () => {
  const { user, token } = useAuth();
  const [state, setState] = useState<ApiStatus>(ApiStatus.loading);
  const [userActions, setUserActions] = useState<UserActions>({
    savedTools: [],
    likedTools: [],
  });

  // 獲取使用者的收藏和喜歡狀態
  const fetchUserActions = async () => {
    if (!user || !token) {
      setState(ApiStatus.done);
      return;
    }

    setState(ApiStatus.loading);
    try {
      // 獲取收藏工具
      const savedRes = await fetch(`${API_HOST}/user/${user._id}/tool-save`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const savedData = await savedRes.json();
      
      // 獲取喜歡工具
      const likedRes = await fetch(`${API_HOST}/user/${user._id}/tool-like`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const likedData = await likedRes.json();

      setUserActions({
        savedTools: savedData.map((item: any) => item.toolId),
        likedTools: likedData.map((item: any) => item.toolId),
      });
      setState(ApiStatus.done);
    } catch (error) {
      console.error('Error fetching user actions:', error);
      setState(ApiStatus.error);
    }
  };

  // 收藏/取消收藏工具
  const toggleSaveTool = async (toolId: string) => {
    if (!user || !token) return;

    try {
      const response = await fetch(`${API_HOST}/tool/${toolId}/save`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        await fetchUserActions(); // 重新獲取最新狀態
      }
    } catch (error) {
      console.error('Error toggling save tool:', error);
    }
  };

  // 喜歡/取消喜歡工具
  const toggleLikeTool = async (toolId: string) => {
    if (!user || !token) return;

    try {
      const response = await fetch(`${API_HOST}/tool/${toolId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        await fetchUserActions(); // 重新獲取最新狀態
      }
    } catch (error) {
      console.error('Error toggling like tool:', error);
    }
  };

  // 檢查工具是否已收藏
  const isToolSaved = (toolId: string): boolean => {
    return userActions.savedTools.includes(toolId);
  };

  // 檢查工具是否已喜歡
  const isToolLiked = (toolId: string): boolean => {
    return userActions.likedTools.includes(toolId);
  };

  useEffect(() => {
    void fetchUserActions();
  }, [user, token]);

  return {
    state,
    isToolSaved,
    isToolLiked,
    toggleSaveTool,
    toggleLikeTool,
    refreshUserActions: fetchUserActions
  };
};
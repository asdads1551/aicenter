import { usePathname, useRouter } from "next/navigation";
import { MenuProps } from "rc-menu";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

export enum MyPageTab {
  Profile = "profile",
  Comments = "comments",
}

export const useMyPageMenu = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (e: { key: string }) => {
    router.push("/my/" + e.key);
  };

  const menuItems: MenuItem[] = [
    {
      key: MyPageTab.Profile,
      label: "我的帳號",
    },
    {
      key: MyPageTab.Comments,
      label: "留言紀錄",
    },
  ];

  useEffect(() => {
    if (pathname) {
      const webPathAfterMyPrefix = pathname.replace("/my/", "");
      if (
        webPathAfterMyPrefix === MyPageTab.Profile ||
        webPathAfterMyPrefix === MyPageTab.Comments
      ) {
        setActiveTab(webPathAfterMyPrefix);
      }
    }
  }, [pathname]);

  return {
    activeTab,
    handleMenuClick,
    menuItems,
  };
};

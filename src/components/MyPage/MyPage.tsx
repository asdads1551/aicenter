'use client';
import { Category } from "@/type";
import { type MenuProps } from 'antd';
import Menu from 'antd/es/menu';
import { ProfileSection } from "./ProfileSection";
import { CommentsSection } from "./CommentsSection";
import { useMyPageMenu } from "@/context/useMyPageMenu";

export type CategoryPageProps = {
    categories: Category[]
}

type MenuItem = Required<MenuProps>['items'][number];

enum MyPageTab {
    Profile = "profile",
    Comments = "comments"
}
const MyPage = () => {
    const {
        menuItems,
        activeTab,
        handleMenuClick
    } = useMyPageMenu();

    if (!activeTab) {
        return;
    }

    return (
        <div className="flex flex-col sm:flex-row sm:mt-[24px] lg:mt-[28px] mb-[40px] sm:mb-[100px]">
            <div className="hidden lg:flex min-w-[190px] mr-[32px]">
                <Menu
                    onClick={handleMenuClick}
                    selectedKeys={[activeTab]}
                    mode="inline"
                    items={menuItems}
                    className="bg-[#FAFBFD]"
                />
            </div>
            <div className="mt-[24px] sm:mt-[0px] flex-1 min-h-[calc(100vh-320px)]">
                {
                    activeTab === MyPageTab.Profile && (
                        <ProfileSection />
                    )
                }
                {
                    activeTab === MyPageTab.Comments && (
                        <CommentsSection />
                    )
                }
                <div className="flex justify-between">
                </div>
            </div>
        </div>
    );
}

export default MyPage;
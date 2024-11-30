'use client';
import { useCategories } from "@/context/useCategories";
import { useTools } from "@/context/useTools";
import { Category } from "@/type";
import { Button, Dropdown, type MenuProps } from 'antd';
import Menu from 'antd/es/menu';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import CardWithDisplay from "../CardWithDisplay";
import { DownOutlined } from '@ant-design/icons';

export type CategoryPageProps = {
    categories: Category[]
}

type MenuItem = Required<MenuProps>['items'][number];

const CategoryPage = (props: {
    params: Promise<{ slug: string }>
}) => {
    const [activeCategoryId, setActiveCategoryId] = useState<string>('');
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const router = useRouter()
    const {
        categoryMap,
        categoryTree
    } = useCategories();
    const { tools } = useTools({
        filteredCategoryId: activeCategoryId,
    })

    const handleMenuClick = (e: { key: string }) => {
        router.push("/categories/" + e.key)
    }
    const handleMenuOpen = (openKeys: string[]) => {
        setOpenKeys(() => openKeys)
    }

    const items: MenuItem[] = categoryTree.map(tree => ({
        key: tree._id,
        label: tree.name,
        children: tree.subCategories && tree.subCategories.length > 0 ? tree.subCategories.map(subTree => ({
            key: subTree._id,
            label: subTree.name,
        })) : null,
    }))
    const dropDownItems: MenuProps['items'] = categoryTree.map(tree => ({
        key: tree._id,
        label: (
            <a className={`pl-[16px] leading-[30px] text-[14px] w-full ${activeCategoryId === tree._id ? 'bg-[#EEF4FE]' : ''}`} href={`/categories/${tree._id}`}>
                {tree.name}
            </a>
        ),
    }))

    useEffect(() => {
        if (props.params) {
            (async () => {
                const params = await props.params;
                setActiveCategoryId(params.slug)
            })();
        }
    }, [props.params])

    useEffect(() => {
        if (activeCategoryId) {
            const category = activeCategoryId ? categoryMap.get(activeCategoryId) : null;
            if (category?.parentCategoryId) {
                setOpenKeys(() => [...openKeys, category?.parentCategoryId])
            }
        }
    }, [activeCategoryId, categoryMap.get(activeCategoryId)])


    const category = activeCategoryId ? categoryMap.get(activeCategoryId) : null;
    return (
        <div className="flex flex-col sm:flex-row mt-[14px] sm:mt-[24px] lg:mt-[40px] mb-[40px] sm:mb-[100px]">
            <div className="flex sm:hidden w-100">
                <Dropdown menu={{ items: dropDownItems }} placement="bottom">
                    <Button type="primary" className="w-full justify-start h-[38px]">
                        <span className="text-[14px] text-500 mr-auto">{"分類" + (category ? '：' + category?.name : '')}</span>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="hidden lg:flex min-w-[190px] mr-[32px]">
                <Menu
                    onClick={handleMenuClick}
                    onOpenChange={handleMenuOpen}
                    selectedKeys={activeCategoryId ? [activeCategoryId] : []}
                    openKeys={openKeys}
                    mode="inline"
                    items={items}
                    className="bg-[#FAFBFD]"
                />
            </div>
            <div className="mt-[24px] sm:mt-[0px] flex-1 min-h-[calc(100vh-320px)]">
                <div className="flex justify-between">
                    <h1 className="text-[20px] sm:text-[24px] font-bold sm:font-medium mb-[14px] sm:mb-[24px]">
                        {category?.name || '全部'}
                    </h1>
                    <div className="hidden sm:flex lg:hidden w-100">
                        <Dropdown menu={{ items: dropDownItems }} placement="bottom">
                            <Button className="min-w-[280px] justify-start h-[38px]">
                                <span className="text-[14px] text-500 mr-auto">{"分類" + (category ? '：' + category?.name : '')}</span>
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="w-full grid sm:grid-cols-3 lg:grid-cols-4 gap-[14px] sm:gap-[32px] lg:gap-[20px]">
                    {tools.map((tool) => (
                        <CardWithDisplay
                            key={tool._id}
                            _id={tool._id}
                            title={tool.title}
                            description={tool.overview}
                            tags={tool.tags}
                            imageUrl={tool.imageUrl}
                            saveCount={tool.favCount}
                            commentCount={tool.commentCount}
                            onLoginRequired={() => {/* 處理登入要求 */ }}
                            isLoggedIn={false} // 根據實際登入狀態設置
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
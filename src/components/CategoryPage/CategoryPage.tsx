'use client';
import { useCategories } from "@/context/useCategories";
import { Category } from "@/type";
import { Button, Dropdown, type MenuProps } from 'antd';
import Menu from 'antd/es/menu';
import card from "antd/es/card";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import CardWithDisplay from "../CardWithDisplay";

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

    const handleMenuClick = (e: { key: string }) => {
        router.push("/categories/" + e.key)
    }
    const handleMenuOpen = (openKeys: string[]) => {
        setOpenKeys(() => openKeys)
    }

    function handleLoginRequired(): void {
        throw new Error("Function not implemented.");
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
            <a className={`pl-[16px] leading-[30px] text-[14px] w-full ${activeCategoryId === tree._id? 'bg-[#EEF4FE]': ''}`} href={`/categories/${tree._id}`}>
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
        <div className="flex flex-col sm:flex-row mt-[14px] sm:mt-[40px] mb-[40px] sm:mb-[100px]">
            <div className="flex sm:hidden w-100">
                <Dropdown menu={{ items: dropDownItems }} placement="bottom">
                    <Button type="primary" className="w-full justify-start h-[38px]">
                        <span className="text-[14px] text-500">{"分類" + (category ? '：' + category?.name : '')}</span>
                    </Button>
                </Dropdown>
            </div>
            <div className="hidden sm:flex min-w-[190px] mr-[32px]">
                <Menu
                    onClick={handleMenuClick}
                    onOpenChange={handleMenuOpen}
                    selectedKeys={activeCategoryId ? [activeCategoryId] : []}
                    openKeys={openKeys}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className="mt-[24px] sm:mt-[0px] flex-1 min-h-[calc(100vh-320px)]">
                <h1 className="text-[20px] sm:text-[24px] font-bold sm:font-medium mb-[14px] sm:mb-[24px]">
                    {category?.name || '全部'}
                </h1>
                <CardWithDisplay
                    // TODO: pass the category id to filter
                    _id={""} title={""} description={""} imageUrl={""} saveCount={0} {...card}
                    commentCount={0}
                    isLoggedIn={false}
                    onLoginRequired={handleLoginRequired}
                />
            </div>
        </div>
    );
}

export default CategoryPage;
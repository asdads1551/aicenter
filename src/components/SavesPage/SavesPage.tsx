'use client';
import { useCategories } from "@/context/useCategories";
import { useSavedTools } from "@/context/useSavedTools";
import { Button, Dropdown, type MenuProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation'
import CardWithDisplay from "../CardWithDisplay";
import { DownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { ApiStatus, SavesSort } from "@/enum";

const SORT_TO_NAME: Record<SavesSort, string> = {
    [SavesSort.savedDateAsc]: "舊到新",
    [SavesSort.savedDateDesc]: "新到舊",
}
const SavesPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const {
        categoryMap,
        categoryTree
    } = useCategories();

    const sort = (searchParams.get('sort') || SavesSort.savedDateDesc) as SavesSort;
    const { state, tools } = useSavedTools({
        sort,
        filteredCategoryId: searchParams.get('categoryId') || '',
    })

    const handleMenuSelect = (field: string, id: string) => {
        if (!id) {
            const params = new URLSearchParams(searchParams.toString())
            params.delete(field);
            router.push(`/saves?${params.toString()}`)
        } else {
            const params = new URLSearchParams(searchParams.toString())
            params.set(field, id)
            router.push(`/saves?${params.toString()}`)
        }
    }

    const sortingDropDownItems: MenuProps['items'] = [
        {
            key: SavesSort.savedDateDesc,
            label: (
                <p className={`pl-[16px] leading-[30px] text-[14px] w-full ${sort === SavesSort.savedDateDesc ? 'bg-[#EEF4FE]' : ''}`} onClick={() => handleMenuSelect('sort', SavesSort.savedDateDesc)}>
                    {SORT_TO_NAME[SavesSort.savedDateDesc]}
                </p>
            ),
        },
        {
            key: SavesSort.savedDateAsc,
            label: (
                <p className={`pl-[16px] leading-[30px] text-[14px] w-full ${sort === SavesSort.savedDateAsc ? 'bg-[#EEF4FE]' : ''}`} onClick={() => handleMenuSelect('sort', SavesSort.savedDateAsc)}>
                    {SORT_TO_NAME[SavesSort.savedDateAsc]}
                </p>
            ),
        },
    ];

    const dropDownItems: MenuProps['items'] = [
        {
            _id: '',
            name: '全部'
        },
        ...categoryTree
    ].map(tree => ({
        key: tree._id,
        label: (
            <p className={`pl-[16px] leading-[30px] text-[14px] w-full ${searchParams.get('categoryId') === tree._id ? 'bg-[#EEF4FE]' : ''}`} onClick={() => handleMenuSelect('categoryId', tree._id)}>
                {tree.name}
            </p>
        ),
    }))


    const category = searchParams.get('categoryId') ? categoryMap.get(searchParams.get('categoryId') || '') : null;

    if (state === ApiStatus.loading) {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row mt-[14px] sm:mt-[24px]  mb-[40px] sm:mb-[100px]">
            <div className="mt-[24px] sm:mt-[0px] flex-1 min-h-[calc(100vh-320px)]">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-[20px] sm:text-[24px] font-bold sm:font-medium mb-[14px] sm:mb-[24px]">我的收藏</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row w-100 mb-[24px]">
                        <div className="mb-[8px] sm:mb-0">
                            <Dropdown menu={{ items: sortingDropDownItems }} placement="bottom">
                                <Button className="w-full sm:w-auto sm:min-w-[240px] justify-start h-[38px]">
                                    <span className="text-[14px] text-500 mr-auto">{"排序：" + SORT_TO_NAME[sort]}</span>
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="mb-[8px] sm:mb-0 sm:ml-[14px]">
                            <Dropdown menu={{ items: dropDownItems }} placement="bottom">
                                <Button className="w-full sm:w-auto sm:min-w-[240px] justify-start h-[38px]">
                                    <span className="text-[14px] text-500 mr-auto">{"分類：" + (category ? category?.name : '全部')}</span>
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="sm:ml-[14px]">
                            <Button color="default" variant="filled" size="large" onClick={() => { router.push('/saves') }}>恢復預設</Button>
                        </div>
                    </div>
                    <div className={searchParams.get('categoryId') ? 'block' : 'hidden'}>
                        <h2 className="text-[14px] sm:text-[16px] font-medium mb-[14px]">{`符合 ${category?.name} 的結果`}</h2>
                    </div>
                </div>
                {
                    tools.length > 0 ? (
                        <div className="w-full grid sm:grid-cols-3 lg:grid-cols-5 gap-[14px] sm:gap-[24px] sm:gap-y-[32px]">
                            {tools.map((tool) => (
                                <CardWithDisplay
                                    key={tool._id}
                                    _id={tool._id}
                                    title={tool.title}
                                    description={tool.overview}
                                    isSaved={false}
                                    onSave={() => Promise.resolve()}
                                    isLiked={false} 
                                    onLike={() => Promise.resolve()}
                                    tags={tool.tags}
                                    imageUrl={tool.imageUrl}
                                    saveCount={tool.saveCount}
                                    commentCount={tool.commentCount}
                                    onLoginRequired={() => {/* 處理登入要求 */ }}
                                    isLoggedIn={false} // 根據實際登入狀態設置
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full py-[50px]">
                            <Image src="/no-data.png" alt="No Data" width={360} height={360} />
                            <p className="mt-[24px] text-[14px] lg:text-[16px]">
                                {category ? `沒有符合 ${category?.name} 的結果，請試試其他篩選條件` : "尚無收藏的工具"}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SavesPage;
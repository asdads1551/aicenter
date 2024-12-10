'use client';
import { useCategories } from "@/context/useCategories";
import { useTools } from "@/context/useTools";
import { Button, Dropdown, type MenuProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation'
import CardWithDisplay from "../CardWithDisplay";
import { DownOutlined } from '@ant-design/icons';
import Image from 'next/image';

const FilterPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const {
        categoryMap,
        categoryTree
    } = useCategories();
    const { tools } = useTools({
        filteredCategoryId: searchParams.get('categoryId') || '',
    })

    const handleMenuSelect = (categoryId: string) => {
        router.push('/filter?categoryId=' + categoryId)
    }

    const dropDownItems: MenuProps['items'] = [
        {
            _id: '',
            name: '全部'
        },
        ...categoryTree
    ].map(tree => ({
        key: tree._id,
        label: (
            <p className={`pl-[16px] leading-[30px] text-[14px] w-full ${searchParams.get('categoryId') === tree._id ? 'bg-[#EEF4FE]' : ''}`} onClick={() => handleMenuSelect(tree._id)}>
                {tree.name}
            </p>
        ),
    }))


    const category = searchParams.get('categoryId') ? categoryMap.get(searchParams.get('categoryId') || '') : null;
    return (
        <div className="flex flex-col sm:flex-row mt-[14px] sm:mt-[24px]  mb-[40px] sm:mb-[100px]">
            <div className="mt-[24px] sm:mt-[0px] flex-1 min-h-[calc(100vh-320px)]">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-[20px] sm:text-[24px] font-bold sm:font-medium mb-[14px] sm:mb-[24px]">篩選條件</h1>
                    </div>
                    <div className="flex w-100 mb-[24px]">
                        <Dropdown menu={{ items: dropDownItems }} placement="bottom">
                            <Button className="min-w-[240px] justify-start h-[38px]">
                                <span className="text-[14px] text-500 mr-auto">{"分類名稱：" + (category ? category?.name : '全部')}</span>
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                        <div className="ml-[14px]">
                            <Button color="default" variant="filled" size="large" onClick={() => { router.push('/filter') }}>清除</Button>
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
                                {`沒有符合 ${category?.name} 的結果，請試試其他篩選條件`}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default FilterPage;
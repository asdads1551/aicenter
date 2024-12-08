'use client';
import { API_HOST } from "@/constant";
import { useAuth } from "@/context/useAuth";
import { ApiStatus } from "@/enum";
import { Avatar, Button, Input, message } from "antd";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export const ProfileSection = () => {
    const {
        state,
        user,
        token,
        refreshUserInfo,
        logout
    } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newNickname, setNewNickname] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    if (state === ApiStatus.loading) {
        return null;
    }

    if (state === ApiStatus.error || !user) {
        return 'Error';
    }

    const openEditor = () => {
        setNewNickname(user.nickname);
        setIsEditing(true);
    }

    const handleSave = async () => {
        const res = await fetch(`${API_HOST}/user/me`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nickname: newNickname }),
            method: 'PATCH'
        });
        const result = await res.json();
        if (result?.isSuccess) {
            messageApi.open({
                type: 'success',
                content: '顯示名稱修改成功',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: '顯示名稱修改失敗',
            });
        }
        setIsEditing(false);
        setTimeout(() => {
            refreshUserInfo();
        }, 2000)
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="flex flex-col justify-between items-center">
            {contextHolder}
            <Avatar className="w-[64px] h-[64px]" src={user.avatarUrl} />
            <h2 className="text-[20px] lg:text-[24px] text-ellipsis line-clamp-1">{user.nickname}</h2>
            <p className="lg:text-[14px]">{user.email}</p>
            <div className="w-full max-w-[845px] flex flex-col justify-between items-center mt-[36px] bg-white px-[24px] py-[14px] rounded-[10px]">
                <div className={`flex ${isEditing ? "flex-col" : ""} sm:flex-row justify-between items-center w-full`}>
                    <label className="w-full max-w-[360px]">
                        <p className="text-[16px] font-medium">顯示名稱</p>
                        <div className="mt-[6px] w-full text-ellipsis line-clamp-1 flex flex-col">
                            {
                                isEditing ?
                                    <Input type="text" defaultValue={user.nickname} className="bg-[#FAFBFD] w-full" onChange={(e) => setNewNickname(e.target.value)} /> :
                                    <p className="text-[14px] mt-[10px]">{user.nickname}</p>
                            }
                        </div>

                    </label>
                    <div className={` ${isEditing ? "mt-[14px] w-full" : ""} sm:w-auto sm:mt:[0px]`}>
                        {
                            isEditing ? <Button type="primary" variant="filled" className={`${isEditing ? "w-full" : ""} w-auto sm:mt:[0px]`} onClick={handleSave}>儲存</Button> :
                                <Button onClick={openEditor}>修改</Button>
                        }
                    </div>
                </div>
            </div>
            {token && (
                <Button 
                    type="primary"
                    className="mt-4 w-full max-w-[845px]"
                    onClick={handleLogout}
                >
                    登出
                </Button>
            )}
        </div >
    );
}
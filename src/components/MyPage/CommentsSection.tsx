'use client';
import { useAuth } from "@/context/useAuth";
import { ApiStatus } from "@/enum";

export const CommentsSection = () => {
    const {
        state,
    } = useAuth();

    if (state === ApiStatus.loading) {
        return null;
    }

    if (state === ApiStatus.error) {
        return 'Error';
    }

    return (
        <div>WIP</div>
    );
}
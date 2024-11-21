'use client';

import FavoritesPage from "@/components/FavoritesPage/FavoritesPage";
import { Suspense } from "react";

export default function Page() {
    return <Suspense>
        <FavoritesPage />
    </Suspense>
};
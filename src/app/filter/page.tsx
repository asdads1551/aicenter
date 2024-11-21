'use client';

import FilterPage from "@/components/FilterPage/FilterPage";
import { Suspense } from "react";

export default function Page() {
    return <Suspense>
        <FilterPage />
    </Suspense>
};
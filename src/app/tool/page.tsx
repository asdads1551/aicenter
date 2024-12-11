'use client';

import ToolPage from "@/components/ToolPage/ToolPage";
import { Suspense } from "react";

export default function Page() {
    return <Suspense>
        <ToolPage />
    </Suspense>
};
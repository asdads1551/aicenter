'use client';

import SavesPage from "@/components/SavesPage/SavesPage";
import { Suspense } from "react";

export default function Page() {
    return <Suspense>
        <SavesPage />
    </Suspense>
};
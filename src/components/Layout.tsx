'use client';
import { AuthContext, useAuthState } from "@/context/useAuth";
import Footer from "./Footer"
import Navbar from "./Navbar"

export const Layout = (props: { children: React.ReactNode }) => {
    const authState = useAuthState();
    return <>
        <AuthContext.Provider value={authState}>
            <Navbar />
            <main className="px-[14px] sm:px-[24px] lg:px-0 max-w-7xl w-[100%] mx-auto" style={{ flexGrow: 1 }}>
                {props.children}
            </main>
            <Footer />
        </AuthContext.Provider>
    </>
}
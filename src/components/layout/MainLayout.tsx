
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeToggler } from "./LayoutComponents/ThemeToggler"
import BreadcrumbNav from "./LayoutComponents/BreadcrumbNav"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../Custom/AppSidebar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

type MainLayoutProps = {
    children: React.ReactNode;
};
export function MainLayout({children}:MainLayoutProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "e" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if(e.shiftKey) navigate('/enquiry/new');
                else navigate('/enquiry/list?page=1&per_page=10');
            }
            if(e.key==='s' && (e.metaKey || e.ctrlKey)){
                e.preventDefault()
                if(e.shiftKey) navigate('/students/admission');
                else navigate('/students/list?page=1&per_page=10');
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar  variant="floating" />
                <SidebarInset>
                    <div className="flex min-h-screen w-full max-w-screen-2xl mx-auto flex-col">
                        <div className="flex flex-col  sm:gap-4 sm:py-4">
                            <header className="sticky top-0 left-0 right-0 z-30 flex h-14 items-center justify-between bg-background px-4 gap-4 border-b  sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                                <div className="flex gap-4">
                                    <SidebarTrigger />
                                    <BreadcrumbNav />
                                </div>
                                <ThemeToggler />
                            </header>
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}


import illustration from '@/assets/illustrations/programming-animate.svg'
import background from '@/assets/illustrations/Social media-rafiki.svg'
import { useEffect } from 'react'


const SuperAdminDashboard = () => {
    useEffect(()=>{
        document.title = 'Super Admin Dashboard | SKICST';
    },[]);
    return (
        <div className='container'>
            {/* Background Image - visible only on md+ but layered behind illustration on small screens */}
            <img src={background} alt="" className=" opacity-25 dark:opacity-5
                fixed z-0 md:z-0  block md:hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            " />
            
            <div className="fixed hidden md:block -right-80 -top-96 lg:-right-[500px] -rotate-[146deg] w-full h-full -z-0 dark:opacity-25">
                <img src={background} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Illustration - should appear above background on mobile */}
            <div className="fixed z-10 right-0 md:top-0 md:right-0 opacity-25 md:opacity-100 
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                md:transform-none md:left-auto">
                <img src={illustration} alt="" className="w-96" />
            </div>
            <div className="relative z-10">
                <h1 className='text-3xl font-bold'>Super Admin Dashboard</h1>
            </div>
        </div>
    )
}

export default SuperAdminDashboard
import { Outlet } from "react-router-dom";
import NavigationSidebar from "../components/NavigationSidebar";
import RightSidebar from "../components/RightSidebar";

function LayoutDefault() {
    return (
        <>
           <div className="grid grid-cols-3 gap-x-6 grid-cols-[1fr,3fr,1fr]">
            <NavigationSidebar />
            <div>
                <Outlet />
            </div>
            <div>
                <RightSidebar />
            </div>
           </div>
        </>
    )
};

export default LayoutDefault;
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut as logout, selectAccount } from '../app/AuthSlice';
import {
    Globe,
    Library,
    UserRoundPlus,
    UserPen
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const acc = useSelector(selectAccount);
    const location = useLocation();

    const routes = [
        {
            name: "Profile",
            path: "/dashboard/welcome",
            allowedFor: [1],
            icon: UserPen
        },
        {
            name: "Records",
            path: "/dashboard/records",
            allowedFor: [1],
            icon: Library
        },
        {
            name: "Add Employee",
            path: "/dashboard/add",
            allowedFor: [1],
            icon: UserRoundPlus
        },

    ];

    // Filter routes based on userType
    const filteredRoutes = routes.filter(route =>
        route.allowedFor.includes(acc.role_id)
    );

    return (
        <div className="h-screen w-[18%] bg-gradient-to-b from-gray-50 to-white flex flex-col shadow-sm border-gray-200">
            {/* Fancy Title Section */}
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <Globe className="w-6 h-6 animate-pulse" />
                    <div className="flex flex-col">
                        <h2 className="font-bold text-2xl text-grey-500 tracking-wide">
                            Emp
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
                                Manage
                            </span>
                        </h2>
                        <div className="h-0.5 w-full bg-gradient-to-r from-white/50 to-transparent mt-1" />
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="p-4 text-gray-600">
                <nav className="space-y-1">
                    {filteredRoutes.map((route, index) => {
                        const isActive = location.pathname === route.path;

                        return (
                            <button
                                key={index}
                                onClick={() => navigate(route.path)}
                                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors cursor-pointer
                  ${isActive
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <route.icon className="w-5 h-5" />
                                    <span className="text-m">{route.name}</span>
                                </div>
                            </button>
                        );

                    })}

                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
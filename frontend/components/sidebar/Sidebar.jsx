import SearchInput from "./SearchInputs.jsx"
import Conversations from "./Conversations.jsx"
import Logout from "./Logout.jsx"

const Sidebar = () =>{
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <SearchInput/>
            <div className="divider px-3"></div>
            <Conversations/>
            <Logout/>
        </div>
    )
}
const Login = () => {
    return <div className="flex flex-col items-center justify-center min-w-96 mx-auto">

        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bh-opacity-0">
        <h1 className="text-3x1 front-semibold text-center text-gray-300">
            <span className="test-blue-500" >ChatApp</span>
        </h1>
        <form>
            <div>
                <label className="label p-2">
                <span className="test-blue-500" >Username</span>
                </label>
                <input type='text' placeholder="Enter username" className="w-full input input-bordered h-10">
                </input>
            </div>
            <div>
                <label className="label p-2">
                <span className="test-blue-500" >Password</span>
                </label>
                <input type='text' placeholder="Enter password" className="w-full input input-bordered h-10">
                </input>
            </div>
            <a href='#' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                Don't have an account?
            </a>
            <div>
                <button className="btn btn-block btn-sm mt-2 ">Login</button>
            </div>
        </form>
        </div>

    </div>
};

export default Login;
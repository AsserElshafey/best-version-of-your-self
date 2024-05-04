

const Login = () => {
  return (
    <div className="md:w-1/2 max-w-sm border border-solid p-10 rounded-xl shadow-xl">
      <div className="text-center md:text-left mb-10">
        <label className="mr-1 font-bold text-xl font text-green-600">Login Now !</label>
      </div>
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        type="text"
        placeholder="Email Address"
      />
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
        type="password"
        placeholder="Password"
      />
      <div className="mt-4 flex justify-between font-semibold text-sm">
        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
          <input className="mr-1" type="checkbox" />
          <span>Remember Me</span>
        </label>
        <a
          className="text-green-600 hover:text-green-700 hover:underline hover:underline-offset-4"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center md:text-left">
        <button
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
        >
          Login
        </button>
      </div>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don&apos;t have an account?{" "}
        <a
          className="text-red-600 hover:underline hover:underline-offset-4"
          href="#"
        >
          Register
        </a>
      </div>
    </div>
  )
}

export default Login
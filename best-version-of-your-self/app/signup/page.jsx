

const SignUpPage = () => {
  return (
    <div className="flex justify-center">
      <div className="md:w-1/2 max-w-sm border border-solid p-10 rounded-xl shadow-xl bg-zinc-200">
        <div className="text-center md:text-left mb-10">
          <label className="mr-1 font-bold text-xl font">Sign Up</label>
        </div>
        <div className="flex mb-4">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 mr-1"
            type="text"
            placeholder="First name"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-1"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
          type="text"
          placeholder="Email address"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="password"
          placeholder="Password"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 mb-4"
          type="password"
          placeholder="Confirm Password"
        />
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded text-sm tracking-wider"
            type="submit"
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
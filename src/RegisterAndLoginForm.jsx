// RegisterAndLoginForm.jsx

import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'https://chatcorrectedback.onrender.com' : 'https://chatcorrectedback.onrender.com';
    try {
      const { data } = await axios.post(url, { username, password }, { withCredentials: true });
      setLoggedInUsername(username);
      setId(data.id);
    } catch (error) {
      console.error('Authentication error:', error);
      // handle error here, e.g., display an error message to the user
    }
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?
              <button
                className="ml-1 text-blue-500"
                onClick={() => setIsLoginOrRegister('login')}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Don't have an account?
              <button
                className="ml-1 text-blue-500"
                onClick={() => setIsLoginOrRegister('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Demo credentials
  const demoEmail = "admin@gmail.com";
  const demoPassword = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === demoEmail && password === demoPassword) {
      setMessage("Login Successful ✅");
    } else {
      setMessage("Invalid Credentials ❌");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
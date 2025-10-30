const API_URL = "http://localhost:2006/api";

function CarManagementApp() {
  const [token, setToken] = React.useState(null);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [editingCar, setEditingCar] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRegPassword, setShowRegPassword] = React.useState(false);
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [regUsername, setRegUsername] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');
  
  const [carForm, setCarForm] = React.useState({
    id: '',
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    bodyType: '',
    engineType: '',
    transmission: ''
  });

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      fetchCars();
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Invalid username or password");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, password: regPassword })
      });

      if (!res.ok) throw new Error("Registration failed");

      setShowRegister(false);
      setRegUsername('');
      setRegPassword('');
      alert("Registration successful! Please log in.");
    } catch (err) {
      console.error("Error registering:", err);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCars([]);
  };

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_URL}/cars`, {
        headers: {
          "Authorization": `Bearer ${token || localStorage.getItem('token')}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch cars");

      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const handleSaveCar = async () => {
    const method = carForm.id ? "PUT" : "POST";
    const url = carForm.id ? `${API_URL}/cars/${carForm.id}` : `${API_URL}/cars`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(carForm)
      });

      if (!res.ok) throw new Error("Failed to save car");

      closeModal();
      fetchCars();
    } catch (err) {
      console.error("Error saving car:", err);
    }
  };

  const handleEditCar = async (id) => {
    try {
      const res = await fetch(`${API_URL}/cars/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch car");

      const car = await res.json();
      setCarForm(car);
      setEditingCar(car);
      setShowModal(true);
    } catch (err) {
      console.error("Error editing car:", err);
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`${API_URL}/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to delete car");

      fetchCars();
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  const openModal = () => {
    setCarForm({
      id: '',
      make: '',
      model: '',
      year: '',
      licensePlate: '',
      color: '',
      bodyType: '',
      engineType: '',
      transmission: ''
    });
    setEditingCar(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCar(null);
  };

  const updateCarForm = (field, value) => {
    setCarForm(prev => ({ ...prev, [field]: value }));
  };

  if (!token && !showRegister) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-2xl p-8 shadow-2xl shadow-red-900/50">
            <h1 className="text-4xl font-black text-white mb-2 text-center">Car Inventory</h1>
            <p className="text-gray-400 text-sm text-center mb-8">Login to manage your cars</p>

            <h2 className="text-2xl font-bold text-white mb-6">Log In</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Username:</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">Password:</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition pr-10"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-400 select-none"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transition"
              >
                Login
              </button>
            </div>

            <p className="text-gray-400 text-center mt-4">
              Don't have an account?{' '}
              <button onClick={() => setShowRegister(true)} className="text-red-600 hover:text-red-500 font-bold">
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!token && showRegister) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-2xl p-8 shadow-2xl shadow-red-900/50">
            <h1 className="text-4xl font-black text-white mb-2 text-center">Car Inventory</h1>
            <p className="text-gray-400 text-sm text-center mb-8">Create a new account</p>

            <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Username:</label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">Password:</label>
                <div className="relative">
                  <input
                    type={showRegPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                    className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition pr-10"
                    required
                  />
                  <span
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-400 select-none"
                  >
                    {showRegPassword ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transition"
              >
                Create Account
              </button>
            </div>

            <p className="text-gray-400 text-center mt-4">
              Already have an account?{' '}
              <button onClick={() => setShowRegister(false)} className="text-red-600 hover:text-red-500 font-bold">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-black border-t-4 border-red-600 rounded-xl p-8 mb-8 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Car Inventory</h1>
              <p className="text-gray-400 text-sm">Manage your car collection with ease</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={openModal}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transform hover:scale-105 transition-all"
              >
                + Add Car
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold border border-gray-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-red-600">
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Plate</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Make</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Model</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Color</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Body</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Engine</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Transmission</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {cars.map(car => (
                  <tr key={car.id}>
                    <td className="px-6 py-4 text-center">{car.id}</td>
                    <td className="px-6 py-4 text-center">{car.licensePlate}</td>
                    <td className="px-6 py-4 text-center">{car.make}</td>
                    <td className="px-6 py-4 text-center">{car.model}</td>
                    <td className="px-6 py-4 text-center">{car.year}</td>
                    <td className="px-6 py-4 text-center">{car.color}</td>
                    <td className="px-6 py-4 text-center">{car.bodyType}</td>
                    <td className="px-6 py-4 text-center">{car.engineType}</td>
                    <td className="px-6 py-4 text-center">{car.transmission}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleEditCar(car.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mr-2 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-red-900/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-white">
                  {editingCar ? 'Edit Car' : 'Add New Car'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-red-600 text-3xl font-bold transition"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Make"
                  value={carForm.make}
                  onChange={(e) => updateCarForm('make', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={carForm.model}
                  onChange={(e) => updateCarForm('model', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={carForm.year}
                  onChange={(e) => updateCarForm('year', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />
                <input
                  type="text"
                  placeholder="License Plate"
                  value={carForm.licensePlate}
                  onChange={(e) => updateCarForm('licensePlate', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={carForm.color}
                  onChange={(e) => updateCarForm('color', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none placeholder-gray-500 transition"
                  required
                />

                <select
                  value={carForm.bodyType}
                  onChange={(e) => updateCarForm('bodyType', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none transition"
                  required
                >
                  <option value="">Body Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Truck">Truck</option>
                  <option value="Coupe">Coupe</option>
                </select>

                <select
                  value={carForm.engineType}
                  onChange={(e) => updateCarForm('engineType', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none transition"
                  required
                >
                  <option value="">Engine Type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <select
                  value={carForm.transmission}
                  onChange={(e) => updateCarForm('transmission', e.target.value)}
                  className="w-full p-3 bg-black text-white border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none transition"
                  required
                >
                  <option value="">Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold border border-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCar}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<CarManagementApp />, document.getElementById('root'));
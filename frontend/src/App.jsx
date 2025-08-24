import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/tasks/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/tasks", form);
    }
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-blue-500">📊 Dashboard</h2>
        <nav className="space-y-3">
          <a href="#" className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">Tasks</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Task Manager</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm transition">
            + New Task
          </button>
        </header>

        {/* Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Task Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow-md mb-8 border border-gray-100"
          >
            <h2 className="text-lg font-medium mb-3 text-gray-700">
              {editingId ? "✏️ Edit Task" : "➕ Add a New Task"}
            </h2>
            <input
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full mb-3 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full mb-3 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm transition">
              {editingId ? "Update Task" : "Add Task"}
            </button>
          </form>

          {/* Task List */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <h2 className="font-semibold text-lg text-gray-700">{task.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

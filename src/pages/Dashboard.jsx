import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    
    const navigate = useNavigate();
    const user = auth.currentUser;

    // READ: Fetch tasks in real-time
    useEffect(() => {
        if (!user) return;
        
        // Query: Get tasks for THIS user only, ordered by time
        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
        });
        return () => unsubscribe();
    }, [user]);

    // CREATE: Add a new task
    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        
        try {
            await addDoc(collection(db, 'tasks'), {
            text: newTask,
            userId: user.uid,
            createdAt: new Date()
            });
            setNewTask('');
            toast.success("Task added");
        } catch (error) {
            toast.error("Error adding task");
        }
    };

    // DELETE: Remove a task
    const deleteTask = async (id) => {
        if(window.confirm("Are you sure you want to delete this?")) {
            await deleteDoc(doc(db, 'tasks', id));
            toast.success("Task deleted");
        }
    };

    // UPDATE: Start editing mode
    const startEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    // UPDATE: Save changes
    const saveEdit = async (id) => {
        await updateDoc(doc(db, 'tasks', id), { text: editText });
        setEditingId(null);
        toast.success("Task updated");
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 hidden sm:inline">{user?.email}</span>
                <button onClick={handleLogout} className="text-red-600 font-semibold hover:bg-red-50 px-3 py-1 rounded transition">
                    Logout
                </button>
            </div>
            </div>

            {/* Create Input */}
            <form onSubmit={addTask} className="flex gap-2 mb-8">
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition font-medium">
                Add
            </button>
            </form>

            {/* Task List */}
            <div className="space-y-3">
            {tasks.length === 0 && <p className="text-center text-gray-400 mt-10">No tasks yet. Add one above!</p>}
            
            {tasks.map(task => (
                <div key={task.id} className="bg-white p-4 rounded shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
                
                {editingId === task.id ? (
                    // Edit Mode
                    <div className="flex flex-1 gap-2 mr-2 animate-pulse">
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                    <button onClick={() => saveEdit(task.id)} className="text-green-600 font-bold px-2 hover:bg-green-50 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 px-2 hover:bg-gray-100 rounded">Cancel</button>
                    </div>
                ) : (
                    // View Mode
                    <span className="flex-1 text-lg text-gray-700 break-all">{task.text}</span>
                )}

                {/* Action Buttons */}
                {editingId !== task.id && (
                    <div className="flex gap-2 ml-4">
                    <button onClick={() => startEdit(task)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded">
                        ✏️
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded">
                        🗑️
                    </button>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}
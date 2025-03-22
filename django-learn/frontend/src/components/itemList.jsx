import React, { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../api";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };
  const handleDelete = async (id) => {
    await deleteItem(id); // Wait for deletion to complete
    fetchItems(); // Refresh the item list
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateItem(editingId, { name, description });
      setEditingId(null);
    } else {
      await createItem({ name, description });
    }
    setName("");
    setDescription("");
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        CRUD App
      </h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Add"} Item
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between bg-white p-3 rounded-lg shadow"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

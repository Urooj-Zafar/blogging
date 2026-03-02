import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateBlog() {
  const { id } = useParams(); 
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then(res => setCategories(res.data.data))
      .catch(() => setError("Failed to load categories"));
  }, []);

   useEffect(() => {
    if (!isEdit) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blogs/${id}`);
        const blog = res.data.data;

        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setCategory(blog.category?._id);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return setError("Login required");
  if (!category || !title || !description || !content)
    return setError("All fields are required");

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("author", user._id);
    if (image) formData.append("image", image);

    const url = isEdit
      ? `http://localhost:3000/blogs/${id}`
      : "http://localhost:3000/blogs";

    const method = isEdit ? "put" : "post";

    const res = await axios[method](url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(isEdit ? "Blog updated!" : "Blog created!");
    navigate(isEdit ? `/blogs/${id}` : "/", {
      state: !isEdit ? { newBlog: res.data.data } : null,
    });
  } catch (err) {
    console.error(err);
    setError("Blog submission failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">
          {isEdit ? "Edit Blog" : "Create Blog"}
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md"
        />

        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md h-24"
        />

        <textarea
          placeholder="Full Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded-md h-40"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded hover:bg-green-600"
        >
          {isEdit ? "Update Blog" : "Upload Blog"}
        </button>
      </form>
    </div>
  );
}

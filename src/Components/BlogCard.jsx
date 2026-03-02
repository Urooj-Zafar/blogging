import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({
  _id,
  title,
  image,
  description,
  category,
  date,
  showActions = false,
  onDeleteSuccess,
}) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:3000/blogs/${_id}`);
      alert("Blog deleted!");
      onDeleteSuccess && onDeleteSuccess(_id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div
      onClick={() => _id && navigate(`/blogs/${_id}`)}
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 pt-10 hover:shadow-xl transition relative transition transform hover:-translate-y-1 duration-300"
    >
      <img
        src={image ? `http://localhost:3000${image}` : "/default.jpg"}
        alt={title}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h3 className="text-lg font-bold mb-1">{title}</h3>

      {category && (
        <p className="text-sm text-orange-500 mb-1">{category}</p>
      )}

      <p className="text-sm text-gray-500 line-clamp-2">
        {description}
      </p>

      {showActions && (
        <div className="absolute top-2 right-2 flex gap-2">
          <MdModeEditOutline
          size={18}
          className="text-black"
          onClick={(e) => {
          e.stopPropagation();
          navigate(`/createblog/${_id}`);
  }}
/>
          <MdDelete
            size={18}
            className="text-red-600 hover:text-red-900"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

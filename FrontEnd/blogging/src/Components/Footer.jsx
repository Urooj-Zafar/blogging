import { Link } from "react-router-dom";

export default function Footer({ openSignIn }) {

  const handleCreateBlog = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      openSignIn();
      return;
    }

    window.location.href = "/createblog";
  };

  return (
    <footer className="bg-black text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            BrainCrafters
          </h2>

          <p className="text-gray-300 text-sm leading-7">
            A platform where creators share knowledge,
            ideas, and stories through meaningful blogs.
          </p>
        </div>


        {/* Explore */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Explore
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">

            <li>
              <Link 
                to="/"
                className="hover:text-orange-500 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link 
                to="/blogs"
                className="hover:text-orange-500 transition"
              >
                Blogs
              </Link>
            </li>

            <li>
              <Link 
                to="/categories"
                className="hover:text-orange-500 transition"
              >
                Categories
              </Link>
            </li>

            

          </ul>
        </div>


        {/* Community */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Community
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">


            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=braincrafter.blog@gmail.com&su=Report%20an%20Issue%20-%20BrainCrafters&body=Page%20or%20Feature:%0A%0AIssue%20Description:%0A%0ADevice:%0A%0A"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition"
              >
                Report an Issue
              </a>
            </li>

            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=braincrafter.blog@gmail.com&su=Suggestion%20for%20BrainCrafters%20Improvement&body=Suggestion%20Title:%0A%0ADescription:%0A%0AHow%20it%20can%20improve%20BrainCrafters:%0A%0A"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition"
              >
                Suggest an Idea
              </a>
            </li>

          </ul>
        </div>


        {/* Platform */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Why BrainCrafters?
          </h2>

          <ul className="text-gray-300 text-sm space-y-3">

            <li>✨ Share your knowledge</li>
            <li>📚 Learn from creators</li>
            <li>✍️ Become an author</li>
            <li>🚀 Grow with the community</li>

          </ul>
        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-gray-700 py-5 text-center">

        <p className="text-gray-400 text-sm">
          © 2026 BrainCrafters. All rights reserved.
        </p>

      </div>

    </footer>
  );
}
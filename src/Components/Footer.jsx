import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-xl font-bold mb-3">BrainCrafters</h2>
          <p className="text-gray-300 text-sm">
            Sharing ideas, insights, and stories with the world.
Your daily dose of creativity, tech, lifestyle, and inspiration.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Company</h2>
          <ul className="text-gray-300 text-sm space-y-1">
            <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Join our Team</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Read Blog</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Press</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Services</h2>
          <ul className="text-gray-300 text-sm space-y-1">
            <li><a href="#" className="hover:text-orange-500 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Support</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Find Us</h2>
          <p className="text-gray-300 text-sm">
            123 Grand Rama IX,<br />
            Krung Thep Maha Nakhan 10400
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 py-4 px-10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        <p className="text-gray-400 text-sm">
          &copy; 2025 Your Company
        </p>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Call us (+86)010-020-0340</span>
          <div className="flex gap-3 text-gray-400 text-lg ">
            <a href="#" className="hover:text-orange-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Contact() {
  const inputStyle =
    "p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition";

  return (
    <div className="min-h-screen bg-gray-100">
      
      <section className="bg-black text-white text-center py-20 px-4 w-full">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Have questions or want to collaborate? Fill out the form below and we’ll get back to you as soon as possible.
        </p>
      </section>

      
      <div className="flex flex-wrap justify-center items-start gap-10 p-10 max-w-6xl mx-auto">
        
        <div className="flex flex-col gap-6 w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Send a Message</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className={inputStyle} />
            <input type="email" placeholder="Email Address" className={inputStyle} />
          </div>

          <input type="text" placeholder="Subject" className={inputStyle} />

          <textarea
            placeholder="Your Message"
            className="p-3 border border-gray-300 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          <button
            type="submit"
            className="bg-orange-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </div>

        
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-1/2">
          
          <div className="bg-white p-6 rounded-xl shadow-lg md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Office</h2>
            <p className="text-gray-700 mb-2">123 Grand Rama IX</p>
            <p className="text-gray-700 mb-2">Krung Thep Maha Nakhan 10400</p>
            <p className="text-gray-700 mb-2">Email: contact@braincrafters.com</p>
            <p className="text-gray-700 mb-2">Phone: (+123) 456-7890</p>
          </div>

          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden md:w-1/2 h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.123456789!2d100.567890!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed5b0b0!2s123%20Grand%20Rama%20IX%2C%20Krung%20Thep%20Maha%20Nakhon%2010400!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              title="BrainCrafters Office Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

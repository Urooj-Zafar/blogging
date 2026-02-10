export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-black text-white text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6">About BrainCrafters</h1>
        <p className="text-lg max-w-3xl mx-auto">
          BrainCrafters is your go-to blogging platform for insightful articles, tech trends, lifestyle tips, and more. We aim to inspire, inform, and spark curiosity for our growing community of readers and thinkers.
        </p>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Mission</h2>
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-12">
          Our mission is to provide high-quality content that educates, entertains, and inspires readers. We believe knowledge should be accessible to everyone, and our goal is to build a platform where ideas flourish and communities grow.
        </p>

        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Vision</h2>
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
          To be a leading online destination for thought-provoking blogs and insights, empowering readers to make informed decisions, stay inspired, and connect with like-minded individuals across the globe.
        </p>
      </section>

      <section className="py-16 bg-gray-200 px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Core Values</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Integrity</h3>
            <p className="text-gray-700">
              We value honesty and transparency in everything we do.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Creativity</h3>
            <p className="text-gray-700">
              Encouraging fresh ideas and innovative approaches to content.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Community</h3>
            <p className="text-gray-700">
              Building a supportive environment for readers and writers alike.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center px-4">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Join Our Community</h2>
        <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
          Whether you are a reader or a writer, BrainCrafters welcomes you to explore, share, and connect. Dive into our blog articles and be part of a thriving knowledge community.
        </p>
        <a
          href="/categories"
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          Explore Categories
        </a>
      </section>
    </div>
  );
}

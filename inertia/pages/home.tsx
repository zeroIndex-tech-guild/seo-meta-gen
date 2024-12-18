import { Button } from '~/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="py-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide text-blue-500">MetaGen</h1>
          <nav className="space-x-4">
            <a href="#features" className="text-gray-300 hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white">
              Pricing
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="text-center">
          <h2 className="text-5xl font-extrabold tracking-tight">Generate SEO Tags Effortlessly</h2>
          <p className="mt-4 text-lg text-gray-300">
            Transform your content into optimized SEO metadata with just a few clicks. Enhance
            visibility, boost rankings, and make your website shine.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </div>
        </section>

        <section id="features" className="mt-16">
          <h3 className="text-3xl font-bold tracking-tight text-center">Why Choose MetaGen?</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-400">AI-Powered</h4>
              <p className="mt-2 text-gray-300">
                Leverage cutting-edge AI to generate precise and effective SEO metadata for any
                content.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-400">Lightning Fast</h4>
              <p className="mt-2 text-gray-300">
                Generate tags in seconds, saving you time and effort.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-400">Customizable</h4>
              <p className="mt-2 text-gray-300">
                Tailor metadata to fit your unique branding and content needs.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mt-16 text-center">
          <h3 className="text-3xl font-bold tracking-tight">Pricing</h3>
          <p className="mt-4 text-gray-300">Flexible plans for individuals and businesses.</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-400">Free</h4>
              <p className="mt-4 text-gray-300">Up to 50 requests per month.</p>
              <Button className="mt-4">Choose Plan</Button>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-400">Pro</h4>
              <p className="mt-4 text-gray-300">Unlimited requests and priority support.</p>
              <Button className="mt-4">Choose Plan</Button>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-blue-400">Enterprise</h4>
              <p className="mt-4 text-gray-300">Custom solutions for large-scale needs.</p>
              <Button className="mt-4">Contact Us</Button>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-16">
          <h3 className="text-3xl font-bold tracking-tight text-center">Get in Touch</h3>
          <form className="mt-8 max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="How can we help you?"
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </section>
      </main>

      <footer className="py-6 bg-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          © 2024 MetaGen. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

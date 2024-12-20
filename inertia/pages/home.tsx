import { router } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { useUserStore } from '~/store/user-store'

export default function LandingPage() {
  const { user } = useUserStore()
  const onStartGenerating = () => {
    const isUserLoggedIn = Boolean(user)
    const nextPage = isUserLoggedIn ? '/login' : '/dashboard'
    router.get(nextPage)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide text-white">MetaGen</h1>
          <nav className="space-x-4">
            <a href="#about" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#features" className="text-gray-400 hover:text-white">
              Features
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="text-center">
          <h2 className="text-5xl font-extrabold tracking-tight">Meta Generator</h2>
          <p className="mt-4 text-lg text-gray-400">
            Generate SEO metadata effortlessly using webhooks or a user-friendly interface.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="default" type="button" onClick={onStartGenerating}>
              Start Generating
            </Button>
          </div>
        </section>

        <section id="features" className="mt-16">
          <h3 className="text-3xl font-bold tracking-tight text-center">Features</h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-white">AI-Powered</h4>
              <p className="mt-2 text-gray-400">
                Leverage cutting-edge AI to generate precise and effective SEO metadata for any
                content.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-white">Lightning Fast</h4>
              <p className="mt-2 text-gray-400">
                Generate tags in seconds, saving you time and effort.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-white">Webhook Integration</h4>
              <p className="mt-2 text-gray-400">
                Easily integrate with your applications using our webhook support.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mt-16 text-center">
          <h3 className="text-3xl font-bold tracking-tight">About MetaGen</h3>
          <p className="mt-4 text-gray-400">
            MetaGen is a powerful tool designed to simplify the process of generating SEO metadata.
            Whether you're a developer or a content creator, MetaGen provides the tools you need to
            enhance your website's visibility effortlessly.
          </p>
        </section>
      </main>

      <footer className="py-6 bg-gray-900">
        <div className="container mx-auto text-center text-gray-400">
          © 2024 MetaGen. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="bg-neutral-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-white/80 mb-8 max-w-2xl">
          Vous avez une question ? Envoyez-nous un message et nous vous répondrons rapidement.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <input
            type="text"
            placeholder="Votre nom"
            className="p-3 rounded bg-neutral-800 border border-neutral-700"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="p-3 rounded bg-neutral-800 border border-neutral-700"
          />
          <textarea
            placeholder="Votre message"
            rows={4}
            className="p-3 rounded bg-neutral-800 border border-neutral-700 md:col-span-2"
          />
          <button className="md:col-span-2 self-end bg-amber-400 text-neutral-900 px-6 py-3 rounded font-semibold">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}

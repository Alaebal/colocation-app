export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,#3e4b2f_0%,#28301f_100%)] px-6 py-24 text-white md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.2rem] border border-white/10 bg-white/8 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl md:grid-cols-2 md:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/70">Restons en contact</p>
          <h2 className="display-font mt-4 text-4xl md:text-5xl">Parlons de votre prochain sejour</h2>
          <p className="mt-5 max-w-md text-white/78">
            Vous avez une question ? Ecrivez-nous et recevez une reponse claire pour planifier votre colocation d&apos;ete.
          </p>
        </div>

        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Votre nom"
            className="rounded-full border border-white/16 bg-white/10 px-5 py-3 text-white placeholder:text-white/55 focus:border-white/40 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="rounded-full border border-white/16 bg-white/10 px-5 py-3 text-white placeholder:text-white/55 focus:border-white/40 focus:outline-none"
          />
          <textarea
            placeholder="Votre message"
            rows={5}
            className="rounded-[1.5rem] border border-white/16 bg-white/10 p-5 text-white placeholder:text-white/55 focus:border-white/40 focus:outline-none md:col-span-2"
          />
          <button className="md:col-span-2 rounded-full border border-white/20 bg-[#d7dbc2] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 hover:bg-[#e4e8d0]">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}

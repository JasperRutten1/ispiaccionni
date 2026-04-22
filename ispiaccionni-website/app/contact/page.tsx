export default function ContactPage() {
  return (
    <main className="mx-20 my-10 rounded-md bg-gray-800 p-10 text-white">
      <h2 className="mb-4 text-4xl font-semibold text-amber-200">Contact</h2>
      <p className="mb-4 text-lg">
        Have a tip? Want to report a suspicious pigeon? Reach out through the usual channels.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-lg">
        <li>Email: <span className="text-amber-100">contact@ispiaccionni.local</span></li>
        <li>Telegram: <span className="text-amber-100">@ispiaccionni</span></li>
        <li>Location: Somewhere between the city squares and the pigeon roosts.</li>
      </ul>
      <p className="mt-6 text-lg">
        The site header now includes links to Home, About, and Contact for easy routing.
      </p>
    </main>
  );
}

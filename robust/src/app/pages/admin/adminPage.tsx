"use client";


interface Section {
  title1: string;
  descriptionFlex: string;
  href: string;
}

const sections: Section[] = [
  {
    title1: 'Lag annonse',
    descriptionFlex: 'Opprett en ny annonse for dine produkter eller tjenester.',
    href: '/admin',
  },
  {
    title1: 'Mine annonser',
    descriptionFlex: 'Administrer, rediger og slett dine eksisterende annonser.',
    href: '/my-ads',
  },
  {
    title1: 'Data',
    descriptionFlex: 'Få innsikt i visninger, klikk og kundedata.',
    href: '/data',
  },
  {
    title1: 'Chat-rom',
    descriptionFlex: 'Kommuniser direkte med kunder og samarbeidspartnere.',
    href: '/chat',
  },
];

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold hover:opacity-90 transition">
            FlexRoom
          </a>
          <div className="flex items-center gap-6">
            <a href="/rooms" className="hover:underline font-medium">
              Rom
            </a>
            <a href="/admin" className="hover:underline font-medium">
              Admin
            </a>
            <span className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold">
              Bedrift / Bruker
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800">Admin Name</h2>
              <p className="text-gray-600">admin@example.com</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <a key={index} href={section.href} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:border-blue-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{section.title1}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{section.descriptionFlex}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:underline text-lg font-medium">
            ← Tilbake til hjem
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
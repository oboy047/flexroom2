
import React, { useState } from "react";

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const LoaderIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError("Vennligst fyll ut alle obligatoriske felt.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      

      
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Noe gikk galt. Prøv igjen senere.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: "Telefon",
      detail: "+47 123 45 678",
      link: "tel:+4712345678"
    },
    {
      icon: <MailIcon />,
      title: "E-post",
      detail: "kontakt@dittselskap.no",
      link: "mailto:kontakt@dittselskap.no"
    },
    {
      icon: <MapPinIcon />,
      title: "Adresse",
      detail: "B R A Veien 4, 1757 Halden",
      link: "https://maps.app.goo.gl/ggZFt2LPZVqdmzvK7"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Kontakt Oss
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Har du spørsmål eller ønsker å komme i kontakt? Vi hører gjerne fra deg!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target={info.title === "Adresse" ? "_blank" : undefined}
              rel={info.title === "Adresse" ? "noopener noreferrer" : undefined}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{info.title}</h3>
                <p className="text-gray-600">{info.detail}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send oss en melding
            </h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircleIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Melding sendt!
                </h3>
                <p className="text-gray-600 mb-6">
                  Takk for din henvendelse. Vi svarer så snart som mulig.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Send en ny melding
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded">
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Navn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Ditt navn"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-post <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="din@epost.no"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Emne
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Hva handler det om?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Melding <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Skriv din melding her..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <LoaderIcon />
                      Sender...
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      Send melding
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Åpningstider
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">Mandag - Fredag</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">Lørdag</span>
                  <span>10:00 - 15:00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Søndag</span>
                  <span className="text-red-600">Stengt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
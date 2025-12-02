"use client";

import React, { useState } from "react";

function useAuth() {
  const mockUser = {
    email: "mock.user@example.com",
    uid: "mock-uid-123",
  };
  return { user: mockUser };
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  city: string;
  postalCode: string;
}

export default function RoomsPayment() {
 
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    // Setter e-post basert på mock-mail
    email: user?.email || "", 
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    postalCode: ""
  });

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(): Promise<void> {
    if (!acceptTerms) {
      setMessage("Du må godta vilkårene for å fortsette.");
      return;
    }

    const requiredFields = Object.entries(formData);
    // Sjekker om kritiske felt (unntatt 'email' som fylles ut av mock) er tomme
    const hasEmptyFields = requiredFields.some(([key, value]) => {
      return key !== 'email' && !value; 
    });
    
    if (hasEmptyFields) {
      setMessage("Vennligst fyll ut alle obligatoriske felt.");
      return;
    }

    try {
      setMessage("Betaling behandles...");
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage("success");
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err) {
      console.error(err);
      setMessage("Noe gikk galt med betalingen. Prøv igjen.");
    }
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        
        <a href="/rooms" className="text-blue-600 hover:underline text-sm font-medium">
          ← Tilbake til rom
        </a>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Betal for booking</h1>

      {message === "success" ? (
        <div className="mb-6 p-8 rounded-lg text-center bg-green-50 border-2 border-green-300">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Betaling vellykket!</h2>
          <p className="text-green-600 mb-6">Takk for din booking. Du vil motta en bekreftelse på e-post.</p>
          <a 
            href="/"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Tilbake til hjem
          </a>
        </div>
      ) : message && (
        <div className={`mb-6 p-4 rounded-lg text-center font-semibold ${
          message.includes("behandles") ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
   
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Kontaktinformasjon</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fullt navn *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Ola Nordmann"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-post *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="ola@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="+47 123 45 678"
                pattern="[0-9+\s]*"
                required
              />
            </div>
          </div>
        </div>

   
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Betalingsinformasjon</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kortnummer *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                pattern="[0-9\s]*"
                inputMode="numeric"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Utløpsdato *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="MM/ÅÅ"
                  maxLength={5}
                  pattern="[0-9/]*"
                  inputMode="numeric"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="123"
                  maxLength={3}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>
          </div>
        </div>

     
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Faktureringsadresse</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse *
              </label>
              <input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Gateveien 1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  By *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="Oslo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postnummer *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="0123"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>
          </div>
        </div>

      
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Jeg godtar <a href="/terms" className="text-blue-600 hover:underline">vilkårene</a> og bekrefter at informasjonen jeg har oppgitt er korrekt.
            </span>
          </label>
        </div>

        {/* Betal knapp - er ikke en faktisk betaling - Kun test*/}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-xl"
        >
          Fullfør betaling
        </button>

        <p className="text-center text-sm text-gray-500 pt-4">
          🔒 Din betaling er sikret med SSL-kryptering
        </p>
      </div>
    </section>
  );
}
import React, { useState } from 'react';

type Certificate = {
  id: number;
  title: string;
  imageUrl: string;
  issuer?: string;
  date?: string;
};
import fullStack from "../Image/fullstack.png"
const certificates: Certificate[] = [
  {
    id: 1,
    title: 'DevOps Engineer Certificate',
    imageUrl: fullStack,
    issuer: 'Sabai Code, Full Stack Development',
    date: 'October 2024',
  }
];

const CertificateSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="lg:w-[1200px] mx-auto px-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">🎓 My Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedCert(cert)}
          >
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="rounded-md h-40 w-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-500">{cert.issuer}</p>
            <p className="text-xs text-gray-400">{cert.date}</p>
          </div>
        ))}
      </div>

      {selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-hidden max-w-3xl w-full shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setSelectedCert(null)}
            >
              &times;
            </button>
            <img
              src={selectedCert.imageUrl}
              alt={selectedCert.title}
              className="w-full object-contain max-h-[80vh]"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{selectedCert.title}</h3>
              <p className="text-sm text-gray-500">{selectedCert.issuer}</p>
              <p className="text-xs text-gray-400">{selectedCert.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateSection;

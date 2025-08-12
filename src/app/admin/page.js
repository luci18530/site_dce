"use client";

import { useState, useEffect } from 'react';
import {
  pautasConsepe as initialPautasConsepe,
  pautasConsuni as initialPautasConsuni,
} from '../data/pautas';

const statusColors = {
  'Em análise': 'bg-yellow-100 text-yellow-800',
  'Em discussão': 'bg-purple-100 text-purple-800',
  Aprovada: 'bg-green-100 text-green-800',
  Rejeitada: 'bg-red-100 text-red-800',
};

function getStatusColor(status) {
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export default function Admin() {
  const [consepe, setConsepe] = useState(initialPautasConsepe);
  const [consuni, setConsuni] = useState(initialPautasConsuni);

  const [newConsepe, setNewConsepe] = useState({
    titulo: '',
    status: '',
    data: '',
    descricao: '',
  });

  const [newConsuni, setNewConsuni] = useState({
    titulo: '',
    status: '',
    data: '',
    descricao: '',
  });

  useEffect(() => {
    const storedConsepe = typeof window !== 'undefined' && localStorage.getItem('pautasConsepe');
    const storedConsuni = typeof window !== 'undefined' && localStorage.getItem('pautasConsuni');

    if (storedConsepe) setConsepe(JSON.parse(storedConsepe));
    if (storedConsuni) setConsuni(JSON.parse(storedConsuni));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pautasConsepe', JSON.stringify(consepe));
    }
  }, [consepe]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pautasConsuni', JSON.stringify(consuni));
    }
  }, [consuni]);

  const handleAddConsepe = () => {
    const pauta = { ...newConsepe, statusColor: getStatusColor(newConsepe.status) };
    setConsepe([...consepe, pauta]);
    setNewConsepe({ titulo: '', status: '', data: '', descricao: '' });
  };

  const handleAddConsuni = () => {
    const pauta = { ...newConsuni, statusColor: getStatusColor(newConsuni.status) };
    setConsuni([...consuni, pauta]);
    setNewConsuni({ titulo: '', status: '', data: '', descricao: '' });
  };

  const handleRemoveConsepe = (index) => {
    setConsepe(consepe.filter((_, i) => i !== index));
  };

  const handleRemoveConsuni = (index) => {
    setConsuni(consuni.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Administração de Pautas</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">CONSEPE</h2>
        <ul className="mb-6">
          {consepe.map((pauta, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
            >
              <div>
                <p className="font-medium">{pauta.titulo}</p>
                <p className="text-sm">
                  {pauta.data} - {pauta.status}
                </p>
              </div>
              <button
                className="text-red-500"
                onClick={() => handleRemoveConsepe(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={newConsepe.titulo}
            onChange={(e) =>
              setNewConsepe({ ...newConsepe, titulo: e.target.value })
            }
            placeholder="Título"
            className="border p-2 rounded"
          />
          <input
            value={newConsepe.status}
            onChange={(e) =>
              setNewConsepe({ ...newConsepe, status: e.target.value })
            }
            placeholder="Status"
            className="border p-2 rounded"
          />
          <input
            value={newConsepe.data}
            onChange={(e) =>
              setNewConsepe({ ...newConsepe, data: e.target.value })
            }
            placeholder="Data"
            className="border p-2 rounded"
          />
          <input
            value={newConsepe.descricao}
            onChange={(e) =>
              setNewConsepe({ ...newConsepe, descricao: e.target.value })
            }
            placeholder="Descrição"
            className="border p-2 rounded md:col-span-2"
          />
          <button
            onClick={handleAddConsepe}
            className="bg-sky-500 text-white px-4 py-2 rounded md:col-span-2"
          >
            Adicionar Pauta
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CONSUNI</h2>
        <ul className="mb-6">
          {consuni.map((pauta, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
            >
              <div>
                <p className="font-medium">{pauta.titulo}</p>
                <p className="text-sm">
                  {pauta.data} - {pauta.status}
                </p>
              </div>
              <button
                className="text-red-500"
                onClick={() => handleRemoveConsuni(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={newConsuni.titulo}
            onChange={(e) =>
              setNewConsuni({ ...newConsuni, titulo: e.target.value })
            }
            placeholder="Título"
            className="border p-2 rounded"
          />
          <input
            value={newConsuni.status}
            onChange={(e) =>
              setNewConsuni({ ...newConsuni, status: e.target.value })
            }
            placeholder="Status"
            className="border p-2 rounded"
          />
          <input
            value={newConsuni.data}
            onChange={(e) =>
              setNewConsuni({ ...newConsuni, data: e.target.value })
            }
            placeholder="Data"
            className="border p-2 rounded"
          />
          <input
            value={newConsuni.descricao}
            onChange={(e) =>
              setNewConsuni({ ...newConsuni, descricao: e.target.value })
            }
            placeholder="Descrição"
            className="border p-2 rounded md:col-span-2"
          />
          <button
            onClick={handleAddConsuni}
            className="bg-sky-500 text-white px-4 py-2 rounded md:col-span-2"
          >
            Adicionar Pauta
          </button>
        </div>
      </section>
    </div>
  );
}


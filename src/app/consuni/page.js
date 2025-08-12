"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { representantesConsuni } from '../data/conselheiros';
import { pautasConsuni as initialPautasConsuni } from '../data/pautas';

export default function Consuni() {
  const [pautas, setPautas] = useState(initialPautasConsuni);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('pautasConsuni');
    if (stored) {
      setPautas(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <title>CONSUNI - DCE UFPB</title>
      <meta name="description" content="Conselho Universitário - Representação Estudantil do DCE UFPB"></meta>
      
      {/* Hero Section */}
      <section className="bg-sky-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-14">
            CONSUNI
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Conselho Universitário
          </p>
        </div>
      </section>

      {/* Informações sobre o CONSUNI */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              O que é o CONSUNI?
            </h2>
            
            <div className="bg-sky-50 p-8 rounded-lg mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                O <strong>Conselho Universitário (CONSUNI)</strong> é o órgão deliberativo superior da Universidade Federal da Paraíba em matéria de política geral da Universidade, sendo a instância máxima de decisão institucional.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-sky-800">Composição do CONSUNI:</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Reitor (Presidente)</li>
                <li>• Vice-Reitor (Vice-Presidente)</li>
                <li>• Pró-Reitor de Administração</li>
                <li>• Pró-Reitor de Planejamento e Desenvolvimento</li>
                <li>• Diretores de todos os Centros</li>
                <li>• Um representante docente de cada Centro</li>
                <li>• <strong>Representação estudantil</strong></li>
                <li>• Representação do pessoal técnico-administrativo</li>
                <li>• Um representante da comunidade</li>
              </ul>
              
              <div className="bg-sky-100 p-4 rounded-lg">
                <p className="text-sky-800 font-medium">
                  <strong>Importante:</strong> O CONSUNI define as políticas gerais da universidade, incluindo questões orçamentárias, estruturais, regimentais e estratégicas para toda a instituição.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Representantes Estudantis do DCE */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Representantes Estudantis do DCE no CONSUNI
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {representantesConsuni.map((representante, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="space-y-6">
                    {/* Titular */}
                    <div className="border-b pb-4">
                      <div className="text-center">
                        {representante.foto ? (
                          <Image 
                            src={representante.foto} 
                            alt={representante.nome}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-sky-600 font-bold text-xl">
                              {representante.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{representante.nome}</h3>
                        <p className="text-sky-600 font-medium text-sm">TITULAR</p>
                      </div>
                    </div>

                    {/* Suplente */}
                    <div className="text-center">
                      {representante.fotoSuplente ? (
                        <Image 
                          src={representante.fotoSuplente} 
                          alt={representante.suplente}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-gray-600 font-bold text-xl">
                            {representante.suplente.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-semibold text-md text-gray-700 mb-1">{representante.suplente}</h4>
                      <p className="text-gray-500 font-medium text-xs">SUPLENTE</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pautas em Discussão */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Pautas Estratégicas em Discussão
            </h2>
            
            <div className="space-y-6">
              {pautas.map((pauta, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-sky-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                      {pauta.titulo}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${pauta.statusColor}`}>
                        {pauta.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {pauta.data}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {pauta.descricao}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Participação estudantil nas decisões estratégicas da universidade
              </p>
              <a 
                href="https://www.ufpb.br/sods"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-600 transition"
              >
                Acessar Documentos Oficiais
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-sky-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Defendendo os Interesses Estudantis
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            No CONSUNI, o DCE atua nas decisões mais importantes da universidade. Sua voz chega às instâncias máximas através da nossa representação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contatos"
              className="bg-white text-sky-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Envie Sua Demanda
            </a>
            <a 
              href="https://instagram.com/dceufpb.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-sky-500 transition"
            >
              Acompanhe no Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

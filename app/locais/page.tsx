import Image from 'next/image';
import Link from 'next/link';

export type Venue = {
  id: string;
  name: string;
  url: string;
};

async function getVenues(): Promise<Venue[]> {
  const response = await fetch('https://apis.codante.io/olympic-games/venues');
  const data = await response.json();
  return data.data;
}

export default async function VenuePage() {
  const venues = await getVenues();

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-10">Locais Olímpicos</h1>
      {venues.map((venue) => (
        <article key={venue.id} className="flex flex-col md:flex-row justify-between min-w-full my-4 p-10 bg-white rounded-xl  shadow-md">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{venue.name}</h2>
            <a href={venue.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Ver mais
            </a>
          </div>
           </article>
      ))}
      <Link className="flex items-center py-2 gap-2" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/>
        </svg>
        Voltar
      </Link>
    </section>
  );
}

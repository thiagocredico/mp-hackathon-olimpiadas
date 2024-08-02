import { Country, PaginationMeta } from '@/app/page'; // Ajuste conforme necessário
import Pagination from '@/components/pagination';
import Image from 'next/image';
import Link from 'next/link';


type Event = {
  id: number;
  day: string;
  discipline_name: string;
  discipline_pictogram: string;
  name?: string;
  venue_name: string;
  event_name: string;
  detailed_event_name: string;
  start_date: string;
  end_date: string;
  status: string;
  is_medal_event: number;
  is_live: number;
  competitors: {
    country_id: string;
    country_flag_url: string;
    competitor_name: string;
    position: number;
    result_position: string;
    result_winnerLoserTie: string;
    result_mark: string;
  }[];
};

async function getCountryByName(name: string): Promise<Country | undefined> {
  const response = await fetch('https://apis.codante.io/olympic-games/countries');
  const result = await response.json();

  if (result.data && Array.isArray(result.data)) {
    return result.data.find((country: Country) => country.name === name);
  }

  return undefined;
}

async function getEventsByCountry(country: string, page: number): Promise<{ data: Event[]; meta: PaginationMeta }> {
  const response = await fetch(`https://apis.codante.io/olympic-games/events?country=${country}&page=${page}`);
  const result = await response.json();
  return result;
}

async function getCountries(): Promise<Country[]> {
  const response = await fetch('https://apis.codante.io/olympic-games/countries');
  const result = await response.json();

  if (result.data && Array.isArray(result.data)) {
    return result.data;
  }

  return [];
}


export default async function CountryPage({
  params: { name },
  searchParams: { page = 1 },
}: {
  params: { name: string };
  searchParams: { page?: number };
}) {
  const country = await getCountryByName(decodeURI(name));

  if (!country) {
    return <div>Country not found</div>;
  }

  const { data: events, meta: pagination } = await getEventsByCountry(country.id, page);
  let links = pagination.links;
  links = links.map((link, index) => ({ ...link, id: index }));

  const allCountries = await getCountries();
  const neighboringCountries = allCountries.filter(
    (c) => c.continent === country.continent && c.name !== country.name
  );

  return (
    <section className='flex flex-col container'>
      <h1 className='text-5xl text-center font-bold text-gray-800 my-16'>
        {country.translations?.por?.common || country.name}
      </h1>
      <Link className='flex items-center py-2 gap-2' href='/'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/>
        </svg>
        Voltar
      </Link>
      <article className='flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl'>
        <section>
          {country && (
            <div className='text-xl text-gray-800 mt-3'>
              <h2><b>🏆 Rank:</b> {country.rank}</h2>
              <h2><b>🥇 Medalhas de Ouro:</b> {country.gold_medals}</h2>
              <h2><b>🥈 Medalhas de Prata:</b> {country.silver_medals}</h2>
              <h2><b>🥉 Medalhas de Bronze:</b> {country.bronze_medals}</h2>
              <h2><b>🏅 Total de Medalhas:</b> {country.total_medals}</h2>
            </div>
          )}
        </section>
        <div className='relative  my-2 md:h-auto w-48 shadow-md md:order-last order-first'>
          <Image
            src={country.flag_url}
            alt={country.name}
            fill
            quality={100}
          />
        </div>
      </article>
      <article>
        <h2 className='text-2xl font-bold text-gray-800 my-4'>Eventos</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {events.map((event) => (
            <article key={event.id} className='hover:border-amber-300 border-2 transition-all hover:shadow-xl flex flex-col items-start bg-white p-6 rounded-xl shadow-md'>
              <Link key={event.id} href={`/eventos/${event.id}`}>
                <div className='relative h-40 w-40 mb-4 self-center'>
                  <Image
                    src={event.discipline_pictogram}
                    alt={event.discipline_name}
                    fill
                    className='object-cover'
                  />
                </div>
                <p className='text-lg text-gray-600 mb-2'><b>Esporte:</b> {event.discipline_name}</p>
                <p className='text-lg text-gray-600 mb-2'><b>Modalidade:</b> {event.event_name}</p>
                <p className='text-lg text-gray-600 mb-2'><b>Dia:</b> {event.day}</p>
                <p className='text-lg text-gray-600 mb-2'><b>Hora:</b>
                  {new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}
                </p>
                <p className='text-lg text-gray-600 mb-2'><b>Status:</b> {event.status}</p>
                <p className='text-lg text-gray-600 mb-2'><b>Evento com Medalha:</b> {event.is_medal_event ? 'Sim' : 'Não'}</p>
                <p className='text-lg text-gray-600 mb-2'><b>Evento ao Vivo:</b> {event.is_live ? 'Sim' : 'Não'}</p>
              </Link>
            </article>
          ))}
        </div>
      </article>
      <Pagination links={links} lastPage={pagination.last_page} />
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/components/pagination';
import { PaginationMeta } from '@/app/page';

export type Event = {
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

async function getEvents(
  page: number,
): Promise<{ data: Event[]; meta: PaginationMeta }> {
  const response = await fetch(
    `https://apis.codante.io/olympic-games/events?page=${page}`,
  );
  const data = await response.json();
  return data;
}

export default async function EventPage({
  searchParams: { page = 1 },
}: {
  searchParams: { page?: number };
}) {
  const { data: events, meta: pagination } = await getEvents(page);

  let links = pagination.links;
  links = links.map((link, index) => ({ ...link, id: index }));

  return (
    <>
      <h1 className='text-5xl text-center font-bold text-gray-800 mt-10'>
        Eventos Olímpicos
      </h1>
      <section className='flex flex-wrap container mt-16 gap-4 items-center justify-center'>
        {events.map((event) => (
          <Link key={event.id} href={`/eventos/${event.id}`}>
            <article
              key={event.id}
              className='h-auto flex p-2 bg-white border-2 rounded-xl hover:border-amber-300 transition-all hover:shadow-xl'
            >
              <div className='flex flex-col'>
                <div className='flex justify-between'>
                  <div className='relative h-8 w-8 shadow-md md:order-last order-first mt-4 md:mt-0'>
                    <Image
                      src={event.discipline_pictogram}
                      alt={event.discipline_name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <p className='text-2xl font-bold text-gray-800 mb-2'>
                    {event.discipline_name}
                  </p>
                </div>
                <h2 className='text-lg text-gray-600 mb-2'>
                  <b>Categoria:</b> {event.detailed_event_name}
                </h2>
                <p className='text-lg text-gray-600 mb-2'>
                  <b>Data:</b> {new Date(event.start_date).toLocaleDateString()}
                </p>
                <p className='text-lg text-gray-600 mb-2'>
                  <b>Início:</b>{' '}
                  {new Date(event.start_date).toLocaleTimeString()}
                </p>
                <p className='text-lg text-gray-600 mb-2'>
                  <b>Fim:</b> {new Date(event.end_date).toLocaleTimeString()}
                </p>
                <p className='text-lg text-gray-600 mb-2'>
                  <b>Status:</b> {event.status}
                </p>
              </div>
              {/* <div className="mt-4 md:mt-0">
              {event.competitors.map((competitor) => (
                <div key={competitor.country_id} className="flex items-center mb-4">
                  <Image
                    src={competitor.country_flag_url}
                    alt={competitor.competitor_name}
                    width={32}
                    height={32}
                    className="mr-4"
                  />
                  <p className="text-lg text-gray-800"><b>{competitor.competitor_name}:</b> {competitor.result_winnerLoserTie === 'W' ? 'Vencedor' : 'Perdedor'} - {competitor.result_mark}</p>
                </div>
              ))}
            </div> */}
            </article>
          </Link>
        ))}
      </section>
      <Link className='flex items-center py-2 gap-2' href='/'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 512 512'
        >
          <path d='M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z' />
        </svg>
        Voltar
      </Link>
      <Pagination links={links} lastPage={pagination.last_page} />
    </>
  );
}

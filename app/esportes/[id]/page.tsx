import Image from 'next/image';
import Link from 'next/link';

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

async function getEventsById(id: string): Promise<Event[]> {
  const response = await fetch(
    `https://apis.codante.io/olympic-games/events?discipline=${id}`,
  );
  const data = await response.json();

  return data.data;
}

export default async function EventPage({
  params: { id },
}: {
  params: { id: string };
}) {

  const events = await getEventsById(id);

  return (
    <section className='flex flex-col container mt-16'>
      <h1 className='text-5xl text-center font-bold text-gray-800 mb-16'>
        Eventos Olímpicos de : {events[0].discipline_name}
      </h1>
      <article className='flex flex-col items-start bg-white p-6 rounded-xl shadow-md'>

      <div className='relative h-40 w-40 mb-4 self-center'>
        <Image
          src={events[0].discipline_pictogram}
          alt={events[0].discipline_name}
          fill
          className='object-cover'
        />
      </div>
      </article>
 
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
        {events.map((event) => (
          <Link href={`/eventos/${event.id}`} key={event.id}>
            <article className='hover:border-amber-300 border-2 transition-all hover:shadow-xl flex flex-col items-start bg-white p-6 rounded-xl shadow-md'>

              <p className='text-lg text-gray-600 mb-2'>
                <b>Modalidade:</b> {event.event_name}
              </p>
              <p className='text-lg text-gray-600 mb-2'>
                <b>Dia:</b> {event.day}
              </p>
              <p className='text-lg text-gray-600 mb-2'>
                <b>Hora:</b> {new Date(event.start_date).toLocaleTimeString()} -{' '}
                {new Date(event.end_date).toLocaleTimeString()}
              </p>
              <p className='text-lg text-gray-600 mb-2'>
                <b>Status:</b> {event.status}
              </p>
              <p className='text-lg text-gray-600 mb-2'>
                <b>Evento com Medalha:</b> {event.is_medal_event ? 'Sim' : 'Não'}
              </p>
              <p className='text-lg text-gray-600 mb-2'>
                <b>Evento ao Vivo:</b> {event.is_live ? 'Sim' : 'Não'}
              </p>
            </article>
          </Link>
        ))}
      </div>
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
    </section>
  );
}

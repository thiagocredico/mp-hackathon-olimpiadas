import Image from 'next/image';
import Link from 'next/link';

export type Discipline = {
  id: string;
  name: string;
  pictogram_url: string;
};

async function getDisciplines(): Promise<Discipline[]> {
  const response = await fetch(
    'https://apis.codante.io/olympic-games/disciplines',
  );
  const data = await response.json();
  return data.data;
}

export default async function DisciplinesPage() {
  const disciplines = await getDisciplines();

  return (
    <section className='flex flex-col  mt-10'>
      <h1 className='text-5xl text-center font-bold text-gray-800 mb-16'>
        Esportes Olímpicos
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {disciplines.map((discipline) => (
          <Link key={discipline.id} href={`/esportes/${discipline.id}`}>
            <article className='hover:border-amber-300 border-2 transition-all hover:shadow-xl flex flex-col items-center bg-white p-6 rounded-xl shadow-md'>
              <div className='relative h-20 w-20 mb-4'>
                <Image
                  src={discipline.pictogram_url}
                  alt={discipline.name}
                  fill
                  className='object-cover'
                />
              </div>
              <h2 className='text-2xl font-bold text-gray-800'>
                {discipline.name}
              </h2>
            </article>
          </Link>
        ))}
      </div>
      <Link className='flex items-center py-2 gap-2 mt-8' href='/'>
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

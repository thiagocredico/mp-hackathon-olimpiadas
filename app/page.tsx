import CountryCard from '@/components/country-card';
import Pagination from '@/components/pagination';
import Image from 'next/image';

export type Country = {
  id: string;
  name: string;
  continent: string;
  flag_url: string;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
  total_medals: number;
  rank: number;
  rank_total_medals: number;
  translations?: {
    por?: {
      common: string;
    };
  };
  flags?: {
    svg: string;
    alt?: string;
  };
};

export type PaginationLink = {
  url: string;
  label: string;
  active: boolean;
  id: number;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

async function getCountries(current_page: number): Promise<Country[]> {
  const response = await fetch(
    `https://apis.codante.io/olympic-games/countries?page=${current_page}`,
  );
  const data = await response.json();

  return data.data;
}

async function getPagination(): Promise<PaginationMeta> {
  const response = await fetch(
    'https://apis.codante.io/olympic-games/countries',
  );
  const data = await response.json();

  return data.meta;
}

export default async function Home({
  searchParams: { page = 1 },
}: {
  searchParams: { page?: number };
}) {
  const countries = await getCountries(page);
  const pagination = await getPagination();

  let links = pagination.links;
  links.map((link, index) => ({ ...link, id: index }));

  return (
    <>
      <h1 className="text-5xl text-center font-bold text-gray-800 mt-10">Quadro de Medalhas</h1>
      <section className='grid grid-cols-1  w-full container gap-2 mt-16'>
        <div className='flex bg-white shadow-md rounded-lg p-4 items-center justify-between text-lg'>
          <div className='flex items-center'>
            <div className='text-lg font-bold sm:mx-6'>#</div>
            <div className='w-6 sm:w-16 mx-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="25px" width="25px">
                <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z"/>
              </svg>
            </div>
            <div className=''>País</div>
          </div>
          <div className='flex items-center'>
            <div className='md:w-20 sm:w-16 w-8 hidden sm:block'>Ouro</div>
            <div className='md:w-20 sm:w-16 w-8 hidden sm:block'>Prata</div>
            <div className='md:w-20 sm:w-16 w-8 hidden sm:block'>Bronze</div>
            <div className='md:w-20 sm:w-16 w-8 hidden sm:block'>Total</div>
            <div className='md:w-20 sm:w-16 w-8 block sm:hidden'>
            <Image
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalGold_selected.svg'
              alt='Medalhas de ouro'
              width={24}
              height={24}
            />
            </div>
            <div className='md:w-20 sm:w-16 w-8 block sm:hidden'>
            <Image
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalSilver.svg'
              alt='Medalhas de prata'
              width={24}
              height={24}
            />
            </div>
            <div className='md:w-20 sm:w-16 w-8 block sm:hidden'>
            <Image
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalBronze.svg'
              alt='Medalhas de bronze'
              width={24}
              height={24}
            />
              </div>
            <div className='md:w-20 sm:w-16 w-8 block sm:hidden'>
            <Image
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalAll.svg'
              width={24}
              height={24}
              alt='Total de medalhas'
              title='Total de medalhas'
            >

            </Image>
            </div>
          </div>
        </div>

        {countries.map((country) => (
          <CountryCard
            id={country.id}
            key={country.id}
            ptName={country.translations?.por?.common || country.name}
            flag={country.flag_url}
            flagAlt={country.flags?.alt || 'Flag'}
            goldMedals={country.gold_medals}
            silverMedals={country.silver_medals}
            bronzeMedals={country.bronze_medals}
            totalMedals={country.total_medals}
            rank={country.rank}
            rankTotalMedals={country.rank_total_medals}
          />
        ))}
      </section>
      <Pagination links={links} lastPage={pagination.last_page} />
    </>
  );
}

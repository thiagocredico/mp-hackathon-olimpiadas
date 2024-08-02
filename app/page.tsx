import CountryCard from '@/components/country-card';
import Pagination from '@/components/pagination';

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
            <div className='text-lg font-bold sm:mx-6 w-6 sm:w-16'>#</div>
            <div className=''>País</div>
          </div>
          <div className='flex items-center'>
            <div className='flex md:w-20 sm:w-12 w-8'>Ouro</div>
            <div className='flex md:w-20 sm:w-12 w-8'>Prata</div>
            <div className='flex md:w-20 sm:w-12 w-8'>Bronze</div>
            <div className='flex md:w-20 sm:w-12 w-8'>Total</div>
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

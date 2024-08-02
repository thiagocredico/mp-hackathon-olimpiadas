import Image from 'next/image';
import Link from 'next/link';

type CountryCardProps = {
  id: string;
  ptName: string;
  flag: string;
  flagAlt: string;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  totalMedals: number;
  rank: number;
  rankTotalMedals: number;
};

export default function CountryCard({
  id,
  ptName,
  flag,
  flagAlt,
  goldMedals,
  silverMedals,
  bronzeMedals,
  totalMedals,
  rank,
  rankTotalMedals,
}: CountryCardProps) {
  return (
    <Link href={`/pais/${ptName}`}>
      <div className='bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:border-amber-300 border-2 transition-all hover:shadow-xl '>
        <div className='flex items-center'>
          <span className='text-lg font-bold sm:mx-6'>{rank}</span>
          <Image
            src={flag}
            alt={flagAlt}
            className='w-6 sm:w-16 h-4 sm:h-10 object-cover border-black border mx-4'
            width={160}
            height={100}
          />
          <h3 className='text-xl font-semibold hidden sm:block'>{ptName}</h3>
          <h3 className='text-xl font-semibold block sm:hidden'>{id}</h3>
        </div>
        <div className='flex items-center'>
          <div className='flex md:w-20 sm:w-12 w-8'>
            <Image
              className='w-22 sm:block object-cover'
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalGold_selected.svg'
              alt='Medalhas de ouro'
              width={24}
              height={24}
            />
            <span className='ml-2'>{goldMedals}</span>
          </div>
          <div className='flex md:w-20 sm:w-12'>
            <Image
              className=' sm:block'
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalSilver.svg'
              alt='Medalhas de prata'
              width={24}
              height={24}
            />
            <span className='ml-2'>{silverMedals}</span>
          </div>
          <div className='flex md:w-20 sm:w-12'>
            <Image
              className=' sm:block'
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalBronze.svg'
              alt='Medalhas de bronze'
              width={24}
              height={24}
            />
            <span className='ml-2'>{bronzeMedals}</span>
          </div>
          <div className='flex md:w-20 sm:w-12'>
            <Image
              className=' sm:block'
              src='https://gstatic.olympics.com/s1/t_original/static/srm/paris-2024/medalAll.svg'
              width={24}
              height={24}
              alt='Total de medalhas'
              title='Total de medalhas'
            ></Image>
            <span className='text-lg font-bold ml-2'>{totalMedals}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

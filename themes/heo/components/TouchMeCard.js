import FlipCard from '@/components/FlipCard'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 交流频道
 * @returns
 */
export default function TouchMeCard() {
  const showSocialCard = siteConfig('HEO_SOCIAL_CARD', false, CONFIG)
  if (!showSocialCard || showSocialCard === 'false') {
    return <></>
  }
  const url = siteConfig('HEO_SOCIAL_CARD_URL', null, CONFIG)
  const subTitle = siteConfig('HEO_SOCIAL_CARD_TITLE_2', null, CONFIG)

  return (
    <div className={'relative h-28 text-white flex flex-col'}>
      <FlipCard
        className='cursor-pointer lg:p-6 p-4 border rounded-xl bg-[var(--heo-color-primary)] dark:bg-[var(--heo-color-accent)] dark:border-gray-600'
        frontContent={
          <div className='h-full flex flex-col justify-center items-center select-none text-center'>
            <h2 className='font-[1000] text-3xl tracking-wide'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_1', null, CONFIG)}
            </h2>
            {subTitle ? (
              <h3 className='pt-2 text-sm opacity-80'>{subTitle}</h3>
            ) : null}
          </div>
        }
        backContent={
          url ? (
            <SmartLink href={url}>
              <div className='font-[1000] text-2xl h-full flex items-center justify-center select-none text-center'>
                {siteConfig('HEO_SOCIAL_CARD_TITLE_3', null, CONFIG)}
              </div>
            </SmartLink>
          ) : (
            <div className='font-[1000] text-2xl h-full flex items-center justify-center select-none text-center'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_3', null, CONFIG)}
            </div>
          )
        }
      />
    </div>
  )
}

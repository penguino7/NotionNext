import { ArrowRightCircle } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

export function normalizeInfoCardGreetings(value) {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean)
  }

  if (typeof value !== 'string') {
    return []
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return []
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed.replace(/'/g, '"'))
      return normalizeInfoCardGreetings(parsed)
    } catch {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    }
  }

  return [trimmed]
}

export function shouldUseInfoCardBlurAvatar(isSlugPage, avatarBlurEnabled) {
  return Boolean(isSlugPage && avatarBlurEnabled)
}

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
  const orcidUrl = siteConfig('CONTACT_ORCID')
  const orcidIcon = siteConfig('HEO_INFO_CARD_ICON_ORCID', 'fab fa-orcid', CONFIG)
  const csdnUrl = siteConfig('CONTACT_CSDN')
  const csdnIcon = siteConfig('HEO_INFO_CARD_ICON_CSDN', 'fab fa-csdn', CONFIG)
  const juejinUrl = siteConfig('CONTACT_JUEJIN')
  const juejinIcon = siteConfig(
    'HEO_INFO_CARD_ICON_JUEJIN',
    'fab fa-juejin',
    CONFIG
  )
  const avatarBlurEnabled = siteConfig(
    'HEO_INFO_CARD_AVATAR_BLUR',
    false,
    CONFIG
  )
  const useBlurAvatar = shouldUseInfoCardBlurAvatar(
    isSlugPage,
    avatarBlurEnabled
  )

  const rawAvatar = siteConfig('AVATAR') || siteInfo?.icon
  const isImageIcon =
    rawAvatar &&
    typeof rawAvatar === 'string' &&
    (rawAvatar.startsWith('http') ||
      rawAvatar.startsWith('/') ||
      rawAvatar.startsWith('data:'))
  const avatarSrc = isImageIcon ? rawAvatar : '/avatar.png'

  return (
    <Card className='wow fadeInUp bg-[var(--heo-color-primary)] dark:bg-[var(--heo-color-accent)] text-[var(--heo-color-primary-text)] flex flex-col w-72 overflow-hidden relative'>
      {/* 1. Avatar to tròn căn giữa */}
      <div className='flex justify-center items-center pt-4 pb-1'>
        <div className='cursor-pointer group relative'>
          <LazyImage
            src={avatarSrc}
            className='rounded-full object-cover w-36 h-36 border-4 border-white/50 shadow-xl group-hover:scale-105 transition-transform duration-300'
            width={144}
            height={144}
            alt={siteConfig('AUTHOR')}
          />
        </div>
      </div>

      {/* 2. Hai nút biểu tượng (About & GitHub) căn giữa */}
      <div className='flex justify-center items-center gap-4 mt-4'>
        {url1 && (
          <div className='w-10 h-10 flex items-center justify-center bg-[var(--heo-color-primary-hover)] rounded-full transition-colors duration-200 dark:bg-[var(--heo-color-accent)] dark:hover:bg-black hover:bg-white hover:text-black dark:hover:text-white'>
            <SmartLink href={url1}>
              <i className={icon1} />
            </SmartLink>
          </div>
        )}
        {url2 && (
          <div className='w-10 h-10 flex items-center justify-center bg-[var(--heo-color-primary-hover)] rounded-full transition-colors duration-200 dark:bg-[var(--heo-color-accent)] dark:hover:bg-black hover:bg-white hover:text-black dark:hover:text-white'>
            <SmartLink href={url2}>
              <i className={icon2} />
            </SmartLink>
          </div>
        )}
        {orcidUrl && (
          <div className='w-10 h-10 flex items-center justify-center bg-[var(--heo-color-primary-hover)] rounded-full transition-colors duration-200 dark:bg-[var(--heo-color-accent)] dark:hover:bg-black hover:bg-white hover:text-black dark:hover:text-white'>
            <SmartLink href={orcidUrl} title='ORCID' aria-label='ORCID'>
              <i className={orcidIcon} />
            </SmartLink>
          </div>
        )}
      </div>

      {/* 3. Dòng quote hài hước căn giữa */}
      <div className='w-full'>
        <GreetingsWords />
      </div>

      {/* 公告栏 */}
      <Announcement post={notice} style={{ color: 'white !important' }} />
    </Card>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const text3 = siteConfig('HEO_INFO_CARD_TEXT3', null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <SmartLink href={url3}>
      <div
        className={
          'group bg-[var(--heo-color-primary-hover)] dark:bg-[var(--heo-color-accent)] hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white flex items-center transition-colors duration-200 py-2 px-3 rounded-full space-x-1'
        }>
        <ArrowRightCircle
          className={
            'group-hover:stroke-black dark:group-hover:stroke-white w-6 h-6 transition-all duration-100'
          }
        />
        <div className='font-bold'>{text3}</div>
      </div>
    </SmartLink>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = normalizeInfoCardGreetings(
    siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  )
  const defaultQuote = 'Deadline tới đít vẫn còn lướt TikTok.'
  const [greeting, setGreeting] = useState(greetings[0] || defaultQuote)
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    if (greetings.length > 1) {
      const randomIndex = Math.floor(Math.random() * greetings.length)
      setGreeting(greetings[randomIndex])
    }
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className='mt-5 select-none cursor-pointer py-3 px-3.5 bg-[var(--heo-color-primary-hover)] hover:bg-[var(--heo-color-card-muted)] hover:text-[var(--heo-color-text)] dark:bg-[var(--heo-color-accent)] dark:hover:text-white dark:hover:bg-black text-sm md:text-base rounded-xl duration-200 transition-colors leading-relaxed font-semibold break-words text-center'>
      {greeting}
    </div>
  )
}

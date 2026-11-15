/* eslint-disable no-undef */
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isMobile, loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  const { theme, switchTheme } = useGlobal()
  const SUB_PATH = siteConfig('SUB_PATH', '')
  const showPet = siteConfig('WIDGET_PET') === true || siteConfig('WIDGET_PET') === 'true' || siteConfig('WIDGET_PET') === 1
  const petLink = siteConfig('WIDGET_PET_LINK') || `${SUB_PATH}/live2d/wanko/wanko.model.json`
  const petSwitchTheme = siteConfig('WIDGET_PET_SWITCH_THEME')

  useEffect(() => {
    if (showPet && !isMobile()) {
      Promise.all([
        loadExternalResource(
          `${SUB_PATH}/js/live2d.min.js`,
          'js'
        )
      ]).then(e => {
        if (typeof window?.loadlive2d !== 'undefined') {
          try {
            loadlive2d('live2d', petLink)
          } catch (error) {
            console.error('Lỗi tải mô hình Live2D Pet:', error)
          }
        }
      })
    }
  }, [theme, petLink, showPet])

  function handleClick() {
    if (petSwitchTheme) {
      switchTheme()
    }
  }

  if (!showPet) {
    return <></>
  }

  return (
    <canvas
      id='live2d'
      width='280'
      height='250'
      onClick={handleClick}
      className='cursor-grab mx-auto'
      onMouseDown={e => e.target.classList.add('cursor-grabbing')}
      onMouseUp={e => e.target.classList.remove('cursor-grabbing')}
    />
  )
}

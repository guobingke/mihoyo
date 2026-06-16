import mihoyo from '~/public/data/mihoyo.json'
import headerLinks from '~/public/data/headerlinks.json'
import bannerInfo from '~/public/data/bannerinfo.json'

export type HeaderLink = {
  title: string
  path: string
}

export type MihoyoData = typeof mihoyo
export type BannerInfo = typeof bannerInfo

export function getMihoyoData(): { value: MihoyoData } {
  return { value: mihoyo }
}

export function getHeaderLinks(): HeaderLink[] {
  return headerLinks as HeaderLink[]
}

export function getBannerInfo(): BannerInfo {
  return bannerInfo
}
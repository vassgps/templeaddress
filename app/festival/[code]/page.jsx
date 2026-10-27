import { CataloguePage, catalogueMetadata } from '@/components/phase1/CataloguePage'

export async function generateMetadata({ params }) {
  const { code } = await params
  return catalogueMetadata('listings', code, 'festival')
}

export default async function Page({ params }) {
  const { code } = await params
  return <CataloguePage kind="listings" reference={code} type="festival"/>
}

import { useEffect, useState, FC } from 'react'

import { NoSSRProps } from './'

const DefaultOnSSR = () => <></>

const HooksNoSSR: FC<NoSSRProps> = p => {
  const { children, onSSR } = p
  const [canRender, setCanrender] = useState(false)
  const OnSSR = onSSR  ? (() => <>{onSSR}</>) : DefaultOnSSR
  const OnClient = () => <>{children}</>
  useEffect(() => {
    !canRender && setCanrender(true)
  }, [canRender])
  return canRender ? <OnClient /> : <OnSSR />
}

export default HooksNoSSR
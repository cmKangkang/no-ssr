import React, { Component } from "react"
import { NoSSRProps } from './'

const DefaultOnSSR = () => <></>
class ClassNoSSR extends Component<NoSSRProps> {
  constructor(props: NoSSRProps) {
    super(props)
  }
  state = {
    canRender: false
  }
  
  componentDidMount() {}

  render() {
    const { onSSR, children } = this.props
    const OnSSR = onSSR ? (() => <>{onSSR}</>) : DefaultOnSSR
    const OnClient = () => <>{children}</>
    return (
      this.state.canRender ? <OnClient /> : <OnSSR />
    )
  }
}

export default ClassNoSSR
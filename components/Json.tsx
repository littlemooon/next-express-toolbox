import { ReactElement } from 'react'
import Text from '../components/base/Text'

export interface IJsonProps<T extends object> {
  data?: T | T[]
}

const Json: <T extends object>(
  props: IJsonProps<T>
) => ReactElement<IJsonProps<T>> = p => {
  const renderObj = (data: object) =>
    Object.entries(data).map(([k, v]) => {
      return <Text key={k} my={2}>{`${k}: ${JSON.stringify(v)}`}</Text>
    })

  return (
    <section>
      {Array.isArray(p.data)
        ? p.data.map(renderObj)
        : p.data
        ? renderObj(p.data)
        : null}
    </section>
  )
}

export default Json

import { ReactElement, useMemo } from 'react'
import theme from '../../common/theme'
import Box from './Box'
import Text from './Text'

export interface ITableProps<T> {
  data: T[]
}

const Table: <T>(props: ITableProps<T>) => ReactElement<ITableProps<T>> = p => {
  const { headers, rows } = useMemo(
    () => ({
      headers: p.data ? Object.keys(p.data[0]) : [],
      rows: p.data || [],
    }),
    [p.data]
  )

  return (
    <Box
      as="table"
      display="table"
      border="2px solid red"
      style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
    >
      <Box as="thead" bg={theme.brand}>
        <Box as="tr" border={theme.bd.primary}>
          {headers.map(key => (
            <Text key={key} as="th" color={theme.white}>
              {key}
            </Text>
          ))}
        </Box>
      </Box>
      <Box as="tbody">
        {rows.map((row: { [x: string]: any }) => (
          <Box
            key={JSON.stringify(Object.values(row))}
            as="tr"
            border={theme.bd.primary}
          >
            {headers.map(header => (
              <Text key={header} as="td">
                {row[header]}
              </Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Table

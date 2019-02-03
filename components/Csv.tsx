import { SFC, useEffect, useMemo } from 'react'
import { CSVLink } from 'react-csv'
import { FetchState } from '../common/Fetch'
import { csvFetcher } from '../common/fetchers'
import useFetch from '../common/hooks/useFetch'
import theme from '../common/theme'
import Box from './base/Box'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'
import Text from './base/Text'

export interface ICsvProps {
  filename: string
}

const Csv: SFC<ICsvProps> = props => {
  const csvFetch = useFetch(csvFetcher, {
    autoRun: false,
    additionalUrl: `/${props.filename}`,
  })

  useEffect(() => {
    if (props.filename) {
      csvFetch.get({})
    }
  }, [props.filename])

  const { headers, rows } = useMemo(() => {
    return {
      headers: csvFetch.data ? Object.keys(csvFetch.data[0]) : [],
      rows: csvFetch.data || [],
    }
  }, [csvFetch.state])
  console.log('-------------------- Csv --> ', { csvFetch, headers, rows })
  return csvFetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <CSVLink data={rows}>Download</CSVLink>
      <Spinner />
      <Box as="table">
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
    </>
  ) : csvFetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load csv file">{csvFetch.error}</ErrorBox>
  ) : (
    <Spinner />
  )
}

export default Csv

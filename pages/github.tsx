import { NextFC } from 'next'
import { SyntheticEvent, useState } from 'react'
import useDebounce from '../common/hooks/useDebounce'
import useFetch from '../common/hooks/useFetch'
import { log } from '../common/log'
import { IGithubData } from '../common/types/github'

interface IGithubProps {
  repo: string
  githubData?: IGithubData
}

const Github: NextFC<IGithubProps> = props => {
  const [repo, setRepo] = useState(props.repo)
  const debouncedRepo = useDebounce(repo, 1000)
  const github = useFetch<IGithubData>(
    `https://api.github.com/repos/${debouncedRepo}`,
    { initialData: props.githubData }
  )

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value)
  }

  const onRefresh = () => github.fetch()

  log(
    '-------------------- github --> ',
    'isServer',
    typeof window === 'undefined'
  )
  return (
    <div>
      <input value={repo} onChange={onChange} />
      <button onClick={onRefresh}>Refresh</button>
      <p>State: {github.state}</p>
      <p>Name: {github.data.name}</p>
      <p>Next stars: {github.data.stargazers_count}</p>
      <p>Error: {github.error && github.error.message}</p>
      <p>String: {JSON.stringify(github.data)}</p>
    </div>
  )
}

Github.getInitialProps = async ({ query }): Promise<IGithubProps> => {
  const repo = query.q ? query.q.toString() : 'littlemooon/dotfiles'
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`)
    const data = await res.json()
    return {
      repo,
      githubData: data,
    }
  } catch (_) {
    return { repo }
  }
}

export default Github

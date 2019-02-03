import Fetch from '../Fetch'
import { IGithubData, IGithubDataRaw } from '../types/github'

export default class FetchGithub extends Fetch<IGithubData> {
  public transformBody = async (res: Response): Promise<IGithubData> => {
    const json = (await res.json()) as IGithubDataRaw
    return {
      id: json.id,
      name: json.name,
      fullName: json.full_name,
      username: json.owner.login,
      userId: json.owner.id,
      userAvatarUrl: json.owner.avatar_url,
      description: json.description,
      url: json.url,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      pushedAt: json.pushed_at,
      size: json.size,
      stargazers: json.stargazers_count,
      openIssues: json.open_issues_count,
    }
  }
}

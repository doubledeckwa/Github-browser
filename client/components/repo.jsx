import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

import Head from './head'
import Header from './header'

import { history } from '../redux'

const Repo = ({ user, setRepo }) => {
  // const { userName } = useParams()
  const [repos, setRepos] = useState([])
  const url = `https://api.github.com/users/${user}/repos`

  const onClick = (repoPath) => {
    setRepo(repoPath)
    history.push(`/${user}/${repoPath}`)
  }

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((arr) => {
        console.log(arr)
        if (Array.isArray(arr)) {
          setRepos(arr)
        } else {
          throw new Error(JSON.stringify(arr))
        }
      })
      .catch((err) => console.log(err))
  }, [url])
  return (
    <>
      <Head title="Repositories" />
      <Header {...{ user }} />
      <table className="flex flex-col mx-4 items-center">
        <tbody>
          <tr>
            <th>Repository List</th>
          </tr>
          {repos.map((repoObj) => {
            return (
              <tr key={repoObj.id}>
                <td>
                  <button type="button" onClick={() => onClick(repoObj.name)}>{repoObj.name}</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

Repo.propTypes = {}

export default React.memo(Repo)
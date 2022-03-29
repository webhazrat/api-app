import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'

export async function getServerSideProps(context) {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLMwOy9VDYmK80BVnjTHedl1aJCR47YQMv&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`)
  const dataInfo = await res.json()
  return {
    props: { dataInfo },
  }
}

export default function Platform({ dataInfo }) {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <main className={styles.main}>
          <Link href='/'>
            <button >Home</button>
          </Link><br /><br />
          Signed in as {session.user.email} 
          <button onClick={() => signOut()}>Sign out</button>
          <h2>Youtube Playlist</h2>
          <div className={styles.grid}>
            {dataInfo.items.map((item) => {
              const {id, snippet = {} } = item
              const { title, thumbnails = {}, resourceId } = snippet
              const { medium } = thumbnails
              return (
                <a key={id} href={`https://www.youtube.com/watch?v=${resourceId.videoId}`} className={styles.card}>
                  <p>
                    <img width={medium.width} height={medium.height} src={medium.url} />
                  </p>
                  <h3>{ title }</h3>
                </a>
              )
            })}
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <main className={styles.main}>
        <Link href='/'>
          <button >Home</button>
        </Link>
        <h1 className={styles.title}>
          Welcome to <a href="http://itwindow.co">ITWINDOW APP!</a>
        </h1>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    </>
  )
}

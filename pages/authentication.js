import styles from '../styles/Home.module.css'
import Link  from 'next/link'

export default function Authentication() {
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
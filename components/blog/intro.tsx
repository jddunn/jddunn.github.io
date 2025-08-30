import styles from '../../styles/PageIntro.module.scss'

const Intro = () => {
  return (
    <section className={styles.introSection}>
      <h1 className={styles.pageTitle}>
        <span className={styles.firstLetter} data-letter="B">B</span>log
      </h1>
      <p className={styles.subtitle}>
        Some thoughts and writings of mine. <br/>
        Actually there's not much here yet.
      </p>
    </section>
  )
}

export default Intro
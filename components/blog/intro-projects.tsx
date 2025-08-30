import styles from '../../styles/PageIntro.module.scss'

const Intro = () => {
  return (
    <section className={styles.introSection}>
      <h1 className={styles.pageTitle}>
        <span className={styles.firstLetter} data-letter="P">P</span>rojects
      </h1>
      <p className={styles.subtitle}>
        Some works of mine.
      </p>
    </section>
  )
}

export default Intro
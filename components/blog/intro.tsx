const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
      <span className="text-2xl md:text-2xl lg:text-3xl red-400 inline
      tracking-tighter leading-tight md:leading-none mb-12 text-center
      text-gray-400 mr-2">
      // 
      </span>Blog
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Some thoughts and writings of mine. {' '} <br/>
        Actually there's not much here yet.
      </h4>
    </section>
  )
}

export default Intro

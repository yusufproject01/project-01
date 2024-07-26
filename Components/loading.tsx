import '../app/globals.css'

const Loading = () => {
  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <section className='w-64 h-64 flex justify-center items-center bg-white shadow-sm rounded-sm'>
        <div className="custom-loader"/>
      </section>
    </main>
  )
}

export default Loading
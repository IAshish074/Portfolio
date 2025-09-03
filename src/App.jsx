import React from 'react'

import Home from './components/Home'
import About from './components/About'
import Skill from './components/Skill'
import Work from './components/Work'
import Contact from './components/Contact'
import Navbar from './components/navbar'

const App = ()=>{

  return (
    <div className="bg-[#0a192f]">
      <section>
     <Navbar />
      </section>

      <section>
        <Home />
      </section>

      <section>
        <About />
      </section>

      <section>
        <Skill />
      </section>

      <section>
        <Work />
      </section>

      <section>
        <Contact />
      </section>
    </div>
  );
}

export default App
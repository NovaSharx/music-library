import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import { createResource as fetchData } from './helper'
import Spinner from './Spinner'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState(null)

	useEffect(() => {
		if (search) {
			setData(fetchData(search))
		}
	}, [search])

	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	const renderGallery = () => {
		if (data) {
			return (
				<Suspense fallback={<Spinner />}>
					<Gallery data={data} />
				</Suspense>
			)
		}
	}

	return (
		<div>
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <SearchBar handleSearch={handleSearch} />
              {renderGallery()}
            </>
          } />
          <Route path='/artist/:id' element={<ArtistView />} />
          <Route path='/album/:id' element={<AlbumView />} />
        </Routes>
      </Router>
    </div>
	);
}

export default App;
import { Suspense, useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
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
			<SearchBar handleSearch={handleSearch} />
			{message}
			{renderGallery()}
		</div>
	);
}

export default App;
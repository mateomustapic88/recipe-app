import './App.css';
import Recipe from './Recipe';
import React, { useEffect, useState } from 'react';

const App = () => {
	const APP_ID = '206522ba';
	const APP_KEY = 'a01399a6af58a37cf4dc415e03da15d6';

	const [recipes, setRecipes] = useState([]);

	const [search, setSearch] = useState('');

	const [query, setQuery] = useState('chicken');

	const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

	useEffect(() => {
		getRecipes();
	}, [query]);

	const getRecipes = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setRecipes(data.hits);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
		console.log(search);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	return (
		<div className='App'>
			<form onSubmit={getSearch} className='search-form'>
				<input className='search-bar' type='text' />
				<button
					className='search-button'
					type='submit'
					value={search}
					onChange={updateSearch}
				>
					Search
				</button>
			</form>
			<div className='recipes'>
				{recipes.map((recipe) => (
					<Recipe
						key={recipe.recipe.label}
						title={recipe.recipe.label}
						calories={recipe.recipe.calories}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
		</div>
	);
};

export default App;

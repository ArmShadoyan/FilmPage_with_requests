"Use strict";

const container = document.querySelector(".container");

const containerInner = document.createElement("div");
const navBar = document.createElement("div");
const content = document.createElement("div");
const tops = document.createElement("div");
navBar.classList.add("navBar");
containerInner.classList.add("containerInner");
tops.classList.add("recs");
content.classList.add("content");

const sideBarData = [
	{id:1,title:"Popular"},
	{id:2,title:"Genres"},
	{id:3,title:"Upcomming"},
	{id:4,title:"Latest"}
];


const parametrs = {
	baseUrl:"https://api.themoviedb.org/3/movie",
	imageUrl:"https://image.tmdb.org/t/p/w500",
	api_key:"ef95e7811c7ac3fdefad4ff366807024",
	filter:"popular"
};

const allFilms=[];


function craeteNavBar(){
	navBar.innerHTML =`
			<div class="logoTitle">
				<img src="/imgs/free-icon-theater-5029053.png" alt="" class="logo">
				<h2 class="title">Hot-Films</h2>
			</div>
			<div class="navLinks">
				<a class="options" href="">Options</a>
				<a class="Signup" href="">Sign up</a>
				<a class="Aboutas" href="">About us</a>
			</div>
			<div class="searchBlock">
				<input type="text" placeholder="Search for Movies" class="searchInput">
				<div class="filteredList"></div>
			</div>
	`;
	return navBar;
}

function createSideBar(){
	const sideBar = document.createElement("div");
	sideBar.classList.add("sideBar");
	sideBarData.forEach(item => {
		sideBar.innerHTML += `
		<li class="${item.title.replaceAll(' ', '')}">
			<a href="">
				<svg class="sideBarSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg>					
				<span>${item.title}</span>
			</a>
		</li>
		`;
	});
	return sideBar;
}

function createContent(recsData){
	content.innerHTML = `
	<div class="wallpaper">
		<img src="imgs/marvel.jpg" alt="" class="wallpaperImg">
	</div>
	<div class="title">
		<h2>Top Films</h2>
	</div>
	`;
	return content;
}

function reload(){
	const logoTitle = document.querySelector(".logoTitle");
	logoTitle.addEventListener("click",() => window.location.reload());
}

function createTopMoviesBlock(data){
	data.results.forEach(item => {
		console.log(item);
			tops.innerHTML += `
			<div class="rec">
				<img src=${parametrs.imageUrl + item.poster_path} alt="">
				<div class="topFilmsMiniInfo">
					<h4 class="filmTitle">${item.title}</h4>
					<div class="rates">
						<img src="/imgs/recs/star.png" alt="">
						<h4>${item.vote_average}</h4>
					</div>
				</div>
			</div>
		`;
		
	});
	return tops;
}

function topMoviesblockInfo(data){
	const tops = document.querySelectorAll(".rec");
	tops.forEach(top => {
		top.addEventListener("click",()=>{
			const fakeId = (top.lastElementChild.firstElementChild.textContent);
			console.log(data);
			data.results.forEach(film => {
				if(fakeId === film.title){
					window.scrollTo(0,0);
					createInfo(film);
				}
			});
		});
	});
}

function getMovies(parametrs, pageNum){
	const url = `${parametrs.baseUrl}/${parametrs.filter}?api_key=${parametrs.api_key}&language=en-US&page=${pageNum}&region=am`;
	return fetch(url).then(data => data.json());
}

function getImages(parametrs,imgPath){
	const url = `${parametrs.imageUrl}/${imgPath}`;
	return fetch(url);
}

function getGenres(){
	return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${parametrs.api_key}&language=en-US`)
	.then(data => data.json());
	
}

function mergeAllFilm(allFilms){
		let i  = 1;
		while(i<15){
			getMovies(parametrs,i)
			.then(data =>{
				data.results.forEach(item =>{
					allFilms.push(item);
				});
			});i++;
		}
		popularMovies(allFilms);
		createGenreslist(allFilms);
}

function search(allFilms){
	const input = document.querySelector(".searchInput");
	const filteredList = document.querySelector(".filteredList");
	input.addEventListener("input",(e)=>{
		filteredList.style.display = "block";
		const searchedItems = [];
		const value = document.querySelector(".searchInput").value;
		allFilms.forEach(film => {
			if(film.title.toUpperCase().replaceAll(' ', '').startsWith(value.toUpperCase().replaceAll(' ', ''))){
				searchedItems.push(film);
			}
		});	
			setTimeout(() => {
				filteredList.innerHTML = "";
				searchedItems.forEach(item =>{
					filteredList.innerHTML+=`
					<div class="filteredListDiv">
						<p>${item.title}</p>
					</div>
					`;
					createInfoBlock(allFilms);
				});
			}, 1000);	

			if(value === ""){
				filteredList.style.display = "none";
			}
	});
}	

function createInfoBlock(allFilms){
	const filteredList = document.querySelector(".filteredList");
	const filteredFilms = document.querySelectorAll(".filteredListDiv");
	filteredFilms.forEach(filteredFilm =>{
		filteredFilm.addEventListener("click",()=>{
			allFilms.forEach(film =>{
				if(filteredFilm.firstElementChild.textContent === film.title){
					createInfo(film);
					filteredList.style.display = "none";
					document.querySelector(".searchInput").value = "";
				}
			});
		});
	});
}

function createInfo(film){
	getImages(parametrs,film.poster_path)
	.then(data => {
		content.innerHTML = `
		<div class="infoBlockBgDiv">
			<div class="infoBlock">
			<div class = "infoImgDiv">
				<img src="${data.url}">
			</div>
				<div class="infoTextDiv">
					<div class="infoItem">
						<h4>Original Title</h4>
						<p>${film.original_title}</p>
					</div>
					<div class="infoItem">
						<h4>Summary</h4>
						<p>${film.overview}</p>
					</div>
					<div class="infoItem">
						<h4>Ratings</h4>
						<p>
							<img src="/imgs/recs/star.png">
							${film.vote_average}/10
						</p>
					</div>
					<div class="infoItem">
						<h4>Number of rates</h4>
						<p> ${film.vote_count}</p>
					</div>
				</div>
			</div>
		</div>
		
	`;	
	})

}

 function popularMovies(allFilms){

	const popularMoviesBtn = document.querySelector(".Popular");
	
	popularMoviesBtn.addEventListener("click",(e)=>{
		const popular = allFilms.filter(film => film.popularity > 60);
		e.preventDefault();
		content.innerHTML = "";
		popular.forEach(film => {
			content.innerHTML += `
				<div class="popularItems">
					<h3>${film.title}</h3>
					<div class ="popularItemsRate">
						<img src="/imgs/recs/star.png">
						<p>${film.vote_average}/10</p>
					</div>
				</div>
			`;
		});	

		popularMoviesInfo(popular);
	
	});
}

function popularMoviesInfo(popular){
	const popularItems = document.querySelectorAll(".popularItems");
	popularItems.forEach(item => {
		item.addEventListener("click",()=>{
			popular.forEach(film => {
				if(item.firstElementChild.textContent === film.title){
					content.innerHTML = "";
					window.scrollTo(0,0);
					createInfo(film);
				}
			});
		});
	});
}

function createGenreslist(allFilms){
	const genresBtn = document.querySelector(".Genres");

	genresBtn.addEventListener("click",(e)=>{
		e.preventDefault();
		content.innerHTML = `
		<div class="genresBlockTitles">
			<h3 class="genresTitle">Genres</h3>
			<h3 class="filmsTitle">Films</h3>
		</div>
		<div class="genresBlock">
			<div class="genres"></div>
			<div class="filmList"></div>
		</div>`;
		getGenres()
		.then(data => {
			data.genres.forEach(item => {
				document.querySelector(".genres").innerHTML+=`
					<div class = "genreDiv">
						<h3>${item.name}</h3>
					</div>
				`;
			});return data;
		}).then(data => {
			document.querySelectorAll(".genreDiv").forEach(genreDiv => {
				genreDiv.addEventListener("click",() => createGenresFilmList(data,allFilms,genreDiv));
			});
		});
	});
}

function createGenresFilmList(data,allFilms,genreDiv){
	const filmList = document.querySelector(".filmList");
	filmList.innerHTML = "";
	data.genres.forEach(genre => {
		if(genreDiv.firstElementChild.textContent === genre.name){
			allFilms.forEach(film => {
				if(film.genre_ids.includes(genre.id)){
					filmList.innerHTML+=`
						<div class = "genredFilm">
							<h3>${film.title}</h3>
							<img src="/imgs/recs/star.png">
							<p>${film.vote_average}/10</p>
						</div>
					`;
				}
			});
		}
	});
	console.log(document.querySelector(".genredFilm"));
	document.querySelectorAll(".genredFilm").forEach(genredFilm => {
		genredFilm.addEventListener("click",()=>{
			allFilms.forEach(film => {
				if(genredFilm.firstElementChild.textContent === film.title){
					window.scrollTo(0,0);
					createInfo(film);
				}
			});
		});
	});
	
}



function render(){
	containerInner.append(createSideBar(),createContent());
	container.append(craeteNavBar(),containerInner);
	mergeAllFilm(allFilms);
	search(allFilms);
	reload();
}
render();

getMovies(parametrs,1)
.then(data => {
	content.appendChild(createTopMoviesBlock(data)) ;
	return data;
}).then(data => {
		topMoviesblockInfo(data);
});




"Use strict";

const container = document.querySelector(".container");

const containerInner = document.createElement("div");
const navBar = document.createElement("div");
const content = document.createElement("div");
const recs = document.createElement("div");
navBar.classList.add("navBar");
containerInner.classList.add("containerInner");
recs.classList.add("recs");
content.classList.add("content");
// containerInner.appendChild(content);

const recsData = [
	{id:1,title:"Bad Guys",img:"imgs/recs/badgays.jpg",starImg:"imgs/recs/star.png",rate:"7.2/10"},
	{id:2,title:"Gray Man",img:"imgs/recs/grayman.png",starImg:"imgs/recs/star.png",rate:"8.1/10"},
	{id:3,title:"Hustle",img:"imgs/recs/hustle.png",starImg:"imgs/recs/star.png",rate:"8.3/10"},
	{id:4,title:"Krik",img:"imgs/recs/krik.png",starImg:"imgs/recs/star.png",rate:"9.0/10"},
	{id:5,title:"Lamborgini",img:"imgs/recs/lamborgini.png",starImg:"imgs/recs/star.png",rate:"8.5/10"},
	{id:6,title:"The North Man",img:"imgs/recs/thenorthman.png",starImg:"imgs/recs/star.png",rate:"6.9/10"},
	{id:7,title:"Carter",img:"imgs/recs/carter.png",starImg:"imgs/recs/star.png",rate:"8.0/10"},
	{id:8,title:"Thr Weekend Away",img:"imgs/recs/theweekendaway.jpg",starImg:"imgs/recs/star.png",rate:"8.6/10"}
];

const parametrs = {
	path:"https://api.themoviedb.org/3/movie",
	api_key:"ef95e7811c7ac3fdefad4ff366807024",
	filter:"popular"
};


function craeteNavBar(){
	navBar.innerHTML =`
			<div class="logoTitle">
				<img src="/imgs/free-icon-theater-5029053.png" alt="" class="logo">
				<h2 class="title">filmX</h2>
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
function createContainerInner(){
	containerInner.innerHTML=`
	<div class="sideBar">
					<ul>
					<li>
						<a href="">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg>					
							<span>Popular</span>
						</a>
					</li>
					<li>
						<a href="">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg>					
							<span>Top Rated</span>
						</a>
					</li>
					<li>
						<a href="">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg>					
							<span>Upcomming</span>
						</a>
					</li>
					<li>
						<a href="">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg>					
							<span>Latest</span>
						</a>
					</li>
					<li>
						<a href="">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg>					
							<span>Most Watched</span>
						</a>
					</li>
					</ul>
		</div>
	`;
	containerInner.append(createContent(recsData));
	return containerInner;
}
function createContent(recsData){
	content.innerHTML = `
	<div class="wallpaper">
		<img src="imgs/marvel.jpg" alt="" class="wallpaperImg">
	</div>
	<div class="title">
		<h2>Top Films 2022</h2>
	</div>
	`;
	recsData.forEach(item => {
		recs.innerHTML += `
		<div class="rec">
			<img src=${item.img} alt="">
			<h4 class="filmTitle">${item.title}</h4>
			<div class="rates">
				<img src=${item.starImg} alt="">
				<h4>${item.rate}</h4>
			</div>
		</div>
	`;
	});
	content.appendChild(recs);
	return content;
}
function render(){
	container.append(craeteNavBar(),createContainerInner());
	const allFilms=[];
	res(allFilms);
	search(allFilms);
	reload();
}
render();

function reload(){
	const logoTitle = document.querySelector(".logoTitle");
	logoTitle.addEventListener("click",() => window.location.reload());
}

function getDb(filter = parametrs.filter,path,api_key,pageNum){

	const url = `${path}/${filter}?api_key=${api_key}&language=en-US&page=${pageNum}&region=am`;

	return fetch(url).then(data => data.json());
}

function res(allFilms){
		let i  = 1;
		while(i<15){
			getDb(parametrs.filter,parametrs.path,parametrs.api_key,i)
			.then(data =>{
				data.results.forEach(item =>{
					allFilms.push(item);
				});
			});	i++;
		}
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
	content.innerHTML = `
	<div class="infoBlock">
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
`;	
}

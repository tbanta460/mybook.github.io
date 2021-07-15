let bookSelf = {
	id: 0,
 	title: "",
 	author: "",
 	year: 0,
 	isComplete: false,
}

const storageKey = "Storage-Key";
const textTitle = document.querySelector('#inputBookTitle');
const textAuthor = document.querySelector('#inputBookAuthor');
const textYear = document.querySelector('#inputBookYear');
const tombol = document.querySelector('.button-submit');
const inComplete = document.querySelector('#incompleteBookshelfList');
const isComplete = document.querySelector('#completeBookshelfList');
const thisButton = document.getElementById('searchSubmit');

tombol.addEventListener('click', function(){
	if(textTitle.value !== '' && textAuthor.value !== '' && textYear.value !== 0){
		const checkBox = document.querySelector('#inputBookIsComplete');
		if(checkBox.checked === true){
			bookSelf.isComplete = true
		}else {
			bookSelf.isComplete = false
		}
		const createBok = buatBuku(bookSelf)

		if(checkStorage){
			let userData = []
			if(localStorage.getItem(storageKey) === null){
				userData = []
			}
			else {
				userData = JSON.parse(localStorage.getItem(storageKey));
			}
			userData.unshift(createBok);
			localStorage.setItem(storageKey, JSON.stringify(userData))
		}

		createBook()
		const allInput = document.querySelectorAll('.input input')
		allInput.forEach(input => {
			input.value = ''
		})
	}else {
		alert('Tolong isi semua text')
	}
	})


function buatBuku (bookSelf){
	bookSelf.title = textTitle.value;
	bookSelf.author = textAuthor.value;
	bookSelf.year = textYear.value;
	let timestamp = new Date().getTime();
	bookSelf.id = timestamp
	return bookSelf
}


function createBook(){
	let bookSelf = onlyOne()
	let artikel = document.createElement('article');

	artikel.innerHTML += `<h1>${bookSelf.title}</h1>
						<p>${bookSelf.author}</p>
						<p>${bookSelf.year}</p>
						<div><button class="green">Sudah Dibaca</button>
						<button class="red">Belum Dibaca</button>
						<button class="deleted">Hapus Buku</button></div>`
		
	if(bookSelf.isComplete === true ){
		isComplete.appendChild(artikel)
	}
	else {
		inComplete.appendChild(artikel)
	}
}

const handleButton = document.querySelectorAll('.book_list');
handleButton.forEach(button => {
	button.addEventListener('click', function(e){
	const target = e.target.parentNode.parentNode
	let targetName = e.target.parentNode.parentNode.firstChild.innerHTML
	const changeStorage = JSON.parse(localStorage[storageKey])
		if(e.target.classList.contains('green')){
			changeStorage.forEach(data => {
				if(data.title === targetName && data.isComplete === false){
					data.isComplete = true;
					isComplete.append(target)
				}
			})
			localStorage.setItem(storageKey, JSON.stringify(changeStorage));
		}
		else if(e.target.classList.contains('red')){
			changeStorage.forEach(data => {
				if(data.title === targetName && data.isComplete === true){
					data.isComplete = false;
					inComplete.append(target)
				}
			})
			localStorage.setItem(storageKey, JSON.stringify(changeStorage))
		}
		else if(e.target.classList.contains('deleted')){
			const changeDataStorage = deleteStorage(changeStorage,target);
			localStorage.setItem(storageKey, JSON.stringify(changeDataStorage));
			target.style.display = 'none';
		}
	})
})

const checkStorage = () => {
	return typeof(Storage) !== "undefined"
}

const getUser = () => {
	if(checkStorage()){
		return JSON.parse(localStorage.getItem(storageKey)) || [];
	} 
	else {
		return [];
	}
}

const onlyOne = () => {
	const myBook = getUser();
	if(checkStorage()){
		for(let i = 0; i < myBook.length; i++){
			console.log(myBook[i])
			return myBook[0]
		}
	}
	else {
		return [];
	}
}

function createAllBook (bookSelf){
	bookSelf.forEach(bookSelf => {
		let artikel = document.createElement('article');
		artikel.innerHTML += `<h1>${bookSelf.title}</h1>
					<p>${bookSelf.author}</p>
					<p>${bookSelf.year}</p>
					<div><button class="green">Sudah Dibaca</button>
					<button class="red">Belum Dibaca</button>
					<button class="deleted">Hapus Buku</button></div>`
		
		if(bookSelf.isComplete === true ){
			isComplete.appendChild(artikel)
		}
		else {
			inComplete.appendChild(artikel)
		}
	})

	
}
const deleteStorage = (data, target) => {
	const filterData = data.map(newData => {
								return newData
						}).filter(fillData => {
							if(fillData.title !== target.firstChild.innerHTML){
								return fillData
							}
						})
	return filterData
}

thisButton.addEventListener('click',function(){
	filterBook();
})
const filterBook = () => {
	const inputValue = document.querySelector('#searchBookTitle')
	const newInputValue = inputValue.value.toUpperCase();
	const getList = Array.from(document.querySelectorAll('.book_list article'));
	
	getList.forEach(data => {
		const getText = data.firstChild.innerHTML;
		if(getText.toUpperCase().indexOf(newInputValue) > -1){
			data.style.display = ''
		}
		else {
			data.style.display = 'none'
		}
	})
}

window.addEventListener("load", function(){
	if (checkStorage()) {
		if (localStorage.getItem(storageKey) !== null){
				const userData = getUser();
				createAllBook(userData);
			}
	}else{
		alert("Browser yang Anda gunakan tidak mendukung Web Storage")
	}
});

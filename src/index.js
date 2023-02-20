const generateItem = function(user){
	return `<li class="flex py-4 first:pt-0 last:pb-0">
		<img src="${user.avatar}" alt="" class="h-10 w-10 rounded-full">
		<div class="ml-3 overflow-hidden">
			<p class="text-sm font-medium text-slate-900">${user.name}</p>
			<p class="text-sm text-slate-500 truncate">${user.email}</p>
		</div>
	</li>`
}

const generateTableRow = function(user){
	return `
	<tr class="odd:bg-white even:bg-slate-50">
		<td class="px-6 py-3 text-left text-sm font-medium text-slate-900 whitespace-nowrap">${user.name}</td>
		<td class="px-6 py-3 text-left text-sm font-normal text-slate-600 whitespace-nowrap">${user.company.bs}</td>
		<td class="px-6 py-3 text-left text-sm font-normal text-slate-600 whitespace-nowrap">${user.email}</td>
	</tr>
	`
}

const generateInRow = function(user){
	return `
		<li class="flex p-3 group/item justify-between items-center rounded-xl hover:bg-slate-100 relative gap-4">
			<div class="flex gap-1">
				<img src="${user.avatar}" alt="" class="h-10 w-10 rounded-full">
				<div class="ml-3 overflow-hidden">
					<p class="text-sm font-medium text-slate-900 ">${user.name}</p>
					<p class="text-sm text-slate-500 truncate">${user.email}</p>
				</div>
			</div>
			<a href="#" class="group/edit hover:bg-slate-200 invisible group-hover/item:visible w-20 flex items-center text-center px-2 rounded-lg justify-center py-0.5">
				<span class="group-hover/edit:text-gray-700 text-sm text-slate-500 font-medium"> Call</span>
				<svg class="mt-px h-5 w-5 text-slate-400 transition group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
				</svg>
			</a>
		</li>
	`
}

async function fetchUsers(){
	var response = await fetch("https://jsonplaceholder.typicode.com/users");
	let data = await response.json()
    return data;
};

function render(users){
	var html = '';
	var body = '';
	var invisible = "";
	users.forEach(user => {
		user.avatar = `./assets/avatars/avatar${Math.floor(Math.random() * 3) + 1}.png`;
		html += generateItem(user);
		body += generateTableRow(user);
		invisible += generateInRow(user);
	});
	document.getElementById('list-users').innerHTML = html;
	document.getElementById('js-table-body').innerHTML = body;
	document.getElementById('list-call').innerHTML = invisible;
}

if (localStorage.getItem("users")){
	users = JSON.parse(localStorage.getItem("users"));
	render(users);
} else {
	var users = fetchUsers().then(data => render(data));
}
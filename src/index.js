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

async function fetchUsers(){
	var response = await fetch("https://jsonplaceholder.typicode.com/users");
	let data = await response.json()
    return data;
};

function render(users){
	var html = '';
	var body = '';
	users.forEach(user => {
		user.avatar = `./assets/avatars/avatar${Math.floor(Math.random() * 3) + 1}.png`;
		html += generateItem(user);
		body += generateTableRow(user);
	});
	document.getElementById('list-users').innerHTML = html;
	document.getElementById('js-table-body').innerHTML = body;
}

if (localStorage.getItem("users")){
	users = JSON.parse(localStorage.getItem("users"));
	render(users);
} else {
	var users = fetchUsers().then(data => render(data));
}
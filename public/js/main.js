var xhr = new XMLHttpRequest();
// Setup our listener to process completed requests
xhr.onload = function () {
	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// This will run when the request is successful
		console.log('success!', xhr);
	} else {
		// This will run when it's not
		console.log('The request failed!');
	}
};
// make the delete request to /delete
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-recipe').forEach(btn => {
        btn.addEventListener('click', e =>{
            let id = e.currentTarget.getAttribute('data-id');
            console.log(id);
            let url = `/delete/${id}`
            if(confirm('Really delete recipe?')){
                xhr.open('DELETE', url);
                xhr.send();
                console.log('delete request sent');
                window.location.href = '/';
            }
        });
    });
});

// make the edit request to /edit
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.edit-recipe').forEach(btn => {
        btn.addEventListener('click', e =>{
            let id = e.currentTarget.getAttribute('data-id');
            let name = e.currentTarget.getAttribute('data-name');
            let ingredients = e.currentTarget.getAttribute('data-ingredients');
            let directions = e.currentTarget.getAttribute('data-directions');

            let url = `/edit/${id}`

            // fill out modal form with values
            document.querySelector('#edit-form-id').value = id;
            document.querySelector('#edit-form-name').value = name;
            document.querySelector('#edit-form-ingredients').value = ingredients;
            document.querySelector('#edit-form-directions').value = directions;
        });
    });
});


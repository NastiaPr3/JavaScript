fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const mainDiv = document.getElementsByClassName('mainDiv')[0];
        for (const user of users) {
            const div = document.createElement('div');
            div.classList.add('userBlock')
            const text = document.createElement('div');
            text.innerText = `${user.id} - ${user.name}`;
            text.classList.add('txt')
            div.append(text);
            div.classList.add('userDiv');

            const btn = document.createElement('a');
            btn.innerHTML = '<input type="button" value="Click me">';
            btn.setAttribute('href', 'user-details.html');
            btn.onclick = function () {
                localStorage.setItem('myUser', JSON.stringify(user))
            }
            div.append(btn);
            mainDiv.append(div)
        }

    });
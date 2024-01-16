let userJson = localStorage.getItem('myUser');
let chosen = JSON.parse(userJson);
let chosenBlock = document.getElementsByClassName('chosen')[0];

for (const key in chosen) {
    let divUser = document.createElement('div');

    if (typeof chosen[key] != "object") {
        divUser.innerText = `${key} : ${chosen[key]}`;
    } else {
        divUser.innerText = `${key}:`

        for (const divUserKey in chosen[key]) {
            const innerDiv = document.createElement('div');
            innerDiv.classList.add('address')

            if (typeof chosen[key][divUserKey] !== "object") {
                innerDiv.innerText = `${divUserKey} : ${chosen[key][divUserKey]}`;
            } else {
                innerDiv.innerText = `${divUserKey}:`;

                for (const innerDivKey in chosen[key][divUserKey]) {
                    const item = document.createElement('div');
                    item.classList.add('geo')
                    item.innerText = `${innerDivKey} : ${chosen[key][divUserKey][innerDivKey]}`
                    innerDiv.append(item);
                }
            }
            divUser.append(innerDiv)

        }
    }
    chosenBlock.append(divUser);
}
const btn = document.createElement('button');
btn.innerText = "Post of current user";
btn.classList.add('button')
chosenBlock.append(btn);

btn.onclick = () => {

    fetch(`https://jsonplaceholder.typicode.com/users/${chosen.id}/posts`)
        .then(value => value.json())
        .then(posts => {
            const postTitle = document.createElement('div');
            postTitle.classList.add('block-post');
            chosenBlock.append(postTitle)

            for (const post of posts) {
                const postDiv = document.createElement('div');
                postDiv.innerText = `${post.title}`;
                postDiv.classList.add('post')
                postTitle.append(postDiv)
                btn.disabled = true;

                const secondButton = document.createElement('a');
                secondButton.innerHTML = '<input type="button" value="Click me">';
                secondButton.setAttribute('href', 'post-details.html');
                secondButton.classList.add('btn')
                secondButton.onclick = () => {
                    localStorage.setItem('myPost', JSON.stringify(post))
                }
                postDiv.append(secondButton)
            }

        })

}
let postJson = localStorage.getItem('myPost');
let chosen = JSON.parse(postJson);
let chosenBlock = document.getElementsByClassName('post')[0];

for (const item in chosen) {
    const userPost = document.createElement('div');

    if (typeof chosen[item] != "object") {
        userPost.innerText = `${item} : ${chosen[item]}`;
        userPost.classList.add('user-post')
    }
    chosenBlock.append(userPost);
}

fetch(`https://jsonplaceholder.typicode.com/posts/${chosen.id}/comments`)
    .then(value => value.json())
    .then(comments => {
        const userComment = document.createElement('div');
        userComment.classList.add('user-comment')
        for (const comment of comments) {
            const innerBlock = document.createElement('div')
            innerBlock.classList.add('inner-block')
            for (const item in comment) {
                const itemBlock = document.createElement('div')
                if (typeof comment[item] != "object") {
                    itemBlock.innerText = `${item} : ${comment[item]}`;
                    itemBlock.classList.add('item-block')
                    innerBlock.append(itemBlock);
                }
                userComment.append(innerBlock)
            }
        }
        document.body.append(userComment);
    })
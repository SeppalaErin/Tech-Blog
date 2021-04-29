const newFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#post-content').value.trim();
    const id = document.querySelector('#post_id').value

    if (content) {
        console.log(content);
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                content,
                post_id: id,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            console.log(response);
            document.location.reload();


        } else {
            alert("failed to create comment")
        }
    } else {
        alert("You need to write a comment before posting!")
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
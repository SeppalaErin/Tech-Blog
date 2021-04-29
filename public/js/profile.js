const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  } else {
    alert("Please make sure you have entered a title and contents for this post");
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id') && event.target.id === "delete") {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE',
    });

    console.log(response.status);

    if (response.status === 200) {
      document.location.replace('/profile');
    } else {
      console.log(response.status);
      alert('Failed to delete project');
    }
  }
};

const updateButtonHandler = async (event) => {

  // event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (event.target.hasAttribute('data-id') && event.target.id === "update") {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content })
    });

    if (response.status === 200) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', updateButtonHandler);
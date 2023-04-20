# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./public/desktop-preview.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- T[ailwindCSS](https://tailwindcss.com/)
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

This project was full of suprises and fun. I learned so many things like theme changer, filtering data e.t.c Below are some code snippets that will showcase how I had so much fun.

To see how you can add code snippets, see below:

```css
:root {
  --bg-color: #FAFAFA;
  --text-color: #393A4C;
  --completed: #D2D3DB;
  --white: hsl(0, 0%, 100%);
  --border: #E4E5F1;
}

[data-theme = 'dark'] {
  --bg-color: #161722;
  --white: #25273C;
  --text-color: #777A92;
  --completed: #D2D3DB;
  --border: #393A4C;
  
}
```
```js
const addTodoItem = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() !== "") {
        setTodoList([...todoList, {
            name: inputRef.current.value,
            complete: false
        }])
    }
    inputRef.current.value = "";
  };

  // Delete a todo item
  const deleteTodoItem = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  // Mark complete todo
  const markTodoItem = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].complete = !newTodoList[index].complete;
    setTodoList(newTodoList);
  };

  // Clear completed todo
  const clearCompleted = () => {
    const newTodos = todoList.filter((todo) => !todo.complete);
    setTodoList(newTodos);
  }; 

  // filter todo
  const filterHandler = (todo) => {
    if (filter === 'all') {
        return true
    } 
    else if (filter === 'active'){
        return !todo.complete
    }
    else if (filter === 'completed'){
        return todo.complete
    } 
  }
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.


### Continued development

I encountered some difficulties in implementing the drag and drop feature to reoganise my todo items. 

I believe after researching how to do this. I will proceed in completing my challenge.


### Useful resources

- [Local Storage in React](https://www.robinwieruch.de/local-storage-react/) - This helped me for the local storage feature I wanted to implemented. I consume the infomation here and will use it going forward.
- [Prop Drilling](https://kentcdodds.com/blog/prop-drilling) - This is an amazing article which helped me finally understand prop drilling in react. I'd recommend it to anyone still learning this concept.


## Author

- Frontend Mentor - [@yannmarc](https://www.frontendmentor.io/profile/yannmarc)
- Twitter - [@ninja_frontend](https://www.twitter.com/ninja_frontend)

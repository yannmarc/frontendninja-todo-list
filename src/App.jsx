import React, { Fragment, useState, useRef, useEffect} from "react";

import bgMobile from "./img/bg-mobile-light.jpg";
import bgDesktop from "./img/bg-desktop-light.jpg";
import bgDesktopDark from './img/bg-desktop-dark.jpg';
import bgMobileDark from './img/bg-mobile-dark.jpg';

import iconMoon from "./img/icon-moon.svg";
import iconCross from "./img/icon-cross.svg";
import iconCheck from "./img/icon-check.svg";
import iconSun from './img/icon-sun.svg';

const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [bgImage, setBgImage] = useState(bgDesktop);
  const [theme, setTheme] = useState('light');


  const inputRef = useRef();

  const filterBtns = [ "All", "Active", "Completed" ]

  // Add new todo
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
    const todo = document.querySelector('.mark-todo');
    todo.addEventListener("onclick", (e) => {
        todo.classList.add("active")
        if(todo.className === "active") {
            todo.classList.remove("active");
        }
    })
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

  // handling the theme
  const handleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
    handleResize()
  }
  // handle resize
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024 && theme === 'light') {
        setBgImage(bgDesktopDark)
    } else if (windowWidth <= 768 && theme === 'dark') {
        setBgImage(bgDesktop)
    }

    else if (windowWidth <= 768 && theme === 'light') {
        setBgImage(bgMobileDark);
    } else {
        setBgImage(bgDesktop)
    }
  }

  // initializing the onDrag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index)
  }

  // initializing the dragover 
  const handleDragOver = (e, index) => {
    e.preventDefault();
  }

  // handling the dragged items and sorting them
  const handleDragedItem = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newTodoList = [...todoList];
    const draggedTodo = newTodoList[draggedIndex];
    newTodoList.splice(draggedIndex, 1);
    newTodoList.splice(index, 0, draggedTodo);
    setTodoList(newTodoList);
  }
  

  useEffect(() => {
    const handleResize = () => {
        let width = window.innerWidth;
        if (width >= 1024 && theme === 'light') {
            setBgImage(bgDesktop)
        }
        else if( width >= 1024 && theme === 'dark') {
            setBgImage(bgDesktopDark)
        }   
        else if (width <= 768 && theme === 'light') {
            setBgImage(bgMobile);
        } else {
            setBgImage(bgMobileDark)
        }
    }

    window.addEventListener("resize", handleResize)
  
    return () => {
      window.addEventListener("resize", handleResize)
    }
  }, [theme])
  

  const countCompleted = todoList.filter((todo)=>!todo.complete).length

  return (
    <Fragment>
      <div className="relative App" data-theme={theme}>
        <img
          src={bgImage}
          alt="bg light mobile"
          className="absolute top-0 left-0 w-screen h-[200px] lg:h-[300px] object-cover bg-center"
        />
        <div className="relative z-10 max-w-lg mx-auto">
          <header className="pt-12 lg:py-[77px]">
            <div className="px-5 py-[0px]">
              <div className="flex items-center justify-between mb-[16px]">
                <h1 className="font-bold text-[30px] tracking-widest text-white">TODO</h1>
                <span onClick={handleTheme} className="cursor-pointer"><img src={theme === 'light' ? iconMoon : iconSun} alt="icon moon" /></span>
              </div>
              <form action="" onSubmit={(e) => addTodoItem(e)}>
                <div className="py-[14px] rounded-[4px] add-todo flex w-full items-center px-8">
                  <span className="block w-[24px] small-ring h-[24px] rounded-full border-2 border-slate-100"></span>
                  <input
                    type="text"
                    ref={inputRef}
                    placeholder="Create new todo..."
                    className="font-bold placeholder:font-semibold placeholder:text-slate-500 border-0 bg-transparent translate-x-[25px] focus:outline-none caret-blue-500 text-[12px] lg:w-[85%]"
                  />
                </div>
              </form>
            </div>
          </header>
          <div className="mt-4 lg:mt-[-20px] px-5">
            <div className="todo-item rounded-[4px] overflow-hidden">
                {todoList.filter(filterHandler).map((todo, index) => (
                    <div
                    className=" border-b-2 hover:cursor-move todo-border py-4 flex items-center px-6 last:border-b-transparent justify-between"
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDragedItem(e, index)}
                    >
                    <div className="flex items-center">
                        <button
                        className="mark-todo w-[24px] h-[24px] rounded-full flex justify-center items-center border-2 small-ring"
                        onClick={() => markTodoItem(index)}
                        style={
                            todo.complete
                            ? {
                                background: "linear-gradient(97.91deg, #57DDFF 6.1%, #C058F3 95.6%)",
                                backgroundImage: "linear-gradient(97.91deg, #57DDFF 6.1%, #C058F3 95.6%);",
                                borderWidth: "2px",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                overflow: "hidden",
                                borderRadius: "50%",
                                }
                            : { textDecoration: "initial" }
                        }>{todo.complete ? <img src= {iconCheck} alt="check icon"/> : ""}</button>
                        <p
                        className="text-slate-500 text-[12px] font-bold translate-x-3"
                        style={
                            todo.complete
                            ? { textDecoration: "line-through", color: "#D2D3DB" }
                            : { textDecoration: "initial" }
                        }>
                        {todo.name}
                        </p>
                    </div>
                    <span className="w-[12px] h-[12px]" onClick={() => deleteTodoItem(index)}>
                        <img
                        src={iconCross}
                        alt="iconCross"
                        className="w-[inherit]"
                        />
                    </span>
                    </div>
                ))}
                { todoList.length > 0 ? <div className="text-slate-500 config text-[12px] flex justify-between py-4 px-6">
                    <span>{countCompleted} items left</span>
                    <button onClick={clearCompleted}>Clear completed</button>
                </div> : ""}
            </div>
          </div>

          <footer className="px-5 ">
            <div className="flex py-4 todo-item rounded-[4px] justify-center items-center gap-3 mt-[15px]">
                {
                    filterBtns.map((item) => (
                        <button key={item} className={item.toLocaleLowerCase() === filter ? "text-[12px] font-semibold text-blue-500" : "text-[12px] font-semibold"} onClick={() => setFilter(item.toLocaleLowerCase())}>{item}</button>
                    ))
                }
            </div>
            <div className="py-4 text-center bg-zinc-100 text-slate-700 font-semibold mt-7 text-[12px] md:text-[14px] lg:text-base">
                <p>Proudly implemented by <a href="twitter.com/ninja_frontend">@ninja_frontend 🇨🇲</a></p>
            </div>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export default App;

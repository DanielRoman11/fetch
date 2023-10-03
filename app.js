import { newArticle } from "./components/index.js";

export const API_URL = "https://employeeapp-lw7c.onrender.com/api/employees";

const content = document.getElementById("content");


const methods = ["post", "patch"]


//* Get
export async function fetchEmployees(id) {
  id === undefined ? id = "" : id
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
}

fetchEmployees().then(employee => {
  if(Object.keys(employee) === 0) return content.textContent('Employees list is empty');

  employee.map(e => {
    const { id, name, salary } = e;   
    const a = newArticle(id, name, salary)

    content.appendChild(a);
  });
});

//* Post
export let form = document.getElementById("addEmployee");

form.onsubmit = async e => {
  e.preventDefault();
  
  try {
    const formulario = new FormData(form);
    
    const id = document.getElementById("")
    const nombre = formulario.get("name");
    const salario = formulario.get("salary");
    
    
    console.log(id);
    console.log(nombre);
    console.log(salario);
    
    if(nombre === "" || salario === ""){
      const section = document.createElement("div");
      section.classList.add("error");
      const error = document.createElement("p");
      error.textContent = "Todos los campos son necesarios"
      
      section.appendChild(error)

      
      const content = document.getElementById("addEmployee");
      content.appendChild(section);
      
      return setTimeout(() => {
        section.remove();
      }, 3000)
    }
    
    const values = {
      name: nombre,
      salary: salario
    }
    form.reset();

    if(form.method === methods[0]){
      return await fetch(`${API_URL}`, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
    }
    if(form.method === methods[1]){
      return await fetch(`${API_URL}/${id}`, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(values),
      });
    }
  } catch (error) {
    console.error('There was an error: ', error);
  }
}

//* Update
export async function requestPatch(id) {
  try {
    form.method = "PUT";
    
    const formulario = new FormData(form);

    let nombre = formulario.get("name");
    let salario = formulario.get("salary");
    
    const values = {
      name: nombre,
      salary: salario
    }


    if(nombre === "" || salario === ""){
      const section = document.createElement("div");
      section.classList.add("error");
      const error = document.createElement("p");
      error.textContent = "Todos los campos son necesarios"

      section.appendChild(error)

      const content = document.getElementById("addEmployee");
      content.appendChild(section);
    }

    const errorE = document.querySelector(".error");

    if(errorE) errorE.remove()


    form.reset();

    await fetch(`${API_URL}/api/employees/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(values)
    });

    form.method = "POST";
  } catch (error) {
    console.error(error);
  }
}

//* Delete


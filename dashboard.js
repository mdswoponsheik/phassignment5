 
 const labelsElement = (arr) => {
   const labelsColor = arr.map((data) => {
    if(data === "bug") return "bg-red-100 text-red-500";
    if(data === "help wanted") return "bg-blue-100 text-blue-500";
    if(data === "good first issue") return "bg-yellow-100 text-yellow-500";
    if(data === "documentation") return "bg-purple-100 text-purple-500";
    if(data === "enhancement") return "bg-green-100 text-green-500";
   });
   console.log(labelsColor);
         
    const mapping = arr.map((lab) => `<button class="btn text-xl   ${labelsColor} rounded-4xl ">${lab}</button>`);console.log(mapping);
    return mapping.join(" ");


 };
  

//  remove color of non selected button 

 const remover = () => {
    const removerBtn = document.querySelectorAll(".remove")
    removerBtn.forEach((btn) => btn.classList.remove("active"));
 }


//  loading spinner 
  const manageLoading = (states) => {
    if(states == true){
        document.getElementById("losding").classList.remove("hidden");
        document.getElementById("issues-container").classList.add("hidden");
    }
    else{
         document.getElementById("issues-container").classList.remove("hidden");
        document.getElementById("losding").classList.add("hidden");
    }
  }






    // modal 

 const loadMolad = async (id) => {
    const url = ` https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res =await fetch(url);
    const detail = await res.json();
    displayModal(detail.data);
 }
  displayModal = (word) =>{
    console.log(word);
    const boxModal =document.getElementById("detail-container");
    boxModal.innerHTML =`
         
                <h2 class="text-3xl font-bold" >${word.title}</h2>
                <div class="flex items-center space-x-8 text-xl">
                    
                    <button class="btn text-white bg-green-600 rounded-4xl">${word.status}</button>
                    <li>${word.status}ed</li>
                    <li>11/03/2026</li>
                </div>
                <div class="">
                    <div class="flex gap-3 m-5">
                    <div>
                        ${labelsElement(word.labels)}
                    </div>
                    

                </div>
                <p class="text-2xl">${word.description}</p>
                </div>
                <div class="flex bg-gray-100 rounded-xl p-3">
                    <div class="w-1/2">
                        <h3 class="text-gray-300">assigenee:</h3>
                        <h3 class="text-gray-400">${word.author}</h3>
                    </div>
                    <div class="w-1/2">
                        <h3>priority:</h3>
                        <button class="btn text-xl   text-white bg-red-400 rounded-4xl ">${word.priority}</button>
                    </div>
                </div>
                <div class="flex ">    
                    <div class="w-1/2">CreatedAt :<br>${word.createdAt}</div>
                    <div class="w-1/2">UpdatedAt :<br>${word.updatedAt}</div>
                 </div>
    `

    document.getElementById("my_modal_5").showModal();
  }



// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"

 
    // All button 
 
 const loadAll = () => {
           manageLoading(true);
            fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then((res) => res.json())
            .then((json) => {
                const clickbtn = document.getElementById("loadAll")
                remover();
                clickbtn.classList.add("active");
                
                document.getElementById("box-counter").innerText = json.data.length;
                displayAll(json.data)
            });
        };



        const displayAll = (alls) => {
           const issuesContainer =document.getElementById("issues-container")
           issuesContainer.innerHTML ="";

           for(let all of alls){
                
                let color = all.status ===  "open" ?
                "green-500" : "purple-500";
           
                
                let priorityColor = all.priority ===  "high" ?
                "red-200" : "purple-200";

                     const allDiv =document.createElement("div");
                allDiv.innerHTML= `
               <div class="rounded-2xl shadow-2xl p-3  border-t-8 border-t-${color} ">
                <div class="flex justify-between m-5">
                    <img class="w-10" src="./assets/Open-Status.png"   alt="">
                <button class="btn  text-red-500  rounded-3xl bg-${priorityColor} "> ${all.priority} </button>
                <!-- <button class="btn  text-[#9CA3AF] bg-[#EEEFF250] rounded-4xl ">low</button> -->
                </div>
                <div class="mx-5">
                      <div class="">
                    <h2 onclick="loadMolad(${all.id})" class="text-4xl font-bold my-auto mb-3"> ${all.title} </h2>
                    <p> ${all.description} </p>
                </div>
                <div class="flex gap-3 m-5">
                    
                    <div>

                       ${labelsElement(all.labels)}
                    </div>
                    <!-- <div>

                        <button class="btn text-[#00A96E] bg-[#BBF7D050] rounded-4xl">help wafdsf</button>
                    </div> -->

                </div>
                </div>
                <hr>
                <div>
                    <div class="p-5 space-y-2">
                    <p> ${all.author} </p>
                    <p>${all.createdAt} </p>
                </div>
                </div>
             </div>

                `;

                issuesContainer.appendChild(allDiv);
           };
         manageLoading(false);
        };
        loadAll();






        // OPEN  

        const loadOpen = () => {
           manageLoading(true);
            fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then((res) => res.json())
            .then((data) => {
                const clickbtn = document.getElementById("loadOpen")
                remover();
                clickbtn.classList.add("active");
                const openIssues = data.data.filter(all => all.status === "open");
                document.getElementById("box-counter").innerText = openIssues.length;
                displayOpen(openIssues);
            });
        };

        const displayOpen = (opens) => {
           const issuesContainer =document.getElementById("issues-container")
           issuesContainer.innerHTML ="";

           for(let open of opens){
                
                const openDiv =document.createElement("div")
                openDiv.innerHTML= `
                <div class="rounded-2xl shadow-xl border-t-8 border-t-green-500 p-3 h-100">
                <div class="flex justify-between m-5">
                    <img class="w-10" src="./assets/Open-Status.png" alt="">
                <button class="btn  text-red-500 bg-[#FECACA50] rounded-3xl "> ${open.priority} </button>
                <!-- <button class="btn  text-[#9CA3AF] bg-[#EEEFF250] rounded-4xl ">low</button> -->
                </div>
                <div class="mx-5">
                      <div class="">
                    <h2 onclick="loadMolad(${open.id})" class="text-4xl font-bold my-auto mb-3"> ${open.title} </h2>
                    <p> ${open.description} </p>
                </div>
                <div class="flex gap-3 m-5">
                    <div>
                        ${labelsElement(open.labels)}
                    </div>
                    <!-- <div>

                        <button class="btn text-[#00A96E] bg-[#BBF7D050] rounded-4xl">help wafdsf</button>
                    </div> -->

                </div>
                </div>
                <hr>
                <div>
                    <div class="p-5 space-y-2">
                    <p> ${open.author} </p>
                    <p>${open.createdAt} </p>
                </div>
                </div>
             </div>
                `;

                issuesContainer.appendChild(openDiv);
           };
         manageLoading(false);
        };





        // Closed 

        const loadClosed = () => {
           manageLoading(true);
            fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then((res) => res.json())
            .then((data) => {
                const clickbtn = document.getElementById("loadClosed")
                remover();
                clickbtn.classList.add("active");
                const openIssues = data.data.filter(all => all.status === "closed");
                document.getElementById("box-counter").innerText = openIssues.length;
                displayClosed(openIssues);
            });
        };

        const displayClosed = (closeds) => {
           const issuesContainer =document.getElementById("issues-container")
           issuesContainer.innerHTML ="";

           for(let closed of closeds){
                
                const closedDiv =document.createElement("div")
                closedDiv.innerHTML= `
                <div class="rounded-2xl shadow-xl border-t-8 border-t-purple-500 p-3 h-100">
                <div class="flex justify-between m-5">
                    <img class="w-10" src="./assets/Open-Status.png" alt="">
                <button class="btn  text-red-500 bg-[#FECACA50] rounded-3xl "> ${closed.priority} </button>
                <!-- <button class="btn  text-[#9CA3AF] bg-[#EEEFF250] rounded-4xl ">low</button> -->
                </div>
                <div class="mx-5">
                      <div class="">
                    <h2 onclick="loadMolad(${closed.id})" class="text-4xl font-bold my-auto mb-3"> ${closed.title} </h2>
                    <p> ${closed.description} </p>
                </div>
                <div class="flex gap-3 m-5">
                    <div>     
                        ${labelsElement(closed.labels)}              
                     </div>
                    <!-- <div>

                        <button class="btn text-[#00A96E] bg-[#BBF7D050] rounded-4xl">help wafdsf</button>
                    </div> -->

                </div>
                </div>
                <hr>
                <div>
                    <div class="p-5 space-y-2">
                    <p> ${closed.author} </p>
                    <p>${closed.createdAt} </p>
                </div>
                </div>
             </div>
                `;

                issuesContainer.appendChild(closedDiv);
           };
           manageLoading(false);
        };

        
       document.getElementById("search-btn").addEventListener("click", ()=>{
        const input =document.getElementById("search-input").value.trim().toLowerCase();
        

        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            const allSearchs = data.data;
            filterSearchs =allSearchs.filter((search) => search.title.toLowerCase()
        .includes(input)
            );

            // document.getElementById("box-counter").innerText = json.data.length;
            displayAll(filterSearchs);
            displayOpen(filterSearchs);
            displayClosed(filterSearchs);
            document.getElementById("box-counter").innerText = filterSearchs.length;
         });
       });


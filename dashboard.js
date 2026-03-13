 const loadAll = () => {
           
            fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then((res) => res.json())
            .then((json) => displayAll(json.data));
        };

        const displayAll = (alls) => {
           const issuesContainer =document.getElementById("issues-container")
           issuesContainer.innerHTML ="";

            // const box = document.getElementById("box-counter")
            // const boxP =document.createElement("p")

            // alls.length = box.innerText

           for(let all of alls){
                const allDiv =document.createElement("div")
                allDiv.innerHTML= `
               <div class="rounded-2xl shadow-2xl p-3 h-100">
                <div class="flex justify-between m-5">
                    <img class="w-10" src="./assets/Open-Status.png" alt="">
                <button class="btn  text-red-500 bg-[#FECACA50] rounded-4xl "> ${all.priority} </button>
                <!-- <button class="btn  text-[#9CA3AF] bg-[#EEEFF250] rounded-4xl ">low</button> -->
                </div>
                <div class="mx-5">
                      <div class="">
                    <h2 class="text-4xl font-bold my-auto mb-3"> ${all.title} </h2>
                    <p> ${all.description} </p>
                </div>
                <div class="flex gap-3 m-5">
                    <div>

                       <button class="btn text-xl   text-red-500 bg-[#FECACA50] border-red-400 rounded-4xl ">bug</button>
                    </div>
                    <div>

                        <button class="btn text-xl text-[#D97706] bg-[#FDE68A50] border-[#D9770670] rounded-4xl ">helpdjhxzdfhjn wafdsf</button>
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
           }
        };




        // OPEN  

        const loadOpen = () => {
           
            fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then((res) => res.json())
            .then((data) => {
                const openIssues = data.filter(all => all.status === "open");
                displayOpen(data.data);
            });
        };

        const displayOpen = (opens) => {
           const issuesContainer =document.getElementById("issues-container")
           issuesContainer.innerHTML ="";

           for(let open of opens){
                
                const openDiv =document.createElement("div")
                openDiv.innerHTML= `
                // <h3>$</h>
                    $
        

                `;

                issuesContainer.appendChild(openDiv);
           }
        };

// loadAll();
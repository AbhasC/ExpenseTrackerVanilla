let bal = 0;
let inc = 0;
let exp = 0;
let transacthist = [];

// /**
//  * @param {any[]} newarr; 
//  */

function delelem(index){
    let updatedarr = [];
    transacthist.forEach((obj, ind) => {
        if (ind != index){
            updatedarr.push(obj);
        }
    });
    transacthist = updatedarr;
    updatelist(transacthist);
}

function updatelist(newarr)
{
    let histr = document.querySelector(".history ul");
    histr.innerHTML="";
    newarr.forEach((obj,ind) => {
        let newentry = document.createElement("li");
        newentry.setAttribute("class", obj.type == "income"?"inc":"exp");
        let typepic = document.createElement("img");
        if(obj.type=="income")
            typepic.src = "https://upload.wikimedia.org/wikipedia/commons/9/9a/Green_circle.png";
        else
            typepic.src = "https://upload.wikimedia.org/wikipedia/commons/a/ae/Red_circle.png";
        let descspan = document.createElement("span");
        descspan.setAttribute("class", "desc");
        descspan.textContent = obj.desc;
        let amtspan = document.createElement("span");
        amtspan.textContent = "₹" + obj.amt;
        let delbut = document.createElement("button");
        delbut.textContent = "Delete";
        delbut.addEventListener("click", () => {
            delelem(ind);
        });
        newentry.appendChild(typepic);
        newentry.appendChild(descspan);
        newentry.appendChild(amtspan);
        newentry.appendChild(delbut);
        histr.appendChild(newentry);
    });
    document.querySelector("#balamt").innerHTML =
        "₹ " +
        newarr
        .map((t) => {
            return t.amt * (t.type == "income" ? 1 : -1);
        })
        .reduce(function (x, y) {
            return x + y;
        }, 0);
    document.querySelector("#inc-amt").innerHTML =
        "₹ " +
        newarr
        .map((t) => {
            return t.type == "income" ? t.amt : 0;
        })
        .reduce(function (x, y) {
            return x + y;
        }, 0);
    document.querySelector("#exp-amt").innerHTML =
        "₹ " +
        newarr
        .map((t) => {
            return t.type == "expense" ? t.amt : 0;
        })
        .reduce(function (x, y) {
            return x + y;
        }, 0);
}

function onSubmit(event)
{
    event.preventDefault();
    let ipdesc = document.querySelector("#i1").value;
    let ipamt = Number(document.querySelector("#i2").value);   
    let radio = document.querySelector(".radiobt:checked").value;
    console.log("abcde",radio);

    const hist = {
        desc: ipdesc,
        amt: ipamt,
        type: radio
    };

    transacthist.push(hist);
    updatelist(transacthist);
}
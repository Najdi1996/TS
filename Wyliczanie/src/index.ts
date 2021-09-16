class StatsApp{
    
    
    Inputsnumber: HTMLInputElement; //Odpowiedzialny za ilosc generwowanych inputow
    dataDiv:any;
    Inputs :any;

   //Inputy wynikow
    sumInput:HTMLInputElement;
    avgInput:HTMLInputElement;
    minInput:HTMLInputElement;
    maxInput:HTMLInputElement;

    //Konstruktor
    constructor(){
        this.startApp();
    }

    startApp(){
        this.getInputs();
        this.createInputs();
        this.watchInputValues();
    }

    
    //Query selectory do inputów
    getInputs():void{
        this.Inputsnumber =document.querySelector('#inputs');
        this.Inputs=document.querySelector('.input-data');
        this.sumInput =document.querySelector('#sum');
        this.avgInput =document.querySelector('#avg');
        this.minInput =document.querySelector('#min');
        this.maxInput =document.querySelector('#max');
    }

    //Tworzenie inputow
    createInputs(){
        const quantity= +this.Inputsnumber.value;//Przypisania wartosci z inputa od ilosci pol do stworzenia

        this.clearContent(); //Jezeli cos instnialo wczesniej - usuwa to.

        for(let i=1;i<=quantity;i++)
        {
            //Stworzenie inputa do wpisywania liczb
            var input = document.createElement("input");
            input.type = "number";
            input.className = "data"+i;
            input.value="0";
            
            //Dodaje przycisk do usuwania pojedynczego inputa
            var button =document.createElement("button");
            button.innerHTML = 'Delete';
            button.className ="delete"+i;
            button.onclick = function()//Funckja ktora dziala po nacisnieciu przycisku - usuwa konkretny input
            {
                let inputDiv=document.querySelector('.input-data');
                let classname =document.querySelector('.delete'+i);
                let dataname =document.querySelector('.data'+i);
                let brname =document.querySelector('.br'+i);
                
                inputDiv.removeChild(classname);
                inputDiv.removeChild(dataname);
                inputDiv.removeChild(brname);

                
            }

            var br=document.createElement('br');
            br.className ='br'+i;// Dodanie linii
            
            //Dodawanie elementow do HTMLa
            this.dataDiv =document.querySelector('.input-data').appendChild(input);
            this.dataDiv =document.querySelector('.input-data').appendChild(button);
            this.dataDiv =document.querySelector('.input-data').appendChild(br);
            
            
        }
        this.watchInputValues();
    }

    //Funkcja od usuwania poprzednio stworzonych inputow
    clearContent():void{
        this.dataDiv = document.querySelector('.input-data');

        while (this.dataDiv.firstChild) {
            this.dataDiv.removeChild(this.dataDiv.firstChild);
        } //TAK DLUGO JAK ISTNIEJA JAKIES ELEMENTY TO USUWA JE
    }

    
    //Dodawanie event listenerow na buttony
    watchInputValues():void {
        this.Inputsnumber.addEventListener('input', ()=>this.createInputs()); //sprawdz sobie czym sa event listenery. Tutaj on nasluchuje czy w inpucie wprowadziles jakies dane, jesli tak to uruchamia funckje create inputs

        this.Inputs.addEventListener('click', ()=>this.computeData());// Klikniecie delete - jezeli usunales konretne pole przyciskiem DELETE. To uruchamia funckje od liczenia wartosci
        
        //Dodanie w petli event listenerow 
        let itemsnumber =document.querySelector('.input-data').childElementCount;
        for(let i=0;i<itemsnumber;i++)
        {
            this.Inputs.children[i].addEventListener('input', ()=>this.computeData());
        }
        
        
    }

    computeData():void{
       let itemsnumber =document.querySelector('.input-data').childElementCount; //Liczba elementow uwzgledniajaca takze bry i delete buttony

       let itemstable =[]; // Tabela bedzie zawierac wszystkie elementy lacznie z buttonami i brami

       //Petla przypisuje wszystkie elementy do tablicy itemstable
       for(let i=0;i<itemsnumber;i++)
       {
           itemstable[i]=this.Inputs.children[i].value;
       }

       //Zmienne od wartosci
       let sum =0;
       let min=0;
       let max=0;
       
    //Petla liczaca wartosci z samych inputow - sume , min i max
       for(let i=0;i<itemstable.length;)
       {
           let numberelement=parseInt(itemstable[i])
           if(i==0)
           {
           min =numberelement;
           max=numberelement;
           }
           if(min>numberelement){min =numberelement}
           if(max<numberelement){max =numberelement}
           sum =sum+numberelement;

           i=i+3;//Liczenie co trzeciego elementu w tabeli bo w tabeli mamy elementy takie jak input,button i br - musimy policzyc same liczby
       }

       let avg=sum/(itemstable.length/3); // Zmienna od sredniej. Dzieli sume przez ilosc inputow
       
        this.showStats(sum, avg, min, max);// Uruchomienie funckji show stats

    }

    //Funckja odpowiedzialna za wyswietlenie w inputach wartosci sumy sredniej itd
    showStats(sum:number,avg:number,min:number,max:number){
        this.sumInput.value =sum.toString();//Do inputa nie mozesz przypisac number dlatego uzywasz to string zeby przekonwertowac liczbe na stringa
        this.avgInput.value =avg.toString();
        this.minInput.value =min.toString();
        this.maxInput.value =max.toString();
    }
}

const App =new StatsApp();
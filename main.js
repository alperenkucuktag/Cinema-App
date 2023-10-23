const container=document.querySelector(".container")
const Seat=document.querySelectorAll(".seat")
const infoText=document.querySelector(".infoText")
const open=document.querySelector(".open")
const movie=document.getElementById("selected")
const seats=document.querySelectorAll(".seat:not(.reserved)")
// console.log(movie.value)

//Tarayıcı Veri tabanından verileri okuma
const getSeatDataFromDataBase=()=>{
    //seçilen filmin index verisini getiriryoruz
    const dbSelectedMovie=JSON.parse(localStorage.getItem("movieIndex"));
    if (dbSelectedMovie) {
        movie.selectedIndex=dbSelectedMovie  
    }
    const dbSelectSeats=JSON.parse(localStorage.getItem("selectedIndex"));
         console.log(dbSelectSeats)
    if (dbSelectSeats !== null && dbSelectSeats.length > 0){

        seats.forEach((seat,index)=>{
            
            if(dbSelectSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }

        });

        
    }
};






//Tarayıcı Veri tabanına Kayıt Fonksiyonu

//adım-1 Tıklanılan koltuğun sarıya boyanması
//adım-2 toplam ücretin hesaplanmması
//adım-2 yapımı için;
//1.adım:Önce Tıklanılan elemanların class larında set ve selected olanları bul
//2.adım film fiyatını bul


//Veri tabanı kayıt fonksiyonu

const saveToDatabase=(seatIndexData)=>{
    //localStorage basit verileri tarayıcı hafızasında tutmak için kullanılabilir
    //verileri json formatında kaydeder
    //localStorage.setItem(key,value) veri ekler
    //localStorage.getItem(key) verileri okur
    localStorage.setItem("selectedIndex",JSON.stringify(seatIndexData))
    localStorage.setItem("movieIndex",JSON.stringify(movie.selectedIndex))


}
 getSeatDataFromDataBase()


//toplam tutar hesaplama ve koltukların indeks numararalarının  tespit fonksiyonu
const calculateTotal=()=>{
   
    //*veritabanı işlemleri**

    //1-Seçilen koltukların bilgisi
    //2-Tüm koltukların indeks



    const selectedSeats=container.querySelectorAll(".seat.selected");
    // console.log(selectedSeats);
    //Tüm seçilen koltukları nodelist ten normal diziye döndürürken kulllanıcaz
    const allSeatsArray=[]
    const allSelectedSeatsArray=[];

    seats.forEach((seat)=>{
        allSeatsArray.push(seat)
    })
    // console.log(allSeatsArray)

   selectedSeats.forEach((selectedSeat)=>{
    allSelectedSeatsArray.push(selectedSeat)
   });
//    console.log(allSelectedSeatsArray);

let selectedIndexs=allSelectedSeatsArray.map((allSelectedSeat)=>{

    return allSeatsArray.indexOf(allSelectedSeat)
});









    //*** Hesaplama İşlemleri***/
    // console.log(movie.value);

// console.log("hesaplam")
//her tıklanıldığında çaışır ve hem saat hem selectded classına sahip elementi bulur


let selectedSeatsCount=container.querySelectorAll(".seat.selected").length
if (selectedSeatsCount>0) {
    infoText.style.display="block"
    
}else{
    infoText.style.display="none"
}

let price=movie.value
// console.log(price)
let total=price*selectedSeatsCount
infoText.innerHTML=`
<span>${selectedSeatsCount}</span> koltuk için hesaplanan ücret <span>${total}</span> TL
`
saveToDatabase(selectedIndexs)
}
calculateTotal()



container.addEventListener("click",(mouseEvent)=>{
    //tıkladığımız elemanın mouseEventta nereye denk geldiğini bulduk
 
    
// console.log(mouseEvent.target.parentElement)
  
    //1-tıklanılan elemanın  classlisti seat classı içerecek reserved class ı içermeyecek
    //2-Yukardaki aşamayı sağlayacak sorguyu oluşturacaz
    //3-sorgunun olumlu sonuçlanması halinde gelen eleman bizim boş koltuğumuz olur
    //4-toogle ile tıklanınca selected classını ekle çıkar yapıcaz
    if(mouseEvent.target.parentElement.classList.contains("seat")&&
    // aşağıdaki ünlem operatörü  rezerv değilse anlamını taşıyor sarıya çevir
    !mouseEvent.target.parentElement.classList.contains("reserved")){
        //tıklanılan elemente selected classını verecek
       
        mouseEvent.target.parentElement.classList.toggle("selected")
        calculateTotal()

    }

})
container.addEventListener("dblclick",(mouseEvent)=> {
    
    if(mouseEvent.target.parentElement.classList.contains("seat")&&!mouseEvent.target.parentElement.classList.contains("selected")){
        mouseEvent.target.parentElement.classList.toggle("reserved")
    }
});

movie.addEventListener("change",()=>{
    calculateTotal()


})



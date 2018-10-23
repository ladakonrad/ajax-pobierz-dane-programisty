function ajax(method, url) {


    // utworzenie obiektu
    var httpReq = new XMLHttpRequest();



    // otwarcie polaczenia - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
    httpReq.open(method, url);



    // jesli status polaczenia zostal zmieniony -> httpReq.readyState
    // 0: połączenie nie nawiązane,
    // 1: połączenie nawiązane,
    // 2: żądanie odebrane,
    // 3: przetwarzanie,
    // 4: dane zwrócone i gotowe do użycia.
    httpReq.onreadystatechange = function () {



        // jeśli 4: dane zwrócone i gotowe do użycia
        if (httpReq.readyState == 4) {
            console.log(httpReq.status);
            // sprawdź kod statusu połączenia - https://pl.wikipedia.org/wiki/Kod_odpowiedzi_HTTP
            if (httpReq.status == 200) {

                var returnData = httpReq.responseText;

                console.log(returnData);

                var jsonData = JSON.parse(returnData);
                console.log(jsonData);


                var div = document.createElement('div');
                $('div').attr('id', 'dane-programisty');

                var parName = document.createElement('p');
                parName.innerText = 'Imię: ' + jsonData.imie;
                div.appendChild(parName);

                var parSurname = document.createElement('p');
                parSurname.innerText = 'Nazwisko: ' + jsonData.nazwisko;
                div.appendChild(parSurname);

                var parProfession = document.createElement('p');
                parProfession.innerText = 'Zawód: ' + jsonData.zawod;
                div.appendChild(parProfession);

                var parCompany = document.createElement('p');
                parCompany.innerText = 'Firma: ' + jsonData.firma;
                div.appendChild(parCompany);

                document.body.appendChild(div);



                // zeruj obiekt, aby nie utrzymywać nie potrzebnego już połączenia z serwerem
                httpReq = null;

            }

        }

    }

    // wysłanie danych do serwera
    httpReq.send();
}

document.querySelector('button').addEventListener('click', function () {
    ajax('GET', 'https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php');
});

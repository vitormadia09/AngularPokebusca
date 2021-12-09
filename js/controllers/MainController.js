app.controller('MainController', function($scope, $http){

    atualizarPagina(0);
   
    function atualizarPagina(pagina){
        $scope.numeropaginaAtual = pagina;
        $http.get("https://pokeapi.co/api/v2/pokemon/?offset=" + (pagina * 20).toString() + "&limit=20").then(function(res,status,xhr) {
        $scope.list = [];
        $scope.total_registros = res.data.count;
        $scope.total_paginas = parseInt(res.data.count / 20);
        $scope.total_registros_exibindo = res.data.results.length;
        if((res.data.count % 20) > 0){
            $scope.total_paginas = $scope.total_paginas + 1;
        }
         
        var log = [];
        angular.forEach(res.data.results, function(value, key) {
            var idCalculado = value.url.toString().replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
            $scope.list.push(
                {
                    name: value.name, 
                    url: value.url, 
                    index: key, 
                    id: idCalculado,
                    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + idCalculado.toString() +'.png',
                    imgUrlShiny:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + idCalculado.toString() +'.png'
                });
        }, log);
        });
    }

    $scope.primeiraPagina = function(){
        atualizarPagina(0);
    }

    $scope.paginaAnterior = function(){
        if(parseInt( $scope.numeropaginaAtual) > 0){
            atualizarPagina($scope.numeropaginaAtual - 1); 
        }
    }
    $scope.proximaPagina = function(){
        if(parseInt( $scope.numeropaginaAtual) < ($scope.total_paginas - 1)){
            atualizarPagina($scope.numeropaginaAtual + 1); 
        }
    }
    $scope.ultimaPagina = function(){
      atualizarPagina($scope.total_paginas - 1);
    }

    $scope.buscarPokemon = function(tipoPokemonMudar, idPokemon){
      
        if(tipoPokemonMudar === 'normal'){
            document.getElementById("imgNormal" + idPokemon.toString()).style.display ='block';
            document.getElementById("imgShiny" + idPokemon.toString()).style.display ='none';
        }
        else{
            document.getElementById("imgNormal" + idPokemon.toString()).style.display ='none';
            document.getElementById("imgShiny" + idPokemon.toString()).style.display ='block';
        }
    }
   // $scope.abrirModalInformacoes = function(idPokemon){
   //     $http.get("https://pokeapi.co/api/v2/pokemon/" + idPokemon.toString()).then(function(res,status,xhr) {
   //         $scope.habilidades = res.data.abilities;
   //         //TO-DO -> fazer um foreach para pegar o campo ability.name
   //        console.log($scope.habilidades);
   //     });
   // }
    $scope.frontEnd="Front-End";
    $scope.pokebusca="Pokebusca";
})
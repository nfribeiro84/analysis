myApp
    .controller('homeController', function ($modal, $location, $filter, $timeout, $http) {
        var vm = this;
        var connection;
        var categorias = null;

        vm.running = false;

        vm.start = start;
        vm.getColumns = getColumns;
        vm.knowledge = goToKnowledge;
        vm.openCategory = openCategory;
        vm.removeCategory = removeCategory;

        vm.getCategoriaMD = getCategoriaMD;
        vm.openMDCategory = openMDCategory;
        vm.getMetricas = getMetricas;
        vm.removeCategoryMD = removeCategoryMD;
        vm.changeCategoryName = changeCategoryName;
        vm.newCategory = newCategory;

        vm.dropMetrica = dropMetrica;
        vm.dragStart = dragStart;
        vm.dragStop = dragStop;

        vm.copyClipboard = copyClipboard;

        function copyClipboard() {
            var text_to_share = vm.metadata;

            // create temp element
            var copyElement = document.createElement("pre");
            copyElement.appendChild(document.createTextNode($filter('json')(vm.metadata)));
            copyElement.id = 'tempCopyToClipboard';
            angular.element(document.body.append(copyElement));

            // select the text
            var range = document.createRange();
            range.selectNode(copyElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            // copy & cleanup
            document.execCommand('copy');
            alert("copiado");
            window.getSelection().removeAllRanges();
            copyElement.remove();
        }

        function newCategory(cat) {
            var newCat = { CategoriaId: getNextCatId(), Nome: "Nova categoria", CategoriaPaiId: (!cat ? null : cat.CategoriaId), show: true };
            $modal.open({
                templateUrl: 'modules/home/partials/modalChangeCategoryName.html',
                controller: 'modalChangeCategoryNameController',
                resolve: {
                    category: function () { return newCat; },
                    isnew: function () { return true; }
                }
            }).result.then(function () {
                vm.metadata.Metricas.Categorias.push(newCat);
            })
        }

        function getNextCatId() {
            var maxId = 0;
            for (var i = 0; i < vm.metadata.Metricas.Categorias.length; i++)
                if (vm.metadata.Metricas.Categorias[i].CategoriaId > maxId)
                    maxId = vm.metadata.Metricas.Categorias[i].CategoriaId;

            return maxId + 1;
        }

        function dropMetrica(event, ui, category) {
            event.stopPropagation();

            if (vm.dragging) {
                $timeout(function () {
                    vm.dragging.CategoriaId = category === null ? null : category.CategoriaId;
                }, 0);
            }
        }

        function dragStart(event, ui, metrica) {
            event.stopPropagation();
            vm.dragging = metrica;
        }

        function dragStop() {
            
        }

        function changeCategoryName($event, category) {
            $event.stopPropagation();

            $modal.open({
                templateUrl: 'modules/home/partials/modalChangeCategoryName.html',
                controller: 'modalChangeCategoryNameController',
                resolve: {
                    category: function () { return category; },
                    isnew: function () { return false; }
                }
            });
        }

        function getCategoriaMD(parentId) {
            var result = [];
            for (var i = 0; i < vm.metadata.Metricas.Categorias.length; i++)
                if (vm.metadata.Metricas.Categorias[i].CategoriaPaiId === parentId)
                    result.push(vm.metadata.Metricas.Categorias[i]);
            return result;
        }

        function openMDCategory($event, category) {
            $event.stopPropagation();
            category.show = !category.show;
        }

        function getMetricas(categoryId) {
            var result = [];
            for (var i = 0; i < vm.metadata.Metricas.Colunas.length; i++)
                if (vm.metadata.Metricas.Colunas[i].CategoriaId === categoryId)
                    result.push(vm.metadata.Metricas.Colunas[i]);
            return result;
        }

        function removeCategoryMD($event, category) {
            $event.stopPropagation();
            var newCats = [];
            for (var i = 0; i < vm.metadata.Metricas.Categorias.length; i++) {
                if (vm.metadata.Metricas.Categorias[i].CategoriaId === category.CategoriaId)
                    continue;
                else {
                    var newCat = angular.copy(vm.metadata.Metricas.Categorias[i]);
                    if (newCat.CategoriaPaiId === category.CategoriaId)
                        newCat.CategoriaPaiId = category.CategoriaPaiId;
                    newCats.push(newCat);
                }
            }

            for (i = 0; i < vm.metadata.Metricas.Colunas.length; i++) {
                if (vm.metadata.Metricas.Colunas[i].CategoriaId === category.CategoriaId)
                    vm.metadata.Metricas.Colunas[i].CategoriaId = category.CategoriaPaiId;
            }

            vm.metadata.Metricas.Categorias = newCats;
        }

        function goToKnowledge() {
            $location.path("/knowledge");
        }

        function start() {
            console.log("start");
            if (vm.running)
                return;

            vm.running = true;
            initConnection();

        }

        function getColumns(choice) {
            switch (choice) {
                case "file": return $filter('filter')(vm.columns, { ColClass: 'file' }, true);
                case 'metric': return $filter('filter')(vm.columns, { MetricOrDimension: 'metric' }, true);
                case 'dimension': return $filter('filter')(vm.columns, { MetricOrDimension: 'dimension', ColClass: '!file' }, true);
            }
            return null;
        }

        function initConnection() {
            vm.message = "initiating connection";
            if (vm.running) {
                connection = $.connection('/api/signalr');
                connection.start(function (a, b, c) {
                    vm.message = "Connection initiated";
                    $timeout(function () {
                        $http.get('/api/analysis/begin')
                            .success(function (data, status) {
                                console.log(data);
                                //vm.message = data;
                            },
                                function (data, status) {
                                    console.log("ERROR");
                                    console.log(data);
                                    closeConnection();
                                });
                    }, 0);
                });
                connection.received(listener);
            }
        }

        function closeConnection() {
            console.log("closeconnection");
            connection.stop();
            connection = null;
            vm.running = false;
        }

        function listener(data) {
            console.log(data);
            $timeout(function () {
                vm.message = data.MessageText;
            }, 0);

            switch (data.MessageType) {
                case "i": setFirstData(data); break;
                case "lc": addColumn(data); break;
                case "rg": addRowGeographic(data); break;
                case "tree": addMetricsTree(data); break;
                case "categoria": addCategories(data); break;
                case "md": setMetadata(data); break;
            }
        }

        function addRowGeographic(data) {
            console.log(data);
            vm.rows = data.RowsGeographic;
            console.log(vm.rows);
            vm.rowsLimit = 20;
        }

        function setFirstData(data) {
            $timeout(function () {
                vm.numberColumns = data.NumColumns;
                vm.numberRows = data.NumRows;
                vm.columns = [];
            }, 0);
        }

        function addColumn(data) {
            $timeout(function () {
                console.log(data.Column);
                vm.columns.push(data.Column);
            }, 0)

        }

        function addMetricsTree(data) {
            $timeout(function () {
                console.log(data.Nodes);
                vm.nodes = data.Nodes;
            });
        }



        function addCategories(data) {
            $timeout(function () {
                console.log(data.Categoria);
                vm.categoria = data.Categoria;
                console.log("---------CATEGORIAS-------------");
                console.log(vm.categoria);
                vm.metricas = [];
                //setMetricas(vm.categoria);
            });
        }


        function setMetricas(cat) {
            if (cat.CatValue)
                vm.metricas.push(cat.CatValue);
            for (var i = 0; i < cat.metricas.length; i++)
                vm.metricas.push(cat.metricas[i]);
            for (var j = 0; j < cat.categoriasfilhas.length; j++)
                setMetricas(cat.categoriasfilhas[j]);
        }

        //vm.metadata = {
        //    Metricas: {
        //        "Categorias": [
        //            {
        //                "CategoriaId": 2,
        //                "Nome": "Edificios",
        //                "CategoriaPaiId": null,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 3,
        //                "Nome": "Classicos",
        //                "CategoriaPaiId": 2,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 4,
        //                "Nome": "Ano de Construção",
        //                "CategoriaPaiId": 2,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 9,
        //                "Nome": "Tipo de Estrutura",
        //                "CategoriaPaiId": 2,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 10,
        //                "Nome": "Tipo Residencia",
        //                "CategoriaPaiId": 2,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 11,
        //                "Nome": "Alojamentos",
        //                "CategoriaPaiId": null,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 12,
        //                "Nome": "Familiares",
        //                "CategoriaPaiId": 11,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 13,
        //                "Nome": "Classicos",
        //                "CategoriaPaiId": 12,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 14,
        //                "Nome": "Residência Habitual",
        //                "CategoriaPaiId": null,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 15,
        //                "Nome": "Facilidades",
        //                "CategoriaPaiId": 14,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 17,
        //                "Nome": "Por Área",
        //                "CategoriaPaiId": 14,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 19,
        //                "Nome": "Por número de Estacionamentos",
        //                "CategoriaPaiId": 14,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 20,
        //                "Nome": "Famílias",
        //                "CategoriaPaiId": null,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 21,
        //                "Nome": "Famílias Clássicas",
        //                "CategoriaPaiId": 20,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 24,
        //                "Nome": "Por numero de Desempregados",
        //                "CategoriaPaiId": 21,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 25,
        //                "Nome": "Núcleos",
        //                "CategoriaPaiId": null,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 29,
        //                "Nome": "Indivíduos",
        //                "CategoriaPaiId": null,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 32,
        //                "Nome": "Presentes",
        //                "CategoriaPaiId": 29,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 33,
        //                "Nome": "Residentes",
        //                "CategoriaPaiId": 29,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 45,
        //                "Nome": "Habilitações Literárias",
        //                "CategoriaPaiId": 29,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 47,
        //                "Nome": "Frequenta",
        //                "CategoriaPaiId": 45,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 49,
        //                "Nome": "Completo",
        //                "CategoriaPaiId": 45,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 56,
        //                "Nome": "Tipo construção",
        //                "CategoriaPaiId": 3,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 57,
        //                "Nome": "Pisos",
        //                "CategoriaPaiId": 3,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 58,
        //                "Nome": "Numero de Pisos",
        //                "CategoriaPaiId": 2,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 59,
        //                "Nome": "Por numero de Divisoes",
        //                "CategoriaPaiId": 14,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 60,
        //                "Nome": "Tipo Ocupação",
        //                "CategoriaPaiId": 14,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 61,
        //                "Nome": "Por numero de pessoas",
        //                "CategoriaPaiId": 21,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 62,
        //                "Nome": "Por Faixa Etária",
        //                "CategoriaPaiId": 21,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 63,
        //                "Nome": "Por numero de Filhos",
        //                "CategoriaPaiId": 25,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 64,
        //                "Nome": "Por Género",
        //                "CategoriaPaiId": 32,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 65,
        //                "Nome": "Por Faixa Etaria",
        //                "CategoriaPaiId": 33,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 66,
        //                "Nome": "Por Género",
        //                "CategoriaPaiId": 33,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 67,
        //                "Nome": "Masculino",
        //                "CategoriaPaiId": 66,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 68,
        //                "Nome": "Feminino",
        //                "CategoriaPaiId": 66,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 69,
        //                "Nome": "Por Faixa Etária",
        //                "CategoriaPaiId": 68,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 70,
        //                "Nome": "Por Faixa Etária",
        //                "CategoriaPaiId": 67,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 73,
        //                "Nome": "Atividade Economica",
        //                "CategoriaPaiId": 29,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 74,
        //                "Nome": "Por Setor de Emprego",
        //                "CategoriaPaiId": 73,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 75,
        //                "Nome": "Desempregados",
        //                "CategoriaPaiId": 73,
        //                "show": true
        //            },
        //            {
        //                "CategoriaId": 76,
        //                "Nome": "Atividade Municipio Residencia",
        //                "CategoriaPaiId": 29,
        //                "show": true
        //            }
        //        ],
        //        "Colunas": [
        //            {
        //                "IndiceColuna": 17,
        //                "NomeColuna": ".N_EDIFICIOS_5OU_MAIS_PISOS",
        //                "CategoriaId": 58,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 38,
        //                "NomeColuna": "N_CLASSICOS_RES_HABITUAL",
        //                "CategoriaId": 3,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 15,
        //                "NomeColuna": "N_EDIFICIOS_1OU2_PISOS",
        //                "CategoriaId": 58,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 16,
        //                "NomeColuna": "N_EDIFICIOS_3OU4_PISOS",
        //                "CategoriaId": 58,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 6,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS_1OU2",
        //                "CategoriaId": 57,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 7,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS_ISOLADOS ",
        //                "CategoriaId": 56,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 8,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS_GEMIN",
        //                "CategoriaId": 56,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 9,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS_EMBANDA",
        //                "CategoriaId": 56,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 10,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS_3OUMAIS",
        //                "CategoriaId": 57,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 11,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS_OUTROS",
        //                "CategoriaId": 56,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 5,
        //                "NomeColuna": "N_EDIFICIOS_CLASSICOS",
        //                "CategoriaId": 3,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 18,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_ANTES_1919",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 19,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1919A1945",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 20,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1946A1960",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 21,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1961A1970",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 22,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1971A1980",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 23,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1981A1990",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 24,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1991A1995",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 25,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_1996A2000",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 26,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_2001A2005",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 27,
        //                "NomeColuna": "N_EDIFICIOS_CONSTR_2006A2011",
        //                "CategoriaId": 4,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 12,
        //                "NomeColuna": "N_EDIFICIOS_EXCLUSIV_RESID",
        //                "CategoriaId": 10,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 28,
        //                "NomeColuna": "N_EDIFICIOS_ESTRUT_BETAO",
        //                "CategoriaId": 9,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 29,
        //                "NomeColuna": "N_EDIFICIOS_ESTRUT_COM_PLACA",
        //                "CategoriaId": 9,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 30,
        //                "NomeColuna": "N_EDIFICIOS_ESTRUT_SEM_PLACA",
        //                "CategoriaId": 9,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 31,
        //                "NomeColuna": "N_EDIFICIOS_ESTRUT_ADOBE_PEDRA",
        //                "CategoriaId": 9,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 32,
        //                "NomeColuna": "N_EDIFICIOS_ESTRUT_OUTRA",
        //                "CategoriaId": 9,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 13,
        //                "NomeColuna": "N_EDIFICIOS_PRINCIPAL_RESID",
        //                "CategoriaId": 10,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 14,
        //                "NomeColuna": "N_EDIFICIOS_PRINCIP_NAO_RESID",
        //                "CategoriaId": 10,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 37,
        //                "NomeColuna": "N_ALOJAMENTOS_COLECTIVOS",
        //                "CategoriaId": 11,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 39,
        //                "NomeColuna": "N_ALOJAMENTOS_RES_HABITUAL",
        //                "CategoriaId": 11,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 40,
        //                "NomeColuna": "N_ALOJAMENTOS_VAGOS",
        //                "CategoriaId": 11,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 33,
        //                "NomeColuna": "N_ALOJAMENTOS",
        //                "CategoriaId": 11,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 34,
        //                "NomeColuna": "N_ALOJAMENTOS_FAMILIARES",
        //                "CategoriaId": 12,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 35,
        //                "NomeColuna": "N_ALOJAMENTOS_FAM_CLASSICOS",
        //                "CategoriaId": 13,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 36,
        //                "NomeColuna": "N_ALOJAMENTOS_FAM_N_CLASSICOS",
        //                "CategoriaId": 13,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 49,
        //                "NomeColuna": "N_RES_HABITUAL_1_2_DIV",
        //                "CategoriaId": 59,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 50,
        //                "NomeColuna": "N_RES_HABITUAL_3_4_DIV",
        //                "CategoriaId": 59,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 54,
        //                "NomeColuna": "N_RES_HABITUAL_PROP_OCUP",
        //                "CategoriaId": 60,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 41,
        //                "NomeColuna": "N_RES_HABITUAL_COM_AGUA",
        //                "CategoriaId": 15,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 42,
        //                "NomeColuna": "N_RES_HABITUAL_COM_RETRETE",
        //                "CategoriaId": 15,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 43,
        //                "NomeColuna": "N_RES_HABITUAL_COM_ESGOTOS",
        //                "CategoriaId": 15,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 44,
        //                "NomeColuna": "N_RES_HABITUAL_COM_BANHO",
        //                "CategoriaId": 15,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 55,
        //                "NomeColuna": "N_RES_HABITUAL_ARREND",
        //                "CategoriaId": 60,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 47,
        //                "NomeColuna": "N_RES_HABITUAL_AREA_100_200",
        //                "CategoriaId": 17,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 48,
        //                "NomeColuna": "N_RES_HABITUAL_AREA_200",
        //                "CategoriaId": 17,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 46,
        //                "NomeColuna": "N_RES_HABITUAL_AREA_50_100",
        //                "CategoriaId": 17,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 45,
        //                "NomeColuna": "N_RES_HABITUAL_AREA_50",
        //                "CategoriaId": 17,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 51,
        //                "NomeColuna": "N_RES_HABITUAL_ESTAC_1",
        //                "CategoriaId": 19,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 52,
        //                "NomeColuna": "N_RES_HABITUAL_ESTAC_2",
        //                "CategoriaId": 19,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 53,
        //                "NomeColuna": "N_RES_HABITUAL_ESTAC_3",
        //                "CategoriaId": 19,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 57,
        //                "NomeColuna": "N_FAMILIAS_INSTITUCIONAIS",
        //                "CategoriaId": 20,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 64,
        //                "NomeColuna": "N_FAMILIAS_CLASS_2MAIS_DESEMP",
        //                "CategoriaId": 24,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 58,
        //                "NomeColuna": "N_FAMILIAS_CLASSICAS_1OU2_PESS",
        //                "CategoriaId": 61,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 59,
        //                "NomeColuna": "N_FAMILIAS_CLASSICAS_3OU4_PESS",
        //                "CategoriaId": 61,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 56,
        //                "NomeColuna": "N_FAMILIAS_CLASSICAS",
        //                "CategoriaId": 21,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 60,
        //                "NomeColuna": "N_FAMILIAS_CLASSICAS_NPES65",
        //                "CategoriaId": 62,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 61,
        //                "NomeColuna": "N_FAMILIAS_CLASSICAS_NPES14",
        //                "CategoriaId": 62,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 62,
        //                "NomeColuna": "N_FAMILIAS_CLASSIC_SEM_DESEMP",
        //                "CategoriaId": 24,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 63,
        //                "NomeColuna": "N_FAMILIAS_CLASSIC_1DESEMPREG",
        //                "CategoriaId": 24,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 66,
        //                "NomeColuna": "N_NUCLEOS_1FILH_NAO_CASADO",
        //                "CategoriaId": 63,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 67,
        //                "NomeColuna": "N_NUCLEOS_2FILH_NAO_CASADO",
        //                "CategoriaId": 63,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 65,
        //                "NomeColuna": "N_NUCLEOS_FAMILIARES",
        //                "CategoriaId": 25,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 70,
        //                "NomeColuna": "N_NUCLEOS_FILH_MAIS_15ANOS",
        //                "CategoriaId": 63,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 68,
        //                "NomeColuna": "N_NUCLEOS_FILH_INF_6ANOS",
        //                "CategoriaId": 63,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 69,
        //                "NomeColuna": "N_NUCLEOS_FILH_INF_15ANOS",
        //                "CategoriaId": 63,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 104,
        //                "NomeColuna": "N_INDIV_RESIDENT_N_LER_ESCRV",
        //                "CategoriaId": 45,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 72,
        //                "NomeColuna": "N_INDIVIDUOS_PRESENT_H",
        //                "CategoriaId": 64,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 73,
        //                "NomeColuna": "N_INDIVIDUOS_PRESENT_M",
        //                "CategoriaId": 64,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 71,
        //                "NomeColuna": "N_INDIVIDUOS_PRESENT",
        //                "CategoriaId": 32,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 77,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_0A4",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 78,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_5A9",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 85,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_65",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 74,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT",
        //                "CategoriaId": 33,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 86,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_0A4",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 87,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_5A9",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 94,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_65",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 75,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H",
        //                "CategoriaId": 67,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 88,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_10A13",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 89,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_14A19",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 90,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_15A19",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 93,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_25A64",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 91,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_20A24",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 92,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_H_20A64",
        //                "CategoriaId": 70,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 95,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_0A4",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 96,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_5A9",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 103,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_65",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 76,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M",
        //                "CategoriaId": 68,
        //                "E_Total": true
        //            },
        //            {
        //                "IndiceColuna": 97,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_10A13",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 98,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_14A19",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 99,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_15A19",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 102,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_25A64",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 100,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_20A24",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 101,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_M_20A64",
        //                "CategoriaId": 69,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 79,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_10A13",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 80,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_14A19",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 81,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_15A19",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 84,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_25A64",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 82,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_20A24",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 83,
        //                "NomeColuna": "N_INDIVIDUOS_RESIDENT_20A64",
        //                "CategoriaId": 65,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 105,
        //                "NomeColuna": "N_IND_RESIDENT_FENSINO_1BAS",
        //                "CategoriaId": 47,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 106,
        //                "NomeColuna": "N_IND_RESIDENT_FENSINO_2BAS",
        //                "CategoriaId": 47,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 107,
        //                "NomeColuna": "N_IND_RESIDENT_FENSINO_3BAS",
        //                "CategoriaId": 47,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 109,
        //                "NomeColuna": "N_IND_RESIDENT_FENSINO_POSSEC",
        //                "CategoriaId": 47,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 108,
        //                "NomeColuna": "N_IND_RESIDENT_FENSINO_SEC",
        //                "CategoriaId": 47,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 110,
        //                "NomeColuna": "N_IND_RESIDENT_FENSINO_SUP",
        //                "CategoriaId": 47,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 111,
        //                "NomeColuna": "N_IND_RESIDENT_ENSINCOMP_1BAS",
        //                "CategoriaId": 49,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 112,
        //                "NomeColuna": "N_IND_RESIDENT_ENSINCOMP_2BAS",
        //                "CategoriaId": 49,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 113,
        //                "NomeColuna": "N_IND_RESIDENT_ENSINCOMP_3BAS",
        //                "CategoriaId": 49,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 115,
        //                "NomeColuna": "N_IND_RESIDENT_ENSINCOMP_POSEC",
        //                "CategoriaId": 49,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 114,
        //                "NomeColuna": "N_IND_RESIDENT_ENSINCOMP_SEC",
        //                "CategoriaId": 49,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 116,
        //                "NomeColuna": "N_IND_RESIDENT_ENSINCOMP_SUP",
        //                "CategoriaId": 49,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 120,
        //                "NomeColuna": "N_IND_RESID_PENS_REFORM",
        //                "CategoriaId": 73,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 121,
        //                "NomeColuna": "N_IND_RESID_SEM_ACT_ECON",
        //                "CategoriaId": 73,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 126,
        //                "NomeColuna": "N_IND_RESID_TRAB_MUN_RESID",
        //                "CategoriaId": 76,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 117,
        //                "NomeColuna": "N_IND_RESID_DESEMP_PROC_1EMPRG",
        //                "CategoriaId": 75,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 118,
        //                "NomeColuna": "N_IND_RESID_DESEMP_PROC_EMPRG",
        //                "CategoriaId": 75,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 125,
        //                "NomeColuna": "N_IND_RESID_ESTUD_MUN_RESID",
        //                "CategoriaId": 76,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 119,
        //                "NomeColuna": "N_IND_RESID_EMPREGADOS",
        //                "CategoriaId": 73,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 122,
        //                "NomeColuna": "N_IND_RESID_EMPREG_SECT_PRIM",
        //                "CategoriaId": 74,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 123,
        //                "NomeColuna": "N_IND_RESID_EMPREG_SECT_SEQ",
        //                "CategoriaId": 74,
        //                "E_Total": false
        //            },
        //            {
        //                "IndiceColuna": 124,
        //                "NomeColuna": "N_IND_RESID_EMPREG_SECT_TERC",
        //                "CategoriaId": 74,
        //                "E_Total": false
        //            }
        //        ]
        //    }
        //};

        function setMetadata(data) {
            console.log(data);
            if (data.metadata) {
                $timeout(function () {
                    for (var i = 0; i < data.metadata.Metricas.Categorias.length; i++)
                        data.metadata.Metricas.Categorias[i].show = true;
                    vm.metadata = data.metadata;
                    vm.metadata.resume = getMetadataResumed();
                    console.log("metadata setted");
                    console.log(vm.metadata);
                }, 0);
            }
            else
                console.log("no metadata");
        }

        function getMetadataResumed() {
            var result = { dimensions: [], metrics: [], divisions: [], geo: [] };
            for (var i = 0; i < vm.metadata.Dimensoes.length; i++) {
                result.dimensions.push(vm.metadata.Dimensoes[i].NomeColuna);
                if (vm.metadata.Dimensoes[i].TipoDominioGeo)
                    result.geo.push(vm.metadata.Dimensoes[i].NomeColuna);
            }

            for (i = 0; i < vm.metadata.Metricas.Colunas.length; i++)
                result.metrics.push(vm.metadata.Metricas.Colunas[i].NomeColuna);

            for (i = 0; i < vm.metadata.GeoDivisoes.length; i++)
                result.divisions.push(vm.metadata.GeoDivisoes[i].Tipo);
            result.numDimensions = result.dimensions.length;
            result.numMetrics = result.metrics.length;
            return result;
        }

        function openCategory($event, category) {
            $event.stopPropagation();
            category.show = !category.show;
        }

        function removeCategory($event, category) {
            $event.stopPropagation();
            for (var i = 0; i < vm.categoria.categoriasfilhas.length; i++) {
                if (vm.categoria.categoriasfilhas[i].CatId === category.ParentId) {
                    var newparent = removeChildCategory(vm.categoria.categoriasfilhas[i], category);
                    console.log(newparent);
                    vm.categoria.categoriasfilhas[i] = newparent;
                    console.log(vm.categoria);
                    break;
                }
            }
        }

        function removeChildCategory(parent, child) {
            var newparent = angular.copy(parent);
            newparent.categoriasfilhas = [];

            for (var i = 0; i < parent.categoriasfilhas.length; i++)
                if (parent.categoriasfilhas[i].CatId !== child.CatId)
                    newparent.categoriasfilhas.push(parent.categoriasfilhas[i]);

            for (i = 0; i < child.categoriasfilhas.length; i++)
                newparent.categoriasfilhas.push(child.categoriasfilhas[i]);

            for (i = 0; i < child.columnMetrics.length; i++)
                newparent.columnMetrics.push(child.columnMetrics[i]);

            for (i = 0; i < child.metricas.length; i++)
                newparent.metricas.push(child.metricas[i]);

            return newparent;

        }


    })
    .controller('modalChangeCategoryNameController', function ($scope, $modalInstance, category, isnew) {
        $scope._mcc = {name: category.Nome, title: (isnew ? "Nova categoria" : "Alteração de nome de categoria") };
        var vm = $scope._mcc;
        vm.save = save;
        vm.dismiss = $modalInstance.dismiss;

        function save() {
            category.Nome = vm.name;
            $modalInstance.close();
        }

    });



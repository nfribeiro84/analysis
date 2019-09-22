myApp
    .controller('homeController', function ($location, $filter, $timeout, $http) {
        var vm = this;
        var connection;

        vm.running = false;

        vm.start = start;
        vm.getColumns = getColumns;
        vm.knowledge = goToKnowledge;

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
                vm.metricas = [];
                setMetricas(vm.categoria);
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

        function setMetadata(data) {
            console.log(data);
            if (data.metadata) {
                $timeout(function () {
                    vm.metadata = data.metadata;
                    console.log("metadata setted");
                    console.log(vm.metadata);
                }, 0);
            }
            else
                console.log("no metadata");
        }
    });



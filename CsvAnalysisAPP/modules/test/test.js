myApp
    .controller('testController', function () {
        var vm = this;

        vm.categorias = {
            "nome": "root",
            "categoriasfilhas": [
                {
                    "nome": "N_",
                    "categoriasfilhas": [
                        {
                            "nome": "N_EDIFICIOS_",
                            "categoriasfilhas": [
                                {
                                    "nome": "N_EDIFICIOS_CLASSICOS",
                                    "categoriasfilhas": [],
                                    "metricas": [
                                        "N_EDIFICIOS_CLASSICOS_1OU2",
                                        "N_EDIFICIOS_CLASSICOS_ISOLADOS ",
                                        "N_EDIFICIOS_CLASSICOS_GEMIN",
                                        "N_EDIFICIOS_CLASSICOS_EMBANDA",
                                        "N_EDIFICIOS_CLASSICOS_3OUMAIS",
                                        "N_EDIFICIOS_CLASSICOS_OUTROS"
                                    ],
                                    "CatValue": "N_EDIFICIOS_CLASSICOS"
                                },
                                {
                                    "nome": "N_EDIFICIOS_CONSTR_",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_EDIFICIOS_CONSTR_19",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_EDIFICIOS_CONSTR_199",
                                                    "categoriasfilhas": [],
                                                    "metricas": [
                                                        "N_EDIFICIOS_CONSTR_1991A1995",
                                                        "N_EDIFICIOS_CONSTR_1996A2000"
                                                    ],
                                                    "CatValue": null
                                                }
                                            ],
                                            "metricas": [
                                                "N_EDIFICIOS_CONSTR_1919A1945",
                                                "N_EDIFICIOS_CONSTR_1946A1960",
                                                "N_EDIFICIOS_CONSTR_1961A1970",
                                                "N_EDIFICIOS_CONSTR_1971A1980",
                                                "N_EDIFICIOS_CONSTR_1981A1990"
                                            ],
                                            "CatValue": null
                                        },
                                        {
                                            "nome": "N_EDIFICIOS_CONSTR_200",
                                            "categoriasfilhas": [],
                                            "metricas": [
                                                "N_EDIFICIOS_CONSTR_2001A2005",
                                                "N_EDIFICIOS_CONSTR_2006A2011"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_EDIFICIOS_CONSTR_ANTES_1919"
                                    ],
                                    "CatValue": null
                                },
                                {
                                    "nome": "N_EDIFICIOS_E",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_EDIFICIOS_ESTRUT_",
                                            "categoriasfilhas": [],
                                            "metricas": [
                                                "N_EDIFICIOS_ESTRUT_BETAO",
                                                "N_EDIFICIOS_ESTRUT_COM_PLACA",
                                                "N_EDIFICIOS_ESTRUT_SEM_PLACA",
                                                "N_EDIFICIOS_ESTRUT_ADOBE_PEDRA",
                                                "N_EDIFICIOS_ESTRUT_OUTRA"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_EDIFICIOS_EXCLUSIV_RESID"
                                    ],
                                    "CatValue": null
                                },
                                {
                                    "nome": "N_EDIFICIOS_PRINCIP",
                                    "categoriasfilhas": [],
                                    "metricas": [
                                        "N_EDIFICIOS_PRINCIPAL_RESID",
                                        "N_EDIFICIOS_PRINCIP_NAO_RESID"
                                    ],
                                    "CatValue": null
                                }
                            ],
                            "metricas": [
                                "N_EDIFICIOS_1OU2_PISOS",
                                "N_EDIFICIOS_3OU4_PISOS"
                            ],
                            "CatValue": null
                        },
                        {
                            "nome": "N_ALOJAMENTOS",
                            "categoriasfilhas": [
                                {
                                    "nome": "N_ALOJAMENTOS_FAM",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_ALOJAMENTOS_FAM_",
                                            "categoriasfilhas": [],
                                            "metricas": [
                                                "N_ALOJAMENTOS_FAM_CLASSICOS",
                                                "N_ALOJAMENTOS_FAM_N_CLASSICOS"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_ALOJAMENTOS_FAMILIARES"
                                    ],
                                    "CatValue": null
                                }
                            ],
                            "metricas": [
                                "N_ALOJAMENTOS_COLECTIVOS",
                                "N_ALOJAMENTOS_RES_HABITUAL",
                                "N_ALOJAMENTOS_VAGOS"
                            ],
                            "CatValue": "N_ALOJAMENTOS"
                        },
                        {
                            "nome": "N_RES_HABITUAL_",
                            "categoriasfilhas": [
                                {
                                    "nome": "N_RES_HABITUAL_COM_",
                                    "categoriasfilhas": [],
                                    "metricas": [
                                        "N_RES_HABITUAL_COM_AGUA",
                                        "N_RES_HABITUAL_COM_RETRETE",
                                        "N_RES_HABITUAL_COM_ESGOTOS",
                                        "N_RES_HABITUAL_COM_BANHO"
                                    ],
                                    "CatValue": null
                                },
                                {
                                    "nome": "N_RES_HABITUAL_AR",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_RES_HABITUAL_AREA_",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_RES_HABITUAL_AREA_50",
                                                    "categoriasfilhas": [],
                                                    "metricas": [
                                                        "N_RES_HABITUAL_AREA_50_100"
                                                    ],
                                                    "CatValue": "N_RES_HABITUAL_AREA_50"
                                                }
                                            ],
                                            "metricas": [
                                                "N_RES_HABITUAL_AREA_100_200",
                                                "N_RES_HABITUAL_AREA_200"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_RES_HABITUAL_ARREND"
                                    ],
                                    "CatValue": null
                                },
                                {
                                    "nome": "N_RES_HABITUAL_ESTAC_",
                                    "categoriasfilhas": [],
                                    "metricas": [
                                        "N_RES_HABITUAL_ESTAC_1",
                                        "N_RES_HABITUAL_ESTAC_2",
                                        "N_RES_HABITUAL_ESTAC_3"
                                    ],
                                    "CatValue": null
                                }
                            ],
                            "metricas": [
                                "N_RES_HABITUAL_1_2_DIV",
                                "N_RES_HABITUAL_3_4_DIV",
                                "N_RES_HABITUAL_PROP_OCUP"
                            ],
                            "CatValue": null
                        },
                        {
                            "nome": "N_FAMILIAS_",
                            "categoriasfilhas": [
                                {
                                    "nome": "N_FAMILIAS_CLASS",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_FAMILIAS_CLASSICAS",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_FAMILIAS_CLASSICAS_NPES",
                                                    "categoriasfilhas": [],
                                                    "metricas": [
                                                        "N_FAMILIAS_CLASSICAS_NPES65",
                                                        "N_FAMILIAS_CLASSICAS_NPES14"
                                                    ],
                                                    "CatValue": null
                                                }
                                            ],
                                            "metricas": [
                                                "N_FAMILIAS_CLASSICAS_1OU2_PESS",
                                                "N_FAMILIAS_CLASSICAS_3OU4_PESS"
                                            ],
                                            "CatValue": "N_FAMILIAS_CLASSICAS"
                                        },
                                        {
                                            "nome": "N_FAMILIAS_CLASSIC_",
                                            "categoriasfilhas": [],
                                            "metricas": [
                                                "N_FAMILIAS_CLASSIC_SEM_DESEMP",
                                                "N_FAMILIAS_CLASSIC_1DESEMPREG"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_FAMILIAS_CLASS_2MAIS_DESEMP"
                                    ],
                                    "CatValue": null
                                }
                            ],
                            "metricas": [
                                "N_FAMILIAS_INSTITUCIONAIS"
                            ],
                            "CatValue": null
                        },
                        {
                            "nome": "N_NUCLEOS_",
                            "categoriasfilhas": [
                                {
                                    "nome": "N_NUCLEOS_F",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_NUCLEOS_FILH_",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_NUCLEOS_FILH_INF_",
                                                    "categoriasfilhas": [],
                                                    "metricas": [
                                                        "N_NUCLEOS_FILH_INF_6ANOS",
                                                        "N_NUCLEOS_FILH_INF_15ANOS"
                                                    ],
                                                    "CatValue": null
                                                }
                                            ],
                                            "metricas": [
                                                "N_NUCLEOS_FILH_MAIS_15ANOS"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_NUCLEOS_FAMILIARES"
                                    ],
                                    "CatValue": null
                                }
                            ],
                            "metricas": [
                                "N_NUCLEOS_1FILH_NAO_CASADO",
                                "N_NUCLEOS_2FILH_NAO_CASADO"
                            ],
                            "CatValue": null
                        },
                        {
                            "nome": "N_IND",
                            "categoriasfilhas": [
                                {
                                    "nome": "N_INDIV",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_INDIVIDUOS_",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_INDIVIDUOS_PRESENT",
                                                    "categoriasfilhas": [],
                                                    "metricas": [
                                                        "N_INDIVIDUOS_PRESENT_H",
                                                        "N_INDIVIDUOS_PRESENT_M"
                                                    ],
                                                    "CatValue": "N_INDIVIDUOS_PRESENT"
                                                },
                                                {
                                                    "nome": "N_INDIVIDUOS_RESIDENT",
                                                    "categoriasfilhas": [
                                                        {
                                                            "nome": "N_INDIVIDUOS_RESIDENT_H",
                                                            "categoriasfilhas": [
                                                                {
                                                                    "nome": "N_INDIVIDUOS_RESIDENT_H_1",
                                                                    "categoriasfilhas": [],
                                                                    "metricas": [
                                                                        "N_INDIVIDUOS_RESIDENT_H_10A13",
                                                                        "N_INDIVIDUOS_RESIDENT_H_14A19",
                                                                        "N_INDIVIDUOS_RESIDENT_H_15A19"
                                                                    ],
                                                                    "CatValue": null
                                                                },
                                                                {
                                                                    "nome": "N_INDIVIDUOS_RESIDENT_H_2",
                                                                    "categoriasfilhas": [
                                                                        {
                                                                            "nome": "N_INDIVIDUOS_RESIDENT_H_20A",
                                                                            "categoriasfilhas": [],
                                                                            "metricas": [
                                                                                "N_INDIVIDUOS_RESIDENT_H_20A24",
                                                                                "N_INDIVIDUOS_RESIDENT_H_20A64"
                                                                            ],
                                                                            "CatValue": null
                                                                        }
                                                                    ],
                                                                    "metricas": [
                                                                        "N_INDIVIDUOS_RESIDENT_H_25A64"
                                                                    ],
                                                                    "CatValue": null
                                                                }
                                                            ],
                                                            "metricas": [
                                                                "N_INDIVIDUOS_RESIDENT_H_0A4",
                                                                "N_INDIVIDUOS_RESIDENT_H_5A9",
                                                                "N_INDIVIDUOS_RESIDENT_H_65"
                                                            ],
                                                            "CatValue": "N_INDIVIDUOS_RESIDENT_H"
                                                        },
                                                        {
                                                            "nome": "N_INDIVIDUOS_RESIDENT_M",
                                                            "categoriasfilhas": [
                                                                {
                                                                    "nome": "N_INDIVIDUOS_RESIDENT_M_1",
                                                                    "categoriasfilhas": [],
                                                                    "metricas": [
                                                                        "N_INDIVIDUOS_RESIDENT_M_10A13",
                                                                        "N_INDIVIDUOS_RESIDENT_M_14A19",
                                                                        "N_INDIVIDUOS_RESIDENT_M_15A19"
                                                                    ],
                                                                    "CatValue": null
                                                                },
                                                                {
                                                                    "nome": "N_INDIVIDUOS_RESIDENT_M_2",
                                                                    "categoriasfilhas": [
                                                                        {
                                                                            "nome": "N_INDIVIDUOS_RESIDENT_M_20A",
                                                                            "categoriasfilhas": [],
                                                                            "metricas": [
                                                                                "N_INDIVIDUOS_RESIDENT_M_20A24",
                                                                                "N_INDIVIDUOS_RESIDENT_M_20A64"
                                                                            ],
                                                                            "CatValue": null
                                                                        }
                                                                    ],
                                                                    "metricas": [
                                                                        "N_INDIVIDUOS_RESIDENT_M_25A64"
                                                                    ],
                                                                    "CatValue": null
                                                                }
                                                            ],
                                                            "metricas": [
                                                                "N_INDIVIDUOS_RESIDENT_M_0A4",
                                                                "N_INDIVIDUOS_RESIDENT_M_5A9",
                                                                "N_INDIVIDUOS_RESIDENT_M_65"
                                                            ],
                                                            "CatValue": "N_INDIVIDUOS_RESIDENT_M"
                                                        },
                                                        {
                                                            "nome": "N_INDIVIDUOS_RESIDENT_1",
                                                            "categoriasfilhas": [],
                                                            "metricas": [
                                                                "N_INDIVIDUOS_RESIDENT_10A13",
                                                                "N_INDIVIDUOS_RESIDENT_14A19",
                                                                "N_INDIVIDUOS_RESIDENT_15A19"
                                                            ],
                                                            "CatValue": null
                                                        },
                                                        {
                                                            "nome": "N_INDIVIDUOS_RESIDENT_2",
                                                            "categoriasfilhas": [
                                                                {
                                                                    "nome": "N_INDIVIDUOS_RESIDENT_20A",
                                                                    "categoriasfilhas": [],
                                                                    "metricas": [
                                                                        "N_INDIVIDUOS_RESIDENT_20A24",
                                                                        "N_INDIVIDUOS_RESIDENT_20A64"
                                                                    ],
                                                                    "CatValue": null
                                                                }
                                                            ],
                                                            "metricas": [
                                                                "N_INDIVIDUOS_RESIDENT_25A64"
                                                            ],
                                                            "CatValue": null
                                                        }
                                                    ],
                                                    "metricas": [
                                                        "N_INDIVIDUOS_RESIDENT_0A4",
                                                        "N_INDIVIDUOS_RESIDENT_5A9",
                                                        "N_INDIVIDUOS_RESIDENT_65"
                                                    ],
                                                    "CatValue": "N_INDIVIDUOS_RESIDENT"
                                                }
                                            ],
                                            "metricas": [],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [
                                        "N_INDIV_RESIDENT_N_LER_ESCRV"
                                    ],
                                    "CatValue": null
                                },
                                {
                                    "nome": "N_IND_RESID",
                                    "categoriasfilhas": [
                                        {
                                            "nome": "N_IND_RESIDENT_",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_IND_RESIDENT_FENSINO_",
                                                    "categoriasfilhas": [
                                                        {
                                                            "nome": "N_IND_RESIDENT_FENSINO_S",
                                                            "categoriasfilhas": [],
                                                            "metricas": [
                                                                "N_IND_RESIDENT_FENSINO_SEC",
                                                                "N_IND_RESIDENT_FENSINO_SUP"
                                                            ],
                                                            "CatValue": null
                                                        }
                                                    ],
                                                    "metricas": [
                                                        "N_IND_RESIDENT_FENSINO_1BAS",
                                                        "N_IND_RESIDENT_FENSINO_2BAS",
                                                        "N_IND_RESIDENT_FENSINO_3BAS",
                                                        "N_IND_RESIDENT_FENSINO_POSSEC"
                                                    ],
                                                    "CatValue": null
                                                },
                                                {
                                                    "nome": "N_IND_RESIDENT_ENSINCOMP_",
                                                    "categoriasfilhas": [
                                                        {
                                                            "nome": "N_IND_RESIDENT_ENSINCOMP_S",
                                                            "categoriasfilhas": [],
                                                            "metricas": [
                                                                "N_IND_RESIDENT_ENSINCOMP_SEC",
                                                                "N_IND_RESIDENT_ENSINCOMP_SUP"
                                                            ],
                                                            "CatValue": null
                                                        }
                                                    ],
                                                    "metricas": [
                                                        "N_IND_RESIDENT_ENSINCOMP_1BAS",
                                                        "N_IND_RESIDENT_ENSINCOMP_2BAS",
                                                        "N_IND_RESIDENT_ENSINCOMP_3BAS",
                                                        "N_IND_RESIDENT_ENSINCOMP_POSEC"
                                                    ],
                                                    "CatValue": null
                                                }
                                            ],
                                            "metricas": [],
                                            "CatValue": null
                                        },
                                        {
                                            "nome": "N_IND_RESID_",
                                            "categoriasfilhas": [
                                                {
                                                    "nome": "N_IND_RESID_DESEMP_PROC_",
                                                    "categoriasfilhas": [],
                                                    "metricas": [
                                                        "N_IND_RESID_DESEMP_PROC_1EMPRG",
                                                        "N_IND_RESID_DESEMP_PROC_EMPRG"
                                                    ],
                                                    "CatValue": null
                                                },
                                                {
                                                    "nome": "N_IND_RESID_E",
                                                    "categoriasfilhas": [
                                                        {
                                                            "nome": "N_IND_RESID_EMPREG",
                                                            "categoriasfilhas": [
                                                                {
                                                                    "nome": "N_IND_RESID_EMPREG_SECT_",
                                                                    "categoriasfilhas": [],
                                                                    "metricas": [
                                                                        "N_IND_RESID_EMPREG_SECT_PRIM",
                                                                        "N_IND_RESID_EMPREG_SECT_SEQ",
                                                                        "N_IND_RESID_EMPREG_SECT_TERC"
                                                                    ],
                                                                    "CatValue": null
                                                                }
                                                            ],
                                                            "metricas": [
                                                                "N_IND_RESID_EMPREGADOS"
                                                            ],
                                                            "CatValue": null
                                                        }
                                                    ],
                                                    "metricas": [
                                                        "N_IND_RESID_ESTUD_MUN_RESID"
                                                    ],
                                                    "CatValue": null
                                                }
                                            ],
                                            "metricas": [
                                                "N_IND_RESID_PENS_REFORM",
                                                "N_IND_RESID_SEM_ACT_ECON",
                                                "N_IND_RESID_TRAB_MUN_RESID"
                                            ],
                                            "CatValue": null
                                        }
                                    ],
                                    "metricas": [],
                                    "CatValue": null
                                }
                            ],
                            "metricas": [],
                            "CatValue": null
                        }
                    ],
                    "metricas": [
                        "N_CLASSICOS_RES_HABITUAL"
                    ],
                    "CatValue": null
                }
            ],
            "metricas": [
                ".N_EDIFICIOS_5OU_MAIS_PISOS"
            ],
            "CatValue": null
        };

        vm.metricas = [];

        setMetricas(vm.categorias);

        function setMetricas(cat) {
            if (cat.CatValue)
                vm.metricas.push(cat.CatValue);
            for (var i = 0; i < cat.metricas.length; i++)
                vm.metricas.push(cat.metricas[i]);
            for (var j = 0; j < cat.categoriasfilhas.length; j++)
                setMetricas(cat.categoriasfilhas[j]);
        }
    })
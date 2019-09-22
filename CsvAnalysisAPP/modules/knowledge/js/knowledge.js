myApp
    .controller('knowledgeController', function ($http) {
        var vm = this;
        var baseUrl = '/api/knowledge/';

        

        vm.nodes = [
            {
                "id": 5,
                "title": "N",
                "hasValue": false,
                "nodes": [
                    {
                        "id": 5,
                        "title": "EDIFICIOS",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 5,
                                "title": "CLASSICOS",
                                "hasValue": true,
                                "nodes": [
                                    {
                                        "id": 6,
                                        "title": "1OU2",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 7,
                                        "title": "ISOLADOS ",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 8,
                                        "title": "GEMIN",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 9,
                                        "title": "EMBANDA",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 10,
                                        "title": "3OUMAIS",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 11,
                                        "title": "OUTROS",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 12,
                                "title": "EXCLUSIV",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 12,
                                        "title": "RESID",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 13,
                                "title": "PRINCIPAL",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 13,
                                        "title": "RESID",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 14,
                                "title": "PRINCIP",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 14,
                                        "title": "NAO",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 14,
                                                "title": "RESID",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 15,
                                "title": "1OU2",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 15,
                                        "title": "PISOS",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 16,
                                "title": "3OU4",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 16,
                                        "title": "PISOS",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 18,
                                "title": "CONSTR",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 18,
                                        "title": "ANTES",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 18,
                                                "title": "1919",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 19,
                                        "title": "1919A1945",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 20,
                                        "title": "1946A1960",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 21,
                                        "title": "1961A1970",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 22,
                                        "title": "1971A1980",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 23,
                                        "title": "1981A1990",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 24,
                                        "title": "1991A1995",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 25,
                                        "title": "1996A2000",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 26,
                                        "title": "2001A2005",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 27,
                                        "title": "2006A2011",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 28,
                                "title": "ESTRUT",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 28,
                                        "title": "BETAO",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 29,
                                        "title": "COM",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 29,
                                                "title": "PLACA",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 30,
                                        "title": "SEM",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 30,
                                                "title": "PLACA",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 31,
                                        "title": "ADOBE",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 31,
                                                "title": "PEDRA",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 32,
                                        "title": "OUTRA",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 33,
                        "title": "ALOJAMENTOS",
                        "hasValue": true,
                        "nodes": [
                            {
                                "id": 34,
                                "title": "FAMILIARES",
                                "hasValue": true,
                                "nodes": []
                            },
                            {
                                "id": 35,
                                "title": "FAM",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 35,
                                        "title": "CLASSICOS",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 36,
                                        "title": "N",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 36,
                                                "title": "CLASSICOS",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 37,
                                "title": "COLECTIVOS",
                                "hasValue": true,
                                "nodes": []
                            },
                            {
                                "id": 39,
                                "title": "RES",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 39,
                                        "title": "HABITUAL",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 40,
                                "title": "VAGOS",
                                "hasValue": true,
                                "nodes": []
                            }
                        ]
                    },
                    {
                        "id": 38,
                        "title": "CLASSICOS",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 38,
                                "title": "RES",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 38,
                                        "title": "HABITUAL",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 41,
                        "title": "RES",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 41,
                                "title": "HABITUAL",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 41,
                                        "title": "COM",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 41,
                                                "title": "AGUA",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 42,
                                                "title": "RETRETE",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 43,
                                                "title": "ESGOTOS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 44,
                                                "title": "BANHO",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 45,
                                        "title": "AREA",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 45,
                                                "title": "50",
                                                "hasValue": true,
                                                "nodes": [
                                                    {
                                                        "id": 46,
                                                        "title": "100",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 47,
                                                "title": "100",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 47,
                                                        "title": "200",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 48,
                                                "title": "200",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 49,
                                        "title": "1",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 49,
                                                "title": "2",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 49,
                                                        "title": "DIV",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 50,
                                        "title": "3",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 50,
                                                "title": "4",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 50,
                                                        "title": "DIV",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 51,
                                        "title": "ESTAC",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 51,
                                                "title": "1",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 52,
                                                "title": "2",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 53,
                                                "title": "3",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 54,
                                        "title": "PROP",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 54,
                                                "title": "OCUP",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 55,
                                        "title": "ARREND",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 56,
                        "title": "FAMILIAS",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 56,
                                "title": "CLASSICAS",
                                "hasValue": true,
                                "nodes": [
                                    {
                                        "id": 58,
                                        "title": "1OU2",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 58,
                                                "title": "PESS",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 59,
                                        "title": "3OU4",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 59,
                                                "title": "PESS",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 60,
                                        "title": "NPES65",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 61,
                                        "title": "NPES14",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 57,
                                "title": "INSTITUCIONAIS",
                                "hasValue": true,
                                "nodes": []
                            },
                            {
                                "id": 62,
                                "title": "CLASSIC",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 62,
                                        "title": "SEM",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 62,
                                                "title": "DESEMP",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 63,
                                        "title": "1DESEMPREG",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 64,
                                "title": "CLASS",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 64,
                                        "title": "2MAIS",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 64,
                                                "title": "DESEMP",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 65,
                        "title": "NUCLEOS",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 65,
                                "title": "FAMILIARES",
                                "hasValue": true,
                                "nodes": []
                            },
                            {
                                "id": 66,
                                "title": "1FILH",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 66,
                                        "title": "NAO",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 66,
                                                "title": "CASADO",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 67,
                                "title": "2FILH",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 67,
                                        "title": "NAO",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 67,
                                                "title": "CASADO",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 68,
                                "title": "FILH",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 68,
                                        "title": "INF",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 68,
                                                "title": "6ANOS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 69,
                                                "title": "15ANOS",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 70,
                                        "title": "MAIS",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 70,
                                                "title": "15ANOS",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 71,
                        "title": "INDIVIDUOS",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 71,
                                "title": "PRESENT",
                                "hasValue": true,
                                "nodes": [
                                    {
                                        "id": 72,
                                        "title": "H",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 73,
                                        "title": "M",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 74,
                                "title": "RESIDENT",
                                "hasValue": true,
                                "nodes": [
                                    {
                                        "id": 75,
                                        "title": "H",
                                        "hasValue": true,
                                        "nodes": [
                                            {
                                                "id": 86,
                                                "title": "0A4",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 87,
                                                "title": "5A9",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 88,
                                                "title": "10A13",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 89,
                                                "title": "14A19",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 90,
                                                "title": "15A19",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 91,
                                                "title": "20A24",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 92,
                                                "title": "20A64",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 93,
                                                "title": "25A64",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 94,
                                                "title": "65",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 76,
                                        "title": "M",
                                        "hasValue": true,
                                        "nodes": [
                                            {
                                                "id": 95,
                                                "title": "0A4",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 96,
                                                "title": "5A9",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 97,
                                                "title": "10A13",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 98,
                                                "title": "14A19",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 99,
                                                "title": "15A19",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 100,
                                                "title": "20A24",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 101,
                                                "title": "20A64",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 102,
                                                "title": "25A64",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 103,
                                                "title": "65",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 77,
                                        "title": "0A4",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 78,
                                        "title": "5A9",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 79,
                                        "title": "10A13",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 80,
                                        "title": "14A19",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 81,
                                        "title": "15A19",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 82,
                                        "title": "20A24",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 83,
                                        "title": "20A64",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 84,
                                        "title": "25A64",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 85,
                                        "title": "65",
                                        "hasValue": true,
                                        "nodes": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 104,
                        "title": "INDIV",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 104,
                                "title": "RESIDENT",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 104,
                                        "title": "N",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 104,
                                                "title": "LER",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 104,
                                                        "title": "ESCRV",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 105,
                        "title": "IND",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 105,
                                "title": "RESIDENT",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 105,
                                        "title": "FENSINO",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 105,
                                                "title": "1BAS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 106,
                                                "title": "2BAS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 107,
                                                "title": "3BAS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 108,
                                                "title": "SEC",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 109,
                                                "title": "POSSEC",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 110,
                                                "title": "SUP",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 111,
                                        "title": "ENSINCOMP",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 111,
                                                "title": "1BAS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 112,
                                                "title": "2BAS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 113,
                                                "title": "3BAS",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 114,
                                                "title": "SEC",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 115,
                                                "title": "POSEC",
                                                "hasValue": true,
                                                "nodes": []
                                            },
                                            {
                                                "id": 116,
                                                "title": "SUP",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 117,
                                "title": "RESID",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 117,
                                        "title": "DESEMP",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 117,
                                                "title": "PROC",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 117,
                                                        "title": "1EMPRG",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    },
                                                    {
                                                        "id": 118,
                                                        "title": "EMPRG",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 119,
                                        "title": "EMPREGADOS",
                                        "hasValue": true,
                                        "nodes": []
                                    },
                                    {
                                        "id": 120,
                                        "title": "PENS",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 120,
                                                "title": "REFORM",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": 121,
                                        "title": "SEM",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 121,
                                                "title": "ACT",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 121,
                                                        "title": "ECON",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 122,
                                        "title": "EMPREG",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 122,
                                                "title": "SECT",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 122,
                                                        "title": "PRIM",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    },
                                                    {
                                                        "id": 123,
                                                        "title": "SEQ",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    },
                                                    {
                                                        "id": 124,
                                                        "title": "TERC",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 125,
                                        "title": "ESTUD",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 125,
                                                "title": "MUN",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 125,
                                                        "title": "RESID",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 126,
                                        "title": "TRAB",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 126,
                                                "title": "MUN",
                                                "hasValue": false,
                                                "nodes": [
                                                    {
                                                        "id": 126,
                                                        "title": "RESID",
                                                        "hasValue": true,
                                                        "nodes": []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 17,
                "title": ".N",
                "hasValue": false,
                "nodes": [
                    {
                        "id": 17,
                        "title": "EDIFICIOS",
                        "hasValue": false,
                        "nodes": [
                            {
                                "id": 17,
                                "title": "5OU",
                                "hasValue": false,
                                "nodes": [
                                    {
                                        "id": 17,
                                        "title": "MAIS",
                                        "hasValue": false,
                                        "nodes": [
                                            {
                                                "id": 17,
                                                "title": "PISOS",
                                                "hasValue": true,
                                                "nodes": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        vm.openHierarquia = openHierarquia;
        vm.openDivisao = openDivisao;

        $http.get(baseUrl + 'hierarquias')
            .success(function (data, status) {
                vm.hierarquias = data;
                console.log(data);
            })
            .error(function (data, status) {
                console.log(data);
            })

        function openHierarquia(h) {
            if (h.children) {
                vm.hierarquia = h;
            }
            console.log("abir hierarquia");
            $http.get(baseUrl + 'hierarquia/' + h.HierarquiasId)
                .success(function (data, status) {
                    h.children = data;
                    vm.hierarquia = h;
                })
        }

        function openDivisao(unit) {
            if (unit.Children == 0)
                return;
            if (unit.showChildren) {
                unit.showChildren = false;
                return;
            }

            if (unit.utchildren) {
                unit.showChildren = true;
                return;
            }
            $http.get(baseUrl + 'hierarquia/' + unit.HierarquiasTerritoriaisId + '?parentId=' + unit.UnidadesDivisoesId)
                .success(function (data, status) {
                    unit.utchildren = data;
                    unit.showChildren = true;
                    unit.title = unit.utchildren[0].Divisao;
                    console.log(unit);
                });
        }
    })
    .directive('unidadeTerritorial', function ($http) {
        return {
            link: link,
            restrict: 'E',
            scope: {
                unit: '='
            },
            templateUrl: 'modules/knowledge/partials/unidadeterritorial.html'
        };

        function link(scope) {
            console.log(scope.unit);
            var baseUrl = '/api/knowledge/';

            scope.openDivisao = openDivisao;

            function openDivisao() {
                if (scope.unit.showChildren) {
                    scope.unit.showChildren = false;
                    return;
                }

                if (scope.unit.utchildren) {
                    scope.unit.showChildren = true;
                    return;
                }
                $http.get(baseUrl + 'hierarquia/' + scope.unit.HierarquiasTerritoriaisId + '?parentId=' + scope.unit.UnidadesDivisoesId)
                    .success(function (data, status) {
                        scope.unit.utchildren = data;
                        scope.unit.showChildren = true;
                    })
            }
        }
    })
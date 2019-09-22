using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables.Knowledge
{
    [PetaPoco.TableName("Nomes")]
    [PetaPoco.PrimaryKey("NomesId")]
    class Nomes
    {
        public int NomesId { get; set; }
        public string Nome { get; set; }
        public string Idioma { get; set; }
    }
}
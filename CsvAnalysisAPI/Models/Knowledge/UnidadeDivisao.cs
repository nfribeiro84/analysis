using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Knowledge
{
    public class UnidadeDivisao
    {
        public int UnidadesDivisoesHierarquiasId { get; set; }
        public int HierarquiasTerritoriaisId { get; set; }
        public int UnidadesDivisoesId { get; set; }
        public string Unidade { get; set; }
        public string Divisao { get; set; }
        public int Children { get; set; }
        public string Alternativos { get; set; }
    }
}
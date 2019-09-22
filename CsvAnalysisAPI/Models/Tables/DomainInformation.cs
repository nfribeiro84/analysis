using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables
{
    public class DomainInformation
    {
        public List<DivisaoTerritorial> Divisoes { get; set; }
        public List<DivisaoTerritorial> Unidades { get; set; }

    }
}